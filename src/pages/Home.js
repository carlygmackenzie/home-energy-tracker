import { useEffect, useState } from 'react'
import ResourceList from '../components/ResourceList';
import Hover from '../components/Hover';
import { LuChevronsDown, LuChevronsUp } from "react-icons/lu";
import '../styles/Home.css';

const Home = () => {

    const [homeResourceData, setHomeResourceData] = useState([]);
    const [extResourceData, setExtResourceData] = useState([]);
    const [netPowerTrans, setNetPowerTrans] = useState(0);
    const [hoverMessage, setHoverMessage] = useState("");
    const [updateTime, setUpdateTime] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        const fetchEnergyData = async () => {
            try{
                const response = await fetch('/get-energy-data');
                const data = await response.json();

                if (response.status !== 200){
                    setLoading(false);
                    setError(true);
                    throw new Error(`\nStatus: ${response.status}\nMessage: ${data.message}`);
                }
                
                setHomeResourceData(data.homeResources);
                setExtResourceData(data.externalResources);
                setNetPowerTrans(data.netPower);
                setUpdateTime(new Date().toString());

                if(data.netPower < 0){
                    setHoverMessage(`Your home is currently generating ${Math.abs(data.netPower)} kW of extra power`);
                }
                else if(data.netPower > 0){
                    setHoverMessage(`Your home is currently consuming ${data.netPower} kW of power from external grid(s)`)
                }
                else{
                    setHoverMessage(`Your home is currently consuming and generating power at an equal rate`);
                }

                setLoading(false);
                
            }
            catch(error){
                console.error(error);
            }
        }

        fetchEnergyData();
    }, []);
    
    return (
        loading ? <div></div>
        :
        error ? 
        <div className="horizontal-flex error">
            <h2>Sorry, we are unable to display your energy data at this time.</h2>
        </div>
        :
        <div className="App">
            <h1>My Home</h1>
            <p className="update-time">Data last updated: {updateTime}</p>
            <div className="bar">
                <h2>Current Net Power Transfer: 
                    <span className={`horizontal-flex power ${netPowerTrans <= 0 ? 'green' : 'red'}`}>
                        {netPowerTrans <= 0 ? <LuChevronsUp className="medium"/> : <LuChevronsDown className="medium"/>}
                        {Math.abs(netPowerTrans)} kW 
                    </span>
                    <Hover message={hoverMessage} image={"question"}/>
                </h2>
            </div>

            <div className="lists-container">
                <ResourceList resources={extResourceData}/>
                <div className="vertical-flex">
                    <ResourceList resources={homeResourceData} />
                </div>
            </div>            
        </div>
    )
}

export default Home;