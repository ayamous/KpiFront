import { BrowserRouter, Link, Route } from "react-router-dom";
import MenuTIndex from "../pages/menuT/MenuT";
import NavBarIndex from "../pages/navBar/NavBarIndex";
import NavBarHorizontalIndex from "../pages/navBarHorizontal/NavBarHorizontalIndex";
import FormGestionAffectation from "../pages/GestionAffectation/gestionAffectation/form";
import FormControleList from "../pages/ComponentRegleControle/gestionControle/form";
import ListPeriodeIndex from "../pages/gestionPeriode/gestionPeriode/ListPeriodeIndex";
import UpdateControleIndex from "../pages/ComponentRegleControle/updateControle/UpdateControleIndex";
import FormControle from "../pages/ComponentRegleControle/addControle/form";
import FormAddGestionAffectation from "../pages/GestionAffectation/addGestionAffectation/form";

const RouteMenuIndex = () => {
  return (
    <div className="d-flex">
      <NavBarIndex />
      <div className="contentCls">
        <NavBarHorizontalIndex />
        <MenuTIndex />
        <BrowserRouter>
          <Route exact path="/periodes" component={ListPeriodeIndex}/>
          <Route exact path="/controles" component={FormControleList}/>
          <Route exact path="/addControles" component={FormControle}/>
          <Route exact path="/updateControle" component={UpdateControleIndex}/>
          <Route exact path="/evaluations"/>
          <Route exact path="/addEvaluations"/>
          <Route exact path="/gestionsAfetions" component={FormGestionAffectation}/>
          <Route exact path="/addGestionsAfetions" component={FormAddGestionAffectation}/>

          
        </BrowserRouter>
      </div>      
    </div>
  );
};

export default RouteMenuIndex;
