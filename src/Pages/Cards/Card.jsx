import Swal from "sweetalert2";

const Card = ({ card }) => {
    const { _id, first_name, last_name, gender, avatar, domain } = card;

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#8EACCD',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            console.log("result", result);
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/users/${_id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your cart has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

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
                <div className="card-actions mx-auto mb-10">
                    <button onClick={() => handleDelete(_id)} className="btn normal-case bg-red-400 text-slate-200">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Card;