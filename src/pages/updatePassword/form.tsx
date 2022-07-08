import React, { useState } from "react";
import { BiHide } from "react-icons/bi";
import {FaEye} from "react-icons/fa"
import { FaEyeSlash } from "react-icons/fa";

const FormUpdate = () => {

  const [inputType, setInputType] = useState("password");
  const [iconImg, setIconImg] = useState(<FaEyeSlash/>);


  const [inputTypeNouveau, setInputTypeNouveau] = useState("password");
  const [iconImgNouveau, setIconImgNouveau] = useState(<FaEyeSlash/>);


  const [inputTypeConfirm, setInputTypeConfirm] = useState("password");
  const [iconImgConfirm, setIconImgConfirm] = useState(<FaEyeSlash/>);


  const handlerInputTypeAncien = (e:React.MouseEvent<HTMLElement>) : void => {
      
    if (inputType === "password" && iconImg ) {
      setInputType("text"); 
      setIconImg(<FaEye/>);
    } else {
      setInputType("password");
      setIconImg(<FaEyeSlash/>);
    }
  };


  const handlerInputTypeNouveau = (e:React.MouseEvent<HTMLElement>) : void => {
    if (inputTypeNouveau === "password" && iconImgNouveau) {
        setInputTypeNouveau("text");
        setIconImgNouveau(<FaEye/>);
    } else {
        setInputTypeNouveau("password");
        setIconImgNouveau(<FaEyeSlash/>);
    }
  };

  const handlerInputTypeConfirm = (e:React.MouseEvent<HTMLElement>) : void => {
    if (inputTypeConfirm === "password" && iconImgConfirm) {
        setInputTypeConfirm("text");
        setIconImgConfirm(<FaEye/>);
    } else {
        setInputTypeConfirm("password");
        setIconImgConfirm(<FaEyeSlash/>);
    }
  };

  return (
    <div className="form ">
      <div className="form-field">
        <button onClick={(e:React.MouseEvent<HTMLElement>) => handlerInputTypeAncien(e)} className="btn-null">
          <i>
          { iconImg }
          </i>
        </button>
        <input placeholder="Ancien mot de passe" type={inputType} />
      </div>
      <div className="form-field">
        <button onClick={(e:React.MouseEvent<HTMLElement>) => handlerInputTypeNouveau(e)} className="btn-null">
          <i>
          { iconImgNouveau }
          </i>
        </button>
        <input placeholder="Nouveau mot de passe" type={inputTypeNouveau} />
      </div>
      <div className="form-field">
        <button onClick={(e:React.MouseEvent<HTMLElement>) => handlerInputTypeConfirm(e)} className="btn-null">
          <i>
          { iconImgConfirm }
          </i>
        </button>
        <input placeholder="Confirmer le mot de passe" type={inputTypeConfirm} />
      </div>
      <button className="submit">CONFIRMER</button>
    </div>
  );
};
export default FormUpdate;
