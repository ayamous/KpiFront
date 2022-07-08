import { useLocation } from "react-router-dom";
import FormUpdateControle from "./form";

const UpdateControleIndex = ()=>{
    interface statetype{
        id:any
    }
    const location = useLocation<statetype>();
    const id = location.state.id;
    return (
        <FormUpdateControle  id={id}/>
    )  
}
export default UpdateControleIndex;
