import { githubApiResponses } from "../../github_api_responses";
import { isoToReadableDate } from "../../utils/isoToReadableDate";
import styles from "./Dashboard.module.scss";
import { ReactComponent as Check } from "./icons/check.svg";
import { ReactComponent as Error } from "./icons/error.svg";
import { ReactComponent as Lock } from "./icons/lock.svg";
import { ReactComponent as Unlock } from "./icons/unlock.svg";

export const Dashboard = () => {
	const title = "DevDash_";

	return (
		<>
			<header className={styles.container}>
				<h2>{title}</h2>
			</header>
			<section className={styles.container}>
				{githubApiResponses.map((widget) => (
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
						<p>Last update {isoToReadableDate(widget.repositoryData.updated_at)}</p>
						{widget.CiStatus.workflow_runs.length > 0 && (
							<div>
								{widget.CiStatus.workflow_runs[0].status === "completed" ? <Check /> : <Error />}
							</div>
						)}
					</article>
				))}
			</section>
		</>
	);
};
