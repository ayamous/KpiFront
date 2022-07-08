import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {AiOutlinePlusSquare} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import toast, { Toaster } from 'react-hot-toast';
import { ICategorie } from "../../Interfaces/ICategorie";
import { IPageable } from "../../Interfaces/IPageable";

const FormCategorieList = () => {

    const [categories, setCategories] = useState<ICategorie[]>([]);
    const[label, setLabel]=useState<string>();
    const[description, setDescription]=useState<string>();
    const [isChangeable, setChangeable] = useState<boolean>(false);
    const [currentEdit, setcurrentEdit] = useState<number>();
    const[id, setID]=useState<number>();
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

    const[paramLibeleSortOrder,setParamLIbeleSortOrder]=useState<string>("DESC");
  //console.log("sort", paramRefSortOrder)
  const handelSort = (event: MouseEvent) => {
    if(paramLibeleSortOrder == "DESC"){
      setParamLIbeleSortOrder("ASC")
    }else{
      setParamLIbeleSortOrder("DESC")
    }
  };

    const categorie={
        id:id,
        label:label,
        description:description
      }

    const edit = (event: MouseEvent) => {
        const categorieId = event.currentTarget.id;
        let index = 0
        while (index < categories.length) {
            if (categories[index].id ===  Number(categorieId)) {
                break;
            }
            index++;
        }
        setLabel(categories[index].label);
        setDescription(categories[index].description)
        setcurrentEdit(categories[index].id);
        setID(categories[index].id);
    };

    let history = useHistory();
    const save = (event: MouseEvent) => {
        const categorieId = event.currentTarget.id;
        axiosInstance.put(`categories/${categorieId}`, categorie)
            .then((res) => {
                setChangeable(false)
                toast.success('les données ont été modifiées avec succès');
                history.push("/categorie");
                window.location.reload()
            })
            .catch((res) => {
                setChangeable(false)
                toast.error('Erreur! mis à jour sans succès');
            })
    }
    
    const delete_categorie = (event: MouseEvent) => {
        if(window.confirm("êtes-vous sûr d'avoir supprimé")){
            const categorieId = event.currentTarget.id;
        axiosInstance.delete(`categories/${categorieId}`)
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
        //console.log("cancel")
        setcurrentEdit(0);
        history.push("/categorie");
    }

    useEffect(() => {//http://localhost:8090/business/api/categories?page=0&size=3&sortDir=DESC  
        axiosInstance.get('/categories?page='+page+'&sortDir='+paramLibeleSortOrder)
            .then((res) => {
                const {content,pageable,sort,...pagination} =res.data;
                
                setCategories(content)
                setPagination(pagination)
                const n = Array(pagination.totalPages).fill(1)
                setPagesNumber(n)
                console.log("n",n)
            })
    }, [page,paramLibeleSortOrder]);
    return (
      <div className="app">
      <div className="formCls">
        <Toaster/>
        <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
              <span className="titleEntite">LISTE DES CATÉGORIES</span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="input-group search mb-3">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Catégorie"
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
              <div className="categorieAdd">
                <Link to="/addCategorie">
                  <button className="icnClsCat">
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
                        <th>libellé
                        <img src="../assets/images/trie.svg" alt="trie" onClick={handelSort} className="sortImgCat"/>
                        </th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {categories
                .filter((nameLabel) =>
                nameLabel.label
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
              ).map((categorie) => {
                        return (
                            <tbody key={categorie.id}>
                                <tr>
                                    <td>{currentEdit === categorie.id ? <input type="text" className="changeIn" value={label} onChange={handleChangeLabel} /> : categorie.label}</td>
                                    <td>{currentEdit === categorie.id ? <input type="text"  className="changeIn" value={description} onChange={handleChangeDescription} /> : categorie.description}</td>
                                    <td>
                                        {currentEdit !== categorie.id ?
                                            <button id={categorie.id.toString()} onClick={edit} className="clsbg"><i><img src="../assets/images/editIcon.svg" alt="#" /></i></button>
                                            :
                                            <button id={categorie.id.toString()} onClick={save} className="clsbgSave"><i><img src="../assets/images/save.svg" alt="#" /></i></button>
                                        }
                                        {currentEdit !== categorie.id ?
                                            <button id={categorie.id.toString()} onClick={delete_categorie} className="clsbg"><i><img src="../assets/images/deleteIcon.svg" alt="#" /></i></button>
                                            :
                                            <button id={categorie.id.toString()} onClick={cancel} className="clsbg"><i><img src="../assets/images/croix.svg" alt="#" /></i></button>
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
  export default FormCategorieList;