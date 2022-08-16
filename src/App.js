import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const[users, setUsers] = React.useState([]);
  const[isLoading, setLoading] = React.useState(true)
  const[search, setSearch] = React.useState('')

  React.useEffect(() => {
    fetch('https://reqres.in/api/users').then(response => response.json())
    .then(userData => setUsers(userData.data)).catch(err => console.log(err)).finally(() => setLoading(false));
  }, []);

  const handlechange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <div className="App">
      <Users items={users} isLoading={isLoading} search={search} handlechange={handlechange}/>
      {/* <Success /> */}
    </div>
  );
}

export default App;
