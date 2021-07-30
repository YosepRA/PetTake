import yup from './index';

const RegisterSchema = yup.object().shape({
  name: yup.string().required('Required'),
  username: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
  passwordRepeat: yup
    .string()
    .required('Required')
    .equalTo(yup.ref('password'), 'Password does not match'),
});

export default RegisterSchema;
