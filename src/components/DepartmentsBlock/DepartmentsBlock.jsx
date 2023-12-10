import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import BigButton from '../common/BigButton/BigButton';
import ItemsList from '../ItemsList/ItemsList';
import AddForm from '../common/AddForm/AddForm';
import DeleteCard from '../common/DeleteCard/DeleteCard';
import EditCard from '../common/EditCard/EditCard';
import ErrorMsg from '../common/ErrorMsg/ErrorMsg';
import Loader from '../common/Loader/Loader';
import Modal from '../common/Modal/Modal';
import {
  departmentsOperations,
  departmentsSelectors,
} from '../../redux/departments';
import addIcon from '../../images/add.svg';
import pencilIcon from '../../images/pencil.png';
import fingerIcon from '../../images/finger.png';

const ACTION = {
  NONE: 'none',
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
};

const DepartmentsBlock = () => {
  const { t } = useTranslation();

  const departments = useSelector(departmentsSelectors.getDepartments);
  const loading = useSelector(departmentsSelectors.getLoading);
  const error = useSelector(departmentsSelectors.getError);

  const dispatch = useDispatch();

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [openedModal, setOpenedModal] = useState(ACTION.NONE);

  const [action, setAction] = useState(ACTION.NONE);
  const [activeDepartment, setActiveDepartment] = useState(null);

  // GET DEPARTMENTS

  useEffect(() => {
    dispatch(departmentsOperations.getDepartments());
  }, [dispatch]);

  // ADD DEPARTMENT

  const toggleAddForm = () => setIsAddFormOpen(prevState => !prevState);

  const confirmAdd = departmentName => {
    setActiveDepartment({ name: departmentName });
    setAction(ACTION.ADD);
  };

  useEffect(() => {
    if (action !== ACTION.ADD) return;

    dispatch(departmentsOperations.addDepartment(activeDepartment)).then(() => {
      toast.success(
        `${t('departments.success-add', { name: activeDepartment.name })}`,
      );
      toggleAddForm();
      setAction(ACTION.NONE);
      setActiveDepartment(null);
    });
  }, [action, activeDepartment, dispatch, t]);

  // EDIT DEPARTMENT

  const handleStartEdit = activeDepartment => {
    setActiveDepartment(activeDepartment);
    setOpenedModal(ACTION.EDIT);
  };

  const confirmEdit = editedDepartmentName => {
    if (editedDepartmentName === activeDepartment.name) {
      closeModal();
      return;
    }
    setAction(ACTION.EDIT);
    setActiveDepartment({ ...activeDepartment, name: editedDepartmentName });
  };

  useEffect(() => {
    if (action !== ACTION.EDIT) return;

    dispatch(departmentsOperations.editDepartment(activeDepartment)).then(
      () => {
        toast.success(t('departments.success-edit'));
        setAction(ACTION.NONE);
        closeModal();
        setActiveDepartment(null);
      },
    );
  }, [action, activeDepartment, dispatch, t]);

  // DELETE DEPARTMENT

  const handleStartDelete = activeDepartment => {
    setActiveDepartment(activeDepartment);
    setOpenedModal(ACTION.DELETE);
  };

  const confirmDelete = () => setAction(ACTION.DELETE);

  useEffect(() => {
    if (action !== ACTION.DELETE) return;

    dispatch(departmentsOperations.deleteDepartment(activeDepartment.id)).then(
      () => {
        toast.success(t('departments.success-delete'));
        setAction(ACTION.NONE);
        closeModal();
        setActiveDepartment(null);
      },
    );
  }, [action, activeDepartment, dispatch, t]);

  const closeModal = () => {
    setOpenedModal(ACTION.NONE);
    setActiveDepartment(null);
  };

  // RENDER

  const noDepartments = !loading && !departments.length;

  return (
    <>
      {loading && <Loader />}

      {!!departments.length && (
        <ItemsList
          items={departments}
          onEditItem={handleStartEdit}
          onDeleteItem={handleStartDelete}
          link="departments"
        />
      )}

      {noDepartments && (
        <h4 className="absence-msg">{t('departments.no-departments')}</h4>
      )}

      {isAddFormOpen && (
        <AddForm
          onSubmit={confirmAdd}
          formName={t('departments.adding-department')}
          placeholder={t('departments.department')}
        />
      )}

      {error && <ErrorMsg message={error} />}

      <BigButton
        text={
          isAddFormOpen
            ? t('common.cancel-add')
            : t('departments.add-department')
        }
        icon={!isAddFormOpen && addIcon}
        onClick={toggleAddForm}
        disabled={loading}
      />

      {openedModal === ACTION.EDIT && (
        <Modal
          title={t('departments.modal.editing-title')}
          onClose={closeModal}
          icon={pencilIcon}
        >
          <EditCard
            label="Факультет"
            inputValue={activeDepartment.name}
            onSave={confirmEdit}
          />
        </Modal>
      )}

      {openedModal === ACTION.DELETE && (
        <Modal
          title={t('departments.modal.deleting-title')}
          onClose={closeModal}
          icon={fingerIcon}
        >
          <DeleteCard
            text={t('departments.modal.description')}
            onDelete={confirmDelete}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
};

export default DepartmentsBlock;
