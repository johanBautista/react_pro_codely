import { githubApiResponses } from "../github_api_responses";

export class InMemoryGitHubRepositoryReopsitory {
	search(): typeof githubApiResponses {
		return githubApiResponses;
	}
}
