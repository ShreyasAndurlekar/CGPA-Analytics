import { useState } from "react";
import Navbar from "./Navbar";

const Origin = () => {
  const [currentDiv, setCurrentDiv] = useState("");
  const [fyDiv, setFyDiv] = useState("");
  const [students, setStudents] = useState([]);

  const dummyStudents = [
    { idx: 1, name: "John Doe", batch: "2024" },
    { idx: 2, name: "Jane Smith", batch: "2024" },
    { idx: 3, name: "Alice Johnson", batch: "2024" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStudents(dummyStudents);
  };

  // Dropdown options for divisions
  const divisions = ["A", "B", "C", "D", "E"];

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Find out who knew each other since FY</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Current Div:</label>
          <select
            value={currentDiv}
            onChange={(e) => setCurrentDiv(e.target.value)}
            style={styles.select}
          >
          
            {divisions.map((div, index) => (
              <option key={index} value={div}>
                {div}
              </option>
            ))}
          </select>

          <label style={styles.label}>FY Div:</label>
          <select
            value={fyDiv}
            onChange={(e) => setFyDiv(e.target.value)}
            style={styles.select}
          >
           
            {divisions.map((div, index) => (
              <option key={index} value={div}>
                {div}
              </option>
            ))}
          </select>

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Submit</button>
          </div>
        </form>

        {students.length > 0 && (
          <div style={styles.result}>
            <h2>Students who were in first-year division {fyDiv} and are now part of {currentDiv} division:</h2>
            <ul style={styles.list}>
              {students.map((student) => (
                <li key={student.idx} style={styles.listItem}>
                  {student.idx}. {student.name} {student.batch}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { 
    textAlign: "center", 
    padding: "20px",
    backgroundColor: "black", // Set background to black
    color: "white", // Set default text color to white
    minHeight: "100vh" // Ensure the background covers the entire page
  },
  heading: { 
    margin: "80px 0", 
    fontFamily: "'Bahnschrift', sans-serif",
    color: "white" // Ensure heading text is white
  },
  form: { 
    display: "inline-block", 
    textAlign: "left" 
  },
  label: { 
    display: "block", 
    marginBottom: "5px",
    color: "white", // Ensure label text is white
    fontFamily: "JetBrains Mono, monospace"
  },
  select: { 
    display: "block", 
    marginBottom: "10px", 
    padding: "8px", 
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "black", // Set dropdown background to black
    color: "white", // Set dropdown text color to white
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "16px"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center", // Center the button horizontally
    marginTop: "20px"
  },
  button: { 
    padding: "10px 15px", 
    border: "solid 1px white",
    background: "black", 
    color: "white", 
    cursor: "pointer", 
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "16px"
  },
  result: { 
    marginTop: "30px",
    color: "white" // Ensure result text is white
  },
  list: { 
    listStyleType: "none", 
    padding: 0 
  },
  listItem: {
    fontFamily: "JetBrains Mono, monospace",
    color: "white" // Ensure list items are white
  }
};

export default Origin;