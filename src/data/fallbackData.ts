import { Algorithm } from '../types';

// Fallback algorithm data for when the API is unavailable
export const fallbackAlgorithms = [
  {
    id: "linear-regression",
    name: "Linear Regression",
    category: "Supervised Learning",
    subcategory: "Regression",
    difficulty: "Beginner",
    description: "A basic algorithm for predicting continuous values using linear relationships between variables.",
    estimatedTime: "30 min",
    prerequisites: ["Basic Statistics", "Calculus"],
    concepts: ["Linear Algebra", "Gradient Descent", "Cost Function"],
  },
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    category: "Supervised Learning",
    subcategory: "Classification",
    difficulty: "Beginner",
    description: "A classification algorithm that predicts the probability of an instance belonging to a given class.",
    estimatedTime: "45 min",
    prerequisites: ["Linear Regression", "Probability"],
    concepts: ["Sigmoid Function", "Binary Classification", "Maximum Likelihood"],
  },
  {
    id: "decision-trees",
    name: "Decision Trees",
    category: "Supervised Learning",
    subcategory: "Classification",
    difficulty: "Intermediate",
    description: "A tree-like model of decisions that predicts the value of a target variable by learning decision rules.",
    estimatedTime: "60 min",
    prerequisites: ["Basic Probability", "Information Theory"],
    concepts: ["Entropy", "Information Gain", "Pruning"],
  },
  {
    id: "k-means",
    name: "K-Means Clustering",
    category: "Unsupervised Learning",
    subcategory: "Clustering",
    difficulty: "Intermediate",
    description: "A method that partitions data points into k clusters, where each point belongs to the cluster with the nearest mean.",
    estimatedTime: "45 min",
    prerequisites: ["Linear Algebra", "Basic Statistics"],
    concepts: ["Centroid", "Euclidean Distance", "Cluster Assignment"],
  },
  {
    id: "neural-networks",
    name: "Neural Networks",
    category: "Deep Learning",
    subcategory: "Fundamentals",
    difficulty: "Advanced",
    description: "A computational model inspired by the human brain, consisting of layers of interconnected nodes to process data.",
    estimatedTime: "90 min",
    prerequisites: ["Linear Algebra", "Calculus", "Probability"],
    concepts: ["Backpropagation", "Activation Functions", "Gradient Descent", "Loss Functions"],
  },
  {
    id: "convolutional-neural-networks",
    name: "Convolutional Neural Networks",
    category: "Deep Learning",
    subcategory: "Computer Vision",
    difficulty: "Advanced",
    description: "A specialized neural network architecture designed for processing grid-like data such as images.",
    estimatedTime: "120 min",
    prerequisites: ["Neural Networks", "Linear Algebra", "Python Programming"],
    concepts: ["Convolution", "Pooling", "Feature Maps", "Filters"],
  },
  {
    id: "reinforcement-learning",
    name: "Q-Learning",
    category: "Reinforcement Learning",
    subcategory: "Value-Based",
    difficulty: "Advanced",
    description: "A model-free reinforcement learning algorithm to learn the value of an action in a particular state.",
    estimatedTime: "150 min",
    prerequisites: ["Probability", "Markov Decision Processes", "Python Programming"],
    concepts: ["Q-Table", "Exploration vs Exploitation", "Reward Function", "Bellman Equation"],
  }
];

// Fallback categories for when the API is unavailable
export const fallbackCategories = [
  { name: 'Supervised Learning', count: 3, difficulties: ['Beginner', 'Intermediate'] },
  { name: 'Unsupervised Learning', count: 1, difficulties: ['Intermediate'] },
  { name: 'Deep Learning', count: 2, difficulties: ['Advanced'] },
  { name: 'Reinforcement Learning', count: 1, difficulties: ['Advanced'] }
];
