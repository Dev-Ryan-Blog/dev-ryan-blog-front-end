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
				<meta name="og:title" content="Dev Ryan Blog" />
				<meta
					name="og:description"
					content="Dev Ryan's blog features articles that aim to help developers overcome obsticles that are poorly documented. Every article is a learning experience documented for future developers!"
				/>
				<meta
					name="og:image"
					content={`${process.env.NEXT_PUBLIC_BASE_URL}DevRyanLogo.svg`}
				/>
				<meta
					name="og:url"
					content={`${process.env.NEXT_PUBLIC_BASE_URL}`}
				/>

				<meta name="twitter:title" content="Dev Ryan Blog" />
				<meta
					name="twitter:description"
					content="Dev Ryan's blog features articles that aim to help developers overcome obsticles that are poorly documented. Every article is a learning experience documented for future developers!"
				/>
				<meta
					name="twitter:image"
					content={`${process.env.NEXT_PUBLIC_BASE_URL}DevRyanLogo.svg`}
				/>
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					name="twitter:url"
					content={process.env.NEXT_PUBLIC_BASE_URL}
				/>
			</Head>
			<main
				css={css`
				height: 100%;
			`}>
				{posts.map((post, index) => (
					<AuthorPostPreview
						post={post}
						isFirst={index == 0}
						key={post.slug}
					/>
				))}
			</main>
		</>
	);
};

export default Home;
