"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";
import { AlgorithmVisualization } from "@/lib/types";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  algorithmData?: AlgorithmVisualization;
}

export default function Layout({
  children,
  title,
  subtitle,
}: LayoutProps) {

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="grow">
        {(title || subtitle) && (
          <div className="bg-gray-50 border-b">
            <div className="container-content py-8">
              {title && <h1 className="heading-xl">{title}</h1>}
              {subtitle && (
                <p className="mt-2 text-gray-600 max-w-3xl">{subtitle}</p>
              )}
            </div>
          </div>
        )}

        <div className="container-content py-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
