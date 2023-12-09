import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ItemsList from "../ItemsList/ItemsList";
import BigButton from "../common/BigButton/BigButton";
import Modal from "../common/Modal/Modal";
import Loader from "../common/Loader/Loader";
import ErrorMsg from "../common/ErrorMsg/ErrorMsg";
import EditCard from "../common/EditCard/EditCard";
import AddForm from "../common/AddForm/AddForm";
import Filter from "./Filter/Filter";
import DeleteCard from "../common/DeleteCard/DeleteCard";
import { citiesActions, citiesOperations } from "../../redux/cities";
import addIcon from "../../images/add.svg";
import pencilIcon from "../../images/pencil.png";
import fingerIcon from "../../images/finger.png";

const API_ENDPOINT = "cities";

const ACTION = {
  NONE: "none",
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

const { getCities, addCity, editCity, deleteCity } = citiesOperations;

const CitiesBlock = () => {
  const { t } = useTranslation();

  const cities = useSelector((state) => state.cities.data.items);
  const filter = useSelector((state) => state.cities.filter);
  const loading = useSelector((state) => state.cities.data.loading);
  const error = useSelector((state) => state.cities.data.error);
  const dispatch = useDispatch();

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);

  const [action, setAction] = useState(ACTION.NONE);
  const [activeCity, setActiveCity] = useState(null);

  // GET CITIES

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  // ADD CITY

  const toggleAddForm = () => setIsAddFormOpen((prevState) => !prevState);

  const confirmAdd = (cityName) => {
    const isDuplicate = checkIfDuplicate(cityName);
    if (isDuplicate) {
      toast.warn(`City "${cityName}" is already in list`);
      return;
    }
    setActiveCity({ name: cityName });
    setAction(ACTION.ADD);
  };

  const checkIfDuplicate = (cityName) =>
    cities.some(({ name }) => name === cityName);

  useEffect(() => {
    if (action !== ACTION.ADD || !activeCity) return;

    dispatch(addCity(activeCity)).then(() => {
      toast.success(`${t("cities.success-add", { name: activeCity.name })}`);
      toggleAddForm();
      setAction(ACTION.NONE);
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch, t]);

  // EDIT CITY

  const handleStartEdit = (activeCity) => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.EDIT);
  };

  const confirmEdit = (editedCityName) => {
    if (editedCityName === activeCity.name) {
      closeModal();
      return;
    }
    setAction(ACTION.EDIT);
    setActiveCity({ ...activeCity, name: editedCityName });
  };

  useEffect(() => {
    if (action !== ACTION.EDIT) return;

    dispatch(editCity(activeCity)).then(() => {
      toast.success(t("cities.success-edit"));
      setAction(ACTION.NONE);
      closeModal();
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch, t]);

  // DELETE CITY

  const handleStartDelete = (activeCity) => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.DELETE);
  };

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;

    dispatch(deleteCity(activeCity.id)).then(() => {
      toast.success(t("cities.success-delete"));
      setAction(ACTION.NONE);
      closeModal();
      setActiveCity(null);
    });
  }, [action, activeCity, dispatch, t]);

  const closeModal = () => {
    setOpenedModal(ACTION.NONE);
    setActiveCity(null);
  };

  // FILTER CITIES

  const filteredCities = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    return cities.filter((city) =>
      city.name.toLowerCase().includes(normalizedFilter),
    );
  }, [cities, filter]);

  // RENDER
  const noCities = !loading && !cities.length;

  useEffect(() => {
    if (cities.length === 1) {
      dispatch(citiesActions.changeFilter(""));
    }
  }, [cities.length, dispatch]);

  return (
    <>
      {loading && <Loader />}

      {cities.length > 1 && <Filter label={t("cities.city-filter")} />}

      {!!filteredCities.length && (
        <ItemsList
          items={filteredCities}
          onEditItem={handleStartEdit}
          onDeleteItem={handleStartDelete}
          filter={filter}
        />
      )}

      {noCities && <h4 className="absence-msg">{t("cities.no-cities")}</h4>}

      {isAddFormOpen && (
        <AddForm
          onSubmit={confirmAdd}
          formName={t("cities.add-city")}
          placeholder={t("cities.city")}
        />
      )}

      {error && <ErrorMsg message={error} />}

      <BigButton
        text={isAddFormOpen ? t("common.cancel-add") : t("cities.add-city")}
        icon={!isAddFormOpen && addIcon}
        onClick={toggleAddForm}
        disabled={loading}
      />

      {openedModal === ACTION.EDIT && (
        <Modal
          title={t("cities.modal.editing-title")}
          onClose={closeModal}
          icon={pencilIcon}
        >
          <EditCard
            label={t("cities.city")}
            inputValue={activeCity.name}
            onSave={confirmEdit}
          />
        </Modal>
      )}

      {openedModal === ACTION.DELETE && (
        <Modal
          title={t("cities.modal.deleting-title")}
          onClose={closeModal}
          icon={fingerIcon}
        >
          <DeleteCard
            text={t("cities.modal.description")}
            onDelete={confirmDelete}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default CitiesBlock;
