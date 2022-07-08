import { MouseEvent, useState,useEffect,ChangeEvent} from "react";
import toast, { Toaster } from "react-hot-toast";

import axiosInstance from "../../../services/axiosConfig";
import { IKPI } from "../../Interfaces/IKPI";
import { Autocomplete, TextField } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

const FormControle = () => {
    const [calculationMethod, setCalculationMethod] = useState<{ label: string; value: string }>();
    const selectCalculationMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const label = event.currentTarget.value;
      let index = 0;
      while (true) {
        if (optionCalculationMethod[index].label === label) {
          break;
        }
        index++;
      }
      setCalculationMethod(optionCalculationMethod[index]);
    };
    const optionCalculationMethod = [
      { label: "Variation", value: "Variation"},
      { label: "Difference", value: "Difference"},
      { label: "Ratio", value: "Ratio"},
    ];

  const [valRef, setValRef] = useState<{ label: string; value: string }>();
  const selectReferenceValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (optionsValRef[index].label === label) {
        break;
      }
      index++;
    }
    setValRef(optionsValRef[index]);
  };
  const optionsValRef = [
    {label: "M", value: "M"},
    {label: "M_1", value: "M_1"},
    {label: "N_1", value: "le même mois M de N-1"},
    {label: "Fin_M", value: "Cumul de l'année jusqu'au mois en cours"},
    {label: "Fin_M_1",value: "Cumul de l'année jusqu'au mois M-1"},
    {label: "Budget",value: "Mois en cours sur le Budget"},
  ];

  const [valType, setValType] = useState<{ label: string; value: string }>();
    const selectValType = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const label = event.currentTarget.value;
      let index = 0;
      while (true) {
        if (optionValType[index].label === label) {
          break;
        }
        index++;
      }
      setValType(optionValType[index]);
    };
    const optionValType = [
      {label: "Alg", value: "Alg"},
      {label: "Pct", value: "Pct"},
    ];

  const [maxValue, setMaxValue] = useState<string>("");
  const handleChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(e.currentTarget.value);
  };

  const [minValue, setMinValue] = useState<string>("");
  const handleChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    setMinValue(e.currentTarget.value);
  };

  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleChangeErrorMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(e.currentTarget.value);
  };

  const [isLoading, setLoading] = useState<Boolean>(false);
  const [inductors, setInductors] = useState<IKPI[]>([]);

 

  const [inputParam, setInput] = useState('');

  useEffect(() => {//http://localhost:8090/business/api/kpis?size=20&page=0&name.contains=t
    axiosInstance.get(`kpis?size=1000&page=0&name.contains=`+inputParam).then((res) => {
      const data: IKPI[] = res.data.content;
     
       let kpisCopy = [...inductors];
      data.forEach((element) => {
         kpisCopy.push(element);
       });
       setInductors(kpisCopy);

    });
  }, [inputParam]);

  const [kpiControls, setKpiControls] = useState<IKPI[]>([]);
  
  const [inputControlsParam, setInputControl] = useState('');

  useEffect(() => {//`kpis?size=1000&page=0&name.contains=`+inputParam
    axiosInstance.get(`kpis?size=1000&page=0&name.contains=`+inputControlsParam).then((res) => {
      const data: IKPI[] = res.data.content;
      let kpisCopy = [...kpiControls];
      data.forEach((element) => {
        kpisCopy.push(element);
      });
      setKpiControls(kpisCopy);
    });
  }, [inputControlsParam]);
  
  const [classNameActif, setClassNameActif] = useState("actif");
  const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
    if (classNameActif) {
      setClassNameActif("actif");
    } else {
      setClassNameActif("null");
    }
  };
  
  const kpiBasee = inductors.find(element=>element.name==inputParam)
  const kpiControle = inductors.find(element=>element.name==inputControlsParam)
  const controle={
    referenceValue:valRef?.value,
    valueType:valType?.value,
    minValue:minValue,
    maxValue:maxValue,
    calculationMethod:calculationMethod?.value,
    kpiBase:kpiBasee,
    kpiControl:kpiControle,
    errorMessage
  }
  const [validReferenceValue, setValidReferenceValue] = useState<boolean>(false);
  const [validValueType, setValidValueType] = useState<boolean>(false);
  const [validMinValue, setValidMinValue] = useState<boolean>(false);
  const [validMaxValue, setValidMaxValue] = useState<boolean>(false);
  const [validCalculationMethod, setValidCalculationMethod] = useState<boolean>(false);
  const [validKpiBase, setValidKpiBase] = useState<boolean>(false);
  const [validKpiControl, setValidKpiControl] = useState<boolean>(false);
  const [validErrorMessage, setValidErrorMessage] = useState<boolean>(false);

  let history = useHistory();
    const onSubmit = (event: MouseEvent) => {
      event.preventDefault();
      console.log("controle", controle)      
      if(controle.kpiBase== null){
        toast.error("Erreur! données non enregistrées");
        setValidKpiBase(true)
        setLoading(true);
      }
      else if(controle.kpiControl== null){
        toast.error("Erreur! données non enregistrées");
        setValidKpiControl(true)
        setLoading(true);
      }
      else if(controle.errorMessage== null){
        toast.error("Erreur! données non enregistrées");
        setValidErrorMessage(true)
        setLoading(true);
      }
      else if(controle.referenceValue== null){
        toast.error("Erreur! données non enregistrées");
        setValidReferenceValue(true)
        setLoading(true);
      }
      else if(controle.calculationMethod== null){
        toast.error("Erreur! données non enregistrées");
        setValidCalculationMethod(true)
        setLoading(true);
      }
      else if(controle.valueType== null){
        toast.error("Erreur! données non enregistrées");
        setValidValueType(true)
        setLoading(true);
      }
      else if(controle.maxValue== null){
        toast.error("Erreur! données non enregistrées");
        setValidMaxValue(true)
        setLoading(true);
      }
      else if(controle.minValue== null){
        toast.error("Erreur! données non enregistrées");
        setValidMinValue(true)
        setLoading(true);
      }
      else{
        axiosInstance.post('control-rules', controle)
          .then((res) => {
              setLoading(false);
              toast.success('les données ont été enregistrées avec succès');
              history.push("/controles");
          })
          .catch((err) => {
              setLoading(false);
              toast.error('Erreur! données non enregistrées');
          })
      }
      
      };
      
  return (
    <div className="app">
        <div className="formCls">
          <Toaster/>
      <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field d-flex">
            <Link to='/controles' ><span className="titleEntiteLien">LISTE DES CONTRÔLES</span></Link>
            <div className="fleshLien">
              <span>{'>'}</span>
            </div>
              <span className="titleEntiteWL">AJOUTER UNE REGLE DE CONTRÔLE</span>
            </div>
      </div>
      <div className="formlistAddControle">
      <div className="row form-field">
      <div className="form-group col-md-6 d-flex">
        <div className="form-group col-md-3 colMd3">
        <label htmlFor="inductor">Indicateur 1</label>
          <br />
          <Autocomplete
          className="autoCompleteCss"
      freeSolo
      id="disabled-options-demo"
      disableClearable
      inputValue={inputParam}
      onChange={(e,v) => setInput(v)}
      options={inductors.map((inductor) => inductor.name)}
      renderInput={(params) => (
        <TextField {...params} label=" " onChange={({ target }) => setInput(target.value)} variant="outlined" fullWidth />
      )}
    />
    <span className={validKpiBase?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
        <div className="form-group col-md-3 colMd3">
        <label htmlFor="inductor">Indicateur 2</label>
          <br />
          <Autocomplete
      freeSolo
      id="disabled-options-demo"
      disableClearable
      inputValue={inputControlsParam}
      onChange={(e,v) => setInputControl(v)}
      options={kpiControls.map((inductor) => inductor.name)}
      renderInput={(params) => (
        <TextField {...params} label=" " onChange={({ target }) => setInputControl(target.value)} variant="outlined" fullWidth />
      )}
    />  
    <span className={validKpiControl?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
        </div>
        <div className="form-group col-md-6">
        <label htmlFor="">Message d'erreur</label>
          <input
            type="text"
            className="form-control msgErrInp"
            id=""
            placeholder="Saisissez ici.."
            onChange={handleChangeErrorMessage}
          />
          <span className={validErrorMessage?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="frm">Val Réf</label>
          <br />
          <select
            id="frm"
            className="fselect-group"
            onChange={selectReferenceValue}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled selected>
            Liste des Valeurs de référence
            </option>
            <option value="M">M</option>
            <option value="M_1">M-1</option>
            <option value="N_1">le même mois M de N-1</option>
            <option value="Fin_M">Cumul de l'année jusqu'au mois en cours</option>
            <option value="Fin_M_1">Cumul de l'année jusqu'au mois M-1</option>
            <option value="Budget">Budget</option>
          </select>
          <span className={validReferenceValue?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="frm">Méthode</label>
          <br />
          <select
            id="frm"
            className="fselect-group"
            onChange={selectCalculationMethod}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled selected>
            Liste des Méthodes
            </option>
            <option value="Variation">Variation</option>
            <option value="Difference">Différence</option>
            <option value="Ratio">Ratio</option>
          </select>
          <span className={validCalculationMethod?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="frm">Type valeur</label>
          <br />
          <select
            id="frm"
            className="fselect-group"
            onChange={selectValType}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled selected>
            Liste des Types de valeur
            </option>
            <option value="Alg">Alg</option>
            <option value="Pct">%</option>
          </select>
          <span className={validValueType?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>     
        <div className="form-group col-md-6 d-flex">
        <div className="form-group col-md-3 colMd3">
          <label htmlFor="">Val Max</label>
          <input
            type="text"
            className="form-control"
            id=""
            placeholder="Saisissez ici.."
            onChange={handleChangeMaxValue}
          />
          <span className={validMaxValue?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
        <div className="form-group col-md-3 colMd3">
          <label htmlFor="">Val Min</label>
          <input
            type="text"
            className="form-control"
            id=""
            placeholder="Saisissez ici.."
            onChange={handleChangeMinValue}
          />
          <span className={validMinValue?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
        </div>
        </div>       
      </div>
      </div>
      <div className="btnClsThree">
        <Link to="/controles">
          <button
            onClick={(e: React.MouseEvent<HTMLElement>) => handlerInputType(e)}
            className={`reset ${classNameActif}`}
          >
            ANNULER
          </button>
        </Link>
        <button className="submit" onClick={onSubmit}>
            ENREGISTRER
          </button>
      </div>
      </div>
    </div>
  );
};
export default FormControle;