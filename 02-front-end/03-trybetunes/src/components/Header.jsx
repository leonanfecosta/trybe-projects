import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user, loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : (
          <section>
            <h1 data-testid="header-user-name">{user.name}</h1>
          </section>)}
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Buscar
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favoritos
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
