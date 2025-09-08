import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logroñam",
  description: "Discover the best pintxos and bars in Logroño",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
