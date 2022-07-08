import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {AiOutlineSearch} from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from "../../../services/axiosConfig";
import { IKPIData } from "../../Interfaces/IKPIData";
import CircularProgress from "@mui/material/CircularProgress";
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
  interface IEntite {
    id: number,
    label: string,
    description: string
}

let errMsgInitila = true
const FormImportList = () => {

    const [entites, setEntites] = useState<IEntite[]>([]);
    const[label, setLabel]=useState<string>();
    const[description, setDescription]=useState<string>();
    const[id, setID]=useState<number>();
    const [isChangeable, setChangeable] = useState<boolean>(false);
    const [currentEdit, setcurrentEdit] = useState<number>();
    const [searchInput, setSearchInput] = useState("");
    const [isCrescent, setIsCrescent] = useState(false);
    const[pagination, setPagination] = useState<IPageable>();
    const[pagesNumber, setPagesNumber] = useState<number[]>([]);
    const[page, setPage] = useState<number>(0);


    const[isChecked, setIsChecked] = useState<Boolean>(false);

    const[kpiValueType, setkpiValueType]= useState<string|any>();
    const handleChangekpiValueType = (e: ChangeEvent<HTMLInputElement>)=>{
      setIsCurrentCheckedId(e.currentTarget.id)
      setkpiValueType(e.currentTarget.value);
      setIsChecked(true)
    }

    const[isCurrentCheckedId, setIsCurrentCheckedId] = useState<string>();

    const handleChangekpi = (id:string)=>{
     if(isChecked && isCurrentCheckedId === id){
       //{!isChecked ? "liImportChecked" : "liImport"}
      return  "liImport";
     } 
    else{
      return  "liImportChecked"
    
    }
  }
    const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>)=>{
        setDescription(e.currentTarget.value);
    }

    const entite={
        id:id,
        label:label,
        description:description
    }

    useEffect(() => {
        axiosInstance.get('/entites?page='+page)
            .then((res) => {
                const {content,pageable,sort,...pagination} =res.data;
                setEntites(content)
                setPagination(pagination)
                const n = Array(pagination.totalPages).fill(1)
               setPagesNumber(n)
            })
    }, [page]);

    let history = useHistory();
    const[showModal,setShowModal] = useState<string>("modalImpHide")
    const showModel = (event: MouseEvent) => {
      if(showModal == "modalImpHide") {
        setShowModal("modalImp")
      }else{
        setShowModal("modalImpHide")
      }  
  }

  const closedModel = (event: MouseEvent) => {
    if(showModal == "modalImp") {
      setShowModal("modalImpHide")
    } 
}

//file
const [fileList, setFileSelected] = useState<FileList | null>(); // also tried <string | Blob>
const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
  const files = e.target.files;
  setFileSelected(files);
};

const [isLoading, setLoading] = useState<Boolean>(false);
const [data, setData] = useState<IKPIData[]>([]);
 useEffect(()=>{
  console.log("data import 3:", data,data?.length>0,data?.length)
},[data]) 

const[errMsgs, setErrMasg] = useState<IMsgErr[]>([]);

const handleSubmit = async (event: MouseEvent) => {
  event.preventDefault();
  let formData = new FormData();
  if (fileList) {
    //console.log("fileList",fileList)
   for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
     // console.log("element", element);
      formData.append("file",element);
    }
  }
  
  formData.append('kpiValueType', kpiValueType);
  axiosInstance.post("/monthly-kpi-values/import/xlsx", formData,{headers: {
    'Content-Type': 'multipart/form-data'
  }})
      .then((res) => {
        //console.log("response import", res)
        setData(res.data);
          setLoading(false);
          toast.success('Vos changements ont été enregistrés.');
          history.push("/import");
          setShowModal("modalImpHide")
      })
      .catch((err) => {
          setLoading(false);
          toast.error('Erreur! données non enregistrées');
          setShowModal("modalImpHide")
      })
};
const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
  axiosInstance.get('/kpis')
      .then((res) => {
        const {content,pageable,sort,...pagination} =res.data;
         setData(content)
        setPagination(pagination)
        const n = Array(pagination.totalPages).fill(1)
        setPagesNumber(n)
      })
}; 
    const onSubmit = (event: MouseEvent) => {
      event.preventDefault();
      setLoading(true);
      axiosInstance.post('monthly-kpi-values/validation', data)
          .then((res) => {
            if(res.headers.httpresponsestatus == "SUCCESS"){
              toast.success('les données ont été enregistrées avec succès');
            history.push("/import");
            }
            if(res.headers.httpresponsestatus == "FAILURE"){
              setLoading(false);
            setErrMasg(res.data)
            setisErrOpen(true)
            }  
          })
          .catch((err) => {
              setLoading(false);
              toast.error('Erreur! données non enregistrées');
          })
      };
      const [classNameActif, setClassNameActif] = useState("actif");
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
          <Toaster/>
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
          <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
              <span className="titleEntite">IMPORT</span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="input-group search mb-3">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Nom, référence ou groupe"
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
            <div className="form-field">
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="divImp">
                  <button className="btnImp d-flex justify-content-between" 
                   onClick={showModel}
                  >
                  <img src="./assets/images/listImport.svg"  className="imgImp"/>
                  <span className="spnImp">IMPORTER</span>
                  </button>
              </div>
              <div className={ ` ${showModal}`}>
              <div className="d-flex justify-content-between">
              <span className="titleImp">Choisir l'axe à importer</span>
              <img onClick={closedModel} className="imgClosed" src="../assets/images/closed.svg" alt="closed"/>
              </div> 
                    <div className="d-flex divBorderImpRadio">
                    <div className="containerDiv">
                  <ul>
                    <li className={handleChangekpi("r-option")} >
                      <input type="radio" id="r-option" name="selector" value="Realised" onChange={handleChangekpiValueType}/>
                      <label htmlFor="r-option" className="labImp">Réalisé</label>
                      <div className="check"></div>
                    </li>
                    <li className={handleChangekpi("b-option")}>
                      <input type="radio" id="b-option" name="selector" value="Budget" onChange={handleChangekpiValueType}/>
                      <label htmlFor="b-option" className="labImp">Budget</label>
                      <div className="check"><div className="inside"></div></div>
                    </li>
                    <li className={handleChangekpi("e-option")}>
                      <input type="radio" id="e-option" name="selector" value="Estimated" onChange={handleChangekpiValueType}/>
                      <label htmlFor="e-option" className="labImp">Estimé</label>
                      <div className="check"><div className="inside"></div></div>
                    </li>
                    <li className={handleChangekpi("a-option")}>
                      <input type="radio" id="a-option" name="selector" value="Stopped" onChange={handleChangekpiValueType}/>
                      <label htmlFor="a-option" className="labImp">Arrêté</label>
                      <div className="check"><div className="inside"></div></div>
                    </li>
                  </ul>
                </div>
                    </div>
                    <div className="divImp divImpT">
                  <button className="btnImp d-flex justify-content-between" onClick={handleSubmit}>
               <span></span>
                  <span className="spnImptwo">IMPORTER</span>
                  </button>
              </div>
              <div className="divPiecJoint100">
              <div className="uploadFilIn">
              <label htmlFor="file-upload" className="fileImport">
              <i className="">
              <img src="./assets/images/listImport.svg"  className="imgImpFile"/>  
              </i>
            </label>
            <input
              id="file-upload"
              name="upload_cont_img"
              type="file"
              style={{ display: "none" }}
              accept=".xlsx,.xls"
              className="form-control"
              onChange={handleFileChange}
              multiple
            />  
              </div>
            </div>
                  </div>
            </div>
          </div>
          <div className="formlist impForm">
            <table>
                <thead>
                    <tr>
                        <th>Référence Indicateur</th>
                        <th>Nom Indicateur</th>
                        <th>Période</th>
                        <th>Version</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                 {data?.length>0?
              data.map((_data:IKPIData) => {
               // console.log("data import 2 value", _data.value)
                return (
                  <tbody key={_data.id}>
                    <tr>
                      <td>{currentEdit === _data?.id ? (<input
                            type="text" className="changeIn" value={_data.kpi.reference} />) : (_data.kpi.reference) }
                      </td>
                      <td>{currentEdit === _data?.id ? (<input
                            type="text" className="changeIn" value={_data.kpi.name} />) : (_data.kpi.name) }
                      </td>
                      <td>{currentEdit === _data?.id ? (<input
                            type="text" className="changeIn" value={_data.date} />) : (_data.date) }
                      </td>
                      <td>{currentEdit === _data?.id ? (<input
                            type="text" className="changeIn" value={_data.type} />) : (_data.type) }
                      </td>
                      <td>{currentEdit === _data?.id ? (<input
                            type="text" className="changeIn" value={_data.value} />) : (_data.value) }
                      </td>
                    </tr>
                  </tbody>
                );
              }) : null 
            } 
            </table>
            {data?.length>0?
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
            
    :null}<br/>
    <br/>
    {data?.length>0?
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
        {/* {isLoading ? (
          <div className="progress">
            <CircularProgress style={{ color: "#C82345" }} />
          </div>
        ) : (
          <button className="submit" onClick={onSubmit}>
            ENREGISTRER
          </button>
        )} */}
      </div>
      :null}
            {/* <table>
              <thead className="tableMsg">
                <tr>
                  <th>Règle de contrôle numéro</th>
                  <th>Nom Indicateur</th>
                  <th>Message d'errur</th>
                  <th>Période</th>
                </tr>
              </thead>
            </table> */}
            </div>
           
        </div>
      </div>
    );
  };
  export default FormImportList;