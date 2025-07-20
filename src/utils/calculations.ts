// BMI Calculation
export const calculateBMI = (height: number, weight: number): number => {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

// BMI Category
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// Daily Calorie Calculation using Harris-Benedict Equation
export const calculateCalories = (
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: string
): number => {
  let bmr: number;
  
  // Calculate BMR (Basal Metabolic Rate)
  if (gender.toLowerCase() === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  
  // Activity multiplier
  const activityMultipliers: { [key: string]: number } = {
    'Sedentary': 1.2,
    'Lightly Active': 1.375,
    'Moderately Active': 1.55,
    'Very Active': 1.725,
    'Extremely Active': 1.9,
  };
  
  const multiplier = activityMultipliers[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
};

// Fitness Recommendations based on goals
export const getFitnessRecommendations = (goal: string) => {
  const recommendations: { [key: string]: any } = {
    'lose-weight': {
      tips: [
        'Focus on creating a caloric deficit through diet and exercise',
        'Incorporate both cardio and strength training',
        'Aim for 150-300 minutes of moderate exercise per week',
        'Stay hydrated and get adequate sleep',
        'Track your progress with measurements, not just weight',
        'Be patient and consistent with your routine',
      ],
      macros: { protein: 30, carbs: 40, fats: 30 },
      exerciseTypes: ['HIIT', 'Cardio', 'Strength Training'],
    },
    'gain-muscle': {
      tips: [
        'Eat in a slight caloric surplus (300-500 calories above maintenance)',
        'Prioritize protein intake (1.6-2.2g per kg of body weight)',
        'Focus on progressive overload in strength training',
        'Get 7-9 hours of quality sleep for recovery',
        'Allow adequate rest between intense training sessions',
        'Include compound exercises in your routine',
      ],
      macros: { protein: 35, carbs: 45, fats: 20 },
      exerciseTypes: ['Strength Training', 'Progressive Overload', 'Compound Movements'],
    },
    'stay-fit': {
      tips: [
        'Maintain a balanced diet with variety',
        'Mix different types of exercise to stay engaged',
        'Listen to your body and adjust intensity as needed',
        'Make fitness a sustainable part of your lifestyle',
        'Regular health check-ups and fitness assessments',
        'Stay active throughout the day, not just during workouts',
      ],
      macros: { protein: 25, carbs: 50, fats: 25 },
      exerciseTypes: ['Mixed Training', 'Flexibility', 'Cardio'],
    },
    'improve-endurance': {
      tips: [
        'Gradually increase workout duration and intensity',
        'Focus on cardiovascular exercises and longer sessions',
        'Include interval training to boost stamina',
        'Proper nutrition and hydration for sustained energy',
        'Cross-train with different activities to prevent overuse',
        'Monitor your heart rate during workouts',
      ],
      macros: { protein: 20, carbs: 60, fats: 20 },
      exerciseTypes: ['Cardio', 'Interval Training', 'Endurance Sports'],
    },
  };
  
  return recommendations[goal] || recommendations['stay-fit'];
};

// Ideal weight calculation
export const calculateIdealWeight = (height: number, gender: string): number => {
  const heightInInches = height / 2.54;
  
  if (gender.toLowerCase() === 'male') {
    return Math.round(50 + 2.3 * (heightInInches - 60));
  } else {
    return Math.round(45.5 + 2.3 * (heightInInches - 60));
  }
};

// Water intake recommendation
export const calculateWaterIntake = (weight: number, activityLevel: string): number => {
  let baseIntake = weight * 35; // ml per kg
  
  const activityMultipliers: { [key: string]: number } = {
    'Sedentary': 1,
    'Lightly Active': 1.1,
    'Moderately Active': 1.2,
    'Very Active': 1.3,
    'Extremely Active': 1.4,
  };
  
  const multiplier = activityMultipliers[activityLevel] || 1;
  return Math.round(baseIntake * multiplier);
};