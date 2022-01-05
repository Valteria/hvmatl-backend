import React, { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DisplayVolunteer from '../components/DisplayVolunteer';
import axios from "axios";


const Staff = (prop) => {
    const [isLoading, setLoading] = useState(true);
    const [memberList, setMemberList] = useState([]);


    useEffect(() =>  {
        var memberList

        axios.get('/api/church/getMemberList')
        .then((result) => {
            memberList = result.data.result
            
            if(sessionStorage.getItem('token') == null){
                memberList.map(m => m.phone = '')
            }
            
            setMemberList(memberList)    
            setLoading(false)
            console.log(result.data.result)
        });
    }, []);
    return(
        <div>
            <Preloader/>
            <Header/>
            <div className="col-12">
                <div className="section-heading">
                    <h2><b>Hội Đồng Mục Vụ / Hội Đồng Tài Chánh 2019-2023</b></h2>
                </div>
                <DisplayVolunteer list={memberList} />
            </div>
            <Footer/>
        </div>
    )
};
export default Staff;