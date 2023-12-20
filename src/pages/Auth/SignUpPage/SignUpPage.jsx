import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BigButton from '../../../components/common/BigButton/BigButton';
import Paper from '../../../components/common/Paper/Paper';
import Header from '../../../components/Header/Header';
import ErrorMsg from '../../../components/common/ErrorMsg/ErrorMsg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { authOperations, authSelectors } from '../../../redux/auth';
import s from './SignUpPage.module.css';

const NAME_REQUIRED = 'signUpForm.nameRequired';
const INVALID_EMAIL = 'signUpForm.invalidEmail';
const EMAIL_REQUIRED = 'signUpForm.emailRequired';
const PASSWORD_REQUIRED = 'signUpForm.passwordRequired';
const PASSWORD_LENGTH = 'signUpForm.passwordLength';
const PASSWORD_CRITERIA = 'signUpForm.passwordCriteria';
const PASSWORD_MISMATCH = 'signUpForm.passwordMismatch';
const CONFIRM_PASSWORD_REQUIRED = 'signUpForm.confirmPasswordRequired';

const schema = yup.object().shape({
  displayName: yup.string().trim().required(NAME_REQUIRED),
  email: yup.string().trim().email(INVALID_EMAIL).required(EMAIL_REQUIRED),
  password: yup
    .string()
    .trim()
    .required(PASSWORD_REQUIRED)
    .min(8, PASSWORD_LENGTH)
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, PASSWORD_CRITERIA),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), null], PASSWORD_MISMATCH)
    .required(CONFIRM_PASSWORD_REQUIRED),
});

const SignUpPage = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const location = useLocation();
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loading = useSelector(authSelectors.getLoading);
  const error = useSelector(authSelectors.getError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = data => {
    dispatch(authOperations.signUp(data)).then(() => {
      navigation(location.state?.from ?? '/university', { replace: true });
      toast.success(t('signUpForm.registrationSuccess'));
    });
  };

  return (
    <div>
      <Header />

      <Paper>
        <div className={s.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className={s.label}>
              {t('signUpForm.name')}
              <input
                {...register('displayName')}
                type="text"
                placeholder={t('signUpForm.placeholderName')}
                className={s.input}
              />
              {errors.displayName && (
                <ErrorMsg message={t(errors.displayName.message)} />
              )}
            </label>

            <label className={s.label}>
              {t('signUpForm.email')}
              <input
                {...register('email')}
                type="text"
                placeholder="email@mail.com"
                className={s.input}
              />
              {errors.email && <ErrorMsg message={t(errors.email.message)} />}
            </label>

            <label className={s.label}>
              {t('signUpForm.password')}
              <div className={s.passwordContainer}>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  className={s.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={s.passwordToggle}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
              {errors.password && (
                <ErrorMsg message={t(errors.password.message)} />
              )}
            </label>

            <label className={s.label}>
              {t('signUpForm.confirmPassword')}
              <div className={s.passwordContainer}>
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="********"
                  className={s.input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={s.passwordToggle}
                >
                  {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <ErrorMsg message={t(errors.confirmPassword.message)} />
              )}
            </label>

            <BigButton
              type="submit"
              text={t('signUpForm.signUp')}
              disabled={loading}
            />
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default SignUpPage;
