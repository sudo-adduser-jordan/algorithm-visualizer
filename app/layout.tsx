import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"antialiased bg-slate-50 text-gray-900 min-h-screen"}>
        {children}
      </body>
    </html>
  );
}
