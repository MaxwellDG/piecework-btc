import NextImage from 'next/image';
import Delete from '../../../../public/svgs/delete';

type Props = {
    imageUrl: string;
    index: number;
    deleteFunc?: (
        e: React.MouseEvent<HTMLElement>,
        imageUrl: string,
        bool: boolean
    ) => void;
};

export default function TaskImage({ imageUrl, index, deleteFunc }: Props) {
    return (
        <div
            key={imageUrl}
            className="relative h-32 w-32 min-w-[8rem] cursor-pointer group"
        >
            <NextImage
                key={imageUrl}
                src={imageUrl}
                fill
                alt={`task image ${index}`}
                sizes="100%"
                priority={true}
            />
            <a
                target="_blank"
                href={imageUrl}
                className="absolute z-20 h-32 w-32"
            />
            {deleteFunc && (
                <div
                    onClick={(e) => deleteFunc(e, imageUrl, true)}
                    className="hidden absolute top-1 right-1 z-20 bg-gray-200 rounded p-1 group-hover:flex"
                >
                    {Delete(20, 'black')}
                </div>
            )}
        </div>
    );
}
