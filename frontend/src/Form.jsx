import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
    Name: Yup.string().required('Please enter Name'),
    Email: Yup.string().required('Please enter Email'),
    Phone: Yup.string().required('Please enter Phone'),
    gender: Yup.string().required('Please enter gender'),

});

const initialValues = {
    Name: '', Email: '', Phone: '', gender: ''
};


export default function Index() {

    const [FormValues, setFormValues] = useState({ ...initialValues });
    const [loading, setLoading] = useState(false);

    const form = useFormik({
        enableReinitialize: true,
        initialValues: { ...FormValues },
        validationSchema: schema,
        onSubmit: (values) => {
            setLoading(true);
            console.log(values);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            
        },
    });

    // Use this useEffect to set values like this form is use for Edit
    useEffect(() => {
        // You can call your API here and get data to set FormValues for Edit
        // setFormValues();
    }, []);

    return (
        <div>
            <h1>Form</h1>

            <form className="row text-start container" onSubmit={form.handleSubmit}>
                <div className="form-group col-md-4">
                    <label htmlFor="Name">Name</label>
                    <input type="text" className="form-control" id="Name" name="Name" value={form.values.Name} onChange={form.handleChange} onBlur={form.handleBlur} />
                    {form.touched?.Name && form.errors?.Name && <p className="text-danger">{form.errors?.Name}</p>}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="Email">Email</label>
                    <input type="email" className="form-control" id="Email" name="Email" value={form.values.Email} onChange={form.handleChange} onBlur={form.handleBlur} />
                    {form.touched?.Email && form.errors?.Email && <p className="text-danger">{form.errors?.Email}</p>}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="Phone">Phone</label>
                    <input type="text" className="form-control" id="Phone" name="Phone" value={form.values.Phone} onChange={form.handleChange} onBlur={form.handleBlur} />
                    {form.touched?.Phone && form.errors?.Phone && <p className="text-danger">{form.errors?.Phone}</p>}
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="gender">gender</label>
                    <select className="form-control" id="gender" name="gender" value={form.values.gender} onChange={form.handleChange} onBlur={form.handleBlur}>
                        <option value="" disabled>Choose one</option>
                        <option value="male">male</option>
                        <option value="female">female</option>

                    </select>
                    {form.touched?.gender && form.errors?.gender && <p className="text-danger">{form.errors?.gender}</p>}
                </div>

                <div className="form-group col-md-12 text-end">
                    {
                        loading ? <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="visually-hidden">Loading...</span>
                        </button> : <button type="submit" className="btn btn-primary">Submit</button>
                    }
                </div>
            </form>

        </div>
    );
};