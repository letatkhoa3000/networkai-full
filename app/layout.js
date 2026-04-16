import "./globals.css";

export const metadata = {
  title: "NetworkAI | Amazing Solutions",
  description:
    "NetworkAI provides ELV, IT infrastructure, Smart Building, and Network Intelligence solutions for hospitality and enterprise projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}