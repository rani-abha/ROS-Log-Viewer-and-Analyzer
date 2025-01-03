export interface ILogEntry {
    id: number
    timestamp: string;
    severity: string;
    node: string;
    message: string;
}

export interface ILog {
    logs: ILogEntry[];
    total: number;
    page: number;
    limit: number;
}

export interface IAppState {
    logs: ILogEntry[];
    severities: string[];
    loading: boolean;
    error: string | null;
}

export interface IAppContext {
    state: IAppState;
    dispatch: React.Dispatch<AppActions>;
}

export type AppActions = 
    | { type: 'SET_LOGS'; payload: ILogEntry[] }
    | { type: 'SET_SEVERITIES'; payload: string[] }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

// export interface IAppState {
//     logs: ILogEntry[];
//     severities: string[];
// }

// export interface IAppContext {
//     state: IAppState;
//     dispatch: React.Dispatch<AppActions>;
// }

// export type AppActions = 
//     | { type: 'SET_LOGS'; payload: ILogEntry[] }
//     | { type: 'SET_SEVERITIES'; payload: string[] };