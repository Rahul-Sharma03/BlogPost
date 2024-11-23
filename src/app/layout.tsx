import type { Metadata } from "next";
import "./globals.css";
import SiteConfig from "@/config/site";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/theme-provider";
import NextAuthProvider from "@/provider/NextAuthProvider";

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-p-20 scroll-smooth"
      suppressHydrationWarning
    >
      <body>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav />
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
