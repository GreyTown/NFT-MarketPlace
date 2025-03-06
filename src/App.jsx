import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]); // To store the API data
  const [loading, setLoading] = useState(true); // To show a loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch data when the component mounts
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data); // Store the data in state
        setLoading(false); // Done loading
      } catch (err) {
        setError(err.message); // Catch any errors
        setLoading(false);
      }
    }
    fetchUsers(); // Call the function
  }, []); // Empty dependency array = run once on mount

  // Render based on state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>User Name: {user.name}, <br/> Email: {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;