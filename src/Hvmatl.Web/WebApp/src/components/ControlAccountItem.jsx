import React, { useState, useEffect } from 'react';

const ControlAccountItem = ({user, setShowModal, showModal, deleteAccount}) => {

    return (
        <>
            <li className="controlAccountItem">
                <div className='accountInfoTab'>
                    <div className="accountTabStatus">
                        A
                    </div>
                    <button className="accountTabInfo" 
                    onClick={() => {setShowModal({
                        "toggleView" : true,
                        "modalType" : "modalAccountInfo",
                        "modalParam" : user
                    })}}>
                        <i className="far fa-file-alt"></i>
                    </button>
                </div>
                <div className="accountID">
                    {user.id}
                </div>
                <div className='accountInfo'>
                    <div className="accountInfoHeader">
                        <div className="accountInfoName">
                            {user.email}
                        </div>
                        <ul className="accountTagsList">
                            <li className="accountTagsItem">
                                Approved
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="accountOption">
                            <button className="optionEditStatus">
                                Edit Account
                            </button>
                            <button className="optionResetPassword">
                                Reset Password
                            </button>
                            <button className="optionDeleteAccount" onClick={() => setShowModal({
                                "toggleView" : true,
                                "modalType" : "modalAccountDelete",
                                "modalParam" : user
                            })}>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    );
}

export default ControlAccountItem;