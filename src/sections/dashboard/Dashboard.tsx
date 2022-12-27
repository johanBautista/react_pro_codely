import { config } from "../../devdash_config";

export const Dashboard = () => {
	// const widgets = config.widgets.map((widget) => <li key={widget.id}>{widget.repository_url}</li>);
	const title = "DevDash_";

	return (
		<>
			<header>
				<h2>{title}</h2>
			</header>
			<section>
				{/* <ul>{widgets}</ul> */}
				<ul>
					{config.widgets.map((widget) => (
						<li key={widget.id}>{widget.repository_url}</li>
					))}
				</ul>
			</section>
		</>
	);
};
