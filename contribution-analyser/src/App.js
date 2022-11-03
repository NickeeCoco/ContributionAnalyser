import { useEffect } from "react"
import logo from './logo.svg';
import './App.css';
import { Octokit } from "octokit"

function App() {
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
