import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {FaEye} from "react-icons/fa"

const FormAuth = () => {


  // const loginHandler = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault();
  //   dispatch(authActions.login());
  // };


  const [inputType, setInputType] = useState("password");
  const [iconImg, setIconImg] = useState(<FaEyeSlash/>);


  const handlerInputType = (e:React.MouseEvent<HTMLElement>) : void => {
      
    if (inputType === "password" && iconImg ) {
      setInputType("text"); 
      setIconImg(<FaEye/>);
    } else {
      setInputType("password");
      setIconImg(<FaEyeSlash/>);
    }
  };


  return (
    <div className="form">
      <div className="form-field">
        <label htmlFor="email">Email / Nom</label>
        <input id="email" placeholder="Ahmed" className="form-control"/>
      </div>

      <div className="form-field">
        <button onClick={(e:React.MouseEvent<HTMLElement>) => handlerInputType(e)} className="btn-null">
          <i>
            { iconImg }
          </i>
        </button>
        <input placeholder="mot de passe" type={inputType} className="form-control"/>
        
      </div>

      <div className="msg">
        <div><Link to='/update'>Changer mot de passe</Link></div>
        <div><Link to='/recuperer'>Mot de passe oublié ?</Link></div>
      </div>
      <Link to='/login'><button className="submit">SE CONNECTER</button></Link>
    </div>
  );
};
export default FormAuth;
