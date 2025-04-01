import HomeResourceBox from "./HomeResourceBox";
import ExtResourceBox from "./ExtResourceBox";
import '../styles/ResourceList.css';

const ResourceList = ({ resources }) => {

    return (
        <div className="vertical-flex">
            <h3 className="resource-header">{resources[0].type === "home" ? "My Resources" : "External Resources"}</h3>
            <ul className="resource-list">
                {resources.map(resource => 
                    
                    <li key={resource.id}>
                        {resource.type === "home" 
                            ? 
                            <HomeResourceBox homeResource={resource}/> 
                            : 
                            <ExtResourceBox extResource={resource}/>
                        }
                    </li>
                )}
            </ul>
        </div>
    )
}

export default ResourceList;