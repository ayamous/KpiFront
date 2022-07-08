import NavBarIndex from "../../navBar/NavBarIndex";
import NavBarHorizontalIndex from "../../navBarHorizontal/NavBarHorizontalIndex";
import FormPeriodeList from "./form";
import FormControleList from "./form";
import FormIndicateurList from "./form";

const ListPeriodeIndex = ()=>{
  return (
    <div className="user container d-flex">
      <div className="formCls">
        <FormPeriodeList/>
      </div>
    </div>
  )
}

export default ListPeriodeIndex;

