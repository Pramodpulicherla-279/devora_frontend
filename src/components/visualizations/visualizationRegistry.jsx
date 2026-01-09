// 1. Import all your visualization components here
import WebStackVisualization from './html/level-1/topic-1/visual-1/visual';
import HtmlLayersVisualization from './html/level-1/topic-1/visual-2/visual-2'
import HtmlTags3DVisualization from './html/level-1/topic-2/visual-1/visual';
import HtmlBoilerplateVisualization from './html/level-1/topic-3/visual';
import HtmlListsVisualizer from './html/level-1/topic-4/visual'
// import BoxModelViz from '../components/Visualizations/BoxModelViz'; // Example for future

// 2. Create a mapping object
// Key = 'data-type' from your backend HTML
// Value = The React Component
const visualizationRegistry = {
  'web-stack': WebStackVisualization,
  'html-layers-1': HtmlLayersVisualization,
  'html-tags': HtmlTags3DVisualization,
  'html-boilerplate': HtmlBoilerplateVisualization,
  'html-list-visualizer': HtmlListsVisualizer

  // 'css-box-model': BoxModelViz,
};

export default visualizationRegistry;