import { css } from "@emotion/react";
import * as GraphQLGetPosts from "@graphql/getPosts";
import type { Posts } from "blogTypes";
import { request } from "graphql-request";
import type { GetStaticPropsResult, NextPage } from "next";

type Props = {
	data: Posts;
};

export async function getServerSideProps(): Promise<
	GetStaticPropsResult<Props>
> {
	const posts = await request<Posts>(
		GraphQLGetPosts.getEndpoint(process.env.STRAPI_URL),
		GraphQLGetPosts.query
	);
	return {
		props: {
			data: posts
		}
	};
}

const Home: NextPage<Props> = (_props: Props) => {
	return (
		<main
			css={css`
		height: 100%;
		`}>
			This is my blog!
		</main>
	);
};

export default Home;
