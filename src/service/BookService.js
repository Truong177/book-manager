import axios from "axios";

const URL_BOOKS = "http://localhost:8080/books";
const URL_GENRES = "http://localhost:8080/genres";

export const getAllBooks = async (name) => {
    try {
        let booksResponse = await axios.get(URL_BOOKS + "?name_like=" + name);
        let genresResponse = await axios.get(URL_GENRES);
        return {
            books: booksResponse.data,
            genres: genresResponse.data
        };
    } catch (e) {
        console.log(e);
        return { books: [], genres: [] };
    }
};
export const saveBook = async (book) => {
    try {
        await axios.post(URL_BOOKS, book);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};
