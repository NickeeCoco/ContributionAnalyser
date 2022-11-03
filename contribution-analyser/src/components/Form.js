import {useState} from "react"
import {getGithubData, getTopContributors} from "../fetchData"

function Form(props) {
    const {setRepoData, setContributors, setHasError, setIsDataDisplayed} = props
    
    const [formData, setFormData] = useState({
        owner: "",
        repo: ""
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
        const { owner, repo } = formData
        getGithubData(owner, repo, setRepoData, setHasError, setIsDataDisplayed)
        getTopContributors(owner, repo, setContributors, setHasError, setIsDataDisplayed)
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
            <br />
            <button>Submit</button>
        </form>
    )
}

export default Form