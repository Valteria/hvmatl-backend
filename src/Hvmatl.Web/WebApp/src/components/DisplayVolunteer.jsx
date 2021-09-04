import React from 'react';

//Work in Progress

const Volunteers = ({list}) => (
    <>
    <div class="container">
    <div class="row about-content justify-content-center">
    {list.map((Volunteers) => (
        <div class="col-10 col-md-6 col-lg-2">
            <div class="about-us-content mb-50">
                <img height="auto" src={Volunteers.image} alt=""/>
                <div class="about-text">
                    <h3><b>{Volunteers.name}</b></h3>
                    <h4>{Volunteers.title}{Volunteers.department.name}</h4>
                    <h4 style={{fontSize: '11px'}}>{Volunteers.emailAddress}</h4>
                    <h4 style={{fontSize: '12px'}}>{Volunteers.phone}</h4>
                </div>
            </div>
        </div>
    ))}
    </div>
    </div>
    </>
);

export default Volunteers;