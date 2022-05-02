import { extendTheme } from "@chakra-ui/react";
import Colors from "@themes/colors.js";
import Fonts from "@themes/fonts.js";

const Theme = extendTheme({
	...Colors,
	...Fonts
});

export default Theme;
