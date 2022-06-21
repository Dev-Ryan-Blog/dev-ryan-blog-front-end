declare module "blogTypes" {
	export type Post = {
		id: number;
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

	export type AuthorBioPosts = Author & {
		bio: string;
		posts: Array<Post>;
	};

	export type SEO = {
		metaTitle: string;
		metaDescription: string;
	};

	// Map<PostId, [userId]>
	export type ResponseCounts = Map<number, Array<number>>;

	export type SeoReactionPost = SEOPost & {
		likeCount: number;
		bookmarkCount: number;
	};

	export type SeoReactionPostWithUser = SeoReactionPost & {
		isLiked: boolean;
		isBookmarked: boolean;
	};
}
