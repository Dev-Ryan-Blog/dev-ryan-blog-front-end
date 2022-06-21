import NextAuth, { Awaitable, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	callbacks: {
		session({ session, user, token }): Awaitable<Session> {
			session.jwt = token.jwt;
			session.id = token.id;
			return session;
		},
		async jwt({ token, user, account }) {
			if (user && account) {
				const response = await fetch(
					`${process.env.INTERNAL_STRAPI_URL}/api/auth/google/callback?access_token=${account.access_token}`
				);
				const data = await response.json();
				token.jwt = data.jwt;
				token.id = data.user.id;
			}
			return token;
		}
	},
	pages: { signIn: "/auth/login", error: "error" },
	debug: process.env.NODE_ENV == "development"
});
