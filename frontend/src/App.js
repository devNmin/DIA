import { Switch, BrowserRouter as Router } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './utils/PrivateRoute';
import NonPrivateRoute from './utils/NonPrivateRoute';
import PrivateRoute from './utils/PrivateRoute';
import AccountRegisterPage from './pages/AccountRegisterPage';
import LoginPage from './pages/LoginPage';
import ScrollToTop from './hooks/ScrollToTop';
import MainPage from './pages/MainPage'
import NonLoginMainPage from './pages/NonLoginMainPage';
import Explainpage from './pages/Explainpage';
import TestTemp from './pages/TestTemp';
// import CanvasTestPage from './pages/CanvasTestPage';
import IpInsertPage from './pages/IpInsertPage';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* AuthProvider를 통해 안에 있는 페이지안에서 유저정보를 사용가능하다. 
            import React, {useContext} from 'react'
            import AuthContext from '../context/AuthContext'(위치)
            함수 안 let {authTokens} = useContext(AuthContext) => token 가져오기 authTokens.access 
            let {userInfo} = useContext(AuthContext) => 현재 유저정보 가져오기 
          */}
          <ScrollToTop>
            <Switch className="App">
              <NonPrivateRoute component={LoginPage} exact path="/"/>      
              <NonPrivateRoute component={AccountRegisterPage} exact path="/register"/>
              <PrivateRoute component={MainPage} exact path = '/main'></PrivateRoute>   
              <NonPrivateRoute component={NonLoginMainPage} exact path="/non"/>    
              <NonPrivateRoute component={Explainpage} exact path="/ex"/>        
              <NonPrivateRoute component={TestTemp} exact path="/canvasTest" />
              <PrivateRoute component={IpInsertPage} exact path="/ipInsert"/>
            </Switch>
          </ScrollToTop>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
