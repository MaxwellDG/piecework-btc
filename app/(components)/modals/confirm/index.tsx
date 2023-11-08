'use client';

import Close from '../../../../public/svgs/close';

type Props = {
    header: string;
    content: string | React.ReactNode;
    buttonFuncs: ((e: React.MouseEvent<HTMLElement>) => void)[];
    buttonTexts: string[];
    closeModal: (e: React.MouseEvent<HTMLElement>) => void;
};

export default function ConfirmModal({
    header,
    content,
    buttonFuncs,
    buttonTexts,
    closeModal,
}: Props) {
    return (
        <div className="absolute z-50 top-0 right-0 left-0 bottom-0 h-screen w-screen">
            <div
                onClick={closeModal}
                className="absolute top-0 right-0 left-0 bottom-0 flex h-full w-full justify-center items-center -z-10"
            ></div>
            <div
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                className="absolute top-0 right-2 left-2 bottom-0 m-auto md:max-w-[50%] md:w-fit md:min-w-[500px] h-fit modal-box rounded p-0 z-10 cursor-default pointer-events-auto border border-lightGray"
            >
                <div className="flex w-full justify-between items-center p-2 border-b border-lightGray bg-[#1f2935]">
                    <h2 className="font-semibold text-2xl ">{header}</h2>
                    <button
                        onClick={closeModal}
                        type="button"
                        style={{ all: 'unset', cursor: 'pointer' }}
                    >
                        {Close(25)}
                    </button>
                </div>
                <div className="p-2 pb-8 bg-[#1f2935]">
                    {typeof content === 'string' ? (
                        <p className="p-2 pb-8">{content}</p>
                    ) : (
                        content
                    )}
                </div>
                <div
                    className={`flex w-full bg-[#1c2834] p-4 border-t border-lightGray ${
                        buttonTexts.length === 1
                            ? 'justify-end'
                            : 'justify-between'
                    }`}
                >
                    {buttonTexts.map((buttonText: string, i: number) => (
                        <button
                            key={i}
                            type="button"
                            onClick={(e) => buttonFuncs[i](e)}
                            className={`rounded py-1 px-2 hover:text-white ${
                                i === 0 && buttonTexts.length === 2
                                    ? 'hover:bg-[#788f98] text-[#788f98]'
                                    : 'hover:bg-teal text-teal'
                            } ${
                                i === 0 && buttonTexts.length === 2
                                    ? 'border border-[#788f98]'
                                    : 'border border-teal'
                            }`}
                        >
                            {buttonText}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
