declare namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: "development" | "production";
		TZ?: string;
		PORT?: string;
		PWD: string;
		STRAPI_URL: string;
	}
}
