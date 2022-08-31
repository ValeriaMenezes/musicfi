import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: '',
    };
  }

  async componentDidMount() {
    this.setState({ loading: 'carregando' });
    const response = await getUser();
    // console.log('1', response);
    this.setState({
      userName: response,
      loading: '',
    });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading === 'carregando' ? <Loading />
          : (
            <h3 data-testid="header-user-name">
              {userName.name}
            </h3>) }
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
      </header>
    );
  }
}

export default Header;
