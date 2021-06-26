import React, { useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';


const Register = () => {

    const [isLoading, setLoading] = useState(false);

    const registerAccount = (event) => {
        const form = event.currentTarget;
        setLoading(true);
        
        event.preventDefault();
        event.stopPropagation();

        var formData = new FormData();
        formData.append('emailAddress', form.emailAddress.value);
        formData.append('username', form.username.value);
        formData.append('password', form.password.value);

        axios.post('https://localhost:44352/api/account/register', formData)
        .then(result => {
            console.log(result);
            window.location.href = '/login';
        })
        .catch(error => {
            console.log(error);
            setLoading(false)
        });

    };

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 mb-4">
                        <div className="card bg-light">
                            <div className="card-body">
                                <h4 className="card-title text-center mb-4 mt-1">
                                    Sign Up
                                </h4>
                                <hr />
                                <form noValidate onSubmit={registerAccount}>
                                    <div className="form-group">
                                        <label htmlFor="emailAddress">Email Address</label>
                                        <input type="email" name="emailAddress" className="form-control" placeholder="" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" className="form-control" placeholder="" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" placeholder="" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Confirm Password</label>
                                        <input type="password" name="confirmPassword" className="form-control" placeholder="" required />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-block" >
                                            { isLoading ? <Spinner/> : <span>Register</span> }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card bg-light">
                            <article className="card-body">
                                <div className="text-center">
                                    <p className ="d-inline">Already have an account? </p>
                                    <a href="/login">Sign In</a>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;