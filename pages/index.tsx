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
		GraphQLGetPosts.endpoint,
		GraphQLGetPosts.query
	);
	return {
		props: {
			data: posts
		}
	};
}

const Index: NextPage<Props> = (props: Props) => {
	return (
		<>
			{props.data.posts.data.map((post) => (
				<div key={post.id}>{post.attributes.Title}</div>
			))}
		</>
	);
};

export default Index;
