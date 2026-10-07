import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, Search, Tag, ChefHat, Calculator } from 'lucide-react';
import { BAKING_JOURNAL_ARTICLES } from '../data/bakingJournalData';

export default function BakingJournalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Baking Science',
    'Frosting & Ganache',
    'Tiered Engineering',
    'Food Safety & Operations',
    'Event Planning'
  ];

  const filteredArticles = BAKING_JOURNAL_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 md:py-16 space-y-14 bg-stone-50 min-h-screen">
      {/* Header Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold uppercase tracking-wider border border-amber-200">
          <BookOpen className="w-3.5 h-3.5 text-amber-800" />
          <span>DAOS Cakes Pastry Science &amp; Technical Compendium</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          The Artisanal Baking Journal
        </h1>

        <p className="text-lg sm:text-xl text-stone-700 max-w-3xl mx-auto leading-relaxed">
          In-depth technical guides, pastry chemistry tutorials, structural cake engineering blueprints, and field-tested kitchen protocols written from our scratch bakery studio in Smyrna, Georgia.
        </p>

        {/* Search & Filter Controls */}
        <div className="pt-4 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic (e.g., Swiss meringue, dowels, ganache, red velvet)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-stone-300 text-stone-900 text-sm focus:outline-hidden focus:border-amber-700 shadow-2xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-800 text-amber-50 shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-300 hover:text-amber-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-3xl border border-stone-200 p-7 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
                    <Tag className="w-3 h-3 text-amber-800" />
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-700" />
                      {article.readTimeMinutes} min read
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {article.updatedDate}
                    </span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                  <Link to={`/baking-journal/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {article.summary}
                </p>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                    Key Technical Takeaways:
                  </span>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-stone-700">
                    {article.keyTakeaways.slice(0, 2).map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <ChefHat className="w-4 h-4 text-amber-800" />
                  <span>{article.author}</span>
                </div>

                <Link
                  to={`/baking-journal/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 group-hover:text-amber-900"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Cross-Link to Interactive Baking Calculators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 border border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/90 px-3 py-1 rounded-full border border-amber-800">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Pastry Engineering Utilities</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Need Exact Gram Weights, Pan Conversions, or Ganache Ratios?
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              Use our free interactive Baker&apos;s Percentage Formulator, Cake Pan Volume Scaling Calculator, and Chocolate Ganache Emulsion Tool.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/baking-calculators"
              className="px-6 py-3.5 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm transition-all inline-flex items-center gap-2"
            >
              <span>Open Baking Calculators</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/pricing-estimator"
              className="px-6 py-3.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold text-sm border border-stone-700 transition-all"
            >
              <span>Custom Cake Price Estimator</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
