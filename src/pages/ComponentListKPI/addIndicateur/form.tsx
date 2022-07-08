import { MouseEvent, useState,useEffect,ChangeEvent,SetStateAction} from "react";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { SelectChangeEvent } from "@mui/material";
import { IEntite } from "../../Interfaces/IEntite";
import { ICategorie } from "../../Interfaces/ICategorie";
import { ISysSource } from "../../Interfaces/ISysSource";
import { IKPI } from "../../Interfaces/IKPI";

const FormIndicateur = () => {

  const [name, setname] = useState<string>("");
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setname(e.currentTarget.value);
  };

  const [reference, setReference] = useState<string>("");
  const handleChangeReference = (e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.currentTarget.value);
  };

  const [production, setProduction] = useState<string>();
  const handleChangeProduction = (e: ChangeEvent<HTMLInputElement>) => {
    setProduction(e.currentTarget.value);
  };

  const [description, setDescription] = useState<string>("");
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const [inductors, setInductors] = useState<IKPI[]>([]);
  const [inductor, setInductor] = useState<IKPI>();
  const handleChangeKpi = (e: ChangeEvent<HTMLSelectElement>) => {
    const kpiId = e.target.value;
    let kpi = inductors.find((item) => {
      if (item.id == Number(kpiId)) return true;
    }, inductors);
    setInductor(kpi);
  };
  
  useEffect(() => {
    axiosInstance.get("/kpis").then((res) => {
      const data: IKPI[] = res.data.content;
      let kpisCopy = [...inductors];
      data.forEach((element) => {
        kpisCopy.push(element);
      });
      setInductors(kpisCopy);
    });
  }, []); 

  useEffect(() => {
    axiosInstance.get("/entites").then((res) => {
      const data: IEntite[] = res.data.content;
      let entitescopy = [...entites];
      data.forEach((element) => {
        entitescopy.push(element);
      });
      setEntites(entitescopy);
    });
  }, []);

  const [entites, setEntites] = useState<IEntite[]>([]);
  const [entite, setEntite] = useState<IEntite>();
  const handleChangeEntite = (e: ChangeEvent<HTMLSelectElement>) => {
    const entityid = e.target.value;
    let entite = entites.find((item) => {
      if (item.id == Number(entityid)) return true;
    }, entites);
    setEntite(entite);
  };

  const [estimationMethod, setFormulaire] =
    useState<{ label: string; value: string }>();
  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (options[index].label === label) {
        break;
      }
      index++;
    }
    setFormulaire(options[index]);
  };
  const options = [
    { label: "Valeur", value: "Valeur"},
    { label: "Ponderation", value: "Pondération"},
    { label: "PonderationCumulee", value: "Pondération cumulée"},
  ];

  const [source, setSource] = useState<{ label: string; value: string }>();
  const selectChangeSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (optionsSource[index].label === label) {
        break;
      }
      index++;
    }
    setSource(optionsSource[index]);
  };
  const optionsSource = [
    { label: "Budget", value: "Budget"},
    { label: "Realised", value: "Arreté sinon réalisé sinon estimé"},
  ];

  const [variableName, setVariableName] = useState("");
  const handleChangePeriode = (e: ChangeEvent<HTMLInputElement>) => {
    setVariableName(e.currentTarget.value);
   // console.log("periode radio", variableName)
  };

  const [estimationPeriod, setCurrentRadioValue] = useState("")
 // console.group("currentValueRadionn", estimationPeriod)
  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentRadioValue(e.currentTarget.value);
  };

  const[estimationPeriodValue,setEstimationPeriodValue]= useState("");
  //console.group("estimationPeriodValue", estimationPeriodValue)
  const handleChangeEstimationPeriodValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEstimationPeriodValue(e.currentTarget.value);
  };

  useEffect(() => {
    axiosInstance.get("/categories").then((res) => {
      const data: ICategorie[] = res.data.content;
      let categoriescopy = [...categories];
      data.forEach((element) => {
        categoriescopy.push(element);
      });
      setCategories(categoriescopy);
    });
  }, []);

  const [categories, setCategories] = useState<ICategorie[]>([]);
  const [categorie, setCategorie] = useState<ICategorie>();
  const handleChangeCategorie = (e: ChangeEvent<HTMLSelectElement>) => {
    const categorieId = e.target.value;
    let categorie = categories.find((item) => {
      if (item.id == Number(categorieId)) return true;
    }, categories);
    setCategorie(categorie);
  };

  useEffect(() => {
    axiosInstance.get("/system-sources").then((res) => {
      const data: ISysSource[] = res.data.content;
      let sysSourcescopy = [...sysSources];
      data.forEach((element) => {
        sysSourcescopy.push(element);
      });
      setSysSources(sysSourcescopy);
    });
  }, []);

  const [sysSources, setSysSources] = useState<ISysSource[]>([]);
  const [sysSource, setSysSource] = useState<ISysSource>();
  const handleChangeSysSource = (e: ChangeEvent<HTMLSelectElement>) => {
    const sysSourceId = e.target.value;
    let sysSource = sysSources.find((item) => {
      if (item.id == Number(sysSourceId)) return true;
    }, sysSources);
    setSysSource(sysSource);
  };

  const [payloadState,setPayloadState]=useState<number[]>([]);
  console.log("sys payloadState:", payloadState)
  const handleItem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, id: number) =>  {
     setPayloadState([...payloadState, id]);
  }

  const [sysSourcesAll, setSysSourcesAll] = useState<string[]>([]);
  console.log("sys sysSourcesAll:", sysSourcesAll)
  const handleChangeSysSources = (event: SelectChangeEvent<typeof sysSourcesAll>) => {
    const {
      target: { value },
    } = event;
    setSysSourcesAll(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  /*
  const [perdiodicity, setPerdiodicity] =
    useState<{ label: string; value: string }>();
  const selectChangePerdiodicity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (optionsPerdiodicity[index].label === label) {
        break;
      }
      index++;
    }
    setPerdiodicity(optionsPerdiodicity[index]);
  };

  const optionsPerdiodicity = [
    { label: "Monthly", value: "Monthly"}
  ];
  */
  const [perdiodicity, setPerdiodicity] =useState<string>("Mensuel");
  //delai
  const [productionPeriod, setProductionPeriod] = useState<{ label: string; value: string }>();
  const selectChangeProductionPeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (optionsProductionPeriod[index].label === label) {
        break;
      }
      index++;
    }
    setProductionPeriod(optionsProductionPeriod[index]);
  };

  const optionsProductionPeriod = [
    { label: "MonthPlus15Days", value: "MonthPlus15Days"}
  ];
  
  //file
  const [fileList, setFileSelected] = useState<FileList | null>(); // also tried <string | Blob>
  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    setFileSelected(files);
  };

  const [checkedValueInactive, setCheckedValueInactive] = useState<string|null>("Inactive");
  const handlerCheckboxInactive = (e:any): void => {
    if (e.currentTarget.value=="Active") {
      setCheckedValueInactive("Inactive");
    } else {
      setCheckedValueInactive("Active");
    }
  };

  const [checkboxActif, setCheckboxActif] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedValue, setCheckedValue] = useState<string>("Inactive");

  const handlerCheckboxActif = (e: ChangeEvent<HTMLInputElement>) : void => {
    if(checkboxActif=="checkboxActif"){
        setCheckboxActif("");       
    }else{
        setCheckboxActif("checkboxActif");
    } 
    setChecked(!checked)
    var value = e.target.value;
    setCheckedValue(value)
    //console.log("You selected checkedValue:" + value);
};

const[isInductor, setIsInducteur] = useState<Boolean>(false);
const handlerCheckboxActifInducteur = (e: ChangeEvent<HTMLInputElement>) : void => {
  setIsInducteur(!isInductor);
 // console.log("You selected isInducteur:" + isInductor);
};

const[isEstimable, setIsEstimade] = useState<Boolean>(false);
const handlerCheckboxActifEstime = (e: ChangeEvent<HTMLInputElement>) : void => {
  setIsEstimade(!isEstimable);
  //console.log("You selected isEstimade:" + isEstimable);
};

  const [isLoading, setLoading] = useState<Boolean>(false);
  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    let formData = new FormData();
    if (fileList) {
      //console.log("fileList",fileList)
     for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index];
       // console.log("element", element);
        formData.append("documents",element);
      }
    }

    let sysSourcesList = sysSourcesAll.map(label=>(
      sysSources.find(sys=>sys.label=== label)
    ))

    let data = JSON.stringify({
      name,
      reference,
      description,
      perdiodicity:"Monthly",
      estimationMethod:estimationMethod?.value,
      source:source?.value,
      estimationPeriod,
      estimationPeriodValue,
      isEstimable,
      isInductor,
      productionPeriod:production,
      status:checkedValueInactive,
      reminder:checkedValue,
      inductor:inductor || null,
      kpiGroup: null,
      entite: entite,
      category: categorie,
      systemSources: sysSourcesList
    });
    console.log("sys data kpi:", data)
  formData.append('kpiData', data);
    axiosInstance.post("/kpis", formData,{headers: {
      'Content-Type': 'multipart/form-data'
    }})
        .then((res) => {
            setLoading(false);
            toast.success('les données ont été enregistrées avec succès');
            history.push("/indicateurs");
        })
        .catch((err) => {
            setLoading(false);
            toast.error('Erreur! données non enregistrées');
        })
  };

  let history = useHistory();
  const [classNameActif, setClassNameActif] = useState("actif");
  const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
    if (classNameActif) {
      setClassNameActif("actif");
    } else {
      setClassNameActif("null");
    }
  };

  const[radioValue, setRadioValue] = useState("Active");
  const handlerRadioInactive = (e:any): void => {
    if (radioValue==="Active") {
      setRadioValue("actif")
    } else {
      setRadioValue("inactive")
    }  
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 450,
      },
    },
  };
  return (
    <div className="app">
    <div className="formCls">
      <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field d-flex">
            <Link to='/indicateurs' ><span className="titleEntiteLien">LISTE DES INDICATEURS</span></Link>
            <div className="fleshLien">
              <span>{'>'} </span>
            </div>
            <span className="titleEntiteWL">AJOUTER DES INDICATEURS</span>
            </div>
          </div>
          <div className="formlist">
      <div className="row form-field">
      <div className="form-group col-md-6">
          <label htmlFor="">Référence Indicateur </label>
          <input
            type="text"
            className="form-control inputSelect"
            id=""
            placeholder="Saisissez ici.."
            onChange={handleChangeReference}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="">Nom Indicateur</label>
          <input
            type="text"
            className="form-control inputSelect"
            id=""
            placeholder="Saisissez ici.."
            onChange={handleChangeName}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="">Description </label>
          <input
            type="text"
            className="form-control inputSelect"
            id=""
            placeholder="Saisissez ici.."
            onChange={handleChangeDescription}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inductor">Inducteur</label>
          <br />
          <select
            id="inductor"
            className="fselect-group inputSelect"
            onChange={handleChangeKpi}
          >
            <option value="DEFAULT" disabled selected>
              Liste des KPI
            </option>
            {inductors.map((inductor) => (
              <option value={inductor.id} key={inductor.id}>
                {inductor.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="entité">Entité</label>
          <br />
          <select
            id="entité"
            className="fselect-group inputSelect"
            onChange={handleChangeEntite}
          >
            <option value="DEFAULT" disabled selected>
              Liste des Entites
            </option>
            {entites.map((entite) => (
              <option value={entite.id} key={entite.id}>
                {entite.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="frm">Catégorie</label>
          <br />
          <select
            id="frm"
            className="fselect-group inputSelect"
            onChange={handleChangeCategorie}
          >
            <option value="DEFAULT" disabled selected>
              Liste des Categories
            </option>
            {categories.map((categorie) => (
              <option value={categorie.id} key={categorie.id}>
                {categorie.label}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="form-group col-md-6">
          <label htmlFor="frm">Système source </label>
          <br />
          <select
            id="frm"
            className="fselect-group"
            onChange={handleChangeSysSource}
          >
            <option value="DEFAULT" disabled selected>
              Liste des Système sources
            </option>
            {sysSources.map((sysSource) => (
              <option value={sysSource.id} key={sysSource.id}>
                {sysSource.label}
              </option>
            ))}
          </select>
        </div> */}
        <br/>
        <div className="form-group col-md-6">
            <InputLabel id="demo-multiple-checkbox-label">
            Système source
            </InputLabel>
            <Select
              className="selectedItem"
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={sysSourcesAll}
              onChange={handleChangeSysSources}
              input={<OutlinedInput label="Tag" className="selectedItem" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {sysSources.map((sysSource) => (
                <MenuItem value={sysSource.label} key={sysSource.id}>
                  <Checkbox
                    checked={
                      sysSourcesAll.findIndex((element) => element == sysSource.label) > -1
                    }
                  />
                  <ListItemText primary={sysSource.label} />
                </MenuItem>
              ))}
            </Select>
          </div>
{/*
          <div className="form-group col-md-6">
                <InputLabel id="demo-multiple-checkbox-label">Système source</InputLabel>
      <Select className="selectedItem"
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={sysSourcesAll}
          onChange={handleChangeSysSources}
          input={<OutlinedInput label="Tag" className="selectedItem"/>}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {sysSources.map((sysSource) => (
            <MenuItem   key={sysSource.id} value={sysSource.id}>
              <Checkbox onClick={(e) => handleItem(e,sysSource.id)} checked={sysSourcesAll.findIndex(element=>element==sysSource.label)>-1} />
              <ListItemText primary={sysSource.label } />
            </MenuItem>
          ))}
        </Select>
        </div>
 */}
        <div className="form-group col-md-6">
          <label htmlFor="">Périodicité de l’indicateur </label>
          <input
            type="text"
            className="form-control bgDisabled"
            id=""
            value={perdiodicity}
            disabled
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="frm">Délai de production</label>
          <br/>
          <div className="d-flex">
          <span className="spanMPlus">M +</span>
          <input
            type="text"
            className="form-control"
            id=""
            placeholder=""
            onChange={handleChangeProduction}
          />
          </div>
        </div>
        <div className="form-group col-md-6"></div>
        <div className="divParentEstimable">
        <div className={!isEstimable ? "form-field rappelCss rappelCssKPI" : "form-field rappelCss rappelCssKPI checkboxActif divAbsoluteEstime"}
        >
        <input
          type="checkbox"
          id="subscribeNews"
          name="subscribe"
          value={!checked?"enabled":"disabled"}
          onChange={handlerCheckboxActifEstime} 
          className="inputChecked"
        />
        <label htmlFor="subscribeNews" className="labelRappelKpi">
        Ce KPI est estimable?
        </label>
      </div>
        <div className=
        {isEstimable ? "d-flex justify-content-between contenuBtnUrl divEstime col-md-12" : "d-flex justify-content-between contenuBtnUrl divEstime col-md-12 isBlock"}
        >
        <div className="form-group col-md-4">
          <label htmlFor="frm">Formule de calcul de l'estimer</label>
          <br />
          <select
            id="frm"
            className="fselect-group selectFrm inputSelect"
            onChange={selectChange}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled selected>
              Liste des Méthodes d'estimation
            </option>
            <option value="Valeur">Valeur</option>
            <option value="Ponderation">Pondération</option>
            <option value="PonderationCumulee">Pondération cumulée</option>
          </select>
        </div>
        <div className="form-field col-md-4">
                <label htmlFor="profil">Source</label>
                <br />
                <select id="profil" className="fselect-group selectFrm inputSelect" onChange={selectChangeSource} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled selected >
                        Liste des sources
                    </option>
                    <option value="Budget">Budget</option>
                    <option value="Realised">Réalisé (arrêté sinon réalisé sinon estimé)</option>
                </select>
            </div>
        <div className="form-group col-md-4 divPeriode">
        <label htmlFor="frm" className="periodeCls">Période</label>
<div className='d-flex form-field'>
  <label className={estimationPeriod === 'N' ? "radioLabCheked" : "radioLab"}>
    <input type="radio" className="option-input radio" name="NM" value="N" 
     onChange={handleRadioChange}
     checked={estimationPeriod === 'N'}
    />
   N-
  </label>
  <span className="ouCls">ou</span>
  <label className={estimationPeriod === 'M' ? "radioLabCheked" : "radioLab"}>
    <input type="radio" className="option-input radio" name="NM" value="M"
    onChange={handleRadioChange}
    checked={estimationPeriod === 'M'}
    />
    M-
  </label>
  <input type="number" id="nNumber" name="nNumber" min="1" max="9" className="inputCount"  onChange={handleChangeEstimationPeriodValue}/>
</div>
        </div>
        </div>
        </div>
        
        <div className="form-group col-md-12 p-2 divParent1">
          <div className="divParent2 d-flex">
            <div className="">
            <button
              className="btn btnClsFile btnClsFileAddFile"
              type="button"
            >
              Piéce Jointe
            </button>
            </div>
            <div className="divPiecJoint100">
              <div className="uploadFilIn">
              <label htmlFor="file-upload" className="fileImport">
              <i className="iconeUpload">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35.202"
                  height="44.316"
                  viewBox="0 0 35.202 44.316"
                className="svgUp"
                >
                  <g
                    id="Groupe_1739"
                    data-name="Groupe 1739"
                    transform="translate(-5637.634 1046)"
                  >
                    <path
                      id="Tracé_2142"
                      data-name="Tracé 2142"
                      d="M5661.228-1046c.263.245.542.477.789.737q5.123,5.361,10.241,10.726a1.933,1.933,0,0,1,.578,1.431q-.018,12.66-.009,25.321a5.855,5.855,0,0,1-4.625,5.957,6.281,6.281,0,0,1-1.375.137q-11.6.012-23.2,0a5.844,5.844,0,0,1-5.99-6.01q-.006-16.173,0-32.345a5.85,5.85,0,0,1,4.414-5.865,1.121,1.121,0,0,0,.183-.093Zm-1.49,2.091c-.183-.009-.323-.023-.462-.023q-7.784,0-15.568,0a3.7,3.7,0,0,0-3.92,3.908q-.005,16.128,0,32.256a3.707,3.707,0,0,0,3.944,3.929q11.491.005,22.982,0a3.726,3.726,0,0,0,3.962-3.962q0-12.1,0-24.192v-.476c-2.047,0-4.026,0-6.006,0a4.68,4.68,0,0,1-4.932-4.918q-.006-3.013,0-6.026Zm9.46,9.292-7.269-7.627a1.962,1.962,0,0,0-.047.255c0,1.59-.032,3.18.007,4.769a2.515,2.515,0,0,0,2.691,2.6c.955.012,1.909,0,2.862,0Z"
                      fill="#767676"
                    />
                    <path
                      id="Tracé_2143"
                      data-name="Tracé 2143"
                      d="M5763.659-873.416v.465q0,5.441,0,10.882a1.2,1.2,0,0,1-.442,1.069,1.048,1.048,0,0,1-1.663-.625,3.242,3.242,0,0,1-.043-.647q0-5.311,0-10.622v-.514l-.174-.142a1.821,1.821,0,0,1-.217.408q-1.924,2.089-3.861,4.165a1.186,1.186,0,0,1-1.137.473,1.054,1.054,0,0,1-.684-1.665,2.963,2.963,0,0,1,.255-.294q2.971-3.189,5.942-6.375a1.106,1.106,0,0,1,1.853-.035q3.038,3.244,6.064,6.5a1.124,1.124,0,0,1,.3,1.19,1.024,1.024,0,0,1-.905.706,1.119,1.119,0,0,1-.981-.449q-1.962-2.113-3.927-4.223c-.1-.1-.18-.223-.269-.335Z"
                      transform="translate(-107.365 -153.965)"
                      fill="#767676"
                    />
                    <path
                      id="Tracé_2144"
                      data-name="Tracé 2144"
                      d="M5736.042-644.358q-4.313,0-8.628,0c-.767,0-1.262-.427-1.267-1.067a1.089,1.089,0,0,1,.943-1.07,3.784,3.784,0,0,1,.433-.01q8.52,0,17.039,0a2.249,2.249,0,0,1,.6.049,1.078,1.078,0,0,1,.776,1.117,1.091,1.091,0,0,1-.923.953,3.332,3.332,0,0,1-.518.026Q5740.268-644.357,5736.042-644.358Z"
                      transform="translate(-80.809 -364.721)"
                      fill="#767676"
                    />
                  </g>
                </svg>
              </i>
              <span className="labelFile">
                Importer un fichier ( PDF - WORD )
              </span>
            </label>
            <input
              id="file-upload"
              name="upload_cont_img"
              type="file"
              style={{ display: "none" }}
              accept="application/msword, application/pdf"
              className="form-control"
              onChange={handleFileChange}
              multiple
            />  
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex contenuBtnUrl">
      <div className= {`form-field rappelCss rappelCssKPI ${checkboxActif}`}>
        <input
          type="checkbox"
          id="subscribeNews"
          name="subscribe"
          value={!checked?"Active":"Inactive"}
          onChange={handlerCheckboxActif} 
        />
        <label htmlFor="subscribeNews" className="labelRappelKpi">
        Rappeler pour ce KPI
        </label>
      </div>
      <div className={!isInductor ? "form-field rappelCss rappelCssKPI isInducteurCls" : "form-field rappelCss rappelCssKPI checkboxActif isInducteurCls"}
      >
        <input
          type="checkbox"
          id="subscribeNews"
          name="subscribe"
          //checked={isInductor}
          onChange={handlerCheckboxActifInducteur} 
        />
        <label htmlFor="subscribeNews" className="labelRappelKpi">
        Ce KPI est un Inducteur
        </label>
      </div>
      </div>
      </div>
      <div className="btnClsThree">
        <Link to="/indicateurs">
          <button
            onClick={(e: React.MouseEvent<HTMLElement>) => handlerInputType(e)}
            className={`reset ${classNameActif}`}
          >
            QUITTER
          </button>
        </Link>
        {isLoading ? (
          <div className="progress">
            <CircularProgress style={{ color: "#C82345" }} />
          </div>
        ) : (
          <button className="submit" onClick={handleSubmit}>
            AJOUTER
          </button>
        )}
      </div>
      </div>
    </div>
  );
};
export default FormIndicateur;
