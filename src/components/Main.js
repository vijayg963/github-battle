import { Route, Router } from 'react-router-dom';
import Popular from './Popular';
import UserBattle from './UserBattel';
import BattleResult from './BattelResult';

function Main() {
  return (
    <Router>
      <Route path='/' exact component={Popular} />
      <Route path='/battle' exact>
        <UserBattle />
      </Route>
      <Route path='/battle/results' component={BattleResult} />
    </Router>
  );
}

export default Main;
