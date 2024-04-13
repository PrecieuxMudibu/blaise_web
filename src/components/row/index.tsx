import ModalContainer from '../modal';
import UpdateProfessor from '../update';
import {
    API_URL,
    axiosConfig,
    check,
    formatDate,
    notifyError,
    notifySuccess,
    updateItemInTheStore
} from '@/helpers';
// import ProfileEmpty from '@/public/profileEmpty.png';
import globalStore from '@/store';
import { Checkbox } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { LayoutContext } from '../layout';
import DeleteContainer from '../deleteContainer';

export default function ProfessorRow({ professor, index, user }: any) {

    const {
        user: userConnected,
        professors,
        setProfessors
    } = globalStore((state: any) => state);
    const [modalStatusVisibility, setModalStatusVisibility] =
        useState<boolean>(false);
    const [deleteModalStatusVisibility, setDeleteModalStatusVisibility] =
        useState<boolean>(false);

    const openModal = () => {
        setModalStatusVisibility(true);
    };
    const closeModal = () => {
        setModalStatusVisibility(false);
    };

    const openDeleteModal = () => {
        setDeleteModalStatusVisibility(true);
    };
    const closeDeleteModal = () => {
        setDeleteModalStatusVisibility(false);
    };

   

    const deleteProfessor = async () => {
        const deleteProfessorRoute: string = `${API_URL}/professors/${professor.id}`;

        await axios
            .delete(
                deleteProfessorRoute,
                // {
                //     data: {
                //         active: false
                //     }
                // },
                axiosConfig
            )
            .then((response: any) => {
                let professorsUpdated: any = professors.filter(
                    (item: any) => item.id !== professor.id
                );

                setProfessors(professorsUpdated);
                notifySuccess('SUCCESS', 'users');
                closeDeleteModal();
            })
            .catch((error: any) => {
                console.log(error);
                notifyError('ERROR', 'users');
            });
    };

   

   
    return (
        <div className="w-full border-t py-2 flex justify-between items-center text-basicColor">
            {/* <div className="mr-4">
                <Checkbox
                    checked={professor?.checked}
                    onClick={() => {
                        check(professors, setProfessors, index);
                    }}
                />
            </div> */}
            <h3 className="w-[30%] max-[400px]:w-[80%] sm:w-[22%] flex items-center text-sm text-basicColorDark font-medium">
                <Image
                    src={professor?.picture || ""}
                    alt="name"
                    width={45}
                    height={45}
                    className="h-12 w-12 mr-4 rounded-md object-contain"
                />
                <span>{`${professor?.name}`}</span>
            </h3>
            <h3 className="hidden sm:block w-[14%] text-sm">
                {professor?.lastName}
            </h3>
            {/* [1].document.data.attributes.name */}
            <p
                className="max-[400px]:hidden w-[30%] sm:w-[18%] text-sm"
            >
               {professor?.firstName}PP3
            </p>
            <h3 className="hidden sm:flex w-[17%] items-center text-sm text-basicColorDark">
                <span>{professor?.class}</span>
            </h3>
            <h3 className="hidden sm:block w-[10%] text-sm">
                {(professor?.hours)}
            </h3>
            <h3 className="hidden sm:block w-[10%] text-sm">
                {(professor?.address)}
            </h3>
            <h3 className="w-[20%] sm:w-[10%] text-sm font-medium">
            {formatDate(professor?.birthDate)}
            </h3>
            <p className="w-[20%] sm:w-[10%] flex text-sm">
                <MdModeEditOutline
                    className="mr-1 text-lg cursor-pointer hover:text-primaryColor"
                    onClick={() => openModal()}
                />
                <RiDeleteBin5Line
                    className="mr-1 text-lg cursor-pointer hover:text-alertColor"
                    onClick={openDeleteModal}
                />
            </p>

            <ModalContainer
                isOpen={modalStatusVisibility}
                onClick={closeModal}
                classNames="w-11/12 sm:w-7/12 h-full"
            >
                <UpdateProfessor
                    professor={professor}
                    closeModal={closeModal}
                    user={userConnected}
                />
            </ModalContainer>

            <ModalContainer
                isOpen={deleteModalStatusVisibility}
                onClick={closeDeleteModal}
                classNames="w-11/12 sm:w-7/12 h-fit"
            >
                <DeleteContainer
                    onClick={deleteProfessor}
                    closeModal={closeDeleteModal}
                    title="Supprimer le professor"
                />
            </ModalContainer>
        </div>
    );
}