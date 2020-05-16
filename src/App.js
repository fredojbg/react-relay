import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';

import { Environment } from './relay';

const App = ({ query }) => {
  const listItems = query.allUsers.map(item => (
    <li key={item.id}>{item.name}</li>
  ));
  return (
    <div className='App'>
      <header className='app-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>me: ${listItems}</span>
        <a
          className='app-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn Relay
        </a>
      </header>
    </div>
  );
};

const AppQR = () => {
  return (
    <QueryRenderer
      environment={Environment}
      query={graphql`
        query AppQuery {
          allUsers {
            id
            name
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        console.log('qr: ', error, props);
        if (error) {
          return <span>{error.toString()}</span>;
        }

        if (props) {
          return <App query={props} />;
        }

        return <span>loading</span>;
      }}
    />
  );
};

export default AppQR;
