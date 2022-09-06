import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  async componentDidMount() {
    const response = await getUser();
    // console.log(response);
    this.setState({
      data: response,
    });
  }

  render() {
    const { data } = this.state;
    const { name, email, image, description } = data;
    return (
      <div data-testid="page-profile">
        <Header />
        <p>{name}</p>
        <p>{email}</p>
        <img data-testid="profile-image" src={ image } alt={ name } />
        <p>{description}</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
