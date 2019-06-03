const initialState = {
    workersSalary:0,
    workersAge:0,
    workersLoading: false,
    workersError: false,
    workers: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'WORKERS':
            return {
                ...state,
                workers: action.workers
            };
        case 'WORKERS_AGE':
            return {
                ...state,
                workersAge: action.workersAge
            };
        case 'WORKERS_SALARY':
            return {
                ...state,
                workersSalary: action.workersSalary
            };
        case 'LOADING':
            return {
                ...state,
                workersLoading: action.loading
            };
        case 'ERROR':
            return {
                ...state,
                workersError: action.error
            };
        default:
            return state;
    }
};
