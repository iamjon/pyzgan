const url = process.env.REACT_APP_API_URL;

export function setTemperature(data) {
    console.log(data);
    // The parameters we are gonna pass to the fetch function
    const fetchData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(data),
    };


    return fetch(`${url}/set-temp`, fetchData)
        .then(response => response.json())
        .then(res => res);
}


export function getRemoteControlStatus(data) {
    return fetch(`${url}/get-status`)
        .then(response => response.json())
        .then(res => res);
}
