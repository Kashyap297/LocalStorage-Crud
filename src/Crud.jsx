import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Crud = () => {
    const initialValue = {
        name: "",
        email: "",
        address: ""
    }
    const [input, setInput] = useState(initialValue)
    const [datas, setDatas] = useState(() => {
        return JSON.parse(localStorage.getItem('users')) || [];
    })
    const [errors, setErrors] = useState({})
    const [edit, setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState(null)
    const [button, setButton] = useState(false)

    useEffect(() =>{
        localStorage.setItem('users', JSON.stringify(datas))
    }, [datas])

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value

        setInput({ ...input, [key]: value })
    }

    const checkValidate = (input) => {
        const errors = {}

        if (input.name === "" || input.name === " ") {
            errors.name = "Invalid Name*"
        }

        if (input.email === "" || input.email === " ") {
            errors.email = "Invalid E-mail*"
        }
        if (input.address === "" || input.address === " ") {
            errors.address = "Invalid Address*"
        }
        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        const validate = checkValidate(input)
        setErrors(validate)
        const check = Object.keys(validate)
        if (check.length < 1) {
            setDatas([...datas, input])
            setInput(initialValue)
        }
        if(edit){
            datas[editIndex] = input;
            setDatas(datas)
            setEdit(false)
            
        }
        setButton(false)
    }

    const handleDelete = (index) => {
        // console.log(index);
        const temp = [...datas]
        temp.splice(index, 1)

        setDatas(temp)
    }

    const handleEdit = (index) => {
        setEdit(true)
        const editData = [...datas]
        editData.splice(index, 1)
        setInput(datas[index])
        setEditIndex(index)
        setButton(true)
    }

    return (
        <>
            <section className='card-section my-5'>
                <div className="container">
                    <div className="col-4 m-auto">
                        <div className="card p-3">
                            <h4 className='text-center mt-0 pb-2 border-bottom crimson'>Local-Storage CRUD</h4>
                            <div className="card-body">
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <i className="ri-user-2-fill me-3"></i>
                                        <input type="text" className='control-form' name="name" id="" placeholder='Enter Name' value={input.name} onChange={handleChange} />
                                    </div>
                                    <div className="text-danger text-end fw-bold">{errors && errors.name}</div>
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <i className="ri-mail-line me-3"></i>
                                        <input type="email" className='control-form' name="email" id="" placeholder='Enter Email ID' value={input.email} onChange={handleChange} />
                                    </div>
                                    <div className="text-danger text-end fw-bold">{errors && errors.email}</div>
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <i className="ri-map-pin-line me-3"></i>
                                        <input type="text" className='control-form' name="address" id="" placeholder='Enter Address' value={input.address} onChange={handleChange} />
                                    </div>
                                    <div className="text-danger text-end fw-bold">{errors && errors.address}</div>
                                    <button type='submit' className='control-form mt-3'>{button ? "Update" : "Submit"}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="table-data my-5">
                <div className="container">
                    <h2 className='text-center text-white'>Details</h2>
                    <div className="col-8 m-auto">
                        <table border={1} className='table table-bordered table-striped mt-4' id='resultsTable'>
                            <thead className='text-center'>
                                <tr>
                                    <th className='col-3'>Name</th>
                                    <th className='col-3'>Email</th>
                                    <th className='col-3'>Address</th>
                                    <th className='col-3'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    datas.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.address}</td>
                                                <td><button className='edit-btn me-2' onClick={() => handleEdit(index)}>Edit</button> <button className='dlt-btn' onClick={() => handleDelete(index)}>Delete</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Crud