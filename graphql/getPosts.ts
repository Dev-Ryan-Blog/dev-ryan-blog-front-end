export const endpoint = "http://localhost:1337/graphql";
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
