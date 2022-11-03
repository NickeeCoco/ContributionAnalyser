import { useState, useEffect } from "react"
import './App.css';
import { Octokit } from "octokit"

function App() {
  const [formData, setFormData] = useState({
    owner: "",
    repo: ""
  })

  const octokit = new Octokit({
    auth: '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'
  })

  useEffect(() => {
    getGithubUsers()
  }, [])

  async function getGithubUsers() {
    const result = await octokit.request("GET /users")
    console.log(result.data)
  }

  function handleChange(e) {
    const {name, value} = e.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  return (
    <div className="App">
      <form>
        <input type = "text"
          onChange = {handleChange}
          name = "owner"
          value = {formData.owner}
        /> 
        <input type = "text"
          onChange = {handleChange}
          name = "repo"
          value = {formData.repo}
        />
        <button>Submit</button>
      </form> 
      <p>Owner: {formData.owner}</p>
      <p>Repo: {formData.repo}</p>
    </div>
  );
}

export default App;
