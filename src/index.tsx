import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// export const login = () => {
// 	let port = window.location.port ? ':' + window.location.port : '';
// 	window.location.href = '//' + window.location.hostname + port + '/private';
// };

// export function logout() {
// 	const el: HTMLFormElement | null = document.getElementById(
// 		'logout-form'
// 	) as HTMLFormElement;
// 	el?.submit();
// }
ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// )
// @ts-ignore
// const keycloak: Keycloak.KeycloakInstance = keycloak();

// keycloak.init({ onLoad: 'login-required' })
//   .success(() => {
//     ReactDOM.render(
//       <App />,
//       document.getElementById('root') as HTMLElement
//     );
//   })
//   .error(error => console.log(error));

   

reportWebVitals();
