
import * as yup from 'yup';

const schema = yup
    .object({
        phoneNumber: yup.string().min(10).required(),
        password: yup.string().min(4).required()
    })
    .required();

export default schema;
