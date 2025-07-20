import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Activity, Target, TrendingUp, Utensils, Dumbbell, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { calculateBMI, calculateCalories, getBMICategory, getFitnessRecommendations } from '../utils/calculations';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [bmi, setBmi] = useState(0);
  const [calories, setCalories] = useState(0);
  const [bmiCategory, setBmiCategory] = useState('');
  const [recommendations, setRecommendations] = useState<any>(null);

  useEffect(() => {
    if (!userData) {
      navigate('/onboarding');
      return;
    }

    const calculatedBMI = calculateBMI(userData.height, userData.weight);
    const calculatedCalories = calculateCalories(userData.weight, userData.height, userData.age, userData.gender, userData.dailyRoutine);
    
    setBmi(calculatedBMI);
    setCalories(calculatedCalories);
    setBmiCategory(getBMICategory(calculatedBMI));
    setRecommendations(getFitnessRecommendations(userData.fitnessGoal));
  }, [userData, navigate]);

  if (!userData) {
    return null;
  }

  const stats = [
    {
      icon: Activity,
      label: 'BMI',
      value: bmi.toFixed(1),
      category: bmiCategory,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      label: 'Daily Calories',
      value: calories.toLocaleString(),
      category: 'Recommended',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: TrendingUp,
      label: 'Fitness Goal',
      value: userData.fitnessGoal.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      category: 'Primary',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const todayWorkout = [
    { exercise: 'Push-ups', sets: 3, reps: '12-15', rest: '60s' },
    { exercise: 'Squats', sets: 3, reps: '15-20', rest: '60s' },
    { exercise: 'Plank', sets: 3, reps: '30-45s', rest: '45s' },
    { exercise: 'Lunges', sets: 3, reps: '10 each', rest: '60s' },
  ];

  const mealPlan = [
    {
      meal: 'Breakfast',
      time: '7:00 AM',
      calories: Math.round(calories * 0.25),
      foods: ['Oatmeal with berries', 'Greek yogurt', 'Green tea'],
    },
    {
      meal: 'Lunch',
      time: '12:30 PM',
      calories: Math.round(calories * 0.35),
      foods: ['Grilled chicken salad', 'Quinoa', 'Mixed vegetables'],
    },
    {
      meal: 'Dinner',
      time: '7:00 PM',
      calories: Math.round(calories * 0.3),
      foods: ['Salmon fillet', 'Sweet potato', 'Steamed broccoli'],
    },
    {
      meal: 'Snacks',
      time: 'Throughout',
      calories: Math.round(calories * 0.1),
      foods: ['Almonds', 'Apple', 'Protein shake'],
    },
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{userData.name}</span>!
          </h1>
          <p className="text-xl text-gray-400">
            Here's your personalized fitness dashboard. Let's make today count!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Today's Workout */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Today's Workout</h2>
            </div>
            
            <div className="space-y-4">
              {todayWorkout.map((exercise, index) => (
                <div key={exercise.exercise} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-white">{exercise.exercise}</h3>
                    <p className="text-sm text-gray-400">{exercise.sets} sets × {exercise.reps}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Rest</p>
                    <p className="text-white font-medium">{exercise.rest}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => navigate('/ai-trainer')}
              className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              Start Workout with AI Trainer
            </button>
          </motion.div>

          {/* Meal Plan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Today's Nutrition</h2>
            </div>
            
            <div className="space-y-4">
              {mealPlan.map((meal, index) => (
                <div key={meal.meal} className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{meal.meal}</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{meal.time}</p>
                      <p className="text-green-400 font-medium">{meal.calories} cal</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meal.foods.map((food, foodIndex) => (
                      <span
                        key={foodIndex}
                        className="px-2 py-1 bg-gray-600/50 rounded text-xs text-gray-300"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fitness Tips */}
        {recommendations && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Personalized Tips</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.tips.map((tip: string, index: number) => (
                <div key={index} className="p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-gray-300">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;