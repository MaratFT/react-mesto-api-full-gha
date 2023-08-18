import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link: link
    });
  }

  return (
    <PopupWithForm
      name={'add'}
      title={'Новое место'}
      isOpen={props.isOpen}
      buttonTitle={'Создать'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Название"
        className="popup__field"
        id="image-name-input"
        required
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__error popup__error_visible" id="image-name-input-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        className="popup__field"
        id="image-input"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className="popup__error popup__error_visible" id="image-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
