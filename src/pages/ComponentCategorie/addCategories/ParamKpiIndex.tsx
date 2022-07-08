import React, { useState } from "react";
import FormParamKpi from "./form";

const AddCategorieIndex = ()=>{
    const [classNameActif, setClassNameActif] = useState("actif");

  const handlerInputType = (e:React.MouseEvent<HTMLElement>) : void => {
      
    if (classNameActif) {
        setClassNameActif("actif");
    } else {
        setClassNameActif("null");
    }
  };
    return (
              <div className="user container d-flex">
                  <div className="formCls">
                  <FormParamKpi/>
                  </div>
              </div>
    )
}

export default AddCategorieIndex;
