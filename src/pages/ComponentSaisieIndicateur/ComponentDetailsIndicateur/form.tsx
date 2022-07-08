import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { MouseEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../services/axiosConfig";
import { ICategorie } from "../../Interfaces/ICategorie";
import CircularProgress from "@mui/material/CircularProgress";
import { IEntite } from "../../Interfaces/IEntite";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import moment from "moment"
import { strictEqual } from "assert";
import { stringify } from "querystring";
import { IMsgErr } from "../../Interfaces/IMsgErr";
import { errMsg } from "../../errMsg";

interface IPageable{
  empty: boolean,
  first:boolean,
  last:boolean,
  number: number
  numberOfElements: number,
  size:number,
  totalElements: number,
  totalPages: number
}

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

interface IKPIDetailMonthValue{
  id:number
}

interface IKPIHistorique{
      creationBy: string,
      creationDate: string,
      date: string,
      id: number
      lastModifiedBy: string,
      lastModifiedDate: string,
      value: number
}

interface IKPIDetail {
  id: number;
  reference: string;
  name:string;
  entite: IEntite,
  productionPeriod:number;
  realisedMonthlyKpiValues: [{
    id: number;
    label: string,
    date: Date,
    value: string,
    type: string,
    status: string,
}];
monthlyKpiValues: [{
  id: number;
  label: string,
  date: Date,
  value: string,
  type: string,
  status: string,
}]
}

let errMsgInitila = true
const FormDetails = (props: { id: string }) => {
  const [name, setName] = useState<string>("");
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const [reference, setReference] = useState<string>("");
  const handleChangeReference = (e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.currentTarget.value);
  };

  const [date, setDate] = useState();
  
  const [isLoading, setLoading] = useState<Boolean>(false);
  
  const [inductors, setInductors] = useState<IKPIDetail[]>([]);
  const current = new Date();
  // const paramYear = `${current.getFullYear()}`;
  // console.log("date:", paramYear)
  
  const [totalKpiValues, setTotalKpiValues] = useState();
  
  const [isChangeable, setChangeable] = useState<boolean>(false);
  const [currentEdit, setcurrentEdit] = useState<number>();
  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);
  const[pagination, setPagination] = useState<IPageable>();
  const[pagesNumber, setPagesNumber] = useState<number[]>([]);
  const[page, setPage] = useState<number>(0);
  let history = useHistory();

  let [paramYear, setCount] = useState(2021);
  console.log("paramYear 11", paramYear)
  let [valueAArrete, setValueAArrete] = useState<Date | any>();
  valueAArrete=paramYear
  let valueAArreteF = moment(valueAArrete).format('yyy-MM-dd')

  const handlerPlusYear = (e: React.MouseEvent<HTMLElement>): void => {
    incrementCount();
    // console.log("paramYear next", paramYear);
    // const kpiId = props.id;
    // axiosInstance.get(`kpis/${kpiId}/details?year=` + paramYear)
    //   .then((res) => {
    //     const { content, pageable, sort, ...pagination } = res.data;
    //     setInductors(content)
    //     setPagination(pagination)
    //     const n = Array(pagination.totalPages).fill(1)
    //     setPagesNumber(n)
    //   })
  };
  
  const incrementCount = () => {
    setCount(paramYear + 1);
  };
  
  const decrementeCount = () => {
    setCount(paramYear - 1);
  };

  useEffect(()=>{},[paramYear])
  
  const handlerMinusYear = (e: React.MouseEvent<HTMLElement>): void => {
    //console.log("handlerMinusYear : ", e);
    decrementeCount();
  //  console.log("paramYear previous", paramYear);
  // const kpiId = props.id;
  //   axiosInstance.get(`kpis/${kpiId}/details?year=` + paramYear)
  //     .then((res) => {
  //       const { content, pageable, sort, ...pagination } = res.data;
  //       setInductors(content)
  //       setPagination(pagination)
  //       const n = Array(pagination.totalPages).fill(1)
  //       setPagesNumber(n)
  //     })
  };

  const [valueDeBudget, setValueDeBudget] = useState<Date|any>("2022");
  let valueDeBudgetF = moment(valueDeBudget).format('yyy-MM-DD')
 
  useEffect(() => {
    axiosInstance.get('/categories?page='+page)
        .then((res) => {
            const {content,pageable,sort,...pagination} =res.data;
            setCategories(content)
            setPagination(pagination)
            const n = Array(pagination.totalPages).fill(1)
            setPagesNumber(n)
        })
}, [page]);

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

  const[paramCategoryId,setParamCategoryId]=useState<string>("");
  const [categories, setCategories] = useState<ICategorie[]>([]);
  const [categorie, setCategorie] = useState<ICategorie>();
  const handleChangeEntite = (e: ChangeEvent<HTMLSelectElement>) => {
    const categoryId = e.target.value;
    let categorie = categories.find((item) => {
      if (item.id == Number(categoryId)) return true;
    }, categories);
    setCategorie(categorie);
    setParamCategoryId(categoryId)
  };
  

const handleSubmit = (event: MouseEvent) => {
  event.preventDefault();
  setLoading(true);
  let putArray =[];
  let postArray = [];
  let length =details?.realisedMonthlyKpiValues.length
//@ts-ignore
  for(let index = 0; index < length; index++){
    const element = details?.realisedMonthlyKpiValues[index];
    if(element?.id !== null){
      putArray.push(element)
    }else{
      postArray.push(element)
    }
  }
  let stoppedLength =details?.stoppedMonthlyKpiValues.length
//@ts-ignore
  for (let index = 0; index < stoppedLength; index++) {
    const element = details?.stoppedMonthlyKpiValues[index];
    if(element?.id !== null ){
      putArray.push(element)
    }else{
      postArray.push(element)
    }
  }
  let budjetLength =details?.budgetMonthlyKpiValues.length
  //@ts-ignore
    for (let index = 0; index < budjetLength; index++) {
      const element = details?.budgetMonthlyKpiValues[index];
      if(element?.id !== null){
        putArray.push(element)
      }else{
        postArray.push(element)
      }
    }
    if(postArray.length >0){
      axiosInstance.post('monthly-kpi-values', postArray)
      .then((res) => {
          setLoading(false);
          toast.success('les données ont été enregistrées avec succès');
          history.push("/saisie");
      })
      .catch((err) => {
          setLoading(false);
          toast.error('Erreur! données non enregistrées');
      })
    }
    if(putArray.length >0){
      axiosInstance.put('monthly-kpi-values/totalUpdate', putArray)
      .then((res) => {
          setLoading(false);
          toast.success('les données ont été enregistrées avec succès');
          history.push("/saisie");
      })
      .catch((err) => {
          setLoading(false);
          toast.error('Erreur! données non enregistrées');
      })
    }
  };

const[detailsMonth, setDetailsMonth] = useState<IKPIHistorique[]>();

const [details, setDetails] = useState<{
  reference: string;
  name:string;
  entite: IEntite,
  productionPeriod:number;
  realisedMonthlyKpiValues: [{
    id: number,
    label: string,
    date: Date,
    value: string,
    type: string,
    status: string,
    method:string
}],
refYear1: [{
  id: number,
  label: string,
  date: string,
  value: string,
  type: string,
  status: string,
}],
refYear2: [{
  id: number,
  label: string,
  date: string,
  value: string,
  type: string,
  status: string,
}], 

budgetMonthlyKpiValues: [{
  id: number,
  label: string,
  date: Date,
  value: string,
  type: string,
  status: string,
}],
totalBudget:number,
totalRealised:number,
totalStopped:number,
totalEcarts:number,
totalEcartsRefYear1:number,
totalEcartsRefYear2:number,
totalRefYear1:number,
totalRefYear2:number,
stoppedMonthlyKpiValues: [{
  id: number,
  label: string,
  date: Date,
  value: string,
  type: string,
  status: string,
}],
ecarts: [{
  id: number,
  label: string,
  date: Date,
  value: string,
  type: string,
  status: string,
}],
ecartsRefYear1: [{
  id: number,
  label: string,
  date: Date,
  value: string,
  type: string,
  status: string,
}],
ecartsRefYear2: [{
  id: number,
  label: string,
  date: Date,
  value: string,
  type: string,
  status: string,
}],
}>();

const[idHistorique, setIdHistorique] = useState<number>()
console.log("idHistorique id :", idHistorique)
const[showCalendarStyleTwo,setShowCalendarStyleTwo] = useState<string>("divTwo")
  const showFleshTwo = (event: MouseEvent,id:number) => {
    //console.log("id historique", id)
    setIdHistorique(id)
    if(showCalendarStyleTwo == "divTwo") {
      setShowCalendarStyleTwo("divNoneTwo")
    }else{
      setShowCalendarStyleTwo("divTwo")
    }     
}

const[showMet,setShowMet] = useState<string>("divMethode")
  const showMethode = (event: MouseEvent) => {
    if(showMet == "divMethode") {
      setShowMet("divMethodeNone")
    }else{
      setShowMet("divMethode")
    }     
}

  const [monthIndex, setMonthIndex] = useState<string>();
  console.log("monthIndex", monthIndex)
  const handleChangeMonthIndex = (e: ChangeEvent<HTMLInputElement> ,index:number) => {
    const field  =e.currentTarget.id
    const detailsCopy = {...details}
        //@ts-ignore
    let columnToUpdate = details[field]
    //console.log(columnToUpdate , "columnToUpdate")
    columnToUpdate[index].value = e.currentTarget.value
      //@ts-ignore
    setDetails({...detailsCopy , [field]:columnToUpdate})
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, monthIndex:number) : void => {
    let inductorCopy = [...inductors]
    
    inductorCopy[monthIndex].monthlyKpiValues[monthIndex].value=e.currentTarget.value
    setInductors(inductorCopy)
    console.log("monthIndex monthIndex3", monthIndex)
    };

  const [indexMnthlyKpiValues, setIndexMnthlyKpiValues] = useState<IKPI[]>([]);
useEffect(()=>{
  console.log("indexMnthlyKpiValues  55588", indexMnthlyKpiValues)
},[indexMnthlyKpiValues])


useEffect(() => {//http://localhost:8090/business/api/kpis/2354/details?year=2040
  const kpiId = props.id;
  axiosInstance.get(`kpis/${kpiId}/details?year=${paramYear}`).then((res) => {
    const data: IKPIDetail[] = res.data.content;
    setDetails(res.data);
    setLoading(false);
  });
}, [paramYear])


useEffect(() => {//http://localhost:8090/business/api/monthly-kpi-value-histories?monthlyKpiValueId=2453
  console.log("idHistorique", idHistorique)
  axiosInstance.get(`monthly-kpi-value-histories?monthlyKpiValueId=${idHistorique}`).then((res) => {
    console.log("res.data IKPIDetailMonthValue id id :::!2",res.data)
    const data: IKPIHistorique[] = res.data.content;
    setDetailsMonth(res.data);
    setLoading(false);
  });
}, [idHistorique])

const download = (event: MouseEvent) => {
  const kpiId = props.id;
  axiosInstance({
    url: `kpis/${kpiId}/export/xlsx?year=${paramYear}`, //http://localhost:8090/business/api/kpis/${kpiId}/export/xlsx?year=2023
    method: 'GET',
    responseType: 'blob',
    //responseType: 'arraybuffer', // important
}).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
   // console.log("url", url)
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kpis_détail_${paramYear}.xlsx`); //or any other extension
    document.body.appendChild(link);
    link.click();
});
}

const [currentactif, setcurrentActif] = useState<string>()
console.log("currentactif", currentactif)
    const onchangeActif = () => {
      if (currentactif == "divTwoShow1") {
        setcurrentActif("divTwo1");
      } else {
        setcurrentActif("divTwoShow1");
      }
    };

     //@ts-ignore
   let tailsDetail:number = (detailsMonth?.length)-4

   const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
     history.goBack()
}; 

const[errMsgs, setErrMasg] = useState<IMsgErr[]>([]);
   const handleSoumettre = (event: MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    let putArray =[];
    let postArray = [];
    let length =details?.realisedMonthlyKpiValues.length
  //@ts-ignore
    for(let index = 0; index < length; index++){
      const element = details?.realisedMonthlyKpiValues[index];
      if(element?.id !== null){
        putArray.push(element)
      }else{
        postArray.push(element)
      }
    }
    let stoppedLength =details?.stoppedMonthlyKpiValues.length
  //@ts-ignore
    for (let index = 0; index < stoppedLength; index++) {
      const element = details?.stoppedMonthlyKpiValues[index];
      if(element?.id !== null ){
        putArray.push(element)
      }else{
        postArray.push(element)
      }
    }
    let budjetLength =details?.budgetMonthlyKpiValues.length
    //@ts-ignore
      for (let index = 0; index < budjetLength; index++) {
        const element = details?.budgetMonthlyKpiValues[index];
        if(element?.id !== null){
          putArray.push(element)
        }else{
          postArray.push(element)
        }
      }
      if(postArray.length >0){
        axiosInstance.post('monthly-kpi-values/validation', postArray)
        .then((res) => {
          if(res.headers.httpresponsestatus == "SUCCESS"){
            toast.success('les données ont été enregistrées avec succès');
          history.push("/saisie");
          }
          if(res.headers.httpresponsestatus == "FAILURE"){
            setLoading(false);
          setErrMasg(res.data)
          setisErrOpen(true)
        //   toast.custom(<div className="formlist err">
        // <form id="create-course-form">
        // <table className="tableMy">
        //   <thead className="tableMsgErr">
        //     <tr>
        //       <th>Règle de contrôle numéro</th>
        //       <th>Nom Indicateur</th>
        //       <th>Message d'errur</th>
        //       <th>Période</th>
        //     </tr>
        //   </thead>
        //   {errMsgs.map((errMsg) => {
        //     console.log("inductors errMsg errMsg", errMsgs)
        //     return (
        //       <tbody>
        //       <tr>
        //         <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
        //               type="text" className="changeIn" value={errMsg.controlRuleNumber} />) : (errMsg.controlRuleNumber) }
        //         </td>
        //         <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
        //               type="text" className="changeIn" value={errMsg.kpiName} />) : (errMsg.kpiName) }
        //         </td>
        //         <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
        //               type="text" className="changeIn" value={errMsg.errorMessage} />) : (errMsg.errorMessage) }
        //         </td>
        //         <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
        //               type="text" className="changeIn" value={errMsg.period} />) : (errMsg.period) }
        //         </td>
        //       </tr>
        //     </tbody>
        //      );
        //     })
        //   } 
        // </table>
        // </form>
        // </div> );
          } 
        })
        .catch((err) => {
            setLoading(false);
            toast.error('Erreur! données non enregistrées');
        })
      }
      if(putArray.length >0){
        axiosInstance.put('monthly-kpi-values/totalUpdate', putArray)
        .then((res) => {
            console.log('test s', res)
          if(res.headers.httpresponsestatus == "SUCCESS"){
            setLoading(false);
            toast.success('update avec succès');
            history.push("/saisie");
          }
          if(res.headers.httpresponsestatus == "FAILURE"){
            console.log('test')
            setErrMasg(res.data)
            setisErrOpen(true)
            } 
        })
        .catch((err) => {
            setLoading(false);
            toast.error('Erreur! données non enregistrées');
        })
      }
    };
    
    // useEffect(()=>{
    //   if(errMsgInitila){
    //     errMsgInitila=false
    //     return
    //   }
    //   toast.custom(<div className="formlist err">
    //   <form id="create-course-form">
    //   <table className="tableMy">
    //     <thead className="tableMsgErr">
    //       <tr>
    //         <th>Règle de contrôle numéro</th>
    //         <th>Nom Indicateur</th>
    //         <th>Message d'errur</th>
    //         <th>Période</th>
    //       </tr>
    //     </thead>
    //     {errMsgs.map((errMsg) => {
    //       //console.log("inductors errMsg errMsg", errMsgs)
    //       return (
    //         <tbody >
    //         <tr>
    //           <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
    //                 type="text" className="changeIn" value={errMsg.controlRuleNumber} />) : (errMsg.controlRuleNumber) }
    //           </td>
    //           <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
    //                 type="text" className="changeIn" value={errMsg.kpiName} />) : (errMsg.kpiName) }
    //           </td>
    //           <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
    //                 type="text" className="changeIn" value={errMsg.errorMessage} />) : (errMsg.errorMessage) }
    //           </td>
    //           <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
    //                 type="text" className="changeIn" value={errMsg.period} />) : (errMsg.period) }
    //           </td>
    //         </tr>
    //       </tbody>
    //        );
    //       })
    //     } 
    //   </table>
    //   </form>
    //   </div> );
    // },[errMsgs])
    
    useEffect(() => {
      console.log("errMsg.length?", errMsg)
    }, [errMsg.length])
  const[isErrOpen, setisErrOpen]=useState(false)
  const handleChangeIsErr = async (event: MouseEvent) => {
    setisErrOpen(false)
  }
  return (
    <div className="app" onClick={handleChangeIsErr}>
      <div className="formCls position-relative">
          <Toaster />
          <div className={ isErrOpen? "ErrDiv" : "ErrDivNon"} >
          <div className="formlist err">
            <form id="create-course-form">
              <table className="tableMy">
                <thead className="tableMsgErr">
                  <tr>
                    <th>Règle de contrôle numéro</th>
                    <th>Nom Indicateur</th>
                    <th>Message d'errur</th>
                    <th>Période</th>
                  </tr>
                </thead>
                {errMsgs.map((errMsg) => {
                  //console.log("inductors errMsg errMsg", errMsgs)
                  return (
                    <tbody >
                      <tr>
                        <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
                          type="text" className="changeIn" value={errMsg.controlRuleNumber} />) : (errMsg.controlRuleNumber)}
                        </td>
                        <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
                          type="text" className="changeIn" value={errMsg.kpiName} />) : (errMsg.kpiName)}
                        </td>
                        <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
                          type="text" className="changeIn" value={errMsg.errorMessage} />) : (errMsg.errorMessage)}
                        </td>
                        <td>{currentEdit === errMsg?.controlRuleNumber ? (<input
                          type="text" className="changeIn" value={errMsg.period} />) : (errMsg.period)}
                        </td>
                      </tr>
                    </tbody>
                  );
                })
                }
              </table>
            </form>
          </div>
        </div>
          <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field d-flex">
            <Link to='/saisie' >
              <span className="titleEntiteLien">SAISIE DES INDICATEURS</span></Link>
              <div className="fleshLien">
              <span>{'>'} </span>
            </div>
              <span className="titleEntiteWL">DETAILS D'INDICATEUR</span>
            </div>
          </div>
          <div className="formlist">
      <div className="row form-field">
      <div className="form-group col-md-3">
          <label htmlFor="">Référence Indicateur </label>
          <input
            type="text"
            className="form-control inputDetail"
            value={details?.reference}
          />
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="">Nom</label>
          <input
            type="text"
            className="form-control inputDetail"
            value={details?.name}
          />
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="">Entité</label>
          <input
            type="text"
            className="form-control inputDetail" 
            value={details?.entite?.label}
          />
        </div>
        <div className="form-group col-md-3">
          <label htmlFor="">Délai de production</label>
          <input
            type="text"
            className="form-control inputDetail"
            value={"M+ "+details?.productionPeriod}
          />
        </div>
      </div>
      </div>
          <div className="formlist">
            <table id="yourTable">
            <div  className={ `${showCalendarStyleTwo}`}>
              <div className="titleSpanTwo">
              <span >Novembre 2020</span>
              </div>
                    <div>
                    <div className="d-flex flex-wrap  form-field divCalendarFTwo p-0">
                    {detailsMonth?.slice(0, 4).map((item,index)=>{
                      return (
                        <div className={(index+1)%4==0?"colmd4 btnTwo borderNone" : "colmd4 btnTwo "}>
                        <span className="valIn">{item.value}</span>
                        <div><span className="valPer">{item.lastModifiedDate} à {item.lastModifiedBy}</span></div>
                      </div>
                      )
                    })} 
                    </div>
                    <div className={ `${currentactif} d-flex flex-wrap form-field divCalendarFTwo p-0`}>
                    {detailsMonth?.slice(4).map((item,index)=>{
                      return (
                        <div className={(index+1)%4==0?"colmd4 btnTwo borderNone" : "colmd4 btnTwo "}>
                        <span className="valIn">{item.value}</span>
                        <div><span className="valPer">{item.lastModifiedDate} à {item.lastModifiedBy}</span></div>
                      </div>
                      )
                    })}
                    </div>
                    </div>
                    <div className="divBtnDetail">
                      <button
                            className="btnIconH"
                            onClick={() => onchangeActif()}
                      >
                      <img  src= {currentactif == "divTwo1" ?"./assets/images/fleshBD.svg":"./assets/images/fleshHD.svg"} />
                      <span className="lengthDetail">{tailsDetail} de plus</span>
                      </button>
                    </div>
                </div>
              <thead>
                <tr>
                  <th className="thcls moniStyle">
          {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={valueAArreteF}
              views={['year']}
              onChange={(newValue) => {
              setValueAArrete(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider> */}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
          views={['year']}
            className="datePick"
            inputFormat="yyyy"
            value={paramYear.toString()}
            onChange={(newValue) => {
              if(newValue){
                  let year = new Date(newValue)
                  setCount(year.getFullYear());
              }
            
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
                  </th>
                  <th className="thcls"><img src="../assets/images/tabL.svg" alt="detailIcon"  onClick={(e)=> handlerMinusYear(e)} className="imgNxt"/></th>
                  {details?.realisedMonthlyKpiValues.map((itemChild)=>{
                      return (
                        <th className="thcls">{itemChild.label}</th> 
                      )
                    })} 
                  <th className="thcls"><img src="../assets/images/tabR.svg" alt="detailIcon" onClick={(e)=> handlerPlusYear(e)} className="imgNxt"/></th>
                  <th className="thcls ttlCls">Total (DH)</th>
                </tr>
              </thead>
              <tbody className="tbodydetail">
              {details?.refYear1.length?
                <tr>
                {details?.refYear1.slice(0, 1).map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeInVersionPrd changInDetails"  value={itemChild?.date.slice(0,4)} /></td>
                      )
                    })}
                    <td></td>
                {details?.refYear1.map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeINN"  value={itemChild.value} /></td>
                      )
                    })}
                    <td></td>
                    <td> <input type="text" className="changeInSaisie changeINN"  value={details?.totalRefYear1} /></td>
                </tr>
                :null}
                {details?.refYear2.length?
                <tr>
                {details?.refYear2.slice(0, 1).map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeInVersionPrd changInDetails"  value={itemChild?.date.slice(0,4)} /></td>
                      )
                    })}
                  <td></td>
                {details?.refYear2.map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeINN"  value={itemChild.value} /></td>
                      )
                    })}
                    <td></td>
                    <td> <input type="text" className="changeInSaisie changeINN"  value={details?.totalRefYear2} /></td>
                </tr>
                :null}
                {details?.budgetMonthlyKpiValues.length?
                <tr>
                <td><input type="text" className="changeInSaisie changeInVersionPrd changInDetails"  value="Budget" /></td>
                  <td></td>
                {details?.budgetMonthlyKpiValues.map((itemChild,monthIndex)=>{
                      return (
                        <td>
                          {itemChild.status === "Active" ? (
                          <input id = "budgetMonthlyKpiValues" type="text" className="changeInSaisie"  value={itemChild.value} 
                        onChange={(e)=>handleChangeMonthIndex(e,monthIndex)}/>) :
                        (<input type="text" disabled className="bgDisabled" value={itemChild.value} />)}
                        </td>
                      )
                    })}
                    <td></td>
                    <td> <input type="text" className="changeInSaisie changeINN"  value={details?.totalBudget} /></td>
                </tr>
                :null}
                {details?.realisedMonthlyKpiValues.length?
                <tr>
                <td><input type="text" className="changeInSaisie changeInVersionPrd changInDetail"  value="N (Réalisé)"/></td>
                  <td></td>
                {details?.realisedMonthlyKpiValues.map((itemChild,monthIndex)=>{
                      return (
                        <td className="tdMeth">
                          {itemChild.status === "Active" ? (
                          <input type="text" id="realisedMonthlyKpiValues" className="changeInSaisie"  value={itemChild.value}
                          onChange={(e)=>handleChangeMonthIndex(e,monthIndex)}
                          />):
                          (<input type="text" disabled className="bgDisabled" value={itemChild.value} />)}
                          <div className="methShow">
                          <div className="clock"> <img  src="../assets/images/clock.svg" alt="detailIcon" onClick={(event)=>showFleshTwo(event,itemChild.id)} /> </div>
                          {itemChild?.status === "Active"? <div className={ `${showMet}`}><span>{itemChild.method}</span></div>: ""}
                          </div>
                        </td>
                      )
                    })}
                    <td></td>
                    <td>
                      <input type="text" className="changeInSaisie changeINN"  value={details?.totalRealised}/>
                      <img   onClick={showMethode}
          src={showMet=="divMethode" ?"../assets/images/fDB.svg":"../assets/images/fDH.svg"} alt="ActiverInactive"/>
                    </td>
                    {/* <td>
                      <img   onClick={showMethode}
          src={showMet=="divMethode" ?"../assets/images/fDB.svg":"../assets/images/fDH.svg"} alt="ActiverInactive"/>
                    </td> */}
                </tr>
                :null}
                {details?.stoppedMonthlyKpiValues.length?
                <tr>
                <td><input type="text" className="changeInSaisie changeInVersionPrd changInDetail"  value="N (Arrêté)"/></td>
                  <td></td>
                {details?.stoppedMonthlyKpiValues.map((itemChild,monthIndex)=>{
                      return (
                        <td> 
                          {itemChild.status === "Active" ? (
                          <input id="stoppedMonthlyKpiValues" type="text" className="changeInSaisie"  value={itemChild.value} 
                        onChange={(e)=>handleChangeMonthIndex(e,monthIndex)}
                        />) :
                        (<input type="text" disabled className="bgDisabled" value={itemChild.value} />)}
                        </td>
                      )
                    })}
                    <td></td>
                    <td> <input type="text" className="changeInSaisie changeINN"  value={details?.totalStopped} /></td>
                </tr>
                :null}
                {details?.ecarts.length?
                <tr>
                <td><input type="text" className="changeInSaisie changeInVersionPrd changInDetails"  value="Ecart/Budget"/></td>
                  <td></td>
                {details?.ecarts.map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeINN"  value={itemChild.value} /></td>
                      )
                    })}
                    <td></td>
                    <td> <input type="text" className="changeInSaisie changeINN"  value={details?.totalEcarts} /></td>
                </tr>
                :null}
                {details?.ecartsRefYear1.length?
                <tr>
                {details?.refYear1.slice(0, 1).map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeInVersionPrd changInDetails"  value={"Ecart/" + itemChild?.date.slice(0,4)} /></td>
                      )
                    })}
                    <td></td>
                {details?.ecartsRefYear1.map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeINN"  value={itemChild.value} /></td>
                      )
                    })}
                    <td></td>
                    <td> <input type="text" className="changeInSaisie changeINN"  value={details?.totalEcartsRefYear1} /></td>
                </tr>
                :null}
                {details?.ecartsRefYear2.length?
                <tr>
                {details?.refYear2.slice(0, 1).map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeInVersionPrd changInDetails"  value={"Ecart/" +itemChild?.date.slice(0,4)} /></td>
                      )
                    })}
                  <td></td>
                {details?.ecartsRefYear2.map((itemChild)=>{
                      return (
                        <td> <input type="text" className="changeInSaisie changeINN"  value={itemChild.value} /></td>
                      )
                    })}
                    <td></td>
                    <td> <input type="text" className="changeInSaisie changeINN"  value={details?.totalEcartsRefYear2} /></td>
                </tr>
                :null}
              </tbody>
            </table>
            <div className="pagination">
              {pagination?.first? null:  <i className="paginationImage" onClick={()=>setPage(page-1)}>
              <img src="../assets/images/PathLeft.svg" alt="detailIcon" />
            </i>}
            {pagesNumber.map((p,i)=>(
               <i className="paginationImage" key={i}>
               <img src={i==pagination?.number?"../assets/images/EllipseDark.svg":"../assets/images/EllipseW.svg"} alt="detailIcon"/>
             </i>
            ))}
            {pagination?.last?null: <i className="paginationImage" onClick={()=>setPage(page+1)}>
              <img src="../assets/images/PathR.svg" alt="detailIcon"/>
            </i>}
            </div>
            <br/>
            <br/>
            <div className="btnClsThree d-flex justify-content-between">
              <div>
              <Link to="/saisie">
          <button
            onClick={(e)=> handlerInputType(e)}
            className={`reset`}
          >
            ANNULER
          </button>
        </Link>
              </div>
              <div className="d-flex justify-content-center">
          <button
            className={`submit`}  onClick={handleSubmit}
          >
            ENREGISTRER
          </button>
          <button className="submit" onClick={handleSoumettre}>
            SOUMETTRE
          </button>
              </div>
              <div className="d-flex justify-content-end">
              <button className="btnImp d-flex justify-content-between export" onClick={(e)=>download(e)}>
                <img src="./assets/images/Excel.svg" className="imgExp"/>
                <span className="spnExp">EXPORT</span>
              </button>
              </div>
      </div>
      <table id="yourTable">
              <thead>
                <tr>
                  <th>Indicateur</th>
                  <th>Val. Réf.</th>
                  <th>Méthode</th>
                  <th>Val Max</th>
                  <th>Val Min</th>
                  <th>Actif (Oui/Non)</th>
                </tr>
              </thead>
            </table>
          </div>
      </div>
    </div>
  );
};
export default FormDetails;
