import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Lakshitography — Slow, intimate photography",
  description:
    "Capturing moments that feel like home. Couples, small families, and quiet gatherings, shot slowly and without staging.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
