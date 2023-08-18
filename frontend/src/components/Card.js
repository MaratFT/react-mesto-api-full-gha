import React from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const current = React.useContext(currentUserContext);
  // const [isLiked, setIsLiked] = React.useState();

  // const isOwn = props.card.owner === current._id;
  // const isLiked = Array.isArray(props.card.likes) && props.card.likes.some(i => i === current._id);
  // const isLiked = (props.card.likes?._id || props.card.owner) === current._id;

  const isOwn = (props.card.owner?._id || props.card.owner) === current._id;
  const isLiked = props.card.likes.some(i => i === current._id);

  const cardLikeButtonClassName = `place__like ${isLiked && 'place__like_active'}`;

  // React.useEffect(() => {
  //   isLiked = Array.isArray(props.card.likes) && props.card.likes.some(i => i === current._id);
  //   setIsLiked(isLiked);
  // }, [isLiked]);

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="place">
      <img
        className="place__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />

      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="place__remove"
          onClick={handleDeleteClick}
        ></button>
      )}

      <div className="place__title-like">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__container-like">
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="place__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
