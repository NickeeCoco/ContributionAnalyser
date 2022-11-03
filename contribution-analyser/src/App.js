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

  // useEffect(() => {
  //   getGithubUsers()
  // }, [])

  async function getGithubData(owner, repo) {
    const result = await octokit.request("GET /repos/{owner}/{repo}", {
      owner,
      repo
    })
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

  function handleSubmit(e) {
    e.preventDefault()
    const {owner, repo} = formData
    getGithubData(owner, repo)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default App;
