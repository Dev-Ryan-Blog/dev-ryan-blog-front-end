import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
	const { data: session } = useSession();
	if (session && session.user) {
		return (
			<a href="/api/auth/signout">
				<button
					onClick={(e) => {
						e.preventDefault();
						signOut();
					}}>
					Sign out
				</button>
			</a>
		);
	}
	return (
		<a href="/api/auth/signin">
			<button
				onClick={(e) => {
					e.preventDefault();
					signIn();
				}}>
				Sign in
			</button>
		</a>
	);
};

export default LoginButton;
