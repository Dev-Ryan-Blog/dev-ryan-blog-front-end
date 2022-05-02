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

export type Args = {
	sort?: string;
	page?: number;
	pageSize?: number;
};
