import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from './Card';
import { data } from 'autoprefixer';

const Cards = () => {
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [searchName, setSearchName] = useState('');

    // useEffect(() => {
    //     axios.get("http://localhost:5000/users")
    //         .then(res => res.data)
    //         .then(data => setUsers(data))
    // }, [])


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
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 50, behavior: 'smooth' })
        }
    }

    const handleNextPage = () => {
        if (currentPage < numberOfPages - 1) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 50, behavior: 'smooth' })
        }
    }


    const handleSearchInput = e => {
        setSearchName(e.target.value);
    }

    const filteredUsers = users.filter(user => {
        const fullName = `${user.first_name} ${user.last_name}`;
        return fullName.toLowerCase().includes(searchName.toLowerCase());
    });



    return (
        <div className='m-10'>

            <div className="form-control mb-5">
                <div className="input-group justify-center">
                    <input value={searchName} onChange={handleSearchInput} type="text" placeholder="Search by name…" className="input input-bordered border-2 border-indigo-300 w-1/2" />
                </div>
            </div>

            <div className='mb-10 flex justify-center gap-5'>
                <div className='flex'>
                    <input type="checkbox" className="checkbox mr-2" />
                    <p>Domain</p>
                </div>
                <div className='flex'>
                    <input type="checkbox" className="checkbox mr-2" />
                    <p>Gender</p>
                </div>
                <div className='flex'>
                    <input type="checkbox" className="checkbox mr-2" />
                    <p>Availability</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-10">
                {
                    filteredUsers.map(card => <Card key={card.id} card={card}></Card>)
                }
            </div>

            <div className="text-center mt-20 mb-14">
                <button className="text-lg bg-indigo-500 text-white mr-2 px-2 py-1 rounded" onClick={handlePrevPage}>Prev</button>
                {
                    pages.map(page => <button key={page} className={`text-sm font-semibold mr-2 py-1 px-2 rounded hover:text-indigo-500 ${currentPage === page ? "text-indigo-500" : ""}`} onClick={() => { setCurrentPage(page); window.scrollTo({ top: 400, behavior: 'smooth' }); }}>{page + 1}</button>)
                }
                <button className="text-lg bg-indigo-500 text-white px-2 py-1 rounded" onClick={handleNextPage}>Next</button>
            </div>

        </div>
    );
};

export default Cards;