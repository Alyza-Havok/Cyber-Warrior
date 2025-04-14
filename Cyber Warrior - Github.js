import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Mission structure definition
const missionStructure = {
  id: '',
  title: '',
  description: '',
  level: 1,
  duration: '',
  tags: [],
  tasks: [
    {
      name: '',
      description: '',
      duration: '',
      resources: []
    }
  ],
  completionCriteria: {
    requiredTasks: 0
  },
  rewards: {
    xp: 0,
    badges: []
  }
};

// Example mission data
const exampleMission = {
  id: 'mission-1',
  title: 'Introduction to Cybersecurity',
  description: 'Learn the basics of cybersecurity and incident response',
  level: 1,
  duration: '30 minutes',
  tags: ['beginner', 'fundamentals'],
  tasks: [
    {
      name: 'Understanding Cyber Threats',
      description: 'Learn about different types of cyber threats and attacks',
      duration: '10 minutes',
      resources: ['NIST Cybersecurity Framework', 'MITRE ATT&CK Matrix']
    },
    {
      name: 'Basic Security Practices',
      description: 'Understand fundamental security practices and protocols',
      duration: '10 minutes',
      resources: ['Security Best Practices Guide', 'Incident Response Playbook']
    }
  ],
  completionCriteria: {
    requiredTasks: 2
  },
  rewards: {
    xp: 100,
    badges: ['cyber-basics']
  }
};

// Helper Bot Component
function HelperBot({ onClose }) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingStep, setBreathingStep] = useState(0);

  const startBreathing = () => {
    setIsBreathing(true);
    setBreathingStep(0);
  };

  useEffect(() => {
    let timer;
    if (isBreathing) {
      timer = setInterval(() => {
        setBreathingStep(prev => {
          if (prev >= 3) {
            setIsBreathing(false);
            return 0;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isBreathing]);

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-gray-800 rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">CyberBuddy 🤖</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">×</button>
        </div>
      </div>
      <div className="p-4">
        {isBreathing ? (
          <div className="text-center">
            <p className="text-xl mb-4">
              {breathingStep === 0 && "Breathe in..."}
              {breathingStep === 1 && "Hold..."}
              {breathingStep === 2 && "Breathe out..."}
              {breathingStep === 3 && "Hold..."}
            </p>
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-500 animate-pulse" />
          </div>
        ) : (
          <div>
            <p className="mb-4">How can I help you today?</p>
            <button
              onClick={startBreathing}
              className="w-full p-2 mb-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Do we need to take a breath?
            </button>
            <button className="w-full p-2 bg-green-600 rounded hover:bg-green-700">
              Help me understand this lesson
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// MissionTasks Component
function MissionTasks({ mission, onComplete }) {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(0);
  const [showHelper, setShowHelper] = useState(false);

  const handleTaskComplete = (taskIndex) => {
    if (!completedTasks.includes(taskIndex)) {
      setCompletedTasks([...completedTasks, taskIndex]);
    }
  };

  const handleTaskSelect = (taskIndex) => {
    setActiveTask(taskIndex);
  };

  const isTaskCompleted = (taskIndex) => {
    return completedTasks.includes(taskIndex);
  };

  const canCompleteMission = () => {
    return completedTasks.length >= mission.completionCriteria.requiredTasks;
  };

  const getButtonClass = (index) => {
    if (activeTask === index) return 'bg-blue-600';
    if (isTaskCompleted(index)) return 'bg-green-600';
    return 'bg-gray-700 hover:bg-gray-600';
  };

  return (
    <div className="relative">
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Tasks</h3>
            <div className="space-y-2">
              {mission.tasks.map((task, index) => (
                <button
                  key={index}
                  onClick={() => handleTaskSelect(index)}
                  className={`w-full text-left p-3 rounded ${getButtonClass(index)} transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <span>{task.name}</span>
                    {isTaskCompleted(index) && (
                      <span className="text-green-400">✓</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{task.duration}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">
                  {mission.tasks[activeTask].name}
                </h4>
                {!isTaskCompleted(activeTask) && (
                  <button
                    onClick={() => handleTaskComplete(activeTask)}
                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
                  >
                    Complete Task
                  </button>
                )}
              </div>
              <p className="text-gray-300 mb-4">
                {mission.tasks[activeTask].description}
              </p>
              {mission.tasks[activeTask].resources && (
                <div className="mt-4">
                  <h5 className="text-sm font-semibold mb-2">Resources:</h5>
                  <ul className="space-y-1">
                    {mission.tasks[activeTask].resources.map((resource, index) => (
                      <li key={index} className="text-sm text-gray-400">
                        • {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-gray-400">Progress:</span>
                  <span className="ml-2 text-yellow-400">
                    {completedTasks.length}/{mission.tasks.length} tasks completed
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Required:</span>
                  <span className="ml-2">
                    {mission.completionCriteria.requiredTasks} tasks
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{
                    width: `${(completedTasks.length / mission.tasks.length) * 100}%`
                  }}
                />
              </div>
              {canCompleteMission() && (
                <button
                  onClick={onComplete}
                  className="w-full mt-4 px-6 py-3 bg-green-600 rounded hover:bg-green-700 transition-colors"
                >
                  Complete Mission
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowHelper(true)}
        className="fixed bottom-4 right-4 bg-blue-600 p-3 rounded-full shadow-lg hover:bg-blue-700"
      >
        Need Help? 🤖
      </button>

      {showHelper && <HelperBot onClose={() => setShowHelper(false)} />}
    </div>
  );
}

// Navigation Component
function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold flex items-center">
          <img src="/logo.png" alt="CyberWarrior Logo" className="h-8 w-8 mr-2" />
          CyberWarrior
        </Link>
        <div className="space-x-4">
          <Link to="/missions" className="text-white hover:text-gray-300">Missions</Link>
          <Link to="/progress" className="text-white hover:text-gray-300">Progress</Link>
          <Link to="/profile" className="text-white hover:text-gray-300">Profile</Link>
        </div>
      </div>
    </nav>
  );
}

// Main App Component
function App() {
  const [currentMission, setCurrentMission] = useState(null);
  const [userProgress, setUserProgress] = useState({
    xp: 0,
    completedMissions: [],
    badges: []
  });

  const handleMissionComplete = () => {
    setUserProgress(prev => ({
      ...prev,
      xp: prev.xp + currentMission.rewards.xp,
      completedMissions: [...prev.completedMissions, currentMission.id],
      badges: [...prev.badges, ...currentMission.rewards.badges]
    }));
    setCurrentMission(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-8">Welcome to CyberWarrior</h1>
                <p className="text-xl mb-8">Begin your journey in cybersecurity training</p>
                <Link to="/missions" className="bg-blue-600 px-6 py-3 rounded hover:bg-blue-700">
                  Start Training
                </Link>
              </div>
            } />
            <Route path="/missions" element={
              currentMission ? (
                <MissionTasks 
                  mission={currentMission} 
                  onComplete={handleMissionComplete} 
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[exampleMission].map((mission) => (
                    <div 
                      key={mission.id}
                      className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700"
                      onClick={() => setCurrentMission(mission)}
                    >
                      <h2 className="text-xl font-bold mb-2">{mission.title}</h2>
                      <p className="text-gray-300 mb-4">{mission.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-400">XP: {mission.rewards.xp}</span>
                        <span className="text-gray-400">{mission.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export { 
  missionStructure, 
  exampleMission, 
  MissionTasks,
  HelperBot, 
  Navigation, 
  App as default 
}; 