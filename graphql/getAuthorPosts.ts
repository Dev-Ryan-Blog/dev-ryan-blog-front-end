import { AuthorPosts, Post } from "blogTypes";

export const getEndpoint = (base_url: string): string => `${base_url}/graphql`;

export const query = `
query getAuthorPosts($slug: String) {
    authors(filters: { Slug: { eq: $slug } }) {
        data {
            id
            attributes {
                Name
                Slug
                Avatar {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                posts {
                    data {
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
                            createdAt
                            updatedAt
                        }
                    }
                }
				createdAt
				updatedAt
            }
        }
    }
}`;

export const responseToAuthorPosts = (response: Response): AuthorPosts => {
	const prependStrapiUrl = (url: string): string =>
		`${process.env.EXTERNAL_STRAPI_URL}${url}`;

	const [rawAuthor] = response.authors.data;
	if (typeof rawAuthor === "undefined") {
		return {} as AuthorPosts;
	}

	const posts: Array<Post> = rawAuthor.attributes.posts.data.map(
		(rawPost) => ({
			title: rawPost.attributes.Title,
			slug: rawPost.attributes.Slug,
			content: rawPost.attributes.Content,
			description: rawPost.attributes.Description,
			heroUrl: prependStrapiUrl(
				rawPost.attributes.Hero.data.attributes.url
			),
			createdAt: rawPost.attributes.createdAt,
			updatedAt: rawPost.attributes.updatedAt
		})
	);

	const authorPosts: AuthorPosts = {
		name: rawAuthor.attributes.Name,
		slug: rawAuthor.attributes.Slug,
		avatarUrl: prependStrapiUrl(
			rawAuthor.attributes.Avatar.data.attributes.url
		),
		posts
	};

	return authorPosts;
};

export type Response = {
	authors: {
		data: Array<{
			id: number;
			attributes: {
				Name: string;
				Slug: string;
				Avatar: {
					data: {
						attributes: {
							url: string;
						};
					};
				};
				posts: {
					data: Array<{
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
							createdAt: string;
							updatedAt: string;
						};
					}>;
				};
				createdAt: string;
				updatedAt: string;
			};
		}>;
	};
};

export type Args = {
	slug: string;
};
