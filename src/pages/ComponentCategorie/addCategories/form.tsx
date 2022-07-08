import { ChangeEvent, MouseEvent, useState } from "react";
import axiosInstance from "../../../services/axiosConfig";
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from 'react-router-dom';

const FormCategorie = () => {
  const[label, setLabel]= useState<string>();
  const[description,setDescription]=useState<string>();

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>)=>{
    setLabel(e.currentTarget.value);
  }

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>)=>{
    setDescription(e.currentTarget.value);
  }

  const categorie={
    label:label,
    description:description
  }

  const [isLoading, setLoading] = useState<Boolean>(false);
  let history = useHistory();
  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosInstance.post('categories', categorie)
        .then((res) => {
            setLoading(false);
            toast.success('les données ont été enregistrées avec succès');
            history.push("/categorie");
        })
        .catch((err) => {
            setLoading(false);
            toast.error('Erreur! données non enregistrées');
        })
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
            <Link to='/categorie' ><span className="titleEntiteLien">LISTE DES CATÉGORIES</span></Link>
            <div className="fleshLien">
              <span>{'>'}</span>
            </div>
              <span className="titleEntiteWL">AJOUTER UNE CATÉGORIE</span>
            </div>
          </div>
      <div className="formlistAdd">
        <div className="form-field">
          <label htmlFor="label">libellé</label>
          <input id="label" placeholder="Catégorie" className="form-control" onChange={handleChangeLabel}/>
        </div>
        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input id="description" placeholder="Saisissez ici.." className="form-control" onChange={handleChangeDescription}/>
        </div>
      <div className="btnCls">
                <Link to='/categorie' ><button  onClick={(e:React.MouseEvent<HTMLElement>) =>handlerInputType(e)}  className= "reset" >ANNULER</button></Link>
                {isLoading ? <div className="progress"><CircularProgress style={{ 'color': '#C82345' }} /></div>
                    : <button className="submit" onClick={onSubmit}>ENREGISTRER</button>}
            </div> 
            </div>
            </div>
        </div>
    );
  };
  export default FormCategorie;