import { useState, useRef } from "react";
import PropTypes from "prop-types";
import closeImage from "../../../images/admin/close.png";

function AddFilmPopup(props) {
    const { handleClose, handleSubmit } = props;
    const [newFilm, setNewFilm] = useState({
        name: "",
        description: "",
        duration: "",
        country: "",
        icon: "", // добавляем поле для иконки
    });

    const fileRef = useRef();
    const iconRef = useRef(); // отдельный ref для иконки

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFilm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="popup active">
            <div className="popup__container">
                <div className="popup__content">
                    <div className="popup__header">
                        <h2 className="popup__title">
                            Добавление фильма
                            <span
                                className="popup__dismiss"
                                role="button"
                                tabIndex={0}
                                onClick={() => handleClose(false)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter") handleClose(false);
                                }}
                            >
                                <img src={closeImage} alt="Закрыть" />
                            </span>
                        </h2>
                    </div>
                    <div className="popup__wrapper">
                        <form
                            method="post"
                            acceptCharset="utf-8"
                            onSubmit={(e) =>
                                handleSubmit(
                                    e,
                                    newFilm,
                                    fileRef.current.files[0],
                                    iconRef.current.files[0]
                                )
                            }
                        >
                            <label
                                className="conf-step__label conf-step__label-full-size"
                                htmlFor="name"
                            >
                                Название фильма
                                <input
                                    className="conf-step__input"
                                    type="text"
                                    placeholder="Например, &laquo;Гражданин Кейн&raquo;"
                                    name="name"
                                    required
                                    value={newFilm.name}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label
                                className="conf-step__label conf-step__label-full-size"
                                htmlFor="description"
                            >
                                Описание фильма
                                <input
                                    className="conf-step__input"
                                    type="text"
                                    placeholder="Описание фильма"
                                    name="description"
                                    required
                                    value={newFilm.description}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label
                                className="conf-step__label conf-step__label-full-size"
                                htmlFor="duration"
                            >
                                Длительность фильма, в минутах
                                <input
                                    className="conf-step__input"
                                    type="number"
                                    placeholder="Длительность"
                                    name="duration"
                                    required
                                    value={newFilm.duration}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label
                                className="conf-step__label conf-step__label-full-size"
                                htmlFor="country"
                            >
                                Страна производства
                                <input
                                    className="conf-step__input"
                                    type="text"
                                    placeholder="Страна производства"
                                    name="country"
                                    required
                                    value={newFilm.country}
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>

                            {/* Поле для постера */}
                            <label
                                className="conf-step__label conf-step__label-full-size"
                                htmlFor="poster"
                            >
                                Постер фильма
                                <input
                                    className="conf-step__input"
                                    type="file"
                                    accept="image/*"
                                    name="poster"
                                    required
                                    ref={fileRef}
                                />
                            </label>

                            {/* Поле для иконки */}
                            <label
                                className="conf-step__label conf-step__label-full-size"
                                htmlFor="icon"
                            >
                                Иконка фильма (маленькое изображение)
                                <input
                                    className="conf-step__input"
                                    type="file"
                                    accept="image/*"
                                    name="icon"
                                    ref={iconRef}
                                />
                                <small
                                    style={{ color: "#666", fontSize: "12px" }}
                                >
                                    Рекомендуемый размер: 32x32px или 64x64px
                                </small>
                            </label>

                            <div className="conf-step__buttons text-center">
                                <input
                                    type="submit"
                                    value="Добавить фильм"
                                    className="conf-step__button conf-step__button-accent"
                                />
                                <button
                                    className="conf-step__button conf-step__button-regular"
                                    type="button"
                                    onClick={() => handleClose(false)}
                                >
                                    Отменить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
