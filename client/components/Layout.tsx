import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-foreground w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
