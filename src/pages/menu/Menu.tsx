import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";



const MenuIndex = ()=>{

    const inUser = useSelector((state: RootState) => state.color.inUser)
    const inEntite = useSelector((state: RootState) => state.color.inEntite)
    const inCategorie = useSelector((state: RootState) => state.color.inCategorie)
    const inGrpIndicateur = useSelector((state: RootState) => state.color.inGrpIndicateur)
    const inSystemSource = useSelector((state: RootState) => state.color.inSystemSource)
    
   
    return (
        <div className="menu">
            <div className="bAll">
                <div className="dvHori d-flex hoverCls">
                    <div className="vll"/>
                        <Link to='/users'><button className= {inUser?"actif":""}>Utilisateurs</button></Link>
                        <Link to='/entites' ><button className= {inEntite?"actif":""}>Entités</button></Link>
                        <Link to='/categorie'><button className= {inCategorie?"actif":""}>Catégories</button></Link>
                    <div className="vlll"/>
                </div>         
                <div className="dvbr d-flex hoverCls">
                    <div className="vllll"/>
                        <Link to='/systemSource' className="hoverClsA"><button className= {inSystemSource?"actif":""}>Systèmes sources</button></Link>
                        <Link to='/groupeIndicateur' className="hoverCls"><button className= {inGrpIndicateur?"actif":""}>Groupe d'Indicateurs</button></Link>
                </div>
            </div> 
        </div>

    )
}

export default MenuIndex;

function active(): any {
    throw new Error("Function not implemented.");
}
