import { useEffect, useState } from "react";
import Card from "../Card/Card";
import axios from "axios";

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(res => {
                setUsers(res.data);
            })
    }, [])

    return (
        <div className="m-10">
            <div className="grid lg:grid-cols-4 gap-10">
                {
                    users.map(card => <Card key={card.id} card={card}></Card>)
                }
            </div>
        </div>
    );
};

export default Home;