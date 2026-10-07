import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Section01BigPicture } from './components/Section01BigPicture';
import { Section02MakeItPersonal } from './components/Section02MakeItPersonal';
import { Section03ChangePlaybook } from './components/Section03ChangePlaybook';
import { BehindTheNumbers } from './components/BehindTheNumbers';
import { Section05Leaderboard } from './components/Section05Leaderboard';
import { Footer } from './components/Footer';
import { QuizModal } from './components/QuizModal';

export function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  return (
    <div className="min-h-screen bg-[#f9f6ee] text-[#23201d] font-sans selection:bg-[#faecc2] selection:text-[#583794]">
      {/* Sticky Header */}
      <Navbar onStartQuiz={() => setIsQuizOpen(true)} />

      {/* Main Content */}
      <main className="space-y-4">
        <HeroSection onStartQuiz={() => setIsQuizOpen(true)} />
        <Section01BigPicture />
        <Section02MakeItPersonal />
        <Section03ChangePlaybook />
        <BehindTheNumbers />
        <Section05Leaderboard
          key={leaderboardKey}
          onStartQuiz={() => setIsQuizOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* 15-Question Quiz Modal */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onScoreSaved={() => setLeaderboardKey((prev) => prev + 1)}
      />
    </div>
  );
}

export default App;
