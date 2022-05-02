import { Author, Post } from "blogTypes";

export const getEndpoint = (base_url: string): string => `${base_url}/graphql`;

export const query = `
query getPosts($sort: String = "createdAt:desc", $page: Int = 1, $pageSize: Int = 10) {
    posts(sort: [$sort], pagination: {page: $page, pageSize: $pageSize}) {
        data {
            id
            attributes {
                Title
                Slug
                Content
                Hero {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                author {
                    data {
                        attributes {
                            Name
                            Avatar {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}`;

export const responseToPosts = (response: any): Array<Post> => {
	const data = response.posts.data;
	const prependStrapiUrl = (url: string): string =>
		`${process.env.STRAPI_URL}${url}`;
	let posts: Array<Post> = data.map((rawPost: any) => {
		const rawAuthor = rawPost.attributes.author.data.attributes;
		const rawAvatar = rawAuthor.Avatar.data.attributes;

		let author: Author = {
			Name: rawAuthor.Name,
			AvatarUrl: prependStrapiUrl(rawAvatar.url)
		};

		let post: Post = {
			id: rawPost.id,
			Title: rawPost.attributes.Title,
			Slug: rawPost.attributes.Slug,
			Content: rawPost.attributes.Content,
			HeroUrl: prependStrapiUrl(
				rawPost.attributes.Hero.data.attributes.url
			),
			author: author
		};

		return post;
	});

	return posts;
};

export type Response = {
	posts: {
		data: {
			id: number;
			attributes: {
				Title: string;
				Slug: string;
				Content: string;
				author: {
					data: {
						attributes: {
							Name: string;
							Avatar: {
								data: {
									attributes: {
										url: string;
									};
								};
							};
						};
					};
				};
			};
		};
	};
};

export type Args = {
	sort?: string;
	page?: number;
	pageSize?: number;
};
