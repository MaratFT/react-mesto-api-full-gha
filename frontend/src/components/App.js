import React from 'react';
import Header from './Header';
import Main from './Main';

import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { currentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [registration, setRegistration] = React.useState(true);

  // const [LoggedInPopupOpen, setLoggedInPopupOpen] = React.useState(false);

  // const current = React.useContext(currentUserContext);

  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  const checkToken = React.useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    // console.log(`checkToken: ${jwt}`);

    if (jwt) {
      auth
        .getContent(jwt)
        .then(data => {
          if (!data) {
            return;
          }
          setUserData(data);
          setLoggedIn(true);
          navigate('/');
        })
        .catch(error => {
          setLoggedIn(false);
          console.error(error);
        });
      return;
    }
  }, [navigate]);

  React.useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkToken]);

  React.useEffect(() => {
    if (loggedIn) {
      Api.getInfoUser()
        .then(data => {
          setCurrentUser(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltip() {
    setInfoTooltipPopupOpen(true);
  }

  // function handleLoggedIn() {
  //   setLoggedInPopupOpen(true);
  // }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false, link: '', name: '' });
    setInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, link: card.link, name: card.name });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user === currentUser._id);
    (isLiked ? Api.deleteLike(card._id) : Api.addLike(card._id, true))
      .then(newCard => {
        setCards(state => state.map(c => (c._id === newCard._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    Api.deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    Api.editInfoUser({ name: name, about: about })
      .then(() => {
        setCurrentUser({ ...currentUser, name: name, about: about });
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleUpdateAvatar(avatar) {
    Api.editAvatarUser({ avatar })
      .then(() => {
        setCurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    Api.addCard({ name: name, link: link })
      .then(data => {
        // setCurrentUser({ ...currentUser, name: name, link: link });
        closeAllPopups();
        setCards([data, ...cards]);
      })
      .catch(error => {
        console.error(error);
      });
  }

  React.useEffect(() => {
    if (loggedIn) {
      Api.getInitialCards()
        .then(cards => {
          setCards(cards);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [loggedIn]);

  return (
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header loggedIn={loggedIn} userData={userData} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  setCards={setCards}
                  cards={cards}
                  onCardDelete={handleCardDelete}
                />
              }
            ></Route>
            <Route
              path="/sign-up"
              element={
                <Register
                  isOpen={infoTooltipPopupOpen}
                  onClose={closeAllPopups}
                  onCheckRegistration={handleInfoTooltip}
                  registration={registration}
                  setRegistration={setRegistration}
                />
              }
            ></Route>
            <Route
              path="/sign-in"
              element={
                <Login
                  email={email}
                  setEmail={setEmail}
                  setLoggedIn={setLoggedIn}
                  setUserData={setUserData}
                />
              }
            ></Route>
          </Routes>

          <InfoTooltip
            isOpen={infoTooltipPopupOpen}
            // isOpenLoggedIn={LoggedInPopupOpen}
            onClose={closeAllPopups}
            registration={registration}
            // loggedIn={loggedIn}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name={'confirmation'}
            title={'Вы уверены?'}
            isOpen={''}
            buttonTitle={'Да'}
            onClose={closeAllPopups}
          />

          <template id="place-template">
            <article className="place">
              <img className="place__image" src="#" alt="" />
              <button type="button" aria-label="Удалить" className="place__remove"></button>
              <div className="place__title-like">
                <h2 className="place__title"></h2>
                <div className="place__container-like">
                  <button type="button" aria-label="Нравится" className="place__like"></button>
                  <p className="place__like-number">0</p>
                </div>
              </div>
            </article>
          </template>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <div className="popup popup_image-scale">
            <div className="popup__image">
              <img className="popup__image-view" src="#" alt="" />
              <p className="popup__image-title"></p>
              <button
                type="button"
                aria-label="Закрыть"
                className="popup__close popup__close-image"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;
