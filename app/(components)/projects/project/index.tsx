'use client';

import Link from 'next/link';
import { useState } from 'react';
import { IProject } from '../../../../db/models/project/types';
import Chevron from '../../../../public/svgs/chevron';
import Delete from '../../../../public/svgs/delete';
import Edit from '../../../../public/svgs/edit';
import ConfirmModal from '../../modals/confirm';
import useToasts from '../../../(hooks)/useToasts';
import { TOAST_TYPE } from '../../../(types)/api';
import { useSWRConfig } from 'swr';
import ArrowCornersCard from '../../containers/cards/arrow-corners';
import IconButton from '../../ui/buttons/icon';

type Props = {
    project: IProject;
};

export default function Project({ project }: Props) {
    const { _id, name, company, updatedAt, createdAt } = project;
    const { createToast } = useToasts();
    const { mutate } = useSWRConfig();

    const [_name, _setName] = useState(name);
    const [showConfirmModal, toggleConfirmModal] = useState(false);
    const [showEditModal, toggleEditModal] = useState(false);
    const [isHover, toggleHover] = useState(false);

    async function deleteProject(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        const res = await fetch(`/api/projects/${_id}`, {
            method: 'DELETE',
            body: JSON.stringify({ name }),
        });

        if (res.ok) {
            mutate(`/api/projects`);
            createToast('Project deleted', TOAST_TYPE.INFO);
            toggleConfirmModal(false);
        } else {
            console.error(await res.text());
        }
    }

    async function editProject(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        const res = await fetch(`/api/projects`, {
            method: 'PATCH',
            body: JSON.stringify({ name: _name, _id }),
        });

        if (res.ok) {
            mutate(`/api/projects`);
            createToast('Project updated', TOAST_TYPE.INFO);
            toggleEditModal(false);
        } else {
            console.error(await res.text());
        }
    }

    function toggleConfirm(e: React.MouseEvent<HTMLElement>, bool: boolean) {
        e.preventDefault();
        e.stopPropagation();
        toggleConfirmModal(bool);
    }

    function toggleEdit(e: React.MouseEvent<HTMLElement>, bool: boolean) {
        e.preventDefault();
        e.stopPropagation();
        toggleEditModal(bool);
    }

    return (
        <ArrowCornersCard>
            <Link
                href={`/dashboard/projects/${_id}`}
                className="w-full flex justify-between"
            >
                <div
                    className="flex flex-1 hover:bg-[rgba(255,255,255,0.1)] items-center"
                    onMouseEnter={() => toggleHover(true)}
                    onMouseLeave={() => toggleHover(false)}
                >
                    <p className="ml-2">{name}</p>
                </div>
                <div className="flex gap-x-3 items-center bg-[rgba(255,255,255,0.1)] px-3 py-2 border-l border-lightGray">
                    <div className="flex items-center gap-x-3">
                        <IconButton
                            onClick={(e) => toggleConfirm(e, true)}
                            icon={Delete('#cbced3', 25)}
                        />
                        <IconButton
                            onClick={(e) => toggleEdit(e, true)}
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

                {/* Modals */}
                {showConfirmModal && (
                    <ConfirmModal
                        closeModal={(e) => toggleConfirm(e, false)}
                        header="Confirm"
                        content={`Are you sure you'd like to delete the project: ${project.name}?`}
                        buttonFuncs={[
                            (e) => toggleConfirm(e, false),
                            deleteProject,
                        ]}
                        buttonTexts={['Cancel', 'Delete']}
                    />
                )}
                {showEditModal && (
                    <ConfirmModal
                        closeModal={(e) => toggleEdit(e, false)}
                        header="Edit project"
                        content={
                            <input
                                className=""
                                type="text"
                                value={_name}
                                onChange={(e) => _setName(e.target.value)}
                            />
                        }
                        buttonFuncs={[(e) => toggleEdit(e, false), editProject]}
                        buttonTexts={['Cancel', 'Submit']}
                    />
                )}
            </Link>
        </ArrowCornersCard>
    );
}
