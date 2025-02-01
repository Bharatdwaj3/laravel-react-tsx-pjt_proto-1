import {Link,Navigate,Outlet} from 'react-router-dom'
import {useStateContext} from '../context/ContextProvider.tsx';
import axiosClient from '../axios-client.ts'
import {useEffect} from 'react'



const DefaultLayout = () => {

  const {user,token,setUser,setToken, notification}=useStateContext();
  if(!token){
    return <Navigate to="/login"/>
  }
  const onLogout = ev =>{
    ev.preventDefault()
    axiosClient.post('/logout')
    .then(()=>{
      setUser({})
      setToken(null)
    })
  }

  useEffect(()=>{
    axiosClient.get('/users')
    .then(({data})=>{
      setUser(data)
    })
},[])

  return (
  <>
    <div id='defaultLayout'>
      <aside>
        <Link to="/dashboard">Dashboatrd</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name} &nbsp;&nbsp;
            <a onClick={onLogout} className='btn-logout' href="#">Logout</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification && <div className='notification'>{notification}</div>}
      </div>
    </div>
  </>
  )
}

export default DefaultLayout;
