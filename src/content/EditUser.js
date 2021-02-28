import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"

import informactionSchema from '../schema/informactionSchema'
import { yupResolver } from '@hookform/resolvers/yup'

import GET_USERID from '../libe/querydemo/getUserId'
import UPDATE_USER from '../libe/querydemo/updateUser'
import { useQuery, useMutation } from '@apollo/client'

const EditUser = () => {
    const { id } = useParams()
    const { loading, error, data } = useQuery(GET_USERID, { variables: { id: id } })

    const [UpdateUser, { data: DataUpdate }] = useMutation(UPDATE_USER)

    const { register, handleSubmit, errors } = useForm({
        // errors
        resolver: yupResolver(informactionSchema)
    });

    const doSubmit = (data) => {
        UpdateUser({ variables: { id: id, input: data } })
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
        <div className="container">
            <h1>EditUser</h1>
            <pre>{JSON.stringify(DataUpdate)}</pre>
            <form onSubmit={handleSubmit(doSubmit)} >
                <div className="form-group" >
                    <label >UserName:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter UserName"
                        className="form-control my-3"
                        defaultValue={data.user.username}
                        ref={register}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div className="form-group" >
                    <label >Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="form-control my-3"
                        defaultValue={data.user.name}
                        ref={register}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className="form-group" >
                    <label >Email:</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        className="form-control my-3"
                        defaultValue={data.user.email}
                        ref={register}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="form-group" >
                    <label >Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone"
                        className="form-control my-3"
                        defaultValue={data.user.phone}
                        ref={register}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                <button type="submit" className="btn btn-success" >Update</button>{`     `}
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        </div>
    </>
}
export default EditUser
