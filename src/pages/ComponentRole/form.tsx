import { MouseEvent, useState, useEffect, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../services/axiosConfig";
import { Check } from "@material-ui/icons";

const FormRole = () => {
  const [version, setVersion] = useState<{ label: string; value: string }>();
  const selectVersion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const label = event.currentTarget.value;
    let index = 0;
    while (true) {
      if (optionsVersion[index].label === label) {
        break;
      }
      index++;
    }
    setVersion(optionsVersion[index]);
  };
  const optionsVersion = [
    { label: "Admin", value: "Admin" },
    { label: "Saisie", value: "Saisie" },
    { label: "Consultant", value: "Consultant" }
  ];

  const [isLoading, setLoading] = useState<Boolean>(false);

  const [classNameActif, setClassNameActif] = useState("actif");
  const handlerInputType = (e: any) => { 
    setChekedVal({ ...chekedVal , add: chekedVal.add, mod: !chekedVal.mod  })
  }


  let history = useHistory();
  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    axiosInstance.post('control-rules')
      .then((res) => {
        setLoading(false);
        toast.success('les données ont été enregistrées avec succès');
        history.push("/controles");
      })
      .catch((err) => {
        setLoading(false);
        toast.error('Erreur! données non enregistrées');
      })
  };


  //@ts-ignore
  const [chekedVal, setChekedVal] = useState({ add: false, mod: false, sup: false, exe: false, consult: false, allSelect: false });
  // console.log("chekedValues", chekedVal)
  const handleChangeChekedVal = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === "allSelect") {
      if (!chekedVal.allSelect) { setChekedVal({ add: true, mod: true, sup: true, exe: true, consult: true, allSelect: true }) }
      else { setChekedVal({ add: false, mod: false, sup: false, exe: false, consult: false, allSelect: false }) }
    }
    else {
      const chekedValCopy = {
        ...chekedVal,
        //@ts-ignore
        [e.currentTarget.id]: !chekedVal[e.currentTarget.id]
      }
      //@ts-ignore
      console.log("chekedValCopy", e.currentTarget.id, chekedValCopy, chekedVal[e.currentTarget.id], !chekedVal[e.currentTarget.id])
      setChekedVal(chekedValCopy)
    }
  }

  //periode
  //@ts-ignore
  const [chekedValPeriode, setChekedVaPeriode] = useState({ periodAdd: false, periodMod: false, periodSup: false, periodExe: false, periodCons: false, periodAll: false });
  const handleChangeChekedValPeriode = (e: ChangeEvent<HTMLInputElement>) => {
    //Periode
    if (e.currentTarget.id === "periodAll") {
      if (!chekedValPeriode.periodAll) { setChekedVaPeriode({ periodAdd: true, periodMod: true, periodSup: true, periodExe: true, periodCons: true, periodAll: true }) }
      else { setChekedVaPeriode({ periodAdd: false, periodMod: false, periodSup: false, periodExe: false, periodCons: false, periodAll: false }) }
    }
    else {
      const chekedValCopyPeriode = {
        ...chekedValPeriode,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValPeriode[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedVaPeriode(chekedValCopyPeriode)
    }
  }

  //rappel
  //@ts-ignore
  const [chekedValRappel, setChekedVaRappel] = useState({ rappelAdd: false, rappelMod: false, rappelSup: false, rappelExe: false, rappelCons: false, rappelAll: false });
  const handleChangeChekedValRappel = (e: ChangeEvent<HTMLInputElement>) => {
    //Periode
    if (e.currentTarget.id === "rappelAll") {
      if (!chekedValRappel.rappelAll) { setChekedVaRappel({ rappelAdd: true, rappelMod: true, rappelSup: true, rappelExe: true, rappelCons: true, rappelAll: true }) }
      else { setChekedVaRappel({ rappelAdd: false, rappelMod: false, rappelSup: false, rappelExe: false, rappelCons: false, rappelAll: false }) }
    }
    else {
      const chekedValCopyRappel = {
        ...chekedValRappel,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValRappel[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedVaRappel(chekedValCopyRappel)
    }
  }


  //@ts-ignore
  const [chekedValEntite, setChekedValEntite] = useState({ entiteAdd: false, entiteMod: false, entiteSup: false, entiteExe: false, entiteCons: false, entiteAll: false });
  const handleChangeChekedValEntite = (e: ChangeEvent<HTMLInputElement>) => {
    //Periode
    if (e.currentTarget.id === "entiteAll") {
      if (!chekedValEntite.entiteAll) { setChekedValEntite({ entiteAdd: true, entiteMod: true, entiteSup: true, entiteExe: true, entiteCons: true, entiteAll: true }) }
      else { setChekedValEntite({ entiteAdd: false, entiteMod: false, entiteSup: false, entiteExe: false, entiteCons: false, entiteAll: false }) }
    }
    else {
      const chekedValCopyEntite = {
        ...chekedValEntite,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValEntite[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValEntite(chekedValCopyEntite)
    }
  }


  //@ts-ignore
  const [chekedValSys, setChekedValSys] = useState({ sysAdd: false, sysMod: false, sysSup: false, sysExe: false, sysCons: false, sysAll: false });
  const handleChangeChekedValSys = (e: ChangeEvent<HTMLInputElement>) => {
    //sys
    if (e.currentTarget.id === "sysAll") {
      if (!chekedValSys.sysAll) { setChekedValSys({ sysAdd: true, sysMod: true, sysSup: true, sysExe: true, sysCons: true, sysAll: true }) }
      else { setChekedValSys({ sysAdd: false, sysMod: false, sysSup: false, sysExe: false, sysCons: false, sysAll: false }) }
    }
    else {
      const chekedValCopySys = {
        ...chekedValSys,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValSys[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValSys(chekedValCopySys)
    }
  }

  //@ts-ignore
  const [chekedValGrpInd, setChekedValGrpInd] = useState({ grpIndAdd: false, grpIndMod: false, grpIndSup: false, grpIndExe: false, grpIndCons: false, grpIndAll: false });
  const handleChangeChekedValGrpInd = (e: ChangeEvent<HTMLInputElement>) => {
    //sys
    if (e.currentTarget.id === "grpIndAll") {
      if (!chekedValGrpInd.grpIndAll) { setChekedValGrpInd({ grpIndAdd: true, grpIndMod: true, grpIndSup: true, grpIndExe: true, grpIndCons: true, grpIndAll: true }) }
      else { setChekedValGrpInd({ grpIndAdd: false, grpIndMod: false, grpIndSup: false, grpIndExe: false, grpIndCons: false, grpIndAll: false }) }
    }
    else {
      const chekedValCopyGrpInd = {
        ...chekedValGrpInd,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValGrpInd[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValGrpInd(chekedValCopyGrpInd)
    }
  }

  //@ts-ignore
  const [chekedValAffect, setChekedValAffect] = useState({ affectAdd: false, affectMod: false, affectSup: false, affectExe: false, affectCons: false, affectAll: false });
  const handleChangeChekedValAffect = (e: ChangeEvent<HTMLInputElement>) => {
    //sys
    if (e.currentTarget.id === "affectAll") {
      if (!chekedValAffect.affectAll) { setChekedValAffect({ affectAdd: true, affectMod: true, affectSup: true, affectExe: true, affectCons: true, affectAll: true }) }
      else { setChekedValAffect({ affectAdd: false, affectMod: false, affectSup: false, affectExe: false, affectCons: false, affectAll: false }) }
    }
    else {
      const chekedValCopyAffect = {
        ...chekedValAffect,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValAffect[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValAffect(chekedValCopyAffect)
    }
  }

  //@ts-ignore
  const [chekedValCateg, setChekedValCateg] = useState({ catAdd: false, catMod: false, catSup: false, catExe: false, catCons: false, catAll: false });
  const handleChangeChekedValCateg = (e: ChangeEvent<HTMLInputElement>) => {
    //sys
    if (e.currentTarget.id === "catAll") {
      if (!chekedValCateg.catAll) { setChekedValCateg({ catAdd: true, catMod: true, catSup: true, catExe: true, catCons: true, catAll: true }) }
      else { setChekedValCateg({ catAdd: false, catMod: false, catSup: false, catExe: false, catCons: false, catAll: false }) }
    }
    else {
      const chekedValCopyCat = {
        ...chekedValCateg,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValCateg[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValCateg(chekedValCopyCat)
    }
  }

  //@ts-ignore
  const [chekedValReglCntr, setChekedValReglCntr] = useState({ regleAdd: false, regleMod: false, regleSup: false, regleExe: false, regleCons: false, regleAll: false });
  const handleChangeChekedValReglCntr = (e: ChangeEvent<HTMLInputElement>) => {
    //sys
    if (e.currentTarget.id === "regleAll") {
      if (!chekedValReglCntr.regleAll) { setChekedValReglCntr({ regleAdd: true, regleMod: true, regleSup: true, regleExe: true, regleCons: true, regleAll: true }) }
      else { setChekedValReglCntr({ regleAdd: false, regleMod: false, regleSup: false, regleExe: false, regleCons: false, regleAll: false }) }
    }
    else {
      const chekedValCopyReglCntr = {
        ...chekedValReglCntr,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValReglCntr[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValReglCntr(chekedValCopyReglCntr)
    }
  }

  //@ts-ignore
  const [chekedValEval, setChekedValEval] = useState({ evalAdd: false, evalMod: false, evalSup: false, evalExe: false, evalCons: false, evalAll: false });
  const handleChangeChekedValEval = (e: ChangeEvent<HTMLInputElement>) => {
    //sys
    if (e.currentTarget.id === "evalAll") {
      if (!chekedValEval.evalAll) { setChekedValEval({ evalAdd: true, evalMod: true, evalSup: true, evalExe: true, evalCons: true, evalAll: true }) }
      else { setChekedValEval({ evalAdd: false, evalMod: false, evalSup: false, evalExe: false, evalCons: false, evalAll: false }) }
    }
    else {
      const chekedValCopyEval = {
        ...chekedValEval,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValEval[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValEval(chekedValCopyEval)
    }
  }

  //@ts-ignore
  const [chekedValSaisieInd, setChekedValSaisieInd] = useState({ saisieIndAdd: false, saisieIndMod: false, saisieIndSup: false, saisieIndExe: false, saisieIndCons: false, saisieIndAll: false });
  const handleChangeChekedValSaisieInd = (e: ChangeEvent<HTMLInputElement>) => {
    //sys
    if (e.currentTarget.id === "saisieIndAll") {
      if (!chekedValSaisieInd.saisieIndAll) { setChekedValSaisieInd({ saisieIndAdd: true, saisieIndMod: true, saisieIndSup: true, saisieIndExe: true, saisieIndCons: true, saisieIndAll: true }) }
      else { setChekedValSaisieInd({ saisieIndAdd: false, saisieIndMod: false, saisieIndSup: false, saisieIndExe: false, saisieIndCons: false, saisieIndAll: false }) }
    }
    else {
      const chekedValCopySaisieInd = {
        ...chekedValSaisieInd,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValSaisieInd[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValSaisieInd(chekedValCopySaisieInd)
    }
  }

  //@ts-ignore
  const [chekedValSaisieArretBud, setChekedValSaisieArretBud] = useState({ saisieArretBudAdd: false, saisieArretBudMod: false, saisieArretBudSup: false, saisieArretBudExe: false, saisieArretBudCons: false, saisieArretBudAll: false });
  const handleChangeChekedValSaisieArretBud = (e: ChangeEvent<HTMLInputElement>) => {
    //sys
    if (e.currentTarget.id === "saisieArretBudAll") {
      if (!chekedValSaisieArretBud.saisieArretBudAll) { setChekedValSaisieArretBud({ saisieArretBudAdd: true, saisieArretBudMod: true, saisieArretBudSup: true, saisieArretBudExe: true, saisieArretBudCons: true, saisieArretBudAll: true }) }
      else { setChekedValSaisieArretBud({ saisieArretBudAdd: false, saisieArretBudMod: false, saisieArretBudSup: false, saisieArretBudExe: false, saisieArretBudCons: false, saisieArretBudAll: false }) }
    }
    else {
      const chekedValCopySaisieArretBud = {
        ...chekedValSaisieArretBud,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValSaisieArretBud[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValSaisieArretBud(chekedValCopySaisieArretBud)
    }
  }


  //@ts-ignore
  const [chekedValImpo, setChekedValImpo] = useState({ impAdd: false, impMod: false, impSup: false, impExe: false, impCons: false, impAll: false });
  const handleChangeChekedValImpo = (e: ChangeEvent<HTMLInputElement>) => {
    //imp
    if (e.currentTarget.id === "impAll") {
      if (!chekedValImpo.impAll) { setChekedValImpo({ impAdd: true, impMod: true, impSup: true, impExe: true, impCons: true, impAll: true }) }
      else { setChekedValImpo({ impAdd: false, impMod: false, impSup: false, impExe: false, impCons: false, impAll: false }) }
    }
    else {
      const chekedValCopyImpo = {
        ...chekedValImpo,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValImpo[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValImpo(chekedValCopyImpo)
    }
  }

  //@ts-ignore
  const [chekedValEstim, setChekedValEstim] = useState({ estimAdd: false, estimMod: false, estimSup: false, estimExe: false, estimCons: false, estimAll: false });
  const handleChangeChekedValEstim = (e: ChangeEvent<HTMLInputElement>) => {
    //imp
    if (e.currentTarget.id === "estimAll") {
      if (!chekedValEstim.estimAll) { setChekedValEstim({ estimAdd: true, estimMod: true, estimSup: true, estimExe: true, estimCons: true, estimAll: true }) }
      else { setChekedValEstim({ estimAdd: false, estimMod: false, estimSup: false, estimExe: false, estimCons: false, estimAll: false }) }
    }
    else {
      const chekedValCopyEstim = {
        ...chekedValEstim,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValEstim[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValEstim(chekedValCopyEstim)
    }
  }

  //@ts-ignore
  const [chekedValConst, setChekedValConst] = useState({ consultationAdd: false, consultationMod: false, consultationSup: false, consultationExe: false, consultationCons: false, consultationAll: false });
  const handleChangeChekedValConsult = (e: ChangeEvent<HTMLInputElement>) => {
    //imp
    if (e.currentTarget.id === "consultationAll") {
      if (!chekedValConst.consultationAll) { setChekedValConst({ consultationAdd: true, consultationMod: true, consultationSup: true, consultationExe: true, consultationCons: true, consultationAll: true }) }
      else { setChekedValConst({ consultationAdd: false, consultationMod: false, consultationSup: false, consultationExe: false, consultationCons: false, consultationAll: false }) }
    }
    else {
      const chekedValCopyConst = {
        ...chekedValConst,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValConst[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValConst(chekedValCopyConst)
    }
  }

  //@ts-ignore
  const [chekedValMonitoring, setChekedValMonitoring] = useState({ monitoringAdd: false, monitoringMod: false, monitoringSup: false, monitoringExe: false, monitoringCons: false, monitoringAll: false });
  const handleChangeChekedValMonitoring = (e: ChangeEvent<HTMLInputElement>) => {
    //imp
    if (e.currentTarget.id === "monitoringAll") {
      if (!chekedValMonitoring.monitoringAll) { setChekedValMonitoring({ monitoringAdd: true, monitoringMod: true, monitoringSup: true, monitoringExe: true, monitoringCons: true, monitoringAll: true }) }
      else { setChekedValMonitoring({ monitoringAdd: false, monitoringMod: false, monitoringSup: false, monitoringExe: false, monitoringCons: false, monitoringAll: false }) }
    }
    else {
      const chekedValCopyMonitoring = {
        ...chekedValMonitoring,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValMonitoring[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValMonitoring(chekedValCopyMonitoring)
    }
  }

  //@ts-ignore
  const [chekedValAudit, setChekedValAudit] = useState({ auditAdd: false, auditMod: false, auditSup: false, auditExe: false, auditCons: false, auditAll: false });
  const handleChangeChekedValAudit = (e: ChangeEvent<HTMLInputElement>) => {
    //imp
    if (e.currentTarget.id === "auditAll") {
      if (!chekedValAudit.auditAll) { setChekedValAudit({ auditAdd: true, auditMod: true, auditSup: true, auditExe: true, auditCons: true, auditAll: true }) }
      else { setChekedValAudit({ auditAdd: false, auditMod: false, auditSup: false, auditExe: false, auditCons: false, auditAll: false }) }
    }
    else {
      const chekedValCopyAudit = {
        ...chekedValAudit,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValAudit[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValAudit(chekedValCopyAudit)
    }
  }

  //@ts-ignore
  const [chekedValGestUser, setChekedValGestUser] = useState({ gestUserAdd: false, gestUserMod: false, gestUserSup: false, gestUserExe: false, gestUserCons: false, gestUserAll: false });
  const handleChangeChekedValGestUser = (e: ChangeEvent<HTMLInputElement>) => {
    //imp
    if (e.currentTarget.id === "gestUserAll") {
      if (!chekedValGestUser.gestUserAll) { setChekedValGestUser({ gestUserAdd: true, gestUserMod: true, gestUserSup: true, gestUserExe: true, gestUserCons: true, gestUserAll: true }) }
      else { setChekedValGestUser({ gestUserAdd: false, gestUserMod: false, gestUserSup: false, gestUserExe: false, gestUserCons: false, gestUserAll: false }) }
    }
    else {
      const chekedValCopyGestUser = {
        ...chekedValGestUser,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValGestUser[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValGestUser(chekedValCopyGestUser)
    }
  }

  //@ts-ignore
  const [chekedValGestRole, setChekedValGestRole] = useState({ gestRoleAdd: false, gestRoleMod: false, gestRoleSup: false, gestRoleExe: false, gestRoleCons: false, gestRoleAll: false });
  const handleChangeChekedValGestRole = (e: ChangeEvent<HTMLInputElement>) => {
    //imp
    if (e.currentTarget.id === "gestRoleAll") {
      if (!chekedValGestRole.gestRoleAll) { setChekedValGestRole({ gestRoleAdd: true, gestRoleMod: true, gestRoleSup: true, gestRoleExe: true, gestRoleCons: true, gestRoleAll: true }) }
      else { setChekedValGestRole({ gestRoleAdd: false, gestRoleMod: false, gestRoleSup: false, gestRoleExe: false, gestRoleCons: false, gestRoleAll: false }) }
    }
    else {
      const chekedValCopyGestRole = {
        ...chekedValGestRole,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValGestRole[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValGestRole(chekedValCopyGestRole)
    }
  }


  //@ts-ignore
  const [chekedValDash, setChekedValDash] = useState({ dashAdd: false, dashMod: false, dashSup: false, dashExe: false, dashCons: false, dashAll: false });
  const handleChangeChekedValDash = (e: ChangeEvent<HTMLInputElement>) => {
    //imp
    if (e.currentTarget.id === "dashAll") {
      if (!chekedValDash.dashAll) { setChekedValDash({ dashAdd: true, dashMod: true, dashSup: true, dashExe: true, dashCons: true, dashAll: true }) }
      else { setChekedValDash({ dashAdd: false, dashMod: false, dashSup: false, dashExe: false, dashCons: false, dashAll: false }) }
    }
    else {
      const chekedValCopyDash = {
        ...chekedValDash,
        //@ts-ignore
        [e.currentTarget.id]: !chekedValDash[e.currentTarget.id]
      }
      //@ts-ignore
      setChekedValDash(chekedValCopyDash)
    }
  }
  useEffect(() => {
    /*  if(chekedVal=={ add: true, mod: true, sup: true, exe: true, consult: true, allSelect: false }){
        console.log('in effet' ,"eee")
        const chekedValCopy = {
          ...chekedVal,
          //@ts-ignore
          ["allSelect"]: true
        }
        console.log("allSelect" ,chekedValCopy ,chekedVal)
        setChekedVal(chekedValCopy) 
      }
      */
  }, [chekedVal, chekedValPeriode, chekedValRappel, chekedValEntite, chekedValSys, chekedValAffect, chekedValCateg, chekedValReglCntr, chekedValEval, chekedValSaisieInd, chekedValSaisieArretBud, chekedValImpo, chekedValEstim, chekedValConst, chekedValMonitoring, chekedValAudit, chekedValGestUser, chekedValGestRole, chekedValDash])

  return (
    <div className="app">
      <div className="formCls">
        <Toaster />
        <div className="d-flex d-flex justify-content-between contenuBtn">
          <div className="form-field ">
            <span className="titleEntite">GESTION DES RÔLES</span>
          </div>
          <div className="form-group col-md-3 colPro d-flex">
            <label className="labelProfil">Profile</label>
            <select
              id="inductor"
              className="fselect-group slctCon"
              onChange={selectVersion}
            >
              <option value="" selected>Profile</option>
              <option value="Admin">Admin</option>
              <option value="Saisie">Saisie</option>
              <option value="Consultant">Consultant</option>
            </select>
          </div>
          <div></div>
        </div>
        <div className="formlist">
          <div className="d-flex theadRow">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow">Domaine</span></div>
              <div className="form-group col-md-4"><span className="spanRow">Les rubriques</span></div>
              <div className="form-group col-md-4"><span className="spanRow">Les sous-rubriques</span></div>
            </div>
            <div className="d-flex col-md-8">
              <div className="form-group col-md-1"><span className="spanRow">Ajout</span></div>
              <div className="form-group col-md-2"><span className="spanRow">Modification</span></div>
              <div className="form-group col-md-2"><span className="spanRow">Suppression</span></div>
              <div className="form-group col-md-2"><span className="spanRow">Consultation</span></div>
              <div className="form-group col-md-2"><span className="spanRow">Exécution</span></div>
              <div className="form-group col-md-3"><span className="spanRow">Sélectionner/Déselectionner tout</span></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2">GESTION INDICATEURS</span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Référentiel</span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2"></span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              {/* <label>
    <input
      type="checkbox"
      ref={input => {
        if (input) {
          input.indeterminate = true;
        }
      }}
    />
    {' '}
    Un test
  </label>, */}
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="checkInd" id="add" onChange={handleChangeChekedVal} checked={chekedVal.add} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="checkInd" id="mod" onChange={handleChangeChekedVal} checked={chekedVal.mod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="checkInd" id="sup" onChange={handleChangeChekedVal} checked={chekedVal.sup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="checkInd" id="exe" onChange={handleChangeChekedVal} checked={chekedVal.exe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="checkInd" id="consult" onChange={handleChangeChekedVal} checked={chekedVal.consult} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="allSelect" id="allSelect" onChange={handleChangeChekedVal} checked={chekedVal.allSelect}
              /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Master Data</span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2 spanRowResp">Périodes & années de référence</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="period" id="periodAdd" onChange={handleChangeChekedValPeriode} checked={chekedValPeriode.periodAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="period" id="periodMod" onChange={handleChangeChekedValPeriode} checked={chekedValPeriode.periodMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="period" id="periodSup" onChange={handleChangeChekedValPeriode} checked={chekedValPeriode.periodSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="period" id="periodExe" onChange={handleChangeChekedValPeriode} checked={chekedValPeriode.periodExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="period" id="periodCons" onChange={handleChangeChekedValPeriode} checked={chekedValPeriode.periodCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="period" id="periodAll" onChange={handleChangeChekedValPeriode} checked={chekedValPeriode.periodAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Rappels</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="rappelIn" id="rappelAdd" onChange={handleChangeChekedValRappel} checked={chekedValRappel.rappelAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="rappelIn" id="rappelMod" onChange={handleChangeChekedValRappel} checked={chekedValRappel.rappelMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="rappelIn" id="rappelSup" onChange={handleChangeChekedValRappel} checked={chekedValRappel.rappelSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="rappelIn" id="rappelExe" onChange={handleChangeChekedValRappel} checked={chekedValRappel.rappelExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="rappelIn" id="rappelCons" onChange={handleChangeChekedValRappel} checked={chekedValRappel.rappelCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="rappelIn" id="rappelAll" onChange={handleChangeChekedValRappel} checked={chekedValRappel.rappelAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Entités</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="entite" id="entiteAdd" onChange={handleChangeChekedValEntite} checked={chekedValEntite.entiteAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="entite" id="entiteMod" onChange={handleChangeChekedValEntite} checked={chekedValEntite.entiteMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="entite" id="entiteSup" onChange={handleChangeChekedValEntite} checked={chekedValEntite.entiteSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="entite" id="entiteExe" onChange={handleChangeChekedValEntite} checked={chekedValEntite.entiteExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="entite" id="entiteCons" onChange={handleChangeChekedValEntite} checked={chekedValEntite.entiteCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="entite" id="entiteAll" onChange={handleChangeChekedValEntite} checked={chekedValEntite.entiteAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Systèmes source</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="sys" id="sysAdd" onChange={handleChangeChekedValSys} checked={chekedValSys.sysAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="sys" id="sysMod" onChange={handleChangeChekedValSys} checked={chekedValSys.sysMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="sys" id="sysSup" onChange={handleChangeChekedValSys} checked={chekedValSys.sysSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="sys" id="sysExe" onChange={handleChangeChekedValSys} checked={chekedValSys.sysExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="sys" id="sysCons" onChange={handleChangeChekedValSys} checked={chekedValSys.sysCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="sys" id="sysAll" onChange={handleChangeChekedValSys} checked={chekedValSys.sysAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Groupes Indicateur</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="grpInd" id="grpIndAdd" onChange={handleChangeChekedValGrpInd} checked={chekedValGrpInd.grpIndAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="grpInd" id="grpIndMod" onChange={handleChangeChekedValGrpInd} checked={chekedValGrpInd.grpIndMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="grpInd" id="grpIndSup" onChange={handleChangeChekedValGrpInd} checked={chekedValGrpInd.grpIndSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="grpInd" id="grpIndExe" onChange={handleChangeChekedValGrpInd} checked={chekedValGrpInd.grpIndExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="grpInd" id="grpIndCons" onChange={handleChangeChekedValGrpInd} checked={chekedValGrpInd.grpIndCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="grpInd" id="grpIndAll" onChange={handleChangeChekedValGrpInd} checked={chekedValGrpInd.grpIndAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Affectations</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="affectation" id="affectAdd" onChange={handleChangeChekedValAffect} checked={chekedValAffect.affectAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="affectation" id="affectMod" onChange={handleChangeChekedValAffect} checked={chekedValAffect.affectMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="affectation" id="affectSup" onChange={handleChangeChekedValAffect} checked={chekedValAffect.affectSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="affectation" id="affectExe" onChange={handleChangeChekedValAffect} checked={chekedValAffect.affectExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="affectation" id="affectCons" onChange={handleChangeChekedValAffect} checked={chekedValAffect.affectCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="affectation" id="affectAll" onChange={handleChangeChekedValAffect} checked={chekedValAffect.affectAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Catégories</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="categ" id="catAdd" onChange={handleChangeChekedValCateg} checked={chekedValCateg.catAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="categ" id="catMod" onChange={handleChangeChekedValCateg} checked={chekedValCateg.catMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="categ" id="catSup" onChange={handleChangeChekedValCateg} checked={chekedValCateg.catSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="categ" id="catExe" onChange={handleChangeChekedValCateg} checked={chekedValCateg.catExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="categ" id="catCons" onChange={handleChangeChekedValCateg} checked={chekedValCateg.catCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="categ" id="catAll" onChange={handleChangeChekedValCateg} checked={chekedValCateg.catAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Règles de Contrôle</span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2"></span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="rglCtrl" id="regleAdd" onChange={handleChangeChekedValReglCntr} checked={chekedValReglCntr.regleAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="rglCtrl" id="regleMod" onChange={handleChangeChekedValReglCntr} checked={chekedValReglCntr.regleMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="rglCtrl" id="regleSup" onChange={handleChangeChekedValReglCntr} checked={chekedValReglCntr.regleSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="rglCtrl" id="regleExe" onChange={handleChangeChekedValReglCntr} checked={chekedValReglCntr.regleExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="rglCtrl" id="regleCons" onChange={handleChangeChekedValReglCntr} checked={chekedValReglCntr.regleCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="rglCtrl" id="regleAll" onChange={handleChangeChekedValReglCntr} checked={chekedValReglCntr.regleAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4 divBorder1">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2">Evaluations</span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="eval" id="evalAdd" onChange={handleChangeChekedValEval} checked={chekedValEval.evalAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="eval" id="evalMod" onChange={handleChangeChekedValEval} checked={chekedValEval.evalMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="eval" id="evalSup" onChange={handleChangeChekedValEval} checked={chekedValEval.evalSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="eval" id="evalExe" onChange={handleChangeChekedValEval} checked={chekedValEval.evalExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="eval" id="evalCons" onChange={handleChangeChekedValEval} checked={chekedValEval.evalCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="eval" id="evalAll" onChange={handleChangeChekedValEval} checked={chekedValEval.evalAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2">SAISIE INDICATEURS</span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Saisie Réalisé</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="saisieInd" id="saisieIndAdd" onChange={handleChangeChekedValSaisieInd} checked={chekedValSaisieInd.saisieIndAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="saisieInd" id="saisieIndMod" onChange={handleChangeChekedValSaisieInd} checked={chekedValSaisieInd.saisieIndMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="saisieInd" id="saisieIndSup" onChange={handleChangeChekedValSaisieInd} checked={chekedValSaisieInd.saisieIndSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="saisieInd" id="saisieIndExe" onChange={handleChangeChekedValSaisieInd} checked={chekedValSaisieInd.saisieIndExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="saisieInd" id="saisieIndCons" onChange={handleChangeChekedValSaisieInd} checked={chekedValSaisieInd.saisieIndCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="saisieInd" id="saisieIndAll" onChange={handleChangeChekedValSaisieInd} checked={chekedValSaisieInd.saisieIndAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Saisie Arrêté et Budget</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="saisieArretBud" id="saisieArretBudAdd" onChange={handleChangeChekedValSaisieArretBud} checked={chekedValSaisieArretBud.saisieArretBudAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="saisieArretBud" id="saisieArretBudMod" onChange={handleChangeChekedValSaisieArretBud} checked={chekedValSaisieArretBud.saisieArretBudMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="saisieArretBud" id="saisieArretBudSup" onChange={handleChangeChekedValSaisieArretBud} checked={chekedValSaisieArretBud.saisieArretBudSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="saisieArretBud" id="saisieArretBudExe" onChange={handleChangeChekedValSaisieArretBud} checked={chekedValSaisieArretBud.saisieArretBudExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="saisieArretBud" id="saisieArretBudCons" onChange={handleChangeChekedValSaisieArretBud} checked={chekedValSaisieArretBud.saisieArretBudCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="saisieArretBud" id="saisieArretBudAll" onChange={handleChangeChekedValSaisieArretBud} checked={chekedValSaisieArretBud.saisieArretBudAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Import</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="imp" id="impAdd" onChange={handleChangeChekedValImpo} checked={chekedValImpo.impAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="imp" id="impMod" onChange={handleChangeChekedValImpo} checked={chekedValImpo.impMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="imp" id="impSup" onChange={handleChangeChekedValImpo} checked={chekedValImpo.impSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="imp" id="impExe" onChange={handleChangeChekedValImpo} checked={chekedValImpo.impExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="imp" id="impCons" onChange={handleChangeChekedValImpo} checked={chekedValImpo.impCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="imp" id="impAll" onChange={handleChangeChekedValImpo} checked={chekedValImpo.impAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4 divBorder1">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2">Estimation</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="estim" id="estimAdd" onChange={handleChangeChekedValEstim} checked={chekedValEstim.estimAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="estim" id="estimMod" onChange={handleChangeChekedValEstim} checked={chekedValEstim.estimMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="estim" id="estimSup" onChange={handleChangeChekedValEstim} checked={chekedValEstim.estimSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="estim" id="estimExe" onChange={handleChangeChekedValEstim} checked={chekedValEstim.estimExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="estim" id="estimCons" onChange={handleChangeChekedValEstim} checked={chekedValEstim.estimCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="estim" id="estimAll" onChange={handleChangeChekedValEstim} checked={chekedValEstim.estimAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2">RAPPORTS</span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Consultation</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="consultation" id="consultationAdd" onChange={handleChangeChekedValConsult} checked={chekedValConst.consultationAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="consultation" id="consultationMod" onChange={handleChangeChekedValConsult} checked={chekedValConst.consultationMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="consultation" id="consultationSup" onChange={handleChangeChekedValConsult} checked={chekedValConst.consultationSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="consultation" id="consultationExe" onChange={handleChangeChekedValConsult} checked={chekedValConst.consultationExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="consultation" id="consultationCons" onChange={handleChangeChekedValConsult} checked={chekedValConst.consultationCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="consultation" id="consultationAll" onChange={handleChangeChekedValConsult} checked={chekedValConst.consultationAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Monitoring</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="monitoring" id="monitoringAdd" onChange={handleChangeChekedValMonitoring} checked={chekedValMonitoring.monitoringAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="monitoring" id="monitoringMod" onChange={handleChangeChekedValMonitoring} checked={chekedValMonitoring.monitoringMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="monitoring" id="monitoringSup" onChange={handleChangeChekedValMonitoring} checked={chekedValMonitoring.monitoringSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="monitoring" id="monitoringExe" onChange={handleChangeChekedValMonitoring} checked={chekedValMonitoring.monitoringExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="monitoring" id="monitoringCons" onChange={handleChangeChekedValMonitoring} checked={chekedValMonitoring.monitoringCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="monitoring" id="monitoringAll" onChange={handleChangeChekedValMonitoring} checked={chekedValMonitoring.monitoringAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4 divBorder1">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2">Audit</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="audit" id="auditAdd" onChange={handleChangeChekedValAudit} checked={chekedValAudit.auditAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="audit" id="auditMod" onChange={handleChangeChekedValAudit} checked={chekedValAudit.auditMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="audit" id="auditSup" onChange={handleChangeChekedValAudit} checked={chekedValAudit.auditSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="audit" id="auditExe" onChange={handleChangeChekedValAudit} checked={chekedValAudit.auditExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="audit" id="auditCons" onChange={handleChangeChekedValAudit} checked={chekedValAudit.auditCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="audit" id="auditAll" onChange={handleChangeChekedValAudit} checked={chekedValAudit.auditAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2">GESTION ACCES</span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 divBorder1"><span className="spanRow2">Gestion des utlisateurs</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="gestUser" id="gestUserAdd" onChange={handleChangeChekedValGestUser} checked={chekedValGestUser.gestUserAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="gestUser" id="gestUserMod" onChange={handleChangeChekedValGestUser} checked={chekedValGestUser.gestUserMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="gestUser" id="gestUserSup" onChange={handleChangeChekedValGestUser} checked={chekedValGestUser.gestUserSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="gestUser" id="gestUserExe" onChange={handleChangeChekedValGestUser} checked={chekedValGestUser.gestUserExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="gestUser" id="gestUserCons" onChange={handleChangeChekedValGestUser} checked={chekedValGestUser.gestUserCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="gestUser" id="gestUserAll" onChange={handleChangeChekedValGestUser} checked={chekedValGestUser.gestUserAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2">
            <div className="d-flex col-md-4 divBorder1">
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2"></span></div>
              <div className="form-group col-md-4"><span className="spanRow2">Gestion des Rôles</span></div>
            </div>
            <div className="d-flex col-md-8 divBorder">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="gestRole" id="gestRoleAdd" onChange={handleChangeChekedValGestRole} checked={chekedValGestRole.gestRoleAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="gestRole" id="gestRoleMod" onChange={handleChangeChekedValGestRole} checked={chekedValGestRole.gestRoleMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="gestRole" id="gestRoleSup" onChange={handleChangeChekedValGestRole} checked={chekedValGestRole.gestRoleSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="gestRole" id="gestRoleExe" onChange={handleChangeChekedValGestRole} checked={chekedValGestRole.gestRoleExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="gestRole" id="gestRoleCons" onChange={handleChangeChekedValGestRole} checked={chekedValGestRole.gestRoleCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="gestRole" id="gestRoleAll" onChange={handleChangeChekedValGestRole} checked={chekedValGestRole.gestRoleAll} /></div>
            </div>
          </div>

          <div className="d-flex Row2 divBorder1">
            <div className="d-flex col-md-4">
              <div className="form-group col-md-4"><span className="spanRow2">DASHBOARD</span></div>
              <div className="form-group col-md-4 "><span className="spanRow2"></span></div>
              <div className="form-group col-md-4 "><span className="spanRow2"></span></div>
            </div>
            <div className="d-flex col-md-8">
              <div className="form-group col-md-1 colInRow1"><input type="checkbox" name="dash" id="dashAdd" onChange={handleChangeChekedValDash} checked={chekedValDash.dashAdd} /></div>
              <div className="form-group col-md-2 colInRow2"><input type="checkbox" name="dash" id="dashMod" onChange={handleChangeChekedValDash} checked={chekedValDash.dashMod} /></div>
              <div className="form-group col-md-2 colInRow3"><input type="checkbox" name="dash" id="dashSup" onChange={handleChangeChekedValDash} checked={chekedValDash.dashSup} /></div>
              <div className="form-group col-md-2 colInRow4"><input type="checkbox" name="dash" id="dashExe" onChange={handleChangeChekedValDash} checked={chekedValDash.dashExe} /></div>
              <div className="form-group col-md-2 colInRow5"><input type="checkbox" name="dash" id="dashCons" onChange={handleChangeChekedValDash} checked={chekedValDash.dashCons} /></div>
              <div className="form-group col-md-3 colInRow6"><input type="checkbox" name="dash" id="dashAll" onChange={handleChangeChekedValDash} checked={chekedValDash.dashAll} /></div>
            </div>
          </div>

          <div className="btnClsThree btnTwoCls">

            <button
              onClick={e => handlerInputType(e)}
              className={`reset`}
            >
              ANNULER
            </button>
            {isLoading ? (
              <div className="progress">
                <CircularProgress style={{ color: "#C82345" }} />
              </div>
            ) : (
              <button className="submit" onClick={onSubmit}>
                ENREGISTRER
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRole;
