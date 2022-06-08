declare module "blogTypes" {
	export type Post = {
		title: string;
		slug: string;
		content: string;
		heroUrl: string;
		description: string;
		createdAt: string;
		updatedAt: string;
	};

	export type AuthorPost = Post & {
		Author: Author;
	};

	export type SEOPost = AuthorPost & {
		SEO: SEO;
	};

	export type Author = {
		avatarUrl: string;
		name: string;
		slug: string;
	};

	export type AuthorPosts = Author & {
		posts: Array<Post>;
	};

	export type SEO = {
		metaTitle: string;
		metaDescription: string;
	};
}
