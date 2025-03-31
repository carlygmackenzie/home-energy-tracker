import { useState } from 'react'
import { PiSolarPanel } from "react-icons/pi";
import { MdOutlineElectricCar } from "react-icons/md";
import { LuHousePlug, LuChevronsDown, LuChevronsUp } from "react-icons/lu";
import { BiSolidBatteryCharging } from "react-icons/bi";
import { IoWarningOutline } from "react-icons/io5";
import { FiBatteryCharging } from "react-icons/fi";
import { GiBatteryPackAlt } from "react-icons/gi";

import '../styles/HomeResourceBox.css';

const HomeResourceBox = ({ homeResource }) => {

    const [warningHover, setWarningHover] = useState(false);

    // TODO: alternative for no icon
    const getIcon = (resourceId) => {
    
        if(resourceId === 1){
            return <PiSolarPanel className="icon Solar"/>
        }
        else if(resourceId === 2){
            return <MdOutlineElectricCar className="icon EV"/>
        }
        else if(resourceId === 3){
            return <GiBatteryPackAlt className="icon Battery"/>
        }
        else if(resourceId === 4){
            return <LuHousePlug className="icon Load"/>
        }
        return
    } 

    return (
        <div className="resource-element">
            
                <div className="horizontal-flex-left">
                    <span className="resource-title item">{homeResource.name}</span>
                    <span>{homeResource.warnings.length > 0 ? <IoWarningOutline className="warning" onMouseEnter={() => setWarningHover(true)} onMouseLeave={() => setWarningHover(false)}/> : ""}</span>
                        <span className={warningHover ? "hover-box" : "none"}>
                            <ul>
                                {homeResource.warnings.map(warning => 
                                    <li key = {warning.id}>
                                        {warning.message}
                                        Level: {warning.level}
                                    </li>
                                )}
                            </ul>
                        </span>
                </div>

                <div className="vertical-flex item">
                    <span className={homeResource.online ? "green small-box" : "red small-box"}>{homeResource.online ? "Online" : "Offline"}</span>
                    <span className="small-box-2">{homeResource.battery ? `${homeResource.chargeLevel}% charge`: ""}</span>
                </div>
            
                <span className="item">{getIcon(homeResource.id)}</span>
                <div className="item">
                    <span className={homeResource.powerOutput < 0 ? "horizontal-flex power-output green": "horizontal-flex power-output red"}>
                        {homeResource.powerOutput < 0 ? <LuChevronsUp className="small-icon"/> : <LuChevronsDown className="small-icon"/>}
                        {Math.abs(homeResource.powerOutput)} kW
                    </span>
                </div>
        </div>
    )
}

export default HomeResourceBox;