import { MdOutlineGrid4X4, MdOutlineGrid3X3 } from "react-icons/md";
import '../styles/ResourceBox.css';

const ExtResourceBox = ({ extResource }) => {

    // TODO: alternative for no icon
    const getIcon = (resourceId) => {
        if(resourceId === 5){
            return <MdOutlineGrid4X4 className="large"/>
        }
        else if(resourceId === 6){
            return <MdOutlineGrid3X3 className="large"/>
        }
        return
    } 

    return (
        <div className="resource-box ext">
            <span className="resource-title">{extResource.name}</span>
            <span className="horizontal-flex">{getIcon(extResource.id)}</span>
            <span className="horizontal-flex">Supplying {extResource.powerSupply} kW</span>
        </div>
    )
}

export default ExtResourceBox;