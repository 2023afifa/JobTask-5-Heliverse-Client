import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card';

const Cards = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetch(`http://localhost:5000/usersPage?page=0&size=${itemsPerPage}`);
            const data = await res.json();
            setUsers(data);
        }
        fetchUsers();
    }, [])

    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(0);
    const [count, setCount] = useState(0);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];


    useEffect(() => {
        fetch("http://localhost:5000/usersCount")
            .then(res => res.json())
            .then(data => setCount(data.count))
    }, [])


    useEffect(() => {
        fetch(`http://localhost:5000/usersPage?page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [currentPage, itemsPerPage]);


    const handlePrevPage = () => {
        if (currentPage > 0) {

            setCurrentPage(Math.max(currentPage - 1, 0));
            window.scrollTo({ top: 50, behavior: 'smooth' })
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(Math.min(currentPage + 1, totalPages - 1));
            window.scrollTo({ top: 50, behavior: 'smooth' })
        }
    }




    return (
        <div>
            
            <div className="grid lg:grid-cols-4 gap-10">
                {
                    users.map(card => <Card key={card.id} card={card}></Card>)
                }
            </div>

            <div className="text-center mt-20 mb-14">
                <button className="text-lg bg-red-500 text-white mr-2 px-2 py-1 rounded" onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page => <button key={page} className={`text-xl font-semibold mr-2 py-1 px-2 rounded hover:text-red-500 ${currentPage === page ? "text-red-500" : ""}`} onClick={() => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>{page + 1}</button>)
                }
                <button className="text-lg bg-red-500 text-white px-2 py-1 rounded" onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default Cards;