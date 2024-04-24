import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navrbar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-h-dvh">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
