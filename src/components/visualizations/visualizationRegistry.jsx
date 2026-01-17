// 1. Import all your visualization components here
import WebStackVisualization from './html/level-1/topic-1/visual-1/visual';
import HtmlLayersVisualization from './html/level-1/topic-1/visual-2/visual-2'
import HtmlTags3DVisualization from './html/level-1/topic-2/visual-1/visual';
import HtmlBoilerplateVisualization from './html/level-1/topic-3/visual';
import HtmlListsVisualizer from './html/level-1/topic-4/visual';
import HtmlAttributesVisualization from './html/level-1/topic-5/visual';
import HtmlLinksImagesBasicsVisualization from './html/level-1/topic-6/visual';
import InlineBlockElementsVisualization from './html/level-2/topic-1/visual';
import SemanticMarkupVisualization from './html/level-2/topic-2/visual';
import HtmlEntitiesEmmetVisualization from './html/level-2/topic-3/visual';
import HtmlTablesVisualization from './html/level-3/topic-1/visual';
import TableSemantic3DVisualization from './html/level-3/topic-2/visual';
import HtmlFormsVisualization from './html/level-3/topic-3/visual';
import CssIntroVisualization from './css/level-1/topic-1/visual';
import CssColorsVisualization from './css/level-1/topic-2/visual';
import CssTextVisualizer from './css/level-1/topic-3/visual';
import CssSelectorsVisualizer from './css/level-2/topic-1/visual';
import CssAdvancedVisualizer from './css/level-2/topic-2/visual';
import CssBoxModelVisualizer from './css/level-2/topic-3/visual'; 
import CssEffectsVisualizer from './css/level-3/topic-1/visual';
import FlexboxLauncher from './css/level-3/topic-2/launcher';
import GridLauncher from './css/level-3/topic-3/launcher';
// import BoxModelViz from '../components/Visualizations/BoxModelViz'; // Example for future

// 2. Create a mapping object
// Key = 'data-type' from your backend HTML
// Value = The React Component
const visualizationRegistry = {
  'web-stack': WebStackVisualization,
  'html-layers-1': HtmlLayersVisualization,
  'html-tags': HtmlTags3DVisualization,
  'html-boilerplate': HtmlBoilerplateVisualization,
  'html-list-visualizer': HtmlListsVisualizer,
  'html-attributes-visualization': HtmlAttributesVisualization,
  'html-links-images-basics-visualization' : HtmlLinksImagesBasicsVisualization,
  'inline-block-elements-visualization' : InlineBlockElementsVisualization,
  'semantic-markup-visualization' : SemanticMarkupVisualization,
  'html-entities-emmet-visualization' : HtmlEntitiesEmmetVisualization,
  'html-tables-visualization' : HtmlTablesVisualization,
  'table-semantic3D-visualization' : TableSemantic3DVisualization,
  'html-forms-visualization' : HtmlFormsVisualization,
  'css-intro-visualization' : CssIntroVisualization,
  'css-colors-visualization' : CssColorsVisualization,
  'css-text-visualizer' : CssTextVisualizer,
  'css-selectors-visualizer' : CssSelectorsVisualizer,
  'css-advanced-visualizer' : CssAdvancedVisualizer,
  'css-box-model-visualizer' : CssBoxModelVisualizer,
  'css-effects-visualizer' : CssEffectsVisualizer,
  'flexbox-visualizer' : FlexboxLauncher,
  'css-master-visualizer' : GridLauncher,


  // 'css-box-model': BoxModelViz,
};

export default visualizationRegistry;