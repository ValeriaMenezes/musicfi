import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nameUser: '',
      enabledButton: true,
      loading: '',
    };
  }

  handleChangeInput = ({ target }) => {
    const { value } = target;
    const minInput = 3;
    this.setState({
      nameUser: value,
    }, () => {
      if (value.length >= minInput) {
        return this.setState({ enabledButton: false });
      }
      return this.setState({ enabledButton: true });
    });
  };

  handleChangeClick = async () => {
    this.setState({ loading: 'carregando' });
    const { nameUser } = this.state;
    await createUser({ name: nameUser });
    this.setState({ loading: 'redirecionando' });
  };
  // Italo Lacerda me ajudou no requisito 2

  render() {
    const { nameUser, enabledButton, loading } = this.state;
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form>
          <label htmlFor="login-name-input">
            Nome:
            <input
              data-testid="login-name-input"
              name="nameUser"
              value={ nameUser }
              onChange={ this.handleChangeInput }
            />
          </label>
          <button
            data-testid="login-submit-button"
            name="button-login"
            type="button"
            disabled={ enabledButton }
            onClick={ this.handleChangeClick }
          >
            Entrar
          </button>
          { loading === 'carregando' && <Loading /> }
          { loading === 'redirecionando' && <Redirect to="/search" /> }
        </form>
      </div>
    );
  }
}

export default Login;
