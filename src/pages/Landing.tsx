import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, Activity, Target, Shield, Zap, Users, TrendingUp, Award } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Coaching',
      description: 'Get personalized workout plans and nutrition advice powered by advanced AI algorithms.',
    },
    {
      icon: Activity,
      title: 'Real-time Posture Detection',
      description: 'Monitor your form and posture in real-time with our advanced computer vision technology.',
    },
    {
      icon: Target,
      title: 'Goal Tracking',
      description: 'Set and achieve your fitness goals with intelligent progress tracking and insights.',
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your health data is protected with enterprise-grade security and privacy measures.',
    },
  ];

  const stats = [
    { icon: Users, number: '10K+', label: 'Active Users' },
    { icon: TrendingUp, number: '95%', label: 'Success Rate' },
    { icon: Award, number: '50+', label: 'AI Models' },
    { icon: Zap, number: '24/7', label: 'Support' },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section with Fitness Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Background Images */}
        <div className="absolute inset-0 z-0">
          {/* Main fitness background */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
              alt="Fitness Background"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-white/90 to-purple-100/80" />
          
          {/* Floating fitness elements */}
          <div className="absolute top-20 left-10 w-32 h-32 opacity-30">
            <img 
              src="https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Workout"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          </div>
          
          <div className="absolute bottom-20 right-10 w-40 h-40 opacity-30">
            <img 
              src="https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Fitness Equipment"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          </div>
          
          <div className="absolute top-1/2 right-20 w-24 h-24 opacity-25">
            <img 
              src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Healthy Food"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-1">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                FITFORM AI
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-8 max-w-3xl mx-auto font-semibold">
              Smart Coaching for a Stronger You
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Transform your fitness journey with AI-powered personal training, real-time posture detection, 
              and personalized nutrition plans tailored just for you.
            </p>
            
            <motion.button
              onClick={() => navigate('/onboarding')}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-xl font-bold text-white overflow-hidden shadow-xl"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>Start Your Fitness Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-blue-500 rounded-full flex justify-center">
            <div className="w-2 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Fitness Images */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FITFORM AI</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of fitness with cutting-edge AI technology designed to help you achieve your goals faster and safer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitness Gallery Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Transform Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fitness Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of fitness enthusiasts who have already started their transformation with AI-powered coaching.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Strength Training"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Strength Training</h3>
                  <p className="text-blue-100">Build muscle with AI-guided workouts</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="https://images.pexels.com/photos/1431283/pexels-photo-1431283.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Cardio Workout"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Cardio Fitness</h3>
                  <p className="text-purple-100">Boost endurance with smart training</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl shadow-xl"
            >
              <img 
                src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Nutrition"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Smart Nutrition</h3>
                  <p className="text-green-100">AI-powered meal planning</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Fitness?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already started their journey to a healthier, stronger self with AI-powered coaching.
            </p>
            <motion.button
              onClick={() => navigate('/onboarding')}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-blue-600 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all duration-300"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;