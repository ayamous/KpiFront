import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FormDetails from "./form";

const DetailIndicateurIndex = () => {
  interface statetype{
      id:any
  }
  const location = useLocation<statetype>();
  useEffect(()=>{
    console.log(location.state,"test 1111")
  })
  const id = location.state.id;
  return (
    <FormDetails id={id} />
  );
};

export default DetailIndicateurIndex;
