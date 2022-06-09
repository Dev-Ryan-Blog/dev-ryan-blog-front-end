import Author from "@components/author/author";
import PostPreview from "@components/post/postPreview";
import { css } from "@emotion/react";
import * as GraphQLGetAuthorBioPosts from "@graphql/getAuthorPosts";
import { AuthorBioPosts } from "blogTypes";
import { request } from "graphql-request";
import type { GetStaticPropsResult, NextPage, NextPageContext } from "next";

type Props = {
	data: AuthorBioPosts;
};

export async function getServerSideProps(
	context: NextPageContext
): Promise<GetStaticPropsResult<Props | undefined>> {
	const { slug } = context.query;

	const args: GraphQLGetAuthorBioPosts.Args = {
		slug: slug as string
	};
	const response = await request<GraphQLGetAuthorBioPosts.Response>(
		GraphQLGetAuthorBioPosts.getEndpoint(process.env.INTERNAL_STRAPI_URL),
		GraphQLGetAuthorBioPosts.query,
		args
	);

	const AuthorBioPosts: AuthorBioPosts =
		GraphQLGetAuthorBioPosts.responseToAuthorBioPosts(response);

	if (AuthorBioPosts.slug == null) {
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
			data: AuthorBioPosts
		}
	};
}

const Home: NextPage<Props> = (props: Props) => {
	const authorBioPosts = props.data;
	const posts = authorBioPosts.posts;
	return (
		<main
			css={css`
		height: 100%;
		`}>
			<Author
				name={authorBioPosts.name}
				bio={authorBioPosts.bio}
				avatarUrl={authorBioPosts.avatarUrl}
				slug={authorBioPosts.slug}
			/>
			{posts.map((post) => (
				<PostPreview post={post} key={post.slug} />
			))}
		</main>
	);
};

export default Home;
