'use client';

import Add from '../../../public/svgs/add';
import { useEffect, useState, useRef } from 'react';
import NextImage from 'next/image';
import { readFile } from '../../(util)/files';
import Loading from '../loading';
import ConfirmModal from '../modals/confirm';
import Delete from '../../../public/svgs/delete';

type Props = {
    imageUrls: string[];
    projectId: string;
    taskId: string;
};

// todo file requirements
// todo remove public access to bucket

export default function TaskImages({ imageUrls, projectId, taskId }: Props) {
    const focusedImage = useRef<string | null>(null);

    const [file, setFile] = useState<File | null>(null);
    const [fileImg, setFileImg] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [_imageUrls, _setImageUrls] = useState<string[]>(imageUrls);
    const [showConfirmModal, toggleConfirmModal] = useState<boolean>(false);

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

    function toggleConfirm(
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        imageUrl: string | null
    ) {
        e.preventDefault();
        e.stopPropagation();
        focusedImage.current = imageUrl;
        toggleConfirmModal(bool);
    }

    const removeFile = async (
        e: React.MouseEvent<HTMLElement>,
        imageUrl: string
    ) => {
        e.preventDefault();
        e.stopPropagation();
        toggleConfirmModal(false);

        const newImageUrls = _imageUrls.filter((url) => url !== imageUrl);
        _setImageUrls(newImageUrls);
        const fileName = imageUrl.split('/').pop();

        await fetch(`/api/gcs/${fileName}`, {
            method: 'DELETE',
            body: JSON.stringify({
                projectId,
                task: taskId,
                folder: 'tasks',
            }),
        }).catch((e) => console.log('err', e));
    };

    const submitFile = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        if (file instanceof File) {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('projectId', projectId);
            formData.append('folder', 'tasks');
            formData.append('taskId', taskId);

            await fetch(`/api/gcs`, {
                method: 'POST',
                body: formData,
            })
                .then(async (res) => {
                    try {
                        const data = await res.json();
                        _setImageUrls((prev) => [
                            `${process.env.NEXT_PUBLIC_GCP_BUCKET_FULL_PATH}/${data.fileName}`,
                            ...prev,
                        ]);
                    } catch (e) {
                        console.log('err', e);
                    }
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
                    <button
                        type="submit"
                        className="button"
                        disabled={!file || loading}
                    >
                        Submit file
                    </button>
                </form>
                <div className="flex flex-1 overflow-x-auto gap-x-2">
                    {_imageUrls.map((imageUrl, index) => {
                        return (
                            <div
                                key={imageUrl}
                                className="relative h-32 w-32 min-w-[8rem] cursor-pointer group"
                            >
                                <a target="_blank" href={imageUrl}>
                                    <NextImage
                                        key={imageUrl}
                                        src={imageUrl}
                                        fill
                                        alt={`task image ${index}`}
                                    />
                                </a>
                                <div
                                    onClick={(e) =>
                                        toggleConfirm(e, true, imageUrl)
                                    }
                                    className="hidden absolute top-1 right-1 z-20 bg-gray-200 rounded p-1 group-hover:flex"
                                >
                                    {Delete('black', 20)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Modals */}
            {showConfirmModal && (
                <ConfirmModal
                    header="Confirm delete"
                    content="Are you sure you want to delete this image?"
                    buttonFuncs={[
                        (e) => toggleConfirm(e, false, null),
                        (e) => removeFile(e, focusedImage.current as string),
                    ]}
                    buttonTexts={['Cancel', 'Delete']}
                    closeModal={(e) => toggleConfirm(e, false, null)}
                />
            )}
        </div>
    );
}
