import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { SourceProvider } from "@/context/SourceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sigma Notes",
  description: "Annotation and note-taking app",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <SourceProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </SourceProvider>
    </AuthProvider>
  );
}
