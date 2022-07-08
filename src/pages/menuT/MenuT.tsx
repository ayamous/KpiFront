import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../state/store";



const MenuTIndex = ()=>{

  const inPeriode = useSelector((state: RootState) => state.color.inPeriode)
  const inControle = useSelector((state: RootState) => state.color.inControle)
  const inEvaluations = useSelector((state: RootState) => state.color.inEvaluations)
  const inGestAffect = useSelector((state: RootState) => state.color.inGestAffect)
  
    return (
        <div className="menu">
            <div className="bAll">
                <div className="dvHori d-flex hoverCls">
                    <div className="vll" />
                    <Link to='/periodes'><button  className= {inPeriode?"actif":""}>Périodes</button></Link>
                    <Link to='/controles'><button   className= {inControle?"actif":""}>Contrôles</button></Link> 
                    <div className="vlll"/>
                    <div className="vlllll"/>
                    <Link to='/evaluations'><button  className= {inEvaluations?"actif":""}>Evaluations</button></Link>
                    <Link to='/gestionsAfetions'><button   className= {inGestAffect?"actif":""}>Gestions des affectations</button></Link> 
                    <div className="vlllll"/>
                </div>  
            </div> 
        </div>
    )
}

export default MenuTIndex;

