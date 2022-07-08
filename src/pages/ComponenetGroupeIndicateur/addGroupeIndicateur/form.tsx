import { ChangeEvent, MouseEvent, useState, useEffect } from "react";
import axiosInstance from "../../../services/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useHistory } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { IKPI } from "../../Interfaces/IKPI";


const FormGroupeIndicateurAdd = () => {
  const [label, setLabel] = useState<string>();
  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel(e.currentTarget.value);
  };

  useEffect(() => {
    axiosInstance.get("/kpis?filterBy=notMapped").then((res) => {
      const data: IKPI[] = res.data.content;
      let entitescopy = [...entites];
      data.forEach((element) => {
        entitescopy.push(element);
      });
      setEntites(entitescopy);
    });
  }, []);

  const [entites, setEntites] = useState<IKPI[]>([]);
  const [entite, setEntite] = useState<IKPI>();
  const handleChangeEntite = (e: ChangeEvent<HTMLSelectElement>) => {
    const entityid = e.target.value;
    let entite = entites.find((item) => {
      if (item.id == Number(entityid)) return true;
    }, entites);
    setEntite(entite);
  };

  const [kpisAll, setKPIs] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof kpisAll>) => {
    const {
      target: { value },
    } = event;
    setKPIs(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [classNameActif, setClassNameActif] = useState("actif");
  const handlerInputType = (e: React.MouseEvent<HTMLElement>): void => {
    if (classNameActif) {
      setClassNameActif("actif");
    } else {
      setClassNameActif("null");
    }
  };

  const [isLoading, setLoading] = useState<Boolean>(false);
  let history = useHistory();
  const [validLabel, setValidLabel] = useState<boolean>(false);
  const [validkpis, setvalidkpis] = useState<boolean>(false);
  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();
    let kpis: IKPI[]=[];
    kpisAll.forEach((kpi) => {
      const kpiList = entites.find((entite) => entite.name == kpi);
      if (kpiList) {
        kpis.push(kpiList);
      }
      //console.log("kpiList", kpiList)
    });
    const payload = {
      label,
      kpis
    }
    //console.log(payload)
    if(payload.label== null){
      toast.error("Erreur! données non enregistrées");
      setValidLabel(true)
      setLoading(true);
    }else if(payload.kpis.length==0){
      toast.error("Erreur! données non enregistrées");
      setvalidkpis(true)
      setLoading(true);
    }else{
      axiosInstance
      .post("kpi-groups" ,payload)
      .then((res) => {
        setLoading(false);
        toast.success("les données ont été enregistrées avec succès");
        history.push("/groupeIndicateur");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Erreur! données non enregistrées");
      });
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 450,
      },
    },
  };

  
  
  return (
    <div className="app">
      <div className="formCls">
        <Toaster />
        <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field d-flex">
            <Link to='/groupeIndicateur' ><span className="titleEntiteLien">LISTE DES GROUPES DES INDICATEURS</span></Link>
            <div className="fleshLien">
              <span>{'>'}</span>
            </div>
              <span className="titleEntiteWL">AJOUTER UN GROUPE D'INDICATEURS</span>
            </div>
          </div>
          <div className="formlistAdd">
          <div className="form-field">
            <label htmlFor="label">Nom de groupe</label>
            <input
              id="label"
              placeholder="groupe 01 "
              className="form-control fselectHeight"
              onChange={handleChangeLabel}
            />
            <span className={validLabel?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
          </div>
          <div className="form-group">
            <InputLabel id="demo-multiple-checkbox-label">
              Nom indicateur
            </InputLabel>
            <Select
              className="selectedItem"
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={kpisAll}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" className="selectedItem" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {entites.map((entite) => (
                <MenuItem value={entite.name} key={entite.id}>
                  <Checkbox
                    checked={
                      kpisAll.findIndex((element) => element == entite.name) > -1
                    }
                  />
                  <ListItemText primary={entite.name} />
                </MenuItem>
              ))}
            </Select>
            <span className={validkpis?"msgRequired":"msgRequiredNone"}>ce champ est obligé*</span>
          </div>
        <div className="btnCls">
          <Link to="/groupeIndicateur">
            <button
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                handlerInputType(e)
              }
              className="reset"
            >
              ANNULER
            </button>
          </Link>
          <button className="submit" onClick={onSubmit}>
              ENREGISTRER
            </button>
        </div>
          </div>   
      </div>
      </div>
  );
};
export default FormGroupeIndicateurAdd;
