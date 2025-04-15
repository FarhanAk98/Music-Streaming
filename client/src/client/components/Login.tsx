import { SyntheticEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import blueImage from '../assets/blue.jpg'; 

const database = '/graphql'

type userType = {
  name: string
}

function Login(props:{setUser: React.Dispatch<React.SetStateAction<userType>>}) {
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    setError("")

    const query = `
      query Query($input: userInput) {
      userAuthentication(input: $input)
    }
    `;

    const input = {
      email: email,
      password: password
    }

    const response = await fetch(database, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query, variables:{input}})
    });

    const result = await response.json();

    if(result.data.userAuthentication){
      localStorage.setItem('user', JSON.stringify({
        name: result.data.userAuthentication
      }));
      props.setUser(JSON.parse(localStorage.getItem('user')!))
      navigate('/')
    }
    else{
      setError("Incorrect email or password")
    }

  }

  return (
    <div className="login-container" style={{ backgroundImage: `url(${blueImage})` }}>
      <div className="login-box">
        
        <p>{error}</p>
        <h2 className='login'>LOGIN HERE</h2>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            <label>Password</label>
            <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your password" required />
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate('/signup')}>
              Register
            </button>
          </form>
          {/* <p>Forgot the password? <a href="#">Click here</a></p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
