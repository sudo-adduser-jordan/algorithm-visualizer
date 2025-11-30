import { AlgorithmProvider } from "@/components/AlgorithmContext";

export async function generateStaticParams() {
  return [
    { algorithm: 'dfs' },
    { algorithm: 'bfs' },
    { algorithm: 'dijkstra' },
  ];
}

export default function GraphLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
