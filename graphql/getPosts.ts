export const getEndpoint = (base_url: string): string => `${base_url}/graphql`;
export const query = `
query getPosts {
    posts {
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
