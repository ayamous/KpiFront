import { ChangeEvent, MouseEvent,useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import axiosInstance from "../../../services/axiosConfig";
import { ICategorie } from "../../Interfaces/ICategorie";
import { IKPI } from "../../Interfaces/IKPI";
import moment from 'moment';
export function formatDateAndTime(date: string) {
  moment.locale('fr');
  return moment(date).format('YYYY-MM-DD');
}

const FormEstimation = () => {
  const [reference, setReference] = useState<string>("");
  const handleChangeReference = (e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.currentTarget.value);
  };

  const [name, setName] = useState<string>("");
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const [categorie, setCategorie] = useState<ICategorie>();
    const handleChangeCategorie = (e: ChangeEvent<HTMLInputElement>) => {
      setCategorie(categorie);
    };

 
  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);
  const [currentEdit, setcurrentEdit] = useState<number>();
 
  const [valueDe, setValueDe] = useState<Date|any>(null);
  let valueDeF = formatDateAndTime(valueDe)

  const [valueA, setValueA] = useState<Date|any>(null);
  let valueAF = formatDateAndTime(valueA);

   useEffect(() => {
    console.log("valueA ss ", formatDateAndTime(valueA))
    console.log("valueA valueAF ",valueAF)
    //bus/api/kpis/estimation?startDate=2019-03-23&endDate=2019-05-23
   }, [valueDeF]); 


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
    { label: "Valeur", value: "Valeur"},
    { label: "Pondération", value: "Pondération"},
    { label: "Pondération cumulée", value: "Pondération cumulée"},
  ];
  
  const [Source, setSource] = useState<{ label: string; value: string }>();
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

  
  const [estimationPeriod, setEstimationPeriod] = useState<{ label: string; value: string }>();
  const selectChangeEstimationPeriod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (optionsEstimationPeriod[index].label === label) {
        break;
      }
      index++;
    }
    setSource(optionsEstimationPeriod[index]);
  };
  const optionsEstimationPeriod = [
    { label: "N", value: "N"},
    { label: "M", value: "M"},
  ];

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

  const [estimations, setEstimations] = useState<IKPI[]>([]);
  console.log("inductorsinductorsinductors", estimations)
  useEffect(() => {
    //kpis/estimation?startDate='+valueDe+'&endDate='+valueA
    axiosInstance.get('/kpis/estimation?startDate='+valueDeF+'&endDate='+valueAF  )
        .then((res) => {
          const {content} =res.data;
          setEstimations(content)
        })
}, [valueDe,valueA]);
  return (
    <div className="app">
      <div className="formCls">
          <Toaster />
          <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
              <span className="titleEntite">ESTIMATION</span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="input-group search mb-3">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Nom ou catégorie ou responsable"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                {isCrescent ? (
                  <div className="input-group-append">
                    <button
                      className="btn btn-lg btnSearchIcn"
                      type="button"
                      onClick={() => setIsCrescent(false)}
                    >
                      <i>
                        <AiOutlineSearch />
                      </i>
                    </button>
                  </div>
                ) : (
                  <div className="input-group-append">
                    <button
                      className="btn btn-lg btnSearchIcn"
                      type="button"
                      onClick={() => setIsCrescent(true)}
                    >
                      <i>
                        <AiOutlineSearch />
                      </i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field thrBtnFilter thrBtnFilterHis">
              <span  className="moniStyleEst">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            value={valueDe}
            onChange={(newValue) => {
            setValueDe(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
              </span>
              <span  className="moniStyleEst"> 
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            inputFormat="dd/MM/yyyy"
            value={valueA}
            onChange={(newValue) => {
            setValueA(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        </span>
        <span >
        <button className="exCls" value="AFFICHER" >
        AFFICHER
                  </button>
            </span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="histo">
                <Link to="/historique">
                  <button className="icnClsHist">
                    <i>
                      <img src="../assets/images/historique.svg" className="imgHistorique"/>
                    </i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="formlist">
            <table>
              <thead>
                <tr>
                  <th>Référence Indicateur</th>
                  <th>Nom Indicateur</th>
                  <th>Estimable</th>
                  <th>Méthode d'estimation</th>
                  <th>Source</th>
                  <th>Période</th>
                  <th>Inducteur</th>
                </tr>
              </thead>
              {estimations.map((inductor) => {
                console.log("inductors 0233", estimations)
                return (
                  <tbody key={inductor.id}>
                    <tr>
                      <td>{currentEdit === inductor?.id ? (<input
                            type="text" className="changeIn" value={reference} onChange={handleChangeReference}/>) : (inductor.reference) }
                      </td>
                      <td>
                        {currentEdit === inductor?.id ? (
                          <input type="text" className="changeIn" value={name} onChange={handleChangeName}/>) : (inductor.name)}
                      </td>
                      <td> 
                          {currentEdit === inductor?.id ? (
                          <div className={!inductor.estimable ? "form-field rappelCssEst" : "form-field rappelCssEst"}
                          >
                            <input
                              type="checkbox"
                              id="subscribeNews"
                              name="subscribe"
                              checked={inductor.estimable}
                            />
                            <label htmlFor="subscribeNews" className="labelRappelEst">
                            Estimable
                            </label>
                          </div>
                          ):(<div className={inductor.estimable? "form-field rappelCssEst" : "form-field rappelCssEst"}
                          >
                            <input
                              type="checkbox"
                              id="subscribeNews"
                              name="subscribe"
                              checked={inductor.estimable}
                            />
                            <label htmlFor="subscribeNews" className="labelRappelEst">
                            Estimable
                            </label>
                          </div>)}
                      </td>
                      <td>
                        {currentEdit === inductor.id ? (
                          <select
                            id="profil"
                            className="changeInSelectEstim"
                            onChange={selectChange}
                            defaultValue={inductor.estimationMethod[0]}
                          >
                            {options.map((item) => (
                              <option value={item.label}>{item.label}</option>
                            ))}
                          </select>
                        ) : (
                          <select
                            id="profil"
                            className="changeInSelectEstim"
                            onChange={selectChange}
                            defaultValue={inductor.estimationMethod[0]}
                          >
                            {options.map((item) => (
                              <option value={item.label}>{item.label}</option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td>
                        {currentEdit === inductor.id ? (
                          <select
                            id="source"
                            className="changeInSelectSource"
                            onChange={selectChangeSource}
                            defaultValue={inductor.source[0]}
                          >
                            {optionsSource.map((item) => (
                              <option value={item.label}>{item.label}</option>
                            ))}
                          </select>
                        ) : (
                          <select
                            id="source"
                            className="changeInSelectSource"
                            onChange={selectChangeSource}
                            defaultValue={inductor.source[0]}
                          >
                            {optionsSource.map((item) => (
                              <option value={item.label}>{item.label}</option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td>
                        {currentEdit === inductor.id ? (
                          <>
                          <select
                            id="estimationPeriod"
                            className="changeInSelectPeriod"
                            onChange={selectChangeEstimationPeriod}
                            defaultValue={inductor.estimationPeriod[0]}
                          >
                            {optionsEstimationPeriod.map((item) => (
                              <option value={item.label}>{item.label}</option>
                            ))}
                          </select>
                          <input type="number" id="nNumber" className="inputCountPeriodValue" value={inductor.estimationPeriodValue}/>
                          </>
                        ) : (
                          <>
                          <select
                            id="estimationPeriod"
                            className="changeInSelectPeriod"
                            onChange={selectChangeEstimationPeriod}
                            defaultValue={inductor.estimationPeriod[0]}
                          >
                            {optionsEstimationPeriod.map((item) => (
                              <option value={item.label}>{item.label}</option>
                            ))}
                          </select>
                          <input type="number" id="nNumber" className="inputCountPeriodValue" value={inductor.estimationPeriodValue}/>   
                          </>
                        )}
                      </td>
                      {/* <td> 
                          {currentEdit === inductor?.id ? (<input type="text" className="changeIn" value={inductor?.inductor} />) : (inductor?.inductor)}
                      </td> */}
                     <td>
                        {currentEdit === inductor.id ? (
                         
                         <select
                         id="inductor"
                         className="fselect-group"
                         value={//@ts-ignore
                           inductor?.inductor?.id}
                         name="inductor.id"
                        //  onChange={handleInput}
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
                        ) : (
                          <select
                          id="inductor"
                          className="fselect-group"
                          value={//@ts-ignore
                            inductor?.inductor?.id}
                          name="inductor.id"
                         //  onChange={handleInput}
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
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })
            }  
            </table>
          </div>
      </div>
    </div>
  );
};
export default FormEstimation;
