import { useState } from "react"
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
        <div className="contributor--details">
          <p><span className="label">Login:</span> {contributor.login}</p>
          <p><span className="label">Contributions:</span> {contributor.contributions}</p>
        </div>
      </div>
    )  
  })

  const octokit = new Octokit({
    auth: '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'
  })

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

  async function getTopContributors(owner, repo) {
    const contributors = await octokit.request("GET /repos/{owner}/{repo}/contributors", {
      owner,
      repo
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
    getTopContributors(owner, repo)
  }

  return (
    <div className="app">
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

      <hr/>

      {
        isDataDisplayed && 
          <div className="data">
            <div className="data--repo">
              <h3>Repo details</h3>
              <p><span className="label">Repo name:</span> {name}</p>
              <p><span className="label">Description:</span> {description ? description : "No description"}</p>
              <p><span className="label">Language:</span> {language}</p>
              <p><span className="label">License:</span> {license ? <a href={license.url}>{license.name}</a> : "No license"}</p>
              <p><span className="label">Star count:</span> {stargazers_count}</p>
              <p><span className="label">URL:</span> <a href={url}>{url}</a></p>
            </div>
            

            <div className="data--contributors">
              <h3>Top contributors</h3>
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
