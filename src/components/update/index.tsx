import UploadImage from '../uploadImage';
import { LayoutContext } from '../layout';
import { useContext, useEffect, useState } from 'react';
import Button from '../button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import {
    API_UPLOAD_IMAGE_URL,
    API_URL,
    axiosConfig,
    convertInBase64,
    notifyError,
    notifySuccess,
    updateItemInTheStore,
    uploadDocument,
    uploadImage
} from '@/helpers';
import Input from '../input';
import axios from 'axios';
import globalStore from '@/store';
import Loader from '../loader';
import SelectDate from '../selectDate';
import Select from '../select';

export default function UpdateProfessor({ closeModal, professor, user }: any) {
    const {
        user: userConnected,
        setProfessors,
        professors,
        documents
    } = globalStore((state: any) => state);

    const [professorToUpdate, setProfessorToUpdate]: any = useState({
        ...professor,
    });

    const [loaderIsVisible, setLoaderIsVisible] = useState<boolean>(false);

    const {
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onChange = (e: any) => {
        const { name, value } = e.target;

        console.log('value', value);

    
            setProfessorToUpdate((previousState: any) => ({
                ...previousState,
                [name]: value
            }));

        // setValue(name, value);
    };

    const onChangeImage = async (e: any) => {
        const { name } = e.target;

        convertInBase64(e.target.files[0],setProfessorToUpdate,"professor")

        // const body = new FormData();
        // body.append('file', e.target.files[0]);

        // const content: any = {
        //     method: 'post',
        //     body
        // };
        // const localLink = URL.createObjectURL(e.target.files[0]);

        // setProfessorToUpdate((previousState: any) => ({
        //     ...previousState,
        //     [name]: {
        //         content,
        //         localLink
        //     }
        // }));
    };

    const updateProfessor = handleSubmit(async () => {
        setLoaderIsVisible(true);
        const updateProfessorRoute: string = `${API_URL}/professors/${professor?.id}?populate[document]=true`;

        let errorMessage: string = '';

        try {
            let professorFormatted: any = {
                ...professorToUpdate,
            };

            await axios
                .put(
                    updateProfessorRoute,
                    {
                        data: professorFormatted
                    },
                    axiosConfig
                )
                .then((response: any) => {
                    updateItemInTheStore(
                        professors,
                        {
                            ...professorFormatted,
                            document: response?.data.data.attributes.document
                        },
                        setProfessors
                    );
                    notifySuccess('SUCCESS', 'users');
                    closeModal();
                })
                .catch((error: any) => {
                    console.log(error);
                    notifyError('EEROR', 'users');
                });
        } catch (error: any) {
            console.log(error);
            notifyError('EEROR', 'users');
        }
        setLoaderIsVisible(false);
    });

    useEffect(() => {
        Object.keys(professorToUpdate).forEach((key: any) => {
            null
            // setValue(key, professorToUpdate[key]);
        });
    }, []);

    console.log("TEST EE",professorToUpdate);

    return (
        <div className="h-full overflow-y-scroll">
            {loaderIsVisible ? (
                <Loader />
            ) : (
                <div>
                    <h1 className="text-2xl text-center font-medium mb-2">
                        Mettre à jour le professeur
                    </h1>
                    <div className="w-fit mx-auto mb-2">
                        <UploadImage
                            label="Image"
                            name="picture"
                            image={professorToUpdate?.picture}
                            onChange={onChangeImage}
                        />
                    </div>
                    <Input
                        disabled={false}
                        errorLabel={
                          ""
                        }
                        labelPosition="exterior"
                        label="Prénom"
                        name="firstName"
                        onChange={onChange}
                        required={false}
                        type=""
                        value={professorToUpdate.firstName}
                    />

                    <Input
                        disabled={false}
                        errorLabel={
                            ""
                        }
                        labelPosition="exterior"
                        label="Postnom"
                        name="lastName"
                        onChange={onChange}
                        required={false}
                        type=""
                        value={professorToUpdate.lastName}
                    />
                    <Input
                        disabled={false}
                        errorLabel={
                            ""
                        }
                        labelPosition="exterior"
                        label="Nom"
                        name="name"
                        onChange={onChange}
                        required={false}
                        type=""
                        value={professorToUpdate.name}
                    />
                    <Input
                        disabled={false}
                        errorLabel={
                            ""
                        }
                        labelPosition="exterior"
                        label="Téléphone"
                        name="phoneNumber"
                        onChange={onChange}
                        required={false}
                        type=""
                        value={professorToUpdate.phoneNumber}
                    />

                    {/* <SelectDate
                        defaultValue={professorToUpdate?.birthDate}
                        errorLabel={
                            ""
                        }
                        label={
                           "Date de naissance"
                        }
                        onChange={(e: any) => {
                            setProfessorToUpdate((previousState: any) => ({
                                ...previousState,
                                birthDate: e.$d.getTime()
                            }));
                        }}
                        required={false}
                        labelPosition="external"
                        value={professorToUpdate?.birthDate}
                    /> */}

                    <Input
                        disabled={false}
                        errorLabel={
                            ""
                        }
                        labelPosition="exterior"
                        label="Matricule"
                        name="employeeId"
                        onChange={onChange}
                        required={false}
                        type=""
                        value={professorToUpdate.employeeId}
                    />



                <Input
                        disabled={false}
                        errorLabel={
                            ""
                        }
                        labelPosition="exterior"
                        label="Cours"
                        name="class"
                        onChange={onChange}
                        required={false}
                        type=""
                        value={professorToUpdate.class}
                    />

                    <Input
                        disabled={false}
                        errorLabel={
                            ""
                        }
                        labelPosition="exterior"
                        label="Heure(s)"
                        name="hours"
                        onChange={onChange}
                        required={false}
                        type=""
                        value={professorToUpdate.hours}
                    />
                    <Input
                        disabled={false}
                        errorLabel={
                            ""
                        }
                        labelPosition="exterior"
                        label="Adresse"
                        name="address"
                        onChange={onChange}
                        required={false}
                        type=""
                        value={professorToUpdate.address}
                    />

                    <div className="mt-6 mx-auto w-36">
                        <Button
                            icon=""
                            label="Soumettre"
                            onClick={updateProfessor}
                            type="primary"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}