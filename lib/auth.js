import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma"; // Singleton prisma client
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0", // Use Twitter API v2
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "users.read tweet.read offline.access",
        },
      },
    }),
    
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() }
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email.toLowerCase() }
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: user.name,
                email: user.email.toLowerCase(),
                image: user.image,
                role: 0,
                password: null,
              }
            });
          } else if (user.image && existingUser.image !== user.image) {
            await prisma.user.update({
              where: { email: user.email.toLowerCase() },
              data: { image: user.image }
            });
          }
          return true;
        } catch (error) {
          console.error("Google sign in error:", error);
          return false;
        }
      }
      
      if (account?.provider === "twitter") {
        try {
          // Twitter might not always provide email, so we need to handle this case
          const email = user.email?.toLowerCase();
          
          if (!email) {
            // If no email provided by Twitter, we might want to handle this differently
            // For now, we'll use the Twitter ID as a unique identifier
            const twitterId = `twitter_${account.providerAccountId}`;
            
            const existingUser = await prisma.user.findFirst({
              where: {
                accounts: {
                  some: {
                    provider: "twitter",
                    providerAccountId: account.providerAccountId
                  }
                }
              }
            });

            if (!existingUser) {
              // Create user without email if Twitter doesn't provide it
              const newUser = await prisma.user.create({
                data: {
                  name: user.name || `Twitter User ${account.providerAccountId}`,
                  email: `${twitterId}@twitter.placeholder`, // Placeholder email
                  image: user.image,
                  role: 0,
                  password: null,
                }
              });
              
              // Create the account relation
              await prisma.account.create({
                data: {
                  userId: newUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  refresh_token: account.refresh_token,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                  id_token: account.id_token,
                  session_state: account.session_state,
                }
              });
            }
            return true;
          }

          // If email is provided, handle normally
          const existingUser = await prisma.user.findUnique({
            where: { email }
          });

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                name: user.name,
                email: email,
                image: user.image,
                role: 0,
                password: null,
              }
            });
            
            await prisma.account.create({
              data: {
                userId: newUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              }
            });
          } else if (user.image && existingUser.image !== user.image) {
            await prisma.user.update({
              where: { email },
              data: { image: user.image }
            });
          }
          return true;
        } catch (error) {
          console.error("Twitter sign in error:", error);
          return false;
        }
      }
      
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        try {
          let dbUser;
          
          if (account?.provider === "twitter" && !user.email) {
            // Handle Twitter users without email
            dbUser = await prisma.user.findFirst({
              where: {
                accounts: {
                  some: {
                    provider: "twitter",
                    providerAccountId: account.providerAccountId
                  }
                }
              }
            });
          } else {
            dbUser = await prisma.user.findUnique({
              where: { email: user.email.toLowerCase() }
            });
          }
          
          if (dbUser) {
            token.id = dbUser.id.toString();
            token.role = dbUser.role;
            token.image = dbUser.image;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  
  // Add error logging for debugging
  logger: {
    error(code, metadata) {
      console.error('NextAuth Error:', code, metadata);
    },
    warn(code) {
      console.warn('NextAuth Warning:', code);
    },
  },
};