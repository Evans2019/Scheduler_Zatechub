import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom'
import ReactDOM from 'react-dom';
import CreateMeeting from './meeting/Index';
import MeetingDetails from './meeting/Details';
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';

function MeetingApp() {
    return (
       <Router>
        <div>
            <Container>
                <Switch>
                    <Route exact path='/' component={CreateMeeting} />    
                    <Route path='/meeting/:id' component={MeetingDetails}/> 
                </Switch>
            </Container>
        </div>
      </Router>
    );
};

export default MeetingApp;

if (document.getElementById('root')) {
    ReactDOM.render(<MeetingApp />, document.getElementById('root'));
};
