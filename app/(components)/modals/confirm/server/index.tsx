import Link from 'next/link';
import Close from '../../../../../public/svgs/close';

type Props = {
    header: string;
    content: string;
    path: string;
};

export default function ConfirmModalServer({ header, content, path }: Props) {
    return (
        <div className="absolute z-50 top-0 right-0 left-0 bottom-0 h-screen w-screen">
            {path ? (
                <Link
                    href={path}
                    className="absolute top-0 right-0 left-0 bottom-0 flex h-full w-full justify-center items-center"
                ></Link>
            ) : null}
            <div className="absolute top-0 right-2 left-2 bottom-0 m-auto md:w-1/2 h-fit modal-box rounded p-0 z-10 cursor-default pointer-events-auto border border-lightGray">
                <div className="p-2 border-b border-lightGray bg-[#1f2935] flex justify-between items-center">
                    <h2 className="font-semibold text-2xl">{header}</h2>
                    <Link href={path}>{Close(25)}</Link>
                </div>
                <div className="p-2 pb-8 bg-[#1f2935]">
                    <p>{content}</p>
                </div>
                <div
                    className={`flex w-full p-4 border-t border-lightGray justify-end bg-[#1c2834]`}
                >
                    <Link
                        href={path}
                        className="rounded py-1 px-2 border border-teal text-teal hover:text-white hover:bg-teal cursor-pointer"
                    >
                        Okay
                    </Link>
                </div>
            </div>
        </div>
    );
}
