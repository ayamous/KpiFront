const MenuHorizontalIndex = ()=>{

    return (
        <div className="navBarHorizontalClsC d-flex justify-content-between">
            <div className="h2Cls">
            <img src="./assets/images/logoMenu.svg" className="imgLogo"/>
            </div>
            <div className="imgCls d-flex">
            <header>
                <nav>
                <ul>
                    <li><a href="#">Gestion Indicateurs<img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/></a>
                        <ul className="ulCls">
                            <li><a href="#">Référentiel</a></li>
                            <li><a href="#">Master Data<img src="./assets/images/fleshRMenu.svg" className="fleshBH"/></a>
                              <ul className="ulCls">
                                <li><a>Périodes & Année de Référence</a></li>
                                <li><a>Rappels</a></li>
                                <li><a>Entité</a></li>
                                <li><a>Système sources</a></li>
                                <li><a>Groupe Indicateur</a></li>
                                <li><a>Affectation</a></li>
                              </ul>
                            </li>
                            <li><a href="#">Contrôle</a></li>
                            <li><a href="#">Evaluation</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Saisie Indicateurs<img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/></a>
                      <ul className="ulCls">
                        <li><a>Saisie</a></li>
                        <li><a>Import</a></li>
                        <li><a>Estimation</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Consultation <img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/></a>
                       <ul>
                        <li><a>Consultation</a></li>
                        <li><a>Monitoring</a></li>
                        <li><a>Audit</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Gestion Accès<img src="./assets/images/fleshBasMenu.svg" className="fleshBH"/></a>
                      <ul>
                        <li><a>Gestion Utilisateurs</a></li>
                        <li><a>Gestion Rôles</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Dashbord</a></li>
                    </ul>
          
                </nav>
            </header>
            <div className="divMenu d-flex">
                <img src="./assets/images/notif.svg" className="imgNotif"/>
                <div className="avatar">
                <img src="./assets/images/Avatar.svg" className="imgPro"/>
                <span>SUP ADMIN</span>
                </div>
                
            </div>    
            </div> 
        </div>
    )
}

export default MenuHorizontalIndex;