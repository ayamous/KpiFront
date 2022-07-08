import { CircularProgress } from "@mui/material";
import { ChangeEvent, useState, MouseEvent, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../../../services/axiosConfig";
import { IReminder } from "../../Interfaces/IReminder";

let isInitial = true;
const FormRappel = () => {
let history = useHistory();
const [isLoading, setLoading] = useState<Boolean>(false);
const [classNameActif, setClassNameActif] = useState("actif");




const inputRef = useRef(null);
const handlerAnnuler = (event: MouseEvent) => {
  // setCountDay((prevState: any) => ({
  //   ...prevState,
  //   ["reminderDay"]: remindersData[0]?.reminderDay 
  // }))
  console.log("annuler btn",remindersData[0]?.reminderDay)
  //@ts-ignore
  //inputRef.current.value = "";
  setCountDay(remindersData[0]?.reminderDay)
  setCountNumDure(remindersData[0]?.reminderDuration)
 
  
}

const [countDay, setCountDay] = useState(0);
const incrementCountDay = () => {
  if(countDay <9){
    setCountDay(countDay + 1);
  }
  
};
const dIncrementCountDay = () => {
  if(countDay >=1){
    setCountDay(countDay - 1);
  }
  
};

const onChange = (e: ChangeEvent<HTMLInputElement>)=> {
  const newValue = e.target.value;
  
  if(Number(newValue) <9 && Number(newValue) > 1 ){
    setCountDay(Number(newValue))
  }
  console.log(newValue,"newValue")
}




//Day
// const [countDay, setCountDay] = useState<any>(0);
// const [dayNum, setDayNum] = useState<string>();
// const handleCountDay = (e: ChangeEvent<HTMLInputElement>)=>{
//   setDayNum(e.currentTarget.value);
//   setCountDay(Number(dayNum) + 1)
// }

  //Rappelsduration
  // const [countNumDure, setCountNumDure] = useState<any>(0);
  // const [reminderDuration, setCountDuree] = useState<string>();
  // const handleCountReminderDay = (e: ChangeEvent<HTMLInputElement>)=>{
  //   setCountDuree(e.currentTarget.value);
  //   setCountNumDure(Number(reminderDuration) + 1)
  // }

const [countNumDure, setCountNumDure] = useState(0);
const incrementCountReminderDay = () => {
  if(countNumDure <200){
    setCountNumDure(countNumDure + 1);
  }
};
const dIncrementCountReminderDay = () => {
  if(countNumDure >=1){
    setCountNumDure(countNumDure - 1);
  }
};

const onChangeDIncrement = (e: ChangeEvent<HTMLInputElement>)=> {
  const newValueD = e.target.value;
  if(Number(newValueD) < 200 && Number(newValueD) >= 1 ){
    setCountNumDure(Number(newValueD))
  }
  console.log(newValueD,"newValue")
}
  const[id, setID]= useState();
  const [remindersData, stateRemindersData]=useState<IReminder[]|any>([]);
  const rappel={
    reminderDay:countDay,
    reminderDuration:countNumDure
  }
  
  const rappelGet={
    id:id,
    reminderDay: countDay,
    reminderDuration: countNumDure
  }
  
useEffect(()=>{
  console.log("remindersData 2", remindersData)
},[remindersData])

console.log("remindersData 33", remindersData)

const onSubmit = (event: MouseEvent) => {
  event.preventDefault();
  setLoading(true);
  if(isInitial){
    axiosInstance.post('reminders', rappel)
      .then((res) => {
          setLoading(false);
          toast.success('les données ont été enregistrées avec succès');
          history.push("/rappel");
      })
      .catch((err) => {
          setLoading(false);
          if(err.response?.status === 409){
            toast.error('il existe déjà ');
        }else{
            toast.error('Erreur! données non enregistrées');
        }
      })
  }
  else{
    axiosInstance.put(`reminders/${id}`, rappelGet)
      .then((res) => {
          setLoading(false);
          toast.success('les données ont été modifier avec succès');
          history.push("/rappel");
         
      })
      .catch((err) => {
          setLoading(false);
          toast.error('Erreur! données non enregistrées');
      })
  }
  };
   
useEffect(() => {
  axiosInstance.get('/reminders')
      .then((res) => {
        console.log("reminders res 2 id", res.data[0].id)
        console.log(res.data.length!=0,'isInitial2', isInitial)
        if(res.data.length!=0){
          isInitial=false
          console.log('isInitial2', isInitial)
        }
        
          const content =res.data;
          console.log("content.content", content)
            stateRemindersData(content)
            setID(res.data[0]?.id)
            setCountDay(res.data[0]?.reminderDay)
            setCountNumDure(res.data[0]?.reminderDuration)
      })
}, []);

  return (
    <div className="app">
        <div className="formCls">
          <Toaster/>
          <div className="d-flex justify-content-between contenuBtnUrl">
            <div className="form-field">
              <span className="titleEntite">LES RAPPELS</span>
            </div>
          </div>
          <div className="formlistAdd">
          {remindersData?
          <>
          <div className="divIncr">
          <div className="d-flex">
          <span className="spanIncr">Jour de rappel par rapport au délai de production :</span> 
          <div className="form-field d-flex divInputInc">
          <img className="imgIncr" src="../assets/images/minus.svg" alt="ActiverInactive" onClick={dIncrementCountDay}/>
         <input type="number" min="1" max="9" id="num" className="form-control incrementIn" value={countDay}  onChange={onChange} ref={inputRef}/>
          <img className="imgIncr" src="../assets/images/addCalendar.svg" alt="ActiverInactive"  onClick={incrementCountDay}/>
        </div>
          </div>
        <div className="d-flex">
          <span className="spanIncr">Durée des rappels en jour :</span>
          <div className="form-field d-flex divInputInc">
          <img className="imgIncr" src="../assets/images/minus.svg" alt="ActiverInactive" onClick={dIncrementCountReminderDay}/>
          <input type="number" min="1" max="200" id="num" className="form-control incrementIn"   
                  value={countNumDure} onChange={onChangeDIncrement}/>
          <img className="imgIncr" src="../assets/images/addCalendar.svg" alt="ActiverInactive" onClick={incrementCountReminderDay}/>
        </div>
          </div>
          </div>
        </>
        :null}
        <div className="btnCls btnClsRappel">
                <button  onClick={handlerAnnuler}  className= {`reset ${classNameActif}`}>ANNULER</button>
                {isLoading ? <div className="progress"><CircularProgress style={{ 'color': '#C82345' }} /></div>
                    : <button className="submit" onClick={onSubmit}>ENREGISTRER</button>}
      </div>
            
          </div>
        </div>
      </div>
  );
};
export default FormRappel;


