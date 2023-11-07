'use client';

import React from 'react';
import SimpleButton from '../../ui/buttons/simple';
import SciFiStandardButton from '../../ui/buttons/sciFiStandard';

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
                    className="input border border-lightGray flex flex-1 bg-backgroundDark bg-opacity-20 text-white"
                    required
                />
                <SciFiStandardButton text="Send" type="submit" />
            </form>
        </div>
    );
}
