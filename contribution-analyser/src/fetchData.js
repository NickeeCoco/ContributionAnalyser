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

async function getTopContributors(owner, repo, setContributors, setHasError, setIsDataDisplayed) {
    try {
        const contributors = await octokit.request("GET /repos/{owner}/{repo}/contributors", {
            owner,
            repo
        })

        setContributors(contributors.data.slice(0, 30))
    } catch (err) {
        setHasError(true)
        setIsDataDisplayed(false)
    }
}

async function getContributorDetails(contributor, setContributorDetails, setHasError, setIsDataDisplayed) {
    try {
        const contributorDetails = await octokit.request("GET /users/{contributor}", {
            contributor
        })
        setContributorDetails(contributorDetails.data)
    } catch (err) {
        console.log(err)
    }
}

export { getGithubData, getTopContributors, getContributorDetails }