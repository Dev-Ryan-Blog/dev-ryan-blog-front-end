import { css } from "@emotion/react";
import * as GraphQLGetAuthorPosts from "@graphql/getAuthorPosts";
import { AuthorPosts } from "blogTypes";
import { request } from "graphql-request";
import type { GetStaticPropsResult, NextPage, NextPageContext } from "next";

type Props = {
	data: AuthorPosts;
};

export async function getServerSideProps(
	context: NextPageContext
): Promise<GetStaticPropsResult<Props | undefined>> {
	const { slug } = context.query;

	const args: GraphQLGetAuthorPosts.Args = {
		slug: slug as string
	};
	const response = await request<GraphQLGetAuthorPosts.Response>(
		GraphQLGetAuthorPosts.getEndpoint(process.env.INTERNAL_STRAPI_URL),
		GraphQLGetAuthorPosts.query,
		args
	);

	const authorPosts: AuthorPosts =
		GraphQLGetAuthorPosts.responseToAuthorPosts(response);

	if (authorPosts.slug == null) {
		return {
			redirect: {
				destination: "/",
				permanent: false
			},
			props: undefined
		};
	}

	return {
		props: {
			data: authorPosts
		}
	};
}

const Home: NextPage<Props> = (props: Props) => {
	return (
		<main
			css={css`
		height: 100%;
		`}></main>
	);
};

export default Home;
