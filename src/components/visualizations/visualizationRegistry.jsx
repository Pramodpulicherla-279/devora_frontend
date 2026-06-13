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

// Inferential Statistics course visualizations
import InfStatsIntroVisualization from './infstats/level-1/topic-1/visual-1/visual';
import InfStatsProbabilityVisualization from './infstats/level-1/topic-2/visual-1/visual';
import InfStatsSamplingVisualization from './infstats/level-1/topic-3/visual-1/visual';
import InfStatsHypothesisVisualization from './infstats/level-2/topic-1/visual-1/visual';
import InfStatsPValueVisualization from './infstats/level-2/topic-2/visual-1/visual';
import InfStatsTZVisualization from './infstats/level-2/topic-3/visual-1/visual';
import InfStatsCIVisualization from './infstats/level-3/topic-1/visual-1/visual';
import InfStatsABVisualization from './infstats/level-3/topic-2/visual-1/visual';
import InfStatsChiSquareVisualization from './infstats/level-3/topic-3/visual-1/visual';

// Machine Learning Intro course visualizations
import MlWhatIsVisualization from './ml/level-1/topic-1/visual-1/visual';
import MlFeatureEngVisualization from './ml/level-1/topic-2/visual-1/visual';
import MlTrainTestSplitVisualization from './ml/level-1/topic-3/visual-1/visual';
import MlLinearRegressionVisualization from './ml/level-2/topic-1/visual-1/visual';
import MlDecisionTreeVisualization from './ml/level-2/topic-2/visual-1/visual';
import MlClassMetricsVisualization from './ml/level-2/topic-3/visual-1/visual';
import MlSklearnApiVisualization from './ml/level-3/topic-1/visual-1/visual';
import MlCrossValidationVisualization from './ml/level-3/topic-2/visual-1/visual';
import MlPipelineVisualization from './ml/level-3/topic-3/visual-1/visual';

// AI & LLM Basics course visualizations
import LlmWhatIsVisualization from './llm/level-1/topic-1/visual-1/visual';
import LlmTokenisationVisualization from './llm/level-1/topic-2/visual-1/visual';
import LlmTemperatureVisualization from './llm/level-1/topic-3/visual-1/visual';
import LlmGptVisualization from './llm/level-2/topic-1/visual-1/visual';
import LlmClaudeGeminiVisualization from './llm/level-2/topic-2/visual-1/visual';
import LlmOpenSourceVisualization from './llm/level-2/topic-3/visual-1/visual';
import LlmHallucinationVisualization from './llm/level-3/topic-1/visual-1/visual';
import LlmInjectionVisualization from './llm/level-3/topic-2/visual-1/visual';

// RAG & Fine-Tuning course visualizations
import RagIntroVisualization from './rag/level-1/topic-1/visual-1/visual';
import RagEmbeddingsVisualization from './rag/level-1/topic-2/visual-1/visual';
import RagRetrievalVisualization from './rag/level-1/topic-3/visual-1/visual';
import RagAgentVisualization from './rag/level-2/topic-1/visual-1/visual';
import RagToolVisualization from './rag/level-2/topic-2/visual-1/visual';
import RagPlanningVisualization from './rag/level-2/topic-3/visual-1/visual';
import RagFineTuneVisualization from './rag/level-3/topic-1/visual-1/visual';
import RagDatasetVisualization from './rag/level-3/topic-2/visual-1/visual';
import RagEvalVisualization from './rag/level-3/topic-3/visual-1/visual';

// Building AI Apps course visualizations
// import AiAppApiBasicsVisualization from './aiapps/level-1/topic-1/visual-1/visual';
// import AiAppStreamingVisualization from './aiapps/level-1/topic-2/visual-1/visual';
// import AiAppCostVisualization from './aiapps/level-1/topic-3/visual-1/visual';
// import AiAppChainsVisualization from './aiapps/level-2/topic-1/visual-1/visual';
// import AiAppDocsVisualization from './aiapps/level-2/topic-2/visual-1/visual';
// import AiAppLlamaIndexVisualization from './aiapps/level-2/topic-3/visual-1/visual';
// import AiAppEvalVisualization from './aiapps/level-3/topic-1/visual-1/visual';
// import AiAppAbPromptsVisualization from './aiapps/level-3/topic-2/visual-1/visual';
// import AiAppRedTeamVisualization from './aiapps/level-3/topic-3/visual-1/visual';

// Angular course visualizations
import NgCliVisualization from './angular/level-1/topic-1/visual-1/visual';
import NgComponentsVisualization from './angular/level-1/topic-2/visual-1/visual';
import NgBindingVisualization from './angular/level-1/topic-3/visual-1/visual';
import NgPipesVisualization from './angular/level-1/topic-4/visual-1/visual';
import NgDiVisualization from './angular/level-2/topic-1/visual-1/visual';
import NgHttpVisualization from './angular/level-2/topic-2/visual-1/visual';
import NgRxjsVisualization from './angular/level-2/topic-3/visual-1/visual';
import NgRouterVisualization from './angular/level-3/topic-1/visual-1/visual';
import NgGuardVisualization from './angular/level-3/topic-2/visual-1/visual';
import NgReactiveFormsVisualization from './angular/level-3/topic-3/visual-1/visual';

// Pandas & NumPy course visualizations
import PdReadVisualization from './pandas/level-1/topic-1/visual-1/visual';
import PdWhatVisualization from './pandas/level-1/topic-2/visual-1/visual';
import PdSelectVisualization from './pandas/level-1/topic-3/visual-1/visual';
import PdExploreVisualization from './pandas/level-1/topic-4/visual-1/visual';
import PdGroupVisualization from './pandas/level-2/topic-1/visual-1/visual';
import PdColsVisualization from './pandas/level-2/topic-2/visual-1/visual';
import PdNaVisualization from './pandas/level-2/topic-3/visual-1/visual';
import PdDatesVisualization from './pandas/level-2/topic-4/visual-1/visual';
import PdStrVisualization from './pandas/level-2/topic-5/visual-1/visual';
import PdCleanVisualization from './pandas/level-3/topic-1/visual-1/visual';
import PdNumpyVisualization from './pandas/level-3/topic-2/visual-1/visual';
import PdWorkflowVisualization from './pandas/level-3/topic-3/visual-1/visual';

// Python Basics for Analysts course visualizations
import PyVariablesVisualization from './python/level-1/topic-2/visual-1/visual';
import PyCollectionsVisualization from './python/level-1/topic-3/visual-1/visual';
import PyLoopVisualization from './python/level-2/topic-1/visual-1/visual';
import PyFunctionsVisualization from './python/level-2/topic-2/visual-1/visual';
import PyComprehensionVisualization from './python/level-3/topic-1/visual-1/visual';
import PyErrorVisualization from './python/level-3/topic-2/visual-1/visual';
import PyProjectVisualization from './python/level-3/topic-3/visual-1/visual';
import PyRegexVisualization from './python/level-3/topic-4/visual-1/visual';

// Vite / Webpack course visualizations
import BtWhyVisualization from './buildtools/level-1/topic-1/visual-1/visual';
import BtViteVisualization from './buildtools/level-1/topic-2/visual-1/visual';
import BtConfigVisualization from './buildtools/level-1/topic-3/visual-1/visual';
import BtEnvVisualization from './buildtools/level-2/topic-1/visual-1/visual';
import BtBuildVisualization from './buildtools/level-2/topic-2/visual-1/visual';
import BtSplitVisualization from './buildtools/level-2/topic-3/visual-1/visual';
import BtWebpackVisualization from './buildtools/level-3/topic-1/visual-1/visual';
import BtDevServerVisualization from './buildtools/level-3/topic-2/visual-1/visual';
import BtOptimizeVisualization from './buildtools/level-3/topic-3/visual-1/visual';

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

  // Inferential Statistics course
  'infstats-intro-visualization'              : InfStatsIntroVisualization,
  'infstats-probability-visualization'        : InfStatsProbabilityVisualization,
  'infstats-sampling-visualization'           : InfStatsSamplingVisualization,
  'infstats-hypothesis-visualization'         : InfStatsHypothesisVisualization,
  'infstats-pvalue-visualization'             : InfStatsPValueVisualization,
  'infstats-t-z-tests-visualization'          : InfStatsTZVisualization,
  'infstats-confidence-intervals-visualization': InfStatsCIVisualization,
  'infstats-ab-testing-visualization'         : InfStatsABVisualization,
  'infstats-chi-square-visualization'         : InfStatsChiSquareVisualization,

  // Machine Learning Intro course
  'ml-what-is-visualization'                  : MlWhatIsVisualization,
  'ml-feature-engineering-visualization'      : MlFeatureEngVisualization,
  'ml-train-test-split-visualization'         : MlTrainTestSplitVisualization,
  'ml-linear-regression-visualization'        : MlLinearRegressionVisualization,
  'ml-decision-trees-visualization'           : MlDecisionTreeVisualization,
  'ml-classification-metrics-visualization'   : MlClassMetricsVisualization,
  'ml-sklearn-api-visualization'              : MlSklearnApiVisualization,
  'ml-cross-validation-visualization'         : MlCrossValidationVisualization,
  'ml-pipeline-visualization'                 : MlPipelineVisualization,

  // AI & LLM Basics course
  'llm-what-is-visualization'                 : LlmWhatIsVisualization,
  'llm-tokenisation-visualization'            : LlmTokenisationVisualization,
  'llm-temperature-visualization'             : LlmTemperatureVisualization,
  'llm-gpt-visualization'                     : LlmGptVisualization,
  'llm-claude-gemini-visualization'           : LlmClaudeGeminiVisualization,
  'llm-open-source-visualization'             : LlmOpenSourceVisualization,
  'llm-hallucinations-bias-visualization'     : LlmHallucinationVisualization,
  'llm-prompt-injection-visualization'        : LlmInjectionVisualization,

  // RAG & Fine-Tuning course
  'rag-intro-visualization'                   : RagIntroVisualization,
  'rag-embeddings-visualization'              : RagEmbeddingsVisualization,
  'rag-retrieval-visualization'               : RagRetrievalVisualization,
  'rag-agents-visualization'                  : RagAgentVisualization,
  'rag-function-calling-visualization'        : RagToolVisualization,
  'rag-multi-step-planning-visualization'     : RagPlanningVisualization,
  'rag-fine-tune-vs-prompt-visualization'     : RagFineTuneVisualization,
  'rag-dataset-prep-visualization'            : RagDatasetVisualization,
  'rag-eval-fine-tuned-visualization'         : RagEvalVisualization,

  // Building AI Apps course
  // 'aiapps-api-basics-visualization'           : AiAppApiBasicsVisualization,
  // 'aiapps-streaming-visualization'            : AiAppStreamingVisualization,
  // 'aiapps-cost-optimisation-visualization'    : AiAppCostVisualization,
  // 'aiapps-chains-visualization'               : AiAppChainsVisualization,
  // 'aiapps-loaders-vectorstores-visualization' : AiAppDocsVisualization,
  // 'aiapps-llamaindex-visualization'           : AiAppLlamaIndexVisualization,
  // 'aiapps-evaluation-metrics-visualization'   : AiAppEvalVisualization,
  // 'aiapps-ab-testing-prompts-visualization'   : AiAppAbPromptsVisualization,
  // 'aiapps-red-teaming-visualization'          : AiAppRedTeamVisualization,

  // Angular course
  'angular-cli-structure-visualization'       : NgCliVisualization,
  'angular-components-visualization'          : NgComponentsVisualization,
  'angular-data-binding-visualization'        : NgBindingVisualization,
  'angular-pipes-visualization'               : NgPipesVisualization,
  'angular-dependency-injection-visualization': NgDiVisualization,
  'angular-httpclient-visualization'          : NgHttpVisualization,
  'angular-rxjs-visualization'                : NgRxjsVisualization,
  'angular-router-visualization'              : NgRouterVisualization,
  'angular-guards-lazy-loading-visualization' : NgGuardVisualization,
  'angular-reactive-forms-visualization'      : NgReactiveFormsVisualization,

  // Pandas & NumPy course
  'pandas-reading-data-visualization'         : PdReadVisualization,
  'pandas-what-is-visualization'              : PdWhatVisualization,
  'pandas-select-filter-sort-visualization'   : PdSelectVisualization,
  'pandas-exploring-visualization'            : PdExploreVisualization,
  'pandas-groupby-merge-visualization'        : PdGroupVisualization,
  'pandas-transform-columns-visualization'    : PdColsVisualization,
  'pandas-missing-data-visualization'         : PdNaVisualization,
  'pandas-dates-times-visualization'          : PdDatesVisualization,
  'pandas-string-cleaning-visualization'      : PdStrVisualization,
  'pandas-data-cleaning-visualization'        : PdCleanVisualization,
  'pandas-numpy-arrays-visualization'         : PdNumpyVisualization,
  'pandas-workflow-visualization'             : PdWorkflowVisualization,

  // Python Basics for Analysts course
  'python-variables-visualization'            : PyVariablesVisualization,
  'python-collections-visualization'          : PyCollectionsVisualization,
  'python-loops-visualization'                : PyLoopVisualization,
  'python-functions-visualization'            : PyFunctionsVisualization,
  'python-comprehensions-visualization'       : PyComprehensionVisualization,
  'python-error-handling-visualization'       : PyErrorVisualization,
  'python-project-structure-visualization'    : PyProjectVisualization,
  'python-regex-visualization'                : PyRegexVisualization,

  // Vite / Webpack course
  'buildtools-why-visualization'              : BtWhyVisualization,
  'buildtools-vite-start-visualization'       : BtViteVisualization,
  'buildtools-vite-config-visualization'      : BtConfigVisualization,
  'buildtools-env-modes-visualization'        : BtEnvVisualization,
  'buildtools-build-preview-visualization'    : BtBuildVisualization,
  'buildtools-code-splitting-visualization'   : BtSplitVisualization,
  'buildtools-webpack-core-visualization'     : BtWebpackVisualization,
  'buildtools-dev-server-visualization'       : BtDevServerVisualization,
  'buildtools-optimize-bundle-visualization'  : BtOptimizeVisualization,

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