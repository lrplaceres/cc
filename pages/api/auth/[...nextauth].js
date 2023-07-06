import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import bcrypt from "bcryptjs";

export const authOptions = {
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.rol = user.rol;
        token.usuario = user.usuario;
        token.name = user.nombre;
        token.uid = user.uid;
        token.email = user.correo;
        token.entidad = user.entidad;
        token.identidad = user.identidad;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.rol = token.rol;
      session.usuario = token.usuario;
      session.uid = token.uid;
      session.entidad = token.entidad;
      session.identidad = token.identidad;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    async encode() {},
    async decode() {},
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        credentials.contrasena = bcrypt.hashSync(
          credentials.contrasena,
          "$2a$10$CwTysUXWue0Thq9StjUK0u"
        );
        const { data: user } = await axios.post(
         `${process.env.MI_IP_BACKEND}/api/usuario/login`,
          credentials
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
