'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IProject } from '../../../../db/models/project/types';
import Chevron from '../../../../public/svgs/chevron';
import Delete from '../../../../public/svgs/delete';
import Edit from '../../../../public/svgs/edit';
import ArrowCornersCard from '../../containers/cards/arrow-corners';
import IconButton from '../../ui/buttons/icon';

type Props = {
    project: IProject;
    isAdmin: boolean;
    toggleConfirm: (
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        project: IProject
    ) => void;
    toggleEdit: (
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        project: IProject
    ) => void;
};

export default function Project({
    project,
    toggleConfirm,
    toggleEdit,
    isAdmin,
}: Props) {
    const { _id, name, company, updatedAt, createdAt } = project;

    const [isHover, toggleHover] = useState(false);

    return (
        <ArrowCornersCard>
            <Link
                href={
                    isAdmin
                        ? `/admin/dashboard/companies/${company}/${_id}`
                        : `/dashboard/projects/${_id}`
                }
                className="w-full flex justify-between"
            >
                <div
                    className={`flex flex-1 hover:bg-[rgba(255,255,255,0.1)] items-center ${
                        isAdmin ? 'p-2' : ''
                    }`}
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
                >
                    <p className="ml-2">{name}</p>
                </div>
                {!isAdmin && (
                    <div className="flex gap-x-3 items-center bg-[rgba(255,255,255,0.1)] px-3 py-2 border-l border-lightGray">
                        <div className="flex items-center gap-x-3">
                            <IconButton
                                onClick={(e) => toggleConfirm(e, true, project)}
                                icon={Delete(25, '#cbced3')}
                            />
                            <IconButton
                                onClick={(e) => toggleEdit(e, true, project)}
                                icon={Edit('#cbced3', 25)}
                            />
                        </div>
                        <div
                            onMouseEnter={() => toggleHover(true)}
                            onMouseLeave={() => toggleHover(false)}
                        >
                            {Chevron(20, isHover ? '#cbced3' : 'white')}
                        </div>
                    </div>
                )}
            </Link>
        </ArrowCornersCard>
    );
}
