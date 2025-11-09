const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, skills, gender, age } = user;
  return (
    <div className="h-full flex md:mt-20 mt-25  justify-center ">
      <div className="card w-70  bg-base-300 md:w-96  shadow-sm">
        <figure className="max-h-[80%]">
          <img className="w-full object-cover" src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-between">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
