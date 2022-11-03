import { useState } from "react"

function Contributor(props) {
    const [contributorDetails, setContributorDetails] = useState({})

    const {contributor} = props
    console.log(contributor)

    return (
        <div className="contributor" key={contributor.id}>
            <img src={contributor.avatar_url} />
            <div className="contributor--details">
                <p><span className="label">Name:</span></p>
                <p><span className="label">Login:</span> {contributor.login}</p>
                <p><span className="label">Contributions:</span> {contributor.contributions}</p>
            </div>
        </div>
    )
}

export default Contributor