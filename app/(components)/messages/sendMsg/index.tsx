import React from 'react';

type Props = {
    handleSend: ((formData: FormData) => void)
}

export default function SendMsg({ handleSend }: Props) {

    return (
        <div className="w-full flex gap-x-1">
            <form action={handleSend} >
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
