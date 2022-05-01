declare module "blogTypes" {
	export type Posts = {
		posts: {
			data: Array<Post>;
		};
	};

	export type Post = {
		id: number;
		attributes: {
			Title: string;
			Slug: string;
			Content: string;
			author: {
				data: {
					attributes: Author;
				};
			};
		};
	};

	export type Author = {
		Avatar: {
			data: {
				attributes: {
					Avatar: Avatar;
					Name: string;
				};
			};
		};
	};

	export type Avatar = {
		url: string;
	};
}
