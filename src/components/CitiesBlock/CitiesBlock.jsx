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
import * as api from "../../services/api";
import * as actions from "../../redux/cities/citiesActions";
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

const CitiesBlock = () => {
  const { t } = useTranslation();

  const cities = useSelector((state) => state.cities.items);
  const filter = useSelector((state) => state.cities.filter);

  const dispatch = useDispatch();

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);

  const [action, setAction] = useState(ACTION.NONE);
  const [activeCity, setActiveCity] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET CITIES

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiCities = await api.getData(API_ENDPOINT);
        dispatch(actions.setCities(apiCities));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
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

    const addCity = async () => {
      setLoading(true);
      setError(null);
      try {
        const newCity = await api.saveItem(API_ENDPOINT, activeCity);
        dispatch(actions.addCity(newCity));
        toggleAddForm();
        toast.success(`${t("cities.success-add", { name: newCity.name })}`);
      } catch (error) {
        setError(error.message);
      } finally {
        setAction(ACTION.NONE);
        setActiveCity(null);
        setLoading(false);
      }
    };
    addCity();
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

    const editCity = async () => {
      setLoading(true);
      setError(null);
      try {
        const updatedCity = await api.editItem(API_ENDPOINT, activeCity);
        dispatch(actions.editCity(updatedCity));
        toast.success(t("cities.success-edit"));
      } catch (error) {
        setError(error.message);
      } finally {
        setAction(ACTION.NONE);
        closeModal();
        setLoading(false);
        setActiveCity(null);
      }
    };
    editCity();
  }, [action, activeCity, dispatch, t]);

  // DELETE CITY

  const handleStartDelete = (activeCity) => {
    setActiveCity(activeCity);
    setOpenedModal(ACTION.DELETE);
  };

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;

    const deleteCity = async () => {
      setLoading(true);
      setError(null);
      try {
        const deletedCity = await api.deleteItem(API_ENDPOINT, activeCity.id);
        dispatch(actions.deleteCity(deletedCity.id));
        toast.success(t("cities.success-delete"));
      } catch (error) {
        setError(error.message);
      } finally {
        setAction(ACTION.NONE);
        closeModal();
        setLoading(false);
        setActiveCity(null);
      }
    };
    deleteCity();
  }, [action, activeCity, dispatch]);

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
      dispatch(actions.changeFilter(""));
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
