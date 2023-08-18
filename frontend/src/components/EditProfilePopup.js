import React from 'react';
import PopupWithForm from './PopupWithForm';
import { currentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const current = React.useContext(currentUserContext);
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(current.name);
    setDescription(current.about);
  }, [current, props.isOpen]);

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      isOpen={props.isOpen}
      buttonTitle={'Сохранить'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Имя"
        className="popup__field"
        id="user-name-input"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__error popup__error_visible" id="user-name-input-error"></span>
      <input
        type="text"
        name="about"
        placeholder="О себе"
        className="popup__field"
        id="about-me-input"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className="popup__error popup__error_visible" id="about-me-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
