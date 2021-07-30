import yup from './index';

const LoginSchema = yup.object().shape({
  username: yup.string().required('Required'),
  password: yup.string().required('Required'),
});

export default LoginSchema;
