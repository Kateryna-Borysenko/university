import { useTranslation } from 'react-i18next';

import NavItem from './NavItem/NavItem';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  HiBookOpen,
  HiAcademicCap,
  HiOutlineUserAdd,
  HiOutlineLogin,
  HiOutlineLogout,
} from 'react-icons/hi';
import { authSelectors, signOut } from '../../redux/auth';
import s from './Navigation.module.css';

const Navigation = () => {
  const { t } = useTranslation();

  const location = useLocation();

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const dispatch = useDispatch();

  const handleSignOut = () => dispatch(signOut());

  return (
    <nav>
      <ul className={s.container}>
        <NavItem
          name={t('sidebar.departments')}
          icon={<HiAcademicCap color="#cbd58b" size="24" />}
          path="/departments"
        />

        {isLoggedIn && (
          <NavItem
            name={t('sidebar.university')}
            icon={<HiBookOpen color="#cbd58b" size="24" />}
            path="/university"
          />
        )}

        {!isLoggedIn && (
          <>
            <NavItem
              name="Sign Up"
              path={{
                pathname: '/sign-up',
                state: { from: location },
              }}
              icon={<HiOutlineUserAdd color="#151e2a" size="24px" />}
            />
            <NavItem
              name="Sign In"
              path={{
                pathname: '/sign-in',
                state: { from: location },
              }}
              icon={<HiOutlineLogin color="#151e2a" size="24px" />}
            />
          </>
        )}

        {isLoggedIn && (
          <p className={s.logOutBtn} onClick={handleSignOut}>
            <span className={s.iconWrapper}>
              <HiOutlineLogout color="#151e2a" size="24px" />
            </span>
            <span className={s.itemName}>Sign Out</span>
          </p>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
