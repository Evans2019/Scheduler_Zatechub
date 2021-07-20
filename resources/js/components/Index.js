import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom'
import ReactDOM from 'react-dom';
import CreateMeeting from './meeting/Index';
import 'bootstrap/dist/css/bootstrap.min.css';

function MeetingApp() {
    return (
       <Router>
        <div>
          <Switch>
            <Route exact path='/' component={CreateMeeting} />     
          </Switch>
        </div>
      </Router>
    );
};

export default MeetingApp;

if (document.getElementById('root')) {
    ReactDOM.render(<MeetingApp />, document.getElementById('root'));
};
