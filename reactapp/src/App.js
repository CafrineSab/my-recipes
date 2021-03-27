import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Homepage from './screens/Homepage'
import MyAccount from './screens/MyAccount'
import Logpage from './screens/Logpage'

import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import userInfo from './reducer/userInfoReducer'
import connexion from './reducer/connexionReducer'
import recipe from './reducer/recipeReducer'

const store = createStore(combineReducers({userInfo, connexion, recipe}))


function App() {
  return (
  <Provider store={store}>
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
              <Homepage />
          </Route>
          <Route path="/logpage">
              <Logpage />
          </Route>
          <Route path="/myaccount">
            <MyAccount />
          </Route>
        </Switch>
    </Router>
  </Provider>
  );
}


export default App;
