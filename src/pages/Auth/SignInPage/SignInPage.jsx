import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import BigButton from '../../../components/common/BigButton/BigButton';
import Paper from '../../../components/common/Paper/Paper';
import Header from '../../../components/Header/Header';
import ErrorMsg from '../../../components/common/ErrorMsg/ErrorMsg';
import { authOperations, authSelectors } from '../../../redux/auth';
import s from './SignInPage.module.css';

const INVALID_EMAIL = 'singInForm.invalidEmail';
const EMAIL_REQUIRED = 'singInForm.emailRequired';
const PASSWORD_REQUIRED = 'singInForm.passwordRequired';
const PASSWORD_LENGTH = 'singInForm.passwordLength';
const PASSWORD_CRITERIA = 'singInForm.passwordCriteria';

const schema = yup.object().shape({
  email: yup.string().trim().email(INVALID_EMAIL).required(EMAIL_REQUIRED),
  password: yup
    .string()
    .trim()
    .required(PASSWORD_REQUIRED)
    .min(8, PASSWORD_LENGTH)
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/, PASSWORD_CRITERIA),
});

const SignInPage = () => {
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
  const error = useSelector(authSelectors.getError);
  const loading = useSelector(authSelectors.getLoading);
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(authOperations.signIn(data)).then(() => {
      navigation(location.state?.from ?? '/university', { replace: true });
    });
  };

  return (
    <div>
      <Header />
      <Paper>
        <div className={s.container}>
          {error && <ErrorMsg message={error} />}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className={s.label}>
              {t('singInForm.email')}
              <input
                {...register('email')}
                type="text"
                placeholder="email@mail.com"
                className={s.input}
              />
              {errors.email && <ErrorMsg message={t(errors.email.message)} />}
            </label>

            <label className={s.label}>
              {t('singInForm.password')}
              <div className={s.passwordContainer}>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  className={`${s.input} ${s.passwordInput}`}
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

            <BigButton
              type="submit"
              text={t('singInForm.signIn')}
              disabled={loading}
            />
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default SignInPage;
