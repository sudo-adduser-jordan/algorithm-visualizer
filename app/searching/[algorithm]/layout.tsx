import { AlgorithmProvider } from "@/context/AlgorithmContext";

export default function SearchingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
