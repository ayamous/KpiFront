import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {AiOutlinePlusSquare} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import toast, { Toaster } from 'react-hot-toast';
import { IPageable } from "../../Interfaces/IPageable";
import { ISysSource } from "../../Interfaces/ISysSource";

const FormSystemSource = () => {
  const[pagination, setPagination] = useState<IPageable>();
  const[pagesNumber, setPagesNumber] = useState<number[]>([]);
  const[page, setPage] = useState<number>(0);
  const [sysSources, setSysSources] = useState<ISysSource[]>([]);
  const[label, setLabel]=useState<string>();
  const[description, setDescription]=useState<string>();
  const [isChangeable, setChangeable] = useState<boolean>(false);
  const [currentEdit, setcurrentEdit] = useState<number>();
  const[id, setID]=useState<number>();
  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);

    const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>)=>{
        setLabel(e.currentTarget.value);
    }

    const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>)=>{
        setDescription(e.currentTarget.value);
    }

    const sysSource={
        id:id,
        label:label,
        description:description
      }

    useEffect(() => {
       axiosInstance.get('/system-sources?page='+page)
           .then((res) => {
            const {content,pageable,sort,...pagination} =res.data;
            console.log("system sources ::",res.data)

            setSysSources(content)
           setPagination(pagination)
           const n = Array(pagination.totalPages).fill(1)
           setPagesNumber(n)
           })
   }, [page]);

    const edit = (event: MouseEvent) => {
        const sysSourceId = event.currentTarget.id;
        let index = 0
        while (index < sysSources.length) {
            if (sysSources[index].id === Number(sysSourceId)) {
                break;
            }
            index++;
        }
        setLabel(sysSources[index].label);
        setDescription(sysSources[index].description);
        setID(sysSources[index].id);
        setcurrentEdit(sysSources[index].id);
    };

    let history = useHistory();
    const save = (event: MouseEvent) => {
        const sysSourceId = event.currentTarget.id;
        axiosInstance.put(`system-sources/${sysSourceId}`, sysSource)
            .then((res) => {
                setChangeable(false)
                toast.success('les données ont été modifiées avec succès');
                history.push("/systemSource");
                window.location.reload()
            })
            .catch((res) => {
                setChangeable(false)
                toast.error('Erreur! mis à jour sans succès');

            })
    }

    const delete_sysSource = (event: MouseEvent) => {
        if(window.confirm("êtes-vous sûr d'avoir supprimé")){
            const sysSourceId = event.currentTarget.id;
        axiosInstance.delete(`system-sources/${sysSourceId}`)
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
        history.push("/systemSource");
    }
    useEffect(() => {
      console.log("system sources!!")
    }, []);
    return (
      <div className="app">
      <div className="formCls">
        <Toaster />
        <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
              <span className="titleEntite">LISTE DES SYSTÈMES SOURCE</span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="input-group search mb-3">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Système source"
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
              <div className="systemAdd">
                <Link to="/addSystemSource">
                  <button className="icnClsSys">
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
                        <th>libellé</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {sysSources
                .filter((nameLabel) =>
                nameLabel.label
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              ).map((sysSource) => {
                        return (
                            <tbody key={sysSource.id}>
                                <tr>
                                    <td>{ currentEdit === sysSource.id ? <input type="text" className="changeIn" value={label} onChange={handleChangeLabel} /> : sysSource.label}</td>
                                    <td>{currentEdit === sysSource.id? <input type="text"  className="changeIn" value={description} onChange={handleChangeDescription} /> : sysSource.description}</td>
                                    <td>
                                        {currentEdit !== sysSource.id?
                                            <button id={sysSource.id.toString()} onClick={edit} className="clsbg"><i><img src="../assets/images/editIcon.svg" alt="#" /></i></button>
                                            :
                                            <button id={sysSource.id.toString()} onClick={save} className="clsbgSave"><i><img src="../assets/images/save.svg" alt="#" /></i></button>
                                        }
                                        { currentEdit !== sysSource.id?
                                            <button id={sysSource.id.toString()} onClick={delete_sysSource} className="clsbg"><i><img src="../assets/images/deleteIcon.svg" alt="#" /></i></button>
                                            :
                                            <button id={sysSource.id.toString()} onClick={cancel} className="clsbg"><i><img src="../assets/images/croix.svg" alt="#" /></i></button>
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
  export default FormSystemSource;