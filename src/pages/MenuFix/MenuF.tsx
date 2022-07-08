import { NavLink } from "react-router-dom";
import keycloak from '../../keycloak';
const MenuFIndex = ()=>{
    return (
        <div className="d-flex menuSKO">
            <div className="logo">
                <img src="./assets/images/logoMenu.svg" className="imgLogo"/>
            </div>
            <div className="d-flex menuCenter">
                <ul className="ulFirst">
                    <li className="liFirst liInderline"><a href="#">Gestion Indicateurs<img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/></a>
                        <ul className="ulSeconde">
                            <li className="liSeconde"><NavLink to='/indicateurs' activeClassName="active">Référentiel</NavLink></li>
                            <li className="liSeconde"><a href="#">Master Data</a><img src="./assets/images/fleshRMenu.svg" className="fleshB"/>
                              <ul className="ulthird">
                                <li className="lithird"><NavLink to='/periodes' activeClassName="active">Périodes & Année de Référence</NavLink></li>
                                <li className="lithird"><NavLink to='/rappel' activeClassName="active">Rappels</NavLink></li>
                                <li className="lithird"><NavLink to='/entites' activeClassName="active" >Entité</NavLink></li>
                                <li className="lithird"><NavLink to='/systemSource' activeClassName="active">Système sources</NavLink></li>
                                <li className="lithird"><NavLink to='/groupeIndicateur' activeClassName="active">Groupe Indicateur</NavLink></li>
                                <li className="lithird"><NavLink to='/gestionsAfetions' activeClassName="active">Affectation</NavLink></li>
                                <li className="lithird"><NavLink to='/categorie' activeClassName="active">Catégorie</NavLink></li>
                              </ul>
                            </li>
                            <li className="liSeconde"><NavLink to='/controles' activeClassName="active">Contrôles</NavLink></li>
                            <li className="liSeconde"><NavLink to='/evaluations' activeClassName="active">Evaluation</NavLink></li>
                        </ul>
                    </li>
                    <li className="liFirstSec liInderline"><a href="#">Saisie Indicateurs<img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/></a>
                      <ul className="ulSeconde">
                        <li className="liSeconde"><NavLink to='/saisie' activeClassName="active">Saisie</NavLink></li>
                        <li className="liSeconde"><NavLink to='/import' activeClassName="active">Import</NavLink></li>
                        <li className="liSeconde"><NavLink to='/estimation' activeClassName="active">Estimation</NavLink></li>
                      </ul>
                    </li>
                    <li className="liFirst liInderline"><a href="#">Consultation <img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/></a>
                       <ul className="ulSeconde">
                        <li className="liSeconde"><NavLink to='/consultation' activeClassName="active">Consultation</NavLink></li>
                        <li className="liSeconde"><NavLink to='/monitoring' activeClassName="active">Monitoring</NavLink></li>
                        <li className="liSeconde"><NavLink to='/audit' activeClassName="active">Audit</NavLink></li>
                      </ul>
                    </li>
                    <li className="liFirstF liInderline"><a href="#">Gestion Accès<img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/></a>
                      <ul className="ulSeconde">
                        <li className="liSeconde"><NavLink to='/users' activeClassName="active">Gestion Utilisateurs</NavLink></li>
                        <li className="liSeconde"><NavLink to='/role' activeClassName="active">Gestion Rôles</NavLink></li>
                        <li className="liSeconde"><NavLink to='/profil' activeClassName="active">Profils</NavLink></li>
                      </ul>
                    </li>
                    <li className="liFirst liInderline"><a href="#">Dashbord</a></li>
                    <li className="liFirst liInderline"><a href="#"><img src="./assets/images/notif.svg" className="imgNotif"/></a></li>
                    
                    <li className="liFirst liInderline">
                      <a href="#">
                        <div className="d-flex avatar">
                          <img src="./assets/images/Avatar.svg" className="imgPro"/>
                          <span className='supAd'>SUP ADMIN</span>
                          <img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/>              
                        </div>
                      </a>
                        <ul className="ulSeconde">
                        <li className="liSeconde" onClick={()=>{keycloak.logout()}}><a>
                        <form id="logout-form" className="hidden">
                        <button className="logoutcls" >
                          <a href='#' className="aLog" >
                          <img src="./assets/images/logOut.svg" className="logOut"/>Se Déconnecter 
                          </a>
                        </button>
                      </form>
                          </a>
                          </li>
                        </ul>
                    </li> 
                </ul>
            </div>
        </div>
    )
}

export default MenuFIndex;


