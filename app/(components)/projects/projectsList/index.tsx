'use client';

import React, { useState } from 'react';
import Loading from '../../loading';
import useSWR from 'swr';
import ProjectComponentList from './componentList';
import ConfirmModal from '../../modals/confirm';
import useToasts from '../../../(hooks)/useToasts';
import { TOAST_TYPE } from '../../../(types)/api';
import { IProject } from '../../../../db/models/project/types';

export default function ProjectsList() {
    const { data, error, isLoading, mutate } = useSWR(
        '/api/projects',
        async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            return data?.projects ?? [];
        }
    );
    const { createToast } = useToasts();

    const [showConfirmModal, toggleConfirmModal] = useState(false);
    const [showEditModal, toggleEditModal] = useState(false);
    const [_name, _setName] = useState('');
    const [focusedProject, setFocusedProject] = useState<IProject | null>(null);

    async function deleteProject(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (focusedProject === null) return null;

        const res = await fetch(`/api/projects/${focusedProject?._id}`, {
            method: 'DELETE',
            body: JSON.stringify({ name }),
        });

        if (res.ok) {
            mutate();
            createToast('Project deleted', TOAST_TYPE.INFO);
            toggleConfirmModal(false);
            setFocusedProject(null);
        } else {
            console.error(await res.text());
        }
    }

    async function editProject(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (focusedProject === null) return null;

        const res = await fetch(`/api/projects`, {
            method: 'PATCH',
            body: JSON.stringify({ name: _name, _id: focusedProject._id }),
        });

        if (res.ok) {
            mutate(`/api/projects`);
            createToast('Project updated', TOAST_TYPE.INFO);
            toggleEditModal(false);
            setFocusedProject(null);
        } else {
            console.error(await res.text());
        }
    }

    function toggleConfirm(
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        project?: IProject
    ) {
        setFocusedProject(project ?? null);
        _setName(project ? project.name : '');
        e.preventDefault();
        e.stopPropagation();
        toggleConfirmModal(bool);
    }

    function toggleEdit(
        e: React.MouseEvent<HTMLElement>,
        bool: boolean,
        project?: IProject
    ) {
        setFocusedProject(project ?? null);
        _setName(project ? project.name : '');
        e.preventDefault();
        e.stopPropagation();
        toggleEditModal(bool);
    }

    return (
        <div className="w-full h-96 flex">
            {isLoading ? (
                Loading()
            ) : (
                <ProjectComponentList
                    projects={data}
                    toggleConfirm={toggleConfirm}
                    toggleEdit={toggleEdit}
                />
            )}
            {/* Modals */}
            {showConfirmModal && (
                <ConfirmModal
                    closeModal={(e) => toggleConfirm(e, false)}
                    header="Confirm"
                    content={`Are you sure you'd like to delete the project: ${focusedProject?.name}?`}
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
        </div>
    );
}
