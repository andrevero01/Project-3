import React, { useState } from 'react';
import adminService from '../../services/admin.service';

function AdminPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object representing the new user data
    const newUser = {
      email,
      password,
      firstName,
      lastName,
    };

    // Send a request to the server to create a new user
    adminService
      .createUser(newUser)
      .then((response) => {
        // User created successfully
        // Do something, such as displaying a success message or redirecting
      })
      .catch((error) => {
        // Error creating user
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Create a fellow user or comrade</h2>

      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />

        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />

        <label>First Name:</label>
        <input type="text" value={firstName} onChange={handleFirstNameChange} />

        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={handleLastNameChange} />

        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default AdminPage;