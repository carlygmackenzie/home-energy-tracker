const Ajv = require('ajv');
const fs = require('fs');
const schema = JSON.parse(fs.readFileSync("./data/resource-schema.json", "utf-8"));

const ajv = new Ajv();
const validate = ajv.compile(schema);

const calcNetPower = (data) => {
    
    let netPower = 0;
    data.forEach(resource => {
        netPower += resource.powerOutput;
    });
    return netPower;
}

// simple example algorithm for how grid and microgrid power supply might be determined... I am not sure if this is scientifically accurate
const calcGridPowerSupply = (data, netPower) => {
    console.log(netPower);
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

const validateData = (data) => {
    const validated = validate(data);
    if(!validated){
        console.error("Errors validating energy data:");
            for (const err of validate.errors){
                console.error(err);
        }
    }
    return validated;
}

module.exports = { calcNetPower, calcGridPowerSupply, validateData }