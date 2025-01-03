// context.tsx
import React, { createContext, useReducer, useContext } from 'react';
import { IAppContext, IAppState, AppActions } from '../interfaces';
import { appReducer, initialState } from './reducer';

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): IAppContext => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
