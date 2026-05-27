import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [questions, setQuestions] = useState([]);

  // Fetch Questions
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/questions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(response.data.questions);

      console.log(response.data.questions);
    } catch (error) {
      console.log(error);
    }
  };

  // Add / Update Question
  const handleAddQuestion = async () => {
    if (!question || !options || !correctAnswer) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      let response;

      if (editingId) {
        // UPDATE QUESTION
        response = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/questions/${editingId}`,
          {
            question,
            options: options
              .split(",")
              .map((option) => option.trim()),
            correctAnswer: correctAnswer.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // ADD QUESTION
        response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/questions`,
          {
            question,
            options: options
              .split(",")
              .map((option) => option.trim()),
            correctAnswer: correctAnswer.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert(response.data.message);

      console.log(response.data);

      // Refresh Questions
      fetchQuestions();

      // Clear Form
      setQuestion("");
      setOptions("");
      setCorrectAnswer("");

      // Exit Edit Mode
      setEditingId(null);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Delete Question
  const handleDeleteQuestion = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/questions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      // Refresh Questions
      fetchQuestions();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Edit Question
  const handleEditQuestion = (q) => {
    setQuestion(q.question);

    setOptions(q.options.join(","));

    setCorrectAnswer(q.correctAnswer);

    setEditingId(q._id);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Admin Panel</h1>

        <div className="input-group">
          <label>Question</label>

          <input
            type="text"
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Options (comma separated)</label>

          <input
            type="text"
            placeholder="Option1, Option2, Option3"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Correct Answer</label>

          <input
            type="text"
            placeholder="Enter correct answer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleAddQuestion}>
          {editingId ? "Update Question" : "Add Question"}
        </button>

        <h2 style={{ marginTop: "20px" }}>
          All Questions
        </h2>

        {questions.map((q) => (
          <div
            key={q._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>{q.question}</h3>

            <ul>
              {q.options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>

            <p>
              <strong>Correct Answer:</strong>{" "}
              {q.correctAnswer}
            </p>

            <button
              className="btn"
              onClick={() =>
                handleDeleteQuestion(q._id)
              }
            >
              Delete
            </button>

            <button
              className="btn"
              onClick={() => handleEditQuestion(q)}
              style={{ marginLeft: "10px" }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;