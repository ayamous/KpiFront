import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {AiOutlinePlusSquare} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai";
import { NavLink, useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from "../../../services/axiosConfig";
import { IPageable } from "../../Interfaces/IPageable";
import { IEntite } from "../../Interfaces/IEntite";


const FormEntiteList = () => {
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

    const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>)=>{
        setLabel(e.currentTarget.value);
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

    const edit = (event: MouseEvent) => {
        const  entiteId = event.currentTarget.id;
        //console.log("edit", event.currentTarget.id)
        let index = 0
        while (index < entites.length) {
            if (entites[index].id === Number(entiteId)) {
                break;
            }
            index++;
        }
        setLabel(entites[index].label);
        setDescription(entites[index].description);
        setcurrentEdit(entites[index].id);
        setID(entites[index].id);
    };

    let history = useHistory();
    const save = (event: MouseEvent) => {
        const entiteId = event.currentTarget.id;
        axiosInstance.put(`entites/${entiteId}`, entite)
            .then((res) => {
                setChangeable(false)
                toast.success('les données ont été modifiées avec succès');
                history.push("/entites");
                window.location.reload()
            })
            .catch((res) => {
                setChangeable(false)
                toast.error('Erreur! mis à jour sans succès');
            })
    }

    const delete_entite = (event: MouseEvent) => {
        if(window.confirm("êtes-vous sûr d'avoir supprimé")){
            const entiteId = event.currentTarget.id;
            axiosInstance.delete(`entites/${entiteId}`)
                .then(() => {
                    toast.success('Supprimé avec succès');
                    window.location.reload()
                })
                .catch(() => {
                    toast.error("n'a pas pu être supprimé.");
                })
        }
       
    }

    const cancel = (event: MouseEvent) => {
        setcurrentEdit(0);
        history.push("/entites");
    }

    return (
      <div className="app">
        <div className="formCls">
          <Toaster/>
          <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
              <span className="titleEntite">LISTE DES ENTITÉS</span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="input-group search mb-3">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Entité"
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
              <div className="entiteAdd">
                
                <NavLink  to="/addEntite" activeClassName="active" >
                  <button className="icnClsEntite">
                    <i>
                      <AiOutlinePlusSquare />
                    </i>
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="formlist">
            <table>
                <thead>
                    <tr>
                        <th>libellé</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {entites
                .filter((labelName) =>
                labelName.label
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              ).map((entite) => {
                        return (
                            <tbody key={entite.id}>
                                <tr>
                                    <td>{currentEdit === entite.id  ? <input type="text" className="changeIn" value={label} onChange={handleChangeLabel} /> : entite.label}</td>
                                    <td>{currentEdit === entite.id ? <input type="text"  className="changeIn" value={description} onChange={handleChangeDescription} /> : entite.description}</td>
                                    <td>
                                        {currentEdit !== entite.id ?
                                            <button id={entite.id.toString()} onClick={edit} className="clsbgU"><i><img src="../assets/images/editIcon.svg" alt="editIcon" /></i></button>
                                            :
                                            <button id={entite.id.toString()} onClick={save} className="clsbgSave"><i><img src="../assets/images/save.svg" alt="save" /></i></button>
                                        }
                                        {currentEdit !== entite.id ?
                                            <button id={entite.id.toString()} onClick={delete_entite} className="clsbg"><i><img src="../assets/images/deleteIcon.svg" alt="deleteIcon" /></i></button>
                                            :
                                            <button id={entite.id.toString()} onClick={cancel} className="clsbg"><i><img src="../assets/images/croix.svg" alt="croix" /></i></button>
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
  export default FormEntiteList;