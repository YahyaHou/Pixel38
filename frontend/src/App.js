import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import Dashboard from './Dashboard/Dashboard';
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
    
    <BrowserRouter>

    <Routes>

      {/** Accessed Routes */}

      <Route path='/' element = {<Home/>}/>

      <Route path='/login' element = {<Login/>}/>
      
      <Route path='/register' element = {<Register/>}/>
      
      <Route path="*" element = {<NotFound/>}/>
      
      {/** Protected Routes */}
      <Route element={<ProtectedRoutes />}>
       {/** Only Authenticated users can access this route  */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      
      </Route>
    
    </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
