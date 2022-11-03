import { Octokit } from "octokit"

const octokit = new Octokit({
    auth: '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'
})

async function getGithubData(owner, repo, setRepoData, setHasError, setIsDataDisplayed) {
    if(!localStorage.getItem(`repo-info@${owner}@${repo}`)) {
        try {
            const result = await octokit.request("GET /repos/{owner}/{repo}", {
                owner,
                repo,
            })
    
            const { name, description, language, license, stargazers_count, html_url } = result.data
    
            setHasError(false)
            setRepoData({ name, description, language, license, stargazers_count, html_url })
            localStorage.setItem(`repo-info@${owner}@${repo}`, JSON.stringify({ name, description, language, license, stargazers_count, html_url }))
            setIsDataDisplayed(true)
        } catch (err) {
            setHasError(true)
            setIsDataDisplayed(false)
        }
    } else {
        setRepoData(JSON.parse(localStorage.getItem(`repo-info@${owner}@${repo}`)))
    }
}

async function getTopContributors(owner, repo, nbContributors, setContributors, setHasError, setIsDataDisplayed) {
    
    if(!localStorage.getItem(`contributors@${owner}@${repo}`)) {
        const nbPages = Math.ceil(nbContributors / 100)
        let currentPage = 1
        let contributors = []
        for(currentPage; currentPage <= nbPages; currentPage++) {
            try {
                const newContributors = await octokit.request("GET /repos/{owner}/{repo}/contributors", {
                    owner,
                    repo,
                    per_page: 100,
                    page: currentPage
                })
                contributors = [...contributors, ...newContributors.data]
            } catch (err) {
                setHasError(true)
                setIsDataDisplayed(false)
            }
        }
        setContributors(contributors.slice(0, nbContributors))
        localStorage.setItem(`contributors@${owner}@${repo}`, JSON.stringify(contributors))
    } else {
        setContributors(JSON.parse(localStorage.getItem(`contributors@${owner}@${repo}`)).slice(0, nbContributors))
    }
}

async function getContributorDetails(contributor, setContributorDetails, setHasError, setIsDataDisplayed) {
    if(!localStorage.getItem(`contributor-details@${contributor}`)) {
        try {
            const contributorDetails = await octokit.request("GET /users/{contributor}", {
                contributor
            })
            setContributorDetails(contributorDetails.data)
            localStorage.setItem(`contributor-details@${contributor}`, JSON.stringify(contributorDetails.data))
            setHasError(false)
            setIsDataDisplayed(true)
        } catch (err) {
            setHasError(true)
            setIsDataDisplayed(false)
        }
    } else {
        setContributorDetails(JSON.parse(localStorage.getItem(`contributor-details@${contributor}`)))
    }
}

export { getGithubData, getTopContributors, getContributorDetails }