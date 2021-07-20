import React from 'react'
import { Route, BrowserRouter, Switch} from 'react-router-dom' 
import Login from './pages/Login'
import Home from './pages/Home'

const  App: React.FC = () => {

  return (

      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        
      </Switch>
      </BrowserRouter>

  )
} 
export default App