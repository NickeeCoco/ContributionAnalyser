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
  const [hasError, setHasError] = useState(false)

  const {name, description, language, license, stargazers_count, url} = repoData

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
      setHasError(false)
    } catch (err) {
      setHasError(true)
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
          <div>
            <p><span className="bold">Repo name:</span> {name}</p>
            <p><span className="bold">Description:</span> {description ? description : "No description"}</p>
            <p><span className="bold">Language:</span> {language}</p>
            <p><span className="bold">License:</span> {license ? license : "No license"}</p>
            <p><span className="bold">Star count:</span> {stargazers_count}</p>
            <p><span className="bold">URL:</span> <a href={url}>{url}</a></p>
          </div>
      }

      {
        hasError && 
          <p>There was an error fetching the data. Please try another request.</p>
      }
    </div>
  );
}

export default App;
