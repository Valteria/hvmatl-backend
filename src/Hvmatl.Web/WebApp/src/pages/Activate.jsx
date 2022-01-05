import React, { useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';

const Activate = () => {
    const [isLoading, setLoading] = useState(false);

    const registerAccount = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");
        const username = queryParams.get("username");

        var formData = new FormData();
        formData.append('token', token);
        formData.append('username', username);
        formData.append('password', form.password.value);

        axios.post('/api/account/updatepassword', formData)
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
                                    Reset your password
                                </h4>
                                <hr />
                                <form noValidate onSubmit={registerAccount}>
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
                                            { isLoading ? <Spinner/> : <span>Update Password</span> }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Activate;