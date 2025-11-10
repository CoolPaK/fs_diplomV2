/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import UserContext from './UserContext';

export default function UserProvider(props) {
  const [movieShows, setMovieShows] = useState([]);
  const [orderData, setOrderData] = useState({});

  return (
    <UserContext.Provider value={{
      setMovieShows, movieShows, setOrderData, orderData,
    }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
