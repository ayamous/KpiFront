import axios from 'axios';
import { getCookie } from 'react-use-cookie';
import keycloak from '../keycloak';

//http://localhost:8090/admin/management
//http://kpi.dev.app.royalairmaroc.com:8090/admin/management
const axiosInstanceUser = axios.create({
	baseURL: 'http://localhost:8090/admin/management',
	//timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
    	'Accept': 'application/json',
		//'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
	}, 
});

export const setTokenUser = (token:string) => {
	axiosInstanceUser.defaults.headers.common["Authorization"] = "Bearer " + token;
  };

  export async function getUser() {
	const response = await fetch('/api/user');
	const body = await response.text();
	return body;
}

axiosInstanceUser.interceptors.response.use(undefined, async error => {
	if (error.response?.status === 401 ) {
		console.log("error.response?.status === 401")
		// logout();
		keycloak.logout()
	}else if (error.response?.status === 403) {
		console.log("error.response?.status === 403")
		// logout();
		keycloak.logout()
	}
	return Promise.reject(error);

});

axiosInstanceUser.interceptors.request.use(req => {
	async function runAsync() {
		//console.log("login")
		if ((await getUser()) === '') {
			//console.log("login");
			// login();
			keycloak.login()
		}
	}
	runAsync();
	return req;
});


export default axiosInstanceUser;
