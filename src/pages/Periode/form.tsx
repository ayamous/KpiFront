import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../services/axiosConfig";



interface IGroupeIndicateur {
  id: number;
  label: string;
  kpis: [
    {
      id: number;
      name: string;
      reference: string;
      description: string;
      perdiodicity: string;
      EstimationMethod: string;
      productionPeriod: string;
      entite: {
        id: number;
        label: string;
        description: string;
        reference: null;
      };
      category: {
        id: number;
        label: string;
        description: string;
      };
      systemSource: {
        id: number;
        label: string;
        description: string;
      };
      kpiGroup: null;
      documents: [
        {
          id: number;
          fileName: string;
          fileUrl: string;
          folderId: string;
          message: string;
        }
      ];
      inductor: {
        id: string;
        name: string;
        reference: string;
        description: string;
        perdiodicity: string;
        EstimationMethod: string;
        productionPeriod: string;
        inductor: string;
        kpiGroup: null;
        entite: null;
        category: null;
        systemSource: null;
        documents: [
          {
            id: string;
            fileName: string;
            fileUrl: string;
            folderId: string;
            message: string;
          }
        ];
      };
    }
  ];
}
interface IKPI {
  id: number;
  name: string;
  reference: string;
  description: string;
  perdiodicity: string;
  EstimationMethod: string;
  productionPeriod: string;
  inductor: string;
  kpiGroup: string;
  entite: string;
  category: {
    id: number;
    label: string;
    description: string;
  };
  systemSource: string;
}
interface ICategorie {
  id: number;
  label: string;
  description: string;
}

interface IKPI {
  id: number;
  name: string;
  reference: string;
  description: string;
  perdiodicity: string;
  EstimationMethod: string;
  productionPeriod: string;
  inductor: string;
  kpiGroup: string;
  entite: string;
  category: ICategorie;
  systemSource: string;
}
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

const FormPeriodeListN = () => {

  const [grpIndicateurs, setGrpIndicateurs] = useState<IGroupeIndicateur[]>([]);
  const[kpiAll, setkpiAll] = useState<IKPI[]>([]);

  const [isChangeable, setChangeable] = useState<boolean>(false);
  const [currentEdit, setcurrentEdit] = useState<number>();
  const [id, setID] = useState<number>();
  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);

  const [inductors, setInductors] = useState<IKPI[]>([]);
  const [inductor, setInductor] = useState<IKPI>();
  const[kpiSelected,setkpiSelected] = useState<IKPI>();

  const[labelPayload, setLabelPayload]=useState<string>();
  const[label, setLabel]=useState<string>();
  const [isLoading, setLoading] = useState<Boolean>(false);
  const[pagination, setPagination] = useState<IPageable>();
  const[pagesNumber, setPagesNumber] = useState<number[]>([]);
  const[page, setPage] = useState<number>(0);
 //kpi-groups/7502
 
 const[groupIndicteurSelected,setGroupIndicteurSelected]=useState<IGroupeIndicateur[]>([]);
  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>)=>{
    const labelSelected =e.currentTarget.value;
    setLabel(labelSelected);
    setLabelPayload(labelSelected);
}

const [currentactif, setcurrentActif] = useState<number | null>(null);
    const onchangeActif = (index: number) => {
      if (index == currentactif) {
        setcurrentActif(null);
        setShow(false);
      } else {
        setcurrentActif(index);
        setShow(false);
      }
    };
    const animate = (index: number) => {
      if (index == currentactif) {
        return "divLiParentLi actif";
      } else {
        return "divLiParentLi";
      }
    };

    const [show, setShow] = useState(false);
  const secondAnimate = (index: number) => {
    if (index == currentactif && show) {
      return "divLiParentLi2 actif";
    } else {
      return "divLiParentLi2";
    }
  };
  
  const handleChangeKpi = (e: ChangeEvent<HTMLSelectElement>) => {
    const kpiId = e.target.value;
    let kpi = inductors.find((item) => {
      if (item.id == Number(kpiId)) return true;
    }, inductors);
    setInductor(kpi);
    setkpiSelected(kpi);
  };
const groupeIndicateur={
  id:id,
  label:label
}

  useEffect(() => {
    axiosInstance.get('/kpi-groups?page='+page).then((res) => {
      const {content,pageable,sort,...pagination} =res.data;
      setGrpIndicateurs(content);
      setPagination(pagination)
      const n = Array(pagination.totalPages).fill(1)
      setPagesNumber(n)
    })
}, [page]);

  useEffect(() => {
    axiosInstance.get("/kpis" ).then((res) => {
      const data: IKPI[] = res.data.content;
      let kpiAllcopy = [...kpiAll];
      data.forEach((element) => {
        kpiAllcopy.push(element);
      });
      setkpiAll(kpiAllcopy);
    });
  }, []);
  
  const edit = (event: MouseEvent) => {
    const  grpIndicateursId = event.currentTarget.id;
    let index = 0
    while (index < grpIndicateurs.length) {
        if (grpIndicateurs[index].id === Number(grpIndicateursId)) {
            break;
        }
        index++;
    }
    setLabel(grpIndicateurs[index].label);
    setcurrentEdit(grpIndicateurs[index].id);
    setID(grpIndicateurs[index].id);
};

const cancelkpi = (event: MouseEvent) => {
  setShow(false)
  setcurrentEdit(0);
  history.push("/groupeIndicateur");
};

let history = useHistory();
    const save = (event: MouseEvent) => {
        const grpIndicateursId = event.currentTarget.id;
        axiosInstance.patch(`kpi-groups/${grpIndicateursId}`, groupeIndicateur)
            .then((res) => {
                setChangeable(false)
                toast.success('les données ont été modifiées avec succès');
                history.push("/groupeIndicateur");
                axiosInstance.get("/kpi-groups").then((res) => {
                  setGrpIndicateurs(res.data.content);
                });
            })
            .catch((res) => {
                setChangeable(false)
                toast.error('Erreur! mis à jour sans succès');
            })
    }
    const [refresh,setRefresh] = useState(false);
    const delete_groupeIndicateur = (event: MouseEvent) => {
        if(window.confirm("êtes-vous sûr d'avoir supprimé")){
            const grpIndicateursId = event.currentTarget.id;
            axiosInstance.delete(`kpi-groups/${grpIndicateursId}`)
                .then(() => {
                  
                    toast.success('Supprimé avec succès');                   
                    history.push("/groupeIndicateur");
                   axiosInstance.get("/kpi-groups").then((res) => {
                    setGrpIndicateurs(res.data.content);
                  });
                })
                .catch(() => {
                    toast.error("n'a pas pu être supprimé.");
                })
        }      
    }

    

    const delete_kpi = (event: MouseEvent, id :any, kpiAllId:number) => {
        if(window.confirm("êtes-vous sûr d'avoir supprimé")){  //kpi-groups/9152/kpis/9052
            axiosInstance.delete(`kpi-groups/${id}/kpis/${kpiAllId}`)
                .then(() => {
                    toast.success('Supprimé avec succès');
                    history.push("/groupeIndicateur");
                    axiosInstance.get("/kpi-groups").then((res) => {
                      setGrpIndicateurs(res.data.content);
                    });
                })
                .catch(() => {
                    toast.error("n'a pas pu être supprimé.");
                })
        } 
    }

    const cancel = (event: MouseEvent) => {
        setcurrentEdit(0);
        history.push("/groupeIndicateur");
    }
  
  useEffect(() => {
    axiosInstance.get("/kpis?filterBy=notMapped").then((res) => {
      const data: IKPI[] = res.data.content;
      let kpisCopy = [...inductors];
      data.forEach((element) => {
        kpisCopy.push(element);
      });
      setInductors(kpisCopy);
    });
  }, []);

 
 
 const savekpi = (event: MouseEvent, item:any) => {
  const grpIndicateursId = event.currentTarget.id;
   event.preventDefault();
   setLoading(true);
  //console.log("groupIndicteurSelectedAPI selected:item",item)
 const payload = {
  id:item.id,
  label:item.label,
  kpis:[...item.kpis, kpiSelected]
}
   axiosInstance.put(`kpi-groups/${grpIndicateursId}`,payload)
     .then((res) => {
       setLoading(false);
       toast.success("les données ont été enregistrées avec succès");
       history.push("/groupeIndicateur");
       axiosInstance.get("/kpi-groups").then((res) => {
        setGrpIndicateurs(res.data.content);
      });
     })
     .catch((err) => {
       setLoading(false);
       toast.error("Erreur! données non enregistrées");
     });
 };

  return (
    <div className="app">
      <div className="formCls">
        <Toaster/>
        <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
              <span className="titleEntite">LISTE DES GROUPES DES INDICATEURS</span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="input-group search mb-3">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Groupe ou indicateur"
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
              <div className="grpIndicateurAdd">
                <Link to="/addGroupeIndicateur">
                  <button className="icnClsGrpndicaeur">
                    <i>
                      <AiOutlinePlusSquare />
                    </i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        <div className="formlist">
        {grpIndicateurs.map((item, index) => (
            <>
              <ul>
                <li key={item.id}>
                  <div className="formlist">
                    <div className="d-flex justify-content-between divPParent">
                      <div className="d-flex justify-content-between divTitle">
                      {currentEdit === item.id  ? <input type="text" className="titleSpanOne" value={label} onChange={handleChangeLabel} /> : item.label}
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="titleSpan">{item.kpis.length} indicateurs </span>

                        {currentEdit !== item.id ?
                            <button id={item.id.toString()} onClick={delete_groupeIndicateur} className="clsbgL"><i><img src="../assets/images/deleteIcon.svg" alt="deleteIcon" /></i></button>
                            :
                            <button id={item.id.toString()} onClick={cancel} className="clsbgL"><i><img src="../assets/images/croix.svg" alt="croix" /></i></button>
                        }
                        {currentEdit !== item.id ?
                            <button id={item.id.toString()} onClick={edit} className="clsbgL"><i><img src="../assets/images/editIcon.svg" alt="editIcon" /></i></button>
                                :
                            <button id={item.id.toString()} onClick={save} className="clsbgSaveL"><i><img src="../assets/images/save.svg" alt="save" /></i></button>
                        }
                        <button
                          className="btnIcons"
                          onClick={() => onchangeActif(index)}
                        >
                          <img  src= {index == currentactif && !show ?"./assets/images/fleshHaut.svg":"./assets/images/fleshbas.svg"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {item.kpis.map(itemChild=>{
                return (
                  <div className="divLiParent ">
                      <ul className={animate(index)}>
                        <li>
                          <div className="d-flex justify-content-between">
                            <span className="titleSpanList">{item.kpis.length>0? itemChild.name: null}</span>
                            <span className="titleSpanList">
                              {item.kpis.length>0? itemChild.reference: null}
                            </span>
                            <span className="titleSpanList">
                              {item.kpis.length>0? itemChild.category.label: null}
                            </span>
                            <button className="btnIcons">
                            {currentEdit !== item.id ?
                                  <button id={item.id.toString()} onClick={(e)=>delete_kpi(e, item.id, itemChild.id)}  className="clsbgL"><i><img src="../assets/images/deleteIcon.svg" alt="deleteIcon" /></i></button>
                                  :
                                  <button id={item.id.toString()} onClick={cancel} className="clsbgL"><i><img src="../assets/images/croix.svg" alt="croix" /></i></button>
                              }                     
                            </button>
                          </div>
                        </li>                       
                      </ul>
                  </div> 
                )
              })}


<div className={animate(index)}>
                <div className={secondAnimate(index)}>
                <div className="divLiParent ">
                    <ul className={animate(index)}>
                      <li>
                        <div className="d-flex justify-content-between">
                          <span className="titleSpanList spnAdd">
                          <select
                      id="inductor"
                      className="fselect-group fselectAdd"
                      onChange={handleChangeKpi}
                    >
                      <option value="DEFAULT" disabled selected>
                        Liste des KPI
                      </option>
                     {inductors.map((kpi) => (
                        <option value={kpi.id} key={kpi.id}>
                          {kpi.name}
                        </option>
                    ))}
                    </select>
                          </span>                         
                          <button id={item.id.toString()} onClick={cancelkpi} className="clsbgAdd"><i><img src="../assets/images/GroupDelete.svg" alt="editIcon" /></i></button>
                          <button id={item.id.toString()} onClick={(event)=>savekpi(event,item)} className="clsbgSaveAdd"><i><img src="../assets/images/GroupSave.svg" alt="save" /></i></button>
                        </div>
                      </li>
                    </ul>
                  </div> 
                </div>
                <div className="mb-5">
                  <button onClick={() => setShow(true)} className="btnAdd">+Ajouter KPI</button>
                </div>
              </div>              
            </>
          ))}
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
export default FormPeriodeListN;
