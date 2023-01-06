import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './composants/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import Navbar from "./composants/Navbar";
import Cardacceuil from "./composants/Cardacceuil";
import Personnage from "./composants/Personnage";
import Fav from "./composants/Fav";
import Episode from "./composants/Episode";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router>
        <Routes>
            <Route exact path="/*" element={<div><Navbar/> <Cardacceuil/></div>}/>
            <Route exact path="/episode" element={<div><Navbar/><Episode/></div>}/>
            <Route exact path="/personnage" element={<div><Navbar/> <Personnage/></div>}/>
            <Route exact path="/favoris" element={<div><Navbar/><Fav/></div>}/>

        </Routes>
    </Router>

);


reportWebVitals();
