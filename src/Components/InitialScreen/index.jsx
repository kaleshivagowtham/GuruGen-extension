// import { useState } from "react";
import './styles.css';
import logo from '../../../public/logo.png';


export default function InitialScreen() {


    return (
        <div className="initialScreenWholeCont">
            <img src={logo}  className='initialScreenImage'/>
            {/* <p className='initialScreenTitleText'></p> */}
            <p className='initialScreenText'>Guru Gen Waking up...</p>
        </div>
    )
}