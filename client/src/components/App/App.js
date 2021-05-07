import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import EnterRoom from '../EnterRoom';
import ChatRoom from '../ChatRoom';
import AddNameForm from '../AddNameForm';

import './App.css';

function App () {
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') || undefined
  );

  const onNameAdded = name => {
    if (!name) {
      localStorage.removeItem('userName')
    } else {
      localStorage.setItem('userName', name)
    }

    setUserName(name);
  };

  return (
    <main>
      {!userName ? (
        <AddNameForm onNameAdded={onNameAdded} />
      ) : (
        <Router>
          <Switch>
            <Route exact path='/' component={EnterRoom} />
            <Route
              exact
              path='/:roomId'
              render={props => (
                <ChatRoom
                  {...props}
                  userName={userName}
                  onNameAdded={onNameAdded}
                />
              )}
            />
          </Switch>
        </Router>
      )}
    </main>
  )
};

export default App;
