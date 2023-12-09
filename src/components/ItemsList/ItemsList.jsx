import { useCallback } from "react";
import PropTypes from "prop-types";
import Paper from "../common/Paper/Paper";
import CardWithMenu from "./CardsWithMenu/CardsWithMenu";
import s from "./ItemsList.module.css";

const ItemsList = ({ items, onEditItem, onDeleteItem, filter }) => {
  const highlightMatches = useCallback(
    (text) => {
      if (!filter) {
        return <span>{text}</span>;
      }
      const parts = text.split(new RegExp(`(${filter})`, "gi"));
      return (
        <span>
          {parts.map((part, index) => (
            <span
              key={index}
              style={
                part.toLowerCase() === filter.toLowerCase()
                  ? { backgroundColor: "#cbd58b" }
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

  return (
    <ul className={s.list}>
      {items.map((item) => (
        <li className={s.item} key={item.id}>
          <Paper>
            <CardWithMenu
              text={highlightMatches(item.name)}
              onEdit={() => onEditItem(item)}
              onDelete={() => onDeleteItem(item)}
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
  filter: PropTypes.string,
};

export default ItemsList;
