import { MouseEvent, useState, useEffect, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import { inductorsDefault } from "../../../defaults";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { SelectChangeEvent } from "@mui/material";


interface IKPI {
  id: number;
  name: string;
  reference: string;
  description: string;
  perdiodicity: string;
  productionPeriod: string;
  status: string,
  reminder: string,
  estimationMethod: string;
  source: string;
  estimationPeriodValue: string;
  isEstimable: boolean;
  isInductor: boolean;
  estimationPeriod: string;
  inductor: string;
  kpiGroup: string | null;
  entite: IEntite;
  category: ICategorie;
  systemSource: ISysSource;
  documents: {
    contentType: string,
    dirId: string,
    extension: string,
    fsName: string,
    id: number,
    name: string,
    size: string,
    url: string
  };
}

interface IEntite {
  id: number;
  label: string;
  description: string;
}

interface ICategorie {
  id: number;
  label: string;
  description: string;
}

interface ISysSource {
  id: number;
  label: string;
  description: string;
}
const FormUpdateIndicateur = (props: { id: string }) => {

  const [name, setname] = useState<string>("");
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setname(e.currentTarget.value);
  };

  const [reference, setReference] = useState<string>("");
  const handleChangeReference = (e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.currentTarget.value);
  };

  const [description, setDescription] = useState<string>("");
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  const [perdiodicity, setPerdiodicity] =
    useState<{ label: string; value: string }>();
  const selectChangePerdiodicity = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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

  const optionsPerdiodicity = [{ label: "Monthly", value: "Monthly" }];

  //delai
  const [productionPeriod, setProductionPeriod] =
    useState<{ label: string; value: string }>();
  const selectChangeProductionPeriod = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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
    { label: "MonthPlus15Days", value: "MonthPlus15Days" },
  ];

  const [EstimationMethod, setFormulaire] =
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
    { label: "Valeur", value: "Valeur" },
    { label: "Pondération", value: "Pondération" },
    { label: "Pondération cumulée", value: "Pondération cumulée" },
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
    { label: "Budget", value: "Budget" },
    { label: "Realised", value: "Arreté sinon réalisé sinon estimé" },
  ];

  const [inductors, setInductors] = useState<any>(inductorsDefault);
  //const [inductors, setInductors] = useState<IKPI[]>([]);
  const [inductorsList, setInductorsList] = useState<IKPI[]>([]);
  const [inductor, setInductor] = useState<IKPI>();
  const handleChangeKpi = (e: ChangeEvent<HTMLSelectElement>) => {
    const kpiId = e.target.value;
    let kpi = inductorsList.find((item) => {
      if (item.id == Number(kpiId)) return true;
    }, inductorsList);
    setInductor(kpi);
  };

  useEffect(() => {
    axiosInstance.get("/kpis").then((res) => {
      const data: IKPI[] = res.data.content;
      let kpisCopy = [...inductorsList];
      data.forEach((element) => {
        kpisCopy.push(element);
      });
      setInductorsList(kpisCopy);
    });
  }, []);

  //seletInd
  const [inductorsSelect, setInductorsSelect] = useState<IKPI[]>([]);
  const [inductorSelect, setInductorSelect] = useState<IKPI>();
  const handleChangeKpiSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const kpiId = e.target.value;
    let kpi = inductorsSelect.find((item) => {
      if (item.id == Number(kpiId)) return true;
    }, inductorsSelect);
    setInductorSelect(kpi);
  };

  useEffect(() => {
    axiosInstance.get("/kpis").then((res) => {
      const data: IKPI[] = res.data.content;
      let kpisCopy = [...inductorsSelect];
      data.forEach((element) => {
        kpisCopy.push(element);
      });
      setInductorsSelect(kpisCopy);
    });
  }, []);

  const [fileList, setFileSelected] = useState<FileList | null>();
  const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    setFileSelected(files);
  };

  const [checked, setChecked] = useState(false);
  const handlerCheckboxActive = (e: any): void => {
    if (inductors.reminder === "Active") {
      setInductors((prevState: any) => ({
        ...prevState,
        ["reminder"]: "Inactive"
      }))

    } else {
      setInductors((prevState: any) => ({
        ...prevState,
        ["reminder"]: "Active"
      }))
    }
  };

  const handlerCheckboxInactive = (e: any): void => {
    if (inductors.status === "Active") {
      setInductors((prevState: any) => ({
        ...prevState,
        ["status"]: "Inactive"
      }))
    } else {
      setInductors((prevState: any) => ({
        ...prevState,
        ["status"]: "Active"
      }))
    }
  };

  const handlerCheckboxActifInducteur = (e: ChangeEvent<HTMLInputElement>): void => {
    if (inductors.isInductor) {
      setInductors((prevState: any) => ({
        ...prevState,
        ["isInductor"]: false
      }))
    } else {
      setInductors((prevState: any) => ({
        ...prevState,
        ["isInductor"]: true
      }))
    }
  };

  const handlerCheckboxActifEstime = (e: ChangeEvent<HTMLInputElement>): void => {
    if (inductors.isEstimable) {
      setInductors((prevState: any) => ({
        ...prevState,
        ["isEstimable"]: false
      }))
    } else {
      setInductors((prevState: any) => ({
        ...prevState,
        ["isEstimable"]: true
      }))
    }
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (inductors.estimationPeriod == "N") {
      setInductors((prevState: any) => ({
        ...prevState,
        ["estimationPeriod"]: "M"
      }))
    } else {
      setInductors((prevState: any) => ({
        ...prevState,
        ["estimationPeriod"]: "N"
      }))
    }
  };



  const [isLoading, setLoading] = useState<Boolean>(true);

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

  useEffect(() => {
    const kpiId = props.id;
    axiosInstance.get(`kpis/${kpiId}`).then((res) => {
      setInductors(res.data);
      setLoading(false);
    });
  }, []);

  let history = useHistory();

  const [classNameActif, setClassNameActif] = useState("actif");
  const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
    if (classNameActif) {
      setClassNameActif("actif");
    } else {
      setClassNameActif("null");
    }
  };

  const [fileRemove, setFileRemove] = useState<boolean>();
  const handlerCroix = (id: string) => {
    const length = inductors?.documents.length || 0;
    for (let index = 0; index < length; index++) {
      const document = inductors?.documents[index] || { id: null };
      if (document.id === id) {
        inductors?.documents.splice(index, 1)
      }
    }
    setFileRemove(false)
  };

  const [labelSys, setLabelSys] = useState('');
  const [systemSources, setSysSourcesAll] = useState<string[]>([]);
  // console.log("systemSource", systemSources)
  const handleChangeSysSources = (event: SelectChangeEvent<typeof systemSources>) => {
    const {
      target: { value },
    } = event;
    setSysSourcesAll(
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
        width: 450,
      },
    },
  };

  useEffect(() => {
    console.log(inductors?.systemSources ,"djzojd")
  }, [inductors])

  const handleInput = (e: { target: { name: any; value: any } }) => {
    if (inductors) {
      const kies = e.target.name.split(".");
      let objet = {};
      if (kies.length == 2) {
        objet = {
          [kies[0]]: { [kies[1]]: e.target.value },
        };
      } else {
        objet = {
          [kies[0]]: e.target.value,
        };
      }
      setInductors({
        ...inductors,
        ...objet,
      });
    }
  };

  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    let formData = new FormData();
    if (fileList) {
      for (let index = 0; index < fileList.length; index++) {
        const element = fileList[index];
        formData.append("documents", element);
      }
    }
    const category = categories.find(
      (e) => e.id == Number(inductors?.category.id)
    );
    /*
    const systemSource = sysSources.find(
      (e) => e.id == Number(inductors?.systemSource.id)
    );*/

    const status = inductors?.status
    const reminder = inductors.reminder
    //const estimationPeriod = inductors.estimationPeriod
    let data = JSON.stringify({ ...inductors, status, reminder, category });
    formData.append("kpiData", data);
    const kpiId = props.id;
    axiosInstance
      .put(`kpis/${kpiId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        toast.success("les données ont été enregistrées avec succès");
        history.push("/indicateurs");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Erreur! données non enregistrées");
      });
  };

  if (isLoading) {
    return <h4>Chargement en cours...</h4>;
  }

  return (
    <div className="app">
      <div className="formCls">
        <div className="d-flex justify-content-between contenuBtnUrl">
          <div className="form-field">
            <Link to='/indicateurs' ><span className="titleEntiteLien">LISTE DES INDICATEURS {'>'} </span></Link>
            <span className="titleEntiteWL">MODIFIER INDICATEUR</span>
          </div>
          <div className="imgCls d-flex justify-content-between"  >
            <button value={inductors?.status}
              onClick={(e: React.MouseEvent<HTMLElement>) => handlerCheckboxInactive(e)}

              className={inductors?.status === "Inactive" ? "omct" : "omctActive"}
              type="button" aria-label="add"
            >
              <span>{inductors?.status === "Inactive" ? "Inactive" : "Active"}</span>
              <img src={inductors?.status === "Inactive" ? "../assets/images/cercle.svg" : "../assets/images/cercleActive.svg"} alt="ActiverInactive" />
            </button>
          </div>
        </div>
        <div className="formlist">
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="">Référence Indicateur </label>
              <input
                type="text"
                value={inductors?.reference}
                className="form-control bgDisabled"
                name="reference"
                id="ref"
                disabled
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Nom Indicateur</label>
              <input
                type="text"
                className="form-control"
                id=""
                value={inductors?.name}
                onChange={handleInput}
                name="name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Description </label>
              <input
                type="text"
                className="form-control"
                id=""
                value={inductors?.description}
                name="description"
                onChange={handleInput}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Inducteur</label>

              <select
                id="inductor"
                className="fselect-group"
                value={inductors?.inductor?.id}
                name="inductor.id"
                onChange={handleInput}
              >
                <option value="DEFAULT" disabled selected>
                  Liste des KPI
                </option>
                {inductorsSelect.map((inductor) => (
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
                className="fselect-group"
                value={inductors?.entite.id}
                name="entite.id"
                onChange={handleInput}
              >
                <option value="DEFAULT" disabled selected>
                  Liste des Entités
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
                className="fselect-group"
                value={inductors?.category?.id}
                name="category.id"
                onChange={handleInput}
              >
                <option value="DEFAULT" disabled selected>
                  Liste des categories
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
             value={inductors?.systemSource.id}
            name="systemSource.id"
            onChange={handleInput}
          >
            <option value="DEFAULT" disabled selected>
              Liste des système sources
            </option>
            {sysSources.map((sysSource) => (
              <option value={sysSource.id} key={sysSource.id}>
                {sysSource.label}
              </option>
            ))}
          </select>
        </div>*/}
            <div className="form-group col-md-6">
              <InputLabel id="demo-multiple-checkbox-label">
                Système source
              </InputLabel>
              <Select
                className="selectedItem"
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                name="systemSources"
                //@ts-ignore
                value={systemSources}
                onChange={handleChangeSysSources}
                input={<OutlinedInput label="Tag" className="selectedItem" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {sysSources.map((sysSource) => (
                  <MenuItem value={sysSource.label} key={sysSource.id}>
                    <Checkbox
                      checked={
                        systemSources.findIndex((element) => element == sysSource.label) > -1
                      }
                    />
                    <ListItemText primary={sysSource.label} />
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="">Périodicité de l’indicateur </label>
              <input
                type="text"
                className="form-control bgDisabled"
                id=""
                value={inductors?.perdiodicity}
                name="perdiodicity"
                disabled
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="frm">Délai de production</label>
              <br />
              <div className="d-flex">
                <span className="spanMPlus">M +</span>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  placeholder=""
                  value={inductors?.productionPeriod}
                  name="productionPeriod"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="form-group col-md-6"></div>
            <div className="divParentEstimable">
              <div className={!inductors?.isEstimable ? "form-field rappelCss rappelCssKPI" : "form-field rappelCss rappelCssKPI checkboxActif divAbsoluteEstime"}
              >
                <input
                  type="checkbox"
                  id="subscribeNews"
                  name="isEstimable"
                  value={inductors?.isEstimable}
                  onChange={handlerCheckboxActifEstime}
                />
                <label htmlFor="subscribeNews" className="labelRappelKpi">
                  Ce KPI est estimable?
                </label>
              </div>
              <div className=
                {inductors.isEstimable ? "d-flex justify-content-between contenuBtnUrl divEstime col-md-12" : "d-flex justify-content-between contenuBtnUrl divEstime col-md-12 isBlock"}
              >
                <div className="form-group col-md-4">
                  <label htmlFor="frm">Formule de calcul de l'estimer</label>
                  <br />
                  <select
                    id="frm"
                    className="fselect-group selectFrm"
                    name="estimationMethod"
                    onChange={handleInput}
                    value={inductors?.estimationMethod}
                  >
                    <option value="DEFAULT" disabled selected>
                      Liste des Méthodes d'estimation
                    </option>
                    {options.map((item) => (
                      <option value={item.label}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field col-md-4">
                  <label htmlFor="profil">Source</label>
                  <br />
                  <select id="profil" className="fselect-group selectFrm" onChange={handleInput} name="source" value={inductors?.source}>
                    <option value="DEFAULT" disabled selected >
                      Liste des sources
                    </option>
                    {optionsSource.map((item) => (
                      <option value={item.label}>{item.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-4 divPeriode">
                  <label htmlFor="frm" className="periodeCls">Période</label>
                  <div className='d-flex form-field'>
                    <label className={inductors?.estimationPeriod === 'N' ? "radioLabCheked" : "radioLab"}>
                      <input type="radio" className="option-input radio" name="estimationPeriod"
                        value={inductors?.estimationPeriod}
                        onChange={handleRadioChange}
                        checked={inductors?.estimationPeriod === 'N'}
                      />
                      N-
                    </label>
                    <span className="ouCls">ou</span>
                    <label className={inductors?.estimationPeriod === 'M' ? "radioLabCheked" : "radioLab"}>
                      <input type="radio" className="option-input radio"
                        name="estimationPeriod"
                        value={inductors?.estimationPeriod}
                        onChange={handleRadioChange}
                        checked={inductors?.estimationPeriod === 'M'}
                      />
                      M-
                    </label>
                    <input type="number" id="nNumber" className="inputCount" onChange={handleInput} name="estimationPeriodValue"
                      value={inductors?.estimationPeriodValue} />
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group col-md-12 p-2 divParent1">
              <div className="divParent2 d-flex">
                <div className="divPiecJoint20">
                  <button
                    className="btn btnClsFile"
                    type="button"
                  >
                    Piéce Jointe
                  </button>
                </div>
                <ul className=" ulFile container1">
                  {inductors?.documents.map((item: any) => (
                    <li value={item.id} key={item.id} className="liFile ">
                      <img src={inductors?.documents[0].extension == "pdf" ? "../assets/images/ComponentPDF.svg" : "../assets/images/ComponentWord.svg"} alt="Avatar" className="image1" />
                      <div className="middle1">
                        <div className="text1"><img src="../assets/images/GroupCroix.svg" alt="Avatar" onClick={() => handlerCroix(item.id)} /></div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="divPiecJoint80 ">
                  <div className="uploadFilIn">
                    <label htmlFor="file-upload" className="fileImport">
                      <i className="iconeUpload">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35.202"
                          height="44.316"
                          viewBox="0 0 35.202 44.316"
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
            <div className={inductors.reminder == "Active" ? "form-field rappelCss rappelCssKPI  checkboxActif" : "form-field rappelCss rappelCssKPI"}>
              <input
                type="checkbox"
                id="subscribeNews"
                name="subscribe"
                value={inductors.reminder}
                onChange={handlerCheckboxActive}
              />
              <label htmlFor="subscribeNews" className="labelRappelKpi">
                Rappeler pour ce KPI
              </label>
            </div>
            <div className={!inductors.isInductor ? "form-field rappelCss rappelCssKPI isInducteurCls" : "form-field rappelCss rappelCssKPI checkboxActif isInducteurCls"}
            >
              <input
                type="checkbox"
                id="subscribeNews"
                name="isInductor"
                //checked={isInducteur}
                value={inductors.isInductor}
                onChange={handlerCheckboxActifInducteur}
              />
              <label htmlFor="subscribeNews" className="labelRappelKpi">
                Ce KPI est un Inducteur
              </label>
            </div>
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
  );
};
export default FormUpdateIndicateur;
