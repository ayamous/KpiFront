import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import axiosInstanceUser from "../../../services/axiosUserConfig";


interface IGroupeIndicateur {
  id: number;
  label: string;
  users: [
    {
      id: string;
      createdTimestamp: number;
      username: string;
      enabled: boolean;
      emailVerified: boolean;
      firstName: string;
      lastName: string;
      email: string;
      profile: string;
    }
  ];
}
interface IUser {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
}
const FormGestionAffectationList = () => {

  const [grpIndicateurs, setGrpIndicateurs] = useState<IGroupeIndicateur[]>([]);
  const [isChangeable, setChangeable] = useState<boolean>(false);
  const [currentEdit, setcurrentEdit] = useState<number>();
  const [id, setID] = useState<number>();
  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);

  const [label, setLabel] = useState<string>();
  const [currentactif, setcurrentActif] = useState<number | null>(null);
  const [isLoading, setLoading] = useState<Boolean>(false);


  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser>();
  const[userSelected,setUserSelected] = useState<String>();
  const handleChangeUser = (e: ChangeEvent<HTMLSelectElement>) => {
    const userId = e.target.value;
    let user = users.find((item) => {
      if (item.id == userId) return true;
    }, users);
    setUser(user);
    setUserSelected(user?.id);
  };

  useEffect(() => {
    axiosInstanceUser.get("/users").then((res) => {
      const data: IUser[] = res.data.users;
      console.log('users list', res.data.users)
      let usersCopy = [...users];
      data.forEach((element) => {
        usersCopy.push(element);
      });
      setUsers(usersCopy);
    });
  }, []);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.currentTarget.value);
  };
  useEffect(() => {
    axiosInstance.get("/kpi-groups/assignments").then((res) => {
      setGrpIndicateurs(res.data);
    });
  }, []);
  const edit = (event: MouseEvent) => {
    const grpIndicateursId = event.currentTarget.id;
    let index = 0;
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

  const cancelUser = (event: MouseEvent) => {
    setShow(false)
    history.push("/gestionsAfetions");
  };

  const groupeIndicateur = {
    id: id,
    label: label,
  };

  let history = useHistory();
  const save = (event: MouseEvent) => {
    const grpIndicateursId = event.currentTarget.id;
    axiosInstance
      .patch(`assignments/${grpIndicateursId}`, groupeIndicateur)
      .then((res) => {
        setChangeable(false)
        toast.success("les données ont été modifiées avec succès");
        history.push("/gestionsAfetions");
        axiosInstance.get("/kpi-groups/assignments").then((res) => {
          setGrpIndicateurs(res.data);
        });
      })
      .catch((res) => {
        setChangeable(false);
        toast.error("Erreur! mis à jour sans succès");
      });
  };

  const saveUser = (event: MouseEvent, item:any) => {
    const grpIndicateursId = event.currentTarget.id;
     event.preventDefault();
     setLoading(true);
    console.log("groupIndicteurSelectedAPI selected:item userSelected",userSelected)
   const payload = [userSelected];
  
     axiosInstance.put(`kpi-groups/${grpIndicateursId}/assignments`,payload)
       .then((res) => {
         setLoading(false);
         toast.success("les données ont été enregistrées avec succès");
         history.push("/gestionsAfetions");
         axiosInstance.get("/kpi-groups/assignments").then((res) => {
          setGrpIndicateurs(res.data);
        });
       })
       .catch((err) => {
         setLoading(false);
         toast.error("Erreur! données non enregistrées");
       });
   };

  const delete_groupeIndicateur = (event: MouseEvent) => {
    if (window.confirm("êtes-vous sûr d'avoir supprimé")) {
      const grpIndicateursId = event.currentTarget.id;
      axiosInstance
        .delete(`assignments/${grpIndicateursId}`)
        .then(() => {
          toast.success("Supprimé avec succès");
          history.push("/gestionsAfetions");
          axiosInstance.get("/kpi-groups/assignments").then((res) => {
            setGrpIndicateurs(res.data);
          });
        })
        .catch(() => {
          toast.error("n'a pas pu être supprimé.");
        });
    }
  };

  const delete_user = (event: MouseEvent, kpiGroupId: any, userId: string) => {
    if (window.confirm("êtes-vous sûr d'avoir supprimé")) {
      //assignments/kpi-groups/{kpiGroupId}/users/{userId}
      axiosInstance
        .delete(`assignments/kpi-groups/${kpiGroupId}/users/${userId}`)
        .then(() => {
          toast.success("Supprimé avec succès");
          axiosInstance.get("/kpi-groups/assignments").then((res) => {
            setGrpIndicateurs(res.data);
          });
        })
        .catch(() => {
          toast.error("n'a pas pu être supprimé.");
        });
    }
  };

  const cancel = (event: MouseEvent) => {
    setcurrentEdit(0);
    history.push("/gestionsAfetions");
  };

  
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

  return (
    <div className="app">
      <div className="formCls">
          <Toaster />
          <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
              <span className="titleEntite">LISTE DES GROUPES D'AFFECTATION</span>
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="input-group search mb-3">
                <input
                  type="text"
                  className="form-control input-text"
                  placeholder="Groupe"
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
              <div className="gestionAffectationAdd">
                <Link to="/addGestionsAfetions">
                  <button className="icnClsGrpAffectation">
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
                        {currentEdit === item.id ? (
                          <input
                            type="text"
                            className="titleSpanOne"
                            value={label}
                            onChange={handleChangeLabel}
                          />
                        ) : (
                          item.label
                        )}
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="titleSpan">{item?.users?.length} utilisateurs </span> 

                        {/* {currentEdit !== item.id ?
                            ""
                            :
                            <button id={item.id.toString()} onClick={cancel} className="clsbgL"><i><img src="../assets/images/croix.svg" alt="croix" /></i></button>
                        }
                        {currentEdit !== item.id ?
                            <button id={item.id.toString()} onClick={edit} className="clsbgL"><i><img src="../assets/images/editIcon.svg" alt="editIcon" /></i></button>
                                :
                            <button id={item.id.toString()} onClick={save} className="clsbgSaveL"><i><img src="../assets/images/save.svg" alt="save" /></i></button>
                        } */}
                         <button id={item.id.toString()}  onClick={() => onchangeActif(index)} className="clsbgL"><i><img src={index == currentactif && !show ?"./assets/images/editIcon.svg":"./assets/images/editIcon.svg"} alt="editIcon" /></i></button>
                           
                        <button className="btnIcons" onClick={() => onchangeActif(index)} >
                          <img  src= {index == currentactif && !show ?"./assets/images/fleshHaut.svg":"./assets/images/fleshbas.svg"} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {item.users.map((itemChild) => {
                return (
                  <div className="divLiParent ">
                    <ul className={animate(index)}>
                      <li>
                        <div className="d-flex justify-content-between">
                          <span className="titleSpanList">
                            {item.users.length > 0 ? itemChild?.firstName : null}
                          </span>
                          <span className="titleSpanList">
                            {item.users.length > 0 ? itemChild?.lastName : null}
                          </span>
                          <span className="titleSpanList">
                            {item.users.length > 0 ? itemChild?.email : null}
                          </span>
                          <span className="titleSpanList">
                            {item.users.length > 0 ? itemChild?.profile : null}
                          </span>
                          <button className="btnIcons">
                            {currentEdit !== item.id ? (
                              <button
                                id={item.id.toString()}
                                onClick={(e) =>
                                  delete_user(e, item?.id, itemChild?.id)
                                }
                                className="clsbgL"
                              >
                                <i>
                                  <img
                                    src="../assets/images/deleteIcon.svg"
                                    alt="deleteIcon"
                                  />
                                </i>
                              </button>
                            ) : (
                              <button
                                id={item.id.toString()}
                                onClick={cancel}
                                className="clsbgL"
                              >
                                <i>
                                  <img
                                    src="../assets/images/croix.svg"
                                    alt="croix"
                                  />
                                </i>
                              </button>
                            )}
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                );
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
                      onChange={handleChangeUser}
                    >
                      <option value="DEFAULT" disabled selected>
                        Liste des utilisateurs
                      </option>
                     {users.map((user) => (
                        <option value={user.id} key={user.id}>
                          {user.firstName}
                        </option>
                    ))}
                    </select>
                          </span>                         
                          <button id={item.id.toString()} onClick={cancelUser} className="clsbgAdd"><i><img src="../assets/images/GroupDelete.svg" alt="editIcon" /></i></button>
                          <button id={item.id.toString()} onClick={(event)=>saveUser(event,item)} className="clsbgSaveAdd"><i><img src="../assets/images/GroupSave.svg" alt="save" /></i></button>
                        </div>
                      </li>
                    </ul>
                  </div> 
                </div>
                <div className="mb-5">
                  <button onClick={() => setShow(true)} className="btnAdd">+Ajouter Utilisateur</button>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FormGestionAffectationList;
