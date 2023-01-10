import './App.css';

import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/index';
import SignUp from './Components/SignUp/index';
import Posts from './Components/Posts/Posts';
import CreatePost from './Components/Create/Create';
import UpdatePost from './Components/Update/Update';
import { AuthContext } from './context/AuthContext';
import { NotificationContext } from './context/Notification/NotificationContext';

function App() {
  const { currentUser } = useContext(AuthContext);
  const { notification, error, dispatchNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatchNotification({ type: "HIDE_NOTIFICATION" });
      }, 3000)
    }
  }, [notification]);

  const Authenticated = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  }

  return (
    <div className="App">
      {notification && <div className={`notification ${error ? 'notification-danger' : 'notification-success'}`}>{notification}</div>}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout"></Route>
          <Route exact path="/" element={<Posts />} />
          <Route path="/create" element={<Authenticated><CreatePost /></Authenticated>} />
          <Route path="/post/update/:docId" element={<Authenticated><UpdatePost /></Authenticated>} />
          {/* <Route path="/" element={<Navbar/>}> */}
          {/* </Route> */}
          {/* <Route exact path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} /> */}
          {/* <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <SignUp />} /> */}
          {/* <Route exact path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


// import './App.css';
// import { useContext, useState } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import Login from './Components/Login/index';
// import SignUp from './Components/SignUp/index';
// import Posts from './Components/Posts/Posts';
// import CreatePost from './Components/Create/Create';
// import UpdatePost from './Components/Update/Update';
// import { AuthContext } from './context/AuthContext';

// function App() {
//   const { currentUser } = useContext(AuthContext);

//   // const Authenticated = ({ children }) => {
//   //   return currentUser ? <>{children}</> : <Navigate to="/login" />;
//   // }

//   const PrivateRoute = ({isAuthenticated, ...props}) => {
//     return isAuthenticated ? <>
//       <Navbar />
//       <Outlet />
//     </> : <Navigate to="/login" />
//   }

//   const [isAuthenticated, setIsUserAuthenticated] = useState(false);
//   console.log(isAuthenticated)

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route exact path="/login" element={<Login setIsUserAuthenticated={setIsUserAuthenticated}/>} />
//           <Route path="/signup" element={<SignUp />} />
//           {/* <Route path="/" element={<Navbar />}> */}

//             <Route exact path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
//               <Route path='/' element={<Posts />} />
//             </Route>
//             <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
//               <Route path='/create' element={<CreatePost />} />
//             </Route>
//             <Route path='/post/update/:docId' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
//               <Route path='/post/update/:docId' element={<UpdatePost />} />
//             </Route>
//             <Route path="/logout"></Route>
//           {/* </Route> */}
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
