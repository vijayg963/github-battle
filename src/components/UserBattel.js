import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function UserBattle() {
  let [users, setgithubUsername] = useState({ firstUser: '', secondUser: '' });
  let [usersData, setUserData] = useState({
    firstUserData: null,
    secondUserData: null,
  });
  let [errors, setErrors] = useState({ firstUserErr: '', secondUserErr: '' });

  // function to find  github users
  function findGithubUser(event) {
    event.preventDefault();
    let name = event.target.name;
    let user = users[name];
    fetch(`https://api.github.com/users/${user}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message === 'Not Found') {
          return setErrors({
            ...errors,
            [name + 'Err']: 'User is not found invalid username',
          });
        }
        setUserData({ ...usersData, [name + 'Data']: data });
        setErrors({ ...errors, [name + 'Err']: '' });
      });
  }

  // show battle button once we have both users data
  function showbattleButton() {
    if (usersData.firstUserData && usersData.secondUserData) {
      return (
        <div className='flex-row-center w-100 battle-button-container'>
          <button className='battle-now' id='white'>
            <Link
              to={{
                pathname: '/battle/results',
                search: `?playerOne=${users.firstUser}&playerTwo=${users.secondUser}`,
              }}
            >
              Battle
            </Link>
          </button>
        </div>
      );
    }
  }

  // function  deleteUserData
  function deleteUserData(userName) {
    setUserData({ ...usersData, [userName]: null });
  }

  return (
    <div className='container'>
      <InstructioforUsers />
      <div className='usernameInput-container'>
        <h2>Players</h2>
        <div className='flex-row'>
          <form className='flex-46'>
            <h3>Player one</h3>
            <div className='form-group'>
              {usersData.firstUserData === null ? (
                <>
                  <input
                    type='text'
                    name='firstUser'
                    placeholder='github username'
                    onChange={(e) => {
                      setgithubUsername({
                        ...users,
                        firstUser: e.target.value,
                      });
                    }}
                    value={users.firstUser}
                  />
                  <button
                    type='submit'
                    name='firstUser'
                    onClick={(e) => {
                      findGithubUser(e);
                    }}
                  >
                    submit
                  </button>
                </>
              ) : (
                <UserProfilePreview
                  userProfile={usersData.firstUserData}
                  deleteUserData={deleteUserData}
                  userName='firstUserData'
                />
              )}
            </div>
            <p className='error'>{errors.firstUserErr}</p>
          </form>

          <form className='flex-46'>
            <h3>Player two</h3>
            <div className='form-group'>
              {usersData.secondUserData === null ? (
                <>
                  <input
                    type='text'
                    name='secondUser'
                    placeholder='github username'
                    onChange={(e) => {
                      setgithubUsername({
                        ...users,
                        secondUser: e.target.value,
                      });
                    }}
                    value={users.secondUser}
                  />
                  <button
                    type='submit'
                    name='secondUser'
                    onClick={(e) => {
                      findGithubUser(e);
                    }}
                  >
                    submit
                  </button>
                </>
              ) : (
                <UserProfilePreview
                  userProfile={usersData.secondUserData}
                  deleteUserData={deleteUserData}
                  userName='secondUserData'
                />
              )}
            </div>
            <p className='error'>{errors.secondUserErr}</p>
          </form>
        </div>
      </div>
      {showbattleButton()}
    </div>
  );
}

// instruction for  the user
function InstructioforUsers() {
  return (
    <>
      <div className='instruction-container'>
        <h2 className='heading'>Instructions</h2>
        <div className='wrapper'>
          <div className='instruction-card'>
            <h2>Enter two github user</h2>
            <div className='instruction-icon center'>
              <i className='fas fa-user-friends users'></i>
            </div>
          </div>

          <div className='instruction-card'>
            <h2>Battle</h2>
            <div className='instruction-icon center'>
              <i className='fas fa-fighter-jet battle'></i>
            </div>
          </div>

          <div className='instruction-card'>
            <h2>Enter two github user</h2>
            <div className='instruction-icon center'>
              <i className='fas fa-trophy winner'></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// to show user profile once we have the userData
function UserProfilePreview(props) {
  let { userProfile, deleteUserData, userName } = props;
  return (
    <div className='flex-row userprofile-container'>
      <div className='flex-row'>
        <img src={userProfile.avatar_url} alt='user github profile'></img>
        <h4>{userProfile.login}</h4>
      </div>
      <button
        onClick={() => {
          deleteUserData(userName);
        }}
      >
        {/* <i class="fa-solid fa-delete-left"></i> */}
        delete
      </button>
    </div>
  );
}
