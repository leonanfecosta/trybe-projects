import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Profile.module.css';
import profile from '../styles/image/profile_photo.png';

function Profile() {
  const history = useHistory();
  const [profileEmail, setProfileEmail] = useState('');

  useEffect(() => {
    setProfileEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  const logoutBtn = (event) => {
    event.preventDefault();
    history.push('/');
    localStorage.clear();
  };

  return (
    <div className={ styles.profile }>
      <Header title="Profile" showButton={ false } route="null" />
      <section>
        <img
          src={ profile }
          alt="profile"
          className={ styles.profileImage }
        />
        <h4 data-testid="profile-email">
          { profileEmail ? profileEmail.email : 'Email não informado' }
        </h4>
      </section>
      <nav>

        <Link to="/done-recipes">
          <button
            data-testid="profile-done-btn"
            type="button"
            className={ styles.button }
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
            className={ styles.button }
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ logoutBtn }
          className={ styles.button }
        >
          Logout
        </button>
      </nav>
      <Footer />
    </div>
  );
}

export default Profile;
