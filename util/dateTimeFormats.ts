export function dateTimeToShortName(dateTime: Date): string {
	return dateTime.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}

export function dateTimeToLongName(dateTime: Date): string {
	return dateTime.toLocaleString("en-US", {
		hour: "numeric",
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
