import { EdgeStoreProvider } from "@/lib/edgestore";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
    );
  }