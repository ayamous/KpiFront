import { HiOutlineIdentification } from 'react-icons/hi';
import { MdAirlineSeatReclineExtra } from 'react-icons/md';
import { MdOutlineUpdate } from 'react-icons/md';
import { MdPayment } from 'react-icons/md';
import { MdOutlineDownloadDone } from 'react-icons/md';
import AccordionSummary from '@mui/material/AccordionSummary';

import FormAuth from "./form";

const AuthentificationIndex = ()=>{
    return (
        <div className="authorization container">
            <div className="row">
                <div className="col-6 ">
                    <div className="logo">
                        <img src="./assets/images/logo-main.svg" />
                    </div>
                    <h2><span>Se</span> connecter a votre compte</h2>
                    <FormAuth/>
                </div>
                <div className="col-6 p-0">
                    <img src="./assets/images/Assets KPI-01.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default AuthentificationIndex;