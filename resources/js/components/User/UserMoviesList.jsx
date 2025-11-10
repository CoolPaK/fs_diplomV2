import React, { useEffect, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import Preloader from '../Preloader';

function UserMoviesList() {
  const { movieShows } = useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {!isLoaded && <Preloader />}
      { movieShows && movieShows.map((film) => (
        <section className="movie" key={uuidv4()}>
          <div className="movie__info">
            <div className="movie__poster">
              <img className="movie__poster-image" alt="Звёздные войны постер" src={film.poster} />
            </div>
            <div className="movie__description">
              <h2 className="movie__title">{film.name}</h2>
              <p className="movie__synopsis">{film.description}</p>
              <p className="movie__data">
                <span className="movie__data-duration">
                  {film.duration}
                  {' '}
                  минут
                </span>
                <span className="movie__data-origin">
                  {' '}
                  {film.country}
                </span>
              </p>
            </div>
          </div>

          { film.halls.map((hall) => (
            <div className="movie-seances__hall" key={uuidv4()}>
              <h3 className="movie-seances__hall-title">{hall.name}</h3>
              <ul className="movie-seances__list">
                { hall.seances.map((seance) => (
                  <li key={uuidv4()} className="movie-seances__time-block">
                    <Link className="movie-seances__time" to={`/hall/${seance.id}`}>
                      {parseInt(seance.start_time / 60, 10)}
                      :
                      {(seance.start_time % 60) < 10 ? (`0${seance.start_time % 60}`) : (seance.start_time % 60)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}

    </>

  );
}

export default UserMoviesList;
