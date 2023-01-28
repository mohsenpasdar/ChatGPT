import React, { useEffect, useState } from "react";

import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  // useEffect(() => {
  //   console.log(message);
  //   console.log(response);
  // })

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h2>Steve Jobs ChatApp</h2>
        <textarea
          placeholder="Ask Steve anything"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <b>Steve: </b>
          {response}
        </div>
      )}
    </div>
  );
};

export default App;
