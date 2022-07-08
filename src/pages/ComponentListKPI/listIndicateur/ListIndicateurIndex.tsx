import NavBarIndex from "../../navBar/NavBarIndex";
import NavBarHorizontalIndex from "../../navBarHorizontal/NavBarHorizontalIndex";
import FormIndicateurList from "./form";

const ListIndicateurIndex = ()=>{
    return (
      <div className="d-flex">
      <NavBarIndex />
      <div className="contentCls">
        <NavBarHorizontalIndex />
        <div className="user listkpi container d-flex">
        <div className="formCls">
         <FormIndicateurList/>
        </div>
      </div> 
      </div>      
    </div>
      
    )
    
}

export default ListIndicateurIndex;

