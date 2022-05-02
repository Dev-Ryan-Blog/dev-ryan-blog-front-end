import { Text } from "@chakra-ui/react";
import FeaturePostPreview from "@components/post/featurePostPreview";
import { css } from "@emotion/react";
import * as GraphQLGetPosts from "@graphql/getPosts";
import type { Post } from "blogTypes";
import { request } from "graphql-request";
import type { GetStaticPropsResult, NextPage } from "next";

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
		GraphQLGetPosts.getEndpoint(process.env.STRAPI_URL),
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
	const featurePost: Post = posts[0];
	const otherPosts: Array<Post> = posts.slice(1);
	return (
		<main
			css={css`
		height: 100%;
		`}>
			<Text>
				<FeaturePostPreview post={featurePost} />
			</Text>
		</main>
	);
};

export default Home;
