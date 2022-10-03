import react, { useEffect, useState } from 'react'
import './Scss/App.scss'
import { useQuery } from 'react-query';
import { initReq, userExists } from './requests';
import { Routes, Route } from 'react-router-dom';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
import Register from './Containers/Register/Register';
import Login from './Containers/Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  useEffect(() => { initReq(); }, [isLoggedIn, user]);
  const { data, status, refetch } = useQuery('userExists', userExists);

  if(status === 'loading') return <div id='appWrapper'><LoadingScreen text='Connecting to server' /></div>;
  else if(status === 'error') return <div id='appWrapper'><LoadingScreen text={`Error occurred, please try reloading.`} /></div>;
  else if(!data.exists) return <div id='appWrapper'><Register refetch={refetch} /></div>;
  else if(data.exists && !isLoggedIn) return <div id='appWrapper'><Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} /></div>;

  return (
    <div id='appWrapper'>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/projects' element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
