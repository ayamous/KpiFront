import { MouseEvent, useState,useEffect,ChangeEvent} from "react";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import { IKPI } from "../../Interfaces/IKPI";
import { IkpiBase } from "../../Interfaces/IkpiBase";
import { IkpiControl } from "../../Interfaces/IkpiControl";

const FormUpdateControle = (props: { id: string }) => {
  const [isChangeable, setChangeable] = useState<boolean>(false);
    const optionCalculationMethod = [
      { label: "Variation", value: "Variation"},
      { label: "Différence", value: "Difference"},
      { label: "Ratio", value: "Ratio"},
    ];
    
  const optionsValRef = [
    {label: "M", value: "M"},
    {label: "M_1", value: "M_1"},
    {label: "N_1", value: "le même mois M de N-1"},
    {label: "Fin_M", value: "Cumul de l'année jusqu'au mois en cours"},
    {label: "Fin_M_1",value: "Cumul de l'année jusqu'au mois M-1"},
    {label: "Budget",value: "Mois en cours sur le Budget"},
  ];

    const optionValType = [
      { label: "Alg", value: "Alg"},
      { label: "%", value: "Pct"},
    ];

  const [isLoading, setLoading] = useState<Boolean>(false);
  const [inductors, setInductors] = useState<IKPI[]>([]);
  const [kpiBase, setInductor] = useState<IKPI>();
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

  const [kpiControls, setKpiControls] = useState<IKPI[]>([]);
  const [kpiControl, setKpiControle] = useState<IKPI>();
  const handleChangeKpiControl = (e: ChangeEvent<HTMLSelectElement>) => {
    const kpiId = e.target.value;
    let kpi = kpiControls.find((item) => {
      if (item.id == Number(kpiId)) return true;
    }, kpiControls);
    setKpiControle(kpi);
  };
  
  useEffect(() => {
    axiosInstance.get("/kpis").then((res) => {
      const data: IKPI[] = res.data.content;
      let kpisCopy = [...kpiControls];
      data.forEach((element) => {
        kpisCopy.push(element);
      });
      setKpiControls(kpisCopy);
    });
  }, []);

  const [controles, setControles] = useState<{
    referenceValue: string;
    valueType: string;
    minValue: string;
    maxValue: string;
    calculationMethod: string | undefined;
    kpiBase: IkpiBase,
    kpiControl: IkpiControl,
    errorMessage: string,
  }>();

  const handleInput = (e: { target: { name: any; value: any } }) => {
    if (controles) {
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
      setControles({
        ...controles,
        ...objet,
      });
    }
  };

  useEffect(() => {
    const controlId = props.id;
    axiosInstance.get(`control-rules/${controlId}`).then((res) => {
      console.log("res.data kpi id id :::!",res.data)
      setControles(res.data);
      setLoading(false);
    });
  }, []);

  const [classNameActif, setClassNameActif] = useState("actif");
  const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
    if (classNameActif) {
      setClassNameActif("actif");
    } else {
      setClassNameActif("null");
    }
  };

  let history = useHistory();
    const onSubmit = (event: MouseEvent) => {
      event.preventDefault();
    const kpiBase = inductors.find(
      (e) => e.id == Number(controles?.kpiBase?.id)
    );
    const kpiControl = kpiControls.find(
      (e) => e.id == Number(controles?.kpiControl?.id)
    );
    let data = JSON.stringify({ ...controles, kpiBase, kpiControl });
    const controleId = props.id;
    axiosInstance.put(`control-rules/${controleId}`, data)
            .then((res) => {
                setChangeable(false)
                toast.success('les données ont été modifiées avec succès');
                history.push("/controles");
                window.location.reload()
            })
            .catch((res) => {
                setChangeable(false)
                toast.error('Erreur! mis à jour sans succès');
            })
    }
    
      if (isLoading) {
        return <h4>Chargement en cours...</h4>;
      }

  return (
    <div className="app">
        <div className="formCls">
          <Toaster/>
      <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field">
            <Link to='/controles' ><span className="titleEntiteLien">LISTE DES CONTRÔLES {'>'} </span></Link>
              <span className="titleEntiteWL">MODIFIER UNE REGLE DE CONTRÔLE</span>
            </div>
      </div>
      <div className="formlistAddControle">
      <div className="row form-field">
        <div className="form-group col-md-6 d-flex">
        <div className="form-group col-md-3 colMd3">
        <label htmlFor="inductor">Indicateur 1</label>
          <br />
          <select
            id="inductor"
            className="fselect-group"
            value={controles?.kpiBase?.id}
            name="kpiBase.id"
            onChange={handleInput}
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
        <div className="form-group col-md-3 colMd3">
        <label htmlFor="inductor">Indicateur 2</label>
          <br />
          <select
            id="inductor"
            className="fselect-group"
            value={controles?.kpiControl?.id}
            name="kpiControl.id"
            onChange={handleInput}
          >
            <option value="DEFAULT" disabled selected>
              Liste des KPI
            </option>
            {kpiControls.map((inductor) => (
              <option value={inductor.id} key={inductor.id}>
                {inductor.name}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div className="form-group col-md-6">
        <label htmlFor="">Message d'erreur</label>
          <input
            type="text"
            className="form-control"
            id=""
            name="errorMessage"
            placeholder="Saisissez ici.."
            value={controles?.errorMessage}
            onChange={handleInput}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="frm">Val Réf</label>
          <br />
          <select
            id="frm"
            className="fselect-group"
            value={controles?.referenceValue}
            name="referenceValue"
            onChange={handleInput}
          >
            <option value="DEFAULT" disabled selected>
            Liste des Valeurs de référence
            </option>
            {optionsValRef.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="frm">Méthode</label>
          <br />
          <select
            id="frm"
            className="fselect-group"
            value={controles?.calculationMethod}
            name="calculationMethod"
            onChange={handleInput}
          >
            <option value="DEFAULT" disabled selected>
            Liste des Méthodes
            </option>
            {optionCalculationMethod.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="frm">Type valeur</label>
          <br />
          <select
            id="frm"
            className="fselect-group"
            value={controles?.valueType}
            name="valueType"
            onChange={handleInput}
          >
            <option value="DEFAULT" disabled selected>
            Liste des Types de valeur
            </option>
            {optionValType.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>     
        <div className="form-group col-md-6 d-flex">
        <div className="form-group col-md-3 colMd3">
          <label htmlFor="">Val Max</label>
          <input
            type="text"
            className="form-control"
            id=""
            value={controles?.maxValue}
            onChange={handleInput}
            name="maxValue"
          />
        </div>
        <div className="form-group col-md-3 colMd3">
          <label htmlFor="">Val Min</label>
          <input
            type="text"
            className="form-control"
            id=""
            value={controles?.minValue}
            onChange={handleInput}
            name="minValue"
          />
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
        {isLoading ? (
          <div className="progress">
            <CircularProgress style={{ color: "#C82345" }} />
          </div>
        ) : (
          <button className="submit" onClick={onSubmit}>
            ENREGISTRER
          </button>
        )}
      </div>
      </div>
    </div>
  );
};
export default FormUpdateControle;
