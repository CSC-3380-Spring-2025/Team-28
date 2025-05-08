import { EdgeStoreProvider } from "@/lib/edgestore";

//Root layout that contains component necessary to upload files to cloud storage
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
    );
  }