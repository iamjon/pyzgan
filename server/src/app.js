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

    return res.send('Hello World!')
});

app.post('/set-temp', (req, res) => {

    fs.writeFile("remoteState.json", JSON.stringify(req.body), 'utf8', (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });

    return res.send('Hello World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));