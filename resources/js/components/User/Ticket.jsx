import React, {
  useEffect, useState, useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import Api from '../../functions/Api';
import Preloader from '../Preloader';

function Ticket() {
  const [data, setData] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [seats, setSeats] = useState([]);
  const svgWrapperRef = useRef();
  const { id } = useParams();

  useEffect(async () => {
    const qrData = await Api.getQr('qr', id);
    const ticketData = await Api.getShow('ticket', id);
    setSeats(JSON.parse(ticketData.seats));
    setData(ticketData);
    setIsLoaded(true);
    svgWrapperRef.current.innerHTML = qrData;
  }, []);

  return (
    <section className="ticket">

      <header className="ticket__check">
        <h2 className="ticket__check-title">Электронный билет</h2>
      </header>
      {!isLoaded && <Preloader />}
      {isLoaded && (
      <div className="ticket__info-wrapper">
        <p className="ticket__info">
          На фильм:
          <span className="ticket__details ticket__title">{data.film}</span>
        </p>
        <p className="ticket__info">
          Места:
          <span className="ticket__details ticket__chairs">{seats.map((o) => (`${o}, `))}</span>
        </p>
        <p className="ticket__info">
          В зале:
          <span className="ticket__details ticket__hall">{data.hall_name}</span>
        </p>
        <p className="ticket__info">
          Начало сеанса:
          <span className="ticket__details ticket__start">
            {parseInt(data.start_time / 60, 10)}
            :
            {(data.start_time % 60) < 10 ? (`0${data.start_time % 60}`) : (data.start_time % 60)}
          </span>
        </p>
        <div ref={svgWrapperRef} />
        <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
        <p className="ticket__hint">Приятного просмотра!</p>
      </div>
      )}
    </section>
  );
}

export default Ticket;
