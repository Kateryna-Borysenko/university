import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import ItemsList from "../ItemsList/ItemsList";
import BigButton from "../common/BigButton/BigButton";
import Modal from "../common/Modal/Modal";
import EditCard from "../common/EditCard/EditCard";
import AddForm from "../common/AddForm/AddForm";
import Filter from "../common/Filter/Filter";
import DeleteCard from "../common/DeleteCard/DeleteCard";
import * as storage from "../../services/localStorage";
import addIcon from "../../images/add.svg";
import pencilIcon from "../../images/pencil.png";
import fingerIcon from "../../images/finger.png";

const FILTER_KEY = "filter";

const ACTION = {
  NONE: "none",
  EDIT: "edit",
  DELETE: "delete",
};

const CitiesBlock = (props) => {
  const [cities, setCities] = useState(props.cities);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);
  const [activeCity, setActiveCity] = useState("");
  const [filter, setFilter] = useState(() => storage.get(FILTER_KEY) ?? "");

  // ADD CITY

  const toggleAddForm = () => setIsAddFormOpen((prevState) => !prevState);

  const addCity = (city) => {
    const isDuplicate = checkIfDuplicate(city);
    if (isDuplicate) {
      toast.warn(`City "${city}" is already in the list`);
      return;
    }
    const newCity = { name: city };
    setCities((prevCities) => [...prevCities, newCity]);
    toast.warn(`City "${city}" is added`);
    setIsAddFormOpen(false);
  };

  const checkIfDuplicate = (city) => cities.some(({ name }) => name === city);

  // EDIT CITY

  const handleStartEdit = (activeCity) => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.EDIT);
  };

  const saveEditedCity = (editedCity) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.name === activeCity ? { ...city, name: editedCity } : city,
      ),
    );
    setActiveCity("");
    closeModal();
  };

  // DELETE CITY

  const handleStartDelete = (activeCity) => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.DELETE);
  };

  const deleteCity = () => {
    setCities((prevCities) =>
      prevCities.filter(({ name }) => name !== activeCity),
    );
    setActiveCity("");
    closeModal();
  };

  const closeModal = () => {
    setOpenedModal(ACTION.NONE);
    setActiveCity(null);
  };

  // FILTER CITIES

  useEffect(() => {
    storage.save(FILTER_KEY, filter);
  }, [filter]);

  const getFilteredCities = () => {
    const normalizedFilter = filter.toLowerCase();
    return cities.filter((city) =>
      city.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const filteredCities = getFilteredCities();

  return (
    <>
      {cities.length > 1 && (
        <Filter
          label="Поиск города:"
          value={filter}
          onFilterChange={setFilter}
        />
      )}

      {!!filteredCities.length && (
        <ItemsList
          items={filteredCities}
          onEditItem={handleStartEdit}
          onDeleteItem={handleStartDelete}
        />
      )}

      {isAddFormOpen && (
        <AddForm
          onSubmit={addCity}
          formName="Добавление города"
          placeholder="Город"
        />
      )}

      <BigButton
        text={isAddFormOpen ? "Отменить добавление" : "Добавить город"}
        icon={!isAddFormOpen && addIcon}
        onClick={toggleAddForm}
      />

      {openedModal === ACTION.EDIT && (
        <Modal
          title="Редактировать информацию о городе"
          onClose={closeModal}
          icon={pencilIcon}
        >
          <EditCard
            label="Город"
            inputValue={activeCity}
            onSave={saveEditedCity}
          />
        </Modal>
      )}

      {openedModal === ACTION.DELETE && (
        <Modal title="Удаление города" onClose={closeModal} icon={fingerIcon}>
          <DeleteCard
            text="Будут удалены все материалы и информация о городе."
            onDelete={deleteCity}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

CitiesBlock.propTypes = {
  cities: PropTypes.array.isRequired,
};

export default CitiesBlock;
