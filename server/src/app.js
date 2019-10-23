const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// file system module to perform file operations
const fs = require('fs');

const port = 3040;
const app = express();

// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get('/get-status', (req, res) => {
    fs.readFile("remoteState.json", function (err, data) {
        if(err) {
            callback(err);
            return;
        }
        try {
            return res.json(JSON.parse(data))
        } catch(exception) {
            callback(exception);
        }
    });
});

app.get('/get-sched', (req, res) => {
    fs.readFile("remoteSchedule.json", function (err, data) {
        if(err) {
            callback(err);
            return;
        }
        try {
            return res.json(JSON.parse(data))
        } catch(exception) {
            callback(exception);
        }
    });
});


app.post('/set-temp', (req, res) => {
    fs.writeFile("remoteState.json", JSON.stringify(req.body), 'utf8', (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
    return res.json({ok:true})
});


app.post('/set-sched', (req, res) => {
    fs.writeFile("remoteSchedule.json", JSON.stringify(req.body), 'utf8', (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
    return res.json({ok:true})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));