 const generateComponentCode = (componentName,dataTypes) => {
    if (componentName) {
        return `
            import React from 'react';

            export default function ${componentName}(){
                return (
                    <div>
                        <h1>${componentName} Page</h1>
                        <p>This is a simple React component!</p>
                    </div>
                );
            };
        `;
    }

    return `
            ${Imports(dataTypes)}

            export default function Index(){
                ${FormHandler(dataTypes)}
                return (
                    <div>
                        <h1>Form</h1>
                        ${Form(dataTypes)}
                    </div>
                );
            };
        `;
};

function Imports(dataTypes){
    return `
        import React, {useState, useEffect, useRef} from 'react';
        import {useFormik} from 'formik';
        import * as Yup from 'yup';
        import {useSelector, useDispatch} from 'react-redux';
        import toast from 'react-hot-toast';
        import {useNavigate} from 'react-router-dom';

        const schema = Yup.object().shape({
            ${
                dataTypes.map((item) => {
                    return `${item.name}: Yup.string().required('Please enter ${item.name}'),\n`;
                }).join('')
            }
        });

        const initialValues = {
            ${
                dataTypes.map((item) => {
                    return `${item.name}:''`;
                })
            }
        };
        `
    
}

function FormHandler(dataTypes){
    return `
        const [FormValues, setFormValues] = useState({...initialValues});
        const [loading, setLoading] = useState(false);

        const form = useFormik({
            enableReinitialize: true,
            initialValues: {...FormValues},
            validationSchema: schema,
            onSubmit: (values) => {
                if(actionType === 'add'){
                    // call your API here to add values
                }

                if(actionType === 'edit'){
                    // call your API here to edit values
                }
            },
        });

        // Use this useEffect to set values like this form is use for Edit
        useEffect(() => {
            // You can call your API here and get data to set FormValues for Edit
            // setFormValues();
        }, []);
    `
}

function Form(dataTypes){
    return `
      <form className="row text-start" onSubmit={form.handleSubmit}>
        ${dataTypes?.map((item) => {
            if(item.type?.split('=')[0] === 'select'){
                return `<div className="form-group col-md-4">
              <label htmlFor="${item.name}">${item.name}</label>
              <select className="form-control" id="${item.name}" name="${item.name}" value={form.values.${item.name}} onChange={form.handleChange} onBlur={form.handleBlur}>
                <option value="" disabled>Choose one</option>
                ${item.type?.split('=')[1]?.split(';')?.map((option) => {
                    return `<option value="${option}">${option}</option>\n`
                }).join('')}
              </select>
              {form.touched?.${item.name} && form.errors?.${item.name} && <p className="text-danger">{form.errors?.${item.name}}</p>}
            </div>\n`
            }
            return `<div className="form-group col-md-4">
              <label htmlFor="${item.name}">${item.name}</label>
              <input type="${item.type}" className="form-control" id="${item.name}" name="${item.name}" value={form.values.${item.name}} onChange={form.handleChange} onBlur={form.handleBlur}/>
              {form.touched?.${item.name} && form.errors?.${item.name} && <p className="text-danger">{form.errors?.${item.name}}</p>}
            </div>\n`
        }).join('')}  
        <div className="form-group col-md-12 text-end">
        {
            loading ? <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="visually-hidden">Loading...</span>
            </button> : <button type="submit" className="btn btn-primary">Submit</button>
        }
        </div>
      </form>
    `
}

module.exports = {generateComponentCode}