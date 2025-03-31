import { MdOutlineGrid4X4, MdOutlineGrid3X3 } from "react-icons/md";

const ExtResourceBox = ({ extResource }) => {

    // TODO: alternative for no icon
    const getIcon = (resourceId) => {
        if(resourceId === 5){
            return <MdOutlineGrid4X4 className="icon"/>
        }
        else if(resourceId === 6){
            return <MdOutlineGrid3X3 className="icon"/>
        }
        return
    } 

    return (
        <div className="resource-element">
            <span className="resource-title">{extResource.name}</span>
            <span className="horizontal-flex">{getIcon(extResource.id)}</span>
            <span className="horizontal-flex">Supplying {extResource.powerSupply} kW</span>
        </div>
    )
}

export default ExtResourceBox;