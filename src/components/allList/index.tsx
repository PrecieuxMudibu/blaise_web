import React, { useContext, useEffect, useState } from 'react';
import ProfessorHeader from '../header';
import ProfessorRow from '../row';
import globalStore from '@/store';
import { FaPlus } from 'react-icons/fa6';
import ModalContainer from '../modal';
import CreateProfessor from '../create';
import axios from 'axios';
import {
    API_URL,
    axiosConfig,
    notifySuccess,
} from '@/helpers';
import DeleteContainer from '../deleteContainer';
import { LayoutContext } from '../layout';
export default function ProfessorsAllList({ user }: any) {
    const { dictionary }: any = useContext(LayoutContext);

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
        setModalStatusVisibility((previousState: boolean) => !previousState);
    };

    const openDeleteModal = () => {
        setDeleteModalStatusVisibility(true);
    };
    const closeDeleteModal = () => {
        setDeleteModalStatusVisibility(false);
    };


    const deleteProfessors = async () => {
        const professorsChecked: any[] = professors.filter(
            (professor: any) => professor.checked === true
        );
        let professorsUpdated: any[] = professors;

        for (const professor of professorsChecked) {
            const deleteProfessorRoute: string = `${API_URL}/professors/${professor.id}`;

            await axios
                .put(
                    deleteProfessorRoute,
                    {
                        data: {
                            active: false
                        }
                    },
                    axiosConfig
                )
                .then(() => {
                    professorsUpdated = professorsUpdated.filter(
                        (item: any) => item.id !== professor.id
                    );
                })
                .catch((error: any) => {
                    console.log(error);
                });
        }

        closeDeleteModal();
        notifySuccess('Success', 'users');
        setProfessors(professorsUpdated);
    };

    useEffect(()=>{
        const getProfessorRoute: string = `${API_URL}/professors`;

         axios
            .get(
                getProfessorRoute,
                // {
                //     data: {
                //         active: false
                //     }
                // },
                axiosConfig
            )
            .then((response: any) => {

                console.log(response)
                setProfessors(response?.data?.data?.map((item:any)=>({...item, ...item.attributes})))
            })
            .catch((error: any) => {
                console.log(error);
            });
    },[])
    return (
        <div>
            <div className="flex items-center justify-end mt-10">
                 <h2 className="w-full mb-4 text-basicColorDark text-lg font-medium">
                    Professeurs
                </h2>
               
                <div
                    className={`w-fit text-basicColor mb-4 px-4 py-2 flex justify-between bg-white rounded-xl`}
                >
                    <FaPlus
                        onClick={openModal}
                        className="mr-1 cursor-pointer hover:text-cyan-400"
                    />

                </div>
            </div>

            <table className="w-full bg-white rounded-xl px-6">
                <ProfessorHeader />
                {professors?.map((professor: any, index: number) => (
                    <ProfessorRow
                        professor={professor}
                        index={index}
                        user={user}
                    />
                ))}
            </table>
            {/* <Pagination totalPages={1} /> */}

            <ModalContainer
                isOpen={modalStatusVisibility}
                onClick={closeModal}
                classNames="w-11/12 sm:w-7/12 h-full"
            >
                <CreateProfessor closeModal={closeModal} user={user} />
            </ModalContainer>

            <ModalContainer
                isOpen={deleteModalStatusVisibility}
                onClick={closeDeleteModal}
                classNames="w-11/12 sm:w-7/12 h-fit"
            >
                <DeleteContainer
                    onClick={deleteProfessors}
                    closeModal={closeDeleteModal}
                    title="Supprimer les professors"
                />
            </ModalContainer>
        </div>
    );
}