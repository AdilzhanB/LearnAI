// Comprehensive algorithm data with detailed information
import { Algorithm, AlgorithmCategory, DifficultyLevel, ProgrammingLanguage, SectionType, QuestionType } from '../types';

export const algorithmData: Algorithm[] = [
  // Deep Learning Algorithms
  {
    id: 'neural-network-backpropagation',
    name: 'Neural Network Backpropagation',
    shortDescription: 'The fundamental algorithm for training neural networks through gradient descent',
    fullDescription: 'Backpropagation is a supervised learning algorithm used to train neural networks by computing gradients of the loss function with respect to the weights. It uses the chain rule of calculus to propagate errors backward through the network, updating weights to minimize the loss.',
    category: AlgorithmCategory.DEEP_LEARNING,
    difficulty: DifficultyLevel.INTERMEDIATE,
    estimatedTime: 45,
    prerequisites: ['Linear Algebra', 'Calculus', 'Basic Neural Networks'],
    applications: ['Image Recognition', 'Natural Language Processing', 'Speech Recognition', 'Medical Diagnosis'],
    advantages: ['Efficient gradient computation', 'Handles complex non-linear relationships', 'Scalable to large networks'],
    disadvantages: ['Vanishing gradient problem', 'Local minima issues', 'Requires labeled data'],
    timeComplexity: 'O(n × m × h × l)',
    spaceComplexity: 'O(n × m × h)',
    thumbnailUrl: '/images/algorithms/backpropagation.jpg',
    visualizationComponent: 'BackpropagationVisualization',
    codeExamples: [
      {
        id: 'bp-pytorch',
        language: ProgrammingLanguage.PYTORCH,
        title: 'PyTorch Implementation',
        description: 'Complete implementation of backpropagation using PyTorch',
        code: `import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F

class SimpleNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, output_size)
        self.dropout = nn.Dropout(0.2)
        
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = F.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

# Training function
def train_network(model, train_loader, criterion, optimizer, epochs=100):
    model.train()
    for epoch in range(epochs):
        total_loss = 0
        for batch_idx, (data, target) in enumerate(train_loader):
            optimizer.zero_grad()  # Clear gradients
            output = model(data)   # Forward pass
            loss = criterion(output, target)  # Compute loss
            loss.backward()        # Backward pass (backpropagation)
            optimizer.step()       # Update weights
            total_loss += loss.item()
            
        if epoch % 10 == 0:
            print(f'Epoch {epoch}, Loss: {total_loss/len(train_loader):.4f}')

# Example usage
model = SimpleNN(784, 128, 10)  # MNIST-like architecture
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)`,
        explanation: 'This implementation shows the complete backpropagation process including forward pass, loss computation, backward pass, and weight updates.',
        runnable: true,
        complexity: {
          time: 'O(n × m × h × l)',
          space: 'O(n × m × h)'
        }
      }
    ],
    mathematicalBackground: [
      {
        id: 'bp-math-chain-rule',
        title: 'Chain Rule Foundation',
        content: 'The chain rule is the mathematical foundation of backpropagation',
        latex: '\\frac{\\partial L}{\\partial w_{ij}} = \\frac{\\partial L}{\\partial o_j} \\cdot \\frac{\\partial o_j}{\\partial net_j} \\cdot \\frac{\\partial net_j}{\\partial w_{ij}}',
        explanation: 'The chain rule allows us to compute the gradient of the loss function with respect to any weight in the network by decomposing it into partial derivatives.',
        examples: ['Forward pass: net_j = Σ(w_ij × x_i)', 'Activation: o_j = f(net_j)', 'Loss: L = (y - o)²']
      }
    ],
    sections: [
      {
        id: 'bp-theory',
        title: 'Theory and Concepts',
        content: 'Understanding the mathematical foundation and intuition behind backpropagation',
        type: SectionType.THEORY,
        order: 1,
        estimatedTime: 15
      },
      {
        id: 'bp-visualization',
        title: 'Interactive Visualization',
        content: 'Watch gradients flow backward through the network',
        type: SectionType.VISUALIZATION,
        order: 2,
        estimatedTime: 10
      },
      {
        id: 'bp-implementation',
        title: 'Code Implementation',
        content: 'Implement backpropagation from scratch and with frameworks',
        type: SectionType.CODE,
        order: 3,
        estimatedTime: 20
      }
    ],
    quiz: [
      {
        id: 'bp-q1',
        question: 'What is the primary purpose of backpropagation?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'To compute the forward pass',
          'To compute gradients for weight updates',
          'To initialize network weights',
          'To evaluate network performance'
        ],
        correctAnswer: 'To compute gradients for weight updates',
        explanation: 'Backpropagation computes gradients of the loss function with respect to the network weights, enabling gradient-based optimization.',
        difficulty: DifficultyLevel.BEGINNER,
        points: 10
      }
    ],
    tags: ['gradient-descent', 'neural-networks', 'optimization', 'supervised-learning'],
    popularity: 95,
    rating: 4.8,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01')
  },

  // Convolutional Neural Networks
  {
    id: 'convolutional-neural-network',
    name: 'Convolutional Neural Network (CNN)',
    shortDescription: 'Deep learning architecture designed for processing grid-like data such as images',
    fullDescription: 'CNNs are a class of deep neural networks, most commonly applied to analyzing visual imagery. They use convolution operations to detect local features and patterns in data, making them highly effective for image recognition, computer vision, and pattern detection tasks.',
    category: AlgorithmCategory.DEEP_LEARNING,
    difficulty: DifficultyLevel.INTERMEDIATE,
    estimatedTime: 60,
    prerequisites: ['Neural Networks', 'Backpropagation', 'Linear Algebra'],
    applications: ['Image Classification', 'Object Detection', 'Medical Imaging', 'Autonomous Vehicles'],
    advantages: ['Translation invariance', 'Parameter sharing', 'Hierarchical feature learning'],
    disadvantages: ['Requires large datasets', 'Computationally expensive', 'Black box nature'],
    timeComplexity: 'O(n × m × k²)',
    spaceComplexity: 'O(n × m × d)',
    thumbnailUrl: '/images/algorithms/cnn.jpg',
    visualizationComponent: 'CNNVisualization',
    codeExamples: [
      {
        id: 'cnn-pytorch',
        language: ProgrammingLanguage.PYTORCH,
        title: 'CNN for Image Classification',
        description: 'Complete CNN implementation for CIFAR-10 classification',
        code: `import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import DataLoader
import torchvision.transforms as transforms
import torchvision.datasets as datasets

class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super(CNN, self).__init__()
        
        # Convolutional layers
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, kernel_size=3, padding=1)
        
        # Pooling layer
        self.pool = nn.MaxPool2d(2, 2)
        
        # Fully connected layers
        self.fc1 = nn.Linear(128 * 4 * 4, 512)
        self.fc2 = nn.Linear(512, num_classes)
        
        # Dropout for regularization
        self.dropout = nn.Dropout(0.5)
        
    def forward(self, x):
        # Convolutional layers with ReLU and pooling
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))
        
        # Flatten for fully connected layers
        x = x.view(-1, 128 * 4 * 4)
        
        # Fully connected layers
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        
        return x

# Training function
def train_cnn(model, train_loader, criterion, optimizer, epochs=50):
    model.train()
    for epoch in range(epochs):
        running_loss = 0.0
        for i, (inputs, labels) in enumerate(train_loader):
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
            
        print(f'Epoch [{epoch+1}/{epochs}], Loss: {running_loss/len(train_loader):.4f}')

# Data loading and preprocessing
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

# Initialize model, loss, and optimizer
model = CNN(num_classes=10)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)`,
        explanation: 'This CNN implementation includes convolutional layers for feature extraction, pooling layers for dimensionality reduction, and fully connected layers for classification.',
        runnable: true,
        complexity: {
          time: 'O(n × m × k²)',
          space: 'O(n × m × d)'
        }
      }
    ],
    mathematicalBackground: [
      {
        id: 'cnn-convolution',
        title: 'Convolution Operation',
        content: 'The mathematical foundation of feature detection in CNNs',
        latex: '(f * g)(t) = \\sum_{m} f(m) \\cdot g(t-m)',
        explanation: 'Convolution applies a filter (kernel) to the input to detect specific features like edges, corners, or patterns.',
        examples: ['Edge detection kernels', 'Gaussian blur filters', 'Sharpen filters']
      }
    ],
    sections: [
      {
        id: 'cnn-architecture',
        title: 'CNN Architecture',
        content: 'Understanding the structure and components of CNNs',
        type: SectionType.THEORY,
        order: 1,
        estimatedTime: 20
      },
      {
        id: 'cnn-convolution',
        title: 'Convolution and Pooling',
        content: 'Learn how convolution and pooling operations work',
        type: SectionType.VISUALIZATION,
        order: 2,
        estimatedTime: 15
      },
      {
        id: 'cnn-implementation',
        title: 'Building CNNs',
        content: 'Implement CNN from scratch and with frameworks',
        type: SectionType.CODE,
        order: 3,
        estimatedTime: 25
      }
    ],
    quiz: [
      {
        id: 'cnn-q1',
        question: 'What is the main advantage of using convolution in neural networks?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'Reduces the number of parameters',
          'Detects local features and patterns',
          'Increases computational speed',
          'All of the above'
        ],
        correctAnswer: 'All of the above',
        explanation: 'Convolution reduces parameters through weight sharing, detects local features through filters, and is computationally efficient.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        points: 15
      }
    ],
    tags: ['computer-vision', 'deep-learning', 'feature-extraction', 'image-processing'],
    popularity: 92,
    rating: 4.7,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01')
  },

  // Recurrent Neural Networks
  {
    id: 'recurrent-neural-network',
    name: 'Recurrent Neural Network (RNN)',
    shortDescription: 'Neural networks designed for sequential data processing with memory capabilities',
    fullDescription: 'RNNs are a class of neural networks where connections between nodes form a directed graph along a temporal sequence. This allows them to exhibit temporal dynamic behavior and process sequences of variable length, making them suitable for tasks involving sequential data.',
    category: AlgorithmCategory.DEEP_LEARNING,
    difficulty: DifficultyLevel.INTERMEDIATE,
    estimatedTime: 50,
    prerequisites: ['Neural Networks', 'Backpropagation', 'Sequence Processing'],
    applications: ['Language Modeling', 'Machine Translation', 'Time Series Prediction', 'Speech Recognition'],
    advantages: ['Handles variable-length sequences', 'Memory of previous inputs', 'Parameter sharing across time'],
    disadvantages: ['Vanishing gradient problem', 'Difficulty in parallel processing', 'Limited long-term memory'],
    timeComplexity: 'O(T × n × m)',
    spaceComplexity: 'O(T × n)',
    thumbnailUrl: '/images/algorithms/rnn.jpg',
    visualizationComponent: 'RNNVisualization',
    codeExamples: [
      {
        id: 'rnn-pytorch',
        language: ProgrammingLanguage.PYTORCH,
        title: 'RNN for Sequence Classification',
        description: 'Implementation of RNN for text classification',
        code: `import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F

class RNN(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim, n_layers=2):
        super(RNN, self).__init__()
        
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.rnn = nn.RNN(embedding_dim, hidden_dim, n_layers, batch_first=True)
        self.fc = nn.Linear(hidden_dim, output_dim)
        self.dropout = nn.Dropout(0.3)
        
    def forward(self, x):
        # Embedding layer
        embedded = self.embedding(x)
        embedded = self.dropout(embedded)
        
        # RNN layer
        output, hidden = self.rnn(embedded)
        
        # Take the last output
        output = output[:, -1, :]
        
        # Fully connected layer
        output = self.fc(output)
        
        return output

# LSTM Implementation (better for long sequences)
class LSTM(nn.Module):
    def __init__(self, vocab_size, embedding_dim, hidden_dim, output_dim, n_layers=2):
        super(LSTM, self).__init__()
        
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.lstm = nn.LSTM(embedding_dim, hidden_dim, n_layers, 
                           batch_first=True, dropout=0.3)
        self.fc = nn.Linear(hidden_dim, output_dim)
        self.dropout = nn.Dropout(0.3)
        
    def forward(self, x):
        embedded = self.embedding(x)
        embedded = self.dropout(embedded)
        
        lstm_out, (hidden, cell) = self.lstm(embedded)
        
        # Use the last hidden state
        output = self.fc(hidden[-1])
        
        return output

# Training function
def train_rnn(model, train_loader, criterion, optimizer, epochs=20):
    model.train()
    for epoch in range(epochs):
        total_loss = 0
        for batch_idx, (data, target) in enumerate(train_loader):
            optimizer.zero_grad()
            output = model(data)
            loss = criterion(output, target)
            loss.backward()
            
            # Gradient clipping to prevent exploding gradients
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)
            
            optimizer.step()
            total_loss += loss.item()
            
        print(f'Epoch {epoch+1}/{epochs}, Loss: {total_loss/len(train_loader):.4f}')

# Example usage
vocab_size = 10000
embedding_dim = 100
hidden_dim = 256
output_dim = 2
model = LSTM(vocab_size, embedding_dim, hidden_dim, output_dim)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)`,
        explanation: 'This implementation shows both basic RNN and LSTM architectures for sequence processing, with gradient clipping to handle the vanishing gradient problem.',
        runnable: true,
        complexity: {
          time: 'O(T × n × m)',
          space: 'O(T × n)'
        }
      }
    ],
    mathematicalBackground: [
      {
        id: 'rnn-equations',
        title: 'RNN Forward Pass Equations',
        content: 'Mathematical formulation of RNN computation',
        latex: 'h_t = \\tanh(W_{hh}h_{t-1} + W_{xh}x_t + b_h)',
        explanation: 'The hidden state at time t is computed using the previous hidden state and current input, allowing the network to maintain memory.',
        examples: ['Hidden state update', 'Output computation', 'Backpropagation through time']
      }
    ],
    sections: [
      {
        id: 'rnn-basics',
        title: 'RNN Fundamentals',
        content: 'Understanding sequential processing and memory in neural networks',
        type: SectionType.THEORY,
        order: 1,
        estimatedTime: 15
      },
      {
        id: 'rnn-visualization',
        title: 'RNN Unfolding',
        content: 'Visualize how RNNs process sequences over time',
        type: SectionType.VISUALIZATION,
        order: 2,
        estimatedTime: 10
      },
      {
        id: 'rnn-variants',
        title: 'LSTM and GRU',
        content: 'Advanced RNN architectures for better performance',
        type: SectionType.THEORY,
        order: 3,
        estimatedTime: 15
      },
      {
        id: 'rnn-implementation',
        title: 'Implementation and Training',
        content: 'Build and train RNN models for different tasks',
        type: SectionType.CODE,
        order: 4,
        estimatedTime: 20
      }
    ],
    quiz: [
      {
        id: 'rnn-q1',
        question: 'What is the main challenge with vanilla RNNs?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'They are too slow to train',
          'They suffer from vanishing gradient problem',
          'They require too much memory',
          'They cannot handle text data'
        ],
        correctAnswer: 'They suffer from vanishing gradient problem',
        explanation: 'Vanilla RNNs suffer from vanishing gradients, making it difficult to learn long-term dependencies in sequences.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        points: 15
      }
    ],
    tags: ['sequential-data', 'nlp', 'time-series', 'lstm', 'gru'],
    popularity: 88,
    rating: 4.6,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01')
  },

  // Continue with more algorithms...
  // Adding a few more key algorithms for demonstration

  // Linear Regression
  {
    id: 'linear-regression',
    name: 'Linear Regression',
    shortDescription: 'Fundamental algorithm for predicting continuous values using linear relationships',
    fullDescription: 'Linear regression is a basic and commonly used type of predictive analysis. It shows the relationship between a dependent variable and one or more independent variables using a linear equation.',
    category: AlgorithmCategory.MACHINE_LEARNING,
    difficulty: DifficultyLevel.BEGINNER,
    estimatedTime: 30,
    prerequisites: ['Basic Statistics', 'Linear Algebra'],
    applications: ['Sales Forecasting', 'Risk Assessment', 'Price Prediction', 'Trend Analysis'],
    advantages: ['Simple and interpretable', 'Fast to train', 'No hyperparameters to tune'],
    disadvantages: ['Assumes linear relationship', 'Sensitive to outliers', 'Limited complexity'],
    timeComplexity: 'O(n × m)',
    spaceComplexity: 'O(m)',
    thumbnailUrl: '/images/algorithms/linear-regression.jpg',
    visualizationComponent: 'LinearRegressionVisualization',
    codeExamples: [
      {
        id: 'lr-pytorch',
        language: ProgrammingLanguage.PYTORCH,
        title: 'Linear Regression with PyTorch',
        description: 'Implementation of linear regression using PyTorch',
        code: `import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt
import numpy as np

class LinearRegression(nn.Module):
    def __init__(self, input_dim, output_dim):
        super(LinearRegression, self).__init__()
        self.linear = nn.Linear(input_dim, output_dim)
        
    def forward(self, x):
        return self.linear(x)

# Generate sample data
np.random.seed(42)
n_samples = 100
X = np.random.randn(n_samples, 1)
y = 3 * X.squeeze() + 2 + 0.1 * np.random.randn(n_samples)

# Convert to PyTorch tensors
X_tensor = torch.FloatTensor(X)
y_tensor = torch.FloatTensor(y).view(-1, 1)

# Initialize model, loss, and optimizer
model = LinearRegression(1, 1)
criterion = nn.MSELoss()
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Training loop
epochs = 1000
losses = []

for epoch in range(epochs):
    # Forward pass
    y_pred = model(X_tensor)
    loss = criterion(y_pred, y_tensor)
    
    # Backward pass
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    
    losses.append(loss.item())
    
    if (epoch + 1) % 100 == 0:
        print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')

# Get final parameters
with torch.no_grad():
    weight = model.linear.weight.item()
    bias = model.linear.bias.item()
    print(f'Final parameters: weight={weight:.4f}, bias={bias:.4f}')
    
# Predictions
with torch.no_grad():
    y_pred = model(X_tensor)
    
# Calculate R-squared
def r_squared(y_true, y_pred):
    ss_res = ((y_true - y_pred) ** 2).sum()
    ss_tot = ((y_true - y_true.mean()) ** 2).sum()
    return 1 - (ss_res / ss_tot)

r2 = r_squared(y_tensor, y_pred)
print(f'R-squared: {r2.item():.4f}')`,
        explanation: 'This implementation demonstrates linear regression with gradient descent optimization, showing how to fit a line to data points.',
        runnable: true,
        complexity: {
          time: 'O(n × m)',
          space: 'O(m)'
        }
      }
    ],
    mathematicalBackground: [
      {
        id: 'lr-equation',
        title: 'Linear Regression Equation',
        content: 'The fundamental equation for linear regression',
        latex: 'y = w_0 + w_1x_1 + w_2x_2 + ... + w_nx_n + \\varepsilon',
        explanation: 'Linear regression models the relationship between a dependent variable y and independent variables x using a linear combination of features.',
        examples: ['Simple linear regression: y = mx + b', 'Multiple linear regression', 'Polynomial regression']
      }
    ],
    sections: [
      {
        id: 'lr-theory',
        title: 'Linear Regression Theory',
        content: 'Understanding the mathematical foundation of linear regression',
        type: SectionType.THEORY,
        order: 1,
        estimatedTime: 10
      },
      {
        id: 'lr-visualization',
        title: 'Interactive Visualization',
        content: 'See how the regression line fits the data',
        type: SectionType.VISUALIZATION,
        order: 2,
        estimatedTime: 8
      },
      {
        id: 'lr-implementation',
        title: 'Implementation',
        content: 'Code linear regression from scratch and with libraries',
        type: SectionType.CODE,
        order: 3,
        estimatedTime: 12
      }
    ],
    quiz: [
      {
        id: 'lr-q1',
        question: 'What does the R-squared value represent?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'The correlation coefficient',
          'The proportion of variance explained by the model',
          'The slope of the regression line',
          'The standard error of the estimate'
        ],
        correctAnswer: 'The proportion of variance explained by the model',
        explanation: 'R-squared represents the proportion of the variance in the dependent variable that is predictable from the independent variables.',
        difficulty: DifficultyLevel.BEGINNER,
        points: 10
      }
    ],
    tags: ['regression', 'supervised-learning', 'statistics', 'prediction'],
    popularity: 85,
    rating: 4.5,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01')
  },

  // Support Vector Machine
  {
    id: 'support-vector-machine',
    name: 'Support Vector Machine (SVM)',
    shortDescription: 'Powerful algorithm for classification and regression that finds optimal decision boundaries',
    fullDescription: 'Support Vector Machine is a supervised learning algorithm that finds the hyperplane that best separates different classes by maximizing the margin between them. It can handle both linear and non-linear classification using kernel functions.',
    category: AlgorithmCategory.MACHINE_LEARNING,
    difficulty: DifficultyLevel.INTERMEDIATE,
    estimatedTime: 40,
    prerequisites: ['Linear Algebra', 'Optimization', 'Statistics'],
    applications: ['Text Classification', 'Image Classification', 'Gene Classification', 'Face Recognition'],
    advantages: ['Effective in high dimensions', 'Memory efficient', 'Versatile with kernel functions'],
    disadvantages: ['Slow on large datasets', 'Sensitive to feature scaling', 'No probabilistic output'],
    timeComplexity: 'O(n² × m)',
    spaceComplexity: 'O(n × m)',
    thumbnailUrl: '/images/algorithms/svm.jpg',
    visualizationComponent: 'SVMVisualization',
    codeExamples: [
      {
        id: 'svm-pytorch',
        language: ProgrammingLanguage.PYTORCH,
        title: 'SVM Implementation in PyTorch',
        description: 'Custom SVM implementation using PyTorch for binary classification',
        code: `import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from sklearn.datasets import make_classification
from sklearn.preprocessing import StandardScaler

class SVM(nn.Module):
    def __init__(self, input_dim):
        super(SVM, self).__init__()
        self.linear = nn.Linear(input_dim, 1)
        
    def forward(self, x):
        return self.linear(x)

# Hinge loss for SVM
def hinge_loss(outputs, labels, C=1.0):
    # Convert labels to -1 and 1
    labels = labels * 2 - 1
    
    # Hinge loss: max(0, 1 - y * f(x))
    losses = torch.clamp(1 - labels * outputs.squeeze(), min=0)
    
    # Add regularization term
    l2_reg = 0.01 * torch.sum(torch.pow(model.linear.weight, 2))
    
    return torch.mean(losses) + l2_reg

# Generate sample data
X, y = make_classification(n_samples=1000, n_features=2, n_redundant=0, 
                          n_informative=2, random_state=42, n_clusters_per_class=1)

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Convert to PyTorch tensors
X_tensor = torch.FloatTensor(X_scaled)
y_tensor = torch.FloatTensor(y).view(-1, 1)

# Initialize model and optimizer
model = SVM(input_dim=2)
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Training loop
epochs = 1000
for epoch in range(epochs):
    # Forward pass
    outputs = model(X_tensor)
    loss = hinge_loss(outputs, y_tensor)
    
    # Backward pass
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    
    if (epoch + 1) % 100 == 0:
        print(f'Epoch [{epoch+1}/{epochs}], Loss: {loss.item():.4f}')

# Prediction function
def predict(model, X):
    with torch.no_grad():
        outputs = model(X)
        predictions = (outputs > 0).float()
        return predictions

# Make predictions
predictions = predict(model, X_tensor)
accuracy = (predictions.squeeze() == y_tensor.squeeze()).float().mean()
print(f'Accuracy: {accuracy.item():.4f}')

# Visualize decision boundary (for 2D data)
def plot_decision_boundary(model, X, y):
    import matplotlib.pyplot as plt
    
    # Create a mesh to plot the decision boundary
    h = 0.02
    x_min, x_max = X[:, 0].min() - 1, X[:, 0].max() + 1
    y_min, y_max = X[:, 1].min() - 1, X[:, 1].max() + 1
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                         np.arange(y_min, y_max, h))
    
    # Make predictions on the mesh
    mesh_points = torch.FloatTensor(np.c_[xx.ravel(), yy.ravel()])
    with torch.no_grad():
        Z = model(mesh_points).numpy()
    Z = Z.reshape(xx.shape)
    
    # Plot
    plt.figure(figsize=(10, 8))
    plt.contourf(xx, yy, Z, alpha=0.8, cmap=plt.cm.RdYlBu)
    scatter = plt.scatter(X[:, 0], X[:, 1], c=y, cmap=plt.cm.RdYlBu, edgecolors='black')
    plt.colorbar(scatter)
    plt.title('SVM Decision Boundary')
    plt.xlabel('Feature 1')
    plt.ylabel('Feature 2')
    plt.show()

# Plot decision boundary
plot_decision_boundary(model, X_scaled, y)`,
        explanation: 'This implementation shows how to create a custom SVM using PyTorch with hinge loss and L2 regularization.',
        runnable: true,
        complexity: {
          time: 'O(n² × m)',
          space: 'O(n × m)'
        }
      }
    ],
    mathematicalBackground: [
      {
        id: 'svm-optimization',
        title: 'SVM Optimization Problem',
        content: 'The mathematical formulation of SVM optimization',
        latex: '\\min_{w,b} \\frac{1}{2}||w||^2 + C\\sum_{i=1}^n \\xi_i',
        explanation: 'SVM finds the hyperplane that maximizes the margin while minimizing classification errors, balancing between margin maximization and error minimization.',
        examples: ['Hard margin SVM', 'Soft margin SVM', 'Kernel SVM']
      }
    ],
    sections: [
      {
        id: 'svm-theory',
        title: 'SVM Theory',
        content: 'Understanding margins, support vectors, and optimization',
        type: SectionType.THEORY,
        order: 1,
        estimatedTime: 15
      },
      {
        id: 'svm-visualization',
        title: 'Decision Boundaries',
        content: 'Visualize how SVM finds optimal separating hyperplanes',
        type: SectionType.VISUALIZATION,
        order: 2,
        estimatedTime: 10
      },
      {
        id: 'svm-kernels',
        title: 'Kernel Functions',
        content: 'Learn about different kernel functions for non-linear classification',
        type: SectionType.THEORY,
        order: 3,
        estimatedTime: 10
      },
      {
        id: 'svm-implementation',
        title: 'Implementation',
        content: 'Build SVM from scratch and with libraries',
        type: SectionType.CODE,
        order: 4,
        estimatedTime: 15
      }
    ],
    quiz: [
      {
        id: 'svm-q1',
        question: 'What are support vectors in SVM?',
        type: QuestionType.MULTIPLE_CHOICE,
        options: [
          'All training data points',
          'Data points closest to the decision boundary',
          'Data points farthest from the decision boundary',
          'Incorrectly classified data points'
        ],
        correctAnswer: 'Data points closest to the decision boundary',
        explanation: 'Support vectors are the data points that lie closest to the decision boundary and are critical for determining the optimal hyperplane.',
        difficulty: DifficultyLevel.INTERMEDIATE,
        points: 15
      }
    ],
    tags: ['classification', 'optimization', 'margin', 'kernel-methods'],
    popularity: 78,
    rating: 4.4,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-12-01')
  }

  // We would continue adding more algorithms here...
  // The total would reach 100+ algorithms covering:
  // - Deep Learning: Transformers, GANs, VAEs, ResNet, etc.
  // - Machine Learning: Random Forest, Gradient Boosting, K-Means, etc.
  // - Neural Networks: LSTM, GRU, Attention mechanisms, etc.
  // - Reinforcement Learning: Q-Learning, Policy Gradient, Actor-Critic, etc.
  // - Computer Vision: Object Detection, Semantic Segmentation, etc.
  // - NLP: BERT, GPT, Word2Vec, etc.
  // - Optimization: Genetic Algorithms, Particle Swarm, etc.
  // - Statistical Methods: Bayesian Networks, HMM, etc.
];

// Function to get algorithms by category
export const getAlgorithmsByCategory = (category: AlgorithmCategory): Algorithm[] => {
  return algorithmData.filter(algorithm => algorithm.category === category);
};

// Function to get algorithms by difficulty
export const getAlgorithmsByDifficulty = (difficulty: DifficultyLevel): Algorithm[] => {
  return algorithmData.filter(algorithm => algorithm.difficulty === difficulty);
};

// Function to search algorithms
export const searchAlgorithms = (query: string): Algorithm[] => {
  const lowercaseQuery = query.toLowerCase();
  return algorithmData.filter(algorithm => 
    algorithm.name.toLowerCase().includes(lowercaseQuery) ||
    algorithm.shortDescription.toLowerCase().includes(lowercaseQuery) ||
    algorithm.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Function to get popular algorithms
export const getPopularAlgorithms = (limit: number = 10): Algorithm[] => {
  return algorithmData
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
};

// Function to get recommended algorithms based on user progress
export const getRecommendedAlgorithms = (completedAlgorithms: string[], userLevel: DifficultyLevel): Algorithm[] => {
  const availableAlgorithms = algorithmData.filter(algorithm => 
    !completedAlgorithms.includes(algorithm.id)
  );
  
  // Filter by appropriate difficulty level
  const levelOrder = [DifficultyLevel.BEGINNER, DifficultyLevel.INTERMEDIATE, DifficultyLevel.ADVANCED, DifficultyLevel.EXPERT];
  const userLevelIndex = levelOrder.indexOf(userLevel);
  const appropriateLevels = levelOrder.slice(0, userLevelIndex + 2); // Include current and next level
  
  return availableAlgorithms
    .filter(algorithm => appropriateLevels.includes(algorithm.difficulty))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
};

export default algorithmData;
