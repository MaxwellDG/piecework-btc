'use client';

import React from 'react';

type Props = {
    handleSend: (formData: FormData) => Promise<void>;
};

export default function SendMsg({ handleSend }: Props) {
    const ref = React.useRef<HTMLFormElement>(null);

    return (
        <div className="w-full">
            <form
                ref={ref}
                action={async (formData: FormData) => {
                    ref?.current?.reset();
                    await handleSend(formData);
                }}
                className="flex gap-x-1"
            >
                <input
                    type="text"
                    name="input"
                    className="input input-bordered flex flex-1"
                    required
                />
                <button type="submit" className="button">
                    Send
                </button>
            </form>
        </div>
    );
}
