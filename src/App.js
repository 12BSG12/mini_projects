import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const[users, setUsers] = React.useState([]);
  const[isLoading, setLoading] = React.useState(true)
  const[search, setSearch] = React.useState('')
  const[invites, setInvites] = React.useState([]);
  const[success, setSuccess] = React.useState(false)
  React.useEffect(() => {
    fetch('https://reqres.in/api/users').then(response => response.json())
    .then(userData => setUsers(userData.data)).catch(err => console.log(err)).finally(() => setLoading(false));
  }, []);

  const handlechange = (e) => {
    setSearch(e.target.value)
  }

  const onClickInvite = (invitedUser) => {
    if(invites.includes(invitedUser)){
      setInvites(prev => prev.filter(_invitedUser => _invitedUser !== invitedUser))
    } else{
      setInvites(prev => [...prev, invitedUser])
    }
  }

  const onClickSuccess = () => {
    setSuccess(true);
  }

  return (
    <div className="App">
      { success 
        ? <Success count = {invites.length}/>
        : <Users items={users} isLoading={isLoading} search={search} handlechange={handlechange} onClickInvite={onClickInvite} invites={invites} onClickSuccess={onClickSuccess}/>
      }
    </div>
  );
}

export default App;
