import { BrowserRouter, Route } from "react-router-dom";
import MenuFIndex from "../pages/MenuFix/MenuF";



const RouteMenuIndexN = ()=>{
  
    return (
        <div className="contentCls">
            <MenuFIndex/>
            <BrowserRouter>
            </BrowserRouter>   
        </div>
    )
}
export default RouteMenuIndexN;