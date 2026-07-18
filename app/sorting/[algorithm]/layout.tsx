import { AlgorithmProvider } from "@/components/AlgorithmContext";

export async function generateStaticParams() {
  return [
    { algorithm: 'bubbleSort' },
    { algorithm: 'selectionSort' },
    { algorithm: 'insertionSort' },
    { algorithm: 'mergeSort' },
    { algorithm: 'quickSort' },
    { algorithm: 'heapSort' },
  ];
}

export default function VisualizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
