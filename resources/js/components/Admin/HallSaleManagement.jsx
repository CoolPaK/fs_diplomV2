import React, {
  useEffect, useState, useContext,
} from 'react';

import AdminContext from './AdminContext';
import HallBtnContainer from './HallBtnContainer';
import Api from '../../functions/Api';

function HallSaleManagement() {
  const { halls, loadFromServer } = useContext(AdminContext);

  const [activeHall, setActiveHall] = useState(0);
  const [activeHallIndex, setActiveHallIndex] = useState(0);
  // const [isLoaded, setIsLoaded] = useState(false);

  const handleSetActive = (hallId) => {
    const index = halls.map((hall) => hall.id).indexOf(hallId);
    setActiveHall(hallId);
    setActiveHallIndex(index);
  };

  const handleOpenSale = async () => {
    const status = halls[activeHallIndex].is_active === 1 ? 0 : 1;
    const response = await Api.openSales('hall', status, activeHall);
    // console.log(response);
    if (response === 'Status update successful') {
      loadFromServer();
    }
  };

  useEffect(() => {
    // setIsLoaded(false);
    if (halls.length === 0) {
      return;
    }
    setActiveHall(halls[0].id);
    // setIsLoaded(true);
  }, [halls]);

  return (
    <div className="conf-step__wrapper">
      <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
      <HallBtnContainer name="open-sale" active={activeHall} setActive={handleSetActive} />
      <div className="conf-step__wrapper text-center">
        <p className="conf-step__paragraph">Всё готово, теперь можно:</p>
        {halls.length > 0 && <button className="conf-step__button conf-step__button-accent" type="button" onClick={handleOpenSale}>{halls[activeHallIndex].is_active === 1 ? 'Закрыть продажу билетов' : 'Открыть продажу билетов'}</button>}
      </div>
    </div>
  );
}

export default HallSaleManagement;
