import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      // data: {},
      loading: false,
      inputName: '',
      inputEmail: '',
      inputDescription: '',
      inputImage: '',
      disabled: true,
      redirect: false,
    };
  }

  async componentDidMount() {
    const response = await getUser();
    // console.log(response);
    this.setState({
      // data: response,
      inputName: response.name,
      inputEmail: response.email,
      inputDescription: response.description,
      inputImage: response.image,
    }, () => this.enableButton());
  }

  enableButton = async () => {
    const {
      inputName,
      inputEmail,
      inputDescription,
      inputImage,
    } = this.state;

    const name = inputName !== '';
    const email = inputEmail !== '';
    const description = inputDescription !== '';
    const image = inputImage !== '';

    if (name
      && email
      && description
      && image
    ) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  handleChange = ({ target }) => {
    this.enableButton();
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  onClick = async () => {
    const {
      inputName,
      inputEmail,
      inputDescription,
      inputImage,
    } = this.state;
    const obj = { name: inputName,
      email: inputEmail,
      description: inputDescription,
      image: inputImage,
    };
    this.setState({ loading: true });
    await updateUser(obj);
    this.setState({ loading: false, redirect: true });
  };

  render() {
    const { inputName, inputEmail, inputDescription,
      inputImage, disabled, redirect, loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        { redirect && <Redirect to="/profile" /> }
        { loading ? <Loading />
          : (
            <div>
              <Header />
              <form>
                <label htmlFor="input-name">
                  Nome:
                  <input
                    data-testid="edit-input-name"
                    value={ inputName }
                    name="inputName"
                    onChange={ this.handleChange }
                  />
                </label>
                <br />
                <label htmlFor="input-email">
                  Email:
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    value={ inputEmail }
                    name="inputEmail"
                    onChange={ this.handleChange }
                  />
                </label>
                <br />
                <label htmlFor="input-description">
                  Descrição:
                  <input
                    data-testid="edit-input-description"
                    value={ inputDescription }
                    name="inputDescription"
                    onChange={ this.handleChange }
                  />
                </label>
                <br />
                <label htmlFor="input-image">
                  Imagem:
                  <input
                    data-testid="edit-input-image"
                    value={ inputImage }
                    name="inputImage"
                    onChange={ this.handleChange }
                  />
                </label>
                <br />
                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ disabled }
                  onClick={ this.onClick }
                >
                  Editar perfil
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
