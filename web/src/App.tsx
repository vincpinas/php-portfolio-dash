import react, { useEffect, useState } from 'react'
import './Scss/App.scss'
import { useQuery } from 'react-query';
import { initReq, userExists } from './requests';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoadingScreen from './Components/LoadingScreen/LoadingScreen';
import Navigation from './Components/Navigation/Navigation';
import Register from './Containers/Register/Register';
import Login from './Containers/Login/Login';
import Projects from './Containers/Projects/Projects';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  useEffect(() => { initReq(); }, [isLoggedIn, user]);
  const { data, status, refetch } = useQuery('userExists', userExists, {staleTime: Infinity});
  const navigate = useNavigate();

  useEffect(() => {
    if(data) {
      if(!data.exists) navigate('/register');
      else if(data.exists && !isLoggedIn) navigate('/login');
      else navigate('/projects');
    }
  }, [data, user, isLoggedIn])

  if(status === 'loading') return <div id='appWrapper'><LoadingScreen text='Connecting to server' /></div>;
  else if(status === 'error') return <div id='appWrapper'><LoadingScreen text={`Error occurred, please try reloading.`} /></div>;

  return (
    <div id='appWrapper'>
      { data.exists && isLoggedIn && <Navigation /> }
      <Routes>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
        <Route path='/register' element={<Register refetch={refetch} />} />
        <Route path='/user' element={<></>} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </div>
  );
}

export default App;
