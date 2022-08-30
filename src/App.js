import React from 'react';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <Login />
        <Search />
        <Album />
        <Favorites />
        <Profile />
        <ProfileEdit />
      </div>
    );
  }
}

export default App;
