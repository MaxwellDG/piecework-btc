'use client';

import {
    createContext,
    useContext,
    Dispatch,
    SetStateAction,
    useState,
} from 'react';
import { TOAST_TYPE, Toast } from '../(types)/api';

type ContextProps = {
    toasts: Toast[];
    setToasts: Dispatch<SetStateAction<Toast[]>>;
};

const GlobalContext = createContext<ContextProps>({
    toasts: [] as Toast[],
    setToasts: () => {},
});

export const GlobalContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    return (
        <GlobalContext.Provider value={{ toasts, setToasts }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
