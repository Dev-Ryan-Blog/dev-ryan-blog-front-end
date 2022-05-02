declare module "blogTypes" {
	export type Post = {
		id: number;
		Title: string;
		Slug: string;
		Content: string;
		HeroUrl: string;
		author: Author;
	};

	export type Author = {
		AvatarUrl: string;
		Name: string;
	};
}
