import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronLeft, ChevronRight, Layers, FileText, Info } from 'lucide-react';
import { flashcardsData } from '../data/chapters';
import { Flashcard } from '../types';

interface FlashcardsProps {
  favoriteIds: string[];
}

export default function Flashcards({ favoriteIds }: FlashcardsProps) {
  const [currentIndex, setCurrentDigit] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'term' | 'law'>('all');
  const [chapterFilter, setChapterFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtering logic
  const filteredCards = flashcardsData.filter((card) => {
    const matchesCategory = categoryFilter === 'all' || card.category === categoryFilter;
    const matchesChapter = chapterFilter === 'all' || card.chapterId === chapterFilter;
    const matchesSearch =
      card.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.definition.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesChapter && matchesSearch;
  });

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentDigit((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentDigit((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const handleFilterChange = () => {
    setCurrentDigit(0);
    setIsFlipped(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800">بطاقات الاستذكار الذكية (Flashcards)</h2>
          <p className="text-sm text-slate-500">
            طريقة ممتعة وفعالة لمراجعة المصطلحات والقوانين الفيزيائية الهامة في منهج الشهادة الثانوية.
          </p>
        </div>

        {/* Filter Indicators */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setCategoryFilter('all');
              handleFilterChange();
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              categoryFilter === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            الكل ({flashcardsData.length})
          </button>
          <button
            onClick={() => {
              setCategoryFilter('term');
              handleFilterChange();
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              categoryFilter === 'term'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            مصطلحات وفهم
          </button>
          <button
            onClick={() => {
              setCategoryFilter('law');
              handleFilterChange();
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
              categoryFilter === 'law'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            قوانين رياضية
          </button>
        </div>
      </div>

      {/* Advanced search and dropdown filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="ابحث عن مصطلح، قانون، أو تعريف..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange();
            }}
            className="w-full pl-4 pr-10 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0c4a6e] focus:ring-1 focus:ring-[#0c4a6e] transition shadow-sm"
          />
        </div>

        <div>
          <select
            value={chapterFilter}
            onChange={(e) => {
              setChapterFilter(e.target.value);
              handleFilterChange();
            }}
            className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0c4a6e] transition text-slate-700 font-bold"
          >
            <option value="all">تصفية حسب الباب: المنهج كاملاً</option>
            <option value="chap-1">الباب الأول: حركة الكواكب والأقمار</option>
            <option value="chap-2">الباب الثاني: الحركة الاهتزازية والضوء</option>
            <option value="chap-3">الباب الثالث: المغناطيسية والكهرباء</option>
            <option value="chap-4">الباب الرابع: الفيزياء الحديثة والالكترونيات</option>
          </select>
        </div>
      </div>

      {/* Main Flashcard interface */}
      {filteredCards.length > 0 && currentCard ? (
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Card perspective container */}
          <div
            className="w-full h-80 cursor-pointer group"
            style={{ perspective: '1000px' }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div
              className="relative w-full h-full duration-500 rounded-3xl"
              style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
              }}
            >
              {/* Card Front */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-slate-50 p-8 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-md"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-bold">
                    <Layers className="w-3.5 h-3.5" />
                    {currentCard.category === 'term' ? 'مصطلح علمي' : 'قانون فيزيائي'}
                  </span>
                  <span>الباب {currentCard.chapterId === 'chap-1' ? 'الأول' : currentCard.chapterId === 'chap-2' ? 'الثاني' : currentCard.chapterId === 'chap-3' ? 'الثالث' : 'الرابع'}</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <h3 className="text-2xl font-black text-slate-800 leading-tight">
                    {currentCard.term}
                  </h3>
                  {currentCard.category === 'law' && currentCard.formula && (
                    <div className="mt-3 px-3 py-1 bg-[#0c4a6e]/10 rounded-full font-mono text-xs text-[#0c4a6e] font-bold">
                      {currentCard.formula}
                    </div>
                  )}
                </div>

                <div className="text-center text-xs text-slate-400 font-bold">
                  انقر لقلب البطاقة ورؤية التعريف المقابل
                </div>
              </div>

              {/* Card Back */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-sky-50 to-blue-50 p-8 rounded-3xl border border-sky-200 flex flex-col justify-between shadow-md text-sky-950"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="flex justify-between items-center text-xs text-sky-600/80">
                  <span className="flex items-center gap-1 font-bold">
                    <FileText className="w-3.5 h-3.5" />
                    التعريف الرياضي أو الفهم
                  </span>
                  <span>البطاقة {currentIndex + 1} من {filteredCards.length}</span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                  <p className="text-lg text-sky-900 font-bold leading-relaxed">
                    {currentCard.definition}
                  </p>
                </div>

                <div className="text-center text-xs text-sky-600 font-bold">
                  انقر للرجوع إلى وجه البطاقة
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-6 px-4">
            <button
              onClick={handlePrev}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-700 transition-all shadow-sm active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <span className="text-sm font-bold text-slate-500">
              {currentIndex + 1} من {filteredCards.length}
            </span>

            <button
              onClick={handleNext}
              className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-slate-700 transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
          <Info className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-bold">لم يتم العثور على أي بطاقات تطابق معايير التصفية الحالية.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setChapterFilter('all');
              setCategoryFilter('all');
            }}
            className="mt-3 text-xs text-primary font-bold hover:underline"
          >
            إعادة تعيين مرشحات البحث
          </button>
        </div>
      )}
    </div>
  );
}
