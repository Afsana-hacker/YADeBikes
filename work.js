import React, { useState } from 'react';
import { 
  BookOpen, 
  AlertTriangle, 
  CheckSquare, 
  Palette, 
  Plus, 
  Trash2, 
  Check, 
  BookMarked,
  Sparkles
} from 'lucide-react';

export default function CADiaryApp() {
  // Theme state: 'dark', 'emerald', 'sepia'
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('mistakes');

  // Daily Word State
  const [words, setWords] = useState([
    { id: 1, date: '2026-08-02', word: 'Prudence', meaning: 'Exercising caution when making accounting estimates under conditions of uncertainty.', notes: 'Key concept in Financial Accounting.' }
  ]);
  const [newWord, setNewWord] = useState({ word: '', meaning: '', notes: '' });

  // Mistakes Log State (ICAP PRC Specific)
  const [mistakes, setMistakes] = useState([
    { id: 1, subject: 'PRC-1 (Business Communication)', chapter: 'Ch 3: Business Letters', error: 'Confused formal salutation rules in official memo layout.', fix: 'Review structural layout of formal memos in study text.' },
    { id: 2, subject: 'PRC-2 (Quantitative Methods)', chapter: 'Ch 7: Financial Mathematics', error: 'Used simple interest formula instead of compound annuity formula.', fix: 'Re-read the question carefully for compounding period terms.' },
    { id: 3, subject: 'PRC-3 (Principles of Financial Accounting)', chapter: 'Ch 5: Bank Reconciliation', error: 'Debited unpresented cheques instead of crediting them in revised ledger.', fix: 'Remember: Unpresented cheques are added back to bank statement balance.' }
  ]);
  const [newMistake, setNewMistake] = useState({ subject: 'PRC-1 (Business Communication)', chapter: '', error: '', fix: '' });

  // Lectures / To-Do State
  const [tasks, setTasks] = useState([
    { id: 1, subject: 'PRC-2', title: 'Watch Lecture 14 - Calculus Derivatives', completed: true },
    { id: 2, subject: 'PRC-3', title: 'Complete Chapter 4 Question Bank', completed: false }
  ]);
  const [newTask, setNewTask] = useState({ subject: 'PRC-1', title: '' });

  // Theme Styles Configuration
  const themeStyles = {
    dark: {
      bg: 'bg-slate-950',
      cardBg: 'bg-slate-900',
      border: 'border-slate-800',
      text: 'text-slate-100',
      textMuted: 'text-slate-400',
      accent: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      accentBorder: 'border-indigo-500',
      tabActive: 'bg-indigo-600 text-white',
      inputBg: 'bg-slate-800 border-slate-700 text-slate-100',
      badge: 'bg-indigo-950 text-indigo-300 border-indigo-800'
    },
    emerald: {
      bg: 'bg-emerald-950',
      cardBg: 'bg-emerald-900/80',
      border: 'border-emerald-800',
      text: 'text-emerald-50',
      textMuted: 'text-emerald-300/70',
      accent: 'bg-teal-600 hover:bg-teal-500 text-white',
      accentBorder: 'border-teal-400',
      tabActive: 'bg-teal-600 text-white',
      inputBg: 'bg-emerald-800/60 border-emerald-700 text-emerald-100',
      badge: 'bg-teal-950 text-teal-300 border-teal-800'
    },
    sepia: {
      bg: 'bg-[#1c1816]',
      cardBg: 'bg-[#28221e]',
      border: 'border-[#3a322c]',
      text: 'text-[#f0e6df]',
      textMuted: 'text-[#a89a90]',
      accent: 'bg-amber-700 hover:bg-amber-600 text-white',
      accentBorder: 'border-amber-600',
      tabActive: 'bg-amber-700 text-white',
      inputBg: 'bg-[#332b25] border-[#473c34] text-[#f0e6df]',
      badge: 'bg-amber-950 text-amber-300 border-amber-800'
    }
  };

  const currentTheme = themeStyles[theme];

  // Add Handlers
  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord.word || !newWord.meaning) return;
    setWords([...words, { ...newWord, id: Date.now(), date: new Date().toISOString().split('T')[0] }]);
    setNewWord({ word: '', meaning: '', notes: '' });
  };

  const handleAddMistake = (e) => {
    e.preventDefault();
    if (!newMistake.chapter || !newMistake.error) return;
    setMistakes([...mistakes, { ...newMistake, id: Date.now() }]);
    setNewMistake({ subject: 'PRC-1 (Business Communication)', chapter: '', error: '', fix: '' });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    setNewTask({ subject: 'PRC-1', title: '' });
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300 font-sans p-4 sm:p-6 md:p-8`}>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header & Theme Selector */}
        <header className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} shadow-xl backdrop-blur-md gap-4`}>
          <div>
            <div className="flex items-center gap-2">
              <BookMarked className="w-7 h-7 text-indigo-400" />
              <h1 className="text-2xl font-bold tracking-tight">ICAP PRC Student Diary</h1>
            </div>
            <p className={`text-sm mt-1 ${currentTheme.textMuted}`}>
              Track your daily preparations, mistakes, and lecture targets.
            </p>
          </div>

          {/* Theme Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto bg-black/20 p-1.5 rounded-xl border border-white/5">
            <Palette className="w-4 h-4 ml-2 text-slate-400" />
            <span className="text-xs font-semibold mr-1">Theme:</span>
            <button 
              onClick={() => setTheme('dark')} 
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${theme === 'dark' ? 'bg-indigo-600 text-white' : 'hover:bg-white/5'}`}
            >
              Midnight
            </button>
            <button 
              onClick={() => setTheme('emerald')} 
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${theme === 'emerald' ? 'bg-teal-600 text-white' : 'hover:bg-white/5'}`}
            >
              Emerald
            </button>
            <button 
              onClick={() => setTheme('sepia')} 
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${theme === 'sepia' ? 'bg-amber-700 text-white' : 'hover:bg-white/5'}`}
            >
              Sepia
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
          <button 
            onClick={() => setActiveTab('mistakes')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition ${activeTab === 'mistakes' ? currentTheme.tabActive : 'opacity-70 hover:opacity-100'}`}
          >
            <AlertTriangle className="w-4 h-4" />
            Mistakes Tracker
          </button>

          <button 
            onClick={() => setActiveTab('words')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition ${activeTab === 'words' ? currentTheme.tabActive : 'opacity-70 hover:opacity-100'}`}
          >
            <Sparkles className="w-4 h-4" />
            Daily Vocabulary & Terms
          </button>

          <button 
            onClick={() => setActiveTab('lectures')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition ${activeTab === 'lectures' ? currentTheme.tabActive : 'opacity-70 hover:opacity-100'}`}
          >
            <CheckSquare className="w-4 h-4" />
            Lectures & To-Do List
          </button>
        </nav>

        {/* TAB 1: MISTAKES TRACKER */}
        {activeTab === 'mistakes' && (
          <div className="space-y-6">
            {/* Form */}
            <form onSubmit={handleAddMistake} className={`p-6 rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} space-y-4 shadow-lg`}>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5" /> Log a Study Mistake
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-80">Subject</label>
                  <select 
                    value={newMistake.subject}
                    onChange={(e) => setNewMistake({ ...newMistake, subject: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  >
                    <option value="PRC-1 (Business Communication)">PRC-1 (Business Comm.)</option>
                    <option value="PRC-2 (Quantitative Methods)">PRC-2 (Quantitative Methods)</option>
                    <option value="PRC-3 (Principles of Financial Accounting)">PRC-3 (Accounting)</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium mb-1 opacity-80">Chapter / Topic</label>
                  <input 
                    type="text"
                    placeholder="e.g. Chapter 4: Time Value of Money"
                    value={newMistake.chapter}
                    onChange={(e) => setNewMistake({ ...newMistake, chapter: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-80">What error did you make?</label>
                  <textarea 
                    rows={2}
                    placeholder="Describe the mistake clearly..."
                    value={newMistake.error}
                    onChange={(e) => setNewMistake({ ...newMistake, error: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-80">Correct Concept / Remedy</label>
                  <textarea 
                    rows={2}
                    placeholder="How to solve it correctly next time..."
                    value={newMistake.fix}
                    onChange={(e) => setNewMistake({ ...newMistake, fix: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  />
                </div>
              </div>
              <button type="submit" className={`w-full py-2.5 rounded-xl font-medium transition ${currentTheme.accent}`}>
                Save Mistake to Log
              </button>
            </form>

            {/* Mistakes Table Log */}
            <div className={`rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} overflow-hidden shadow-lg`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className={`border-b ${currentTheme.border} bg-black/20 text-xs font-semibold uppercase tracking-wider`}>
                      <th className="p-4">Subject</th>
                      <th className="p-4">Chapter</th>
                      <th className="p-4">Mistake Made</th>
                      <th className="p-4">Correct Approach</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${currentTheme.border}`}>
                    {mistakes.map((m) => (
                      <tr key={m.id} className="hover:bg-white/5 transition">
                        <td className="p-4 align-top font-semibold">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-xs border ${currentTheme.badge}`}>
                            {m.subject.split(' ')[0]}
                          </span>
                        </td>
                        <td className="p-4 align-top font-medium opacity-90">{m.chapter}</td>
                        <td className="p-4 align-top text-rose-300/90">{m.error}</td>
                        <td className="p-4 align-top text-emerald-300/90">{m.fix}</td>
                        <td className="p-4 align-top text-center">
                          <button 
                            onClick={() => setMistakes(mistakes.filter(x => x.id !== m.id))}
                            className="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {mistakes.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center opacity-50">No mistakes logged yet. Keep practicing!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DAILY WORD & TERMS */}
        {activeTab === 'words' && (
          <div className="space-y-6">
            <form onSubmit={handleAddWord} className={`p-6 rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} space-y-4 shadow-lg`}>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Daily Word or Financial Term
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-80">Word / Term</label>
                  <input 
                    type="text"
                    placeholder="e.g. Materiality"
                    value={newWord.word}
                    onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium mb-1 opacity-80">Definition / Meaning</label>
                  <input 
                    type="text"
                    placeholder="Clear definition or exam context..."
                    value={newWord.meaning}
                    onChange={(e) => setNewWord({ ...newWord, meaning: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  />
                </div>
              </div>
              <button type="submit" className={`w-full py-2.5 rounded-xl font-medium transition ${currentTheme.accent}`}>
                Add Word to Diary
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {words.map((item) => (
                <div key={item.id} className={`p-5 rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} space-y-2 relative shadow-md`}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-indigo-300">{item.word}</h3>
                    <span className="text-xs opacity-50">{item.date}</span>
                  </div>
                  <p className="text-sm opacity-90">{item.meaning}</p>
                  {item.notes && <p className="text-xs opacity-60 italic">Note: {item.notes}</p>}
                  <button 
                    onClick={() => setWords(words.filter(w => w.id !== item.id))}
                    className="absolute bottom-4 right-4 p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LECTURES & TO-DO LIST */}
        {activeTab === 'lectures' && (
          <div className="space-y-6">
            <form onSubmit={handleAddTask} className={`p-6 rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} space-y-4 shadow-lg`}>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Lecture Target
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1 opacity-80">Subject</label>
                  <select 
                    value={newTask.subject}
                    onChange={(e) => setNewTask({ ...newTask, subject: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  >
                    <option value="PRC-1">PRC-1</option>
                    <option value="PRC-2">PRC-2</option>
                    <option value="PRC-3">PRC-3</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium mb-1 opacity-80">Task / Lecture Title</label>
                  <input 
                    type="text"
                    placeholder="e.g. Watch Accounting Ch 6 Lecture 3 & take notes"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border text-sm outline-none ${currentTheme.inputBg}`}
                  />
                </div>
              </div>
              <button type="submit" className={`w-full py-2.5 rounded-xl font-medium transition ${currentTheme.accent}`}>
                Add to Checklist
              </button>
            </form>

            <div className={`p-6 rounded-2xl ${currentTheme.cardBg} border ${currentTheme.border} space-y-3 shadow-lg`}>
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`flex items-center justify-between p-3.5 rounded-xl border ${currentTheme.border} transition ${task.completed ? 'opacity-40 bg-black/10' : 'bg-white/5'}`}
                >
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition ${task.completed ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-white/30'}`}
                    >
                      {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                    <span className={`px-2 py-0.5 rounded text-xs border ${currentTheme.badge}`}>
                      {task.subject}
                    </span>
                    <span className={`text-sm ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <button 
                    onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                    className="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-center opacity-50 py-4">No pending lectures or tasks!</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}