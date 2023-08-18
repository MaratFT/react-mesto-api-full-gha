function ImagePopup(props) {
  return (
    <div className={`popup popup_image-scale ${props.card.isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__image">
        <img className="popup__image-view" src={props.card.link} alt={props.card.name} />
        <p className="popup__image-title">{props.card.name}</p>
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close popup__close-image"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
