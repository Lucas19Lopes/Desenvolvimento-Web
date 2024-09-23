import React, { useState } from 'react';
import { auth } from '../keys/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import "../css/Signup.css"

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      navigate('/schedule');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
      <button onClick={handleSignup}>Registrar</button>
    </div>
  );
}

export default Signup;
