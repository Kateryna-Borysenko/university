import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './ErrorMsg.module.css';

const ErrorMsg = ({ message = '' }) => {
  const { t } = useTranslation();
  return <p className={s.error}>{t(message) || 'Something went wrong'}</p>;
};

ErrorMsg.propTypes = {
  message: PropTypes.string,
};

export default ErrorMsg;
