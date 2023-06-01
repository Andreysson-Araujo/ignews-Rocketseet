import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_CLIENT_ID ?? "";
const clientSecret = process.env.GITHUB_CLIENT_SECRET ?? "";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId,
      clientSecret,
      authorization: {
        params: { scope: "read:user user:email" },
      },
    }),
  ],
});
