import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Urdu Document Assistant",
  description: "AI-powered Urdu OCR and Translation Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        {children}

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />

      </body>
    </html>
  );
}