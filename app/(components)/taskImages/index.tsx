import GoogleClient from '../../(clients)/google';
import Add from '../../../public/svgs/add';

type Props = {
    imageUrls: string[];
};

// todo remove public access to bucket

export default function TaskImages({ imageUrls }: Props) {
    const submitFile = async (formData: FormData) => {
        'use server';

        const file = formData.get('file') as File;
        console.log('got a file? ', file);
    };

    return (
        <div className="flex flex-col">
            <p>Task Images</p>
            <div className="flex flex-row gap-x-2">
                <form action={submitFile}>
                    <div className="flex justify-center items-center h-20 w-16 border border-dashed rounded-xs">
                        <input type="file" accept="image/*" name="file" />
                        {Add('black', 25)}
                    </div>
                    <button type="submit">Submit file</button>
                </form>

                {imageUrls.map((imageUrl, index) => {
                    return (
                        <div key={index} className="w-1/4">
                            <img src={imageUrl} className="w-full" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
