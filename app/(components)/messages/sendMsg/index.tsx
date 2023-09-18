import React from 'react';

type Props = {
    handleSend: ((formData: FormData) => void)
}

export default function SendMsg({ handleSend }: Props) {

    return (
        <div className="w-full">
            <form action={handleSend} className="flex gap-x-1">
                <input
                    type="text"
                    name="input"
                    placeholder="Message"
                    className="input input-bordered flex flex-1"
                    required
                />
                <button
                    type="button"
                    className="btn btn-primary"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
