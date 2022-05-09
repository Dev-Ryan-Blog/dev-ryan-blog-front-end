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
				Description
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

export const responseToPosts = (response: Response): Array<Post> => {
	const data = response.posts.data;
	const prependStrapiUrl = (url: string): string =>
		`${process.env.EXTERNAL_STRAPI_URL}${url}`;
	let posts: Array<Post> = data.map((rawPost) => {
		const rawAuthor = rawPost.attributes.author.data.attributes;
		const rawAvatar = rawAuthor.Avatar.data.attributes;

		let author: Author = {
			name: rawAuthor.Name,
			avatarUrl: prependStrapiUrl(rawAvatar.url)
		};

		let post: Post = {
			id: rawPost.id,
			title: rawPost.attributes.Title,
			slug: rawPost.attributes.Slug,
			content: rawPost.attributes.Content,
			description: rawPost.attributes.Description,
			heroUrl: prependStrapiUrl(
				rawPost.attributes.Hero.data.attributes.url
			),
			Author: author
		};

		return post;
	});

	return posts;
};

export type Response = {
	posts: {
		data: Array<{
			id: number;
			attributes: {
				Title: string;
				Slug: string;
				Content: string;
				Description: string;
				Hero: {
					data: {
						attributes: {
							url: string;
						};
					};
				};
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
		}>;
	};
};

export type Args = {
	sort?: string;
	page?: number;
	pageSize?: number;
};
