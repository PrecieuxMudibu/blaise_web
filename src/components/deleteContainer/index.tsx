import axios from 'axios';
import {
    API_URL,
    axiosConfig,
    notifyError,
    notifySuccess,
    updateItemInTheStore
} from '@/helpers';
import globalStore from '@/store';
import { useContext } from 'react';
import Button from '../button';
import { LayoutContext } from '../layout';

interface DeleteContainerProps {
    closeModal: any;
    title: string;
    onClick: any;
}

export default function DeleteContainer({
    closeModal,
    title,
    onClick
}: DeleteContainerProps) {
    const { dictionary }: any = useContext(LayoutContext);

    return (
        <>
            <h1 className="text-2xl text-center font-medium mb-2">Supprimer le professeur</h1>
            <p className="text-center">
                Etes-vous sûr ?
            </p>
            <br />
            <div className="flex justify-between">
                <div className="w-[46%]">
                    <Button
                        type="error"
                        icon=""
                        label={"Supprimer"}
                        onClick={onClick}
                    />
                </div>

                <div className="w-[46%]">
                    <Button
                        type="secondary"
                        icon=""
                        label={"Annuler"}
                        onClick={closeModal}
                    />
                </div>
            </div>
        </>
    );
}