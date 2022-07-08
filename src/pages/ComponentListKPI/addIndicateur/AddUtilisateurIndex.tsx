import NavBarIndex from "../../navBar/NavBarIndex";
import NavBarHorizontalIndex from "../../navBarHorizontal/NavBarHorizontalIndex";
import FormIndicateur from "./form";

const AddIndicateurIndex = ()=>{
    return (
      <div className="d-flex">
      <NavBarIndex />
      <div className="contentCls">
        <NavBarHorizontalIndex />
        <div className="user listkpi container d-flex">
        <div className="formClsIndicateur">
          <FormIndicateur/>
        </div>
      </div> 
      </div>      
    </div>
      
    )


    
}

export default AddIndicateurIndex;

