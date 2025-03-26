import './style.scss';

const Contact = ({ id, name, lastMessage, urlAvatar, selectedId, onClick }) => {
  return (
    <div
      className={'contact-warp ' + (id == selectedId ? 'selected' : '')}
      onClick={() => onClick(id)}
    >
      <div className="avatar">
        <img src={urlAvatar} />
      </div>
      <div className="contact-body">
        <div className="name">{name}</div>
        <div className="last-message">{lastMessage}</div>
      </div>
    </div>
  );
};

export default Contact;
