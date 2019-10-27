const express = require('express');
const bodyParser = require('body-parser');
const { promisify } = require('util');
const cors = require('cors');
const schedule = require('node-schedule');
const fs = require('fs');
const dotenv = require('dotenv');
const cp = require('child_process');

dotenv.config();

const jobs = [];
const port = process.env.PORT;
const app = express();

const saveSched = async (data) => {
    const writeFile = promisify(fs.writeFile);
    await writeFile('remoteSchedule.json', data);
    return true;
};

const readSched = async () => {
    const readFile = promisify(fs.readFile);
    const jsonString = await readFile("remoteSchedule.json", 'utf8');
    const jobObject = JSON.parse(jsonString);
    return jobObject;
};

const runCommand = (command) => {
    const electraPath = process.env.PATH_TO_ELECTRA;
    const cmd = `sudo ${electraPath} 2 COOL 25 OFF SWING_OFF`;
    const cmdn = cp.spawnSync(cmd, ['-l', '/usr'], { encoding : 'utf8' });
    // uncomment the following if you want to see everything returned by the spawnSync command
    // console.log('ls: ' , ls);
    console.log('stdout here: \n' + ls.stdout);
    console.log('command', command);
};

const schedJob = async (d, job) => {
    runCommand(job.command);
};

const oneTimeJob = async (d, job, index) => {
    const jobObject = await readSched();
    const { oneTime = [] } = jobObject;

    runCommand(job.command);

    if (oneTime[index]) {
        oneTime.splice(index, 1);
        saveSched(JSON.stringify(jobObject));
    }
};

const setJobs = async () => {
    const { oneTime = [], scheduled = [] } = await readSched();

    if (jobs.length > 0){
        jobs.forEach(job => job.cancel());
    }

    if (oneTime.length > 0) {
        oneTime.forEach((job, index) => {
            jobs.push(schedule.scheduleJob(job.date, (d) => oneTimeJob(d, job, index)));
        })
    }

    if (scheduled.length > 0) {
        scheduled.forEach((job) => {
            jobs.push(schedule.scheduleJob(job.when, (d) => schedJob(d, job)));
        })
    }

    console.log("Jobs set");
};


// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use((error, req, res, next) => {
    console.log("received from "+req.get("X-Forwarded-For")+" : "+req.method+" "+req.originalUrl+" (Authorization: "+req.get("Authorization")+")");
    next();
});

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
    return readSched().then((jsonObject) => {
        return res.json(jsonObject);
    });
});

app.post('/set-temp', (req, res) => {
    const command = JSON.stringify(req.body);
    runCommand(req.body);

    fs.writeFile("remoteState.json",command, 'utf8', (err) => {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("temperature has been set");
    });
    return res.json({ok:true})
});

app.post('/set-sched', (req, res) => {
    return saveSched(JSON.stringify(req.body)).then(() => {
        console.log("Schedule has been saved");
        setJobs();
        console.log("Schedule has been updated");
        return res.json({ok:true});
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    setJobs();
});