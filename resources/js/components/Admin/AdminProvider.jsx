/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import AdminContext from './AdminContext';
import Api from '../../functions/Api';

export default function AdminProvider(props) {
  const [halls, setHalls] = useState([]);

  const [activeHall, setActiveHall] = useState('');

  const loadFromServer = async () => {
    setHalls(await Api.getItems('hall'));
    setActiveHall(0);
  };

  useEffect(() => {
    loadFromServer();
  }, []);

  return (
    <AdminContext.Provider value={{
      halls, setHalls, activeHall, setActiveHall, loadFromServer,
    }}
    >
      {props.children}
    </AdminContext.Provider>
  );
}
