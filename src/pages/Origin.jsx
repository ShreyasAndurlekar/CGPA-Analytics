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

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h1 style={styles.heading}>Find out who knew each other since FY</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Current Div:</label>
          <input 
            type="text" 
            value={currentDiv} 
            onChange={(e) => setCurrentDiv(e.target.value)} 
            style={styles.input} 
          />

          <label style={styles.label}>FY Div:</label>
          <input 
            type="text" 
            value={fyDiv} 
            onChange={(e) => setFyDiv(e.target.value)} 
            style={styles.input} 
          />

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Submit</button>
          </div>
        </form>

        {students.length > 0 && (
          <div style={styles.result}>
            <h2>Students who were in first-year division {fyDiv} and are now part of {currentDiv} division:</h2>
            <ul style={styles.list}>
              {students.map((student) => (
                <li key={student.idx}>
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
    padding: "20px" 
  },
  heading: { 
    margin: "80px 0", 
    fontFamily: "'Bahnschrift', sans-serif" 
  },
  form: { 
    display: "inline-block", 
    textAlign: "left" 
  },
  label: { 
    display: "block", 
    marginBottom: "5px" 
  },
  input: { 
    display: "block", 
    marginBottom: "10px", 
    padding: "8px", 
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center", // This will center the button horizontally
    marginTop: "20px"
  },
  button: { 
    padding: "10px 15px", 
    border: "solid 1px black",
    background: "black", 
    color: "white", 
    cursor: "pointer", 
    borderRadius: "5px", 
    fontFamily: "JetBrains Mono, monospace",
    fontSize: "16px"
  },
  result: { 
    marginTop: "30px" 
  },
  list: { 
    listStyleType: "none", 
    padding: 0 
  }
};

export default Origin;