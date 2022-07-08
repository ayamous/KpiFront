import { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { MouseEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../../../services/axiosConfig";

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
  name: string;
  reference: string;
  description: string;
  perdiodicity: string;
  EstimationMethod: string;
  productionPeriod: string;
  inductor: string;
  kpiGroup: string;
  dirId: string,
  reminder: string,
  status: string,
  documents: {
    contentType: string,
    dirId: string,
    extension: string,
    fsName: string,
    id: number,
    name: string,
    size: string,
    url: string
  },
  entite: string;
  category: ICategorie;
  systemSource: string;
  creationDate: string;
}
interface ICategorie {
  id: number;
  label: string;
  description: string;
}

interface IEntite {
  id: number;
  label: string;
  description: string;
}
const FormIndicateurList = () => {

  const [inductors, setInductors] = useState<IKPI[]>([]);
  { console.log("inductor.documents.dirId", inductors) }
  const [pagination, setPagination] = useState<IPageable>();
  const [pagesNumber, setPagesNumber] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const [creationDate, setCreationDate] = useState<string>("");
  const handleChangeCreationDate = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const [reference, setReference] = useState<string>("");
  const handleChangeReference = (e: ChangeEvent<HTMLInputElement>) => {
    setReference(e.currentTarget.value);
  };

  const [description, setDescription] = useState<string>("");
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.currentTarget.value);
  };

  

  const [isChangeable, setChangeable] = useState<boolean>(false);
  const [currentEdit, setcurrentEdit] = useState<number>();
  const [id, setID] = useState<number>();
  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);

  const [categorie, setCategorie] = useState<ICategorie>();
  const handleChangeCategorie = (e: ChangeEvent<HTMLInputElement>) => {
    setCategorie(categorie);
  };

  const kpi = {
    id: id,
    name: name,
    reference: reference,
    description: description,
    categorie: categorie?.id,
    creationDate
  }

  useEffect(() => {
    axiosInstance.get("/entites").then((res) => {
      const data: IEntite[] = res.data.content;
      let entitescopy = [...entites];
      data.forEach((element) => {
        entitescopy.push(element);
      });
      setEntites(entitescopy);
    });
  }, []);

  const [entites, setEntites] = useState<IEntite[]>([]);
  const [entite, setEntite] = useState<IEntite>();
  const handleChangeEntite = (e: ChangeEvent<HTMLSelectElement>) => {
    const entityid = e.target.value;
    let entite = entites.find((item) => {
      if (item.id == Number(entityid)) return true;
    }, entites);
    setEntite(entite);
    setParamEntiteId(entityid)
  };


  let history = useHistory();
  const save = (event: MouseEvent) => {
    const kpiId = event.currentTarget.id;
    axiosInstance.put(`kpis/${kpiId}`, kpi)
      .then((res) => {
        setChangeable(false)
        toast.success('les données ont été modifiées avec succès');
        history.push("/indicateurs");
        window.location.reload()
      })
      .catch((res) => {
        setChangeable(false)
        toast.error('Erreur! mis à jour sans succès');
      })
  }

  const delete_inductor = (event: MouseEvent) => {
    if (window.confirm("êtes-vous sûr d'avoir supprimé")) {
      const kpiId = event.currentTarget.id;
      axiosInstance.delete(`kpis/${kpiId}`)
        .then(() => {
          toast.success('Supprimé avec succès');
          history.push("/indicateurs");
          window.location.reload()
        })
        .catch(() => {
          toast.error("n'a pas pu être supprimé.");
        })
    }
  }
  const detail_inductor = (event: MouseEvent) => {
    //console.log("cancel")
    setcurrentEdit(0);
    history.push("/indicateurs");
  }

  const download_inductor = (event: MouseEvent, folderId: string) => {
    axiosInstance({
      url: `download/zip/${folderId}`, //your url
      method: 'GET',
      responseType: 'blob',
      //responseType: 'arraybuffer', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${folderId}.zip`); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  const [paramStatus, setParamStatus] = useState<string>("");
  const [paramEntiteId, setParamEntiteId] = useState<string>("");
  const [paramReminder, setParamReminder] = useState<string>("");
  const [paramYear, setParamYear] = useState<string>("");


  const [paramCategoryId, setParamCategoryId] = useState<string>("");
  const [paramFilterBy, setParamFilterBy] = useState<string>("");
  const [paramKpiRefSortOrder, setParamKpiRefSortOrder] = useState<string>("");
  const [paramNameFilter, setNameFilter] = useState<string>("");

  const handlChangeParamStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.currentTarget.value;
    setParamStatus(status);
  };

  const handlChangeParamReminder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const reminder = event.currentTarget.value;
    setParamReminder(reminder);
  };

  const [paramRefSortOrder, setParamRefSortOrder] = useState<string>("DESC");
  //console.log("sort", paramRefSortOrder)
  const handelSort = (event: MouseEvent) => {
    if (paramRefSortOrder == "DESC") {
      setParamRefSortOrder("ASC")
    } else {
      setParamRefSortOrder("DESC")
    }
  };

  const [nameSortOrder, setNameSortOrder] = useState<string>("DESC");
  //console.log("sortName!!!",nameSortOrder)
  const handelSortName = (event: MouseEvent) => {
    if (nameSortOrder == "DESC") {
      setNameSortOrder("ASC")
    } else {
      setNameSortOrder("DESC")
    }
  };

  useEffect(() => {
    console.log("nameSortOrder", nameSortOrder)
  }, [nameSortOrder]);

  useEffect(() => {
    axiosInstance.get('/kpis?page=' + page + '&entiteId.equals=' + paramEntiteId + '&status.equals=' + paramStatus + '&reminder.equals=' + paramReminder
      + '&year=' + paramYear + '&refSortOrder=' + paramRefSortOrder + '&nameSortOrder=' + nameSortOrder + '&categoryId.equals=' + paramCategoryId +
      '&filterBy=' + paramFilterBy + '&kpiRefSortOrder=' + paramKpiRefSortOrder + '&name.contains=' + paramNameFilter)
      .then((res) => {
        const { content, pageable, sort, ...pagination } = res.data;
        setInductors(content)
        setPagination(pagination)
        const n = Array(pagination.totalPages).fill(1)
        setPagesNumber(n)
      })
  }, [page, paramEntiteId, paramStatus, paramReminder, paramRefSortOrder, nameSortOrder]);

  return (
    <div className="app">
      <div className="formCls">
        <Toaster />
        <div className="d-flex justify-content-between contenuBtn">
          <div className="form-field">
            <span className="titleEntite">RÉFÉRENTIEL</span>
          </div>
          <div className="imgCls d-flex justify-content-between">
            <div className="input-group search mb-3">
              <input type="text" className="form-control input-text withSearch" placeholder="Nom ou catégorie ou responsable"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {isCrescent ? (
                <div className="input-group-append">
                  <button className="btn btn-lg btnSearchIcn" type="button" onClick={() => setIsCrescent(false)}>
                    <i>
                      <AiOutlineSearch />
                    </i>
                  </button>
                </div>
              ) : (
                <div className="input-group-append">
                  <button className="btn btn-lg btnSearchIcn" type="button" onClick={() => setIsCrescent(true)}>
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
          <div className="form-field thrBtnFilter3 d-flex">
            <div className="form-group">
              <label htmlFor="Entité" className="labFilter">Entité</label>
              <br />
              <select
                id="entité"
                className="fselectCls"
                onChange={handleChangeEntite}
              >
                <option value="" selected>
                  Entité
                </option>
                {entites.map((entite) => (
                  <option value={entite.id} key={entite.id}>
                    {entite.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="État" className="labFilter">État</label>
              <br />
              <select id="entite" className="fselectCls" onChange={handlChangeParamStatus}>
                <option value="" selected>
                  État
                </option>
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <div className="form-group ">
              <label htmlFor="entRappelsité" className="labFilter">Rappels</label>
              <br />
              <select id="entite" className="fselectCls" onChange={handlChangeParamReminder}>
                <option value="" selected>
                  Rappels
                </option>
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>
          <div className="imgCls d-flex justify-content-between">
            <div className="indicateurAdd">
              <Link to="/addIndicateurs">
                <button className="icnClsIndicateur">
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
                <th>Référence Indicateur
                  <img src="../assets/images/trie.svg" alt="trie" onClick={handelSort} className="sortImg" /></th>
                <th>Nom Indicateur
                  <img src="../assets/images/trie.svg" alt="trie" onClick={handelSortName} className="sortImg2" />
                </th>
                <th>Catégorie</th>
                <th>Description</th>
                <th>État De KPI</th>
                <th>Rappels</th>
                <th>Date modification</th>
                <th>Actions</th>
              </tr>
            </thead>
            {inductors.map((inductor) => {
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
                    <td>
                      {currentEdit === inductor?.id ? (<input type="text" className="changeIn" value={inductor.category.label} onChange={handleChangeCategorie} />) : (inductor.category.label)}
                    </td>
                    <td>
                      {currentEdit === inductor?.id ? (<input type="text" className="changeIn" value={description} onChange={handleChangeDescription} />) : (inductor.description)}
                    </td>

                    <td>
                      {currentEdit === inductor?.id ? (<input type="text" className="changeIn" value={inductor.status} />) : (inductor.status)}
                    </td>
                    <td>
                      {currentEdit === inductor?.id ? (<input type="text" className="changeIn" value={inductor.reminder} />) : (inductor.reminder)}
                    </td>
                    <td>{currentEdit === inductor?.id ? (<input
                      type="text" className="changeIn" value={creationDate} onChange={handleChangeReference} />) : (inductor.creationDate)}
                    </td>
                    <td>
                      {currentEdit !== inductor.id ? (
                        <button
                          id={inductor.id.toString()}
                          onClick={(e) => download_inductor(e, inductor.dirId)}
                          className="clsbgR"
                        >
                          <i>
                            <img
                              src="../assets/images/GroupDownload.svg"
                              alt="download"
                            />
                          </i>
                        </button>
                      ) : (
                        null
                      )}
                      {currentEdit !== inductor.id ? (
                        <Link to={{ pathname: "update", state: { id: inductor?.id } }}>
                          <button
                            id={inductor.id.toString()}
                            className="clsbgU"
                          >
                            <i>
                              <img
                                src="../assets/images/editIcon.svg"
                                alt="editIcon"
                              />
                            </i>
                          </button>
                        </Link>
                      ) : (
                        null
                      )}
                      {currentEdit !== inductor.id ? (
                        <Link to={{ pathname: "details", state: { id: inductor?.id } }}>
                          <button
                            id={inductor.id.toString()}
                            className="clsbgd"
                          >
                            <i>
                              <img
                                src="../assets/images/GroupFleshR.svg"
                                alt="detailIcon"
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
        </div>
      </div>
    </div>
  );
};
export default FormIndicateurList;
