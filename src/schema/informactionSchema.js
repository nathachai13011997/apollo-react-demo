import * as yup from 'yup'
const informactionSchema = yup.object().shape({
    username: yup.string().required('username is a required field'),
    name: yup.string().required("name is a required field"),
    email: yup.string().email().required('email is a required field'),
    phone: yup.string().required(),
});
export default informactionSchema