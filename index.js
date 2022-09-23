import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';

import ApiService from './Api.service.js';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    // Test Get DATA
    try {
      setLoading(true);
      const usersData = await ApiService.httpGet('/users');
      setUsers(usersData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testApi();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <ul>
        {users.map((user) => {
          return <li key={user.id}>Name: {user.name}</li>;
        })}
      </ul>
    </div>
  );
}

render(<App />, document.getElementById('root'));
