import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { MouseEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../services/axiosConfig";
import { ICategorie } from "../../Interfaces/ICategorie";
import CircularProgress from "@mui/material/CircularProgress";
import { errMsg } from "../../errMsg";
import { IMsgErr } from "../../Interfaces/IMsgErr";

interface IPageable {
  empty: boolean,
  first: boolean,
  last: boolean,
  number: number
  numberOfElements: number,
  size: number,
  totalElements: number,
  totalPages: number
}

interface IKPI {
  id: number;
  reference: string;
  name: string;
  totalKpiValues: number,
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
const FormSaisieInducteur = () => {
  const [name, setName] = useState<string>("");
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const [reference, setReference] = useState<string>("");
  const handleChangeReference = (e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.currentTarget.value);
  };

  const [isLoading, setLoading] = useState<Boolean>(false);
  const [inductors, setInductors] = useState<IKPI[]>([]);

  const current = new Date();
  let [paramYear, setCount] = useState(2021);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>, inducteurIndex: number, monthIndex: number): void => {
    let inductorCopy = [...inductors]
    inductorCopy[inducteurIndex].monthlyKpiValues[monthIndex].value = e.currentTarget.value
    setInductors(inductorCopy)
  };

  const [totalKpiValues, setTotalKpiValues] = useState();
  const [currentEdit, setcurrentEdit] = useState<number>();
  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);
  const [pagination, setPagination] = useState<IPageable>();
  const [pagesNumber, setPagesNumber] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  let history = useHistory();

  useEffect(() => {
    axiosInstance.get('/categories?page=' + page)
      .then((res) => {
        const { content, pageable, sort, ...pagination } = res.data;
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

  const [paramCategoryId, setParamCategoryId] = useState<string>("");
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

  const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
    axiosInstance.get('/kpis?page=' + page + '&year=' + paramYear + '&categoryId.equals=' + paramCategoryId)
      .then((res) => {
        const { content, pageable, sort, ...pagination } = res.data;
        setInductors(content)
        setPagination(pagination)
        const n = Array(pagination.totalPages).fill(1)
        setPagesNumber(n)
      })
  };

  const handlerPlusYear = (e: React.MouseEvent<HTMLElement>): void => {
    incrementCount();
    console.log("paramYear next", paramYear);
    axiosInstance.get('/kpis?page=' + page + '&year=' + paramYear + '&categoryId.equals=' + paramCategoryId)
      .then((res) => {
        const { content, pageable, sort, ...pagination } = res.data;
        setInductors(content)
        setPagination(pagination)
        const n = Array(pagination.totalPages).fill(1)
        setPagesNumber(n)
      })
  };

  const incrementCount = () => {
    setCount(paramYear + 1);
  };

  const decrementeCount = () => {
    setCount(paramYear - 1);
  };

  const handlerMinusYear = (e: React.MouseEvent<HTMLElement>): void => {
    //console.log("handlerMinusYear : ", e);
    decrementeCount();
    //  console.log("paramYear previous", paramYear);
    axiosInstance.get('/kpis?page=' + page + '&year=' + paramYear + '&categoryId.equals=' + paramCategoryId)
      .then((res) => {
        const { content, pageable, sort, ...pagination } = res.data;
        setInductors(content)
        setPagination(pagination)
        const n = Array(pagination.totalPages).fill(1)
        setPagesNumber(n)
      })
  };

  useEffect(() => { }, [paramYear])

  const download = (event: MouseEvent) => {
    axiosInstance({
      url: `kpis/export/xlsx/?year=${paramYear}&categoryId.equals=${paramCategoryId}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log("url", url)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `kpis_realised_${paramYear}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  const [methodHeaders, setMethodHeader] = useState<string>();
  useEffect(() => {
    console.log("methodHeaders", methodHeaders)
  }, [methodHeaders])

  const [indexMnthlyKpiValues, setIndexMnthlyKpiValues] = useState<IKPI[]>([]);
  useEffect(() => {
    console.log("indexMnthlyKpiValues  555", indexMnthlyKpiValues)
  }, [indexMnthlyKpiValues])
  useEffect(() => {
    axiosInstance.get('/kpis?page=' + page + '&year=' + paramYear + '&categoryId.equals=' + paramCategoryId)
      .then((res) => {

        setMethodHeader(res.headers.method);
        const { content, pageable, sort, ...pagination } = res.data;
        setInductors(content)
        setIndexMnthlyKpiValues(content)
        setPagination(pagination)
        const n = Array(pagination.totalPages).fill(1)
        setPagesNumber(n)
      })
  }, [page, paramCategoryId]);

  const [errMsgs, setErrMasg] = useState<IMsgErr[]>([]);

  const handleSubmit = async (event: MouseEvent) => {
    let postArr = [];
    let putArr = [];
    for (let index = 0; index < inductors.length; index++) {
      const indicator = inductors[index];
      let length = indicator.monthlyKpiValues.length;
      let i = -1;
      while (++i < length) {
        let monthlyKpiValue = indicator.monthlyKpiValues[i]
        if (monthlyKpiValue.id === null) {
          postArr.push(monthlyKpiValue)
        }
        else {
          putArr.push(monthlyKpiValue)
        }
      }
    }
    //console.log("setInd", arr)

    setLoading(true);
    if (postArr.length > 0) {
      axiosInstance.post('monthly-kpi-values', postArr)
        .then((res) => {
          if (res.headers.httpresponsestatus == "SUCCESS") {
            toast.success('les données ont été enregistrées avec succès');
            history.push("/saisie");
          }
          if (res.headers.httpresponsestatus == "FAILURE") {
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
          setLoading(true);
          toast.error('Erreur! données non enregistrées');
          //toast.error('Erreur! données non enregistrées');         
        })
    }
    if (putArr.length > 0) {
      axiosInstance.put('monthly-kpi-values/totalUpdate', putArr)
        .then((res) => {
          console.log('test s', res)
          if (res.headers.httpresponsestatus == "SUCCESS") {
            setLoading(false);
            toast.success('update avec succès');
            history.push("/saisie");
          }
          if (res.headers.httpresponsestatus == "FAILURE") {
            console.log('test')
            setErrMasg(res.data)
            setisErrOpen(true)
          }
        })
        .catch((err) => {
          setLoading(true);
          toast.error('Erreur! données non enregistrées');
        })
    }
  };

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
            <span className="titleEntite">SAISIE DES INDICATEURS</span>
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
          <div className="form-field thrBtnFilter">
            <select
              id="Catégorie"
              className="fselectCls"
              onChange={handleChangeEntite}
            >
              <option value="" selected>
                Catégorie
              </option>
              {categories.map((categorie) => (
                <option value={categorie.id} key={categorie.id}>
                  {categorie.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="formlist">
          <form id="create-course-form">
            <table id="yourTable" className="tableMy">
              <thead>
                <tr>
                  <th className="thcls">Référence Indicateur</th>
                  <th className="thcls">Nom Indicateur</th>
                  <th className="thcls"><img src="../assets/images/tabL.svg" alt="detailIcon" onClick={(e) => handlerMinusYear(e)} className="imgNxt" /></th>
                  {inductors.slice(0, 1).map((inductor) => {
                    return (
                      <>
                        {inductor.monthlyKpiValues.map((itemChild) => {
                          return (
                            <th className="thcls">{itemChild.label}</th>
                          )
                        })}
                      </>
                    );
                  })
                  }
                  <th className="thcls"><img src="../assets/images/tabR.svg" alt="detailIcon" onClick={(e) => handlerPlusYear(e)} className="imgNxt" /></th>
                  <th className="thcls">Total (DH)</th>
                  <th className="thcls"></th>
                </tr>
              </thead>
              {inductors.map((inductor, inducteurIndex) => {
                //console.log("inductors", inductors)
                return (
                  <tbody key={inductor.id}>
                    <tr>
                      <td>{currentEdit === inductor?.id ? (<input
                        type="text" className="changeIn" value={reference} onChange={handleChangeReference} />) : (inductor.reference)}
                      </td>
                      <td>
                        {currentEdit === inductor?.id ? (
                          <input type="text" className="changeIn" value={name} onChange={handleChangeName} />) : (inductor.name)}
                      </td>
                      <td></td>
                      {inductor.monthlyKpiValues.map((itemChild, monthIndex) => {
                        return (
                          <td>
                            {itemChild.status === "Active" ? (
                              <input type="text" className="changeInSaisie" value={itemChild.value} onChange={(e) => handleChangeValue(e, inducteurIndex, monthIndex)} />) :
                              (<input type="text" disabled className="bgDisabled" value={itemChild.value} />)}
                          </td>
                        )
                      })}
                      <td></td>
                      <td>{currentEdit === inductor?.id ? (<input
                        type="text" className="changeIn" value={totalKpiValues} onChange={handleChangeReference} />) : (inductor.totalKpiValues)}
                      </td>
                      <td>
                        {currentEdit !== Number(indexMnthlyKpiValues) ? (
                          <Link to={{ pathname: "details", state: { id: inductor?.id } }}>
                            <button
                              id={inductor.id.toString()}
                              className="clsbg"
                            >
                              <i>
                                <img
                                  className="imgplusSaisie"
                                  src="../assets/images/plusSaisie.svg"
                                  alt="plusSaisie"
                                />
                              </i>
                            </button>
                          </Link>
                        ) : (
                          null
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })
              }
            </table>
          </form>
          <div className="pagination">
            {pagination?.first ? null : <i className="paginationImage" onClick={() => setPage(page - 1)}>
              <img src="../assets/images/PathLeft.svg" alt="detailIcon" />
            </i>}
            {pagesNumber.map((p, i) => (
              <i className="paginationImage" key={i}>
                <img src={i == pagination?.number ? "../assets/images/EllipseDark.svg" : "../assets/images/EllipseW.svg"} alt="detailIcon" />
              </i>
            ))}
            {pagination?.last ? null : <i className="paginationImage" onClick={() => setPage(page + 1)}>
              <img src="../assets/images/PathR.svg" alt="detailIcon" />
            </i>}
          </div>
          <br />
          <br />
          <div className="btnClsThree d-flex justify-content-between">
            <div></div>
            <div className="d-flex justify-content-center">
              <Link to="/saisie">
                <button
                  onClick={(e) => handlerInputType(e)}
                  className={`reset`}
                >
                  ANNULER
                </button>
              </Link>
              <button className="submit" onClick={handleSubmit}>
                SOUMETTRE
              </button>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btnImp d-flex justify-content-between export" onClick={(e) => download(e)}>
                <img src="./assets/images/Excel.svg" className="imgExp" />
                <span className="spnExp">EXPORT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormSaisieInducteur;
