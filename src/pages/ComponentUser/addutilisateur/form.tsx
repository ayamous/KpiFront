import { MouseEvent, useState, ChangeEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from '../../../services/axiosUserConfig';

export enum Notification{
    enabled, 
    disabled
}
const FormUser = () => {

    const [firstName, setFirstName] = useState<string>();
    const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.currentTarget.value);
    }

    const [lastName, setlastName] = useState<string>();
    const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setlastName(e.currentTarget.value);
    }

    const [email, setEmail] = useState<string>();
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
    }
    const [isLoading, setLoading] = useState<Boolean>(false);
    const [selectedProfil, setProfil] = useState<{ label: string, value: string }>();
    
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const label = event.currentTarget.value;
        let index = 0
        while (true) {
            if (options[index].label === label) {
                break;
            }
            index++;
        }
        setProfil(options[index]);
    };

    const options = [
        { label: "admin", value: "admin" },
        { label: "saisie", value: "saisie" },
        { label: "consultant", value: "consultant" }
    ]

    const [classNameActif, setClassNameActif] = useState("actif");
    const handlerInputType = (e:React.MouseEvent<HTMLElement>) : void => {
      if (classNameActif) {
          setClassNameActif("actif");
      } else {
          setClassNameActif("null");
      }
    };
  
    const [checkboxActif, setCheckboxActif] = useState("");
    const [checked, setChecked] = useState(false);
    const [checkedValue, setCheckedValue] = useState<string>("disabled");
    //console.log("checked", checked)
  
    const user = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        profile: selectedProfil?.value,
        attributes:{
            notification :[checkedValue]
        }
    };
  
  const handlerCheckboxActif = (e: ChangeEvent<HTMLInputElement>) : void => {
      if(checkboxActif=="checkboxActif"){
          setCheckboxActif("");       
      }else{
          setCheckboxActif("checkboxActif");
      } 
      setChecked(!checked)
      var value = e.target.value;
      setCheckedValue(value)
      //console.log("You selected " + value);
  
  };

    let history = useHistory();
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [validFirstName, setvalidFirstName] = useState<boolean>(false);
    const [validLastName, setValidLastName] = useState<boolean>(false);
    const [validSelectedProfil, setvalidSelectedProfil] = useState<boolean>(false);
    const onSubmit = (event: MouseEvent) => {
        event.preventDefault();
        if(user.email== null){
            toast.error("Erreur! données non enregistrées");
            setValidEmail(true)
            setLoading(true);
          }else if(user.firstName== null){
            toast.error("Erreur! données non enregistrées");
            setvalidFirstName(true)
            setLoading(true);
          }
          else if(user.profile== null){
            toast.error("Erreur! données non enregistrées");
            setvalidSelectedProfil(true)
            setLoading(true);
          }
        else if(user.lastName== null){
            toast.error("Erreur! données non enregistrées");
            setValidLastName(true)
            setLoading(true);
          }
          else{
            axiosInstance.post('users', user)
            .then((res) => {
                setLoading(false);
                toast.success('les données ont été enregistrées avec succès');
                history.push("/users");
            })
            .catch((err) => {
                setLoading(false);
                if(err.response?.status === 409){
                    toast.error('il existe déjà un enregistrement avec cet email');
                }else{
                    toast.error('Erreur! données non enregistrées');
                }
            })
          }
        
    };

    return (
        <div className="app">
            <div className="formCls">
          <Toaster/>
            <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field d-flex">
            <Link to='/users' ><span className="titleEntiteLien">LISTE DES UTILISATEURS</span></Link>
            <div className="fleshLien">
              <span>{'>'}</span>
            </div>
              <span className="titleEntiteWL">AJOUTER UN UTILISATEUR</span>
            </div>
          </div>
          <div className="formlistAdd">
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" className="form-control" placeholder="nom@mail.com" value={email} onChange={handleChangeEmail} />
                    <span className={validEmail?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
                </div>
                <div className="form-field">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" className="form-control" placeholder="Saisissez ici.." value={firstName} onChange={handleChangeFirstName} />
                    <span className={validFirstName?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
                </div>
                <div className="form-field">
                    <label htmlFor="prenom ">Prénom </label>
                    <input id="prenom" className="form-control" placeholder="Saisissez ici.." value={lastName} onChange={handleChangeLastName} />
                    <span className={validLastName?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
                </div>
            <div className="form-field">
                <label htmlFor="profil">Profil</label>
                <br />
                <select id="profil" className="fselect-group" onChange={selectChange} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled selected >
                        Liste des profils
                    </option>
                    <option value="admin">Admin</option>
                    <option value="saisie">Saisie</option>
                    <option value="consultant">Consultant</option>
                </select>
                <span className={validSelectedProfil?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
            </div>
            <div className= {`form-field rappelCss ${checkboxActif}`}>
        <input
          type="checkbox"
          id="subscribeNews"
          name="subscribe"
          value={!checked?"enabled":"disabled"}
          onChange={handlerCheckboxActif}
        />
        <label htmlFor="subscribeNews" className="labelRappel">
        Cet utilisateur recevra des rappels
        </label>
      </div>
            <div className="btnCls">
                <Link to='/users' ><button  onClick={(e:React.MouseEvent<HTMLElement>) =>handlerInputType(e)}  className= {`reset ${classNameActif}`}>ANNULER</button></Link>
                <button className="submit" onClick={onSubmit}>ENREGISTRER</button>
            </div>
        </div>
        </div>
        </div>
    );
};
export default FormUser;