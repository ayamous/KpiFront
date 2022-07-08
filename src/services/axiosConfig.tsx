import axios from 'axios';
import keycloak from '../keycloak';



//http://kpi.dev.app.royalairmaroc.com:8090/business/api
//http://localhost:8090/business/api
const axiosInstance = axios.create({
	baseURL:  'http://localhost:8090/business/api',
	//timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
    	'Accept': 'application/json',
	//	'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
	}, 	
});

export const setToken = (token:string) => {
	console.log("setToken", token)
	axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  };


  export async function getUser() {
	const response = await fetch('/api/user');
	const body = await response.text();
	return body;
}


axiosInstance.interceptors.response.use(undefined, async error => {
	if (error.response?.status === 401) {
		// logout();
		keycloak.logout()
	}else if (error.response?.status === 403) {
		console.log("error.response?.status === 403")
		// logout();
		
		keycloak.logout()
	}
	return Promise.reject(error);
});

axiosInstance.interceptors.request.use(req => {
	async function runAsync() {
		if ((await getUser()) === '') {
			// login();
		 keycloak.login()
			// let port = window.location.port ? ':' + window.location.port : '';
            // window.location.href = '//' + window.location.hostname + port + '/private';
		}
	}
	runAsync();
	return req;
});


export default axiosInstance;
