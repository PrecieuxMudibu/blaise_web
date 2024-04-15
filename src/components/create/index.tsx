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
    uploadDocument,
    uploadImage
} from '@/helpers';
import Input from '../input';
import axios from 'axios';
import globalStore from '@/store';
import Loader from '../loader';
import SelectDate from '../selectDate';
import Select from '../select';
import UploadImage from '../uploadImage';

export default function CreateProfessor({ closeModal, user }: any) {
    const {
        user: userConnected,
        setProfessors,
        professors,
        documents
    } = globalStore((state: any) => state);

    const [professorToCreate, setProfessorToCreate]: any = useState({});
    const [loaderIsVisible, setLoaderIsVisible] = useState<boolean>(false);

    const { dictionary }: any = useContext(LayoutContext);
    const {
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const onChange = (e: any) => {
        const { name, value } = e.target;

        setProfessorToCreate((previousState: any) => ({
            ...previousState,
            [name]: value
        }));
        // setValue(name, value);
    };

    const onChangeImage = async (e: any) => {
        const { name } = e.target;
        convertInBase64(e.target.files[0], setProfessorToCreate, 'professor');


        // const body = new FormData();
        // body.append('file', e.target.files[0]);

        // const content: any = {
        //     method: 'post',
        //     body
        // };
        // const localLink = URL.createObjectURL(e.target.files[0]);

        // setProfessorToCreate((previousState: any) => ({
        //     ...previousState,
        //     [name]: {
        //         content,
        //         localLink
        //     }
        // }));
    };

    const createProfessor = handleSubmit(async () => {
        setLoaderIsVisible(true);
        const createProfessorRoute: string = `${API_URL}/professors`;

        let errorMessage: string = '';
        try {
            const professorFormatted: any = {
                ...professorToCreate,
                creator: user,
                type: professorToCreate?.type?.value,
                user
            };

            await axios
                .post(
                    createProfessorRoute,
                    {
                        data: professorFormatted
                    },
                    axiosConfig
                )
                .then((response: any) => {
                    console.log('response CREATED', response);
                    console.log(
                        'professorFormatted CREATED',
                        professorFormatted
                    );
                    const professorsUpdated: any[] = [
                        ...professors,
                        {
                            id: response.data.data.id,
                            ...response.data.data.attributes
                        }
                    ];

                    setProfessors(professorsUpdated);
                    notifySuccess('SUCCESS', 'users');
                    closeModal();
                })
                .catch((error: any) => {
                    console.log(error);
                    notifyError('EEROR', 'users');
                });
        } catch (error: any) {
            notifyError('EEROR', 'users');
            console.log(error);
        }
        setLoaderIsVisible(false);
    });

    console.log("ICI", professorToCreate)

    return (
        <div className="h-full overflow-y-scroll">
            {loaderIsVisible ? (
                <Loader />
            ) : (
                <div>
                    <h1 className="text-2xl text-center font-medium mb-2">
                        Ajouter un professeur
                    </h1>
                    <div className="w-fit mx-auto mb-2">
                        <UploadImage
                            label="Image"
                            name="picture"
                            image={professorToCreate?.picture}
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
                        value={professorToCreate.firstName}
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
                        value={professorToCreate.lastName}
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
                        value={professorToCreate.name}
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
                        value={professorToCreate.phoneNumber}
                    />

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
                        value={professorToCreate.employeeId}
                    />

                    {/* <SelectDate
                        defaultValue={professorToCreate?.birthDate}
                        errorLabel={
                            ""
                        }
                        label={
                           "Date de naissance"
                        }
                        onChange={(e: any) => {
                            setProfessorToCreate((previousState: any) => ({
                                ...previousState,
                                birthDate: e.$d.getTime()
                            }));
                        }}
                        required={false}
                        labelPosition="external"
                        value={professorToCreate?.birthDate}
                    /> */}



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
                        value={professorToCreate.class}
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
                        value={professorToCreate.hours}
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
                        value={professorToCreate.address}
                    />


                    <div className="mt-6 mx-auto w-36">
                        <Button
                            icon=""
                            label="Soumettre"
                            onClick={createProfessor}
                            type="primary"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}