import React, {
  useEffect, useState, useContext,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminContext from './AdminContext';
import Api from '../../functions/Api';
import AddFilmPopup from './AddFilmPopup';
import AddMovieShowPopup from './AddMovieShowPopup';
import ConfirmPopup from './ConfirmPopup';
import InfoPopup from './InfoPopup';
import Preloader from '../Preloader';

function MovieShowConfig() {
  const { halls } = useContext(AdminContext);

  const [movieShows, setMovieShows] = useState(false);
  const [isAddPopup, setIsAddPopup] = useState(false);
  const [isInfoPopup, setIsInfoPopup] = useState(false);
  const [isAddMovieShow, setIsAddMovieShow] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);
  const [films, setFilms] = useState([]);
  const [newMovieShows, setNewMovieShows] = useState([]);
  const [deletedMoviesShow, setDeletedMoviesShow] = useState([]);
  const [addedMoviesShow, setAddedMoviesShow] = useState([]);
  const [deleteState, setDeleteState] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const now = new Date();
  const day = (`0${now.getDate()}`).slice(-2);
  const month = (`0${now.getMonth() + 1}`).slice(-2);
  const today = `${now.getFullYear()}-${month}-${day}`;

  const [activeDate, setActiveDate] = useState(today);
  const [draggedFilm, setDraggedFilm] = useState({});
  const [activeHall, setActiveHall] = useState(false);
  const [addMovieShowErr, setAddMovieShowErr] = useState('');

  useEffect(async () => {
    const movies = await Api.getMovie('movie', today);
    setMovieShows([...movies]);
    setNewMovieShows([...movies]);
    setFilms(await Api.getItems('film'));
    setIsLoaded(true);
  }, []);

  const handleAddFilmSubmit = async (e, film, file) => {
    e.preventDefault();
    const response = await Api.storeFilm('film', film, file);
    if (response === 'New film added') {
      setIsAddPopup(false);
      setFilms(await Api.getItems('film'));
    }
  };

  const handleAddMovieShow = async (e, film, hallId, startTime) => {
    e.preventDefault();
    const hour = Number.parseInt(startTime.substr(0, 2), 10);
    const minutes = Number.parseInt(startTime.substr(3), 10);
    const movieShowStart = hour * 60 + minutes;
    newMovieShows.forEach((item) => {
      if (hallId === item.hall_id) {
        const start = Number.parseInt(item.start_time, 10);
        const end = Number.parseInt(item.start_time, 10) + item.movie_show_duration;
        if (start < movieShowStart && movieShowStart < end) {
          setAddMovieShowErr(`Сеанс пересекается по веремени с сеансом ${item.id}`);
          return;
        }
        if (start < movieShowStart + film.duration && movieShowStart + film.duration < end) {
          setAddMovieShowErr(`Сеанс пересекается по веремени с сеансом ${item.id}`);
          return;
        }
        if (start > movieShowStart && movieShowStart + film.duration > end) {
          setAddMovieShowErr(`Сеанс пересекается по веремени с сеансом ${item.id}`);
        }
      }
    });
    setAddMovieShowErr('');
    const newMovieShow = {
      film_id: film.id,
      hall_id: hallId,
      start_time: movieShowStart,
      movie_show_duration: film.duration,
      start_day: activeDate,
      film_name: film.name,
      id: uuidv4(),
      newItem: true,
    };
    setNewMovieShows((prevState) => [...prevState, newMovieShow]);
    setAddedMoviesShow((prevState) => [...prevState, newMovieShow]);
    setIsAddMovieShow(false);
  };

  const handleSumbitMovieShow = async () => {
    setIsLoaded(false);
    const response = await Api.patchMovie('movie', activeDate, addedMoviesShow, deletedMoviesShow);
    if (response === 'Update successful') {
      const movies = await Api.getMovie('movie', activeDate);
      setMovieShows([...movies]);
      setNewMovieShows([...movies]);
    }
    setAddedMoviesShow([]);
    setDeletedMoviesShow([]);
    setIsLoaded(true);
  };

  const handleResetMovieShows = () => {
    setNewMovieShows([...movieShows]);
    setAddedMoviesShow([]);
    setDeletedMoviesShow([]);
  };

  const handleDateChange = (e) => {
    const { target } = e;
    setActiveDate(target.value);
  };

  const handleDate = async () => {
    const movies = await Api.getMovie('movie', activeDate);
    setMovieShows([...movies]);
    setNewMovieShows([...movies]);
  };

  const handleDragStart = (o) => {
    setDraggedFilm(o);
  };

  const handleDragEnd = (e, hall) => {
    e.preventDefault();
    const { target } = e;
    if (target.classList.contains('conf-step__seances-timeline')) {
      target.style.backgroundColor = 'transparent';
    }
    if (hall.is_active === 1) {
      setIsInfoPopup(true);
      return;
    }
    setIsAddMovieShow(true);
    setActiveHall(hall);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const { target } = e;
    if (target.classList.contains('conf-step__seances-timeline')) {
      target.style.backgroundColor = 'grey';
    }
  };

  const handleDragLeave = (e) => {
    const { target } = e;
    if (target.classList.contains('conf-step__seances-timeline')) {
      target.style.backgroundColor = 'transparent';
    }
  };

  const handleDeleteReset = () => {
    setIsDeletePopup(false);
  };

  const hadleMovieShowClick = (o, closedSale) => {
    if (closedSale === 1) {
      setIsInfoPopup(true);
      return;
    }
    setDeleteState(o);
    setIsDeletePopup(true);
  };

  const handleDelete = (e, object) => {
    e.preventDefault();
    if (object.newItem) {
      for (let i = 0; i < newMovieShows.length; i += 1) {
        if (object.id === newMovieShows[i].id) {
          const modyfiedArr = [...newMovieShows];
          modyfiedArr.splice(i, 1);
          setNewMovieShows([...modyfiedArr]);
        }
      }
    } else {
      for (let i = 0; i < newMovieShows.length; i += 1) {
        if (object.id === newMovieShows[i].id) {
          const modyfiedArr = newMovieShows;
          modyfiedArr.splice(i, 1);
          setNewMovieShows(modyfiedArr);
          setDeletedMoviesShow((prevState) => [...prevState, object.id]);
        }
      }
    }
    setIsDeletePopup(false);
  };

  return (
    <>
      {!isLoaded && <Preloader />}
      {isLoaded && (
        <div className="conf-step__wrapper">
          {isAddPopup && (
          <AddFilmPopup
            handleClose={setIsAddPopup}
            handleSubmit={handleAddFilmSubmit}
          />
          )}
          {isInfoPopup && <InfoPopup handleClose={setIsInfoPopup} text="Нельзя добавить или удалить сеанс в зале с открытыми продажами" />}
          {isAddMovieShow && activeHall && (
          <AddMovieShowPopup
            error={addMovieShowErr}
            film={draggedFilm}
            hall={activeHall}
            handleClose={setIsAddMovieShow}
            handleSubmit={handleAddMovieShow}
          />
          )}
          {isDeletePopup && <ConfirmPopup reset={handleDeleteReset} submit={handleDelete} name={deleteState.film_name} data={deleteState} actionName="Снятие с сеанса" question="Вы действительно хотите снять с сеанса фильм " />}
          <p className="conf-step__paragraph">
            <button className="conf-step__button conf-step__button-accent" type="button" onClick={() => setIsAddPopup(true)}>Добавить фильм</button>
            <button className="conf-step__button conf-step__button-accent" type="button" onClick={handleDate}>Выбрать дату</button>
            {activeDate && <input type="date" name="date" value={activeDate} min={today} onChange={(e) => handleDateChange(e)} />}
          </p>
          <p className="conf-step__paragraph">Перетащите фильм для добавления сеанса</p>
          <div className="conf-step__movies">
            {films.length > 0 && films.map((film) => (
              <div
                className="conf-step__movie"
                key={film.id}
                draggable
                onDragStart={() => handleDragStart(film)}
              >
                <img className="conf-step__movie-poster" alt="poster" src={film.poster} />
                <h3 className="conf-step__movie-title">{film.name}</h3>
                <p className="conf-step__movie-duration">
                  {film.duration}
                  {' '}
                  минут
                </p>
              </div>
            ))}
          </div>

          <div className="conf-step__seances">
            {halls.length > 0 && halls.map((hall) => (
              <div key={hall.id} className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">{hall.name}</h3>
                <div
                  className="conf-step__seances-timeline"
                  onDragOver={(e) => handleDragOver(e)}
                  onDragLeave={(e) => handleDragLeave(e)}
                  onDrop={(e) => handleDragEnd(e, hall)}
                >
                  {newMovieShows && newMovieShows.map((movie) => (
                    movie.hall_id === hall.id && (
                    <div
                      key={movie.id}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => { if (e.key === 'Enter') hadleMovieShowClick(movie, hall.is_active); }}
                      onClick={() => hadleMovieShowClick(movie, hall.is_active)}
                      className="conf-step__seances-movie"
                      style={{ width: `${(100 * movie.movie_show_duration) / 1440}%`, backgroundColor: 'rgb(202, 255, 133)', left: `${(100 * movie.start_time) / 1440}%` }}
                    >
                      <p className="conf-step__seances-movie-title">{movie.film_name}</p>
                      <p className="conf-step__seances-movie-start">
                        {parseInt(movie.start_time / 60, 10)}
                        :
                        {movie.start_time % 60}
                      </p>
                    </div>
                    )))}
                </div>
              </div>
            ))}
          </div>

          <fieldset className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular" onClick={handleResetMovieShows} type="button">Отмена</button>
            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={handleSumbitMovieShow} />
          </fieldset>
        </div>
      )}
    </>
  );
}

export default MovieShowConfig;
