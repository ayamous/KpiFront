import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { TextField } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment"
import axiosInstance from "../../services/axiosConfig";
import { IPageable } from "../Interfaces/IPageable";

interface IKPI {
    id: number;
    reference:string;
    name: string;
    totalKpiValues:number,
    monthlyKpiValues: [{
        id: number;
        label: string,
        date: Date,
        value: string,
        type: string,
        status: string,
    }]
  }
const FormConsultation = () => {
  const [version, setVersion] = useState<{ label: string; value: string }>();
  const selectVersion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (optionsVersion[index].label === label) {
        break;
      }
      index++;
    }
    setVersion(optionsVersion[index]);
  };
  const optionsVersion = [
    {label: "Budget", value: "Budget"},
    {label: "Realised", value: "Realised"},
    {label: "Estimated", value: "Estimated"},
    {label: "Stopped", value: "Stopped"}
  ];
 
  const [status, setStatus] = useState<{ label: string; value: string }>();
  const selectStatus= (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (optionsStatus[index].label === label) {
        break;
      }
      index++;
    }
    setVersion(optionsStatus[index]);
  };
  const optionsStatus = [
    {label: "Active", value: "Active"},
    {label: "Inactive", value: "Inactive"},
  ];

  const [valueDe, setValueDe] = useState<Date|any>(null);
  let valueDeF = moment(valueDe).format('yyy-MM-DD')

  const [valueA, setValueA] = useState<Date|any>(null);
  let valueAF = moment(valueA).format('yyy-MM-DD')

  const[pagination, setPagination] = useState<IPageable>();
  const[pagesNumber, setPagesNumber] = useState<number[]>([]);
  const[page, setPage] = useState<number>(0);
  let [paramYear, setCount] = useState(2021);
  const[paramCategoryId,setParamCategoryId]=useState<string>("");
  const [inductors, setInductors] = useState<IKPI[]>([]);
  const [indexMnthlyKpiValues, setIndexMnthlyKpiValues] = useState<IKPI[]>([]);
useEffect(()=>{
  console.log("indexMnthlyKpiValues", indexMnthlyKpiValues)
},[indexMnthlyKpiValues])
  useEffect(()=>{
    console.log("indexMnthlyKpiValues", indexMnthlyKpiValues)
  },[indexMnthlyKpiValues])
  useEffect(() => {
    axiosInstance.get('/kpis?page='+page+'&year='+paramYear + '&categoryId.equals='+paramCategoryId)
        .then((res) => {
          
          const {content,pageable,sort,...pagination} =res.data;
           setInductors(content)
           setIndexMnthlyKpiValues(content)
          setPagination(pagination)
          const n = Array(pagination.totalPages).fill(1)
          setPagesNumber(n)
        })
  }, [page,paramCategoryId]);
  return (
    <div className="app">
    <div className="formCls">
          <Toaster/>
          <div className="d-flex justify-content-between contenuBtn">
        <div className="form-field">
            <span className="titleEntite">CONSULTATION</span>
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
            onChange={selectVersion}
          >
            <option value=""  selected>
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
            onChange={selectStatus}
          >
            <option value=""  selected>
            Statut
            </option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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
            <form id="create-course-form">
            <table id="yourTable" className="tableMy">
              <thead>
                <tr>
                    <th>Version</th>
                    <th>Catégorie</th>
                    <th>Référence Indicateur</th>
                    <th>Nom Indicateur</th>
                  {inductors.slice(0, 1).map((inductor) => {
                return (
                  <>
                   {inductor.monthlyKpiValues.map((itemChild)=>{
                      return (
                        <th className="thcls">{itemChild.label}</th> 
                      )
                    })}
                </>
                 );
                })
              } 
                <th className="thcls ttlCls">Total (DH)</th>
              </tr>
            </thead>
              
            </table>
            </form>
            </div>
            
      </div>
    </div>
  );
};

export default FormConsultation;
