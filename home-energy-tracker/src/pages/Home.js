import { useEffect, useState } from 'react'
import ResourceList from '../components/ResourceList';
import Hover from '../components/Hover';

const Home = () => {

    const [homeResourceData, setHomeResourceData] = useState([]);
    const [extResourceData, setExtResourceData] = useState([]);
    const [netPowerTrans, setNetPowerTrans] = useState(0);
    const [powerMessage, setPowerMessage] = useState("");
    const [updateTime, setUpdateTime] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchEnergyData = async () => {
            try{
                const response = await fetch('/get-energy-data');
                console.log(response);
                if (!response.ok){
                    setLoading(false);
                    throw new Error(`Response status: ${response.status}`);
                }
                
                const data = await response.json();
                
                setHomeResourceData(data.homeResources);
                setExtResourceData(data.externalResources);
                setNetPowerTrans(data.netPower);
                setUpdateTime(new Date().toString());

                if(data.netPower < 0){
                    setPowerMessage(`Your home is currently generating ${Math.abs(data.netPower)} kW of extra power`);
                }
                else if(data.netPower > 0){
                    setPowerMessage(`Your home is currently consuming ${data.netPower} kW of power from external grid(s)`)
                }
                else{
                    setPowerMessage(`Your home is currently consuming and generating power at an equal rate`);
                }

                setLoading(false);
                
            }
            catch(error){
                console.error(error.message);
            }
        }

        fetchEnergyData();
    }, []);
    
    return (
        loading ? <div></div>
        :
        <div className="App">
            <h1>My Home</h1>
            <p>Data last updated: {updateTime}</p>
            <div className="test">
                <h2>Current Net Power Transfer Report: 
                    <span className={netPowerTrans < 0 ? "power green" : "power red"}>
                        {netPowerTrans < 0 ? "Generating " : "Consuming "}
                        {Math.abs(netPowerTrans)} kW 
                    </span>
                    <Hover message={powerMessage} image={"question"}/>
                </h2>
            </div>

            <div className="horizontal-flex-fill">
                <ResourceList resources={extResourceData}/>
                <div className="vertical-flex">
                    <ResourceList resources={homeResourceData} />
                </div>
            </div>            
        </div>
    )
}

export default Home;