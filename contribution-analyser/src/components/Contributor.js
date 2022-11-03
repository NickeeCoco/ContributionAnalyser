import React, { useState, useEffect } from "react"
import { getContributorDetails } from "../fetchData"

function Contributor(props) {
    const [contributorDetails, setContributorDetails] = useState({})

    const {contributor, index, setHasError, setIsDataDisplayed} = props
    const {name, company, location} = contributorDetails

    useEffect(() => {
        getContributorDetails(contributor.login, setContributorDetails, setHasError, setIsDataDisplayed)
    }, [contributor.login, setContributorDetails, setHasError, setIsDataDisplayed])

    return (
        <div className="contributor">
            <p className="contributor--index">{index + 1}.</p>
            <img src={contributor.avatar_url} alt={`${contributor.login}'s avatar`} />
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