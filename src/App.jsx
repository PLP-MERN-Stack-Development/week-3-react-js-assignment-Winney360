import Button from './components/Button';
import './index.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Layout from './components/Layout';
import TaskManager from './components/TaskManager';
import ApiData from './components/ApiData';
import Card from './components/Card';



function App() {
  return (
    <Router>
      <ThemeProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TaskPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

const HomePage = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 animate-fade-in">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to My Task Manager</h2>
          
          <div className="flex items-center gap-4 my-4">
            <Button onClick={() => setCount(c => c - 1)} variant="danger">
              -
            </Button>
            <span className="text-xl font-bold">{count}</span>
            <Button onClick={() => setCount(c => c + 1)} variant="success">
              +
            </Button>
          </div>

        

          <p className="text-gray-500 dark:text-gray-400 mt-4">
            Click on the "Tasks" link in the navbar to manage your tasks
          </p>
        </div>
      </div>
            
      <ApiData />
    </div>
  );
};

const TaskPage = () => {
  return (
    <div className="space-y-8">
      <TaskManager />
    </div>
  );
};



export default App;