import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useOutsideClickDetector from '../../../hooks/useOutsideClickDetector';
import { citiesSelectors } from '../../../redux/cities';
import { ReactComponent as DotsIcon } from '../../../images/dots.svg';
import editIcon from '../../../images/edit.svg';
import deleteIcon from '../../../images/delete.svg';
import s from './CardsWithMenu.module.css';

const CardWithMenu = ({ item, onEdit, onDelete, link }) => {
  const filter = useSelector(citiesSelectors.getFilter);

  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const cardRef = useRef(null);

  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), []);

  useOutsideClickDetector(cardRef, toggleMenu, isMenuOpen);

  const highlightMatches = useCallback(
    text => {
      if (!filter) {
        return text;
      }

      const parts = text.split(new RegExp(`(${filter})`, 'gi'));
      return (
        <span>
          {parts.map((part, index) => (
            <span
              key={index}
              style={
                part.toLowerCase() === filter.toLowerCase()
                  ? { backgroundColor: '#cbd58b' }
                  : {}
              }
            >
              {part}
            </span>
          ))}
        </span>
      );
    },
    [filter],
  );

  const handleEdit = useCallback(() => {
    onEdit();
    toggleMenu();
  }, [onEdit, toggleMenu]);

  const handleDelete = useCallback(() => {
    onDelete();
    toggleMenu();
  }, [onDelete, toggleMenu]);

  return (
    <div ref={cardRef} className={s.card}>
      {link && (
        <Link
          to={`/${link}/${item.id}`}
          state={{
            from: location,
            label: 'university.go-back-univer-btn',
          }}
        >
          <p>{item.name}</p>
        </Link>
      )}
      {!link && <p>{highlightMatches(item.name)}</p>}
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
            <span>{t('common.edit')}</span>
          </div>
          <div className={s.menu_item} onClick={handleDelete}>
            <span>
              <img className={s.icon} src={deleteIcon} alt="Delete" />
            </span>
            <span>{t('common.delete')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

CardWithMenu.propTypes = {
  item: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  link: PropTypes.string,
};

export default CardWithMenu;
