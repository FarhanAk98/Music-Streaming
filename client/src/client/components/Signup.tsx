import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import blueImage from '../assets/blue.jpg'; 

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();

    const input = {
      name: fname + " " + lname,
      email: email,
      password: password
    };

    const query = `
      mutation Mutation($input: user) {
      createUser(input: $input)
    }`;

    await fetch("/graphql", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables: { input } })
    });

    navigate("/login");
  };

  return (
    <div className="signup-container">
     
      
      <div className="signup-box">
        <h2 className="register">REGISTER HERE</h2>
        <div className="signup-form">
          <form onSubmit={handleRegister}>
            <label>First Name</label>
            <input type="text" onChange={(e) => setFname(e.target.value)} placeholder="Enter your first name" required />
            <label>Last Name</label>
            <input type="text" onChange={(e) => setLname(e.target.value)} placeholder="Enter your last name" required />
            <label>Email</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            <label>Password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
