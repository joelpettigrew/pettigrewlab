import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tractor, 
  BookOpen, 
  Car, 
  Pill, 
  Briefcase, 
  Activity, 
  TrendingUp, 
  ChevronRight, 
  Send, 
  Sparkles,
  FlaskConical,
  Users,
  Github,
  Twitter,
  ExternalLink,
  MessageSquare,
  Quote,
  Loader2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type ProjectStatus = 'Live Beta' | 'In Development' | 'Paused' | 'Exploration';

interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  icon: React.ReactNode;
  url?: string;
  color: string;
  image?: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 'hinckley-gpt',
    title: 'President Hinckley AI',
    description: 'A conversational AI trained on the teachings, optimism, and distinct voice of Gordon B. Hinckley.',
    status: 'Live Beta',
    icon: <Quote className="w-6 h-6" />,
    url: 'https://chatgpt.com/g/g-699b08b709c4819189144422ea20526e-president-hinkley',
    color: 'blue',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'lawnmowit',
    title: 'LawnMowIT',
    description: 'The Modern OS for Lawn Care Pros. Scheduling, invoicing, and routing in one simple app.',
    status: 'Live Beta',
    icon: <Tractor className="w-6 h-6" />,
    url: 'https://lawnmowit.com',
    color: 'emerald',
    image: '/lawnmowit-hero.png'
  },
  {
    id: 'studyquest',
    title: 'StudyQuest360',
    description: 'Turn homework into a game with learning plans and concept-based progress tracking.',
    status: 'In Development',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'indigo'
  },
  {
    id: 'driver360',
    title: 'Driver360Feedback',
    description: 'Community-driven feedback on driving behavior to promote safer roads.',
    status: 'Paused',
    icon: <Car className="w-6 h-6" />,
    color: 'slate'
  },
  {
    id: 'medmanager',
    title: 'Medicine Manager',
    description: 'Track prescriptions, refills, and medication schedules for the whole family.',
    status: 'Exploration',
    icon: <Pill className="w-6 h-6" />,
    color: 'rose'
  },
  {
    id: 'teenjob',
    title: 'Teen Job Finder',
    description: 'Helping teenagers find local jobs and build real-world work experience.',
    status: 'Exploration',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'amber'
  },
  {
    id: 'healthos',
    title: 'HealthOS',
    description: 'Unified health insights from wearables, fitness, and lifestyle data.',
    status: 'Exploration',
    icon: <Activity className="w-6 h-6" />,
    color: 'cyan'
  },
  {
    id: 'allowance',
    title: 'Allowance Investor',
    description: 'A kid-friendly investing platform to learn financial literacy by doing.',
    status: 'Exploration',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'lime'
  }
];

// --- Components ---

// --- Stories for Terminal ---
const STORIES = [
  [
    "> booting pettigrewlab...",
    "> loading experiments...",
    "> checking backlog...",
    "> found 42 pending tasks",
    "> priority: HIGH",
    "> wait...",
    "> StarCraft II update detected",
    "> launching battle.net",
    "> just one quick game...",
    "> selecting Protoss",
    "> constructing additional pylons",
    "> monsters entered the room",
    "> co-op mode engaged",
    "> GL HF",
    "> defending the expansion...",
    "> GG WP",
    "> re-engaging with project",
    "> analyzing code...",
    "> realize it's 2 AM",
    "> past bedtime",
    "> emergency shutdown",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading knowledge base...",
    "> checking research papers...",
    "> found interesting book",
    "> Kindle charging...",
    "> reading 'Clean Code'...",
    "> mind blown",
    "> taking notes...",
    "> monsters want a story",
    "> reading 'The Gruffalo'...",
    "> character voices: ENABLED",
    "> monsters asleep",
    "> returning to lab",
    "> implementing new patterns",
    "> refactoring everything",
    "> code quality: +40%",
    "> yawning...",
    "> realize it's 1 AM",
    "> past bedtime",
    "> saving progress",
    "> shutting down",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> checking physical status...",
    "> energy: LOW",
    "> caffeine required",
    "> pre-workout consumed",
    "> loading gym.exe",
    "> bench press: 5x5",
    "> squatting with monsters",
    "> monsters are heavy",
    "> cardio: chasing monsters",
    "> endorphins released",
    "> returning to keyboard",
    "> typing speed: +20%",
    "> focus: MAXIMUM",
    "> building features...",
    "> testing in production...",
    "> it works!",
    "> exhaustion detected",
    "> realize it's midnight",
    "> past bedtime",
    "> powering down",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading board_game_engine...",
    "> selecting game...",
    "> 7 Wonders? [SKIP]",
    "> Ticket to Ride? [SKIP]",
    "> Citizens of the Spark? [SKIP]",
    "> Magic the Gathering? [SKIP]",
    "> Moon Colony Blood Bath? [SKIP]",
    "> Azul selected!",
    "> placing tiles...",
    "> wait...",
    "> detecting rule violations",
    "> arguing over cheating kids",
    "> frustration levels: HIGH",
    "> everyone annoyed",
    "> a monster smiles...",
    "> they know what they did",
    "> victory? questionable",
    "> realize it's 11 PM",
    "> past bedtime",
    "> cleaning up tiles",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading entertainment_center...",
    "> scanning streaming services...",
    "> The Good Place? [SKIP]",
    "> Trollhunters? [SKIP]",
    "> Lost? [SKIP]",
    "> Young Sheldon selected!",
    "> buffering...",
    "> Joel attention span: LOW",
    "> launching Clash of Clans",
    "> raiding for gold...",
    "> family laughter detected",
    "> high-volume joy",
    "> wholesome moment: 100%",
    "> credits rolling",
    "> realize it's 10:30 PM",
    "> past bedtime",
    "> no time for labs today",
    "> saving family memories",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading sports_tracker...",
    "> checking Miami Dolphins score...",
    "> sadness detected",
    "> they aren't good anymore",
    "> switching to Utah Jazz...",
    "> scanning roster...",
    "> oh no, they are tanking",
    "> this is rough",
    "> checking BYU score...",
    "> wait...",
    "> BYU is actually GOOD?",
    "> unexpected success detected",
    "> mood: CONFUSED BUT HAPPY",
    "> turning off computer",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading social_media_module...",
    "> facebook doom scrolling: ACTIVE",
    "> seeing a reel...",
    "> getting distracted...",
    "> thinking about posting it...",
    "> wait...",
    "> checking for likes? [ABORT]",
    "> man, that is unhealthy",
    "> how do you introduce kids to this?",
    "> research: like button history",
    "> created in just 2010?",
    "> mind blown",
    "> closing browser",
    "> digital detox: ENABLED",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading ping_pong_simulator...",
    "> challenge accepted: KIDS vs DAD",
    "> serving...",
    "> getting worked by both kids",
    "> skill level: MASTER MONSTERS",
    "> almost winning...",
    "> comeback detected",
    "> defeat is imminent",
    "> kids win again",
    "> dad pride: 100%",
    "> dad skill: 0%",
    "> putting away paddles",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading productivity_module...",
    "> focus: HIGH",
    "> coding session: START",
    "> wait...",
    "> 'DINNER IS READY!'",
    "> saving progress... [ABORT]",
    "> heading to kitchen",
    "> conversation: ACTIVE",
    "> discussing school and games",
    "> cleaning up...",
    "> gathering for scriptures",
    "> reading Isaiah...",
    "> kids confusion: 100%",
    "> 'what is a besom of destruction?'",
    "> explaining context...",
    "> everyone disperses",
    "> lab time: OVER",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading war_room...",
    "> Clash of Clans: ACTIVE",
    "> Clan War League: DAY 3",
    "> checking requests...",
    "> donating Electro Dragons",
    "> donating Balloons",
    "> 'I need troops!'",
    "> Cassandra donating healers",
    "> strategy meeting: KITCHEN TABLE",
    "> 'hit the #4 base'",
    "> attacking...",
    "> 3 stars!",
    "> clan chat: FIRE",
    "> war won",
    "> closing app",
    "> offline"
  ],
  [
    "> booting pettigrewlab...",
    "> loading creative_studio...",
    "> ChatGPT: ACTIVE",
    "> prompt: 'D&D character, half-orc paladin'",
    "> image generated",
    "> exporting to MakerOnline...",
    "> 3D model generated",
    "> loading Anycubic Slicer...",
    "> adding supports",
    "> coloring layers: EMERALD & GOLD",
    "> slicing...",
    "> sending to Photon Mono M5s",
    "> printing: 4 hours remaining",
    "> first layer: SUCCESS",
    "> cleaning up resin",
    "> offline"
  ]
];

const MatrixTerminal = () => {
  const [currentStoryIdx, setCurrentStoryIdx] = useState(() => Math.floor(Math.random() * STORIES.length));
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  React.useEffect(() => {
    const cursorInterval = setInterval(() => setCursorVisible(v => !v), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  React.useEffect(() => {
    const story = STORIES[currentStoryIdx];
    if (lineIdx < story.length) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, story[lineIdx]].slice(-25));
        setLineIdx(prev => prev + 1);
      }, 800 + Math.random() * 1000);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setVisibleLines([]);
        setLineIdx(0);
        // Randomize next story, avoiding immediate repeat if possible
        setCurrentStoryIdx(prev => {
          let next = Math.floor(Math.random() * STORIES.length);
          if (next === prev && STORIES.length > 1) {
            next = (next + 1) % STORIES.length;
          }
          return next;
        });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [lineIdx, currentStoryIdx]);

  return (
    <div className="fixed left-0 top-16 bottom-0 w-48 lg:w-64 bg-slate-950/90 backdrop-blur-md border-r border-white/10 p-6 font-mono text-xs text-emerald-400 overflow-hidden hidden xl:block z-40 shadow-2xl shadow-emerald-500/5">
      <div className="flex gap-1.5 mb-6 opacity-50">
        <div className="w-2 h-2 rounded-full bg-red-500/40" />
        <div className="w-2 h-2 rounded-full bg-amber-500/40" />
        <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
      </div>
      <div className="space-y-2">
        {visibleLines.map((line, i) => (
          <motion.div
            key={`${currentStoryIdx}-${i}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="break-words leading-relaxed"
          >
            {line}
          </motion.div>
        ))}
        <div className="flex items-center pt-1">
          <span className="mr-1 text-emerald-400">{">"}</span>
          <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} w-1.5 h-3.5 bg-emerald-500/80`} />
        </div>
      </div>
    </div>
  );
};

// Terminal component removed as it is now redundant with the sidebar

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const colors = {
    'Live Beta': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'In Development': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'Paused': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    'Exploration': 'bg-white/5 text-slate-400 border-white/10'
  };

  return (
    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${colors[status]}`}>
      {status}
    </span>
  );
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={onClick}
      className="glass glass-hover p-5 rounded-2xl flex flex-col h-full group relative overflow-hidden cursor-pointer"
    >
      {/* Subtle Gradient Background */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${project.color}-500/10 blur-3xl rounded-full group-hover:bg-${project.color}-500/20 transition-colors`} />
      
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2.5 rounded-xl bg-white/5 text-slate-300 group-hover:text-white transition-colors`}>
          {project.icon}
        </div>
        <StatusBadge status={project.status} />
      </div>

      <h3 className="text-lg font-display font-bold mb-1.5 group-hover:text-white transition-colors">
        {project.title}
      </h3>
      <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
        {project.description}
      </p>

      {project.image && (
        <div className="mb-4 rounded-xl overflow-hidden border border-white/5 aspect-video">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-emerald-400 transition-colors">
          View Details
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  );
};

const HinckleyChat = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "My dear friend, it is a pleasure to visit with you. How can I help you find a bit more optimism or direction today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      // Filter out the initial greeting if it's the first message to ensure the conversation starts with 'user'
      const history = messages
        .filter((m, i) => i > 0 || m.role === 'user')
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: "You are an AI embodying the personality, voice, and teachings of Gordon B. Hinckley. Your tone is exceptionally optimistic, kind, wise, and encouraging. You use phrases like 'My dear friends', 'Be smart', 'Do your best', and 'It will all work out'. You focus on virtue, hard work, and faith. Keep responses concise but impactful, as if giving a short encouraging message.",
        }
      });

      const aiText = response.text || "I'm sorry, I'm having a bit of trouble connecting right now. But remember, things have a way of working out.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "I seem to be experiencing a technical difficulty. But don't let that dampen your spirits!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[400px] bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden">
      <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none' 
                : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-slate-950/30 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask President Hinckley..."
          className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
        />
        <button 
          type="submit"
          disabled={isLoading}
          className="p-2 bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass w-full max-w-2xl rounded-[2rem] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>

        <div className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-2xl bg-${project.color}-500/10 text-${project.color}-400`}>
              {project.icon}
            </div>
            <div>
              <StatusBadge status={project.status} />
              <h2 className="text-3xl font-display font-bold mt-1">{project.title}</h2>
            </div>
          </div>

          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            {project.description}
          </p>

          {project.id === 'hinckley-gpt' ? (
            <div className="mb-8">
              <HinckleyChat />
            </div>
          ) : (
            project.image && (
              <div className="rounded-2xl overflow-hidden border border-white/10 mb-8 shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )
          )}

          <div className="flex flex-wrap gap-4">
            {project.url && (
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all flex items-center gap-2"
              >
                Visit Live Site <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button 
              onClick={onClose}
              className="px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const PolicyModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-slate-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="glass w-full max-w-lg rounded-[2rem] overflow-hidden relative p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-display font-bold mb-6">Lab Policy</h2>
        <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
          <p>
            Pettigrew Lab is a private, family-run product studio. We build things for the joy of creation and the challenge of shipping.
          </p>
          <p>
            <strong>Privacy:</strong> We don't track you. We don't sell your data. If you pitch an idea, we use your email only to respond to you.
          </p>
          <p>
            <strong>Terms:</strong> All experiments are provided "as-is". We're learning in public, so expect bugs, frequent updates, and the occasional monster-induced downtime.
          </p>
          <p>
            <strong>Monsters:</strong> Our junior developers (the kids) are highly unpredictable. Their code may contain traces of glitter and StarCraft references.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="mt-8 w-full py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all"
        >
          Understood
        </button>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showPolicy, setShowPolicy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/xreorely', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setFormStatus('success');
      } else {
        throw new Error('Failed to send pitch');
      }
    } catch (error) {
      console.error('Error sending pitch:', error);
      setFormStatus('idle');
      alert('Something went wrong. Please try again later.');
    }
  };

  const activeProjects = PROJECTS.filter(p => p.status === 'Live Beta' || p.status === 'In Development');
  const explorationProjects = PROJECTS.filter(p => p.status === 'Paused' || p.status === 'Exploration');

  return (
    <div className="min-h-screen mesh-gradient selection:bg-emerald-500/30 xl:pl-64 transition-all duration-500">
      <MatrixTerminal />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-t-0 border-x-0 transition-all duration-500">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-slate-950" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Pettigrew Lab</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#mission" className="hover:text-white transition-colors">Mission</a>
            <a href="#pitch" className="hover:text-white transition-colors">Pitch an Idea</a>
          </div>
          <div className="flex items-center gap-4">
            {/* Social icons removed as requested */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
          >
            Building real products. Learning by shipping.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed mb-8"
          >
            Pettigrew Lab is a family-run product studio. We experiment, learn, and ship one working product into the world every single month.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <a href="#projects" className="px-5 py-2.5 bg-white text-slate-950 text-xs font-bold rounded-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10">
              View Our Lab
            </a>
            <a href="#pitch" className="px-5 py-2.5 glass text-white text-xs font-bold rounded-lg hover:bg-white/10 transition-colors">
              Pitch an Idea
            </a>
          </motion.div>
        </div>
      </section>

      {/* Hero Image / Visual */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden glass p-3"
          >
            <img 
              src="/Kid_coders.png" 
              alt="Pettigrew Lab Team" 
              className="w-full h-auto md:max-h-[600px] object-contain rounded-xl opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row items-end justify-between gap-4">
              <div className="glass p-4 rounded-xl max-w-xs">
                <Users className="w-8 h-8 text-emerald-400 mb-3" />
                <h3 className="text-lg font-display font-bold mb-1">Built by Monsters</h3>
                <p className="text-slate-400 text-xs">Joel, Cassandra, and the monsters working together.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-16 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">The Experiments</h2>
              <p className="text-slate-400 text-sm max-w-xl">From lawn care OS to gamified education, we explore diverse domains with a single focus: shipping value.</p>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1.5 glass rounded-lg text-[10px] font-bold text-emerald-400">2 Live</div>
              <div className="px-3 py-1.5 glass rounded-lg text-[10px] font-bold text-indigo-400">1 Building</div>
              <div className="px-3 py-1.5 glass rounded-lg text-[10px] font-bold text-slate-400">5 Exploring</div>
            </div>
          </div>

          {/* Active Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {activeProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </div>
            ))}
          </div>

          {/* Exploration Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {explorationProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {showPolicy && (
          <PolicyModal onClose={() => setShowPolicy(false)} />
        )}
      </AnimatePresence>

      {/* Mission Section */}
      <section id="mission" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 text-indigo-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">The Monthly Mission</h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-10">
            "We believe the best way to learn is to ship. Every 30 days, we take an idea from concept to a working product. No bloat, no endless planning—just code, design, and deployment."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="glass p-5 rounded-xl">
              <div className="text-xl font-display font-bold text-white mb-1">01</div>
              <h4 className="font-bold text-sm mb-1">Ideate</h4>
              <p className="text-xs text-slate-400">Identify a real-world problem that can be solved with a focused tool.</p>
            </div>
            <div className="glass p-5 rounded-xl">
              <div className="text-xl font-display font-bold text-white mb-1">02</div>
              <h4 className="font-bold text-sm mb-1">Build</h4>
              <p className="text-xs text-slate-400">Intense 3-week development cycle focusing on core functionality.</p>
            </div>
            <div className="glass p-5 rounded-xl">
              <div className="text-xl font-display font-bold text-white mb-1">03</div>
              <h4 className="font-bold text-sm mb-1">Ship</h4>
              <p className="text-xs text-slate-400">Deploy to production and gather real-world feedback immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pitch Section */}
      <section id="pitch" className="py-16 px-6 bg-slate-950/50">
        <div className="max-w-3xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">Pitch an Idea</h2>
              <p className="text-slate-400 text-sm mb-8">Have a problem that needs a simple, working solution? We're always looking for our next monthly mission.</p>

              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl text-center"
                  >
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-6 h-6 text-slate-950" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Idea Received!</h3>
                    <p className="text-slate-400 text-sm">Thanks for pitching. We'll review it in our next lab session.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="mt-6 text-emerald-400 text-sm font-bold hover:underline"
                    >
                      Send another?
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                        <input 
                          required
                          name="name"
                          type="text" 
                          placeholder="Joel P." 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                        <input 
                          required
                          name="email"
                          type="email" 
                          placeholder="hello@example.com" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">The Idea</label>
                      <textarea 
                        required
                        name="message"
                        rows={4}
                        placeholder="What should we build next month?" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all resize-none"
                      />
                    </div>
                    <button 
                      disabled={formStatus === 'submitting'}
                      className="w-full py-4 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                      ) : (
                        <>Send Pitch <Send className="w-4 h-4" /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-500" />
              <span className="font-display font-bold text-lg">Pettigrew Lab</span>
            </div>
            <div className="text-slate-500 text-xs">
              © 2026 Pettigrew Lab. Built by Joel, Cassandra, & Monsters.
            </div>
            <div className="flex items-center gap-6 text-slate-400 text-xs">
              <button onClick={() => setShowPolicy(true)} className="hover:text-white transition-colors">Lab Policy</button>
              <a href="mailto:pettigrewjoel@gmail.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
