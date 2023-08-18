function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form noValidate name={props.name} className="popup__fields" onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__button-save">
            {/* popup__button-save_disabled */}
            {props.buttonTitle}
          </button>
        </form>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
