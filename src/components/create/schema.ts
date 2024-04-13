import * as yup from 'yup';

const schema = yup
    .object({
        // firstName: yup.string().min(2).required(),
        // lastName: yup.string().min(2).required(),
        // name: yup.string().min(2).required(),
        // phoneNumber: yup.string().min(10).required(),
        // address: yup.string().min(10).required(),
        // birthDate: yup.object({
        //     ['$d']: yup.date()
        // }),
        // class: yup
        //     .object({
        //         label: yup.string().required(),
        //         value: yup.string().required()
        //     })
        //     .required(),
        // document: yup.object({ id: yup.number().required() }).required(),
        // link: yup.object()
    })
    .required();

export default schema;