import axios from 'axios';
import { getCookie } from 'react-use-cookie';
import keycloak from '../keycloak';

//'http://kpi.dev.app.royalairmaroc.com:8090/business/api',
// http://localhost:8090/business/api
const axiosInstanceUpload = axios.create({
	baseURL: 'http://localhost:8090/business/api',
	//timeout: 5000,
	
	headers: {
		'Content-Type': 'multipart/form-data',
    	'Accept': 'application/json',
		//'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
	}, 
		
});

export const setTokenUpload = (token:string) => {
	console.log("setTokenUpload", token)
	axiosInstanceUpload.defaults.headers.common["Authorization"] = "Bearer " + token;
  };

export async function getUser() {
	const response = await fetch('/api/user');
	const body = await response.text();
	return body;
}

axiosInstanceUpload.interceptors.response.use(undefined, async error => {
	if (error.response?.status === 401) {
		// logout();
		keycloak.logout()
	}else if (error.response?.status === 403) {
		console.log("dddd error.response?.status === 403")
		// logout();
		keycloak.logout()
	}
	return Promise.reject(error);

});

axiosInstanceUpload.interceptors.request.use(req => {
	async function runAsync() {
		if ((await getUser()) === '') {
			// login();
			keycloak.login()
		}
	}
	runAsync();
	return req;
});


export default axiosInstanceUpload;
