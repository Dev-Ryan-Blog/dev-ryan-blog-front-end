declare module "blogTypes" {
	export type Post = {
		id: number;
		title: string;
		slug: string;
		content: string;
		heroUrl: string;
		description: string;
		Author: Author;
	};

	export type Author = {
		avatarUrl: string;
		name: string;
	};
}
