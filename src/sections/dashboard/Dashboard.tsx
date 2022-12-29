import { useEffect, useState } from "react";

import { config } from "../../devdash_config";
import { GitHubApiGitHubRepositoryRepository } from "../../infraestructure/GitHubApiGitHubRepositoryRepository";
import { GitHubApiResponses } from "../../infraestructure/GitHubApiResponse";
import { isoToReadableDate } from "../../utils/isoToReadableDate";
import styles from "./Dashboard.module.scss";
import { ReactComponent as Brand } from "./icons/brand.svg";
import { ReactComponent as Check } from "./icons/check.svg";
import { ReactComponent as Error } from "./icons/error.svg";
import { ReactComponent as PullRequests } from "./icons/git-pull-request.svg";
import { ReactComponent as IssueOpened } from "./icons/issue-opened.svg";
import { ReactComponent as Lock } from "./icons/lock.svg";
import { ReactComponent as Forks } from "./icons/repo-forked.svg";
import { ReactComponent as Start } from "./icons/star.svg";
import { ReactComponent as Unlock } from "./icons/unlock.svg";
import { ReactComponent as Watchers } from "./icons/watchers.svg";

const repository = new GitHubApiGitHubRepositoryRepository(config.github_access_token);

export const Dashboard = () => {
	const title = "DevDash_";

	const [repositoryData, setRepositoryData] = useState<GitHubApiResponses[]>([]);
	useEffect(() => {
		repository
			.search(config.widgets.map((widget) => widget.repository_url))
			.then((responses) => {
				setRepositoryData(responses);
			})
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<header className={styles.header}>
				<section className={styles.header__container}>
					<Brand />
					<h1 className={styles.app__brand}>{title}💥</h1>
				</section>
			</header>
			<section className={styles.container}>
				{repositoryData.map((widget) => (
					<article className={styles.widget} key={widget.repositoryData.id}>
						<header className={styles.widget__header}>
							<a
								className={styles.widget__title}
								href={widget.repositoryData.html_url}
								target="_blank"
								title={`${widget.repositoryData.organization.login}/${widget.repositoryData.name}`}
								rel="noreferrer"
							>
								{widget.repositoryData.organization.login}/{widget.repositoryData.name}
							</a>
							{widget.repositoryData.private ? <Lock /> : <Unlock />}
						</header>
						<div className={styles.widget__body}>
							<div className={styles.widget__status}>
								<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
								{widget.ciStatus.workflow_runs.length > 0 && (
									<div>
										{widget.ciStatus.workflow_runs[0].status === "completed" ? (
											<Check />
										) : (
											<Error />
										)}
									</div>
								)}
							</div>
							<p className={styles.widget__description}>{widget.repositoryData.description}</p>
						</div>
						<footer className={styles.widget__footer}>
							<div className={styles.widget__stat}>
								<Start />
								<span>{widget.repositoryData.stargazers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Watchers />
								<span>{widget.repositoryData.watchers_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<Forks />
								<span>{widget.repositoryData.forks_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<IssueOpened />
								<span>{widget.repositoryData.open_issues_count}</span>
							</div>
							<div className={styles.widget__stat}>
								<PullRequests />
								<span>{widget.pullRequests.length}</span>
							</div>
						</footer>
					</article>
				))}
			</section>
		</>
	);
};
