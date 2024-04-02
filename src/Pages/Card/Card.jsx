const Card = ({ card }) => {
    const { _id, first_name, last_name, gender, avatar, domain } = card;

    return (
        <div>
            <div className="card bg-indigo-200 shadow-lg rounded">
                <figure className="px-10 pt-10">
                    <img src={avatar} alt="User" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{first_name} {last_name}</h2>
                    <p>Gender: {gender}</p>
                    <p>Domain: {domain}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;