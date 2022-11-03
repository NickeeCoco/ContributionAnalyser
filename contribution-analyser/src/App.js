import { useState } from "react"
import Form from "./components/Form"
import Contributor from "./components/Contributor"
import { getContributorDetails } from "./fetchData";
import './App.css';

function App() {

  const [repoData, setRepoData] = useState({})
  const [contributors, setContributors] = useState([])

  const [isDataDisplayed, setIsDataDisplayed] = useState(false)
  const [hasError, setHasError] = useState(false)

  const {name, description, language, license, stargazers_count, html_url} = repoData

  const contributorElements = contributors.map(contributor => {

    return <Contributor 
              contributor={contributor}
              setHasError={setHasError}
              setIsDataDisplayed={setIsDataDisplayed}
            />  
  })

  return (
    <div className="app">
      <Form 
        setRepoData={setRepoData} 
        setContributors={setContributors} 
        setHasError={setHasError}
        setIsDataDisplayed={setIsDataDisplayed}
      />

      <hr/>

      {
        isDataDisplayed && 
          <div className="data">
            <div className="data--repo">
              <h3>Repo details</h3>
              <p><span className="label">Repo name:</span> {name}</p>
              <p><span className="label">Description:</span> {description ? description : "No description"}</p>
              <p><span className="label">Language:</span> {language}</p>
              <p><span className="label">License:</span> {license ? license.name : "No license"}</p>
              <p><span className="label">Star count:</span> {stargazers_count}</p>
              <p><span className="label">URL:</span> <a href={html_url} target="_blank">{html_url}</a></p>
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
