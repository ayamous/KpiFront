import { CircularProgress } from "@mui/material";
import { ChangeEvent, useState, MouseEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";

const FormEntite = () => {

  const [submited, setSubmited] = useState(false)

  const [label, setLabel] = useState<string>();
  const handleChangeEntite = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.currentTarget.value);
  }

  const [description, setDescription] = useState<string>();
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  }

  const entite = {
    label: label,
    description: description
  }

  const [validLabel, setValidLabel] = useState<boolean>(false);
  const [validDescription, setvalidDescription] = useState<boolean>(false);
  let history = useHistory();

  const [isLoading, setLoading] = useState<Boolean>(false);
  const onSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    setSubmited(true)
    setLoading(true);
    if (entite.label == null) {
      toast.error("Erreur! données non enregistrées");
      setValidLabel(true)
    } else if (entite.description == null) {
      toast.error("Erreur! données non enregistrées");
      setvalidDescription(true)
    } else {
      await createEntity();
    }
  };

  const createEntity = async () => {

    await axiosInstance.post('entites', entite)
    try {
      setLoading(false);
      toast.success('les données ont été enregistrées avec succès');
      history.push("/entites");
    } catch (error) {
      setLoading(true);
      toast.error('Erreur! données non enregistrées');
    }
    setSubmited(false)
  }
  const [classNameActif, setClassNameActif] = useState("actif");

  const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {

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
            <Link to='/entites' ><span className="titleEntiteLien">LISTE DES ENTITÉS</span></Link>
            <div className="fleshLien">
              <span>{'>'}</span>
            </div>
            <span className="titleEntiteWL">AJOUTER UNE ENTITÉ</span>
          </div>
        </div>

        <div className="formlistAdd">
          <div className="form-field">
            <label htmlFor="label">libellé</label>
            <input id="label" placeholder="Entité " className="form-control" onChange={handleChangeEntite} />
            <span className={validLabel ? "msgRequired" : "msgRequiredNone"}>ce champ est obligé*</span>
          </div>
          <div className="form-field">
            <label htmlFor="description">Description</label>
            <input id="description" className="form-control" placeholder="Saisissez ici.." onChange={handleChangeDescription} />
            <span className={validDescription ? "msgRequired" : "msgRequiredNone"}>ce champ est obligé*</span>
          </div>
          <div className="btnCls">
            <Link to='/entites' ><button onClick={(e: React.MouseEvent<HTMLElement>) => handlerInputType(e)} className={`reset ${classNameActif}`}>ANNULER</button></Link>
            <button className="submit" onClick={onSubmit} disabled={submited} >ENREGISTRER</button>
          </div>

        </div>
      </div>
    </div>
  );
};
export default FormEntite;