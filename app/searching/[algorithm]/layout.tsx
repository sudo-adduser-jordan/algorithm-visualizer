import { AlgorithmProvider } from "@/components/AlgorithmContext";

export async function generateStaticParams() {
  return [
    { algorithm: 'linearSearch' },
    { algorithm: 'binarySearch' },
  ];
}

export default function SearchingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AlgorithmProvider>{children}</AlgorithmProvider>;
}
