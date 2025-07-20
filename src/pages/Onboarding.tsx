import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface FormData {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  dailyRoutine: string;
  foodPreferences: string;
  fitnessGoal: string;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 0,
    height: 0,
    weight: 0,
    gender: '',
    dailyRoutine: '',
    foodPreferences: '',
    fitnessGoal: '',
  });

  const steps = [
    {
      title: 'Personal Information',
      fields: ['name', 'age', 'gender'],
    },
    {
      title: 'Physical Details',
      fields: ['height', 'weight'],
    },
    {
      title: 'Lifestyle & Preferences',
      fields: ['dailyRoutine', 'foodPreferences'],
    },
    {
      title: 'Fitness Goals',
      fields: ['fitnessGoal'],
    },
  ];

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setUserData(formData);
      navigate('/dashboard');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every(field => {
      const value = formData[field as keyof FormData];
      return value !== '' && value !== 0;
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your age"
                min="1"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
              <div className="grid grid-cols-3 gap-4">
                {['Male', 'Female', 'Other'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => handleInputChange('gender', gender)}
                    className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                      formData.gender === gender
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={formData.height || ''}
                onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your height in centimeters"
                min="50"
                max="300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={formData.weight || ''}
                onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your weight in kilograms"
                min="20"
                max="500"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Daily Routine</label>
              <div className="grid grid-cols-1 gap-4">
                {['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'].map((routine) => (
                  <button
                    key={routine}
                    onClick={() => handleInputChange('dailyRoutine', routine)}
                    className={`px-4 py-3 rounded-lg border text-left transition-all duration-200 ${
                      formData.dailyRoutine === routine
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {routine}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Food Preferences</label>
              <div className="grid grid-cols-2 gap-4">
                {['Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Mediterranean', 'No Preference'].map((pref) => (
                  <button
                    key={pref}
                    onClick={() => handleInputChange('foodPreferences', pref)}
                    className={`px-4 py-3 rounded-lg border transition-all duration-200 ${
                      formData.foodPreferences === pref
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Fitness Goal</label>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { value: 'lose-weight', label: 'Lose Weight', desc: 'Burn fat and achieve a leaner physique' },
                  { value: 'gain-muscle', label: 'Gain Muscle', desc: 'Build strength and muscle mass' },
                  { value: 'stay-fit', label: 'Stay Fit', desc: 'Maintain current fitness and health' },
                  { value: 'improve-endurance', label: 'Improve Endurance', desc: 'Enhance cardiovascular fitness' },
                ].map((goal) => (
                  <button
                    key={goal.value}
                    onClick={() => handleInputChange('fitnessGoal', goal.value)}
                    className={`px-6 py-4 rounded-lg border text-left transition-all duration-200 ${
                      formData.fitnessGoal === goal.value
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-transparent text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                    }`}
                  >
                    <div className="font-semibold">{goal.label}</div>
                    <div className="text-sm opacity-80">{goal.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">Getting Started</h2>
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`text-xs ${
                    index <= currentStep ? 'text-blue-400' : 'text-gray-500'
                  }`}
                >
                  {index <= currentStep && <CheckCircle className="w-4 h-4 inline mr-1" />}
                  {step.title}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                {steps[currentStep].title}
              </h3>
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                currentStep === 0
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                isStepValid()
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;