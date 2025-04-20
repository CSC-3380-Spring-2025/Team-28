import { EdgeStoreProvider } from "@/lib/edgestore";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </body>
      </html>
    );
  }