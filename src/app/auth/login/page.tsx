'use client';

import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
// import Logo from '@/public/logoITM.png';
import { useContext, useEffect, useState } from 'react';
import Input from '@/components/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_URL, axiosConfig, notifyError, setCookie } from '@/helpers';
import { ToastContainer } from 'react-toastify';
import Loader from '@/components/loader';
import globalStore from '@/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import havilaImage from "@/havila.jpeg"

// import bcrypt from "bcrypt"

interface Login {
    email: string;
    password: string;
}

export default function Login() {
    const { push } = useRouter();
    const { setUser } = globalStore(state => state);
    const {
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const from = searchParams.get('from');
    const to = searchParams.get('to');


    useEffect(() => {}, []);

    const [data, setData] = useState<Login>({
        email: '',
        password: ''
    });
    const [loaderIsVisible, setLoaderIsVisible] = useState<boolean>(false);

    const onChange = (e: any) => {
        const { name, value } = e.target;
        setData((previousState: Login) => ({
            ...previousState,
            [name]: value
        }));

        setValue(name, value);
    };

    const onSubmit = handleSubmit(async (e:any) => {
        setLoaderIsVisible(true);
        console.log("PASSE TEST",e)
        // e.preventDefault();
        

        


        const loginRoute = API_URL + '/authentification/login';

        try {
            // await axios
            //     .post(
            //         loginRoute,
            //         {
            //             data
            //         },
            //         axiosConfig
            //     )
            //     .then((response: any) => {
            //         localStorage.setItem('token', response.data.jwt);
            //         setUser(response.data.user);
            //         setCookie('token', response.data.jwt, 3);
            //         push(`/dashboard`);
            //         setLoaderIsVisible(false);
            //     })
            //     .catch((error: any) => {
            //         console.log(error);
            //         notifyError("Quelque chose s'est mal passé.", 'login');
            //         setLoaderIsVisible(false);
            //     });

            if((data.email=== "blaise@gmail.com" && data.password=== "123456") || (data.email=== "sukama@gmail.com" && data.password=== "000000")) {
                push("/dashboard")
            }
            else {
                alert('Identifiants incorrect')
                // notifyError("Identifiants incorrect", 'login');
                
            }
                    setLoaderIsVisible(false);

            console.log("PASSE")

            // else {
            //     setValue("password", "")
            //     setValue("email", "")
            //     if(data.email ==="" || data.password ==="") {
            //         onSubmit(e)
            //     }
            // }
        } catch (error: any) {
            notifyError("Quelque chose s'est mal passé", 'login');
            setLoaderIsVisible(false);
        }
    });
    return (
        <>

          <Image
                src={havilaImage}
                alt="Havila"
                height={400}
                width={400}
                className='w-24 h-24 mx-auto'
                />

          <h1 className='text-center text-basicColorDark text-xl'>Collège Havila</h1>

          <div className="flex items-center h-full overflow-y-scroll">
            
        <ToastContainer containerId={'login'} />
            
            {/* <ToastContainer enableMultiContainer={true} containerId={'login'} /> */}

            <div className="m-auto">
                {/* <div className="flex justify-center mb-6">
                    <Image src={Logo} alt="Logo" width={280} height={280} />
                </div> */}
                <div className="sm:min-w-[490px] bg-white px-10 py-10 rounded">
                    <div>
                        {/* <h2 className="text-2xl font-semibold text-center">
                            Connexion
                        </h2> */}
                        <p className="mt-2 text-lg text-gray-400 text-center">
                            Veuillez entrer vos identifiants
                        </p>
                        <div
                            // onSubmit={(e)=>onSubmit(e)}
                            className="mt-8"
                        >
                            <div>
                                <Input
                                    disabled={false}
                                    errorLabel={
                                        errors?.email ?
                                   "Veuillez saisir un email" : ""
                                    }
                                    labelPosition="exterior"
                                    label={
                                     "Email"
                                    }
                                    name="email"
                                    onChange={onChange}
                                    required={false}
                                    type=""
                                    placeholder="******@gmail.com"
                                    value={data.email}
                                />
                            </div>
                            <Input
                                disabled={false}
                                errorLabel={
                                    errors.password ? "Veuillez entrer un mot de passe" : ""
                                }
                                labelPosition="exterior"
                                label="Mot de passe"
                                placeholder=""
                                name="password"
                                onChange={onChange}
                                required={false}
                                type="password"
                                value={data.password}
                            />
                            <div className="mt-6">
                                {loaderIsVisible ? (
                                    <button
                                        type="submit"
                                        className="flex justify-center items-center bg-gradient-to-r from-cyan-400 to-blue-600 w-full hover:opacity-80 transition h-14 text-white rounded"
                                    >
                                        <Loader />
                                        {''}
                                    </button>
                                ) : (
                                    // <Link href="/dashboard">
                                        <button className="bg-gradient-to-r from-cyan-400 to-blue-600 w-full hover:opacity-80 transition h-14 text-white rounded" onClick={(e)=> onSubmit(e)}>
                                            Se connecter
                                        </button>
                                    // </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <p className="mt-6 text-center">
                            {dictionary.loginPage.forgotPassword}
                            <Link
                                href={`/${lang}/auth/change_password`}
                                className="ml-1 text-blue-500"
                            >
                                {dictionary.loginPage.resetPassword}
                            </Link>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
        </>
       
    );
}