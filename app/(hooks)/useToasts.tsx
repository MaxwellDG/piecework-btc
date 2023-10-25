import { useGlobalContext } from '../(context)';
import { TOAST_TYPE } from '../(types)/api';

export const useToasts = () => {
    const { toasts, setToasts } = useGlobalContext();

    const createToast = (text: string, type: TOAST_TYPE) => {
        const newArray = [...toasts, { id: toasts.length + 1, text, type }];
        setToasts(newArray);
    };

    return {
        createToast,
    };
};

export default useToasts;
