import { useState, useEffect } from "react";
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

const CitiesBlock = (props) => {
  const [cities, setCities] = useState(props.cities);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeCity, setActiveCity] = useState("");
  const [filter, setFilter] = useState(() => storage.get(FILTER_KEY) ?? "");

  useEffect(() => {
    storage.save(FILTER_KEY, filter);
  }, [filter]);

  // ADD CITY

  const toggleAddForm = () => setIsAddFormOpen((prevState) => !prevState);

  const addCity = (city) => {
    const isDuplicate = checkIfDuplicate(city);
    if (isDuplicate) {
      // toast.warn(`City "${city}" is already in the list`);
      return;
    }
    const newCity = { name: city };
    setCities((prevCities) => [...prevCities, newCity]);
    setIsAddFormOpen(false);
  };

  const checkIfDuplicate = (city) => cities.some(({ name }) => name === city);

  // EDIT CITY

  const handleStartEditing = (activeCity) => {
    setActiveCity(activeCity);
    setIsEditModalOpen(true);
  };

  const saveEditedCity = (editedCity) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.name === activeCity ? { ...city, name: editedCity } : city,
      ),
    );
    setActiveCity("");
    setIsEditModalOpen(false);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  // DELETE CITY

  const handleStartDeleting = (activeCity) => {
    setActiveCity(activeCity);
    setIsDeleteModalOpen(true);
  };

  const deleteCity = () => {
    setCities((prevCities) =>
      prevCities.filter(({ name }) => name !== activeCity),
    );
    setActiveCity("");
    setIsDeleteModalOpen(false);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  // FILTER CITIES

  const handleFilterChange = (value) => setFilter(value);

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
          onEditItem={handleStartEditing}
          onDeleteItem={handleStartDeleting}
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

      {isEditModalOpen && (
        <Modal
          title="Редактировать информацию о городе"
          onClose={closeEditModal}
          icon={pencilIcon}
        >
          <EditCard
            label="Город"
            inputValue={activeCity}
            onSave={saveEditedCity}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal
          title="Удаление города"
          onClose={closeDeleteModal}
          icon={fingerIcon}
        >
          <DeleteCard
            text="Будут удалены все материалы и информация о городе."
            onDelete={deleteCity}
            onClose={closeDeleteModal}
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
