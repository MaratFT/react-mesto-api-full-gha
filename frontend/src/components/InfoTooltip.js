import successImage from '../images/Success.svg';
import errorImage from '../images/Error.svg';

function InfoTooltip(props) {
  return (
    <div className={`popup popup_tooltip ${props.isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__container">
        {props.registration ? (
          <img className="popup__tooltip-image" src={successImage} />
        ) : (
          <img className="popup__tooltip-image" src={errorImage} />
        )}

        {props.registration ? (
          <h2 className="popup__tooltip-title">Вы успешно зарегистрировались!</h2>
        ) : (
          <h2 className="popup__tooltip-title">Что-то пошло не так! Попробуйте ещё раз.</h2>
        )}

        {/* {props.loggedIn ? (
          <img className="popup__tooltip-image" src={successImage} />
        ) : (
          <img className="popup__tooltip-image" src={errorImage} />
        )}

        {props.loggedIn ? (
          <h2 className="popup__tooltip-title">Вы успешно авторизовались!</h2>
        ) : (
          <h2 className="popup__tooltip-title">Что-то пошло не так! Попробуйте ещё раз.</h2>
        )} */}

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

export default InfoTooltip;
