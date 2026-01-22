import { useState, useEffect } from 'react';
import { Brain, Heart, Sparkles } from 'lucide-react';

type Activity = 'idle' | 'breathing' | 'interview' | 'vibe';

const jsQuestions = [
  "Explain the difference between 'let', 'const', and 'var' in JavaScript.",
  "What is a closure in JavaScript? Provide an example.",
  "Explain event delegation and why it's useful.",
  "What's the difference between '==' and '===' in JavaScript?",
  "Explain the concept of 'hoisting' in JavaScript.",
  "What is the Event Loop and how does it work?",
  "Explain the difference between 'call', 'apply', and 'bind'.",
  "What are Promises and how do they work?",
  "Explain async/await and how it differs from Promises.",
  "What is the difference between null and undefined?",
];

const motivationalQuotes = [
  "You're doing better than you think. Keep going.",
  "Every expert was once a beginner. Be patient with yourself.",
  "Your feelings are valid. Take the time you need.",
  "Progress isn't linear. You're still moving forward.",
  "You've survived 100% of your bad days. You got this.",
  "It's okay to rest. Recovery is part of the journey.",
  "You are capable of amazing things. Believe it.",
  "Small steps are still steps. Celebrate your progress.",
];

function App() {
  const [activity, setActivity] = useState<Activity>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userFeeling, setUserFeeling] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    let interval: number;
    if (activity === 'breathing' && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (activity === 'breathing' && timeLeft === 0) {
      setActivity('idle');
      setTimeLeft(60);
    }
    return () => clearInterval(interval);
  }, [activity, timeLeft]);

  const generateTask = () => {
    const tasks: Activity[] = ['breathing', 'interview', 'vibe'];
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];

    if (randomTask === 'interview') {
      const randomQuestion = jsQuestions[Math.floor(Math.random() * jsQuestions.length)];
      setCurrentQuestion(randomQuestion);
    } else if (randomTask === 'breathing') {
      setTimeLeft(60);
    }

    setActivity(randomTask);
    setUserFeeling('');
    setQuote('');
  };

  const handleVibeSubmit = () => {
    if (userFeeling.trim()) {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setQuote(randomQuote);
    }
  };

  const resetToIdle = () => {
    setActivity('idle');
    setTimeLeft(60);
    setUserFeeling('');
    setQuote('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDI0MCwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

      <div className="relative w-full max-w-2xl">
        <div
          className="backdrop-blur-xl bg-gray-900/40 border-2 border-cyan-400 rounded-2xl p-8 shadow-2xl"
          style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
        >
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
              FocusHub
            </h1>
            <p className="text-cyan-300 text-sm tracking-widest">NEURAL RESET STATION</p>
          </div>

          {activity === 'idle' && (
            <div className="text-center space-y-6">
              <div className="flex justify-center gap-6 mb-8">
                <Brain className="w-12 h-12 text-cyan-400" />
                <Heart className="w-12 h-12 text-cyan-400" />
                <Sparkles className="w-12 h-12 text-cyan-400" />
              </div>
              <button
                onClick={generateTask}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg
                         hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105
                         shadow-lg shadow-cyan-500/50 border border-cyan-300"
              >
                GENERATE TASK
              </button>
              <p className="text-gray-400 text-sm">Initiate random focus protocol</p>
            </div>
          )}

          {activity === 'breathing' && (
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">BREATHING PROTOCOL</h2>
              <div className="relative w-48 h-48 mx-auto">
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30"
                  style={{ animation: 'breathe 4s ease-in-out infinite' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">{timeLeft}</span>
                </div>
              </div>
              <p className="text-cyan-300 text-lg">Breathe in sync with the circle</p>
              <button
                onClick={resetToIdle}
                className="px-6 py-2 bg-gray-700 text-cyan-400 rounded-lg border border-cyan-400
                         hover:bg-gray-600 transition-all duration-300"
              >
                ABORT
              </button>
            </div>
          )}

          {activity === 'interview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">CODE CHALLENGE</h2>
              <div className="bg-gray-800/60 border border-cyan-400/30 rounded-lg p-6">
                <p className="text-gray-100 text-lg leading-relaxed">{currentQuestion}</p>
              </div>
              <p className="text-cyan-300 text-sm text-center">Think it through. Take your time.</p>
              <button
                onClick={resetToIdle}
                className="w-full px-6 py-2 bg-gray-700 text-cyan-400 rounded-lg border border-cyan-400
                         hover:bg-gray-600 transition-all duration-300"
              >
                BACK TO HUB
              </button>
            </div>
          )}

          {activity === 'vibe' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4 text-center">VIBE CHECK</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={userFeeling}
                  onChange={(e) => setUserFeeling(e.target.value)}
                  placeholder="How are you feeling right now?"
                  className="w-full px-4 py-3 bg-gray-800/60 border border-cyan-400/30 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400
                           focus:ring-2 focus:ring-cyan-400/20 transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleVibeSubmit()}
                />
                <button
                  onClick={handleVibeSubmit}
                  disabled={!userFeeling.trim()}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg
                           hover:from-cyan-400 hover:to-blue-500 transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/30"
                >
                  PROCESS EMOTION
                </button>
              </div>

              {quote && (
                <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-400 rounded-lg p-6 mt-4
                              animate-pulse">
                  <p className="text-cyan-100 text-lg text-center leading-relaxed">{quote}</p>
                </div>
              )}

              <button
                onClick={resetToIdle}
                className="w-full px-6 py-2 bg-gray-700 text-cyan-400 rounded-lg border border-cyan-400
                         hover:bg-gray-600 transition-all duration-300 mt-4"
              >
                BACK TO HUB
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <p className="text-cyan-400/50 text-xs tracking-wider">
            SYSTEM ONLINE // FOCUS OPTIMIZED
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
