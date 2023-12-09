import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import BigButton from "../BigButton/BigButton";
import styles from "./DeleteCard.module.css";

const DeleteCard = ({ text, onDelete, onClose }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.modalContent}>
      <p>{text}</p>
      <div className={styles.btnWrapper}>
        <BigButton text={t("common.no")} onClick={onClose} isGray />
        <BigButton text={t("common.yes")} onClick={onDelete} />
      </div>
    </div>
  );
};

DeleteCard.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteCard;
