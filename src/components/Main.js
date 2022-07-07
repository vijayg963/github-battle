import { Route, Switch } from 'react-router-dom';
import Popular from './Popular';
import UserBattle from './UserBattel';
import BattleResult from './BattelResult';

function Main() {
  return (
    <Switch>
      <Route path='/' exact component={Popular} />
      <Route path='/battle' exact>
        <UserBattle />
      </Route>
      <Route path='/battle/results' component={BattleResult} />
    </Switch>
  );
}

export default Main;
