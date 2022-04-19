import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState(
      {
        loading: false,
        name: user.name,
        email: user.email,
        description: user.description,
        image: user.image,
      },
    );
  }

  render() {
    const { loading, email, image, name, description } = this.state;
    return (
      <section data-testid="page-profile">
        {loading ? <Loading /> : (
          <section>
            <img src={ image } alt={ name } data-testid="profile-image" />
            <h2>{name}</h2>
            <h3>{email}</h3>
            <p>{description}</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </section>
        )}
      </section>);
  }
}

export default Profile;
