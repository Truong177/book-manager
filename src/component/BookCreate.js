import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as BookService from "../service/BookService";

function BookCreate() {
    const [genres, setGenres] = useState([]);
    const [form, setForm] = useState({
        name: "",
        genreId: "",
        dateOfAcquisition: "",
        quantity: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await BookService.getAllBooks(); // Lấy sách và thể loại từ server
                setGenres(res.genres); // Giả sử `res.genres` chứa danh sách thể loại
            } catch (error) {
                toast.error("Lấy danh sách thể loại thất bại.");
            }
        };
        fetchData();
    }, []);

    const objectValid = {
        name: Yup.string().required("Tên không được để trống")
            .min(3, "Tên không được ngắn hơn 3 ký tự"),
        genreId: Yup.string().required("Danh mục không được để trống"),
        dateOfAcquisition: Yup.date().required("Ngày nhập không được để trống"),
        quantity: Yup.number().required("Số lượng không được để trống").min(1, "Số lượng phải lớn hơn 0")
    };

    const saveBook = async (value) => {
        value.quantity = +value.quantity;
        let isSuccess = await BookService.saveBook(value);
        if (isSuccess) {
            toast.success("Thêm mới thành công");
            navigate("/books");
        } else {
            toast.error("Thêm mới thất bại.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Thêm Sách Mới</h1>
            <Formik initialValues={form} onSubmit={saveBook} validationSchema={Yup.object(objectValid)}>
                <Form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <Field id="name" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="genreId" className="form-label">Genre</label>
                        <Field as="select" id="genreId" name="genreId" className="form-control">
                            <option value="">Chọn thể loại</option>
                            {genres.map((genre) => (
                                <option key={genre.genreId} value={genre.genreId}>
                                    {genre.name}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="genreId" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dateOfAcquisition" className="form-label">Date of Acquisition</label>
                        <Field type="date" id="dateOfAcquisition" name="dateOfAcquisition" className="form-control" />
                        <ErrorMessage name="dateOfAcquisition" component="div" className="text-danger" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <Field type="number" id="quantity" name="quantity" className="form-control" />
                        <ErrorMessage name="quantity" component="div" className="text-danger" />
                    </div>
                    <button type="submit" className="btn btn-primary">Thêm mới</button>
                </Form>
            </Formik>
        </div>
    );
}

export default BookCreate;
