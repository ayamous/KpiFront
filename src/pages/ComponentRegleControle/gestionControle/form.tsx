import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { IPageable } from "../../Interfaces/IPageable";
import { IKPI } from "../../Interfaces/IKPI";
import { IControleRule } from "../../Interfaces/IControleRule";

const FormControleList = () => {
  const [checkedValueInactive, setCheckedValueInactive] = useState<string|null>();
  const handlerCheckboxInactive = (e:any): void => {
    if (e.currentTarget.value=="Active") {
      setCheckedValueInactive("Inactive");
    } else {
      setCheckedValueInactive("Active");
    }
  };

  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);
  const [currentEdit, setcurrentEdit] = useState<number>();
  const[pagination, setPagination] = useState<IPageable>();
  const[pagesNumber, setPagesNumber] = useState<number[]>([]);
  const[page, setPage] = useState<number>(0);
  const [referenceValue, setValRef] = useState<{ label: string; value: string }>();
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
    { label: "M", value: "M"},
    { label: "M-1", value: "M_1"},
    { label: "A-Ref", value: "A_Ref"},
    { label: "Fin M", value: "Fin_m"},
    {label: "Budget",value: "Budget"},
  ];

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
      { label: "Différence", value: "Difference"},
      { label: "Ratio", value: "Ratio"},
    ];

    const [valueType, setValType] = useState<{ label: string; value: string }>();
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
      { label: "Alg", value: "Alg"},
      { label: "%", value: "Pct"},
    ];

    const [maxValue, setMaxValue] = useState<string>("");
    const handleChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
      setMaxValue(e.currentTarget.value);
    };

    const [minValue, setMinValue] = useState<string>("");
    const handleChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
      setMinValue(e.currentTarget.value);
    };

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
    axiosInstance.get("/kpis?size=100").then((res) => {
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
    axiosInstance.get("/kpis?size=100").then((res) => {
      const data: IKPI[] = res.data.content;
      let kpisCopy = [...kpiControls];
      data.forEach((element) => {
        kpisCopy.push(element);
      });
      setKpiControls(kpisCopy);
    });
  }, []);

const controleRule = {
  referenceValue: referenceValue?.value,
  calculationMethod: calculationMethod?.value,
  valueType: valueType?.value,
  maxValue: maxValue,
  minValue: minValue,
  kpiBase:kpiBase?.name,
  kpiControl:kpiControl?.name
}

  const [controleRules, setControleRules] = useState<IControleRule[]>([]);
  console.log("controleRules::", controleRules)
  useEffect(() => {
    axiosInstance.get('/control-rules?page='+page)
        .then((res) => {
            const {content,pageable,sort,...pagination} =res.data;
            setControleRules(content)
            setPagination(pagination)
            const n = Array(pagination.totalPages).fill(1)
            setPagesNumber(n)   
        })
}, [page]);

const edit = (event: MouseEvent) => {}
const save = (event: MouseEvent) => {}
const delete_controleRule = (event: MouseEvent) => {
  if(window.confirm("êtes-vous sûr d'avoir supprimé")){
      const controleId = event.currentTarget.id;
  axiosInstance.delete(`control-rules/${controleId}`)
      .then(() => {
          toast.success('Supprimé avec succès');
          window.location.reload()
      })
      .catch(() => {
          toast.error("n'a pas pu être supprimé.");
      })
  }
}
const cancel = (event: MouseEvent) => {}

  return (
    <div className="app">
      <div className="formCls">
          <Toaster />
          <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
              <span className="titleEntite">LISTE DES CONTRÔLES</span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="input-group search mb-3">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Indicateur ou méthode"
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
              <div className="controleAdd">
                <Link to="/addControles">
                  <button className="icnClsControle">
                    <i>
                      <AiOutlinePlusSquare />
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
                  <th>Active</th>
                  <th>#</th>
                  <th>Ind 1</th>
                  <th>Ind 2</th>
                  <th>Val Réf</th>
                  <th>Méthode</th>
                  <th>Type valeur</th>
                  <th>Val Max</th>
                  <th>Val Min</th>
                  <th>Actions</th>
                </tr>
              </thead> 
              {controleRules
                .map((controleRule) => {
                        return (
                            <tbody key={controleRule.id}>
                                <tr>
                                  <td>{currentEdit === controleRule.id ? <input type="text" className="changeIn"  value={controleRule.kpiBase?.status} />
                                   : 
                                   <button value={controleRule.kpiBase?.status } 
              onClick={(e: React.MouseEvent<HTMLElement>) => handlerCheckboxInactive(e)} 
            className={controleRule.kpiBase?.status==="Inactive" ? "omct" : "omctActive"}
             type="button" aria-label="add"
             >
              <span>{controleRule.kpiBase?.status==="Inactive" ? "Inactive" : "Active"}</span>
              <img src={controleRule.kpiBase?.status==="Inactive" ?"../assets/images/cercle.svg":"../assets/images/cercleActive.svg"} alt="ActiverInactive"/>
            </button> 

                                   }
                                   </td>
                                  <td>{currentEdit === controleRule.id ? <input type="text"  className="changeIn"  value={controleRule.id} /> : controleRule.id}</td>
                                  <td>{currentEdit === controleRule.id ? <input type="text"  className="changeIn" value={controleRule.kpiBase?.name}   /> : controleRule.kpiBase?.name}</td>
                                  <td>{currentEdit === controleRule.id ? <input type="text"  className="changeIn"  value={controleRule.kpiControl?.name} /> : controleRule.kpiControl?.name}</td>
                                  <td>
                                    {currentEdit === controleRule.id ? (
                                      <select
                                        id="valRef"
                                        className="changeIn"
                                        onChange={selectReferenceValue}
                                        defaultValue={controleRule.referenceValue[0]}
                                      >
                                        <option value="M">M</option>
                                        <option value="M_1">Sur la base du Budget</option>
                                        <option value="A_Ref">Année de référence</option>
                                        <option value="Fin_m">Fin M</option>
                                        <option value="Budget">Budget</option>
                                      </select>
                                    ) : (
                                      controleRule.referenceValue
                                    )}
                                  </td>

                                  <td>
                                    {currentEdit === controleRule.id ? (
                                      <select
                                        id="calculationMethod"
                                        className="changeIn"
                                        onChange={selectCalculationMethod}
                                        defaultValue={controleRule.calculationMethod[0]}
                                      >
                                        <option value="Variation">Variation</option>
                                        <option value="Difference">Différence</option>
                                        <option value="Ratio">Ratio</option>
                                      </select>
                                    ) : (
                                      controleRule.calculationMethod
                                    )}
                                  </td>
                                  <td>
                                    {currentEdit === controleRule.id ? (
                                      <select
                                        id="valType"
                                        className="changeIn"
                                        onChange={selectValType}
                                        defaultValue={controleRule.valueType[0]}
                                      >
                                        <option value="Alg">Alg</option>
                                        <option value="Pct">%</option>
                                      </select>
                                    ) : (
                                      controleRule.valueType
                                    )}
                                  </td>
                                  <td>{currentEdit === controleRule.id ? <input type="text"  className="changeIn"   value={maxValue} onChange={handleChangeMaxValue} /> : controleRule.maxValue}</td>
                                    <td>{currentEdit === controleRule.id ? <input type="text"  className="changeIn"   value={minValue} onChange={handleChangeMinValue} /> : controleRule.minValue}</td>                             
                                    <td>
                                        {currentEdit !== controleRule.id ?
                                          <Link to={{pathname:"updateControle",state:{id:controleRule?.id}}}>
                                            <button 
                                            id={controleRule.id.toString()} 
                                            onClick={edit} className="clsbg">
                                              <i>
                                                <img src="../assets/images/editIcon.svg" alt="#" />
                                              </i>
                                            </button>
                                          </Link>
                                            :
                                            <button id={controleRule.id.toString()} onClick={save} className="clsbgSave"><i><img src="../assets/images/save.svg" alt="#" /></i></button>
                                        }
                                        {currentEdit !== controleRule.id ?
                                            <button id={controleRule.id.toString()} onClick={delete_controleRule} className="clsbg"><i><img src="../assets/images/deleteIcon.svg" alt="#" /></i></button>
                                            :
                                            <button id={controleRule.id.toString()} onClick={cancel} className="clsbg"><i><img src="../assets/images/croix.svg" alt="#" /></i></button>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
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
            </div>
        </div>
      </div>
    );
  };
export default FormControleList;