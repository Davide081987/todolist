import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import NavBar from '../NavBar/index';


const Header = () => (

    <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="inherit" >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div><NavBar /></div>
                </div>
            </Typography>

        </Toolbar>
    </AppBar>


);

export default Header;
