import { useState, useEffect } from "react"
import './App.css';
import { Octokit } from "octokit"

function App() {
  const [formData, setFormData] = useState({
    owner: "",
    repo: ""
  })

  const [repoData, setRepoData] = useState({})
  const [contributors, setContributors] = useState([])

  const [isDataDisplayed, setIsDataDisplayed] = useState(false)
  const [hasError, setHasError] = useState(false)

  const {name, description, language, license, stargazers_count, url} = repoData

  const contributorElements = contributors.map(contributor => {
    return (
      <div className="contributor" key={contributor.id}>
        <img src={contributor.avatar_url} />
        <p>Login: {contributor.login}</p>
        <p>Number of contributions: {contributor.contributions}</p>
      </div>
    )  
  })

  const octokit = new Octokit({
    auth: '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'
  })

  useEffect(() => {
    console.log(contributors)
  }, [contributors])

  async function getGithubData(owner, repo) {
    try {
      const result = await octokit.request("GET /repos/{owner}/{repo}", {
        owner,
        repo
      })

      const {name, description, language, license, stargazers_count, url} = result.data

      setRepoData({name, description, language, license, stargazers_count, url})
      setIsDataDisplayed(true)
      setHasError(false)
    } catch (err) {
      setHasError(true)
      setIsDataDisplayed(false)
    }
  }

  async function getTopContributors() {
    const contributors = await octokit.request("GET /repos/{owner}/{repo}/contributors", {
      owner: "charliermarsh",
      repo: "ruff"
    })

    setContributors(contributors.data.slice(0, 30)) 
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
    getTopContributors()
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
            <p><span className="bold">License:</span> {license ? <a href={license.url}>{license.name}</a> : "No license"}</p>
            <p><span className="bold">Star count:</span> {stargazers_count}</p>
            <p><span className="bold">URL:</span> <a href={url}>{url}</a></p>

            <div>
              <h3>Contributors</h3>
              {contributorElements}
            </div>
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
