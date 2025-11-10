import React, { useEffect, useState, useContext } from 'react';
import AdminContext from './AdminContext';
import HallBtnContainer from './HallBtnContainer';
import Preloader from '../Preloader';
import Api from '../../functions/Api';
import InterfaceBtnContainer from './InterfaceBtnContainer';

function HallConfig() {
  const { halls, loadFromServer } = useContext(AdminContext);
  const [activeHall, setActiveHall] = useState(0);
  const [activeHallIndex, setActiveHallIndex] = useState(0);
  // const [seats, setSeats] = useState([]);
  const [seatsTable, setSeatsTable] = useState([]);
  const [changedSeats, setChangedSeats] = useState([]);
  const [rows, setRows] = useState(0);
  const [seatsInRow, setSeatsInRow] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [seatsIsLoaded, setSeatsIsLoaded] = useState(false);

  useEffect(async () => {
    setIsLoaded(false);
    if (halls.length === 0) {
      return;
    }
    setActiveHall(halls[0].id);
    setActiveHallIndex(0);
    // setSeats(halls[0].seats);
    const seatsFromServer = await Api.getShow('seats', halls[0].id);
    // setSeats(seatsFromServer);
    setChangedSeats(seatsFromServer);
    // console.log(seatsFromServer);
    setRows(halls[0].row);
    setSeatsInRow(halls[0].seats);
    const tableSeat = [];
    let counter = 0;
    for (let i = 1; i <= halls[0].row; i += 1) {
      const row = [];
      for (let y = 1; y <= halls[0].seats; y += 1) {
        row.push(seatsFromServer[counter]);
        counter += 1;
      }
      tableSeat.push(row);
    }
    setSeatsTable(tableSeat);
    setSeatsIsLoaded(true);
    // renderSeatsTable(false);
    setIsLoaded(true);
  }, [halls]);

  const renderNewSeatTable = (rowNumb, seatNumb) => {
    setIsLoaded(false);
    setSeatsIsLoaded(false);
    const arrLength = rowNumb * seatNumb;
    const seatsArr = [];
    for (let i = 1; i <= arrLength; i += 1) {
      const newObj = {
        id: i,
        hall_id: activeHall,
        seat_number: i,
        status: 1,
      };
      seatsArr.push(newObj);
      // setSeats(seatsArr);
    }
    const tableSeat = [];
    let counter = 0;
    // console.log('rows');
    // console.log(rows);
    for (let i = 1; i <= rowNumb; i += 1) {
      const row = [];
      for (let y = 1; y <= seatNumb; y += 1) {
        row.push(seatsArr[counter]);
        counter += 1;
      }
      tableSeat.push(row);
    }
    setSeatsTable(tableSeat);
    setChangedSeats(seatsArr);
    setSeatsIsLoaded(true);
    setIsLoaded(true);
  };

  const renderSeatsTable = (incomeArr, rowNumb, seatNumb) => {
    setIsLoaded(false);
    setSeatsIsLoaded(false);
    // const arrLength = rowNumb * seatNumb;
    const tableSeat = [];
    let counter = 0;
    for (let i = 1; i <= rowNumb; i += 1) {
      const row = [];
      for (let y = 1; y <= seatNumb; y += 1) {
        row.push(incomeArr[counter]);
        counter += 1;
      }
      tableSeat.push(row);
    }
    setSeatsTable(tableSeat);
    setSeatsIsLoaded(true);
    setIsLoaded(true);
  };

  const refreshRenderArr = () => {
    const tableSeat = [];
    let counter = 0;
    for (let i = 1; i <= rows; i += 1) {
      const row = [];
      for (let y = 1; y <= seatsInRow; y += 1) {
        row.push(changedSeats[counter]);
        counter += 1;
      }
      tableSeat.push(row);
    }
    setSeatsTable(tableSeat);
    setSeatsIsLoaded(true);
    setIsLoaded(true);
  };

  const handleStatusChange = (seat) => {
    const index = seat - 1;
    const { status } = changedSeats[index];
    let newStatus;
    if (status + 1 > 2) {
      newStatus = 0;
    } else {
      newStatus = status + 1;
    }
    const newArray = [...changedSeats];
    newArray[index].status = newStatus;
    setSeatsIsLoaded(false);
    setIsLoaded(false);
    setChangedSeats(newArray);
    refreshRenderArr();
  };

  const handleLabelChange = (e) => {
    setSeatsIsLoaded(false);
    const { name, value } = e.target;

    if (value === '') {
      if (name === 'rows') {
        if (rows === 1) {
          setSeatsIsLoaded(true);
          return;
        }
        setRows(1);
        renderNewSeatTable(1, seatsInRow);
        // setIsRedacting(false);
      } else if (name === 'seats') {
        if (seatsInRow === 1) {
          setSeatsIsLoaded(true);
          return;
        }
        setSeatsInRow(1);
        renderNewSeatTable(rows, 1);
      }
      return;
    }
    let number;
    try {
      number = Number.parseInt(value, 10);
    } catch {
      return;
    }
    if (name === 'rows') {
      // renderSeatsTable(true, seats, number, halls[activeHallIndex].seats);
      renderNewSeatTable(number, seatsInRow);
      setRows(number);
    } else if (name === 'seats') {
      // renderSeatsTable(true, seats, halls[activeHallIndex].row, number);
      renderNewSeatTable(rows, number);
      setSeatsInRow(number);
    }
    // setIsRedacting(true);
  };

  const resetChanges = async () => {
    setIsLoaded(false);
    setSeatsIsLoaded(false);
    setRows(halls[activeHallIndex].row);
    setSeatsInRow(halls[activeHallIndex].seats);
    const oldSeats = await Api.getShow('seats', halls[activeHallIndex].id);
    // setSeats(oldSeats);
    setChangedSeats(oldSeats);
    renderSeatsTable(oldSeats, halls[activeHallIndex].row, halls[activeHallIndex].seats);
  };

  const handleSetActive = async (hallId) => {
    setSeatsIsLoaded(false);
    setIsLoaded(false);
    const index = halls.map((hall) => hall.id).indexOf(hallId);
    setActiveHall(hallId);
    setActiveHallIndex(index);
    const HallSeats = await Api.getShow('seats', hallId);
    // setSeats(HallSeats);
    setChangedSeats(HallSeats);
    setRows(halls[index].row);
    setSeatsInRow(halls[index].seats);
    renderSeatsTable(HallSeats, halls[index].row, halls[index].seats);
    setSeatsIsLoaded(true);
  };

  const submitChanges = () => {
    setSeatsIsLoaded(false);
    setIsLoaded(false);
    Api.updateSeats('seats', activeHall, changedSeats, rows, seatsInRow);
    loadFromServer();
  };

  const seatStatus = ['chair_disabled', 'chair_standart', 'chair_vip'];

  return (
    <div className="conf-step__wrapper">
      <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
      <HallBtnContainer name="config" active={activeHall} setActive={handleSetActive} />
      <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
      {!isLoaded && <Preloader />}
      {isLoaded && (
      <div className="conf-step__legend">
        <label className="conf-step__label" htmlFor="rows">
          Рядов, шт
          <input type="number" min="1" className="conf-step__input" placeholder="10" name="rows" value={rows} onChange={(e) => handleLabelChange(e)} />
        </label>
        <span className="multiplier">x</span>
        <label className="conf-step__label" htmlFor="seats">
          Мест, шт
          <input type="number" min="1" className="conf-step__input" placeholder="10" name="seats" value={seatsInRow} onChange={(e) => handleLabelChange(e)} />
        </label>
      </div>
      )}
      <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
      <div className="conf-step__legend">
        <span className="conf-step__chair conf-step__chair_standart" />
        {' '}
        — обычные кресла
        <span className="conf-step__chair conf-step__chair_vip" />
        {' '}
        — VIP кресла
        <span className="conf-step__chair conf-step__chair_disabled" />
        {' '}
        — заблокированные (нет кресла)
        <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
      </div>
      {(!isLoaded || !seatsIsLoaded) ? <Preloader /> : (
        <div className="conf-step__hall">
          <div className="conf-step__hall-wrapper">
            {rows > 0 && seatsInRow > 0 && seatsTable.length > 0 && seatsTable.map((row) => (
              <div className="conf-step__row" key={row[0].id}>
                { row.map((o) => (
                  <span
                    key={o.id}
                    aria-label="Seat button"
                    className={`conf-step__chair conf-step__${seatStatus[o.status]}`}
                    onClick={() => handleStatusChange(o.seat_number)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => { if (e.key === 'Enter') handleStatusChange(o.seat_number); }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      {halls[activeHallIndex].is_active === 0
        ? <InterfaceBtnContainer reset={resetChanges} accept={submitChanges} />
        : <p className="conf-step__paragraph">Нельзя менять конфигурацию открытого для продажи зала, сначала закройте продажу билетов</p>}
    </div>
  );
}

export default HallConfig;
