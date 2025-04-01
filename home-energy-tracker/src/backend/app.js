const express = require('express');
const fs = require('fs');
const services = require('./services');

const app = express();
const port = 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/get-energy-data', (req, res) => {

    fs.readFile('./data/energyData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                message: "Unable to locate energy data"
            });
            return;
        }

        const jsonData = JSON.parse(data);
        const validated = services.validateData(jsonData);
        
        if(!validated){
            res.status(500).json({
                message: "Energy data is not formatted correctly"
            });
            return;
        }     

        const netPower = services.calcNetPower(jsonData.homeResources);
        jsonData.netPower = netPower;
        services.calcGridPowerSupply(jsonData.externalResources, netPower);
        
        res.status(200).json(jsonData);
    });
});








