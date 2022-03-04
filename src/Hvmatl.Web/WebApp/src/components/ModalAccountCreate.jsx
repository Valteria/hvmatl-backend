import React, { useState, useEffect } from 'react';

const ModalAccountCreate = ({modalToggle, modalConfirm}) => {

    return (
        <>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Account Creation</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {modalToggle(false)}}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="createAccountForm" noValidate onSubmit={(e) => modalConfirm(e)}>
                            <div className="form-group">
                                <label htmlFor="emailAddress">Email Address</label>
                                <input type="email" name="emailAddress" className="form-control" placeholder="" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" name="firstName" className="form-control" placeholder="" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstName">Last Name</label>
                                <input type="text" name="firstName" className="form-control" placeholder="" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text" name="phoneNumber" className="form-control" placeholder="" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" name="address" className="form-control" placeholder="" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" className="form-control" placeholder="" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input type="text" name="state" className="form-control" placeholder="" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="zipCode">Zip Code</label>
                                <input type="text" name="zipCode" className="form-control" placeholder="" required />
                            </div>

                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" 
                            onClick={() => {modalToggle(false)}}>
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary" form="createAccountForm"
                            onClick={() => {
                                //modalToggle(false);
                                }}>
                                Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAccountCreate;