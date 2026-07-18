import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { availableAlgorithms } from "@/lib/algorithms/data";

// Define type for card properties
type CardProps = {
  color: string;
  textColor: string;
  icon: string;
  description: string;
};

export default function AboutPage() {
  // Get unique difficulties and count algorithms per difficulty
  const categoryData = Object.entries(
    Object.entries(availableAlgorithms).reduce((acc, [, algorithm]) => {
      const { category } = algorithm;
      if (!acc[category]) {
        acc[category] = {
          count: 0,
          label: category.charAt(0).toUpperCase() + category.slice(1),
        };
      }
      acc[category].count++;
      return acc;
    }, {} as Record<string, { count: number; label: string }>)
  );

  // Define colors and descriptions for each category
  const categoryCardProps: Record<string, CardProps> = {
    sorting: {
      // sort
      color: "bg-green-50 border-green-200",
      textColor: "text-green-800",
      icon: "✓",
      description:
        "Sorting algorithms are methods for reorganizing a sequence of items into a specific order, typically in ascending or descending order.",
    },
    searching: {
      // search
      color: "bg-yellow-50 border-yellow-200",
      textColor: "text-yellow-800",
      icon: "⚠",
      description:
        "Searching algorithms are methods used to find specific items within a data structure. They are fundamental to many computational tasks and help find elements efficiently.",
    },
    graph: {
      // path
      color: "bg-red-50 border-red-200",
      textColor: "text-red-800",
      icon: "!",
      description:
        "Graph algorithms are procedures to search, detect cyles, or understand network cycles in node and vertex graphs.",
    },
  };

  return (
    <Layout
      title="About "
      subtitle="Algorithm Visualizer"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {categoryData.map((difficulty) => {
          const label = difficulty[1].label.toLowerCase();
          const count = difficulty[1].count;

          // Get card props with fallback for unknown difficulties
          const cardProps = categoryCardProps[label] || {
            color: "bg-gray-50 border-gray-200",
            textColor: "text-gray-800",
            icon: "?",
            description: "Algorithms with unknown difficulty level.",
          };

          return (
            <Link
              key={label}
              href={`/${label}`}
              className={`block ${cardProps.color} border-2 rounded-lg p-6 hover:shadow-md transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`heading-lg ${cardProps.textColor} capitalize`}>
                  {label}
                </h2>
                <span className={`text-2xl ${cardProps.textColor}`}>
                  {cardProps.icon}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{cardProps.description}</p>
              <div className="mt-auto flex justify-between items-center">
                <span className="badge badge-info">
                  {count} algorithm{count !== 1 ? "s" : ""}
                </span>
                <span
                  className={`${cardProps.textColor} font-medium flex items-center`}
                >
                  View All
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto">
        <section className="mb-8"></section>

        <section className="mb-8">
          <h2 className="heading-lg mb-4 ">Technological Infrastructure</h2>
          <p className=" mb-4">
            This website uses the following technologies:
          </p>
          <ul className="list-disc pl-6 ">
            <li>
              React.js 
            </li>
            <li>
              Next.js
            </li>
            <li>
              TypeScript
            </li>
            <li>
              Tailwind CSS 
            </li>
            <li>
              Static site generation for optimal performance 
            </li>
          </ul>
        </section>

        <div className="mt-12 text-center">
          <Link href="/" className="btn btn-primary px-6 py-3">
            Explore Algorithms
          </Link>
        </div>
      </div>
    </Layout>
  );
}
