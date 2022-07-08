import { ChangeEvent, MouseEvent, useState } from "react";
import axiosInstance from "../../../services/axiosConfig";
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from 'react-router-dom';


const FormSystemSrc = () => {
  const[label, setLabel]= useState<string>();
  const[description,setDascription]=useState<string>();

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>)=>{
    setLabel(e.currentTarget.value);
  }

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>)=>{
    setDascription(e.currentTarget.value);
  }

  const sysSource={
    label:label,
    description:description
  }
  const [validLabel, setValidLabel] = useState<boolean>(false);
  const [validDescription, setvalidDescription] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(false);
  let history = useHistory();
  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();
    if(sysSource.label== null){
      toast.error("Erreur! données non enregistrées");
      setValidLabel(true)
      setLoading(true);
    }else if(sysSource.description== null){
      toast.error("Erreur! données non enregistrées");
      setvalidDescription(true)
      setLoading(true);
    }else{
      axiosInstance.post('system-sources', sysSource)
        .then((res) => {
            setLoading(false);
            toast.success('les données ont été enregistrées avec succès');
            history.push("/systemSource");
        })
        .catch((err) => {
            setLoading(false);
            toast.error('Erreur! données non enregistrées');
        })
    }
    
    };
    const [classNameActif, setClassNameActif] = useState("actif");
    const handlerInputType = (e:React.MouseEvent<HTMLElement>) : void => {
      if (classNameActif) {
          setClassNameActif("actif");
      } else {
          setClassNameActif("null");
      }
    };
    return (
      <div className="app">
      <div className="formCls">
        <Toaster />
        <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field d-flex">
            <Link to='/systemSource'><span className="titleEntiteLien">LISTE DES SYSTÈMES SOURCE</span></Link>
            <div className="fleshLien">
              <span>{'>'}</span>
            </div>
              <span className="titleEntiteWL">AJOUTER UN SYSTÈME SOURCE</span>
            </div>
          </div>
      <div className="formlistAdd">
        <div className="form-field">
          <label htmlFor="label">libellé</label>
          <input id="label" className="form-control" placeholder="Système source" onChange={handleChangeLabel}/>
          <span className={validLabel?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input id="description" className="form-control" placeholder="Saisissez ici.." onChange={handleChangeDescription}/>
          <span className={validDescription?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
      <div className="btnCls">
                <Link to='/systemSource' ><button  onClick={(e:React.MouseEvent<HTMLElement>) =>handlerInputType(e)}  className= {`reset ${classNameActif}`}>ANNULER</button></Link>
                <button className="submit" onClick={onSubmit}>ENREGISTRER</button>
            </div> 
            </div>
            </div>
        </div>
    );
  };
  export default FormSystemSrc;