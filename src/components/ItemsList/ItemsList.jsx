import PropTypes from 'prop-types';
import Paper from '../common/Paper/Paper';
import CardWithMenu from './CardsWithMenu/CardsWithMenu';
import s from './ItemsList.module.css';

const ItemsList = ({ items, onEditItem, onDeleteItem, link }) => {
  return (
    <ul className={s.list}>
      {items.map(item => (
        <li className={s.item} key={item.id}>
          <Paper>
            <CardWithMenu
              item={item}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item)}
              link={link}
            />
          </Paper>
        </li>
      ))}
    </ul>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  onEditItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  link: PropTypes.string,
};

export default ItemsList;
