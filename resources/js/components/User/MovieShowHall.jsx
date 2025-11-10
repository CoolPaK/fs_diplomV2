import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import UserContext from './UserContext';
import Preloader from '../Preloader';
import Api from '../../functions/Api';

function MovieShowHall() {
  const { setOrderData } = useContext(UserContext);
  const [seats, setSeats] = useState([]);
  const [seatsSource, setSeatsSoucre] = useState([]);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orderSum, setOrderSum] = useState(0);
  const [occupied, setOccupied] = useState([]);
  const [order, setOrder] = useState([]);
  const history = useHistory();
  const { id } = useParams();

  useEffect(async () => {
    const movieSeatsData = await Api.getMovie('movie_seats', id);
    setData(movieSeatsData);
    const occupiedArr = JSON.parse(movieSeatsData.movieShow.ordered);
    setOccupied(occupiedArr);
    const newArray = movieSeatsData.seats.map((a) => ({ ...a }));
    setSeatsSoucre(newArray);
    const tableSeat = [];
    let counter = 0;
    for (let i = 1; i <= movieSeatsData.hall.row; i += 1) {
      const row = [];
      for (let y = 1; y <= movieSeatsData.hall.seats; y += 1) {
        const seatData = movieSeatsData.seats[counter];
        if (occupiedArr.indexOf(seatData.seat_number) !== -1) {
          seatData.status = 3;
        }
        row.push(seatData);
        counter += 1;
      }
      tableSeat.push(row);
    }
    setSeats(tableSeat);
    setIsLoaded(true);
  }, []);

  const handleClick = (status, seatNumb) => {
    if (status === 3) {
      return;
    }
    if (status === 0) {
      return;
    }
    const index = order.indexOf(seatNumb);
    if (index === -1) {
      setOrder((prevState) => ([
        ...prevState,
        seatNumb,
      ]));
      const newArr = [...seatsSource];
      newArr[seatNumb - 1].status = 4;

      setIsLoaded(false);
      const tableSeat = [];
      let counter = 0;
      for (let i = 1; i <= data.hall.row; i += 1) {
        const row = [];
        for (let y = 1; y <= data.hall.seats; y += 1) {
          const seatData = newArr[counter];
          if (occupied.indexOf(seatData.seat_number) !== -1) {
            seatData.status = 3;
          }
          if (order.indexOf(seatData.seat_number) !== -1) {
            seatData.status = 4;
          }
          row.push(seatData);
          counter += 1;
        }
        tableSeat.push(row);
      }
      setSeats(tableSeat);
      setIsLoaded(true);

      if (status === 2) {
        const sum = orderSum + data.hall.vip_price;
        setOrderSum(sum);
      } else if (status === 1) {
        const sum = orderSum + data.hall.price;
        setOrderSum(sum);
      }
    } else {
      const reducedOrder = [...order];
      reducedOrder.splice(index, 1);
      setOrder(reducedOrder);
      if (data.seats[seatNumb - 1].status === 2) {
        seatsSource[seatNumb - 1].status = 2;
        const sum = orderSum - data.hall.vip_price;
        setOrderSum(sum);
      } else if (data.seats[seatNumb - 1].status === 1) {
        seatsSource[seatNumb - 1].status = 1;
        const sum = orderSum - data.hall.price;
        setOrderSum(sum);
      }
    }
  };

  const handleSubmit = () => {
    const output = {
      film: data.movieShow.film_name,
      seats: order,
      hall: data.hall.name,
      hallId: data.hall.id,
      movieShowId: data.movieShow.id,
      startDay: data.movieShow.start_day,
      startTime: data.movieShow.start_time,
      orderSum,
    };
    setOrderData(output);
    history.push('/payment');
  };

  return (
    <section className="buying">
      {!isLoaded && <Preloader />}
      {isLoaded && (
        <div className="buying__info">
          <div className="buying__info-description">
            <h2 className="buying__info-title">{data.movieShow.film_name}</h2>
            <p className="buying__info-start">
              Начало сеанса:
              {parseInt(data.movieShow.start_time / 60, 10)}
              :
              {(data.movieShow.start_time % 60) < 10 ? (`0${data.movieShow.start_time % 60}`) : (data.movieShow.start_time % 60)}
            </p>
            <p className="buying__info-hall">{data.hall.name}</p>
          </div>
          <div className="buying__info-hint">
            <p>
              Тапните дважды,
              <br />
              чтобы увеличить
            </p>
          </div>
        </div>
      )}
      {isLoaded && (
        <div className="buying-scheme">
          <div className="buying-scheme__wrapper">
            {seats.length > 0 && seats.map((row) => (
              <div className="buying-scheme__row" key={uuidv4()}>
                { row.map((o) => (
                  <span
                    className={`buying-scheme__chair
                      ${o.status === 1 ? 'buying-scheme__chair_standart' : ''}
                      ${o.status === 0 ? 'buying-scheme__chair_disabled' : ''}
                      ${o.status === 2 ? 'buying-scheme__chair_vip' : ''}
                      ${o.status === 3 ? 'buying-scheme__chair_taken' : ''}
                      ${o.status === 4 ? 'buying-scheme__chair_selected' : ''}
                      `}
                    key={uuidv4()}
                    aria-label="Seat button"
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleClick(o.status, o.seat_number); }}
                    onClick={() => { handleClick(o.status, o.seat_number); }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_standart" />
                {' '}
                Свободно (
                <span className="buying-scheme__legend-value">{data.hall.price}</span>
                руб)
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_vip" />
                {' '}
                Свободно VIP (
                <span className="buying-scheme__legend-value">{data.hall.vip_price}</span>
                руб)
              </p>
            </div>
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_taken" />
                {' '}
                Занято
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_selected" />
                {' '}
                Выбрано на
                {' '}
                {orderSum}
                {' '}
                руб.
              </p>
            </div>
          </div>
        </div>
      )}
      {order.length > 0 && <button className="accepting-button" onClick={handleSubmit} type="button">Забронировать</button>}
    </section>
  );
}

export default MovieShowHall;
