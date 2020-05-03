import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
/* 
"""possiamo scriverlo anche cosi"""

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';*/

function NavBar (props) {
    return (
        <List component="nav">
            <ListItem component="div">

                <ListItemText inset>
                    <Typography color="inherit">
                        <NavLink exact to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Home
                            </NavLink>
                    </Typography>
                </ListItemText>

                <ListItemText inset>
                    <Typography color="inherit">
                        <NavLink exact to="/Gestionale" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Gestionale
                            </NavLink>
                    </Typography>
                </ListItemText>

            </ListItem>
        </List>
    )

}

export default NavBar;
