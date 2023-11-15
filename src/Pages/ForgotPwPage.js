import React, { useState } from "react";

export function ForgotPwPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform any necessary validation on the email (you can add more validation here)

    // For demonstration purposes, log the email
    console.log("Reset Email:", email);
  };

  return (
    <>
      <h1>Forgot Password Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <button type="submit">Reset Password</button>
      </form>
    </>
  );
}
