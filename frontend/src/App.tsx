import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import VideoList from './components/VideoList';
import VideoShare from './components/VideoShare';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/videos" component={VideoList} />
        <Route exact path="/share" component={VideoShare} />
      </Switch>
    </Router>
  );
};

export default App;