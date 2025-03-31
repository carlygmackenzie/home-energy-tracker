const express = require('express');
const fs = require('node:fs');
const app = express();
const port = 5000;

const calcNetPower = (data) => {
    
    let netPower = 0;
    data.forEach(resource => {
        netPower += resource.powerOutput;
    });
    return netPower;
}

// simple example algorithm for how grid and microgrid power supply might be determined... I am not sure if this is scientifically accurate
const calcGridPowerSupply = (data, netPower) => {
    if(netPower < 0){
        netPower = 0;
    }

    data.forEach(resource => {
        if(!resource.main){
            // home does not require any additional power
            if(netPower === 0){
                resource.powerSupply = 0;
            }
            // if the power needed is greater than the current resource's available power
            else if(netPower > resource.availablePower){
                netPower -= resource.availablePower;
                resource.powerSupply = resource.availablePower;
            }
            // if there is more available power in the current resources than is needed
            else {
                resource.powerSupply = netPower;
                netPower = 0;
            }
        }
    });

    // if there is still needed power, resort to main power grid
    if(netPower > 0){
        const mainIndex = data.findIndex((resource => resource.type === 'main'));
        data[mainIndex].powerSupply = netPower;
    }
}

app.get('/get-energy-data', (req, res) => {

    fs.readFile('./data/energyData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const jsonData = JSON.parse(data);
        
        const netPower = calcNetPower(jsonData.homeResources);
        jsonData.netPower = netPower;
        calcGridPowerSupply(jsonData.externalResources, netPower);
        
        // need stringify?
        res.send(JSON.stringify(jsonData));
    });
    
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


