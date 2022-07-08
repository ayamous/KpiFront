import { ChangeEvent, MouseEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axiosInstance from "../../../services/axiosConfig";
import moment from "moment"
import { IPeriode } from "../../Interfaces/IPeriode";
//curent
let isInitial = true;
const FormPeriodeList = () => {
  const [periodeData, statePeriodeData] = useState<IPeriode[] | any>([]);

  const [versionBudget, setVersionBudget] = useState<string>("Budget");
  const [versionRealise, setVersionRealise] = useState<string>("Realised");
  const [versionEstime, setVersionEstime] = useState<string>("Estimated");
  const [versionArrete, setVersionArrete] = useState<string>("Stopped");

  const [idBudget, setIDBudget] = useState();
  const [idRealise, setIDRealise] = useState();
  const [idEstime, setIDEstime] = useState();
  const [idArrete, setIDArrete] = useState();
  const [id, setID] = useState();

  const handleChangeVersionBudget = (e: ChangeEvent<HTMLInputElement>) => {
    setVersionBudget(e.currentTarget.value);
  }
  const handleChangeVersionRealise = (e: ChangeEvent<HTMLInputElement>) => {
    setVersionRealise(e.currentTarget.value);
  }
  const handleChangeVersionEstime = (e: ChangeEvent<HTMLInputElement>) => {
    setVersionEstime(e.currentTarget.value);
  }
  const handleChangeVersionArrete = (e: ChangeEvent<HTMLInputElement>) => {
    setVersionArrete(e.currentTarget.value);
  }

  let history = useHistory();
  const [isLoading, setLoading] = useState<Boolean>(false);
  const [classNameActif, setClassNameActif] = useState("actif");
  //budget

  const [checkedValueInactiveBudget, setCheckedValueInactiveBudget] = useState<string>("Inactive");
  console.log("periodeData.status", checkedValueInactiveBudget)

  const handlerCheckboxInactiveBudget = (e: any): void => {
    if (e.currentTarget.value == "Active") {
      setCheckedValueInactiveBudget("Inactive");
    } else {
      setCheckedValueInactiveBudget("Active");
    }
  };

  //realiser
  const [checkedValueInactiveRealise, setCheckedValueInactiveRealise] = useState<string>("Inactive");
  const handlerCheckboxInactiveRealise = (e: any): void => {
    if (e.currentTarget.value == "Active") {
      setCheckedValueInactiveRealise("Inactive");
    } else {
      setCheckedValueInactiveRealise("Active");
    }
  };

  //estime
  const [checkedValueInactiveEstime, setCheckedValueInactiveEstime] = useState<string>("Inactive");
  const handlerCheckboxInactiveEstime = (e: any): void => {
    if (e.currentTarget.value == "Active") {
      setCheckedValueInactiveEstime("Inactive");
    } else {
      setCheckedValueInactiveEstime("Active");
    }
  };

  //arrete
  const [checkedValueInactiveArrete, setCheckedValueInactiveArrete] = useState<string>("Inactive");
  const handlerCheckboxInactiveArrete = (e: any): void => {
    if (e.currentTarget.value == "Active") {
      setCheckedValueInactiveArrete("Inactive");
    } else {
      setCheckedValueInactiveArrete("Active");
    }
  };

  const [valueDeBudget, setValueDeBudget] = useState<Date | any>(null);
  let valueDeBudgetF = moment(valueDeBudget).format('yyy-MM-DD')

  const [valueABudget, setValueABudget] = useState<Date | any>(null);
  let valueABudgetF = moment(valueABudget).format('yyy-MM-DD')

  const [valueDeRealise, setValueDeRealise] = useState<Date | any>(null);
  let valueDeRealiseF = moment(valueDeRealise).format('yyy-MM-DD')

  const [valueARealise, setValueARealise] = useState<Date | any>(null);
  let valueARealiseF = moment(valueARealise).format('yyy-MM-DD')

  const [valueDeEstime, setValueDeEstime] = useState<Date | any>(null);
  let valueDeEstimeF = moment(valueDeEstime).format('yyy-MM-DD')

  const [valueAEstime, setValueAEstime] = useState<Date | any>(null);
  let valueAEstimeF = moment(valueAEstime).format('yyy-MM-DD')

  const [valueDeArrete, setValueDeArrete] = useState<Date | any>(null);
  let valueDeArreteF = moment(valueDeArrete).format('yyy-MM-DD')

  const [valueAArrete, setValueAArrete] = useState<Date | any>(null);
  let valueAArreteF = moment(valueAArrete).format('yyy-MM-DD')

  const [yearRef1, setValueButton] = useState<any>();
  const handleChangeValueButton = (e: ChangeEvent<HTMLButtonElement>) => {
    setValueButton(e.currentTarget);
    
  }
  const handleChangeValueButtonNull = (e: ChangeEvent<HTMLButtonElement>) => {
    setValueButton(null);
  }

  const handleClickTNull = (e: SyntheticEvent<HTMLButtonElement>) => {
    setValueButtonT(null);
    setShowCalendarStyleTwo("divCalendarTwo")
    setShowInputCalendar("dCalendarTwo")
  };
  const handleClick = (e: SyntheticEvent<HTMLButtonElement>) => {
    setValueButton(e.currentTarget.value);
    setShowCalendarStyle("divCalendar")
  };

  const [yearRefT, setValueButtonT] = useState<any>();//"N-3"
  const handleChangeValueButtonT = (e: ChangeEvent<HTMLButtonElement>) => {
    setValueButtonT(e.currentTarget);
  }
  const handleClickT = (e: SyntheticEvent<HTMLButtonElement>) => {
    setValueButtonT(e.currentTarget.value);
    setShowCalendarStyleTwo("divCalendarTwo")
  };

  const [showCalendarStyle, setShowCalendarStyle] = useState<string>("divCalendar")
  const showFlesh = (event: MouseEvent) => {
    if (showCalendarStyle == "divCalendar") {
      setShowCalendarStyle("divCalendarNone")
    } else {
      setShowCalendarStyle("divCalendar")
    }
  }

  const [showCalendarStyleTwo, setShowCalendarStyleTwo] = useState<string>("divCalendarTwo")
  const showFleshTwo = (event: MouseEvent) => {
    if (showCalendarStyleTwo == "divCalendarTwo") {
      setShowCalendarStyleTwo("divCalendarNoneTwo")
    } else {
      setShowCalendarStyleTwo("divCalendarTwo")
    }
  }

  const [showInputCalendar, setShowInputCalendar] = useState<string>("dCalendarTwo")
  const showInputCalendarTwo = (event: MouseEvent) => {
    setShowInputCalendar("dCalendarTwoShow")
   
  }

  const periode = {
    lines: [
      {
        version: versionBudget,
        from: valueDeBudgetF,
        to: valueABudgetF,
        status: checkedValueInactiveBudget
      },
      {
        version: versionRealise,
        from: valueDeRealiseF,
        to: valueARealiseF,
        status: checkedValueInactiveRealise
      },
      {
        version: versionEstime,
        from: valueDeEstimeF,
        to: valueAEstimeF,
        status: checkedValueInactiveEstime
      },
      {
        version: versionArrete,
        from: valueDeArreteF,
        to: valueAArreteF,
        status: checkedValueInactiveArrete
      }
    ],
    yearRef1: yearRef1,
    yearRef2: yearRefT,
  }

  const periodeGet = {
    lines: [
      {
        id: idBudget,
        version: versionBudget,
        from: valueDeBudgetF,
        to: valueABudgetF,
        status: checkedValueInactiveBudget
      },
      {
        id: idRealise,
        version: versionRealise,
        from: valueDeRealiseF,
        to: valueARealiseF,
        status: checkedValueInactiveRealise
      },
      {
        id: idEstime,
        version: versionEstime,
        from: valueDeEstimeF,
        to: valueAEstimeF,
        status: checkedValueInactiveEstime
      },
      {
        id: idArrete,
        version: versionArrete,
        from: valueDeArreteF,
        to: valueAArreteF,
        status: checkedValueInactiveArrete
      }
    ],
    id: id,
    yearRef1: yearRef1,
    yearRef2: yearRefT,
  }

  //console.log("valueDeBudget valueDeBudget", valueDeBudget)

  const onSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setLoading(true);
    
    //console.log('isInitial', isInitial)
    if (isInitial) {
      if(valueDeBudget > valueABudget || valueDeRealise >  valueARealise ||  valueDeEstime > valueAEstime || valueDeArrete > valueAArrete){
        setLoading(false);
        toast.error('Saisie invalide. Données non enregistrées');
      }else{
        axiosInstance.post('periods', periode)
        .then((res) => {
          setLoading(false);
          toast.success('les données ont été enregistrées avec succès');
          history.push("/periodes");
        })  
      }
    }
    else{
      if(valueDeBudget > valueABudget || valueDeRealise >  valueARealise ||  valueDeEstime > valueAEstime || valueDeArrete > valueAArrete){
        setLoading(false);
        toast.error('Saisie invalide. Données non enregistrées');
      }else{
        axiosInstance.put(`periods/${id}`, periodeGet)
        .then((res) => {
          setLoading(false);
          toast.success('les données ont été modifier avec succès');
          history.push("/periodes");
        })
      }
    }
  };

  const handlerInputType = (e:React.MouseEvent<HTMLElement>) : void => { 
    history.go(0);
  };

  useEffect(() => {
    console.log("periodeData 2", periodeData)
  }, [periodeData])


  useEffect(() => {
    axiosInstance.get('/periods')
      .then((res) => {
        console.log("periodss res 2 id", res.data[0].id)
        console.log(res.data.length != 0, 'isInitial2', isInitial)
        if (res.data.length != 0) {
          isInitial = false
          console.log('isInitial2', isInitial)
        }

        const content = res.data;
        //setValueABudget(content.lines)
        statePeriodeData(content)

        setIDBudget(res.data[0]?.lines[0]?.id)
        setValueDeBudget(res.data[0]?.lines[0]?.from)
        setValueABudget(res.data[0]?.lines[0]?.to)
        if (res.data[0]?.lines[0]?.status == "Active" || res.data[0]?.lines[0]?.status == "Inactive") {
          setCheckedValueInactiveBudget(res.data[0]?.lines[0]?.status)
        }

        setIDRealise(res.data[0]?.lines[1]?.id)
        setValueDeRealise(res.data[0]?.lines[1]?.from)
        setValueARealise(res.data[0]?.lines[1]?.to)
        if (res.data[0]?.lines[1]?.status == "Active" || res.data[0]?.lines[1]?.status == "Inactive") {
          setCheckedValueInactiveRealise(res.data[0]?.lines[1]?.status)
        }

        setIDEstime(res.data[0]?.lines[2]?.id)
        setValueDeEstime(res.data[0]?.lines[2]?.from)
        setValueAEstime(res.data[0]?.lines[2]?.to)
        if (res.data[0]?.lines[2]?.status == "Active" || res.data[0]?.lines[2]?.status == "Inactive") {
          setCheckedValueInactiveEstime(res.data[0]?.lines[2]?.status)
        }

        setIDArrete(res.data[0]?.lines[3]?.id)
        setValueDeArrete(res.data[0]?.lines[3]?.from)
        setValueAArrete(res.data[0]?.lines[3]?.to)
        if (res.data[0]?.lines[3]?.status == "Active" || res.data[0]?.lines[3]?.status == "Inactive") {
          setCheckedValueInactiveArrete(res.data[0]?.lines[3]?.status)
        }

        setID(res.data[0]?.id)
        setValueButton(res.data[0]?.yearRef1)
        setValueButtonT(res.data[0]?.yearRef2)

      })
  }, []);
  
  const showClick = (event: MouseEvent) => {
   console.log("hh")
   if (showCalendarStyleTwo == "divCalendarNoneTwo") {
    setShowCalendarStyleTwo("divCalendarTwo")
  } 
  if (showCalendarStyle == "divCalendarNone") {
    setShowCalendarStyle("divCalendar")
  } 
  }

  const currentDate = new Date();
  // const dateDay = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
  const dateDay = `${currentDate.getFullYear()}/${currentDate.getMonth()+1}/${currentDate.getDate()}`;
  var lDay = dateDay.split('/').splice(0, 5).join(',');
  console.log("dateDay", lDay.slice(0, 4))
  let numLdate:any = lDay.slice(0, 4) 
  // minDate={new Date(2012,0,1)}
  console.log("numLdate :",Number( numLdate - 10))
  //@ts-ignore
  let minDateMinus = (numLdate,0,1)
  

  return (
    <div className="app" onClick={showClick}>
      <div className="formCls" >
        <Toaster />
        <div className="d-flex justify-content-between contenuBtn">
          <div className="form-field">
            <span className="titleEntiteWL">PÉRIODES</span>
          </div>
        </div>
        <div className="formlist periodeStyle">
          <table>
            <thead>
              <tr>
                <th>Version</th>
                <th>De</th>
                <th>à</th>
                <th>Etat</th>
              </tr>
            </thead>
            <tbody>
              <tr className="trPeriod">
                <td>
                  <input type="text" className="changeInVersionPrd" value={versionBudget} onChange={handleChangeVersionBudget} />
                </td>
                {periodeData ?
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        className="datePick"
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date(2012,0,1)}
                        maxDate={new Date(lDay)}
                        value={valueDeBudget}
                        onChange={(newValue) => {
                          setValueDeBudget(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  : null}
                {periodeData ?
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date(2022,0,1) }
                        maxDate={new Date(2032,0,1) }
                        value={valueABudget}
                        onChange={(newValue) => {
                          setValueABudget(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  : null}
                <td>
                  <div className="imgCls d-flex justify-content-between divActiv">
                    <button value={checkedValueInactiveBudget?.toString()} onClick={(e: React.MouseEvent<HTMLElement>) => handlerCheckboxInactiveBudget(e)}
                      className={checkedValueInactiveBudget === "Inactive" ? "omct" : "omctActive"} type="button" aria-label="add">
                      <span>{checkedValueInactiveBudget === "Inactive" ? "Inactive" : "Active"}</span>
                      <img src={checkedValueInactiveBudget === "Inactive" ? "../assets/images/cercle.svg" : "../assets/images/cercleActive.svg"} alt="ActiverInactive" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="text" className="changeInVersionPrd" value={versionRealise} onChange={handleChangeVersionRealise} />
                </td>
                {periodeData ?
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date(2012,0,1)}
                        maxDate={new Date(lDay)}
                        value={valueDeRealise}
                        onChange={(newValue) => {
                          setValueDeRealise(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  : null}
                {periodeData ?
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date(2022,0,1) }
                        maxDate={new Date(2032,0,1) }
                        value={valueARealise}
                        onChange={(newValue) => {
                          setValueARealise(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  : null}
                {periodeData ?
                  <td>
                    <div className="imgCls d-flex justify-content-between divActiv">
                      <button value={checkedValueInactiveRealise?.toString()} onClick={(e: React.MouseEvent<HTMLElement>) => handlerCheckboxInactiveRealise(e)}
                        className={checkedValueInactiveRealise === "Inactive" ? "omct" : "omctActive"} type="button" aria-label="add">
                        <span>{checkedValueInactiveRealise === "Inactive" ? "Inactive" : "Active"}</span>
                        <img src={checkedValueInactiveRealise === "Inactive" ? "../assets/images/cercle.svg" : "../assets/images/cercleActive.svg"} alt="ActiverInactive" />
                      </button>
                    </div>
                  </td>
                  : null}
              </tr>
              <tr>

                <td>
                  <input type="text" className="changeInVersionPrd" value={versionEstime} onChange={handleChangeVersionEstime} />
                </td>
                {periodeData ?
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date(2012,0,1)}
                        maxDate={new Date(lDay)}
                        value={valueDeEstime}
                        onChange={(newValue) => {
                          setValueDeEstime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  : null}
                {periodeData ?
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date(2022,0,1) }
                        maxDate={new Date(2032,0,1) }
                        value={valueAEstime}
                        onChange={(newValue) => {
                          setValueAEstime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  : null}
                {periodeData ?
                  <td>
                    <div className="imgCls d-flex justify-content-between divActiv">
                      <button value={checkedValueInactiveEstime?.toString()} onClick={(e: React.MouseEvent<HTMLElement>) => handlerCheckboxInactiveEstime(e)}
                        className={checkedValueInactiveEstime === "Inactive" ? "omct" : "omctActive"} type="button" aria-label="add">
                        <span>{checkedValueInactiveEstime === "Inactive" ? "Inactive" : "Active"}</span>
                        <img src={checkedValueInactiveEstime === "Inactive" ? "../assets/images/cercle.svg" : "../assets/images/cercleActive.svg"} alt="ActiverInactive" />
                      </button>
                    </div>
                  </td>
                  : null}
              </tr>
              <tr>
                <td>
                  <input type="text" className="changeInVersionPrd" value={versionArrete} onChange={handleChangeVersionArrete} />
                </td>
                {periodeData ?
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date(2012,0,1)}
                        maxDate={new Date(lDay)}
                        value={valueDeArrete}
                        onChange={(newValue) => {
                          setValueDeArrete(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  : null}
                {periodeData ?
                  <td>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        minDate={new Date(2022,0,1) }
                        maxDate={new Date(2032,0,1) }
                        value={valueAArrete}
                        onChange={(newValue) => {
                          setValueAArrete(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  : null}
                {periodeData ?
                  <td>
                    <div className="imgCls d-flex justify-content-between divActiv">
                      <button value={checkedValueInactiveArrete?.toString()} onClick={(e: React.MouseEvent<HTMLElement>) => handlerCheckboxInactiveArrete(e)}
                        className={checkedValueInactiveArrete === "Inactive" ? "omct" : "omctActive"} type="button" aria-label="add">
                        <span>{checkedValueInactiveArrete === "Inactive" ? "Inactive" : "Active"}</span>
                        <img src={checkedValueInactiveArrete === "Inactive" ? "../assets/images/cercle.svg" : "../assets/images/cercleActive.svg"} alt="ActiverInactive" />
                      </button>
                    </div>
                  </td>
                  : null}
              </tr>
            </tbody>
          </table>
          <table className="tableAdd">
            <thead>
              <tr>
                <th>Année de référence</th>
              </tr>
            </thead>
            <tbody>
              <div className={`${showCalendarStyle}`}>
                <p className="titleSpanCalendar">N-1 -N-10</p>
                <div className="d-flex justify-content-between row form-field divCalendarF">
                  <div className="col-md-12 btnCalendar">
                    <button value="N-1" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-1</button>
                    <button value="N-2" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-2</button>
                    <button value="N-3" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-3</button>
                    <button value="N-4" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-4</button>
                  </div>
                  <div className="col-md-12 btnCalendar">
                    <button value="N-5" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-5</button>
                    <button value="N-6" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-6</button>
                    <button value="N-7" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-7</button>
                    <button value="N-8" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-8</button>
                  </div>
                  <div className="col-md-12 btnCalendar">
                    <button value="N-9" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-9</button>
                    <button value="N-10" onChange={handleChangeValueButton} onClick={(event) => handleClick(event)}>N-10</button>
                  </div>
                </div>
              </div>
              <div className={`${showCalendarStyleTwo}`}>
                <p className="titleSpanCalendarTwo">N-1 -N-10</p>
                <div className="d-flex justify-content-between row form-field divCalendarFTwo">
                  <div className="col-md-12 btnCalendarTwo">
                    <button value="N-1" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-1</button>
                    <button value="N-2" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-2</button>
                    <button value="N-3" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-3</button>
                    <button value="N-4" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-4</button>
                  </div>
                  <div className="col-md-12 btnCalendarTwo">
                    <button value="N-5" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-5</button>
                    <button value="N-6" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-6</button>
                    <button value="N-7" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-7</button>
                    <button value="N-8" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-8</button>
                  </div>
                  <div className="col-md-12 btnCalendarTwo">
                    <button value="N-9" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-9</button>
                    <button value="N-10" onChange={handleChangeValueButton} onClick={(event) => handleClickT(event)}>N-10</button>
                    <button className="croixRed" onChange={handleChangeValueButtonNull} onClick={(event) => handleClickTNull(event)}>X</button>
                  </div>
                </div>
              </div>
              <tr>
                {periodeData ?
                  <td>
                    <div className="d-flex dCalendar">
                      <div className="d-flex justify-content-between btnCalendarP">
                        <span className="inputCalendar">{yearRef1}</span>
                        <img onClick={showFlesh}
                          src={showCalendarStyle == "divCalendar" ? "../assets/images/fleshBasCal.svg" : "../assets/images/fleshHautCal.svg"} alt="ActiverInactive" />
                      </div>
                      {yearRefT == null ?
                      <><div className={`d-flex ${showInputCalendar}`}>
                          <div className="d-flex justify-content-between btnCalendarPTwo">
                            <span className="inputCalendarTwo">{yearRefT}</span>
                            <img onClick={showFleshTwo}
                              src={showCalendarStyleTwo == "divCalendarTwo" ? "../assets/images/fleshBasCal.svg" : "../assets/images/fleshHautCal.svg"} alt="ActiverInactive" />
                          </div>
                        </div>
                        <img onClick={showInputCalendarTwo}
                          className={`plusImg`}
                          src={showInputCalendar=="dCalendarTwo" ?"../assets/images/addCalendar.svg":"../assets/images/cercleAdd.png"} alt="ActiverInactive"/>

                          
                          </>
                        :<>
                        <div className="d-flex dCalendarTwoShow">
                          <div className="d-flex justify-content-between btnCalendarPTwo">
                            <span className="inputCalendarTwo">{yearRefT}</span>
                            <img onClick={showFleshTwo}
                              src={showCalendarStyleTwo == "divCalendarTwo" ? "../assets/images/fleshBasCal.svg" : "../assets/images/fleshHautCal.svg"} alt="ActiverInactive" />
                          </div>
                        </div>
                        <img  onClick={showInputCalendarTwo}
                            className="plusImg"
                            src={showInputCalendar=="dCalendarTwo" ?"../assets/images/cercleAdd.png":"../assets/images/cercleAdd.png"} alt="ActiverInactive"/>
        
                        </>
                        }
                    </div>
                  </td>
                  : null}
              </tr>
               {/* <tr>
      {periodeData?
        <td>
          <div className="d-flex dCalendar">
          <div className="d-flex justify-content-between btnCalendarP">
          <span className="inputCalendar">{yearRef1}</span>
          <img   onClick={showFlesh}
          src={showCalendarStyle=="divCalendar" ?"../assets/images/fleshBasCal.svg":"../assets/images/fleshHautCal.svg"} alt="ActiverInactive"/>
        </div>
        <div className= { `d-flex ${showInputCalendar}`}>
          <div className="d-flex justify-content-between btnCalendarPTwo">
          <span className="inputCalendarTwo">{yearRefT}</span>
          <img   onClick={showFleshTwo}
          src={showCalendarStyleTwo=="divCalendarTwo" ?"../assets/images/fleshBasCal.svg":"../assets/images/fleshHautCal.svg"} alt="ActiverInactive"/>
        </div>
          </div>
          <img  onClick={showInputCalendarTwo}
          className="plusImg"
          src={showInputCalendar=="dCalendarTwo" ?"../assets/images/addCalendar.svg":"../assets/images/cercleAdd.png"} alt="ActiverInactive"/>
          </div>
        </td>
         : null}
      </tr> */}

            </tbody>
          </table >
        </div>
        <div className="btnCls btnClsRappel">
        <Link to='/periodes' ><button  onClick={(e:React.MouseEvent<HTMLElement>) =>handlerInputType(e)}  className= {`reset ${classNameActif}`}>ANNULER</button></Link>
          <button className="submit" onClick={onSubmit}>ENREGISTRER</button>
          
        </div>







      </div>
    </div>
  );
};
export default FormPeriodeList;
