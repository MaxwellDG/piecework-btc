'use client';

import Add from '../../../public/svgs/add';
import { useEffect, useState, useRef } from 'react';
import NextImage from 'next/image';
import { readFile } from '../../(util)/files';
import Loading from '../loading';
import ConfirmModal from '../modals/confirm';
import Delete from '../../../public/svgs/delete';
import TaskImage from './image';
import AddFile from '../ui/buttons/addFile';

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
        imageUrl: string | null,
        bool: boolean
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

        await fetch(`/api/gcs`, {
            method: 'DELETE',
            body: JSON.stringify({
                filePath: `projects/${projectId}/tasks/${taskId}/${fileName}`,
            }),
        })
            .then(() => {
                fetch(`/api/tasks/${projectId}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        _id: taskId,
                        imageUrls: newImageUrls,
                    }),
                });
            })
            .catch((e) => console.log('err', e));
    };

    const submitFile = async () => {
        setLoading(true);
        if (file instanceof File) {
            let formData = new FormData();
            const filePath = `projects/${projectId}/tasks/${taskId}/${file.name}`;
            formData.append('file', file);
            formData.append('filePath', filePath);

            await fetch(`/api/gcs`, {
                method: 'POST',
                body: formData,
            })
                .then(async (res) => {
                    try {
                        _setImageUrls((prev) => [
                            `${process.env.NEXT_PUBLIC_GCS_BUCKET_FULL_PATH}/${filePath}`,
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
                <AddFile
                    file={file}
                    setFile={setFile}
                    fileImg={fileImg}
                    loading={loading}
                    setLoading={setLoading}
                    submitFile={submitFile}
                />
                <div className="flex flex-1 overflow-x-auto gap-x-2">
                    {_imageUrls.map((imageUrl, index) => (
                        <TaskImage
                            key={imageUrl}
                            imageUrl={imageUrl}
                            index={index}
                            deleteFunc={toggleConfirm}
                        />
                    ))}
                </div>
            </div>
            {/* Modals */}
            {showConfirmModal && (
                <ConfirmModal
                    header="Confirm delete"
                    content="Are you sure you want to delete this image?"
                    buttonFuncs={[
                        (e) => toggleConfirm(e, null, false),
                        (e) => removeFile(e, focusedImage.current as string),
                    ]}
                    buttonTexts={['Cancel', 'Delete']}
                    closeModal={(e) => toggleConfirm(e, null, false)}
                />
            )}
        </div>
    );
}
