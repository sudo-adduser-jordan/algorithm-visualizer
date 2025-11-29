import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { availableAlgorithms } from "@/lib/algorithms/metadata";


// Define type for card properties
type CardProps = {
  color: string;
  textColor: string;
  icon: string;
  description: string;
};

export default function AboutPage() {

  // Get unique difficulties and count algorithms per difficulty
  const difficultyData = Object.entries(
    Object.entries(availableAlgorithms).reduce((acc, [, algorithm]) => {
      const { difficulty } = algorithm;
      if (!acc[difficulty]) {
        acc[difficulty] = {
          count: 0,
          label: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
        };
      }
      acc[difficulty].count++;
      return acc;
    }, {} as Record<string, { count: number; label: string }>)
  );

  // Define colors and descriptions for each difficulty
  const difficultyCardProps: Record<string, CardProps> = {
    easy: { // sort 
      color: "bg-green-50 border-green-200",
      textColor: "text-green-800",
      icon: "✓",
      description: "Sorting algorithms are methods for reorganizing a sequence of items into a specific order, typically in ascending or descending order.",
    },
    medium: { // search
      color: "bg-yellow-50 border-yellow-200",
      textColor: "text-yellow-800",
      icon: "⚠",
      description: "Searching algorithms are methods used to find specific items within a data structure. They are fundamental to many computational tasks and help find elements efficiently.",
    },
    hard: { // path
      color: "bg-red-50 border-red-200",
      textColor: "text-red-800",
      icon: "!",
      description: "Graph algorithms are procedures to search, detect cyles, or understand network cycles in node and vertex graphs.",
    },
  };


  return (
    <Layout
      title="About Algorithm Visualizer"
      subtitle="Interactive visualizations to help you understand how algorithms work step-by-step."
    >

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {difficultyData.map((difficulty) => {
          const label = difficulty[1].label.toLowerCase();
          const count = difficulty[1].count;

          // Get card props with fallback for unknown difficulties
          const cardProps = difficultyCardProps[label] || {
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
        
        <section className="mb-8">
        
        </section>

        <section className="mb-8">
          <h2 className="heading-lg mb-4 ">
            Technological Infrastructure
          </h2>
          <p className=" mb-4">
            Our platform orchestrates a symphony of contemporary web
            technologies, meticulously integrated to deliver an immersive
            educational experience that balances computational robustness with
            interface elegance:
          </p>
          <ul className="list-disc pl-6 ">
            <li>
              React.js for declarative component architecture and state
              management
            </li>
            <li>
              Next.js for enhanced rendering strategies and navigation
              optimization
            </li>
            <li>
              TypeScript for compile-time type safety and enhanced development
              integrity
            </li>
            <li>
              Tailwind CSS for utility-first styling with consistent design
              language
            </li>
            <li>
              Client-side persistence via localStorage for maintaining session
              continuity
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
  )
}
