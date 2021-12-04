import React from 'react';
import { NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <div className='navigation'>
            {/* Nav link vers page Home */}
            <NavLink exact to='/' activeClassName="nav-active">
                Home
            </NavLink>
            {/* Nav link vers page A propos */}
            <NavLink exact to='/about' activeClassName="nav-active">
                About
            </NavLink>
        </div>
    );
};

export default Navigation;