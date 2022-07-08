import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MouseEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment"

const FormHistoriqueList = () => {

  const [valueDe, setValueDe] = useState<Date|any>(null);
  let valueDeF = moment(valueDe).format('yyy-MM-DD')

  const [valueA, setValueA] = useState<Date|any>(null);
  let valueAF = moment(valueA).format('yyy-MM-DD')
  return (
    <div className="app">
      <div className="formCls">
          <Toaster />
          <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field">
            <Link to='/estimation' ><span className="titleEntiteLien">ESTIMATION {'>'} </span></Link>
              <span className="titleEntiteWL">HISTORIQUE DES ESTIMATIONS</span>
            </div>
          </div>
          <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
            <span className="datPick">
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
            <span>
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
            
        
              <select id="nitification" className="fselectCls">
                <option value="" disabled selected>
                Catégorie
                </option>
              </select>
              
            </div>
          </div>
          <div className="formlist">
            <table>
              <thead>
                <tr>
                  <th>Référence Indicateur</th>
                  <th>Nom Indicateur</th>
                  <th>Date de lancement d'estimations</th>
                  <th>Méthode d'estimation</th>
                  <th>Source</th>
                  <th>Période</th>
                  <th>Inducteur</th>
                  <th>Effectué par</th>
                </tr>
              </thead>
            </table>
          </div>
      </div>
    </div>
  );
};
export default FormHistoriqueList;
