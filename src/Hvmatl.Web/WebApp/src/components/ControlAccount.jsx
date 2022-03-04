import React, { useState, useEffect } from 'react';
import ControlAccountItem from './ControlAccountItem';
import ModalAccountInfo from './ModalAccountInfo';
import axios from 'axios';
import { connect, useDispatch } from "react-redux";
import ModalAccountDelete from './ModalAccountDelete';
import ModalAccountCreate from './ModalAccountCreate';
import { getAccount } from "../store/dispatch/dispatch";

const ControlAccount = ({getAccountDispatch, accountState}) => {
    const [account, setAccount] = useState();
    const [showmodal, setShowModal] = useState({
        "toggleView" : false,
        "modalType" : null,
        "modalParam" : null,
    });

    const { 
        loading: accountLoading, 
        success: accountSuccess,
        data: accountData 
    } = accountState;

    useEffect(() => {
        if(!accountData) {
            getAccountDispatch();
        }
    }, [accountList.data]);

    const deleteAccount = async (id) => {
        await axios.delete('/api/account/Delete/' + id)
            .then(response => {
                const filtered = account.filter(user => 
                    user.id != id
                );
                setAccount(filtered);
                
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const createAccount = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Test')
        // await axios.delete('/api/account/Delete/' + id)
        //     .then(response => {
        //         const filtered = account.filter(user => 
        //             user.id != id
        //         );
        //         setAccount(filtered);
                
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }


    return (
        <>
        {
            accountLoading == true &&
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        }
        {
            accountLoading == false &&
            <div className="controlAccountContainer">
                <div className="container">
                    <div className="row">
                        <div className="controlAccountOption">
                            <button className="optionNewAccount"
                                onClick={() => {setShowModal({
                                    "toggleView" : true,
                                    "modalType" : "modalAccountCreation",
                                })}}>
                                New Account
                            </button>
                            <input type="text" 
                            className="optionSearchAccount"
                            placeholder="Search...." />
                        </div>
                        <ul className="controlAccountList">
                            {accountData.result.map(user => (
                                <ControlAccountItem
                                    key={user.id}
                                    user={user}
                                    setShowModal={setShowModal}
                                    showmodal={showmodal}
                                    deleteAccount={deleteAccount}
                                ></ControlAccountItem>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        }
        {
            showmodal.toggleView && showmodal.modalType == "modalAccountInfo" &&
            <div className="modal fade show d-block" id="controlAccountModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <ModalAccountInfo
                    modalParam={showmodal.modalParam}
                    modalToggle={setShowModal}
                ></ModalAccountInfo>
            </div>
        }
        {
            showmodal.toggleView && showmodal.modalType == "modalAccountDelete" &&
            <div className="modal fade show d-block" id="controlAccountModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <ModalAccountDelete
                    modalParam={showmodal.modalParam}
                    modalToggle={setShowModal}
                    modalConfirm={deleteAccount}
                ></ModalAccountDelete>
            </div>
        }
        {
            showmodal.toggleView && showmodal.modalType == "modalAccountCreation" &&
            <div className="modal fade show d-block" id="controlAccountModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <ModalAccountCreate
                    modalToggle={setShowModal}
                    modalConfirm={createAccount}
                ></ModalAccountCreate>
            </div>
        }
        {
            showmodal.toggleView &&
            <div className="modal-backdrop fade show"></div>
        }
        </>
    );
}


const mapDispatchToProps = (dispatch) => ({
    getAccountDispatch: (test) => getAccount(dispatch),
});
  
const mapStateToProps = (state) => ({
    accountState : state.account.list
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlAccount);