import { Link } from "react-router-dom";

const ConnectionCard = ({ connection, sendButton, handleClick }) => {
  const { _id, firstName, lastName, photoUrl, about } = connection;
  console.log(connection);
  return (
    <div className="flex items-center gap-3 bg-base-200 w-[50%] md:w-[60%] mx-auto my-4 p-3 rounded-xl shadow-md">
      <img
        className="w-12 h-12 rounded-full object-cover"
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
      />

      <div className="flex-1">
        <h3 className="text-sm sm:text-base font-semibold text-primary truncate">
          {firstName} {lastName}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">{about}</p>
      </div>

      {sendButton && (
        <Link to={`/chat/${_id}`} className="flex gap-2">
          <button className="btn bg-secondary btn-ghost">Message</button>
        </Link>
      )}
      {!sendButton && (
        <div className="flex gap-2">
          <button
            onClick={() => handleClick("accepted", _id)}
            className="btn bg-accent btn-ghost"
          >
            Accept
          </button>
        </div>
      )}

      {!sendButton && (
        <div className="flex gap-2">
          <button
            onClick={() => handleClick("rejected", _id)}
            className="btn bg-error btn-ghost"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectionCard;
