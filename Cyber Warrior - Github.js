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
  title: 'Example Mission',
  description: 'This is an example mission description',
  level: 1,
  duration: '30 minutes',
  tags: ['beginner', 'example'],
  tasks: [
    {
      name: 'Task 1',
      description: 'Complete this example task',
      duration: '10 minutes',
      resources: ['Resource 1', 'Resource 2']
    }
  ],
  completionCriteria: {
    requiredTasks: 1
  },
  rewards: {
    xp: 100,
    badges: ['beginner-badge']
  }
};

// MissionTasks Component
const MissionTasks = ({ mission, onComplete }) => {
  // Validate mission structure
  const validatedMission = {
    ...missionStructure,
    ...mission
  };

  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(0);

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
    return completedTasks.length >= validatedMission.completionCriteria.requiredTasks;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Task List */}
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-semibold mb-4">Tasks</h3>
          <div className="space-y-2">
            {validatedMission.tasks.map((task, index) => (
              <button
                key={index}
                onClick={() => handleTaskSelect(index)}
                className={`w-full text-left p-3 rounded ${
                  activeTask === index
                    ? 'bg-blue-600'
                    : isTaskCompleted(index)
                    ? 'bg-green-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                } transition-colors`}
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

        {/* Task Details */}
        <div className="w-full md:w-2/3">
          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">
                {validatedMission.tasks[activeTask].name}
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
              {validatedMission.tasks[activeTask].description}
            </p>
            {validatedMission.tasks[activeTask].resources && (
              <div className="mt-4">
                <h5 className="text-sm font-semibold mb-2">Resources:</h5>
                <ul className="space-y-1">
                  {validatedMission.tasks[activeTask].resources.map((resource, index) => (
                    <li key={index} className="text-sm text-gray-400">
                      • {resource}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Progress and Completion */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-gray-400">Progress:</span>
                <span className="ml-2 text-yellow-400">
                  {completedTasks.length}/{validatedMission.tasks.length} tasks completed
                </span>
              </div>
              <div>
                <span className="text-gray-400">Required:</span>
                <span className="ml-2">
                  {validatedMission.completionCriteria.requiredTasks} tasks
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{
                  width: `${(completedTasks.length / validatedMission.tasks.length) * 100}%`,
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
  );
};

// Export all components and data
export { missionStructure, exampleMission, MissionTasks }; 