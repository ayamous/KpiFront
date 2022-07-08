import { BrowserRouter, Route  } from 'react-router-dom';
import RouteMenuTIndex from './Routes/RouteMenuTIndex';
import AuthentificationIndex from './pages/authentification/AuthentificationIndex';
import "./style/addUtilisateur.scss"
import "./style/authorization.scss"
import "./style/updatePassword.scss"
import "./style/recupererMdp.scss"
import "./style/navBar.scss"
import "./style/navBarHorizontal.scss"
import "./style/menu.scss"
import "./style/menuT.scss"
import "./style/app.scss"
import "./style/util.scss"
import MenuHorizontalIndex from './pages/MenuPrincipale/MenuHorizontal';
import MenuFIndex from './pages/MenuFix/MenuF';
import RouteMenuIndexN from './Routes/RouteMenu';
import keycloak from './keycloak';
import { useEffect, useState } from 'react';
import { setToken } from './services/axiosConfig';
import { setTokenUpload } from './services/axiosUpload';
import { setTokenUser } from './services/axiosUserConfig';

function App() {
	
	const [isAuth, setIsAuth] = useState(false)

	useEffect(()=>{
		keycloak
        .init({
          onLoad: "login-required",
          pkceMethod: "S256",
          checkLoginIframe: false,
        })
        .then((authenticated) => {
			setIsAuth(authenticated)
			//@ts-ignore
			setToken(keycloak.token)
			//@ts-ignore
			setTokenUpload(keycloak.token)
			//@ts-ignore
			setTokenUser(keycloak.token)
        });
	},[])
	console.log("isAuth", isAuth)
	if(isAuth){
		
		return (
			<BrowserRouter>
			<Route path={["/users", "/adduser"]} component={RouteMenuTIndex} />
			<Route path={["/entites", "/addEntite"]} component={RouteMenuTIndex} />
			<Route path={["/categorie", "/addCategorie"]} component={RouteMenuTIndex} />
			<Route path={["/systemSource", "/addSystemSource"]} component={RouteMenuTIndex} />
			<Route path={["/groupeIndicateur", "/addGroupeIndicateur"]} component={RouteMenuTIndex}/>
			<Route path={["/gestionsAfetions", "/addGestionsAfetions"]} component={RouteMenuTIndex} />
			<Route path={["/controles", "/addControles", "/updateControle"]} component={RouteMenuTIndex} />
			<Route path={["/periodes", "/addPeriodes"]} component={RouteMenuTIndex} />	  
			<Route exact path="/indicateurs" component={RouteMenuTIndex}/>
			<Route exact path="/addIndicateurs" component={RouteMenuTIndex}/>
			<Route  path="/update" component={RouteMenuTIndex} />
			<Route  path="/import" component={RouteMenuTIndex} />
			<Route  path="/rappel" component={RouteMenuTIndex} />
			<Route  path="/saisie" component={RouteMenuTIndex} />
			<Route  path="/details" component={RouteMenuTIndex} />
			<Route  path="/monitoring" component={RouteMenuTIndex} />
			<Route  path="/consultation" component={RouteMenuTIndex} />
			<Route  path="/audit" component={RouteMenuTIndex} />
			<Route path={["/profil", "/addprofil"]} component={RouteMenuTIndex} />
			<Route  path="/estimation" component={RouteMenuTIndex} />
			<Route  path="/historique" component={RouteMenuTIndex} />
			<Route  path="/role" component={RouteMenuTIndex} />
			<Route path={["/entitesn", "/addEntiten"]} component={RouteMenuIndexN} />
			<Route path={["/periodesn", "/addPeriodesn"]} component={RouteMenuIndexN} />
			<Route exact path="/" component={RouteMenuTIndex}/>
			<Route path={["/login"]} component={AuthentificationIndex} />
			<Route path={["/menu"]} component={MenuHorizontalIndex} />
			<Route path={["/menuF"]} component={MenuFIndex} />
		</BrowserRouter>
		
	  );
	}
	else{return <>loading...</>}
  
}

export default App;
