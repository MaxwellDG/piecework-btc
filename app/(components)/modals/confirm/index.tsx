type Props = {
    header: string;
    content: string;
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
                className="absolute top-0 right-0 left-0 bottom-0 m-auto h-fit modal-box rounded p-0 z-10 cursor-default pointer-events-auto border border-[#f0f0f0]"
            >
                <div className="p-4 bg-white">
                    <div className="mb-4">
                        <h2 className="font-semibold text-2xl">{header}</h2>
                    </div>
                    <p className="mb-4">{content}</p>
                </div>
                <div
                    className={`flex w-full bg-[#fbfbfa] p-4 border-t border-[#f0f0f0] ${
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
                            className={`rounded py-1 px-2 ${
                                i === 0 ? 'bg-[#FFFFFF]' : 'bg-[#161617]'
                            } ${
                                i === 0
                                    ? 'border border-[#f0f0f0]'
                                    : 'border border-[#161617]'
                            }`}
                        >
                            <p
                                className={`${
                                    i === 0 ? 'text-[#161617]' : 'text-white'
                                }`}
                            >
                                {buttonText}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
