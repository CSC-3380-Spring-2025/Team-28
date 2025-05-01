import { EdgeStoreProvider } from "@/lib/edgestore";

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
    );
  }