import { CircularProgress } from "@mui/material";
import { ChangeEvent, useState, MouseEvent, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import axiosInstanceUser from "../../../services/axiosUserConfig";

const FormProfil = () => {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>)=>{
    setName(e.currentTarget.value);
  }

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>)=>{
    setDescription(e.currentTarget.value);
  }

  const [classNameActif, setClassNameActif] = useState("actif");
  const inputRefName = useRef(null);
  const inputRefDescription = useRef(null);
  const handlerAnnuler = (e:React.MouseEvent<HTMLElement>) : void => {
  //@ts-ignore
  inputRefName.current.value = "";
  //@ts-ignore
  inputRefDescription.current.value = "";
  };
  const role={
    name:name,
    description:description
  }
  let history = useHistory();
  const [isLoading, setLoading] = useState<Boolean>(false);
  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosInstanceUser.post('users/roles', role)
        .then((res) => {
            setLoading(false);
            toast.success('les données ont été enregistrées avec succès');
            history.push("/profil");
        })
        .catch((err) => {
            setLoading(true);
            toast.error('Erreur! données non enregistrées');
        })
};
  return (
    <div className="app">
        <div className="formCls">
          <Toaster/>
          <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field d-flex">
            <Link to='/profil' ><span className="titleEntiteLien">LISTE DES PROFILS</span></Link>
            <div className="fleshLien">
              <span>{'>'}</span>
            </div>
              <span className="titleEntiteWL">AJOUTER UN PROFIL</span>
            </div>
          </div>
          <div className="formlistAdd">
          <div className="form-field">
          <label htmlFor="label">libellé</label>
          <input id="label" className="form-control" onChange={handleChangeName} ref={inputRefName}/>
        </div>
        <div className="form-field">
          <label htmlFor="description">Commentaire</label>
          <input id="description" className="form-control" onChange={handleChangeDescription} ref={inputRefDescription}/>
        </div>
        <div className="btnCls">
                <button  onClick={handlerAnnuler}  className= {`reset ${classNameActif}`}>ANNULER</button>
                <button className="submit" onClick={onSubmit}>ENREGISTRER</button>
      </div>
            
          </div>
        </div>
      </div>
  );
};
export default FormProfil;