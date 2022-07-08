import { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { MouseEvent, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import axiosInstanceUser from "../../../services/axiosUserConfig";
import { Iuser } from "../../Interfaces/Iuser";
import { LastPageSharp } from "@material-ui/icons";



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

const FormUserList = () => {
  const [users, setusers] = useState<Iuser[]>([]);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setlastName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [selectedProfil, setProfil] = useState<{ label: string; value: string }>();
  const [rappel, setRappel] = useState<string>();
  const [isChangeable, setChangeable] = useState<boolean>(false);
  const [currentEdit, setcurrentEdit] = useState<string>();
  const [searchInput, setSearchInput] = useState("");
  const [isCrescent, setIsCrescent] = useState(false);
  const [paramProfil, setParamProfil] = useState<string>("");
  const [paramNotification, setNotification] = useState<string>("");
  const [pagination, setPagination] = useState<IPageable>();
  const [pagesNumber, setPagesNumber] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);



  const options = [
    { label: "admin", value: "admin" },
    { label: "saisie", value: "saisie" },
    { label: "consultant", value: "consultant" },
  ];

  const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.currentTarget.value);
  };

  const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    setlastName(e.currentTarget.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (index < options.length) {
      if (options[index].label === label) {
        break;
      }
      index++;
    }
    setProfil(options[index]);
  };
  // console.log("paramFilter", selectedProfil)

  const user = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    profile: selectedProfil?.value,
    attributes: { notification: rappel }
  };

  const handleChangeRappel = (e: ChangeEvent<HTMLInputElement>) => {
    setRappel(e.currentTarget.value);
  };

  const edit = (event: MouseEvent) => {
    const userId = event.currentTarget.id;
    console.log("edit", event.currentTarget.id);
    let index = 0;
    while (index < users.length) {
      if (users[index].id === userId) {
        break;
      }
      index++;
    }
    setEmail(users[index].email);
    setFirstName(users[index].firstName);
    setlastName(users[index].lastName);
    setProfil({ label: users[index].profile, value: users[index].profile });
    setRappel(users[index].attributes?.notification);
    setcurrentEdit(users[index].id);
  };

  let history = useHistory();
  const save = (event: MouseEvent) => {
    const userId = event.currentTarget.id;
    axiosInstanceUser
      .put(`users/${userId}`, user)
      .then((res) => {
        setChangeable(false);
        toast.success("les données ont été modifiées avec succès");
        history.push("/users");
        window.location.reload();
      })
      .catch((res) => {
        setChangeable(false);
        toast.error("Erreur! mis à jour sans succès");
      });
  };
  const delete_user = (event: MouseEvent) => {
    if (window.confirm("êtes-vous sûr d'avoir supprimé")) {
      const userId = event.currentTarget.id;
      axiosInstanceUser.delete(`users/${userId}`)
        .then(() => {
          toast.success("Supprimé avec succès");
          history.push("/users");
          window.location.reload();
        })
        .catch(() => {
          toast.error("n'a pas pu être supprimé.");
        });
    }
  };
  const cancel = (event: MouseEvent) => {
    setcurrentEdit("");
  };

  const handlChangeProfileParam = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    setParamProfil(label);
  };

  const handlChangeNotification = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    setNotification(label);
  };

  const size = 5
  const [lastPage, setLastPage] = useState<number>();
  useEffect(() => {
    axiosInstanceUser.get('users?page=' + page + '&profile=' + paramProfil + '&notification=' + paramNotification).then((res) => {
      //const {...pagination} =res.data.users;
      const { content, pageable, sort, count } = res.data;
      setusers(res.data.users);
      // setPagination(pagination)
      const totalElement = count - 1;
      console.log("totalElement:", totalElement)
      const lp = totalElement / size > parseInt(String(totalElement / size)) ? parseInt(String(totalElement / size)) + 1 : parseInt(String(totalElement / size));
      setLastPage(lp)
      let nm = Math.abs(totalElement / size); // Change to positive
      var decimal =  (nm -Math.floor(nm)).toFixed(1)
      //@ts-ignore
      let totalElements = decimal*size
      console.log("decimal", decimal)
      console.log("totelofElementsLast", totalElements )
      console.log("lp", lp)
      // const n = Array(lp).fills(size)
      const n = Array(lp).fill(1)
      const paginations = {
        empty: false,
        first:false,
        last:true,
        number: 5,
        numberOfElements:5,
        size:7,
        totalElements: 7,
        totalPages: 1
      }
      setPagination(paginations)
      setPagesNumber(n)
      console.log("nnn", n)
    });
  }, [page, paramProfil, paramNotification]);

  //const lastPage =  totalElement/size // 5/5>parseInt(5/5)
  return (
    <div className="app">
      <div className="formCls">
        <Toaster />
        <div className="d-flex justify-content-between contenuBtn">
          <div className="form-field">
            <span className="titleEntite">LISTE DES UTILISATEURS</span>
          </div>
          <div className="imgCls d-flex justify-content-between">

            <div className="input-group search mb-3">
              <input
                type="text"
                className="form-control input-text"
                placeholder="Nom"
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
          <div className="form-field thrBtnFilter3 d-flex">
            <div className="form-group">
              <label htmlFor="Profil" className="labFilter">Profil</label>
              <br />
              <select id="profilParam" className="fselectCls" onChange={handlChangeProfileParam}>
                <option value="" selected>
                  Profil
                </option>
                <option value="admin">Admin</option>
                <option value="saisie">Saisie</option>
                <option value="consultant">Consultant</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Rappel" className="labFilter">Rappel</label>
              <br />
              <select id="nitification" className="fselectCls" onChange={handlChangeNotification}>
                <option value="" selected>
                  Rappel
                </option>
                <option value="enabled">Active</option>
                <option value="disabled">Non Active</option>
              </select>
            </div>
          </div>
          <div className="imgCls d-flex justify-content-between">
            <div className="userAdd">
              <Link to="/adduser">
                <button className="icnClsUsr">
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
                <th>Email</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Profil</th>
                <th>Rappels</th>
                <th>Actions</th>
              </tr>
            </thead>
            {users.map((user) => {
              return (
                <tbody key={user.id}>
                  <tr>
                    <td>{currentEdit === user.id ? (<input
                      type="text" className="changeIn" value={email} disabled />) : (user.email)}
                    </td>
                    <td>
                      {currentEdit === user.id ? (
                        <input type="text" className="changeIn" value={firstName} onChange={handleChangeFirstName} />) : (user.firstName)}
                    </td>
                    <td>
                      {currentEdit === user.id ? (<input type="text" className="changeIn" value={lastName} onChange={handleChangeLastName} />) : (user.lastName)}
                    </td>
                    <td>
                      {currentEdit === user.id ? (
                        <select
                          id="profil"
                          className="changeIn"
                          onChange={onSelectChange}
                          defaultValue={user.profile[0]}
                        >
                          <option value="admin">Admin</option>
                          <option value="saisie">Saisie</option>
                          <option value="consultant">Consultant</option>
                        </select>
                      ) : (
                        user.profile[0]
                      )}
                    </td>
                    <td>
                      {currentEdit === user.id ? (<input type="text" className="changeIn" value={rappel} onChange={handleChangeRappel} />) : (user.attributes?.notification)}
                    </td>
                    <td>
                      {currentEdit !== user.id ? (
                        <button
                          id={user.id.toString()}
                          onClick={edit}
                          className="clsbg"
                        >
                          <i>
                            <img
                              src="../assets/images/editIcon.svg"
                              alt="editIcon"
                            />
                          </i>
                        </button>
                      ) : (
                        <button
                          id={user.id.toString()}
                          onClick={save}
                          className="clsbgSave"
                        >
                          <i>
                            <img src="../assets/images/save.svg" alt="save" />
                          </i>
                        </button>
                      )}
                      {currentEdit !== user.id ? (
                        <button
                          id={user.id.toString()}
                          onClick={delete_user}
                          className="clsbg"
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
                          id={user.id.toString()}
                          onClick={cancel}
                          className="clsbg"
                        >
                          <i>
                            <img
                              src="../assets/images/croix.svg"
                              alt="croix"
                            />
                          </i>
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <div className="pagination">
            {page == 0 ? null : <i className="paginationImage" onClick={() => setPage(page - 1)}>
              <img src="../assets/images/PathLeft.svg" alt="detailIcon" />
            </i>}
            {pagesNumber.map((p, i) => (
              <i className="paginationImage" key={i}>
                <img src={i == page ? "../assets/images/EllipseDark.svg" : "../assets/images/EllipseW.svg"} alt="detailIcon" />
              </i>
            ))}
            {lastPage == (page + 1) ? null : <i className="paginationImage" onClick={() => setPage(page + 1)}>
              <img src="../assets/images/PathR.svg" alt="detailIcon" />
            </i>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormUserList;
