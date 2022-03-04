import React, { useState, useEffect } from 'react';
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';
import ControlAccount from '../components/ControlAccount';
import ControlHome from '../components/ControlHome';
import { withTranslation } from 'react-multi-lang';
import ControlArticle from '../components/ControlArticle';

const ControlPanel = () => {
    const [showView, setShowView] = useState("showControlHome");
    
    
    return (
        <>
            <Header/>
            <div className="controlPanelContainer">
                <div className="controlPanelHeader">
                    <div className="container">
                        <div className="row">
                            <ul className="controlPanelNavigationList nav nav-tabs">
                                <li className="controlPanelNavigationItem nav-item">
                                    <a
                                        className={'nav-link ' + (showView == "showControlHome" ? "active": "")}
                                        onClick={() => setShowView("showControlHome")}>Home</a>
                                </li>
                                <li className="controlPanelNavigationItem nav-item">
                                    <a  
                                        className={'nav-link ' + (showView == "showControlAccount" ? "active": "")} 
                                        onClick={() => setShowView("showControlAccount")}>Account</a>
                                </li>
                                <li className="controlPanelNavigationItem nav-item">
                                    <a  
                                        className={'nav-link ' + (showView == "showControlArticle" ? "active": "")} 
                                        onClick={() => setShowView("showControlArticle")}>Article</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="controlPanelBody">
                    <div className="container">
                        <div className="row">
                            <div className="controlPanelContent">
                                {
                                    showView == "showControlHome" &&
                                    <ControlHome></ControlHome>
                                }
                                {
                                    showView == "showControlAccount" &&
                                    <ControlAccount></ControlAccount>
                                }
                                {
                                    showView == "showControlArticle" &&
                                    <ControlArticle></ControlArticle>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default ControlPanel;