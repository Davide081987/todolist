import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/index';
import Home from '../../pages/Home/index';
import Gestionale from '../../pages/Gestionale/index';








const Layout = () => (
    <div>
        <Header />
        <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/Gestionale" component={Gestionale} />
        </main>
    </div>
);


export default Layout;
