import Link from 'next/link';

type Props = {
    header: string;
    content: string;
    path: string;
};

export default function ConfirmModalServer({ header, content, path }: Props) {
    return (
        <div className="absolute z-50 top-0 right-0 left-0 bottom-0 h-screen w-screen">
            <Link
                href={path}
                className="absolute top-0 right-0 left-0 bottom-0 flex h-full w-full justify-center items-center"
            ></Link>
            <div className="absolute top-0 right-0 left-0 bottom-0 m-auto h-fit modal-box rounded p-0 z-10 cursor-default pointer-events-auto border border-[#f0f0f0]">
                <div className="p-4 bg-white">
                    <div className="mb-4">
                        <h2 className="font-semibold text-2xl">{header}</h2>
                    </div>
                    <p className="mb-4">{content}</p>
                </div>
                <div
                    className={`flex w-full bg-[#fbfbfa] p-4 border-t border-[#f0f0f0] justify-end`}
                >
                    <Link
                        href={path}
                        className={`rounded py-1 px-2 bg-[#161617] border border-[#161617]`}
                    >
                        <p className={`text-white`}>Okay</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
