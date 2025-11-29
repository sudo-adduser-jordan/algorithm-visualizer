import { AlgorithmProvider } from "@/context/AlgorithmContext";

export default function GraphLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
