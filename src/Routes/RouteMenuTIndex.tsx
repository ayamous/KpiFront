import { BrowserRouter, Route } from "react-router-dom";
import FormSystemSource from "../pages/ComponentSystemSource/systemSource/form";
import FormEntiteList from "../pages/ComponentEntite/listEntite/form";
import FormUserList from "../pages/ComponentUser/listUsers/form";
import FormGroupeIndicateurListe from "../pages/ComponenetGroupeIndicateur/ListGroupeIndicateur/form";
import MenuFIndex from "../pages/MenuFix/MenuF";
import FormEntite from "../pages/ComponentEntite/addentite/form";
import FormUser from "../pages/ComponentUser/addutilisateur/form";
import FormSystemSrc from "../pages/ComponentSystemSource/addSystemSource/form";
import FormCategorie from "../pages/ComponentCategorie/addCategories/form";
import FormCategorieList from "../pages/ComponentCategorie/gestionCategories/form";
import FormIndicateurList from "../pages/ComponentListKPI/listIndicateur/form";
import UpdateIndicateurIndex from "../pages/ComponentListKPI/updateIndicateur/UpdateIndicateurIndex";
import FormControleList from "../pages/ComponentRegleControle/gestionControle/form";
import FormControle from "../pages/ComponentRegleControle/addControle/form";
import FormPeriodeList from "../pages/gestionPeriode/gestionPeriode/form";
import FormGroupeIndicateurAdd from "../pages/ComponenetGroupeIndicateur/addGroupeIndicateur/form";
import FormGestionAffectationList from "../pages/GestionAffectation/gestionAffectation/form";
import FormAddGestionAffectation from "../pages/GestionAffectation/addGestionAffectation/form";
import FormIndicateur from "../pages/ComponentListKPI/addIndicateur/form";
import DashbordIndex from "../pages/ComponentDashboard/DashbordIndex";
import FormImportList from "../pages/ComponentImport/listImport/form";
import FormRappel from "../pages/ComponentRappel/addRappel/form";
import UpdateControleIndex from "../pages/ComponentRegleControle/updateControle/UpdateControleIndex";
import FormSaisieInducteur from "../pages/ComponentSaisieIndicateur/SaisieInducteur/form";
import FormDetails from "../pages/ComponentSaisieIndicateur/ComponentDetailsIndicateur/form";
import FormMonitoring from "../pages/ComponentMonitoring/form";
import FormConsultation from "../pages/ComponentConsultation/form";
import DetailIndicateurIndex from "../pages/ComponentSaisieIndicateur/ComponentDetailsIndicateur/DetailIndicateurIndex";
import FormAudit from "../pages/ComponentAudit/form";
import FormProfilList from "../pages/ComponentProfil/listProfil/form";
import FormProfil from "../pages/ComponentProfil/addProfil/form";
import FormEstimation from "../pages/ComponentEstimation/addEstimation/form";
import FormHistoriqueList from "../pages/ComponentEstimation/listEstimation/form";
import FormRole from "../pages/ComponentRole/form";

const RouteMenuTIndex = ()=>{
    return (
        <div className="contentCls">
            <MenuFIndex/>
            <BrowserRouter>
                <Route exact path="/" component={DashbordIndex}/>
                <Route exact path="/users" component={FormUserList}/>
                <Route exact path="/adduser" component={FormUser}/>
                <Route exact path="/entites" component={FormEntiteList}/>
                <Route exact path="/addEntite" component={FormEntite}/>
                <Route exact path="/categorie" component={FormCategorieList}/>
                <Route exact path="/addCategorie" component={FormCategorie}/>
                <Route exact path="/systemSource" component={FormSystemSource}/>
                <Route exact path="/addSystemSource" component={FormSystemSrc}/>
                <Route exact path="/groupeIndicateur" component={FormGroupeIndicateurListe}/>
                <Route exact path="/addGroupeIndicateur" component={FormGroupeIndicateurAdd}/>
                <Route exact path="/gestionsAfetions" component={FormGestionAffectationList}/>
                <Route exact path="/addGestionsAfetions" component={FormAddGestionAffectation}/>
                <Route  path="/periodes" component={FormPeriodeList} />
                <Route exact path="/indicateurs" component={FormIndicateurList}/>
		        <Route exact path="/addIndicateurs" component={FormIndicateur}/>
		        <Route  path="/update" component={UpdateIndicateurIndex} />
                <Route exact path="/controles" component={FormControleList}/>
                <Route exact path="/addControles" component={FormControle}/>
                <Route exact path="/updateControle" component={UpdateControleIndex}/>
                <Route exact path="/import" component={FormImportList}/>
                <Route exact path="/rappel" component={FormRappel}/>
                <Route exact path="/saisie" component={FormSaisieInducteur}/>
                <Route exact path="/details" component={DetailIndicateurIndex}/>
                <Route exact path="/monitoring" component={FormMonitoring}/>
                <Route exact path="/consultation" component={FormConsultation}/>
                <Route exact path="/audit" component={FormAudit}/>
                <Route exact path="/profil" component={FormProfilList}/>
                <Route exact path="/addprofil" component={FormProfil}/>
                <Route exact path="/estimation" component={FormEstimation}/>
                <Route exact path="/historique" component={FormHistoriqueList}/>
                <Route exact path="/role" component={FormRole}/>
            </BrowserRouter>   
        </div>
    )
}
export default RouteMenuTIndex;