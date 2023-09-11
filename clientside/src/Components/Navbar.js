import "./Navbar.css";
import {Link, useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

function Navbar() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navi = useNavigate();
    const logout=(e)=>{
        e.preventDefault();
        setCookies("access_token", "");
        localStorage.clear();
        navi("/");
    }

  return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
           <Link class="navbar-brand" to="/">My Not<span class="text-danger">es</span></Link>
             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
             </button>
           <div class="collapse navbar-collapse" id="navbarNav">
             <ul class="navbar-nav" style={{ marginLeft: 'auto' }}>
               {!cookies.access_token ?  <li class="nav-item">
                 <Link to="/login" class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show">Login</Link>
               </li> :  <li class="nav-item">
                 <Link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" onClick={logout}>Logout</Link>
               </li> }
              </ul>
           </div>
        </div>
      </nav>
  )
}

export default Navbar;