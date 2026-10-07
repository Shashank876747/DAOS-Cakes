import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  ChefHat,
  CheckCircle2,
  Lightbulb,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Tag
} from 'lucide-react';
import { BAKING_JOURNAL_ARTICLES } from '../data/bakingJournalData';

export default function BakingArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = BAKING_JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/baking-journal" replace />;
  }

  const relatedArticles = BAKING_JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="py-10 md:py-16 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/baking-journal"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-white border border-stone-200 hover:bg-amber-800 hover:text-white hover:border-amber-800 text-stone-700 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Baking Journal</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Link to="/" className="hover:text-amber-800 underline">Home</Link>
            <span>/</span>
            <Link to="/baking-journal" className="hover:text-amber-800 underline">Baking Journal</Link>
            <span>/</span>
            <span className="text-stone-800 font-medium truncate max-w-[200px]">{article.category}</span>
          </div>
        </nav>

        {/* Main Article Card */}
        <article className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 md:p-12 shadow-xs space-y-10">
          {/* Article Header */}
          <header className="space-y-5 border-b border-stone-200 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-200">
                <Tag className="w-3.5 h-3.5 text-amber-800" />
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-stone-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                {article.readTimeMinutes} minute technical read
              </span>
              <span className="inline-flex items-center gap-1 text-stone-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                Updated {article.updatedDate}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
              {article.subtitle}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-800 text-amber-100 flex items-center justify-center shrink-0">
                <ChefHat className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">{article.author}</div>
                <div className="text-xs text-stone-500">{article.authorRole} • Published {article.publishedDate}</div>
              </div>
            </div>
          </header>

          {/* Executive Summary & Key Takeaways Box */}
          <section className="bg-amber-50/70 rounded-2xl p-6 sm:p-8 border border-amber-200 space-y-4">
            <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-800" />
              <span>Executive Summary &amp; Core Takeaways</span>
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed">
              {article.summary}
            </p>
            <ul className="space-y-2.5 pt-2">
              {article.keyTakeaways.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Main Article Body Sections */}
          <div className="space-y-10">
            {article.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {sec.heading}
                </h2>

                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-stone-700 text-sm sm:text-base leading-relaxed">
                    {p}
                  </p>
                ))}

                {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                  <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-stone-700 bg-stone-50 p-5 rounded-2xl border border-stone-200">
                    {sec.bulletPoints.map((bp, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">{bp}</li>
                    ))}
                  </ul>
                )}

                {sec.table && (
                  <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-2xs my-4">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-stone-900 text-amber-50">
                          {sec.table.headers.map((th, thIdx) => (
                            <th key={thIdx} className="p-3.5 font-bold border-b border-stone-700">
                              {th}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 bg-white">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-stone-50/70'}>
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3.5 text-stone-700 leading-relaxed ${
                                  cIdx === 0 ? 'font-bold text-stone-900' : ''
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sec.proTip && (
                  <div className="bg-stone-900 text-stone-100 p-5 sm:p-6 rounded-2xl border border-stone-800 flex items-start gap-3.5">
                    <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm leading-relaxed">
                      <strong className="text-amber-300 uppercase tracking-wider block mb-1">
                        Pastry Chef Studio Pro-Tip:
                      </strong>
                      {sec.proTip}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Technical FAQ Section */}
          {article.faq.length > 0 && (
            <section className="pt-8 border-t border-stone-200 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-amber-800" />
                <span>Frequently Asked Technical Questions</span>
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {article.faq.map((item, fIdx) => (
                  <div key={fIdx} className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
                    <h3 className="font-serif font-bold text-stone-900 text-base">
                      {item.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Related Articles */}
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Continue Reading in the Baking Journal
            </h2>
            <Link to="/baking-journal" className="text-xs sm:text-sm font-bold text-amber-800 hover:underline flex items-center gap-1">
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/baking-journal/${rel.slug}`}
                className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-amber-300 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                    {rel.category}
                  </span>
                  <h3 className="font-serif text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                    {rel.title}
                  </h3>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-800">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
