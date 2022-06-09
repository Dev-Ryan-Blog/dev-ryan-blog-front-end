import AuthorPostPreview from "@components/post/AuthorPostPreview";
import { css } from "@emotion/react";
import * as GraphQLGetPosts from "@graphql/getPosts";
import type { AuthorPost } from "blogTypes";
import { request } from "graphql-request";
import type { GetStaticPropsResult, NextPage } from "next";
import Head from "next/dist/shared/lib/head";

type Props = {
	data: Array<AuthorPost>;
};

export async function getServerSideProps(): Promise<
	GetStaticPropsResult<Props>
> {
	const args: GraphQLGetPosts.Args = {
		pageSize: 11
	};
	const response = await request<GraphQLGetPosts.Response>(
		GraphQLGetPosts.getEndpoint(process.env.INTERNAL_STRAPI_URL),
		GraphQLGetPosts.query,
		args
	);

	const posts = GraphQLGetPosts.responseToPosts(response);

	return {
		props: {
			data: posts
		}
	};
}

const Home: NextPage<Props> = (props: Props) => {
	const posts: Array<AuthorPost> = props.data;
	return (
		<>
			<Head>
				<title>Dev Ryan Blog</title>
			</Head>
			<main
				css={css`
				height: 100%;
			`}>
				{posts.map((post) => (
					<AuthorPostPreview post={post} key={post.slug} />
				))}
			</main>
		</>
	);
};

export default Home;
