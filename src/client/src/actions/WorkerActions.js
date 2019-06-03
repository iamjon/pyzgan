function getWorkers()  {
    return dispatch => {
       dispatch({ type: 'LOADING', loading:true });
       fetch(`http://dummy.restapiexample.com/api/v1/employees`)
            .then(response => response.json())
            .then(workers => {
                if (!workers || workers.length === 0){
                    throw(new Error("Could not fetch employees"));

                }

                dispatch({ type: 'WORKERS', workers});

                const workersAge = workers.reduce((a,b) => a + Number(b.employee_age), 0) / workers.length;
                dispatch({ type: 'WORKERS_AGE', workersAge});

                const workersSalary = workers.reduce((a,b) => a + Number(b.employee_salary), 0) / workers.length;
                dispatch({ type: 'WORKERS_SALARY', workersSalary});

                dispatch({ type: 'LOADING', loading:false });

            })
            .catch((err) => {
                return dispatch({ type: 'ERROR', error: err.toString()});
            });
    };
};

export default getWorkers;
