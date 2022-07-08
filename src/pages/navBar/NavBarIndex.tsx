import { BrowserRouter, Link, Route } from "react-router-dom";
import {useCookies} from 'react-cookie';
import { useState } from "react";
import FormEntiteList from "../ComponentEntite/listEntite/form";


const NavBarIndex = ()=>{

    const div1 = {
        step1: 1,
        description : 'dashboard'
    };

    const div2 = {
        step1: 2,
        description : 'list'
    };

    const div3 = {
        step1: 3,
        description : 'gestion'
    };

    const div4 = {
        step1: 4,
        description : 'Historique'
    };

    const [classNameHide, setClassNameHide] = useState("none");
    const handlerDivHiden = (e:React.MouseEvent<HTMLElement>) : void => {
    if (classNameHide) {
        setClassNameHide("");
    } else {
        setClassNameHide("none");
    }
    };

    const [cookies] = useCookies(['XSRF-TOKEN']);
    return (
        <div className="navBarCls">
            <div className="">
                <div className="logo">
                    <img src={window.location.origin + "/assets/images/logo-main.svg"}  />
                </div>
            </div>
            <div className="d-flex flex-column align-items-center">
                <div className="imgDiv">
                    <img src={window.location.origin + "/assets/images/DashboardBtn.svg"} />
                    <span>Dashboard</span>
                </div>
                <div className="imgDiv">
                    <Link to='/indicateurs'><img src={window.location.origin +"/assets/images/listBtn.svg"} /></Link>
                    <span>Liste des KPI </span>
                </div>
                <div className="imgDiv" onClick={(e:React.MouseEvent<HTMLElement>) =>handlerDivHiden(e)} >
                        <img src={window.location.origin +"/assets/images/GestionBtn.svg"} />
                        <span>Gestion des Référentiels</span>
                </div>
                <div className= {`imgDiv ${classNameHide}`}>
                        <div>
                            <Link to='/users'><img src={window.location.origin +"/assets/images/ParamgnBtn.svg"} /></Link>
                            <span>Paramètres généraux</span>
                        </div>
                        <div>
                            <Link to='/gestionsAfetions'><img src={window.location.origin +"/assets/images/ParametresBtn.svg"} /></Link>
                            <span>Paramètres de KPI</span>
                        </div>
                </div>
                <div className="imgDiv">
                    <img src={window.location.origin +"/assets/images/HistoriqueBtn.svg"} />
                    <span>Historique de saisie</span>
                </div>
            </div>
            <form id="logout-form" className="hidden" action="/logout" method="POST">
				<input type="hidden" name="_csrf" value={cookies['XSRF-TOKEN']} />
				<button className="logoutcls"><img src={window.location.origin +"/assets/images/LogoutBtn.svg"}  /></button>
			</form>
        </div>
    )
}

export default NavBarIndex;