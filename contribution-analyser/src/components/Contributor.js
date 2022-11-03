import { useState, useEffect } from "react"
import { getContributorDetails } from "../fetchData"

function Contributor(props) {
    const [contributorDetails, setContributorDetails] = useState({})

    const {contributor, setHasError, setIsDataDisplayed} = props
    const {name, company, location} = contributorDetails

    useEffect(() => {
        getContributorDetails(contributor.login, setContributorDetails, setHasError, setIsDataDisplayed)
    }, [])

    useEffect(() => {
        console.log(contributorDetails)
    }, [contributorDetails])

    return (
        <div className="contributor" key={contributor.id}>
            <img src={contributor.avatar_url} />
            <div className="contributor--details">
                <p><span className="label">Name:</span>{name ? name : "Unknown"}</p>
                <p><span className="label">Login:</span> {contributor.login}</p>
                <p><span className="label">Company:</span> {company ? company : "Unknown"}</p>
                <p><span className="label">Location:</span> {location ? location : "Unknown"}</p>
                <p><span className="label">Contributions:</span> {contributor.contributions}</p>
            </div>
        </div>
    )
}

export default Contributor