'use client';

import NextImage from 'next/image';
import Add from '../../../../../public/svgs/add';
import Loading from '../../../loading';

type Props = {
    submitFile: (e: React.FormEvent) => void;
    file: File | null;
    setFile: (file: File) => void;
    fileImg: string | null;
    loading: boolean;
    setLoading: (bool: boolean) => void;
};

export default function AddFile({
    submitFile,
    file,
    setFile,
    fileImg,
    loading,
    setLoading,
}: Props) {
    return (
        <div>
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
                            e.target.files && setFile(e.target.files[0]);
                        }
                    }}
                />
                {loading ? (
                    Loading()
                ) : fileImg ? (
                    <NextImage src={fileImg} fill alt={`task-image-pending`} />
                ) : (
                    Add('black', 25)
                )}
                <div className="absolute h-32 w-32 flex flex-1 z-20 hover:bg-[rgba(255,255,255,0.3)]" />
            </label>
            <button
                type="button"
                onClick={submitFile}
                className="button"
                disabled={!file || loading}
            >
                Submit file
            </button>
        </div>
    );
}
