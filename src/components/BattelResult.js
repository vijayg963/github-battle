import React, { Component } from 'react';
import queryString from 'query-string';
import Loader from './Loader';
export default class BattleResult extends Component {
  constructor(props) {
    super();
    this.state = {
      firstPlayer: null,
      secondPlayer: null,
    };
  }
  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(
      this.props.location.search
    );
    this.userProfiles([playerOne, playerTwo]).then((profiles) => {
      this.setState({
        firstPlayer: profiles[0],
        secondPlayer: profiles[1],
      });
    });
  }
  // to get a single user profile
  userProfile = (username) => {
    return fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };

  // // to get multiple users profiles
  userProfiles = async (userData) => {
    let bothUsers = userData.map((username) => this.userProfile(username));
    let users = await Promise.all(bothUsers);
    return users;
  };

  // to calculate  the user score
  getScore = (user) => {
    let followers = user.followers;
    let publicRepos = user.public_repos;
    const score = followers + publicRepos;
    return score;
  };
  render() {
    if (!this.state.firstPlayer && !this.state.secondPlayer) {
      return <Loader />;
    } else {
      let firstUserScore = this.getScore(this.state.firstPlayer);
      let secondPlayerScore = this.getScore(this.state.secondPlayer);
      return (
        <>
          <div className='container result-container'>
            <UserProfileGenerator
              player={this.state.firstPlayer}
              playerScore={firstUserScore}
              playerTwoScore={secondPlayerScore}
            />

            <UserProfileGenerator
              player={this.state.secondPlayer}
              playerScore={secondPlayerScore}
              playerTwoScore={firstUserScore}
            />
          </div>
        </>
      );
    }
  }
}
function UserProfileGenerator(props) {
  let { player, playerScore, playerTwoScore } = props;
  return (
    <>
      <div className='result-card'>
        <div className='col-center'>
          <h4 className='winner'>
            {playerScore > playerTwoScore ? 'Winner' : 'Loser'}
          </h4>
          <img src={player.avatar_url} alt='players profile'></img>
          <h6> Score : {playerScore}</h6>
          <h2 className='username'>{player.login}</h2>
        </div>
        <p>
          <i className='fas fa-user user'>{player.name}</i>
        </p>
        <p>
          <i className='fas fa-users followers'></i>
          {player.followers}
        </p>
        <p>
          <i className='fas fa-users following'></i>
          {player.following}
        </p>
        <p>
          <i className='fas fa-code-branch ligt-black'></i>
          {player.public_repos}
        </p>
      </div>
    </>
  );
}
