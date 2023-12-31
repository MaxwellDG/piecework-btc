'use client';

import { useSWRConfig } from 'swr';
import ModalWrapper from '..';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import TaskImage from '../../taskImages/image';
import { readFile } from '../../../(util)/files';
import AddFile from '../../ui/buttons/addFile';
import useToasts from '../../../(hooks)/useToasts';
import { TOAST_TYPE } from '../../../(types)';
import ConfirmModal from '../confirm';
import SimpleButton from '../../ui/buttons/simple';

type Props = {
    projectId: string;
    path: string;
};

export default function AddTaskModal({ projectId, path }: Props) {
    const { mutate } = useSWRConfig();
    const { createToast } = useToasts();
    const router = useRouter();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [fileImg, setFileImg] = useState<string | null>(null);
    const [loading, toggleLoading] = useState<boolean>(false);

    // when file is upload, read the file and set the fileImg
    useEffect(() => {
        (async () => {
            if (file) {
                const string = await readFile(file);
                setFileImg(string);
                toggleLoading(false);
            }
        })();
    }, [file]);

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        const res = await fetch(`/api/tasks/${projectId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                price,
                description,
                imageUrls,
            }),
        });

        if (res.ok) {
            const { task } = await res.json();
            // Move the image urls to the correct location and update task
            const newImageUrls = imageUrls.map((url) => {
                const split = url.split('/');
                const last = split.pop();
                const fileName = last?.split('-');
                fileName?.shift(); // removes generated uuid for randomness
                const newUrl = `${process.env.NEXT_PUBLIC_GCS_BUCKET_FULL_PATH}/projects/${projectId}/tasks/${task._id}/${fileName}`;
                return newUrl;
            });

            await fetch(`/api/gcs`, {
                method: 'PUT',
                body: JSON.stringify({
                    oldFilePaths: imageUrls,
                    newFilePaths: newImageUrls,
                }),
            }).then(async () => {
                const res2 = await fetch(`/api/tasks/${projectId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        _id: task._id,
                        newImageUrls,
                    }),
                });
                if (res2.ok) {
                    //Reset
                    setName('');
                    setPrice('');
                    setDescription('');
                    setImageUrls([]);
                    router.push(path);
                    mutate('/api/tasks/' + projectId);
                    mutate('/api/activity');
                    createToast('Task created', TOAST_TYPE.SUCCESS);
                } else {
                    console.error(await res2.text());
                }
            });
        } else {
            console.error(await res.text());
        }
    }

    const submitFile = async () => {
        toggleLoading(true);
        if (file instanceof File) {
            let formData = new FormData();
            const uuid = Math.random().toString(36).substring(2, 15);
            const filePath = `tmp/${uuid}-${file.name}`;
            formData.append('file', file);
            formData.append('filePath', filePath);

            await fetch(`/api/gcs`, {
                method: 'POST',
                body: formData,
            })
                .then(() => {
                    setImageUrls((prev) => [
                        `${process.env.NEXT_PUBLIC_GCS_BUCKET_FULL_PATH}/${filePath}`,
                        ...prev,
                    ]);
                    setFile(null);
                    setFileImg(null);
                })
                .catch((e) => console.log('err', e))
                .finally(() => toggleLoading(false));
        } else {
            console.log('no file');
        }
    };

    const deleteFunc = async (
        e: React.MouseEvent<HTMLElement>,
        imageUrl: string
    ) => {
        e.preventDefault();
        e.stopPropagation();

        const newImageUrls = imageUrls.filter((url) => url !== imageUrl);
        setImageUrls(newImageUrls);
        const fileName = imageUrl.split('/').pop();

        await fetch(`/api/gcs`, {
            method: 'DELETE',
            body: JSON.stringify({
                filePath: `tmp/${fileName}`,
            }),
        }).catch((e) => console.log('err', e));
    };

    return (
        <ModalWrapper path={path} header="Add task">
            <form onSubmit={handleSubmit} className="bg-[#1f2935] pt-2">
                <div className="flex m-2">
                    <label htmlFor="name" className="mr-2 w-20">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex flex-1"
                        required
                    />
                </div>
                <div className="flex m-2">
                    <label htmlFor="price" className="mr-2 w-20">
                        Price:
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="flex flex-1"
                        required
                    />
                </div>
                <div className="flex items-start m-2">
                    <label htmlFor="description" className="mr-2 w-20">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="flex flex-1 h-32"
                        required
                    />
                </div>
                <div className="m-2 mb-8">
                    <h2>Files</h2>
                    <div className="flex flex-1 gap-x-2 overflow-x-auto pb-2">
                        <AddFile
                            file={file}
                            setFile={setFile}
                            fileImg={fileImg}
                            loading={loading}
                            setLoading={toggleLoading}
                            submitFile={submitFile}
                        />
                        {imageUrls.map((imageUrl, i) => (
                            <TaskImage
                                key={imageUrl}
                                imageUrl={imageUrl}
                                index={i}
                                deleteFunc={deleteFunc}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex w-full bg-[#1c2834] p-4 border-t border-lightGray justify-end">
                    <SimpleButton type="submit" text="Submit" />
                </div>
            </form>
        </ModalWrapper>
    );
}
