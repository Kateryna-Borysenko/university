import PropTypes from "prop-types";
import { ReactComponent as PhoneIcon } from "../../../images/phone.svg";
import { ReactComponent as MailIcon } from "../../../images/mail.svg";
import { ReactComponent as LocationIcon } from "../../../images/location.svg";
import s from "./Tutor.module.css";

const Tutor = ({
  firstName,
  lastName,
  gender,
  phone,
  email,
  city,
  isFullTime,
}) => {
  return (
    <div className={s.container}>
      <div className={s.name}>
        <p>{lastName}</p>
        <p>{firstName}</p>
        <p>{gender}</p>
      </div>
      <div className={s.info}>
        <p className={s.wrapper}>
          <PhoneIcon />
          <span className={s.text}>{phone}</span>
        </p>
        <p className={s.wrapper}>
          <MailIcon />
          <span className={s.text}>{email}</span>
        </p>
        <p className={s.wrapper}>
          <LocationIcon />
          <span className={s.text}>{city}</span>
        </p>
      </div>
      <div className={s.description}>
        <p>{isFullTime}</p>
      </div>
      <div>
        <p>На постоянной основе: {isFullTime ? "Да" : "Нет"}</p>
      </div>
    </div>
  );
};

Tutor.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  isFullTime: PropTypes.bool,
};

export default Tutor;
