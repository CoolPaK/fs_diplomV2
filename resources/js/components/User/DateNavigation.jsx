import React, { useEffect, useState, useContext } from 'react';
import UserContext from './UserContext';
import Api from '../../functions/Api';

function DateNavigation() {
  const { setMovieShows } = useContext(UserContext);

  const now = new Date();
  const day = (`0${now.getDate()}`).slice(-2);
  const month = (`0${now.getMonth() + 1}`).slice(-2);
  const today = `${now.getFullYear()}-${month}-${day}`;
  const [daysData, setDaysData] = useState([]);
  const [activeDate, setActiveDate] = useState(0);
  // const [test, setTest] = useState([]);

  const calendarLoad = () => {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    const dateArray = [];
    for (let i = 0; i < 8; i += 1) {
      const newDate = new Date();
      newDate.setDate(new Date().getDate() + i);
      const dayOfWeek = newDate.getDay();
      const calendarDay = (`0${newDate.getDate()}`).slice(-2);
      const calendarMonth = (`0${newDate.getMonth() + 1}`).slice(-2);
      const dateString = `${newDate.getFullYear()}-${calendarMonth}-${calendarDay}`;
      const newObject = {
        day: days[dayOfWeek],
        api: dateString,
        active: false,
        date: calendarDay,
        id: i,
      };
      if (newObject.api === today) {
        newObject.active = true;
      }
      dateArray.push(newObject);
    }
    setDaysData(dateArray);
  };

  useEffect(async () => {
    const schedule = await Api.getMovie('movie_hall', today);
    // console.log(schedule);
    setMovieShows(schedule);
    calendarLoad();
  }, []);

  const handleDateClick = async (index, date) => {
    setActiveDate(index);
    const schedule = await Api.getMovie('movie_hall', date);
    setMovieShows(schedule);
  };

  const handleNextClick = async () => {
    if (activeDate + 1 >= daysData.length) {
      return;
    }
    const nextDay = activeDate + 1;
    setActiveDate(nextDay);
    const schedule = await Api.getMovie('movie_hall', daysData[nextDay].api);
    setMovieShows(schedule);
  };

  return (
    <nav className="page-nav">
      {daysData && daysData.map((item) => (
        <span
          className={`
          ${item.id === activeDate ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day'} 
          ${item.api === today ? 'page-nav__day_today' : ''} 
          ${(item.day === 'сб' || item.day === 'вс') ? 'page-nav__day_weekend' : ''}`}
          onClick={() => handleDateClick(item.id, item.api)}
          key={item.date}
          aria-label="Navigation button"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => { if (e.key === 'Enter') handleDateClick(item.id, item.api); }}
        >
          <span className="page-nav__day-week">{item.day}</span>
          <span className="page-nav__day-number">{item.date}</span>
        </span>
      ))}
      <span
        className="page-nav__day page-nav__day_next"
        onClick={async () => { handleNextClick(); }}
        aria-label="Navigation next"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if (e.key === 'Enter') handleNextClick(); }}
      />
    </nav>
  );
}

export default DateNavigation;
