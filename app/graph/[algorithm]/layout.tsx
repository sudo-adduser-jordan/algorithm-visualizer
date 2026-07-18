import { AlgorithmProvider } from "@/components/AlgorithmContext";

export async function generateStaticParams() {
  return [
    { algorithm: 'dfs' },
    { algorithm: 'bfs' },
    { algorithm: 'dijkstra' },
    { algorithm: 'topologicalSort' },
  ];
}

export default function GraphLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
