import { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { MouseEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import axiosInstance from "../../services/axiosConfig";
import { IMonitoring } from "../Interfaces/IMonitoring";
import moment from 'moment';
export function formatDateAndTime(date: string) {
  moment.locale('fr');
  return moment(date).format('YYYY-MM-DD');
}

const FormMonitoring = () => {
  const [paramStatus, setParamStatus] = useState<string>("");
  const handlChangeParamStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.currentTarget.value;
    setParamStatus(status);
  };


  const [paramStatusScope, setStatusScope] = useState<string>("");
  const selectStatusScope = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const statusScope = event.currentTarget.value;
    setStatusScope(statusScope);
  };

  const[reference,setReference]=useState<string>("")
  const handlChangeParamReference = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReference(event.currentTarget.value);
  };
  
  
  const[labelEntite,setLabelEntite]=useState<string>("")
  const handlChangeParamLabel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelEntite(event.currentTarget.value);
  };

  const[labelCategory,setLabelCategory]=useState<string>("")
  const handlChangeParamLabelCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabelCategory(event.currentTarget.value);
  };


  const [valueDe, setValueDe] = useState<Date | any>(null);
  let valueDeF: any = "";
  if (valueDe) {
    valueDeF = formatDateAndTime(valueDe)
  }

  const [valueA, setValueA] = useState<Date | any>(null);
  let valueAF: any = "";
  if (valueA) {
    valueAF = formatDateAndTime(valueA)
  }


  const [monitorings, setMonitorings] = useState<IMonitoring[]>([]);

  const [toParam, settoParam] = useState();
  const [typeParam, setTypeParam] = useState();
  const [idParam, setIdParam] = useState();
  useEffect(() => {//http://localhost:8090/business/api/monitoring?from=2021-08-01&to=2021-11-01&type=Realised&id=5004
    let url = "/monitoring?type=" + paramStatus  
    if (valueDeF != "") {
      url += "&from=" + valueDeF
    }
    if (valueAF != "") {
      url += '&to=' + valueAF
    }
    axiosInstance.get('/monitoring?from='+valueDeF+'&to='+valueAF+'&type='+paramStatus+'&statusScope='+paramStatusScope)
      .then((res) => {
        console.log("datar" , res.data)
        setMonitorings(res.data)
      })
  }, [valueDeF, valueAF, paramStatus,paramStatusScope]);

  useEffect(() => { console.log("monitorings :", monitorings) }, [monitorings],);
  return (
    <div className="app">
      <div className="formCls">
        <Toaster />
        <div className="d-flex justify-content-between contenuBtn">
          <div className="form-field">
            <span className="titleEntite">MONITORING</span>
          </div>
        </div>
        <div className=" contenuBtnCss">
          <div className="row rowCss">
            <div className="form-group col-md-3 pos">
              <label htmlFor="entité">KPI</label>
              <br />
              <input type="text" className="inptCon" onChange={handlChangeParamReference}/>
              <img src="../assets/images/Searchimg.svg" alt="editIcon" className="imgCon" />
            </div>
            <div className="form-group col-md-3 pos">
              <label htmlFor="entité">Utilisateur</label>
              <br />
              <input type="text" className="inptCon" />
              <img src="../assets/images/Searchimg.svg" alt="editIcon" className="imgCon" />
            </div>
            <div className="form-group col-md-3 pos">
              <label htmlFor="frm">Entités</label>
              <br />
              <input type="text" className="inptCon"  onChange={handlChangeParamLabel}/>
              <img src="../assets/images/Searchimg.svg" alt="editIcon" className="imgCon" />
            </div>
            <div className="form-group col-md-3 pos">
            <label htmlFor="frm">Categories</label>
              <br />
              <input type="text" className="inptCon"  onChange={handlChangeParamLabelCategory}/>
              <img src="../assets/images/Searchimg.svg" alt="editIcon" className="imgCon" />
            </div>

            <div className="form-group col-md-3">
              <br />
              <select
                id="inductor"
                className="fselect-group slctCon"
                onChange={handlChangeParamStatus}
              >
                <option value="" selected>
                  Version
                </option>
                <option value="Budget">Budget</option>
                <option value="Realised">Realised</option>
                <option value="Estimated">Estimated</option>
                <option value="Stopped">Stopped</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <br />
              <select
                id="inductor"
                className="fselect-group slctCon"
                onChange={selectStatusScope}
              >
                <option value="" selected>
                  Statut
                </option>
                <option value="Saisie">Saisie</option>
                <option value="Charge">Chargé</option>
                <option value="Estime">Estimé</option>
              </select>
            </div>
            <div className="form-group col-md-3 moniStyle">
              <br />
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
            </div>
            <div className="form-group col-md-3 moniStyle">
              <br />
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
            </div>
          </div>
        </div>
        <div className="formlist">
          <table>
            <thead>
              <tr>
                <th>Version</th>
                <th>Catégorie</th>
                <th>Référence Indicateur</th>
                <th>Nom Indicateur</th>
                <th>Utilisateur</th>
                <th>Période</th>
                <th>Statut</th>
              </tr>
            </thead>
            {monitorings.map((monitoring) => {
              return (
                <tbody>
                  <tr>
                    <td>{monitoring.type}</td>
                    <td>{monitoring.labelCategory}</td>
                    <td>{monitoring.reference}</td>
                    <td>{monitoring.name}</td>
                    <td>{monitoring.firstName +" "+monitoring.lastName}</td>
                    {/* <td>{monitoring.userId.firstName}</td> */}
                    <td>{monitoring.date}</td>
                    <td>{monitoring.statusScope}</td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default FormMonitoring;
