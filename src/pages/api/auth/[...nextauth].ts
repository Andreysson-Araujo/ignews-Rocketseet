import { query as q } from "faunadb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from "@/services/fauna";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage";

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
    async session({ session }) {
      if (session.user && session.user.email) {
        try {
          const userActiveSubscription = await fauna.query(
            q.Get(
              q.Intersection([
                q.Match(
                  q.Index("subscription_by_user_ref"),
                  q.Select(
                    "ref",
                    q.Get(
                      q.Match(
                        q.Index("user_by_email"),
                        q.Casefold(session.user.email)
                      )
                    )
                  )
                ),
                q.Match(q.Index("subscription_by_status"), "active"),
              ])
            )
          );

          return {
            ...session,
            activeSubscription: userActiveSubscription,
          };
        } catch (error) {
          console.log(error);
        }
      }

      return session;
    },
    async signIn({ user, account, profile, credentials }) {
      if (user.email) {
        const { email } = user;

        try {
          await fauna.query(
            q.If(
              q.Not(
                q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(user.email)))
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
