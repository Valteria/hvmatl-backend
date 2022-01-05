import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';

const ControlPanel = () => {
    const [data, setData] = useState({ result: [] });

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            '/api/account/GetUserList',
          );
            console.log(result.data);
          setData(result.data);
        };

        fetchData();
    }, []);

    return (
        <>
            <Header/>
            <div className="controlPanelContainer">
                <div className="controlPanelHeader">
                    <div className="headerId">
                        ID
                    </div>
                    <div className="headerUsername">
                        UserName
                    </div>
                    <div className="headerEmail">
                        Email
                    </div>
                    <div className="headerOption">
                        Option
                    </div>
                </div>
                <ul className="controlPanelRow">

                {data.result.map(user => (
                    <li key={user.id}> 
                        <div className="rowId">
                            {user.id}
                        </div>
                        <div className="rowUsername">
                            {user.userName}
                        </div>
                        <div className="rowEmail">
                            {user.email}
                        </div>
                        <div className="rowOption">
                            {
                                user.accountEnabled === true &&
                                <div className="btn">Disable</div>
                            }
                            {
                                user.accountEnabled === true &&
                                <div className="btn">Enable</div>
                            }
                            {
                                user.accountApproved === false &&
                                <div className="btn">Approve</div>
                            }
                            <div className="btn">Delete</div>
                        </div>
                    </li>
                ))}
                </ul>
            </div>
            <Footer/>
        </>
    );
}

export default ControlPanel;