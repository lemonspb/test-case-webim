import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.css'; 
import PageLogin from './Pages/PageLogin'
import PageMain from './Pages/PageMain'
import {BrowserRouter as Router,  Route} from 'react-router-dom';
ReactDOM.render(
  <React.StrictMode>
    <Router>  
{window.localStorage.token  && <Route  path='/main'  exact render={ ()=> <PageMain/>}/>} 

 <Route  path='/login'  exact render={ ()=> <PageLogin/>}/>

</Router>  
  </React.StrictMode>,
  document.getElementById('root')
);

