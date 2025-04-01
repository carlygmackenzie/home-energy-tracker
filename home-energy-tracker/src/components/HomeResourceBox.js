import Hover from './Hover';
import { PiSolarPanel } from "react-icons/pi";
import { MdOutlineElectricCar } from "react-icons/md";
import { LuHousePlug, LuChevronsDown, LuChevronsUp } from "react-icons/lu";
import { GiBatteryPackAlt } from "react-icons/gi";
import '../styles/ResourceBox.css';

const HomeResourceBox = ({ homeResource }) => {

    const getIcon = (resourceId) => {
    
        if(resourceId === 1){
            return <PiSolarPanel className="large Solar"/>
        }
        else if(resourceId === 2){
            return <MdOutlineElectricCar className="large EV"/>
        }
        else if(resourceId === 3){
            return <GiBatteryPackAlt className="large Battery"/>
        }
        else if(resourceId === 4){
            return <LuHousePlug className="large Load"/>
        }
        return
    } 

    return (
        <div className="resource-box home">
            
                <div className="horizontal-flex-left">
                    <span className="resource-title item">{homeResource.name}</span>
                    {homeResource.warnings && homeResource.warnings.length > 0 ?
                        <Hover message={homeResource.warnings} 
                        image="warning"
                        addStyle="hover-warning"/>
                    :
                    <div></div>
                    }
                </div>

                <div className="vertical-flex item">
                    <span className={homeResource.online ? "green online" : "red online"}>{homeResource.online ? "Online" : "Offline"}</span>
                    <span className="charge">{homeResource.battery ? `${homeResource.chargeLevel}% charge`: ""}</span>
                </div>
            
                <span>{getIcon(homeResource.id)}</span>
                <div className="item">
                    <span className={homeResource.powerOutput < 0 ? "horizontal-flex power-output green": "horizontal-flex power-output red"}>
                        {homeResource.powerOutput < 0 ? <LuChevronsUp className="small"/> : <LuChevronsDown className="small"/>}
                        {Math.abs(homeResource.powerOutput)} kW
                    </span>
                </div>
        </div>
    )
}

export default HomeResourceBox;