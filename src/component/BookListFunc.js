import { useEffect, useState } from "react";
import { getAllBooks } from "../service/BookService";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function BookListFunc() {
    const [books, setBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        fetchBooks(name);
    }, [name]);

    const fetchBooks = async (name) => {
        let res = await getAllBooks(name);
        res.books.sort((a, b) => a.quantity - b.quantity);
        setBooks(res.books);
        setGenres(res.genres);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const getGenreName = (genreId) => {
        if (!genres || genres.length === 0) {
            return 'Unknown';
        }
        const genre = genres.find(g => g.genreId === genreId);
        return genre ? genre.name : 'Unknown';
    };

    return (
        <div className="container mt-5">
            <div className="mb-3">
                <Link to="/create" className="btn btn-primary">Thêm mới</Link>
            </div>
            <div className="mb-3">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Search by book name"
                />
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Entry Date</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tbody>
                {books.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{getGenreName(item.genreId)}</td>
                        <td>{formatDate(item.dateOfAcquisition)}</td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookListFunc;
