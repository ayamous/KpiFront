const NavBarHorizontalIndex = ()=>{

    return (
        <div className="navBarHorizontalCls d-flex justify-content-between">
            <div className="h2Cls">
                <h2>Ajouter un Utilisateur</h2>
            </div>
            <div className="imgCls d-flex justify-content-between">
                <img src="./assets/images/BillActive.svg" className="imgNotif"/>
                <img src="./assets/images/Profile11.svg"  className="imgPro"/>
                <span>SUP ADMIN</span>
            </div> 
        </div>
    )
}

export default NavBarHorizontalIndex;