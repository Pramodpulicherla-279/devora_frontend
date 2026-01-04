// 1. Import all your visualization components here
import WebStackVisualization from '../visualizations/visual';
// import BoxModelViz from '../components/Visualizations/BoxModelViz'; // Example for future

// 2. Create a mapping object
// Key = 'data-type' from your backend HTML
// Value = The React Component
const visualizationRegistry = {
  'web-stack': WebStackVisualization,
  // 'css-box-model': BoxModelViz,
};

export default visualizationRegistry;