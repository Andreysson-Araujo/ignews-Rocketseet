import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "@/services/fauna";

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
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (user.email) {
        const { email } = user;

        try {
          await fauna.query(
            q.If(
              q.Not(
                q.Exists(
                  q.Match(
                    q.Index("user_by_email"),
                    q.Casefold(user.email)
                  )
                )
              ),
              q.Create(q.Collection("users"), { data: { email } }),
              q.Get(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
            )
          );

          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }

      return false;
    },
  },
});
