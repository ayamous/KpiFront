import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import axiosInstanceUser from "../../../services/axiosUserConfig";
import { IRole } from "../../Interfaces/IRole";

const FormProfilList = () => {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value ;
    const roleId = e.currentTarget.id;
    const index = roles.findIndex(element => element.id == roleId)
    setRoles(prev => {
      let rolesCopy = [...roles]
      rolesCopy[index].description = value
      return rolesCopy
    })
  };
  const [etat, setEtat] = useState<string>("false");
  console.log("status : ", etat)
  const [currentEdit, setcurrentEdit] = useState<string[]>([]);
  const [id, setID] = useState<number>();
  const [currentUpdate, setCurrentUpdate] = useState<number>();

  const [checkedValueInactive, setCheckedValueInactive] = useState<string>("false");
  //@ts-ignore
  const handlerCheckboxInactive = (e) => {
    const roleId = e.currentTarget.id;
    const index = roles.findIndex(element => element.id == roleId)
    setRoles(prev => {
      let rolesCopy = [...roles]
      rolesCopy[index].status === "true" ? rolesCopy[index].status = "false" : rolesCopy[index].status = "true"
      return rolesCopy
    })
  };

  const [roles, setRoles] = useState<IRole[]>([]);
  const [updateRoles, setupdateRoles] = useState<IRole[]>([]);
  //function 
  const isActive = (id: string) => {
    const currentRole = roles.find(element => element.id === id)
    if (currentRole?.status === "true") {
      return "omctActive"
    }
    else {
      return "omct"
    }
  }

  const isActiveSpan = (id: string) => {
    const currentRole = roles.find(element => element.id === id)
    if (currentRole?.status === "true") {
      return "Active"
    }
    else {
      return "Inactive"
    }
  }
  const [isLoading, setLoading] = useState<Boolean>(false);
  const isActiveImg = (id: string) => {
    const currentRole = roles.find(element => element.id === id)
    if (currentRole?.status === "true") {
      return "../assets/images/cercleActive.svg"
    }
    else {
      return "../assets/images/cercle.svg"
    }
  }
  const [classNameActif, setClassNameActif] = useState("actif");
  const handlerAnnuler = (e: React.MouseEvent<HTMLElement>): void => {
    axiosInstanceUser.get('users/roles').then((res) => {
      console.log(res.data);
      setRoles(res.data.roles);
    });
  }; 

  let history = useHistory();
  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosInstanceUser.put('/users/roles', roles)
      .then((res) => {
        setLoading(false);
        toast.success('les données ont été enregistrées avec succès');
        history.push("/profil");
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Erreur! données non enregistrées');
      })
  };

  useEffect(() => {
    axiosInstanceUser.get('users/roles').then((res) => {
      console.log(res.data);
      setRoles(res.data.roles);
      setupdateRoles(res.data.roles)
    });
  }, []);

  return (
    <div className="app">
      <div className="formCls">
        <Toaster />
        <div className="d-flex justify-content-between contenuBtn">
          <div className="form-field">
            <span className="titleEntite">LISTE DES PROFILS</span>
          </div>
          <div className="d-flex justify-content-between contenuBtn">
            <div className="form-field">
            </div>
            <div className="imgCls d-flex justify-content-between">
              <div className="profilAdd">
                <Link to="/addProfil">
                  <button className="icnClsProfil">
                    <i>
                      <AiOutlinePlusSquare />
                    </i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="formlist">
          <table>
            <thead>
              <tr>
                <th>Libellé</th>
                <th>Commentaire</th>
                <th>Etat</th>
              </tr>
            </thead>
            {roles.map((role) => {
              return (
                <tbody key={role.id}>
                  <tr>
                    <td>
                      {currentUpdate == Number(role?.id) ? (
                        <input type="text" className="changeIn bgDisabled" value={role.name} disabled />) : (role.name)}
                    </td>
                    <td>
                      <input type="text" className="changeIn" id={role.id} value={role.description} onChange={handleChangeDescription} />
                    </td>
                    <td>
                      <div className="imgCls d-flex justify-content-between divActiv">
                        <button id={role.id.toString()} value={role.status} onClick={handlerCheckboxInactive}
                          className={isActive(role.id)} type="button" aria-label="add">
                          <span>{role.status === "true" ? "Active" : "Inative"}</span>
                          <img src={isActiveImg(role.id)} alt="ActiverInactive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div className="btnClsThree btnTwoCls">
              <button
                onClick={handlerAnnuler}
                className={`reset ${classNameActif}`}
              >
                ANNULER
              </button>
            <button className="submit" onClick={onSubmit}>
              ENREGISTRER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormProfilList;