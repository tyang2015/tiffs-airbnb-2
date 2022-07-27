import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/users">Sign Up</NavLink>
        {/* <NavLink to="/login">Log In</NavLink> */}
      </>
    );
  }

  return (
    <ul className='top-nav-bar'>
      <li className= 'inside-nav-bar'>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
