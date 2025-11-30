import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  glossaryTerms,
  getGlossaryTermBySlug,
  getRelatedTerms,
} from "@/lib/glossary/glossary";

export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    term: term.slug,
  }));
}

export default async function GlossaryTermPage({
  params,
}: {
  params: {
    term: string;
  }
}) {

  // Await params if it's a promise
  const resolvedParams = await Promise.resolve(params);
  const { term } = resolvedParams;
    const data = getGlossaryTermBySlug(term);

  if (!data) {
    notFound();
  }

  const relatedTerms = getRelatedTerms(data.slug);

  return (
    <Layout title={data.term} subtitle={data.shortDefinition}>
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link
                href="/glossary"
                className="text-gray-500 hover:text-gray-700"
              >
                Glossary
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-blue-600 font-medium">{data.term}</li>
          </ol>
        </nav>

        <div className="card p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="badge badge-info capitalize">
                {data.category}
              </span>
              <h1 className="heading-xl mt-2">{data.term}</h1>
            </div>

            <Link
              href="/glossary"
              className="btn btn-secondary flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Glossary
            </Link>
          </div>

          <div className="prose prose-lg max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: data.fullDefinition }}
              className="text-gray-700"
            />
          </div>

          {data.examples && (
            <div className="mt-8">
              <h2 className="heading-lg mb-4">Examples</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <ul className="list-disc pl-6 space-y-3 text-gray-700">
                  {data.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {data.codeExample && (
            <div className="mt-8">
              <h2 className="heading-lg mb-4">Code Example</h2>
              <div className="bg-gray-900 text-white rounded-lg p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code>{data.codeExample}</code>
                </pre>
              </div>
            </div>
          )}

          {data.visualAid && (
            <div className="mt-8">
              <h2 className="heading-lg mb-4">Visual Explanation</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div dangerouslySetInnerHTML={{ __html: data.visualAid }} />
              </div>
            </div>
          )}
        </div>

        {relatedTerms.length > 0 && (
          <div className="card p-6 mb-8">
            <h2 className="heading-md mb-4">Related Terms</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedTerms.map((relatedTerm) => (
                <Link
                  key={relatedTerm.slug}
                  href={`/glossary/${relatedTerm.slug}`}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 hover:border-gray-300 transition duration-200"
                >
                  <h3 className="heading-sm">{relatedTerm.term}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {relatedTerm.shortDefinition}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="card p-6 mb-8">
          <h2 className="heading-md mb-4">Further Learning</h2>
          <p className="text-gray-600 mb-4">
            Want to see these concepts in action?
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/sorting" className="btn btn-primary">
              Explore Sorting Algorithms
            </Link>
            <Link href="/searching" className="btn btn-primary">
              Explore Searching Algorithms
            </Link>
            <Link href="/graph" className="btn btn-primary">
              Explore Graph Algorithms
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
