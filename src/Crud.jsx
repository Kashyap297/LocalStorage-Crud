import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Table from './Table';


const Crud = () => {
    const initialValue = {
        name: "",
        email: ""
    }
    const [input, setInput] = useState(initialValue)
    const [datas, setDatas] = useState([])

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setInput({ ...input, [key]: value })
    }

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(datas));
    }, [datas]);

    const handleSubmit = (e) => {
        e.preventDefault()

        setDatas([...datas, input])
        setInput(initialValue)
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
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <i className="ri-mail-line me-3"></i>
                                        <input type="email" className='control-form' name="email" id="" placeholder='Enter Email ID' value={input.email} onChange={handleChange} />
                                    </div>
                                    <button className='control-form mt-3'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Table datas={datas} setDatas={setDatas}/>
        </>
    )
}

export default Crud