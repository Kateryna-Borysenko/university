import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import NavItem from './NavItem/NavItem';
import s from './Navigation.module.css';

const Navigation = ({ navConfig }) => {
  const { t } = useTranslation();
  return (
    <nav>
      <ul className={s.container}>
        {navConfig.map(({ name, icon, path }, index) => (
          <NavItem key={index} name={t(name)} icon={icon} path={path} />
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  navConfig: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Navigation;
