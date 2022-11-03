import { Octokit } from "octokit"

const octokit = new Octokit({
    auth: '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'
})

async function getGithubData(owner, repo, setRepoData, setHasError, setIsDataDisplayed) {
    try {
        const result = await octokit.request("GET /repos/{owner}/{repo}", {
            owner,
            repo,
        })

        const { name, description, language, license, stargazers_count, html_url } = result.data

        setHasError(false)
        setRepoData({ name, description, language, license, stargazers_count, html_url })
        setIsDataDisplayed(true)
    } catch (err) {
        setHasError(true)
        setIsDataDisplayed(false)
    }
}

async function getTopContributors(owner, repo, nbContributors, setContributors, setHasError, setIsDataDisplayed) {
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
}

async function getContributorDetails(contributor, setContributorDetails, setHasError, setIsDataDisplayed) {
    try {
        const contributorDetails = await octokit.request("GET /users/{contributor}", {
            contributor
        })
        setContributorDetails(contributorDetails.data)
        setHasError(false)
        setIsDataDisplayed(true)
    } catch (err) {
        setHasError(true)
        setIsDataDisplayed(false)
    }
}

export { getGithubData, getTopContributors, getContributorDetails }