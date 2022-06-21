import {
	Author,
	ResponseCounts,
	SEO,
	SEOPost,
	SeoReactionPost,
	SeoReactionPostWithUser
} from "blogTypes";

export const getEndpoint = (base_url: string): string => `${base_url}/graphql`;

export type GraphqlResponse = {
	posts: {
		data: Array<{
			id: string;
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
	likes: {
		data: Array<ReactionResponse>;
	};
	bookmarks: {
		data: Array<ReactionResponse>;
	};
};

type ReactionResponse = {
	attributes: {
		post: {
			data: {
				id: string;
			};
		};
		users_permissions_user: {
			data: {
				id: string;
			};
		};
	};
};

export type Args = {
	slug: string;
};

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
	likes(filters: { post: { Slug: { eq: $slug } } }) {
		data {
			attributes {
				post {
					data {
						id
					}
				}
				users_permissions_user {
					data {
						id
					}
				}
			}
		}
	}
	bookmarks(filters: { post: { Slug: { eq: $slug } } }) {
		data {
			attributes {
				post {
					data {
						id
					}
				}
				users_permissions_user {
					data {
						id
					}
				}
			}
		}
	}
}`;

export function responseToSEOReactionPostWithUser(
	response: GraphqlResponse,
	userId: number | null = null
): SeoReactionPostWithUser {
	console.log("0");
	const seoReactionPost = responseToSEOReactionPost(response);

	const rawLikes = response.likes.data;
	const rawBookmarks = response.bookmarks.data;

	const likeCounts = getReactionCounts(rawLikes, seoReactionPost.id);
	const bookmarkCounts = getReactionCounts(rawBookmarks, seoReactionPost.id);
	const isLiked = userId
		? likeCounts.get(seoReactionPost.id)?.includes(userId) ?? false
		: false;
	let isBookmarked = userId
		? bookmarkCounts.get(seoReactionPost.id)?.includes(userId) ?? false
		: false;

	const seoReactionPostWithUser: SeoReactionPostWithUser = {
		...seoReactionPost,
		isLiked,
		isBookmarked
	};

	return seoReactionPostWithUser;
}

function responseToSEOReactionPost(response: GraphqlResponse): SeoReactionPost {
	const prependStrapiUrl = (url: string): string =>
		`${process.env.EXTERNAL_STRAPI_URL}${url}`;

	const [rawPost] = response.posts.data;
	if (typeof rawPost === "undefined") {
		return {} as SeoReactionPost;
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

	const seoPost: SEOPost = {
		id: Number.parseInt(rawPost.id),
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

	const rawLikes = response.likes.data;
	const rawBookmarks = response.bookmarks.data;
	const likeCounts = getReactionCounts(rawLikes, seoPost.id);
	const bookmarkCounts = getReactionCounts(rawBookmarks, seoPost.id);

	const seoReactionPost: SeoReactionPost = {
		...seoPost,
		likeCount: likeCounts.get(seoPost.id)!.length,
		bookmarkCount: bookmarkCounts.get(seoPost.id)!.length
	};

	return seoReactionPost;
}

function getReactionCounts(
	rawReactions: Array<ReactionResponse>,
	postId: number
): ResponseCounts {
	const initalAccumulator = new Map() as ResponseCounts;
	initalAccumulator.set(postId, []);

	const reactionCounts = rawReactions.reduce(
		(accumulator: ResponseCounts, currentValue) => {
			const postId = Number.parseInt(
				currentValue.attributes.post.data.id
			);
			const userId = Number.parseInt(
				currentValue.attributes.users_permissions_user.data.id
			);
			const nextAccumulator: Array<number> = accumulator.get(postId)!;
			nextAccumulator.push(userId);
			accumulator.set(postId, nextAccumulator ?? accumulator.get(postId));
			return accumulator;
		},
		initalAccumulator
	);

	return reactionCounts;
}
