import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      isOpen={props.isOpen}
      buttonTitle={'Сохранить'}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        className="popup__field"
        id="avatar-image-input"
        required
        ref={avatarRef}
      />
      <span className="popup__error popup__error_visible" id="avatar-image-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
