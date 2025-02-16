import "./globals.css";
import { Inter } from "next/font/google";
import { Logo } from "@/app/components/logo";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quill",
  description: "A modern blogging platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Logo />
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="text-primary hover:font-medium">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-primary hover:font-medium">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/create"
                    className="text-primary hover:font-medium"
                  >
                    Create
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-primary hover:font-medium"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
