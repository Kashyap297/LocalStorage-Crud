import React from 'react'


const Table = ({ datas, setDatas }) => {

    const handleDelete = (index) => {
        // console.log(index);
        const temp = [...datas]
        temp.splice(index, 1)

        setDatas(temp)
        localStorage.getItem('data')
    }
    return (
        <>
            <section className="table-data my-5">
                <div className="container">
                    <h2 className='text-center text-white'>Details</h2>
                    <div className="col-6 m-auto">
                        <table border={1} className='table table-bordered table-striped mt-4' id='resultsTable'>
                            <thead className='text-center'>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {
                                    datas.map((data, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td><button className='edit-btn me-2'>Edit</button> <button className='dlt-btn' onClick={() => handleDelete(index)}>Delete</button></td>
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

export default Table