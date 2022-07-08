import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavBarIndex from "../../navBar/NavBarIndex";
import NavBarHorizontalIndex from "../../navBarHorizontal/NavBarHorizontalIndex";
import FormUpdateIndicateur from "./form";
import FormIndicateur from "./form";

const UpdateIndicateurIndex = () => {
  interface statetype{
    
      id:any
    
  }
  const location = useLocation<statetype>();
  useEffect(()=>{
    console.log(location?.state,"test")
  })
  const id = location?.state?.id;
  return (
    <FormUpdateIndicateur id={id} />
  );
};

export default UpdateIndicateurIndex;
