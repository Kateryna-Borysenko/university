import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ImageInput from '../../common/ImageInput/ImageInput';
import univerBuildingImg from '../../../images/building.png';
import { ReactComponent as EditIcon } from '../../../images/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../images/delete.svg';
import { addImage } from '../../../redux/univer/univer-slice';
import s from './Card.module.css';

const Card = ({ name }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const isAdmin = false;

  const { image, loading } = useSelector(state => state.univer);

  const saveImage = image => dispatch(addImage(image));
  return (
    <div className={s.card}>
      <div className={s.img_wrapper}>
        {!loading && (
          <ImageInput
            onUpload={saveImage}
            savedImage={image ?? univerBuildingImg}
          />
        )}
      </div>
      <p className={s.text}>{t('university.word')}</p>
      <h3 className={`heading ${s.wrapper}`}>{name}</h3>
      <div className={s.btn_container}>
        <button type="button" className={s.active} aria-label="Edit">
          <EditIcon />
        </button>
        <button
          type="button"
          disabled={!isAdmin}
          className={isAdmin ? s.active : s.disabled}
          aria-label="Delete"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Card;
