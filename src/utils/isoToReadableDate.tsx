export const isoToReadableDate = (lastUpdate: string): string => {
	const lastUpdateDate = new Date(lastUpdate);
	const currentDate = new Date();
	const diffTime = currentDate.getTime() - lastUpdateDate.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

	//clausulas guarda
	if (diffDays === 0) {
		return "today";
	}

	if (diffDays > 30) {
		return "more than a month ago";
	}

	return `${diffDays} days ago`;
};
