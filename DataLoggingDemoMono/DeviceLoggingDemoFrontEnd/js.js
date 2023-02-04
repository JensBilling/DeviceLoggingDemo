// Elements:
const clearButton = document.getElementById('clear_button');
clearButton.addEventListener("click", clearData)

const dropConnectionButton = document.getElementById('drop_connection_button');
dropConnectionButton.addEventListener("click", dropConnection);

const getAllDataButton = document.getElementById('get_all_button');
getAllDataButton.addEventListener("click", getAllData);

const getRecentDataButton = document.getElementById('get_recent_button');
getRecentDataButton.addEventListener("click", getRecentData);

const frequencyInput = document.getElementById('frequency_field');
frequencyInput.addEventListener('keyup', updateGeneratorSettings)

// Global variables;
let frequency = 1000;
let dropConnectionTime = 0;

let currentTemperature = 20;
let currentHumidity = 50;
let currentBrightness = 50;

// Declare generating clock
var autoCallGenerator = window.setInterval(function () {
    generateData()
    getRecentData()
}, frequency);
// clearInterval(autoCallGenerator)

const consoleContainer = document.getElementById('data_container');


// Functions:
// Gets recent data on reload page
setTimeout(function () {
    getRecentData();
}, 50);

function startGenerator() {
    clearInterval(autoCallGenerator)
    var autoCallGenerator = window.setInterval(function () {
        generateData()
        getRecentData()
    }, frequency);
}

function updateGeneratorSettings() {
    clearData();
    if (!isNaN(frequencyInput.value)) {
        frequency = frequencyInput.value * 1000;
        startGenerator();
    } else {
        window.alert("Only input integers!")
        frequencyInput.value = 0;
    }
}

function clearData() {
    let options = {
        method: 'DELETE',
        mode: 'cors',
    }
    fetch('http://localhost:8080/log', options)

    setTimeout(function () {
        getRecentData();
    }, 50);
}

function dropConnection() {
    clearInterval(autoCallGenerator)

    setTimeout(function () {
        generateDroppedData();
    }, 10000);
}

function generateDroppedData() {

    let stringToSend =
        "1000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n2000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n3000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n4000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n5000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n6000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n7000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n8000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n9000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)
        + "\n10000," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100) + "," + Math.floor(Math.random() * 100)


    let options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: stringToSend
    }
    fetch('http://localhost:8080/log/collection', options);

    startGenerator()
}

function generateData() {

    if (currentTemperature < 16) {
        currentTemperature++;
    } else if (currentTemperature > 25) {
        currentTemperature--;
    } else {
        if (Math.random() > 0.5) {
            currentTemperature++;
        } else {
            currentTemperature--;
        }
    }

    if (currentHumidity < 40) {
        currentHumidity++;
    } else if (currentHumidity > 80) {
        currentHumidity--;
    } else {
        if (Math.random() > 0.5) {
            currentHumidity++;
        } else {
            currentHumidity--;
        }
    }

    if (currentBrightness < 1) {
        currentBrightness++;
    } else if (currentBrightness > 99) {
        currentBrightness--;
    } else {
        if (Math.random() > 0.5) {
            currentBrightness++;
        } else {
            currentBrightness--;
        }
    }


    let options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: "0," + currentTemperature + "," + currentHumidity + "," + currentBrightness
    }
    fetch('http://localhost:8080/log', options);

}

function getAllData() {
    let stringToPrint = "";

    fetch('http://localhost:8080/log/all')
        .then(function (body) {
            return body.text();
        }).then(function (data) {

        const jsonifiedData = JSON.parse(data);

        for (let i = 0; i < Object.keys(jsonifiedData).length; i++) {
            let date = new Date(jsonifiedData[i].millisSinceEpoch);
            let readableDate = date.toLocaleString();

            stringToPrint += "Timestamp: " + readableDate + "  |  ";
            stringToPrint += "Temperature: " + jsonifiedData[i].temperature + "°C  |  ";
            stringToPrint += "Humidity: " + jsonifiedData[i].humidity + "%  |  ";
            stringToPrint += "Brightness: " + jsonifiedData[i].lightLevel + "%<br>";
        }
        consoleContainer.innerHTML = stringToPrint;
    });
}

function getRecentData() {
    let stringToPrint = "";

    fetch('http://localhost:8080/log/recent')
        .then(function (body) {
            return body.text();
        }).then(function (data) {

        const jsonifiedData = JSON.parse(data);

        for (let i = 0; i < Object.keys(jsonifiedData).length; i++) {
            let date = new Date(jsonifiedData[i].millisSinceEpoch);
            let readableDate = date.toLocaleString();

            stringToPrint += "Timestamp: " + readableDate + "  |  ";
            stringToPrint += "Temperature: " + jsonifiedData[i].temperature + "°C  |  ";
            stringToPrint += "Humidity: " + jsonifiedData[i].humidity + "%  |  ";
            stringToPrint += "Brightness: " + jsonifiedData[i].lightLevel + "%<br>";
        }
        consoleContainer.innerHTML = stringToPrint;
    });
}