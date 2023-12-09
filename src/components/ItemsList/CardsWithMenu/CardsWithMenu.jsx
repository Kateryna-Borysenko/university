import { useState, useRef } from "react";
import PropTypes from "prop-types";
import useOutsideClickDetector from "../../../hooks/useOutsideClickDetector";
import { ReactComponent as DotsIcon } from "../../../images/dots.svg";
import editIcon from "../../../images/edit.svg";
import deleteIcon from "../../../images/delete.svg";
import s from "./CardsWithMenu.module.css";

const CardWithMenu = ({ text, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cardRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  useOutsideClickDetector(cardRef, toggleMenu, isMenuOpen);

  const handleEdit = () => {
    onEdit();
    toggleMenu();
  };

  const handleDelete = () => {
    onDelete();
    toggleMenu();
  };

  return (
    <div ref={cardRef} className={s.card}>
      <p>{text}</p>
      <button
        className={s.btn}
        type="button"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <DotsIcon />
      </button>

      {isMenuOpen && (
        <div className={s.menu}>
          <div className={s.menu_item} onClick={handleEdit}>
            <span>
              <img className={s.icon} src={editIcon} alt="Edit" />
            </span>
            <span>редактировать</span>
          </div>
          <div className={s.menu_item} onClick={handleDelete}>
            <span>
              <img className={s.icon} src={deleteIcon} alt="Delete" />
            </span>
            <span>удалить</span>
          </div>
        </div>
      )}
    </div>
  );
};

CardWithMenu.propTypes = {
  text: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardWithMenu;
