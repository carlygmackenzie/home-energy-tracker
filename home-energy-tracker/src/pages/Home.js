import { useEffect, useState } from 'react'
import { PiSolarPanel } from "react-icons/pi";
import { MdOutlineElectricCar, MdOutlineGrid4X4, MdOutlineGrid3X3 } from "react-icons/md";
import { LuHousePlug, LuChevronsDown, LuChevronsUp } from "react-icons/lu";
import { BiSolidBatteryCharging } from "react-icons/bi";
import { RxQuestionMarkCircled } from "react-icons/rx";


const Home = () => {

    const [homeResourceData, setHomeResourceData] = useState([]);
    const [extResourceData, setExtResourceData] = useState([]);
    const [powerOutput, setPowerOutput] = useState(0);
    const [hover, setHover] = useState(false);
    const [hoverMessage, setHoverMessage] = useState("");
    const [gridPowerVals, setGridPowerVals] = useState([]);
    const [updateTime, setUpdateTime] = useState([]);

    useEffect(() => {

        //const response = await axios.get('')
        const fetchEnergyData = async () => {
            try{
                const response = await fetch('./data.json');
                if (!response.ok){
                    throw new Error(`Response status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log(data.homeResources);
                console.log(data.externalResources);
                setHomeResourceData(data.homeResources);
                setExtResourceData(data.externalResources);
            }
            catch(error){
                console.error(error.message);
            }
        }

        setUpdateTime(new Date().toString());

        fetchEnergyData();
        
        /*
        fetch('./data.json')
            .then(response => response.json())
            .then(data => setHomeResourceData(data.homeResources))
            .then(data => setExtResourceData(data.externalResources))
            .catch(error => console.error('Error fetching data: ', error));
        */

    }, []);

    // should this be done in the backend?
    useEffect(() => {

        let netPower = 0;
        homeResourceData.forEach(resource => {
            netPower += resource.powerOutput;
        });

        setPowerOutput(netPower);
        calcGridPower(netPower);

        if(netPower < 0){
            setHoverMessage(`Your home is currently generating ${Math.abs(netPower)} kW of energy in excess`);
        }
        else if(netPower > 0){
            setHoverMessage(`Your home is currently consuming ${netPower} kW of energy from the grid`);
        }
        else{
            setHoverMessage(`Your home is currently consuming and generating energy at an equal rate`);
        }

    }, [homeResourceData]);

    const calcGridPower = (netPower) => {
        let values = [];
        let excessPower = netPower;
        if(excessPower < 0){
            excessPower = 0;
        }
        let mainId = 0;

        extResourceData.forEach(resource => {
            if(resource.type === "sub"){
                let power = resource.availablePower;
                if(excessPower === 0){
                    power = 0;
                }
                else if(excessPower > resource.availablePower){
                    excessPower -= power;
                }
                else{
                    power -= excessPower;
                    excessPower = 0;
                }
                values.push({"id": resource.id, "powerOutput": power});
            }
            else if(resource.type === "main"){
                mainId = resource.id;
            }
        })
        values.push({"id": mainId, "powerOutput": excessPower});

        console.log(values);
        setGridPowerVals(values);
    }

    const getIcon = (resourceId) => {

        if(resourceId === 1){
            return <PiSolarPanel className="icon"/>
        }
        else if(resourceId === 2){
            return <MdOutlineElectricCar className="icon"/>
        }
        else if(resourceId === 3){
            return <BiSolidBatteryCharging className="icon"/>
        }
        else if(resourceId === 4){
            return <LuHousePlug className="icon"/>
        }
        else if(resourceId === 5){
            return <MdOutlineGrid4X4 className="icon"/>
        }
        else if(resourceId === 6){
            return <MdOutlineGrid3X3 className="icon"/>
        }
        return
    } 
    
    return (
        <div className="App">
            <h1>My Home</h1>
            <h2>Current Net Power Transfer: 
                <span className={powerOutput < 0 ? "power green" : "power red"}>{powerOutput} kW </span>
                <RxQuestionMarkCircled className="question-mark"
                    onMouseEnter={() => setHover(true)} 
                    onMouseLeave={() => setHover(false)} 
                />
                <span className={hover ? "hover-box" : "no-hover"}>{hoverMessage}</span>
            </h2>

            <div className="lists-container">
                <div className="block-container"> 
                    <h3>External Resources</h3>
                    <ul>
                        {extResourceData.map(resource =>
                            <li key={resource.id}>
                                <span className="resource-title">{resource.name}</span>
                                <span className="flex-container">{getIcon(resource.id)}</span>
                                <span className="flex-container">Supplying {gridPowerVals.find((value) => value.id === resource.id)?.powerOutput} kW</span>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="block-container">
                    <h3>My Resources</h3>
                    <ul>
                        {homeResourceData.map(resource => 
                        <li key={resource.id} className={resource.name}>
                            <span className="resource-title">{resource.name}</span>
                            <span className="flex-container">{getIcon(resource.id)}</span>
                            <span className={resource.powerOutput < 0 ? "flex-container generating" : "flex-container consuming"}>
                                {resource.powerOutput < 0 ? <LuChevronsDown className="small-icon"/> : <LuChevronsUp className="small-icon"/>}
                                {Math.abs(resource.powerOutput)} kW
                            </span>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
            <p>Data last updated: {updateTime}</p>
        </div>
    )
}

export default Home;