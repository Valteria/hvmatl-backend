import React, { useState, useEffect } from 'react';

const ModalAccountInfo = ({modalParam, modalToggle}) => {

    return (
        <>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Account Information</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {modalToggle(false)}}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='modal-body-label'>
                            Name:
                        </div>
                        <div className='modal-body-text'>
                            {modalParam.firstName + " " + modalParam.lastName} 
                        </div>
                        <div className='modal-body-label'>
                            Email Address:
                        </div>
                        <div className='modal-body-text'>
                            {modalParam.email} 
                        </div>
                        <div className='modal-body-label'>
                            Address:
                        </div>
                        <div className='modal-body-text'>
                            {modalParam.address + ", " + modalParam.city + ", " + modalParam.state + " " + modalParam.zipCode} 
                        </div>
                        <div className='modal-body-label'>
                            Phone:
                        </div>
                        <div className='modal-body-text'>
                            {modalParam.phoneNumber} 
                        </div> 
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAccountInfo;