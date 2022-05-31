import FeaturePostPreview from "@components/post/featurePostPreview";
import PostPreview from "@components/post/postPreview";
import { css } from "@emotion/react";
import * as GraphQLGetPosts from "@graphql/getPosts";
import type { Post } from "blogTypes";
import { request } from "graphql-request";
import type { GetStaticPropsResult, NextPage } from "next";
import Head from "next/dist/shared/lib/head";

type Props = {
	data: Array<Post>;
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
	const posts: Array<Post> = props.data;
	const [featurePost] = posts;
	const otherPosts: Array<Post> = posts.slice(1);
	return (
		<>
			<Head>
				<title>Dev Ryan Blog</title>
			</Head>
			<main
				css={css`
		height: 100%;
		`}>
				{featurePost != null && (
					<FeaturePostPreview post={featurePost} />
				)}
				{otherPosts.map((post) => (
					<PostPreview post={post} key={post.id} />
				))}
			</main>
		</>
	);
};

export default Home;
