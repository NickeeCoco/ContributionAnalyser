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

export { getGithubData, getTopContributors }