import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/NotFound.module.css';

function NotFound() {
  return (
    <div className={ styles.notFound }>
      <Header title="Not Found" showButton={ false } route="null" />
      <main>
        <h2>Sorry, this page does not exist 😭</h2>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
