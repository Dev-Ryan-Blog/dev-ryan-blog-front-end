import { Author, SEO, SEOPost } from "blogTypes";

export const getEndpoint = (base_url: string): string => `${base_url}/graphql`;

export const query = `
query getPosts($slug: String) {
    posts(filters: { Slug: { eq: $slug } }) {
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
							Slug
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
				SEO {
					MetaTitle
					MetaDescription
				}
				createdAt
				updatedAt
            }
        }
    }
}`;

export const responseToSEOPost = (response: Response): SEOPost => {
	const prependStrapiUrl = (url: string): string =>
		`${process.env.EXTERNAL_STRAPI_URL}${url}`;

	const [rawPost] = response.posts.data;
	if (typeof rawPost === "undefined") {
		return {} as SEOPost;
	}

	const rawAuthor = rawPost.attributes.author.data.attributes;
	const rawAvatar = rawAuthor.Avatar.data.attributes;
	const rawSEO = rawPost.attributes.SEO;

	const author: Author = {
		name: rawAuthor.Name,
		avatarUrl: prependStrapiUrl(rawAvatar?.url),
		slug: rawAuthor.Slug
	};

	const seo: SEO = {
		metaTitle: rawSEO.MetaTitle,
		metaDescription: rawSEO.MetaDescription
	};

	const post: SEOPost = {
		title: rawPost.attributes.Title,
		slug: rawPost.attributes.Slug,
		content: rawPost.attributes.Content,
		description: rawPost.attributes.Description,
		heroUrl: prependStrapiUrl(rawPost.attributes.Hero.data.attributes.url),
		createdAt: rawPost.attributes.createdAt,
		updatedAt: rawPost.attributes.updatedAt,
		Author: author,
		SEO: seo
	};

	return post;
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
							Slug: string;
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
				SEO: {
					MetaTitle: string;
					MetaDescription: string;
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
