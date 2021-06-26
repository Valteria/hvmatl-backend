import React, { useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    const signIn = (event) => {
        const form = event.currentTarget;
        setLoading(true);
        
        event.preventDefault();
        event.stopPropagation();

        var formData = new FormData();
        formData.append('username', form.username.value);
        formData.append('password', form.password.value);

        axios.post('https://localhost:44352/api/authentication/login', formData)
        .then(result => {
            console.log(result);
            sessionStorage.setItem('username', result.data.result.userName);
            sessionStorage.setItem('token', result.data.token);
            window.location.href = '/';

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
                                    Sign In
                                </h4>
                                <hr />
                                <form noValidate onSubmit={signIn}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" className="form-control" placeholder="" required />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" placeholder="" required />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-block">
                                            { isLoading ? <Spinner/> : <span>Sign In</span> }
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
                                    <p className ="d-inline">Don't have an account? </p>
                                    <a href="/register">Sign Up</a>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;