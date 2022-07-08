import { ChangeEvent, MouseEvent, useState, useEffect, SyntheticEvent } from "react";
import axiosInstance from "../../../services/axiosConfig";
import toast, { Toaster } from 'react-hot-toast';
import { Link, useHistory } from 'react-router-dom';
import { SelectChangeEvent } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axiosInstanceUser from "../../../services/axiosUserConfig";

interface IGroupeIndicateur {
  id: number;
  label: string;
  kpis: [
    {
      id: number;
      name: string;
      reference: string;
      description: string;
      perdiodicity: string;
      EstimationMethod: string;
      productionPeriod: string;
      entite: {
        id: number;
        label: string;
        description: string;
        reference: null;
      };
      category: {
        id: number;
        label: string;
        description: string;
      };
      systemSource: {
        id: number;
        label: string;
        description: string;
      };
      kpiGroup: null;
      documents: [
        {
          id: number;
          fileName: string;
          fileUrl: string;
          folderId: string;
          message: string;
        }
      ];
      inductor: {
        id: string;
        name: string;
        reference: string;
        description: string;
        perdiodicity: string;
        EstimationMethod: string;
        productionPeriod: string;
        inductor: string;
        kpiGroup: null;
        entite: null;
        category: null;
        systemSource: null;
        documents: [
          {
            id: string;
            fileName: string;
            fileUrl: string;
            folderId: string;
            message: string;
          }
        ];
      };
    }
  ];
}
interface IGroupeIndicateur {
  id: number;
  label: string;
}
interface Iuser {
  id: number;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
}
const FormAddGestionAffectation = () => {

  const [grpIndicateurs, setGrpIndicateurs] = useState<IGroupeIndicateur[]>([]);
  const [grpIndicteur, setGrpIndicateur] = useState<IGroupeIndicateur[]>([]);
 console.log("grpIndicateurs grpIndicteur", grpIndicteur)
  const [idSelected, setidSelected] = useState("");
  const [users, setUsers] = useState<Iuser[]>([]);
  const [user, setUser] = useState<Iuser>();

  const handleChangeUser = (e: ChangeEvent<HTMLSelectElement>) => {
    const entityid = e.target.value;
    setidUser(idUser);
    let entite = users.find(item => {
      if (item.id == Number(entityid)) return true;
    }, users);
    setUser(user)
  }
  const [idUser, setidUser] = useState("");

  const [userAll, setuserAll] = useState<string[]>([]);
  console.log("userSelect", userAll)
  const [selectedProfil, setProfil] = useState<{ label: string, value: string }>();

  const handleChange = (event: SelectChangeEvent<typeof userAll>) => {
    const {
      target: { value },
    } = event;
    setuserAll(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 450
      },
    },
  };

  const [paramFilter, setParamFilter] = useState<string>("");
  console.log("paramFilter Param!", paramFilter)

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    setParamFilter(label);
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
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [classNameActif, setClassNameActif] = useState("actif");

  useEffect(() => {
    axiosInstanceUser.get('/users?profile=' + paramFilter)
      .then((res) => {
        const data: Iuser[] = res.data.users;
        let userscopy = [...users]
        data.forEach(element => {
          userscopy.push(element)
        });
        setUsers(userscopy)
      })
  }, [paramFilter]);


  const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
    if (classNameActif) {
      setClassNameActif("actif");
    } else {
      setClassNameActif("null");
    }
  };
  let history = useHistory();
  const [payloadState, setPayloadState] = useState<number[]>([]);

  useEffect(() => {
    console.log("payloadState payloadState", payloadState)
  }, [payloadState])
  const handleItem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: number) => {
    setPayloadState([...payloadState, id]);
  }
  const handleChangeGroupeIndicteur = (e: ChangeEvent<HTMLSelectElement>) => {
    const grpIndicateursId = e.target.value;
    console.log("grpIndicateursId",grpIndicateursId)
    setidSelected(grpIndicateursId);
    let grpIndicteurV = grpIndicateurs.find((item) => {
      if (item.id == Number(grpIndicateursId)) return true;
    }, grpIndicateurs);
    setGrpIndicateur(grpIndicteur);
  };

  useEffect(() => {
    axiosInstance.get("/kpi-groups").then((res) => {
      const data: IGroupeIndicateur[] = res.data.content;
      let grpIndicteurscopy = [...grpIndicateurs];
      data.forEach((element) => {
        grpIndicteurscopy.push(element);
      });
      setGrpIndicateurs(grpIndicteurscopy);
    });
  }, []);

  const [nomUtilisateur, setNomUtilisateur] = useState<boolean>(false);
  const [profil, setProfils] = useState<boolean>(false);
  const[valideGrpIndicteur, setValideGrpIndicteur]= useState<boolean>(false);
  //console.log("setProfils332",profil)
  const onSubmit = (event: SyntheticEvent<EventTarget>, idSelected: any) => {
    // console.log('event', event);
    event.preventDefault();
    // if(grpIndicateurs.length===0){
    //   toast.error("Erreur! données non enregistrées");
    //   setLoading(true);
    //   setValideGrpIndicteur(true)
    // }
    // else
     if(paramFilter.length==0){
      toast.error("Erreur! données non enregistrées");
      setLoading(true);
      setProfils(true)
    }else if (userAll.length == 0) {
      toast.error("Erreur! données non enregistrées");
      setLoading(true);
      setNomUtilisateur(true)
    }
     else {
     // console.log(userAll ,users,"efdz")
     let payload: string[] = []
     userAll.forEach((elment2) => {
       //@ts-ignore
       payload.push(users.find(element => element.lastName == elment2).id)
     })
     axiosInstance
       .post(`/kpi-groups/${idSelected}/assignments`, payload)
       .then((res) => {
         setLoading(false);
         toast.success("les données ont été enregistrées avec succès");
         history.push("/gestionsAfetions");
       })
       .catch((err) => {
         setLoading(false);
         toast.error("Erreur! données non enregistrées");
       });
    }
  };

  const [isChecked, setIsChecked] = useState(false);


  return (
    <div className="app">
      <div className="formCls">
        <Toaster />

        <div className="d-flex justify-content-between contenuBtnUrl">
          <div className="form-field d-flex">
            <Link to='/gestionsAfetions' ><span className="titleEntiteLien">LISTE DES GROUPES D'AFFECTATION</span></Link>
            <div className="fleshLien">
              <span>{'>'}</span>
            </div>
            <span className="titleEntiteWL">AJOUTER UNE AFFECTATION</span>
          </div>
        </div>
        <div className="formlistAdd">
          <div className="form-group">
            <label htmlFor="frm">Nom groupe</label>
            <br />
            <select
              id="frm"
              className="fselect-group"
              onChange={handleChangeGroupeIndicteur}

            >
              <option value="DEFAULT" disabled selected>
                Liste des groupes
              </option>
              {grpIndicateurs.map((grpIndicateur) => (
                <option value={grpIndicateur.id} key={grpIndicateur.id}>
                  {grpIndicateur.label}
                </option>
              ))}
            </select>
            <span className={valideGrpIndicteur?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
          </div>
          <div className="form-field">
            <label htmlFor="profil">Profil</label>
            <br />
            <select id="profil" className="fselect-group fselectHeight" onChange={selectChange} defaultValue={'DEFAULT'}>
              <option value="DEFAULT" disabled selected >
                Liste des profils
              </option>
              <option value="admin">Admin</option>
              <option value="saisie">Saisie</option>
              <option value="consultant">Consultant</option>
            </select>
            <span className={profil?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
          </div>
          <div className="form-group">
            <InputLabel id="demo-multiple-checkbox-label">Nom utilisateur</InputLabel>
            <Select className="selectedItem"
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={userAll}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" className="selectedItem" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.lastName}>
                  <Checkbox onClick={(e) => handleItem(e, user.id)} checked={userAll.findIndex(element => element == user.lastName) > -1} />
                  <ListItemText primary={user.lastName} />
                </MenuItem>
              ))}
            </Select>
            <span className={nomUtilisateur ? "msgRequired" : "msgRequiredNone"}>ce champ est obligé*</span>
          </div>
        </div>
        <div className="btnCls">
          <Link to='/gestionsAfetions' ><button onClick={(e: React.MouseEvent<HTMLElement>) => handlerInputType(e)} className="reset">ANNULER</button></Link>
          <button className="submit" onClick={(event) => onSubmit(event, idSelected)}>ENREGISTRER</button>

          {/* {isLoading ? <div className="progress"><CircularProgress style={{ 'color': '#C82345' }} /></div>
                    : <button className="submit"  onClick={(event)=>onSubmit(event, idSelected)}>ENREGISTRER</button>} */}
        </div>
      </div>

    </div>
  );
};
export default FormAddGestionAffectation;