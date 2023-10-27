'use client';

import { useGlobalContext } from '../../(context)';
import { useEffect } from 'react';
import { Toast } from '../../(types)/api';

type Props = {
    id: number;
    text: string;
    type: string;
    removeToast: (id: number) => void;
};

const Toast = ({ id, text, type, removeToast }: Props) => {
    return (
        <div
            onClick={() => removeToast(id)}
            className="border border-toastBlue bg-white px-2 rounded cursor-pointer mb-2"
        >
            <p className="text-md">{text}</p>
        </div>
    );
};

export default function Toasts() {
    const { toasts, setToasts } = useGlobalContext();

    useEffect(() => {
        toasts.forEach(({ id }) => {
            setTimeout(() => {
                removeToast(id);
            }, 5000);
        });
    }, [toasts.length]);

    const removeToast = (id: number) => {
        setToasts((prev: Toast[]) =>
            prev.filter((toast: Toast) => toast.id !== id)
        );
    };

    return (
        <div className="absolute bottom-6 left-0 right-0 m-auto w-fit">
            {toasts.map((toast: Toast) => (
                <Toast key={toast.id} {...toast} removeToast={removeToast} />
            ))}
        </div>
    );
}
