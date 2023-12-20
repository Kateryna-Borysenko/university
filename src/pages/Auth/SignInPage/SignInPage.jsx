import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import BigButton from '../../../components/common/BigButton/BigButton';
import Paper from '../../../components/common/Paper/Paper';
import Header from '../../../components/Header/Header';
import ErrorMsg from '../../../components/common/ErrorMsg/ErrorMsg';
import { authOperations, authSelectors } from '../../../redux/auth';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('singInForm.invalidEmail')
    .required('singInForm.emailRequired'),
  password: yup
    .string()
    .trim()
    .required('singInForm.passwordRequired')
    .min(8, 'singInForm.passwordLength')
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      'singInForm.passwordCriteria',
    ),
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

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmit = data => {
    dispatch(authOperations.signIn(data)).then(() => {
      navigation(location.state?.from ?? '/university', { replace: true });
    });
  };

  return (
    <div>
      <Header />

      <Paper>
        <div style={{ padding: 20 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              {t('singInForm.email')}
              <input
                {...register('email')}
                type="text"
                placeholder="email@mail.com"
              />
              {errors.email && <ErrorMsg message={t(errors.email.message)} />}
            </label>

            <label>
              {t('singInForm.password')}
              <div style={{ display: 'flex' }}>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Qqwe123!"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer', marginLeft: '-25px' }}
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
