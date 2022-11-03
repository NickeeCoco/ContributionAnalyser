import {useState} from "react"

function Form() {
    
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
        console.log(formData)
    }

    return (
        <form onSubmit={handleSubmit} >
            <label htmlFor="owner">Owner: </label>
            <input
                id="owner"
                type="text"
                onChange={handleChange}
                name="owner"
                value={formData.owner}
            />
            <br />
            <label htmlFor="repo">Repo: </label>
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