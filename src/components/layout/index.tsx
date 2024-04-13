'use client';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { API_URL, axiosConfig, decodeJwt, logout } from '@/helpers';
import globalStore from '@/store';
import { useRouter } from 'next/navigation';

interface Params {
    lang: string;
}

interface LayoutProps {
    children: React.ReactElement;
    type: string;
    params: Params;
    dictionary: any;
}

export const LayoutContext: any = createContext({});

export default function Layout({
    children,
    type,
    params,
    dictionary
}: LayoutProps): React.ReactElement {
    const [isReduced, setIsReduced] = useState<boolean>(false);
    const [responsiveMenuIsVisible, setResponsiveMenuIsVisilble] =
        useState<boolean>(false);
    const [logoutModalStatusVisibility, setLogoutModalStatusVisibility] =
        useState(false);
    const openLogoutModal = () => {
        setLogoutModalStatusVisibility(true);
    };
    const closeLogoutModal = () => {
        setLogoutModalStatusVisibility(
            (previousState: boolean) => !previousState
        );
    };
    const onClick = () => {
        null;
    };

    const { push } = useRouter();

    const {
        setUser,
        employees,
        setEmployees,
        langContainerIsVisible,
        setLangContainerIsVisible,
        payroll,
        setPayroll
    } = globalStore((state:any) => state);

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        const decodedToken = decodeJwt(token);

        const getUserRoute = `${API_URL}/authentification/user/${decodedToken?.id}`;
        getUser(getUserRoute);
    }, []);

    const getUser = async (route: string) => {
        await axios
            .get(route, axiosConfig)
            .then((response: any) => {
                setUser(response.data);
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    // If the screen width is less than 768, enlarge the sidebar so that sub-menus appear smoothly on small screens
    useEffect(() => {
        if (window.innerWidth < 768 && isReduced) {
            setIsReduced(false);
        }
    }, [isReduced, responsiveMenuIsVisible]);


    const logoutAndReturnToLogin = (): any => {
        logout();
        push(`/${params?.lang}/auth/login`);
    };

    const closeAllSubMenu = () => {
        setLangContainerIsVisible(false);
        const employeesUpdated: any = employees.map((employee: any) => ({
            ...employee,
            optionIsVisible: false
        }));

        const payrollUpdated: any = payroll.map((item: any) => ({
            ...item,
            optionIsVisible: false
        }));

        setPayroll(payrollUpdated);
        setEmployees(employeesUpdated);
    };

    const employeeIsSelected: any =
        employees.filter((item: any) => item?.optionIsVisible === true)
            .length !== 0;

    const oneItemInPayrollHasOptionVisible: any =
        payroll.filter((item: any) => item?.optionIsVisible === true).length !==
        0;

    return (
        <LayoutContext.Provider value={{ dictionary, lang: params.lang }}>
            {type === 'none' ? (
                <div className="bg-red-500">{children}</div>
            ) : (
                <div className="w-full h-full flex relative">

               
                    <div className="w-full relative">
                    
                        <main className="flex w-full h-full">
                            {(employeeIsSelected ||
                                langContainerIsVisible ||
                                oneItemInPayrollHasOptionVisible) && (
                                <div
                                    className="absolute left-2 z-100 w-screen h-screen"
                                    onClick={() => closeAllSubMenu()}
                                ></div>
                            )}
                            {children}
                        </main>
                    </div>
                </div>
            )}
        </LayoutContext.Provider>
    );
}