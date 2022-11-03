import {useState} from "react"
import {getGithubData, getTopContributors} from "../fetchData"

function Form(props) {
    const {setRepoData, setContributors, setHasError, setIsDataDisplayed} = props
    
    const [formData, setFormData] = useState({
        owner: "",
        repo: "",
        nbContributors: 30
    })

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const { owner, repo, nbContributors } = formData
        getGithubData(owner, repo, setRepoData, setHasError, setIsDataDisplayed)
        getTopContributors(owner, repo, nbContributors, setContributors, setHasError, setIsDataDisplayed)
    }

    return (
        <form onSubmit={handleSubmit} >
            <label className="label" htmlFor="owner">Owner: </label>
            <input
                id="owner"
                type="text"
                onChange={handleChange}
                name="owner"
                value={formData.owner}
            />
            <br />
            <label className="label" htmlFor="repo">Repo: </label>
            <input
                id="repo"
                type="text"
                onChange={handleChange}
                name="repo"
                value={formData.repo}
            />
            <br/>
            <span>Display 
                <input
                    id="nbContributors"
                    type="number"
                    onChange={handleChange}
                    name="nbContributors"
                    value={formData.nbContributors}
                    min={30}
                    max={200}
                />
                contributors.
            </span>
            <br />
            <button>Submit</button>
        </form>
    )
}

export default Form