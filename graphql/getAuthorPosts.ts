import { AuthorBioPosts, Post } from "blogTypes";

export const getEndpoint = (base_url: string): string => `${base_url}/graphql`;

export const query = `
query getAuthorBioPosts($slug: String) {
    authors(filters: { Slug: { eq: $slug } }) {
        data {
            id
            attributes {
                Name
                Slug
                Bio
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

export const responseToAuthorBioPosts = (
	response: Response
): AuthorBioPosts => {
	const prependStrapiUrl = (url: string): string =>
		`${process.env.EXTERNAL_STRAPI_URL}${url}`;

	const [rawAuthor] = response.authors.data;
	if (typeof rawAuthor === "undefined") {
		return {} as AuthorBioPosts;
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

	const authorBioPosts: AuthorBioPosts = {
		name: rawAuthor.attributes.Name,
		slug: rawAuthor.attributes.Slug,
		bio: rawAuthor.attributes.Bio,
		avatarUrl: prependStrapiUrl(
			rawAuthor.attributes.Avatar.data.attributes.url
		),
		posts
	};

	return authorBioPosts;
};

export type Response = {
	authors: {
		data: Array<{
			id: number;
			attributes: {
				Name: string;
				Slug: string;
				Bio: string;
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
