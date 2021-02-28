import React from 'react'
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"

import informactionSchema from '../schema/informactionSchema'
import { yupResolver } from '@hookform/resolvers/yup'

import ADD_USER from '../libe/querydemo/addUser'
import { useMutation } from '@apollo/client'

const Create = () => {
   
    const [CreateUser, { data: DataCreate }] = useMutation(ADD_USER);
    const { register, handleSubmit, errors } = useForm({
        // validationSchema:SignupSchema ใช้ไม่ได้
        resolver: yupResolver(informactionSchema)
    });
    const doSubmit = (data) => {
        CreateUser({ variables: { input: data } })
    }
    return <>
        <div className="container">
            <h1>CreateUser</h1>
            <pre>{JSON.stringify(DataCreate)}</pre>
            <form onSubmit={handleSubmit(doSubmit)}>
                <div className="form-group" >
                    <label >UserName:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter UserName"
                        className="form-control my-3"
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
                        ref={register}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                <button type="submit" className="btn btn-success" >Save</button>{`     `}
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        </div>
    </>
}
export default Create
