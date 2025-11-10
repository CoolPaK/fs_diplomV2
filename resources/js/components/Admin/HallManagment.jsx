import React, { useState, useContext } from 'react';

import HallManageItem from './HallManageItem';
import HallAddPopup from './HallAddPopup';
import ConfirmPopup from './ConfirmPopup';
import AdminContext from './AdminContext';
import Api from '../../functions/Api';

function HallManagement() {
  const { halls, loadFromServer } = useContext(AdminContext);
  const [addPopup, setAddPopup] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(0);

  const closeAddPopup = () => {
    setAddPopup(false);
  };

  const openAddPopup = () => {
    setAddPopup(true);
  };

  const closeConfirmPopup = () => {
    setConfirmPopup(false);
  };

  const openConfirmPopup = (obj) => {
    setDeleteTarget(obj);
    setConfirmPopup(true);
  };

  const handleDeleteHall = async (e, obj) => {
    e.preventDefault();
    const response = await Api.deleteItem('hall', obj.id);
    if (response === 'Successful delete') {
      loadFromServer();
      setConfirmPopup(false);
    }
  };

  const createNewHall = async (e, name) => {
    e.preventDefault();
    const response = await Api.createItem('hall', name);
    if (response === 'Hall created') {
      loadFromServer();
      setAddPopup(false);
    }
  };

  return (
    <div className="conf-step__wrapper">
      {addPopup && <HallAddPopup handleClose={closeAddPopup} handleSubmit={createNewHall} />}
      {confirmPopup && <ConfirmPopup reset={closeConfirmPopup} submit={handleDeleteHall} name={deleteTarget.name} data={deleteTarget} actionName="Удаление зала" question="Вы действительно хотите удалить " />}
      <p className="conf-step__paragraph">Доступные залы:</p>
      <ul className="conf-step__list">
        {halls.map((o) => (
          <HallManageItem key={o.id} target={o} handleDeleteHall={openConfirmPopup} />
        ))}
      </ul>
      <button className="conf-step__button conf-step__button-accent" onClick={openAddPopup} type="button">Создать зал</button>
    </div>
  );
}

export default HallManagement;
