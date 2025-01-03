import { IAppState, AppActions } from '../interfaces';
import {APIService} from '../logApi'


export const initialState: IAppState = {
    logs: [],
    severities: [],
    loading: false,
    error: null,
};

export function appReducer(state: IAppState, action: AppActions): IAppState {
    switch (action.type) {
        case 'SET_LOGS':
            return { ...state, logs: action.payload, loading: false, error: null };
        case 'SET_SEVERITIES':
            return { ...state, severities: action.payload, loading: false, error: null };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

// Async actions
export const fetchLogs = (dispatch: React.Dispatch<AppActions>, severity?: string, searchTerm?: string, page: number = 1, limit: number = 10) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    APIService.getLogs(severity, searchTerm, page, limit)
        .then(logs => {
            dispatch({ type: 'SET_LOGS', payload: logs});
            console.log("Dispatch log", logs);
        })
        // .then(logs => {dispatch({ type: 'SET_LOGS', payload: logs }); console.log("Distpact log",logs)})
        .catch(error => dispatch({ type: 'SET_ERROR', payload: error.message }));
};

export const fetchSeverities = (dispatch: React.Dispatch<AppActions>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    APIService.getSeverities()
        .then(severities => dispatch({ type: 'SET_SEVERITIES', payload: severities }))
        .catch(error => dispatch({ type: 'SET_ERROR', payload: error.message }));
};


// // reducer.ts
// import { IAppState, AppActions } from '../interfaces';

// export const initialState: IAppState = {
//     logs: [],
//     severities: [],
// };

// export function appReducer(state: IAppState, action: AppActions): IAppState {
//     switch (action.type) {
//         case 'SET_LOGS':
//             return { ...state, logs: action.payload };
//         case 'SET_SEVERITIES':
//             return { ...state, severities: action.payload };
//         default:
//             return state;
//     }
// }
