import { toast } from 'react-toastify';
import axios from 'axios';

export const API_URL = process.env.NEXT_PUBLIC_API || "https://blaise-api.onrender.com/api";
export const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
// export const API_URL = 'https://api.hr.itmafrica.com/api';

export const convertInBase64 = (file: any, setState: any, type: string) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
        let fileIn64Base: any = await reader.result;

        switch (type) {
            case 'professor':
                setState((previousState: any) => ({
                    ...previousState,
                    picture: fileIn64Base
                }));
                break;

          

            default:
                break;
        }
    };
};

export const checkOrUncheckAll = (items: any[], setItems: any) => {
    const oneItemIsChecked: number = items.find(
        (item: any) => item.checked === true
    );

    let itemsUpdated: any[] = [];

    if (oneItemIsChecked) {
        itemsUpdated = items.map((item: any) => ({
            ...item,
            checked: false
        }));
    } else {
        itemsUpdated = items.map((item: any) => ({
            ...item,
            checked: true
        }));
    }

    console.log('itemsUpdated-->', itemsUpdated);

    setItems(itemsUpdated);
};

export const API_UPLOAD_IMAGE_URL =
    'https://itm-upload-files.azurewebsites.net/api/uploadimage/test';

export const API_UPLOAD_DOCUMENT_LINK =
    'https://itm-upload-files.azurewebsites.net/api/uploadcv/test';

// export const API_UPLOAD_IMAGE_URL =
//     'http://localhost:1337/api/uploadimage/test';

// export const API_UPLOAD_DOCUMENT_LINK =
//     'http://localhost:1337/api/uploadcv/test';

export const uploadImage = async (route: string, content: any) => {
    const response = await fetch(route, content);
    const data = await response.json();

    return data.uri;
};

export const transformIntoLowerCaseWithoutSpace = (label: string) =>
    label.toLowerCase().trim()?.replaceAll(' ', '').split(' ').join('');

export const uploadDocument = async (content: any) => {
    return fetch(API_UPLOAD_DOCUMENT_LINK, content)
        .then((response: any) => response.json())
        .then((response: any) => response.uri)
        .catch((error: any) => {
            console.log(error);
        });
};

export const uploadPayrollDocument = async (content: any) => {
    return fetch(
        'https://itm-upload-files.azurewebsites.net/api/uploadcv/payroll-file',
        content
    )
        .then((response: any) => {
            console.log('RESPONSE--->1', response);

            return response.json();
        })
        .then((response: any) => {
            console.log('RESPONSE--->2', response);
            return response.uri;
        })
        .catch((error: any) => {
            console.log(error);
        });
};

export const decodeJwt = (token: string | null) => {
    if (!token) {
        return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export const axiosConfig = {
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_PAYROLL_TOKEN}`,
        'content-type': 'application/json'
    }
};

export const notifySuccess = (message: string, containerId: string) =>
    toast.success(message, {
        containerId,
        position: 'bottom-right',
        theme: 'colored'
    });

export const notifyError = (message: string, containerId: string) =>
    toast.error(message, {
        containerId,
        position: 'bottom-right',
        theme: 'colored'
    });

export const setCookie = (
    cookieName: string,
    cookieValue: number | string,
    expiresInDays: number
) => {
    const d = new Date();
    d.setTime(d.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie =
        cookieName + '=' + cookieValue + ';' + expires + ';path=/';
};

export const deleteCookie = (cookieName: string) => {
    let expires = 'expires=' + new Date(0).toUTCString();
    document.cookie = cookieName + '=' + '' + ';' + expires + ';path=/';
};

export const getCookie = (cookieName: any) => {
    let name = cookieName + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};
export const updateItemInTheStore = (
    itemsOfTheStore: any,
    itemToUpdate: any,
    setInTheStore: any
) => {
    const itemsOfTheStoreUpdated = itemsOfTheStore.map((item: any) => {
        if (item.id == itemToUpdate.id) {
            return { ...itemToUpdate };
        }
        return item;
    });

    setInTheStore(itemsOfTheStoreUpdated);
};

export const showOptions = (
    itemToShowOptions: any,
    items: any,
    setItems: any
): any => {
    let itemsUpdated = [];
    const indexOfTheIttem = items.findIndex(
        (item: any) => item.id == itemToShowOptions.id
    );

    itemsUpdated = items.map((item: any, index: number) => {
        if (indexOfTheIttem == index) {
            return {
                ...item,
                optionIsVisible: !item.optionIsVisible
            };
        }
        return {
            ...item,
            optionIsVisible: false
        };
    });

    setItems(itemsUpdated);
};

export const formatDate = (value: string, locale = 'en-GB') => {
    return new Date(value).toLocaleDateString(locale);
};

export const findMonth = (index: number) => {
    const months = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
    ];

    return months[index];
};

const ExcelDateToJSDate = (serial: any) => {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(
        date_info.getFullYear(),
        date_info.getMonth(),
        date_info.getDate(),
        hours,
        minutes,
        seconds
    );
};

const convertDateToTimestamp = (date: string) => {
    // return new Date(date).getTime();
    return new Date(date);
};

const convertDateIntoMonthDayYearFormatString = (date: string) => {
    console.log('DATE RR', date);
    const dateSplitted: any = date.split('/');

    return `${dateSplitted[1]}/${dateSplitted[0]}/${dateSplitted[2]}/`;
};

function recupererChiffresVirgulePoint(chaine: string) {
    // On remplace la virgule par un point.
    console.log('chaine', chaine);

    chaine = `${chaine}`.replace(',', '');

    // On récupère la partie de la chaîne de caractères contenant les chiffres,
    // la virgule, et le point.

    const chiffresVirgulePoint = chaine.split('.')[0];

    // On retourne la chaîne de caractères contenant les chiffres, la virgule,
    // et le point.

    return chiffresVirgulePoint;
}

const remplacerVirgulesParPoints = (chaine: string) => {
    return chaine.replace(',', '');
};

function isHashConsecutive(chaine: string, type: string) {
    const regex = /^#+$/;
    // return regex.test(chaine);

    if (regex.test(chaine)) {
        return 0;
    }

    if (type == 'number') {
        const stringWithoutComa: string = remplacerVirgulesParPoints(
            `${chaine}`
        );
        return parseFloat(stringWithoutComa);
    }

    return chaine;
}

const findKeysWhere = (object: any, characterToSearch: string) => {
    const occurrences = [];

    for (const key in object) {
        if (object[key] === characterToSearch) {
            occurrences.push(key);
        }
    }

    return occurrences;
};

export const getObjectSize = (obj: any) => {
    const jsonString = JSON.stringify(obj);
    const bytes = jsonString.length * 2; // Assuming 2 bytes per character (UTF-16)
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;
    return megabytes.toFixed(2); // Round to two decimal places
};


export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
    ];
};

export const searchInArray = (
    valueToSearch: string,
    arrayWhereToSearch: any[],
    type: string
) => {
    try {
        const regularExpression: any = new RegExp(
            '^.*' + valueToSearch + '.*$',
            'i'
        );

        switch (type) {
            case 'period':
                return arrayWhereToSearch.filter((element: any) =>
                    regularExpression.test(element?.attributes?.name)
                );

            case 'country':
                return arrayWhereToSearch.filter((element: any) =>
                    regularExpression.test(element?.attributes?.name)
                );

            case 'entity':
                return arrayWhereToSearch.filter((element: any) =>
                    regularExpression.test(element?.attributes?.name)
                );

            case 'organisationCity':
                return arrayWhereToSearch.filter((element: any) =>
                    regularExpression.test(element?.label)
                );

            case 'payroll':
                return arrayWhereToSearch.filter((element: any) =>
                    regularExpression.test(element?.user?.name)
                );
            default:
                break;
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const check = (items: any, setItems: any, index: number): any => {
    let itemsUpdated = [...items];
    itemsUpdated[index].checked = !itemsUpdated[index].checked;

    setItems(itemsUpdated);
};

export const getId = (data: any, name: string) => {
    return data.find((item: any) => item.name == name)?.id;
};

export const sortInAlphabeticOrder = (data: any[], type: string) => {
    switch (type) {
        case 'value':
            break;

        default:
            return data.sort((a: any, b: any) =>
                a.label.localeCompare(b.label)
            );
    }
};


export const removeDuplicates = (datas: any[]) => {
    let dataWithoutDuplicates: any[] = [];

    datas.map((data: any) => {
        let index = dataWithoutDuplicates.findIndex(
            item => data.id === item?.id
        );
        if (index === -1) {
            dataWithoutDuplicates.push(data);
        }
    });

    return dataWithoutDuplicates;
};

export const logout = (): any => {
    localStorage.removeItem('token');
    deleteCookie('token');
};

export const limitOptions = [
    {
        label: '25',
        value: 25
    },
    {
        label: '50',
        value: 50
    },
    {
        label: '75',
        value: 75
    },
    {
        label: '100',
        value: 100
    },
    {
        label: 'Tout',
        value: -1
    }
];

export const shirtSize: any = [
    { label: 'XXS', value: 'XXS' },
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: 'XXL', value: 'XXL' }
];

export const addDaysToDate = (dateString: string, daysToAdd: number) => {
    // dateStr = 'Fri Feb 16 2024 14:35:13 GMT+0100 (heure normale d’Europe centrale)';
    const date = new Date(dateString);
    date.setDate(date.getDate() + daysToAdd);
    return date;
};

export const getCountryAndIpAdressUsingApiCountry = async () => {
    return fetch('https://api.country.is/')
        .then((res: any) => res.json())
        .then((res: any) => res)
        .catch((error: any) => error);
};

export const subscribeUserToPush = async (userId: number) => {
    return navigator.serviceWorker
        .register('/sw.js')
        .then((registration: any) => {
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: VAPID_PUBLIC_KEY
            };

            return registration.pushManager.subscribe(subscribeOptions);
        })
        .then(async (pushSubscription: any) => {
            const { ip } = await getCountryAndIpAdressUsingApiCountry();

            // If I return pushSubscription like that, there is not the property keys. But when I stringify it, there is the property keys
            const data = {
                ...JSON.parse(JSON.stringify(pushSubscription)),
                userId,
                ipAddress: ip
            };

            await axios
                .post(
                    `${API_URL}/notification-key-custom`,
                    { data },
                    axiosConfig
                )
                .then((response: any) => {
                    console.log('Success', response);
                    return response;
                })
                .catch((error: any) => {
                    console.log(error);
                });
        })
        .catch((error: any) => {
            console.log('error', error);
        });
};

// ASK PERMISSION TO SHOW NOTIFICATION
export const askPermission = async () => {
    return new Promise((resolve, reject) => {
        const permissionResult = Notification.requestPermission(
            (result: any) => {
                resolve(result);
            }
        );

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then(permissionResult => {
            if (permissionResult !== 'granted') {
                throw new Error("We weren't granted permission.");
            }
            return permissionResult;
        })
        .catch((error: any) => {
            console.log(error);
        });
};

export const oneElementIsCheckedIn = (data: any) => {
    const checkedStatus: boolean =
        data.filter((item: any) => item?.checked === true).length >= 1;

    return checkedStatus;
};

export const langWithFirstLetterInUppercase = (lang: string) => {
    return lang.charAt(0).toUpperCase() + lang.slice(1);
};