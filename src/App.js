import React,{ useState } from 'react';
import Cookie from 'js-cookie';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom';

import Header from './components/header/header';
import Login from "./components/Login/Login";
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';

function App() {
  const history = useHistory();
  const cookieFlag = Cookie.get('flag');
  const [token, setToken] = useState(cookieFlag === 'true' ? true : false);
  const login = (f) => {
    setToken(f);
  }
const pushHistory = (path) => {
  history.push(path);
}
  if(token ) {
    return (
    <div className="App">
      <Header pushHistory={pushHistory}/>
     <Switch>
       <Route exact path="/" component={()=>{return <Home />}}/>
       <Route exact path="/profile" component={()=>{return <Profile login={login} pushHistory={pushHistory}/>}}/>
     </Switch>
    </div>
  );
  }else{
    return (
      <div className="App">
         <Login login={login}/>
      </div>
    )
  }
}

export default App;
