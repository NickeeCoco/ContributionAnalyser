import { useState, useEffect } from "react"
import './App.css';
import { Octokit } from "octokit"

function App() {
  const [formData, setFormData] = useState({
    owner: "",
    repo: ""
  })

  const [repoData, setRepoData] = useState({})
  const [isDataDisplayed, setIsDataDisplayed] = useState(false)

  const octokit = new Octokit({
    auth: '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'
  })

  useEffect(() => {
    console.log(repoData)
  }, [repoData])

  async function getGithubData(owner, repo) {
    try {
      const result = await octokit.request("GET /repos/{owner}/{repo}", {
        owner,
        repo
      })
      setRepoData(result.data)
      setIsDataDisplayed(true)
    } catch (err) {
      console.log(err)
      setIsDataDisplayed(false)
    }
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
        <br/>
        <input type = "text"
          onChange = {handleChange}
          name = "repo"
          value = {formData.repo}
        />
        <br/>
        <button>Submit</button>
      </form>

      {
        isDataDisplayed && 
          <p>{repoData.name}, {repoData.description ? repoData.description : "No description"}, {repoData.language}, {repoData.license ? repoData.license : "No license"}, {repoData.stargazers_count}, {repoData.url}</p>
      }
    </div>
  );
}

export default App;
