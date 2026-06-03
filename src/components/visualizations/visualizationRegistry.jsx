// 0. Global responsive guardrails for every visualization (must load first)
import './_viz-responsive.css';

// Descriptive Statistics course visualizations
import DescStatsCentralTendencyVisualization from './descstats/level-1/topic-1/visual-1/visual';
import DescStatsSpreadVarianceVisualization from './descstats/level-1/topic-2/visual-1/visual';
import DescStatsDistributionsVisualization from './descstats/level-1/topic-3/visual-1/visual';
import DescStatsProbDistributionsVisualization from './descstats/level-2/topic-1/visual-1/visual';
import DescStatsNormalZVisualization from './descstats/level-2/topic-2/visual-1/visual';
import DescStatsSkewKurtosisVisualization from './descstats/level-2/topic-3/visual-1/visual';
import DescStatsOutliersVisualization from './descstats/level-3/topic-1/visual-1/visual';
import DescStatsCorrelationVisualization from './descstats/level-3/topic-2/visual-1/visual';
import DescStatsSummaryPyVisualization from './descstats/level-3/topic-3/visual-1/visual';

// 1. Import all your visualization components here
import WebStackVisualization from './html/level-1/topic-1/visual-1/visual';
// Authentication (JWT) course visualizations
import AuthSessionsTokensVisualization from './auth/level-1/topic-1/visual-1/visual';
import AuthBcryptHashingVisualization from './auth/level-1/topic-2/visual-1/visual';
import AuthJwtSigningVisualization from './auth/level-1/topic-3/visual-1/visual';
import AuthMiddlewareVisualization from './auth/level-2/topic-1/visual-1/visual';
import AuthRefreshTokensVisualization from './auth/level-2/topic-2/visual-1/visual';
import AuthRbacVisualization from './auth/level-2/topic-3/visual-1/visual';
import AuthProtectedRoutesVisualization from './auth/level-3/topic-1/visual-1/visual';
import AuthPasswordResetVisualization from './auth/level-3/topic-2/visual-1/visual';
import AuthSecurityBestPracticesVisualization from './auth/level-3/topic-3/visual-1/visual';
// MongoDB course visualizations
import MdbDocumentsVisualization from './mongodb/level-1/topic-1/visual-1/visual';
import MdbCrudOpsVisualization from './mongodb/level-1/topic-2/visual-1/visual';
import MdbQueryOperatorsVisualization from './mongodb/level-1/topic-3/visual-1/visual';
import MdbIndexesVisualization from './mongodb/level-2/topic-1/visual-1/visual';
import MdbAggregationVisualization from './mongodb/level-2/topic-2/visual-1/visual';
import MdbSchemaDesignVisualization from './mongodb/level-2/topic-3/visual-1/visual';
import MdbSchemasModelsVisualization from './mongodb/level-3/topic-1/visual-1/visual';
import MdbValidationMiddlewareVisualization from './mongodb/level-3/topic-2/visual-1/visual';
import MdbPopulationLeanVisualization from './mongodb/level-3/topic-3/visual-1/visual';
// React course visualizations
import RctComponentsVisualization from './react/level-1/topic-1/visual-1/visual';
import RctPropsStateVisualization from './react/level-1/topic-2/visual-1/visual';
import RctEventsConditionalVisualization from './react/level-1/topic-3/visual-1/visual';
import RctUseStateEffectVisualization from './react/level-2/topic-1/visual-1/visual';
import RctUseRefMemoVisualization from './react/level-2/topic-2/visual-1/visual';
import RctUseContextVisualization from './react/level-2/topic-3/visual-1/visual';
import RctCustomHooksVisualization from './react/level-2/topic-4/visual-1/visual';
import RctRouterVisualization from './react/level-3/topic-1/visual-1/visual';
import RctStateManagementVisualization from './react/level-3/topic-2/visual-1/visual';
// SQL course visualizations
import SqlDbFoundationsVisualization from './sql/level-1/topic-1/visual-1/visual';
import SqlWritingDataVisualization from './sql/level-1/topic-2/visual-1/visual';
import SqlJoinsVisualization from './sql/level-1/topic-3/visual-1/visual';
import SqlAggregationsVisualization from './sql/level-2/topic-1/visual-1/visual';
import SqlSubqueriesVisualization from './sql/level-2/topic-2/visual-1/visual';
import SqlWindowFunctionsVisualization from './sql/level-2/topic-3/visual-1/visual';
import SqlIndexesPerformanceVisualization from './sql/level-3/topic-1/visual-1/visual';
import SqlTransactionsVisualization from './sql/level-3/topic-2/visual-1/visual';
import SqlStoredProceduresVisualization from './sql/level-3/topic-3/visual-1/visual';
// Backend (Node.js / Express) visualizations
import BkndNodeIntroVisualization from './backend/level-1/topic-1/visual-1/visual';
import BkndExpressIntroVisualization from './backend/level-2/topic-1/visual-1/visual';
import BkndExpressDeepDiveVisualization from './backend/level-2/topic-2/visual-1/visual';
import BkndEjsTemplatingVisualization from './backend/level-3/topic-1/visual-1/visual';
import BkndGetPostFormVisualization from './backend/level-3/topic-2/visual-1/visual';
import BkndMiddlewareVisualization from './backend/level-3/topic-3/visual-1/visual';
import BkndAdvancedEjsVisualization from './backend/level-3/topic-4/visual-1/visual';
import BkndJsOopVisualization from './backend/level-3/topic-5/visual-1/visual';
import BkndMvcProjectVisualization from './backend/level-4/topic-1/visual-1/visual';
import BkndRestCrudVisualization from './backend/level-5/topic-1/visual-1/visual';
import BkndRestfulApiVisualization from './backend/level-5/topic-2/visual-1/visual';
// Git & GitHub visualizations
import GitWhatIsGitVisualization from './git/level-1/topic-1/visual-1/visual';
import GitFirstRepoVisualization from './git/level-1/topic-2/visual-1/visual';
import GitBranchingMergingVisualization from './git/level-1/topic-3/visual-1/visual';
import GitRemoteReposVisualization from './git/level-2/topic-1/visual-1/visual';
import GitPullRequestsVisualization from './git/level-2/topic-2/visual-1/visual';
import GitIssuesProjectsVisualization from './git/level-2/topic-3/visual-1/visual';
import GitBranchingStrategiesVisualization from './git/level-3/topic-1/visual-1/visual';
import GitAdvancedCommandsVisualization from './git/level-3/topic-2/visual-1/visual';
import GitHooksConventionalCommitsVisualization from './git/level-3/topic-3/visual-1/visual';
// JavaScript visualizations
import JsVariablesDatatypesVisualization from './javascript/level-1/topic-1/visual';
import JsOperatorsConditionsVisualization from './javascript/level-1/topic-2/visual-1/visual';
import JsLoopsVisualization from './javascript/level-2/topic-1/visual-1/visual';
import JsObjectsMathVisualization from './javascript/level-2/topic-2/visual-1/visual';
import JsFunctionsVisualization from './javascript/level-2/topic-3/visual-1/visual';
import JsThisArrowAsyncVisualization from './javascript/level-2/topic-4/visual-1/visual';
import JsArrayMethodsSpreadVisualization from './javascript/level-3/topic-1/visual-1/visual';
import JsDomManipulationVisualization from './javascript/level-3/topic-2/visual-1/visual';
import JsDomEventsVisualization from './javascript/level-3/topic-3/visual-1/visual';
import JsAsyncPromisesVisualization from './javascript/level-3/topic-4/visual-1/visual';
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
import SqlQueryVisual from './sql/level-1/topic-1/visual';
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
  'sql-intro-visualization' : SqlQueryVisual,

  // Descriptive Statistics course
  'descstats-central-tendency-visualization'  : DescStatsCentralTendencyVisualization,
  'descstats-spread-variance-visualization'   : DescStatsSpreadVarianceVisualization,
  'descstats-distributions-visualization'     : DescStatsDistributionsVisualization,
  'descstats-prob-distributions-visualization': DescStatsProbDistributionsVisualization,
  'descstats-normal-zscores-visualization'    : DescStatsNormalZVisualization,
  'descstats-skewness-kurtosis-visualization' : DescStatsSkewKurtosisVisualization,
  'descstats-outliers-visualization'          : DescStatsOutliersVisualization,
  'descstats-correlation-visualization'       : DescStatsCorrelationVisualization,
  'descstats-summary-python-visualization'    : DescStatsSummaryPyVisualization,

  // Authentication (JWT) course
  'auth-sessions-tokens-visualization'      : AuthSessionsTokensVisualization,
  'auth-bcrypt-hashing-visualization'       : AuthBcryptHashingVisualization,
  'auth-jwt-signing-visualization'          : AuthJwtSigningVisualization,
  'auth-middleware-visualization'           : AuthMiddlewareVisualization,
  'auth-refresh-tokens-visualization'       : AuthRefreshTokensVisualization,
  'auth-rbac-visualization'                 : AuthRbacVisualization,
  'auth-protected-routes-visualization'     : AuthProtectedRoutesVisualization,
  'auth-password-reset-visualization'       : AuthPasswordResetVisualization,
  'auth-security-best-practices-visualization' : AuthSecurityBestPracticesVisualization,

  // MongoDB course
  'mongodb-documents-visualization'         : MdbDocumentsVisualization,
  'mongodb-crud-visualization'              : MdbCrudOpsVisualization,
  'mongodb-query-operators-visualization'   : MdbQueryOperatorsVisualization,
  'mongodb-indexes-visualization'           : MdbIndexesVisualization,
  'mongodb-aggregation-visualization'       : MdbAggregationVisualization,
  'mongodb-schema-design-visualization'     : MdbSchemaDesignVisualization,
  'mongodb-schemas-models-visualization'    : MdbSchemasModelsVisualization,
  'mongodb-validation-middleware-visualization' : MdbValidationMiddlewareVisualization,
  'mongodb-population-lean-visualization'   : MdbPopulationLeanVisualization,

  // React course
  'rct-components-visualization'          : RctComponentsVisualization,
  'rct-props-state-visualization'         : RctPropsStateVisualization,
  'rct-events-conditional-visualization'  : RctEventsConditionalVisualization,
  'rct-usestate-effect-visualization'     : RctUseStateEffectVisualization,
  'rct-useref-memo-visualization'         : RctUseRefMemoVisualization,
  'rct-usecontext-visualization'          : RctUseContextVisualization,
  'rct-custom-hooks-visualization'        : RctCustomHooksVisualization,
  'rct-router-visualization'              : RctRouterVisualization,
  'rct-state-management-visualization'    : RctStateManagementVisualization,

  // SQL course
  'sql-db-foundations-visualization'       : SqlDbFoundationsVisualization,
  'sql-writing-data-visualization'         : SqlWritingDataVisualization,
  'sql-joins-visualization'                : SqlJoinsVisualization,
  'sql-aggregations-visualization'         : SqlAggregationsVisualization,
  'sql-subqueries-visualization'           : SqlSubqueriesVisualization,
  'sql-window-functions-visualization'     : SqlWindowFunctionsVisualization,
  'sql-indexes-performance-visualization'  : SqlIndexesPerformanceVisualization,
  'sql-transactions-visualization'         : SqlTransactionsVisualization,
  'sql-stored-procedures-visualization'    : SqlStoredProceduresVisualization,

  // Backend (Node.js / Express) course
  'bknd-node-intro-visualization'               : BkndNodeIntroVisualization,
  'bknd-express-intro-visualization'            : BkndExpressIntroVisualization,
  'bknd-express-deepdive-visualization'         : BkndExpressDeepDiveVisualization,
  'bknd-ejs-templating-visualization'           : BkndEjsTemplatingVisualization,
  'bknd-get-post-form-visualization'            : BkndGetPostFormVisualization,
  'bknd-middleware-visualization'               : BkndMiddlewareVisualization,
  'bknd-advanced-ejs-visualization'             : BkndAdvancedEjsVisualization,
  'bknd-js-oop-visualization'                   : BkndJsOopVisualization,
  'bknd-mvc-project-visualization'              : BkndMvcProjectVisualization,
  'bknd-rest-crud-visualization'                : BkndRestCrudVisualization,
  'bknd-restful-api-visualization'              : BkndRestfulApiVisualization,

  // Git & GitHub course
  'git-what-is-git-visualization'               : GitWhatIsGitVisualization,
  'git-first-repo-visualization'                : GitFirstRepoVisualization,
  'git-branching-merging-visualization'         : GitBranchingMergingVisualization,
  'git-remote-repos-visualization'              : GitRemoteReposVisualization,
  'git-pull-requests-visualization'             : GitPullRequestsVisualization,
  'git-issues-projects-visualization'           : GitIssuesProjectsVisualization,
  'git-branching-strategies-visualization'      : GitBranchingStrategiesVisualization,
  'git-advanced-commands-visualization'         : GitAdvancedCommandsVisualization,
  'git-hooks-conventional-commits-visualization': GitHooksConventionalCommitsVisualization,

  // JavaScript course
  'js-variables-datatypes-visualization'  : JsVariablesDatatypesVisualization,
  'js-operators-conditions-visualization' : JsOperatorsConditionsVisualization,
  'js-loops-visualization'                : JsLoopsVisualization,
  'js-objects-math-visualization'         : JsObjectsMathVisualization,
  'js-functions-visualization'            : JsFunctionsVisualization,
  'js-this-arrow-async-visualization'     : JsThisArrowAsyncVisualization,
  'js-array-methods-spread-visualization' : JsArrayMethodsSpreadVisualization,
  'js-dom-manipulation-visualization'     : JsDomManipulationVisualization,
  'js-dom-events-visualization'           : JsDomEventsVisualization,
  'js-async-promises-visualization'       : JsAsyncPromisesVisualization,

  // 'css-box-model': BoxModelViz,
};

export default visualizationRegistry;