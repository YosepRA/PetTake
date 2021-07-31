import yup from './index';

const ChangePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Required'),
  newPassword: yup.string().required('Required'),
  newPasswordRepeat: yup
    .string()
    .required('Required')
    .equalTo(yup.ref('newPassword'), 'Password does not match'),
});

export default ChangePasswordSchema;
