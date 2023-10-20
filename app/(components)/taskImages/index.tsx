'use client';

import Add from '../../../public/svgs/add';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { readFile } from '../../(util)/files';
import Loading from '../loading';

type Props = {
    imageUrls: string[];
};

// todo file requirements
// todo remove public access to bucket

export default function TaskImages({ imageUrls }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [fileImg, setFileImg] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // when file is upload, read the file and set the fileImg
    useEffect(() => {
        (async () => {
            if (file) {
                const string = await readFile(file);
                setFileImg(string);
                setLoading(false);
            }
        })();
    }, [file]);

    const submitFile = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        if (file instanceof File) {
            let formData = new FormData();
            formData.append('file', file);

            await fetch(`/api/upload`, {
                method: 'POST',
                body: formData,
            })
                .then((res) => {
                    setFile(null);
                    setFileImg(null);
                })
                .catch((e) => console.log('err', e))
                .finally(() => setLoading(false));
        } else {
            console.log('no file');
        }
    };

    return (
        <div className="flex flex-1 flex-col">
            <p>Task Images</p>
            <div className="flex flex-1 flex-row gap-x-2">
                <form onSubmit={submitFile}>
                    <label
                        className={`relative flex justify-center items-center h-32 w-32 ${
                            file
                                ? 'border-btcOrange border border-8 rounded'
                                : 'border-black border border-dashed'
                        } rounded-xs mb-2 cursor-pointer`}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            name="file"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files?.length) {
                                    setLoading(true);
                                    e.target.files &&
                                        setFile(e.target.files[0]);
                                }
                            }}
                        />
                        {loading ? (
                            Loading()
                        ) : fileImg ? (
                            <NextImage
                                src={fileImg}
                                fill
                                alt={`task-image-pending`}
                            />
                        ) : (
                            Add('black', 25)
                        )}
                        <div className="absolute h-32 w-32 flex flex-1 z-20 hover:bg-[rgba(255,255,255,0.3)]" />
                    </label>
                    <button type="submit" className="button">
                        Submit file
                    </button>
                </form>
                <div className="flex flex-1 overflow-x-auto gap-x-2">
                    {imageUrls.map((imageUrl, index) => {
                        return (
                            <div
                                key={index}
                                className="relative h-32 w-32 min-w-[8rem] bg-green-200 cursor-pointer"
                            >
                                <NextImage
                                    src={imageUrl}
                                    fill
                                    alt={`task image ${index}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
