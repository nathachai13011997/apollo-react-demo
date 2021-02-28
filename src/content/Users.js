import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"

import { useQuery, useMutation } from '@apollo/client'

import DELETE_USER from '../libe/querydemo/deleteUser'
import GET_USERALL from '../libe/querydemo/getUserAll'

import swal from 'sweetalert';

const Users = () => {

    //  การแสดงข้อมูล แบบแบ่งหน้า
    // const [users, setUsers] = useState([]) // เก็บข้อมูล Users
    const [pages, setPages] = useState(1) // หน้า กำหนดให้เป็นหน้าที่ 1
    const [totalpages, setTotalpages] = useState([])

    //  การส่ง parameter ไป 2 ตัว page คือ หน้า | limit คือ จำนวนการแสดงข้อมูลต่อหน้า
    const { loading, error, data } = useQuery(GET_USERALL, {
        variables: {
            page: pages,
            limit: 2
        }
    })

    useEffect(() => {
        if (data) {
            const currentPage = Math.floor(data.users.meta.totalCount / 2)
            setTotalpages(new Array(currentPage).fill())
        }
    }, [loading, error, data])

    const [DeleteUser, { data: DataD }] = useMutation(DELETE_USER)

    const { register, handleSubmit } = useForm()

    const myFunction = (data) => {

        swal({
            title: "Do you want to delete ?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                swal("Deleted SuccessFully", {
                    icon: "success",
                }).then((willDelete2) => {
                    if (willDelete2) {
                        DeleteUser({ variables: { id: data.id } })
                    }
                });
            }
        });
    }

    const pageActive = (data) => {
        setPages(data)
    }

    const doSubmit = (data) => {
        console.log(data)
        myFunction(data)
    }

    if (loading) return (
        <div className="text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
    if (error) return <p>Error :(</p>

    return <>
        <div className="container my-5">
            <Link className="btn btn-primary" to="/Create">Create</Link>
            {JSON.stringify(DataD)}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.users.data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td> <Link className="btn btn-warning" to={"/Edit/" + item.id}>Edit</Link></td>
                                <td>
                                    <form onSubmit={handleSubmit(doSubmit)} >
                                        <button type="submit" name="id" className="btn btn-danger" ref={register} value={item.id} >Delete</button>
                                        {/* onClick={()=>{window.confirm('Do you want to delete ?')}} */}
                                    </form>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {/* {totalpages} */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {totalpages.map((users, index) => {
                        let pageNo = index + 1
                        return (
                            <li key={index} onClick={() => { pageActive(pageNo) }} className={`page-item ${pageNo === pages ? "active" : ""}`}><button  className="page-link" >{pageNo}</button></li>
                        )
                    })}
                </ul>
            </nav>

        </div>

    </>
}
export default Users
