import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ValidateCredentialsUseCase } from '@/application/useCases/auth/ValidateCredentialsUseCase';

const validateCredentialsUseCase = new ValidateCredentialsUseCase();

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/es/admin/login',
    error: '/es/admin/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const result = await validateCredentialsUseCase.execute({
          username: credentials.username as string,
          password: credentials.password as string,
        });

        if (result.success && result.user) {
          return {
            id: result.user.id,
            name: result.user.username,
            email: `${result.user.username}@admin.local`,
            role: result.user.role,
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as any).role = token.role as string;
      return session;
    },
  },
};
