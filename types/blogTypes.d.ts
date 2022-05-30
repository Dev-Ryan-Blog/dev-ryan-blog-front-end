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

	export type SEOPost = {
		id: number;
		title: string;
		slug: string;
		content: string;
		heroUrl: string;
		description: string;
		Author: Author;
		SEO: SEO;
	};

	export type Author = {
		avatarUrl: string;
		name: string;
	};

	export type SEO = {
		metaTitle: string;
		metaDescription: string;
	};
}
