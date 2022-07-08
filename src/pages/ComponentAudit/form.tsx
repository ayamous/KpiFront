import { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { MouseEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from 'moment';
import { IAudit } from "../Interfaces/IAudit";
import axiosInstance from "../../services/axiosConfig";
export function formatDateAndTime(date: string) {
  moment.locale('fr');
  return moment(date).format('YYYY-MM-DD');
}


const FormAudit = () => {
  const [paramStatus, setParamStatus] = useState<string>("");
  const handlChangeParamStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.currentTarget.value;
    setParamStatus(status);
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
  const [audits, setAudits] = useState<IAudit[]>([]);
  useEffect(() => {//http://localhost:8090/business/api/audit?from=2021-08-01&to=2021-11-01&type=Realised&id=5004
    axiosInstance.get('/audit?from='+valueDeF+'&to='+valueAF+'&type='+paramStatus)
      .then((res) => {
        console.log("datar" , res.data)
        setAudits(res.data)
      })
  }, [valueDeF, valueAF, paramStatus]);
  
  useEffect(() => { console.log("audits :", audits) }, [audits]);
  return (
    <div className="app">
    <div className="formCls">
          <Toaster/>
          <div className="d-flex justify-content-between contenuBtn">
        <div className="form-field">
            <span className="titleEntite">AUDIT</span>
        </div>
        </div>
        <div className=" contenuBtnCss">  
      <div className="row rowCss">
        <div className="form-group col-md-3 pos">
          <label htmlFor="entité">KPI</label>
          <br />
            <input type="text" className="inptCon"/>
            <img src="../assets/images/Searchimg.svg" alt="editIcon" className="imgCon"/>
        </div>
        <div className="form-group col-md-3 pos">
          <label htmlFor="entité">Utilisateur</label>
          <br />
          <input type="text" className="inptCon"/>
            <img src="../assets/images/Searchimg.svg" alt="editIcon" className="imgCon"/>
        </div>
        <div className="form-group col-md-3 pos">
          <label htmlFor="frm">Entités</label>
          <br />
          <input type="text" className="inptCon"/>
            <img src="../assets/images/Searchimg.svg" alt="editIcon" className="imgCon"/>
        </div>
        <div className="form-group col-md-3 pos">
        <label htmlFor="frm">Categories</label>
          <br />
          <input type="text" className="inptCon"/>
            <img src="../assets/images/Searchimg.svg" alt="editIcon" className="imgCon"/>
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
        <div className="form-group col-md-4 moniStyleAudit">
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
        <div className="form-group col-md-4 moniStyleAudit">
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
            <form id="create-course-form">
            <table id="yourTable" className="tableMy">
              <thead>
                <tr>
                    <th>Version</th>
                    <th>Catégorie</th>
                    <th>Référence Indicateur</th>
                    <th>Nom Indicateur</th>
                    <th>Mois</th>
                    <th>Date saisie</th>
                    <th>Utilisateur</th>
                    <th>Montant</th>
              </tr>
            </thead>
            {audits.map((audit) => {
              return (
                <tbody>
                  <tr>
                    <td>{audit.type}</td>
                    <td>{audit.labelCategory}</td>
                    <td>{audit.reference}</td>
                    <td>{audit.name}</td>
                    <td>{audit.date.slice(5, 7)}</td>
                    <td>{audit.date}</td>
                    <td>{audit.firstName +" "+audit.lastName}</td>
                    <td>{audit.value}</td>                   
                    <td>{audit.statusScope}</td>
                  </tr>
                </tbody>
              )
            })}
            </table>
            </form>
            </div>
            
      </div>
    </div>
  );
};

export default FormAudit;
