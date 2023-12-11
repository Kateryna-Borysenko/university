import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BigButton from '../../../components/common/BigButton/BigButton';
import Paper from '../../../components/common/Paper/Paper';
import Header from '../../../components/Header/Header';
import { authOperations, authSelectors } from '../../../redux/auth';

export const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigation = useNavigate();

  const error = useSelector(authSelectors.getError);
  const loading = useSelector(authSelectors.getLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.signIn({ email, password })).then(() => {
      navigation(location.state?.from ?? '/university', { replace: true });
    });
  };

  const isBtnDisabled = loading || !email || !password;

  return (
    <div>
      <Header />

      <Paper>
        <div style={{ padding: 20 }}>
          <form onSubmit={handleSubmit}>
            <label>
              Email
              <input
                value={email}
                type="text"
                placeholder="email@mail.com"
                required
                onChange={e => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                value={password}
                type="text"
                placeholder="qwerty1234"
                required
                onChange={e => setPassword(e.target.value)}
              />
            </label>

            <BigButton type="submit" text="Sign In" disabled={isBtnDisabled} />
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default SignInPage;
