import { Text } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import MenuItem from "./menuItem";

const LoginButton = () => {
	const { data } = useSession();
	const router = useRouter();
	if (data && data.user) {
		return (
			<button
				onClick={(e) => {
					e.preventDefault;
					signOut();
				}}>
				<Text display="block" fontSize="large" px={"calc(2vw - 2px)"}>
					Log out
				</Text>
			</button>
		);
	}
	return (
		<MenuItem
			to={`/auth/login?returnUrl=${encodeURIComponent(router.asPath)}`}>
			Log in
		</MenuItem>
	);
};

export default LoginButton;
