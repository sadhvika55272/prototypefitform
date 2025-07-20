import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, Play, Pause, RotateCcw, Award, Target, Activity, Zap, Timer } from 'lucide-react';

const AITrainer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [repsCount, setRepsCount] = useState(0);
  const [currentExercise, setCurrentExercise] = useState('Push-ups');
  const [postureScore, setPostureScore] = useState(85);
  const [caloriesBurnt, setCaloriesBurnt] = useState(0);
  const [workoutTime, setWorkoutTime] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState('Position yourself in front of the camera');
  const videoRef = useRef<HTMLVideoElement>(null);

  const exercises = ['Push-ups', 'Squats', 'Lunges', 'Plank', 'Burpees'];
  
  const feedbackMessages = [
    { message: "Excellent form! Keep it up!", type: "success" },
    { message: "Good posture, focus on alignment", type: "info" },
    { message: "Tip: Keep your back straight", type: "warning" },
    { message: "Great technique! You're doing amazing", type: "success" },
    { message: "Lower your body more for better range", type: "info" },
    { message: "Perfect! Maintain this form", type: "success" },
    { message: "Slow down the movement for better control", type: "warning" },
  ];

  // Skeleton keypoints for animation
  const skeletonPoints = [
    { id: 'head', x: 50, y: 15 },
    { id: 'neck', x: 50, y: 25 },
    { id: 'leftShoulder', x: 40, y: 30 },
    { id: 'rightShoulder', x: 60, y: 30 },
    { id: 'leftElbow', x: 35, y: 45 },
    { id: 'rightElbow', x: 65, y: 45 },
    { id: 'leftWrist', x: 30, y: 60 },
    { id: 'rightWrist', x: 70, y: 60 },
    { id: 'spine', x: 50, y: 50 },
    { id: 'leftHip', x: 45, y: 65 },
    { id: 'rightHip', x: 55, y: 65 },
    { id: 'leftKnee', x: 42, y: 80 },
    { id: 'rightKnee', x: 58, y: 80 },
    { id: 'leftAnkle', x: 40, y: 95 },
    { id: 'rightAnkle', x: 60, y: 95 },
  ];

  const skeletonConnections = [
    ['head', 'neck'],
    ['neck', 'leftShoulder'],
    ['neck', 'rightShoulder'],
    ['leftShoulder', 'leftElbow'],
    ['rightShoulder', 'rightElbow'],
    ['leftElbow', 'leftWrist'],
    ['rightElbow', 'rightWrist'],
    ['neck', 'spine'],
    ['spine', 'leftHip'],
    ['spine', 'rightHip'],
    ['leftHip', 'rightHip'],
    ['leftHip', 'leftKnee'],
    ['rightHip', 'rightKnee'],
    ['leftKnee', 'leftAnkle'],
    ['rightKnee', 'rightAnkle'],
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let feedbackInterval: NodeJS.Timeout;
    let timeInterval: NodeJS.Timeout;

    if (isRecording) {
      // Simulate rep counting
      interval = setInterval(() => {
        setRepsCount(prev => prev + 1);
        setPostureScore(Math.floor(Math.random() * 20) + 80);
        setCaloriesBurnt(prev => prev + Math.floor(Math.random() * 3) + 1);
      }, 3000);

      // Dynamic feedback messages
      feedbackInterval = setInterval(() => {
        const randomFeedback = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
        setCurrentFeedback(randomFeedback.message);
      }, 4000);

      // Workout timer
      timeInterval = setInterval(() => {
        setWorkoutTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (feedbackInterval) clearInterval(feedbackInterval);
      if (timeInterval) clearInterval(timeInterval);
    };
  }, [isRecording]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setCurrentFeedback("AI analysis started - Begin your exercise!");
    } else {
      setCurrentFeedback("Workout paused");
    }
  };

  const resetWorkout = () => {
    setRepsCount(0);
    setIsRecording(false);
    setPostureScore(85);
    setCaloriesBurnt(0);
    setWorkoutTime(0);
    setCurrentFeedback('Position yourself in front of the camera');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPostureColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Posture Coach
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Real-time posture detection and form correction powered by AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Feed with AI Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden mb-6">
                {/* Futuristic Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Demo Person Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Person Silhouette */}
                    <div className="w-32 h-48 bg-gradient-to-b from-gray-600 to-gray-800 rounded-full opacity-60" />
                    
                    {/* AI Skeleton Overlay */}
                    {isRecording && (
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                        {/* Skeleton Connections */}
                        {skeletonConnections.map((connection, index) => {
                          const point1 = skeletonPoints.find(p => p.id === connection[0]);
                          const point2 = skeletonPoints.find(p => p.id === connection[1]);
                          if (!point1 || !point2) return null;
                          
                          return (
                            <motion.line
                              key={index}
                              x1={point1.x}
                              y1={point1.y}
                              x2={point2.x}
                              y2={point2.y}
                              stroke="#3B82F6"
                              strokeWidth="2"
                              className="drop-shadow-lg"
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ 
                                pathLength: 1, 
                                opacity: [0.6, 1, 0.6],
                              }}
                              transition={{ 
                                pathLength: { duration: 1, delay: index * 0.1 },
                                opacity: { duration: 2, repeat: Infinity }
                              }}
                            />
                          );
                        })}
                        
                        {/* Skeleton Points */}
                        {skeletonPoints.map((point, index) => (
                          <motion.circle
                            key={point.id}
                            cx={point.x}
                            cy={point.y}
                            r="2"
                            fill="#8B5CF6"
                            className="drop-shadow-lg"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0.8, 1, 0.8],
                            }}
                            transition={{ 
                              scale: { duration: 1.5, repeat: Infinity },
                              opacity: { duration: 1.5, repeat: Infinity },
                              delay: index * 0.05
                            }}
                          />
                        ))}
                      </svg>
                    )}
                  </div>
                </div>
                
                {/* Overlay Elements */}
                {isRecording && (
                  <>
                    {/* Recording Indicator */}
                    <motion.div 
                      className="absolute top-4 left-4 flex items-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div 
                        className="w-3 h-3 bg-red-500 rounded-full"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <span className="text-white text-sm font-medium">AI ANALYZING</span>
                    </motion.div>
                    
                    {/* Posture Score */}
                    <motion.div 
                      className="absolute top-4 right-4 bg-black/70 rounded-lg p-3 border border-blue-500/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-center">
                        <p className="text-white text-sm">Posture Score</p>
                        <motion.p 
                          className={`text-2xl font-bold ${getPostureColor(postureScore)}`}
                          key={postureScore}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {postureScore}%
                        </motion.p>
                      </div>
                    </motion.div>
                    
                    {/* Rep Counter */}
                    <motion.div 
                      className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-4 border border-purple-500/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-center">
                        <p className="text-white text-sm">Reps</p>
                        <motion.p 
                          className="text-3xl font-bold text-blue-400"
                          key={repsCount}
                          initial={{ scale: 1.3, color: '#8B5CF6' }}
                          animate={{ scale: 1, color: '#3B82F6' }}
                          transition={{ duration: 0.4 }}
                        >
                          {repsCount}
                        </motion.p>
                      </div>
                    </motion.div>
                    
                    {/* Dynamic Feedback */}
                    <motion.div 
                      className="absolute bottom-4 right-4 bg-black/70 rounded-lg p-3 max-w-xs border border-green-500/30"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.p 
                          key={currentFeedback}
                          className="text-white text-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          {currentFeedback}
                        </motion.p>
                      </AnimatePresence>
                    </motion.div>
                  </>
                )}

                {/* Static Demo Message */}
                {!isRecording && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      </motion.div>
                      <p className="text-gray-400 text-lg">AI Posture Detection</p>
                      <p className="text-gray-500 text-sm">Click "Start Demo" to see AI analysis in action</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleRecording}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isRecording
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25 text-white'
                  }`}
                >
                  {isRecording ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isRecording ? 'Stop Demo' : 'Start Demo'}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetWorkout}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-white transition-all duration-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Exercise Selection */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Current Exercise</span>
              </h3>
              <div className="space-y-3">
                {exercises.map((exercise) => (
                  <button
                    key={exercise}
                    onClick={() => setCurrentExercise(exercise)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      currentExercise === exercise
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    {exercise}
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Metrics */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Live Metrics</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 flex items-center space-x-2">
                    <Timer className="w-4 h-4" />
                    <span>Workout Time</span>
                  </span>
                  <span className="text-blue-400 font-bold text-lg">{formatTime(workoutTime)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400 flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Calories Burnt</span>
                  </span>
                  <span className="text-orange-400 font-bold text-lg">{caloriesBurnt}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400">Total Reps</span>
                  <span className="text-purple-400 font-bold text-lg">{repsCount}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-gray-400">Avg. Form</span>
                  <span className={`font-bold text-lg ${getPostureColor(postureScore)}`}>
                    {postureScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* AI Feedback History */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4">AI Feedback</h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                <div className="p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm">✓ Perfect squat depth detected</p>
                </div>
                <div className="p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm">💡 Maintain steady breathing rhythm</p>
                </div>
                <div className="p-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">⚠ Keep core engaged throughout</p>
                </div>
                <div className="p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                  <p className="text-purple-400 text-sm">🎯 Excellent form consistency</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">How AI Posture Detection Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Camera className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="font-semibold text-white mb-2">Camera Detection</h4>
              <p className="text-gray-400 text-sm">AI analyzes your body position using computer vision technology.</p>
            </div>
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Activity className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="font-semibold text-white mb-2">Pose Estimation</h4>
              <p className="text-gray-400 text-sm">Advanced algorithms track 15+ key body points in real-time.</p>
            </div>
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Target className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="font-semibold text-white mb-2">Form Analysis</h4>
              <p className="text-gray-400 text-sm">AI evaluates your form and provides instant feedback for improvement.</p>
            </div>
            <div className="text-center">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              <h4 className="font-semibold text-white mb-2">Progress Tracking</h4>
              <p className="text-gray-400 text-sm">Track reps, calories, and form improvements over time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AITrainer;