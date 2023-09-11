import "../Styles/Home.css";
import { Link,useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
export default function Home() {
  const navi=useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const customStyles = {
    position: "relative",
    top:"200px",
    textAlign: 'center',
  };
  const button={
    padding: "5px",
    color: "black",
    width: "130px",
    borderradius: "10px",
  }

return (
    <div class="background-img">
        <h1 style={customStyles}>WELCOME TO NOTES</h1>
        {cookies.access_token  ? (<p style={customStyles}><button style={button} onClick={()=>navi('/display')}>Display Notes</button></p>) : ( <p style={customStyles}><button style={button} onClick={()=>navi('/login')}>Login</button>
        <button style={button} onClick={()=>navi('/register')}>Register</button></p>)}
    </div>
  )
}
