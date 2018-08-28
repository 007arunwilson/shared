var fs = require('fs')
var stdin = process.openStdin();

let fileContent = "#Development Builds Configuration\n";
let prodFileContent = "#Production Builds Configuration\n";
const developmentInTakeValues = [
    {
        variableLabel: "APP_NAME",
        title: "Enter app name (Travalour):",
        defaultValue: "Travalour",
        devValue: "",
        prodValue: ""
    },
    {
        variableLabel: "APP_DEVELOPER_CODE",
        title: "Enter app developer code (any sort of code name, doesn't matter):",
        defaultValue: "",
        devValue: "",
        prodValue: ""
    },
    {
        variableLabel: "APP_SUPPORT_EMAIL_ID",
        title: "Enter app support email (this email will be shown when support email required):",
        defaultValue: "",
        devValue: "",
        prodValue: ""
    },
    {
        variableLabel: "FACEBOOK_APP_ID",
        title: "Enter facebook app id (you will optain this id from facebook app console):",
        defaultValue: "",
        devValue: "",
        prodValue: ""
    },
    {
        variableLabel: "MAP_KEY",
        title: "Enter google map key :",
        defaultValue: "",
        devValue: "",
        prodValue: ""
    },
    {
        variableLabel: "GOOGLE_WEB_CLIENT_ID",
        title: "Enter google web client id :",
        defaultValue: "",
        devValue: "",
        prodValue: ""
    },
];

const collectAppValues = (inTakeObject) => new Promise((resolve, reject) => {
    process.stdout.write("\n" + inTakeObject.title + " ");
    stdin.addListener("data", function (d) {

        let finalValue = d.toString().trim();
        if (finalValue === "" || finalValue == null) {
            finalValue = inTakeObject.defaultValue;
        }
        stdin.removeAllListeners('data');
        resolve(finalValue);
    });
})

collectAppValues(developmentInTakeValues[0])
    .then(result => {
        developmentInTakeValues[0].devValue = result;
        fileContent = fileContent + developmentInTakeValues[0].variableLabel + "=" + result + "\n";
        prodFileContent = prodFileContent + developmentInTakeValues[0].variableLabel + "=" + result + "\n";
        return true;
    })
    .then(() => collectAppValues(developmentInTakeValues[1])).then(result => {
        developmentInTakeValues[1].devValue = result;
        fileContent = fileContent + developmentInTakeValues[1].variableLabel + "=" + result + "\n";
        prodFileContent = prodFileContent + developmentInTakeValues[1].variableLabel + "=" + result + "\n";
        return true;
    })
    .then(() => collectAppValues(developmentInTakeValues[2])).then(result => {
        developmentInTakeValues[2].devValue = result;
        fileContent = fileContent + developmentInTakeValues[2].variableLabel + "=" + result + "\n";
        prodFileContent = prodFileContent + developmentInTakeValues[2].variableLabel + "=" + result + "\n";
        return true;
    })
    .then(() => collectAppValues(developmentInTakeValues[3])).then(result => {
        developmentInTakeValues[3].devValue = result;
        fileContent = fileContent + developmentInTakeValues[3].variableLabel + "=" + result + "\n";
        prodFileContent = prodFileContent + developmentInTakeValues[3].variableLabel + "=" + result + "\n";
        return true;
    })
    .then(() => collectAppValues(developmentInTakeValues[4])).then(result => {
        developmentInTakeValues[4].devValue = result;
        fileContent = fileContent + developmentInTakeValues[4].variableLabel + "=" + result + "\n";
        prodFileContent = prodFileContent + developmentInTakeValues[4].variableLabel + "=" + result + "\n";
        return true;
    })
    .then(() => collectAppValues(developmentInTakeValues[5])).then(result => {
        developmentInTakeValues[5].devValue = result;
        fileContent = fileContent + developmentInTakeValues[5].variableLabel + "=" + result + "\n";
        prodFileContent = prodFileContent + developmentInTakeValues[5].variableLabel + "=" + result + "\n";
        return true;
    })
    .then(() => {

        process.stdout.write("All Development data collected, \nPlease add new values on '.env.production', it's now simply duplicating the development values ");
        process.stdout.write("\n\n\n\n\n\n");

        developmentFilePromise = new Promise(resolve => {
            fs.writeFile(".env.development", fileContent, function (err) {
                if (err) {
                    return console.log(err);
                }
                resolve();
            });
        });

        productionFilePromise = new Promise(resolve => {
            fs.writeFile(".env.production", prodFileContent, function (err) {
                if (err) {
                    return console.log(err);
                }
                resolve();
            });
        });

        Promise.all([developmentFilePromise, productionFilePromise]).then(() => process.exit());

    })