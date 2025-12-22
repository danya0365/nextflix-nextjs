import { Providers } from "@/src/presentation/providers/Providers";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Nextflix - Stream Movies & TV Shows",
  description: "Watch unlimited movies, TV shows, and more. Stream anywhere, anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
