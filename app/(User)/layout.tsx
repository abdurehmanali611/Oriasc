import type { Metadata } from "next";
import Spinner from "@/components/Spinner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ORIASC",
  description: "Oromia Region Islamic Affairs Supreme Council",
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Spinner />
      <Header />
      <main className="mt-20">{children}</main>
      <Footer />
    </div>
  );
}
