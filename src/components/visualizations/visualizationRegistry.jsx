// 0. Global responsive guardrails for every visualization (must load first)
import './_viz-responsive.css';

// Descriptive Statistics course visualizations
import DescStatsWhatIsVisualization from './descstats/level-1/topic-1/visual-1/visual';
import DescStatsCentralTendencyVisualization from './descstats/level-1/topic-2/visual-1/visual';
import DescStatsSpreadVisualization from './descstats/level-1/topic-3/visual-1/visual';
import DescStatsPercentilesVisualization from './descstats/level-1/topic-4/visual-1/visual';
import DescStatsSkewKurtosisVisualization from './descstats/level-1/topic-5/visual-1/visual';
import DescStatsCorrelationVisualization from './descstats/level-2/topic-1/visual-1/visual';
import DescStatsContingencyVisualization from './descstats/level-2/topic-2/visual-1/visual';
import DescStatsOutliersVisualization from './descstats/level-2/topic-3/visual-1/visual';
import DescStatsPythonVisualization from './descstats/level-2/topic-4/visual-1/visual';
import DescStatsChoosingVisualization from './descstats/level-3/topic-1/visual-1/visual';
import DescStatsSimpsonsVisualization from './descstats/level-3/topic-2/visual-1/visual';
import DescStatsWeightedVisualization from './descstats/level-3/topic-3/visual-1/visual';
import DescStatsReportVisualization from './descstats/level-3/topic-4/visual-1/visual';

// Inferential Statistics course visualizations
import InfStatsProbIntroVisualization from './infstats/level-1/topic-1/visual-1/visual';
import InfStatsDistributionsVisualization from './infstats/level-1/topic-2/visual-1/visual';
import InfStatsCltVisualization from './infstats/level-1/topic-3/visual-1/visual';
import InfStatsSamplingVisualization from './infstats/level-1/topic-4/visual-1/visual';
import InfStatsHypothesisVisualization from './infstats/level-2/topic-1/visual-1/visual';
import InfStatsTTestsVisualization from './infstats/level-2/topic-2/visual-1/visual';
import InfStatsChiSquareVisualization from './infstats/level-2/topic-3/visual-1/visual';
import InfStatsAnovaVisualization from './infstats/level-2/topic-4/visual-1/visual';
import InfStatsCIVisualization from './infstats/level-3/topic-1/visual-1/visual';
import InfStatsErrorTypesVisualization from './infstats/level-3/topic-2/visual-1/visual';
import InfStatsPowerVisualization from './infstats/level-3/topic-3/visual-1/visual';
import InfStatsABTestVisualization from './infstats/level-3/topic-4/visual-1/visual';

// Machine Learning Intro course visualizations
import MlWhatIsVisualization from './ml/level-1/topic-1/visual-1/visual';
import MlSupervisedUnsupervisedVisualization from './ml/level-1/topic-2/visual-1/visual';
import MlFirstPipelineVisualization from './ml/level-1/topic-3/visual-1/visual';
import MlFeatureEngVisualization from './ml/level-1/topic-4/visual-1/visual';
import MlBiasVarianceVisualization from './ml/level-1/topic-5/visual-1/visual';
import MlLinearRegressionVisualization from './ml/level-2/topic-1/visual-1/visual';
import MlLogisticRegressionVisualization from './ml/level-2/topic-2/visual-1/visual';
import MlDecisionTreeVisualization from './ml/level-2/topic-3/visual-1/visual';
import MlRandomForestVisualization from './ml/level-2/topic-4/visual-1/visual';
import MlKMeansVisualization from './ml/level-2/topic-5/visual-1/visual';
import MlModelEvalVisualization from './ml/level-3/topic-1/visual-1/visual';
import MlCrossValidationVisualization from './ml/level-3/topic-2/visual-1/visual';
import MlOverfittingVisualization from './ml/level-3/topic-3/visual-1/visual';
import MlSaveLoadVisualization from './ml/level-3/topic-4/visual-1/visual';
import MlEndToEndVisualization from './ml/level-3/topic-5/visual-1/visual';

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
import PdWhatIsVisualization from './pandas/level-1/topic-1/visual-1/visual';
import PdLoadingVisualization from './pandas/level-1/topic-2/visual-1/visual';
import PdExploreDataVisualization from './pandas/level-1/topic-3/visual-1/visual';
import PdSelectLocVisualization from './pandas/level-1/topic-4/visual-1/visual';
import PdNumpyArraysVisualization from './pandas/level-1/topic-5/visual-1/visual';
import PdFilterSortVisualization from './pandas/level-2/topic-1/visual-1/visual';
import PdMissingDataVisualization from './pandas/level-2/topic-2/visual-1/visual';
import PdApplyMapVisualization from './pandas/level-2/topic-3/visual-1/visual';
import PdStrAccessorVisualization from './pandas/level-2/topic-4/visual-1/visual';
import PdColManageVisualization from './pandas/level-2/topic-5/visual-1/visual';
import PdGroupByVisualization from './pandas/level-3/topic-1/visual-1/visual';
import PdMergeJoinVisualization from './pandas/level-3/topic-2/visual-1/visual';
import PdPivotTableVisualization from './pandas/level-3/topic-3/visual-1/visual';
import PdExportVisualization from './pandas/level-3/topic-4/visual-1/visual';
import PdTimeSeriesVisualization from './pandas/level-3/topic-5/visual-1/visual';

// Python Basics for Data Analysts course visualizations
import PySetupVisualization from './python/level-1/topic-1/visual-1/visual';
import PyVariablesVisualization from './python/level-1/topic-2/visual-1/visual';
import PyCollectionsVisualization from './python/level-1/topic-3/visual-1/visual';
import PyLoopsVisualization from './python/level-1/topic-4/visual-1/visual';
import PyFunctionsVisualization from './python/level-1/topic-5/visual-1/visual';
import PyFileIOVisualization from './python/level-1/topic-6/visual-1/visual';
import PyVenvVisualization from './python/level-2/topic-1/visual-1/visual';
import PyJupyterVisualization from './python/level-2/topic-2/visual-1/visual';
import PyReadCsvJsonVisualization from './python/level-2/topic-3/visual-1/visual';
import PyStrManipVisualization from './python/level-2/topic-4/visual-1/visual';
import PyErrorHandlingVisualization from './python/level-3/topic-1/visual-1/visual';
import PyComprehensionVisualization from './python/level-3/topic-2/visual-1/visual';
import PyDatesVisualization from './python/level-3/topic-3/visual-1/visual';
import PyPipelineVisualization from './python/level-3/topic-4/visual-1/visual';

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
// Data Visualisation — Matplotlib, Seaborn & Beyond course visualizations
import DvWhyVisualization from './dataviz/level-1/topic-1/visual-1/visual';
import DvLineBarVisualization from './dataviz/level-1/topic-2/visual-1/visual';
import DvScatterVisualization from './dataviz/level-1/topic-3/visual-1/visual';
import DvHistogramVisualization from './dataviz/level-1/topic-4/visual-1/visual';
import DvCustomizeVisualization from './dataviz/level-1/topic-5/visual-1/visual';
import DvSeabornIntroVisualization from './dataviz/level-2/topic-1/visual-1/visual';
import DvDistplotVisualization from './dataviz/level-2/topic-2/visual-1/visual';
import DvCatplotVisualization from './dataviz/level-2/topic-3/visual-1/visual';
import DvHeatmapVisualization from './dataviz/level-2/topic-4/visual-1/visual';
import DvPairplotVisualization from './dataviz/level-2/topic-5/visual-1/visual';
import DvSubplotsVisualization from './dataviz/level-3/topic-1/visual-1/visual';
import DvChartDecisionVisualization from './dataviz/level-3/topic-2/visual-1/visual';
import DvPowerBiVisualization from './dataviz/level-3/topic-3/visual-1/visual';
import DvPlotlyVisualization from './dataviz/level-3/topic-4/visual-1/visual';

// Spreadsheets — Excel & Google Sheets for Analysts course visualizations
import XlWhyVisualization from './sheets/level-1/topic-1/visual-1/visual';
import XlGridVisualization from './sheets/level-1/topic-2/visual-1/visual';
import XlFormulasVisualization from './sheets/level-1/topic-3/visual-1/visual';
import XlReferencesVisualization from './sheets/level-1/topic-4/visual-1/visual';
import XlTextFnVisualization from './sheets/level-1/topic-5/visual-1/visual';
import XlIfVisualization from './sheets/level-2/topic-1/visual-1/visual';
import XlVlookupVisualization from './sheets/level-2/topic-2/visual-1/visual';
import XlIndexMatchVisualization from './sheets/level-2/topic-3/visual-1/visual';
import XlCleanVisualization from './sheets/level-2/topic-4/visual-1/visual';
import XlCfVisualization from './sheets/level-2/topic-5/visual-1/visual';
import XlPivotVisualization from './sheets/level-3/topic-1/visual-1/visual';
import XlPivotChartVisualization from './sheets/level-3/topic-2/visual-1/visual';
import XlChartTypeVisualization from './sheets/level-3/topic-3/visual-1/visual';
import XlValidateVisualization from './sheets/level-3/topic-4/visual-1/visual';

// SQL — From Zero to Data Queries course visualizations
import SqlFzWhyVisualization from './sqlfz/level-1/topic-1/visual-1/visual';
import SqlFzSetupVisualization from './sqlfz/level-1/topic-2/visual-1/visual';
import SqlFzSelectVisualization from './sqlfz/level-1/topic-3/visual-1/visual';
import SqlFzWhereVisualization from './sqlfz/level-1/topic-4/visual-1/visual';
import SqlFzOrderByVisualization from './sqlfz/level-1/topic-5/visual-1/visual';
import SqlFzNullVisualization from './sqlfz/level-1/topic-6/visual-1/visual';
import SqlFzAggVisualization from './sqlfz/level-2/topic-1/visual-1/visual';
import SqlFzGroupByVisualization from './sqlfz/level-2/topic-2/visual-1/visual';
import SqlFzHavingVisualization from './sqlfz/level-2/topic-3/visual-1/visual';
import SqlFzAliasVisualization from './sqlfz/level-2/topic-4/visual-1/visual';
import SqlFzRelationsVisualization from './sqlfz/level-3/topic-1/visual-1/visual';
import SqlFzJoinsVisualization from './sqlfz/level-3/topic-2/visual-1/visual';
import SqlFzSubqueriesVisualization from './sqlfz/level-3/topic-3/visual-1/visual';
import SqlFzWindowVisualization from './sqlfz/level-3/topic-4/visual-1/visual';
import SqlFzCteVisualization from './sqlfz/level-3/topic-5/visual-1/visual';

// Python (Programming & Math) course visualizations
import PyMathWhatIsVisualization from './pythonmath/level-1/topic-1/visual-1/visual';
import PyMathSetupVisualization from './pythonmath/level-1/topic-2/visual-1/visual';
import PyMathVarsVisualization from './pythonmath/level-1/topic-3/visual-1/visual';
import PyMathStringsVisualization from './pythonmath/level-1/topic-4/visual-1/visual';
import PyMathConditionalsVisualization from './pythonmath/level-1/topic-5/visual-1/visual';
import PyMathListsVisualization from './pythonmath/level-2/topic-1/visual-1/visual';
import PyMathDictsVisualization from './pythonmath/level-2/topic-2/visual-1/visual';
import PyMathLoopsVisualization from './pythonmath/level-2/topic-3/visual-1/visual';
import PyMathFunctionsVisualization from './pythonmath/level-2/topic-4/visual-1/visual';
import PyMathComprehensionVisualization from './pythonmath/level-2/topic-5/visual-1/visual';
import PyMathFileVisualization from './pythonmath/level-3/topic-1/visual-1/visual';
import PyMathErrorVisualization from './pythonmath/level-3/topic-2/visual-1/visual';
import PyMathOopVisualization from './pythonmath/level-3/topic-3/visual-1/visual';
import PyMathLibsVisualization from './pythonmath/level-3/topic-4/visual-1/visual';
import PyMathJupyterVisualization from './pythonmath/level-3/topic-5/visual-1/visual';

// Transformers & LLMs course visualizations
import TrSeqVisualization from './transformers/level-1/topic-1/visual-1/visual';
import TrRnnVisualization from './transformers/level-1/topic-2/visual-1/visual';
import TrAttentionVisualization from './transformers/level-1/topic-3/visual-1/visual';
import TrMultiHeadVisualization from './transformers/level-1/topic-4/visual-1/visual';
import TrArchVisualization from './transformers/level-1/topic-5/visual-1/visual';
import TrPosEncodingVisualization from './transformers/level-2/topic-1/visual-1/visual';
import TrScratchVisualization from './transformers/level-2/topic-2/visual-1/visual';
import TrPretrainingVisualization from './transformers/level-2/topic-3/visual-1/visual';
import TrFinetuneVisualization from './transformers/level-2/topic-4/visual-1/visual';
import TrTokenizationVisualization from './transformers/level-2/topic-5/visual-1/visual';
import TrPromptingVisualization from './transformers/level-3/topic-1/visual-1/visual';
import TrLoraVisualization from './transformers/level-3/topic-2/visual-1/visual';
import TrRagVisualization from './transformers/level-3/topic-3/visual-1/visual';
import TrEvalVisualization from './transformers/level-3/topic-4/visual-1/visual';
import TrEndToEndVisualization from './transformers/level-3/topic-5/visual-1/visual';

// Deployment & MLOps course visualizations
import MlopsApiVisualization from './mlops/level-1/topic-1/visual-1/visual';
import MlopsLatencyVisualization from './mlops/level-1/topic-2/visual-1/visual';
import MlopsDockerVisualization from './mlops/level-1/topic-3/visual-1/visual';
import MlopsServeLlmVisualization from './mlops/level-1/topic-4/visual-1/visual';
import MlopsVersioningVisualization from './mlops/level-1/topic-5/visual-1/visual';
import MlopsExperimentVisualization from './mlops/level-2/topic-1/visual-1/visual';
import MlopsDvcVisualization from './mlops/level-2/topic-2/visual-1/visual';
import MlopsCicdVisualization from './mlops/level-2/topic-3/visual-1/visual';
import MlopsMonitorVisualization from './mlops/level-2/topic-4/visual-1/visual';
import MlopsRetrainVisualization from './mlops/level-2/topic-5/visual-1/visual';
import MlopsCloudVisualization from './mlops/level-3/topic-1/visual-1/visual';
import MlopsManagedApisVisualization from './mlops/level-3/topic-2/visual-1/visual';
import MlopsServerlessVisualization from './mlops/level-3/topic-3/visual-1/visual';
import MlopsVectorDbVisualization from './mlops/level-3/topic-4/visual-1/visual';
import MlopsEndToEndVisualization from './mlops/level-3/topic-5/visual-1/visual';

// Jupyter Notebooks course visualizations
import JnbSetupVisualization from './jupyter/level-1/topic-1/visual-1/visual';
import JnbCellsVisualization from './jupyter/level-1/topic-2/visual-1/visual';
import JnbWidgetsVisualization from './jupyter/level-1/topic-3/visual-1/visual';
import JnbOrganiseVisualization from './jupyter/level-2/topic-1/visual-1/visual';
import JnbDebuggingVisualization from './jupyter/level-2/topic-2/visual-1/visual';
import JnbProductionVisualization from './jupyter/level-2/topic-3/visual-1/visual';
import JnbExportVisualization from './jupyter/level-3/topic-1/visual-1/visual';
import JnbGithubVisualization from './jupyter/level-3/topic-2/visual-1/visual';
import JnbCollabVisualization from './jupyter/level-3/topic-3/visual-1/visual';

// Data Analytics Intro course visualizations
import DaiWhatIsVisualization from './daintro/level-1/topic-1/visual-1/visual';

// Supervised Learning course visualizations
import SvWhatIsVisualization from './supervised/level-1/topic-1/visual-1/visual';
import SvRvsCVisualization from './supervised/level-1/topic-2/visual-1/visual';
import SvSplitsVisualization from './supervised/level-1/topic-3/visual-1/visual';
import SvLinearRegrVisualization from './supervised/level-1/topic-4/visual-1/visual';
import SvRegrEvalVisualization from './supervised/level-1/topic-5/visual-1/visual';
import SvLogisticVisualization from './supervised/level-2/topic-1/visual-1/visual';
import SvDecisionTreeVisualization from './supervised/level-2/topic-2/visual-1/visual';
import SvKnnVisualization from './supervised/level-2/topic-3/visual-1/visual';
import SvClassEvalVisualization from './supervised/level-2/topic-4/visual-1/visual';
import SvConfMatrixVisualization from './supervised/level-2/topic-5/visual-1/visual';
import SvOverfitVisualization from './supervised/level-3/topic-1/visual-1/visual';
import SvCrossValVisualization from './supervised/level-3/topic-2/visual-1/visual';
import SvScalingVisualization from './supervised/level-3/topic-3/visual-1/visual';
import SvRandomForestVisualization from './supervised/level-3/topic-4/visual-1/visual';
import SvEndToEndVisualization from './supervised/level-3/topic-5/visual-1/visual';

// Unsupervised Learning course visualizations
import UnsupWhatIsVisualization from './unsupervised/level-1/topic-1/visual-1/visual';
import UnsupKMeansVisualization from './unsupervised/level-1/topic-2/visual-1/visual';
import UnsupClustersNumVisualization from './unsupervised/level-1/topic-3/visual-1/visual';
import UnsupEvalVisualization from './unsupervised/level-1/topic-4/visual-1/visual';
import UnsupHierarchVisualization from './unsupervised/level-1/topic-5/visual-1/visual';
import UnsupCurseVisualization from './unsupervised/level-2/topic-1/visual-1/visual';
import UnsupPcaVisualization from './unsupervised/level-2/topic-2/visual-1/visual';
import UnsupPcaVizVisualization from './unsupervised/level-2/topic-3/visual-1/visual';
import UnsupTsneVisualization from './unsupervised/level-2/topic-4/visual-1/visual';
import UnsupDbscanVisualization from './unsupervised/level-2/topic-5/visual-1/visual';
import UnsupAnomalyVisualization from './unsupervised/level-3/topic-1/visual-1/visual';
import UnsupIsoForestVisualization from './unsupervised/level-3/topic-2/visual-1/visual';
import UnsupSegmentVisualization from './unsupervised/level-3/topic-3/visual-1/visual';
import UnsupClusFeatVisualization from './unsupervised/level-3/topic-4/visual-1/visual';
import UnsupEndToEndVisualization from './unsupervised/level-3/topic-5/visual-1/visual';

// Feature Engineering course visualizations
import FeWhatIsVisualization from './feateng/level-1/topic-1/visual-1/visual';
import FeMissingVisualization from './feateng/level-1/topic-2/visual-1/visual';
import FeEncodingVisualization from './feateng/level-1/topic-3/visual-1/visual';
import FeScalingVisualization from './feateng/level-1/topic-4/visual-1/visual';
import FeDatetimeVisualization from './feateng/level-1/topic-5/visual-1/visual';
import FeBinningVisualization from './feateng/level-2/topic-1/visual-1/visual';
import FeInteractionVisualization from './feateng/level-2/topic-2/visual-1/visual';
import FePolynomialVisualization from './feateng/level-2/topic-3/visual-1/visual';
import FeTextVisualization from './feateng/level-2/topic-4/visual-1/visual';
import FeAggregateVisualization from './feateng/level-2/topic-5/visual-1/visual';
import FeSelectionVisualization from './feateng/level-3/topic-1/visual-1/visual';
import FeCorrelationVisualization from './feateng/level-3/topic-2/visual-1/visual';
import FeLeakageVisualization from './feateng/level-3/topic-3/visual-1/visual';
import FePipelineVisualization from './feateng/level-3/topic-4/visual-1/visual';
import FeEndToEndVisualization from './feateng/level-3/topic-5/visual-1/visual';

// Neural Networks course visualizations
import NnWhatIsVisualization from './neuralnet/level-1/topic-1/visual-1/visual';
import NnActivationVisualization from './neuralnet/level-1/topic-2/visual-1/visual';
import NnForwardPropVisualization from './neuralnet/level-1/topic-3/visual-1/visual';
import NnLossVisualization from './neuralnet/level-1/topic-4/visual-1/visual';
import NnBackpropVisualization from './neuralnet/level-1/topic-5/visual-1/visual';
import NnScratchVisualization from './neuralnet/level-2/topic-1/visual-1/visual';
import NnGdVariantsVisualization from './neuralnet/level-2/topic-2/visual-1/visual';
import NnWeightInitVisualization from './neuralnet/level-2/topic-3/visual-1/visual';
import NnOverfitVisualization from './neuralnet/level-2/topic-4/visual-1/visual';
import NnBatchNormVisualization from './neuralnet/level-2/topic-5/visual-1/visual';
import NnPytorchIntroVisualization from './neuralnet/level-3/topic-1/visual-1/visual';
import NnNnModuleVisualization from './neuralnet/level-3/topic-2/visual-1/visual';
import NnTrainingLoopsVisualization from './neuralnet/level-3/topic-3/visual-1/visual';
import NnDebuggingVisualization from './neuralnet/level-3/topic-4/visual-1/visual';
import NnEndToEndVisualization from './neuralnet/level-3/topic-5/visual-1/visual';

// PyTorch course visualizations
import PtDataLoaderVisualization from './pytorch/level-1/topic-1/visual-1/visual';
import PtCustomDatasetVisualization from './pytorch/level-1/topic-2/visual-1/visual';
import PtTransformsVisualization from './pytorch/level-1/topic-3/visual-1/visual';
import PtImageTensorsVisualization from './pytorch/level-1/topic-4/visual-1/visual';
import PtEmbeddingsVisualization from './pytorch/level-1/topic-5/visual-1/visual';
import PtTensorOpsVisualization from './pytorch/level-2/topic-1/visual-1/visual';
import PtGpuVisualization from './pytorch/level-2/topic-2/visual-1/visual';
import PtCustomLayersVisualization from './pytorch/level-2/topic-3/visual-1/visual';
import PtCheckpointVisualization from './pytorch/level-2/topic-4/visual-1/visual';
import PtMixedPrecisionVisualization from './pytorch/level-2/topic-5/visual-1/visual';
import PtTransferVisualization from './pytorch/level-3/topic-1/visual-1/visual';
import PtFinetuneVisualization from './pytorch/level-3/topic-2/visual-1/visual';
import PtExperimentVisualization from './pytorch/level-3/topic-3/visual-1/visual';
import PtPitfallsVisualization from './pytorch/level-3/topic-4/visual-1/visual';
import PtEndToEndVisualization from './pytorch/level-3/topic-5/visual-1/visual';

// CNNs & Vision course visualizations
import CnnWhyConvVisualization from './cnnvision/level-1/topic-1/visual-1/visual';
import CnnConvLayersVisualization from './cnnvision/level-1/topic-2/visual-1/visual';
import CnnPoolingVisualization from './cnnvision/level-1/topic-3/visual-1/visual';
import CnnScratchVisualization from './cnnvision/level-1/topic-4/visual-1/visual';
import CnnVisualizingVisualization from './cnnvision/level-1/topic-5/visual-1/visual';
import CnnArchitecturesVisualization from './cnnvision/level-2/topic-1/visual-1/visual';
import CnnAugmentVisualization from './cnnvision/level-2/topic-2/visual-1/visual';
import CnnImbalancedVisualization from './cnnvision/level-2/topic-3/visual-1/visual';
import CnnDetectionVisualization from './cnnvision/level-2/topic-4/visual-1/visual';
import CnnVitVisualization from './cnnvision/level-2/topic-5/visual-1/visual';
import CnnInterpretVisualization from './cnnvision/level-3/topic-1/visual-1/visual';
import CnnDebuggingVisualization from './cnnvision/level-3/topic-2/visual-1/visual';
import CnnExportVisualization from './cnnvision/level-3/topic-3/visual-1/visual';
import CnnChooseArchVisualization from './cnnvision/level-3/topic-4/visual-1/visual';
import CnnEndToEndVisualization from './cnnvision/level-3/topic-5/visual-1/visual';

// Math Foundations course visualizations
import MfWhyVisualization from './mathfoundations/level-1/topic-1/visual-1/visual';
import MfVectorsVisualization from './mathfoundations/level-1/topic-2/visual-1/visual';
import MfMatricesVisualization from './mathfoundations/level-1/topic-3/visual-1/visual';
import MfMatrixOpsVisualization from './mathfoundations/level-1/topic-4/visual-1/visual';
import MfDotProductVisualization from './mathfoundations/level-1/topic-5/visual-1/visual';
import MfDerivativeVisualization from './mathfoundations/level-2/topic-1/visual-1/visual';
import MfGradientsVisualization from './mathfoundations/level-2/topic-2/visual-1/visual';
import MfChainRuleVisualization from './mathfoundations/level-2/topic-3/visual-1/visual';
import MfGradientDescentVisualization from './mathfoundations/level-2/topic-4/visual-1/visual';
import MfVizFunctionsVisualization from './mathfoundations/level-2/topic-5/visual-1/visual';
import MfProbabilityVisualization from './mathfoundations/level-3/topic-1/visual-1/visual';
import MfDescStatsVisualization from './mathfoundations/level-3/topic-2/visual-1/visual';
import MfDistributionsVisualization from './mathfoundations/level-3/topic-3/visual-1/visual';
import MfBayesVisualization from './mathfoundations/level-3/topic-4/visual-1/visual';
import MfSynthesisVisualization from './mathfoundations/level-3/topic-5/visual-1/visual';

// Capstone Project course visualizations
import CapBriefVisualization from './capstone/level-1/topic-1/visual-1/visual';
import CapQuestionVisualization from './capstone/level-1/topic-2/visual-1/visual';
import CapEdaVisualization from './capstone/level-1/topic-3/visual-1/visual';
import CapCleanVisualization from './capstone/level-1/topic-4/visual-1/visual';
import CapSqlAnalysisVisualization from './capstone/level-2/topic-1/visual-1/visual';
import CapPandasVisualization from './capstone/level-2/topic-2/visual-1/visual';
import CapStatsVisualization from './capstone/level-2/topic-3/visual-1/visual';
import CapResultsVisualization from './capstone/level-2/topic-4/visual-1/visual';
import CapDashboardVisualization from './capstone/level-3/topic-1/visual-1/visual';
import CapReportVisualization from './capstone/level-3/topic-2/visual-1/visual';
import CapStoryVisualization from './capstone/level-3/topic-3/visual-1/visual';
import CapGithubVisualization from './capstone/level-3/topic-4/visual-1/visual';

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
  'descstats-what-is-visualization'              : DescStatsWhatIsVisualization,
  'descstats-central-tendency-visualization'     : DescStatsCentralTendencyVisualization,
  'descstats-spread-variance-visualization'      : DescStatsSpreadVisualization,
  'descstats-percentiles-quartiles-visualization': DescStatsPercentilesVisualization,
  'descstats-skewness-kurtosis-visualization'    : DescStatsSkewKurtosisVisualization,
  'descstats-correlation-visualization'          : DescStatsCorrelationVisualization,
  'descstats-contingency-tables-visualization'   : DescStatsContingencyVisualization,
  'descstats-outliers-visualization'             : DescStatsOutliersVisualization,
  'descstats-python-describe-visualization'      : DescStatsPythonVisualization,
  'descstats-choosing-statistic-visualization'   : DescStatsChoosingVisualization,
  'descstats-simpsons-paradox-visualization'     : DescStatsSimpsonsVisualization,
  'descstats-weighted-averages-visualization'    : DescStatsWeightedVisualization,
  'descstats-report-visualization'               : DescStatsReportVisualization,

  // Inferential Statistics course
  'infstats-probability-intro-visualization'     : InfStatsProbIntroVisualization,
  'infstats-distributions-visualization'         : InfStatsDistributionsVisualization,
  'infstats-clt-visualization'                   : InfStatsCltVisualization,
  'infstats-sampling-visualization'              : InfStatsSamplingVisualization,
  'infstats-hypothesis-visualization'            : InfStatsHypothesisVisualization,
  'infstats-t-tests-visualization'               : InfStatsTTestsVisualization,
  'infstats-chi-square-visualization'            : InfStatsChiSquareVisualization,
  'infstats-anova-visualization'                 : InfStatsAnovaVisualization,
  'infstats-confidence-intervals-visualization'  : InfStatsCIVisualization,
  'infstats-error-types-visualization'           : InfStatsErrorTypesVisualization,
  'infstats-power-visualization'                 : InfStatsPowerVisualization,
  'infstats-ab-test-visualization'               : InfStatsABTestVisualization,

  // Machine Learning Intro course
  'ml-what-is-visualization'                  : MlWhatIsVisualization,
  'ml-supervised-unsupervised-visualization'  : MlSupervisedUnsupervisedVisualization,
  'ml-first-pipeline-visualization'           : MlFirstPipelineVisualization,
  'ml-feature-engineering-visualization'      : MlFeatureEngVisualization,
  'ml-bias-variance-visualization'            : MlBiasVarianceVisualization,
  'ml-linear-regression-visualization'        : MlLinearRegressionVisualization,
  'ml-logistic-regression-visualization'      : MlLogisticRegressionVisualization,
  'ml-decision-trees-visualization'           : MlDecisionTreeVisualization,
  'ml-random-forest-visualization'            : MlRandomForestVisualization,
  'ml-k-means-visualization'                  : MlKMeansVisualization,
  'ml-model-evaluation-visualization'         : MlModelEvalVisualization,
  'ml-cross-validation-visualization'         : MlCrossValidationVisualization,
  'ml-overfitting-visualization'              : MlOverfittingVisualization,
  'ml-save-load-visualization'                : MlSaveLoadVisualization,
  'ml-end-to-end-visualization'               : MlEndToEndVisualization,

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
  'pandas-what-is-visualization'              : PdWhatIsVisualization,
  'pandas-loading-visualization'              : PdLoadingVisualization,
  'pandas-explore-data-visualization'         : PdExploreDataVisualization,
  'pandas-select-loc-visualization'           : PdSelectLocVisualization,
  'pandas-numpy-arrays-visualization'         : PdNumpyArraysVisualization,
  'pandas-filter-sort-visualization'          : PdFilterSortVisualization,
  'pandas-missing-data-visualization'         : PdMissingDataVisualization,
  'pandas-apply-map-visualization'            : PdApplyMapVisualization,
  'pandas-str-accessor-visualization'         : PdStrAccessorVisualization,
  'pandas-col-manage-visualization'           : PdColManageVisualization,
  'pandas-groupby-visualization'              : PdGroupByVisualization,
  'pandas-merge-join-visualization'           : PdMergeJoinVisualization,
  'pandas-pivot-table-visualization'          : PdPivotTableVisualization,
  'pandas-export-visualization'               : PdExportVisualization,
  'pandas-time-series-visualization'          : PdTimeSeriesVisualization,

  // Python Basics for Data Analysts course
  'python-setup-visualization'                : PySetupVisualization,
  'python-variables-visualization'            : PyVariablesVisualization,
  'python-collections-visualization'          : PyCollectionsVisualization,
  'python-loops-visualization'                : PyLoopsVisualization,
  'python-functions-visualization'            : PyFunctionsVisualization,
  'python-file-io-visualization'              : PyFileIOVisualization,
  'python-venv-visualization'                 : PyVenvVisualization,
  'python-jupyter-visualization'              : PyJupyterVisualization,
  'python-read-csv-json-visualization'        : PyReadCsvJsonVisualization,
  'python-str-manip-visualization'            : PyStrManipVisualization,
  'python-error-handling-visualization'       : PyErrorHandlingVisualization,
  'python-comprehensions-visualization'       : PyComprehensionVisualization,
  'python-dates-visualization'                : PyDatesVisualization,
  'python-pipeline-visualization'             : PyPipelineVisualization,

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

  // Data Visualisation — Matplotlib, Seaborn & Beyond course
  'dv-why-visualization'                        : DvWhyVisualization,
  'dv-linebar-visualization'                    : DvLineBarVisualization,
  'dv-scatter-visualization'                    : DvScatterVisualization,
  'dv-histogram-visualization'                  : DvHistogramVisualization,
  'dv-customize-visualization'                  : DvCustomizeVisualization,
  'dv-seaborn-intro-visualization'              : DvSeabornIntroVisualization,
  'dv-distplot-visualization'                   : DvDistplotVisualization,
  'dv-catplot-visualization'                    : DvCatplotVisualization,
  'dv-heatmap-visualization'                    : DvHeatmapVisualization,
  'dv-pairplot-visualization'                   : DvPairplotVisualization,
  'dv-subplots-visualization'                   : DvSubplotsVisualization,
  'dv-chartdecision-visualization'              : DvChartDecisionVisualization,
  'dv-powerbi-visualization'                    : DvPowerBiVisualization,
  'dv-plotly-visualization'                     : DvPlotlyVisualization,

  // Spreadsheets — Excel & Google Sheets for Analysts course
  'xl-why-visualization'                        : XlWhyVisualization,
  'xl-grid-visualization'                       : XlGridVisualization,
  'xl-formulas-visualization'                   : XlFormulasVisualization,
  'xl-references-visualization'                 : XlReferencesVisualization,
  'xl-textfn-visualization'                     : XlTextFnVisualization,
  'xl-if-visualization'                         : XlIfVisualization,
  'xl-vlookup-visualization'                    : XlVlookupVisualization,
  'xl-indexmatch-visualization'                 : XlIndexMatchVisualization,
  'xl-clean-visualization'                      : XlCleanVisualization,
  'xl-cf-visualization'                         : XlCfVisualization,
  'xl-pivot-visualization'                      : XlPivotVisualization,
  'xl-pivotchart-visualization'                 : XlPivotChartVisualization,
  'xl-charttype-visualization'                  : XlChartTypeVisualization,
  'xl-validate-visualization'                   : XlValidateVisualization,

  // SQL — From Zero to Data Queries course
  'sqlfz-why-visualization'                     : SqlFzWhyVisualization,
  'sqlfz-setup-visualization'                   : SqlFzSetupVisualization,
  'sqlfz-select-visualization'                  : SqlFzSelectVisualization,
  'sqlfz-where-visualization'                   : SqlFzWhereVisualization,
  'sqlfz-order-by-visualization'                : SqlFzOrderByVisualization,
  'sqlfz-null-visualization'                    : SqlFzNullVisualization,
  'sqlfz-agg-visualization'                     : SqlFzAggVisualization,
  'sqlfz-group-by-visualization'                : SqlFzGroupByVisualization,
  'sqlfz-having-visualization'                  : SqlFzHavingVisualization,
  'sqlfz-alias-visualization'                   : SqlFzAliasVisualization,
  'sqlfz-relations-visualization'               : SqlFzRelationsVisualization,
  'sqlfz-joins-visualization'                   : SqlFzJoinsVisualization,
  'sqlfz-subqueries-visualization'              : SqlFzSubqueriesVisualization,
  'sqlfz-window-visualization'                  : SqlFzWindowVisualization,
  'sqlfz-cte-visualization'                     : SqlFzCteVisualization,

  // Transformers & LLMs course
  'tr-seq-visualization'                         : TrSeqVisualization,
  'tr-rnn-visualization'                         : TrRnnVisualization,
  'tr-attention-visualization'                   : TrAttentionVisualization,
  'tr-multi-head-visualization'                  : TrMultiHeadVisualization,
  'tr-arch-visualization'                        : TrArchVisualization,
  'tr-pos-encoding-visualization'                : TrPosEncodingVisualization,
  'tr-scratch-visualization'                     : TrScratchVisualization,
  'tr-pretraining-visualization'                 : TrPretrainingVisualization,
  'tr-finetune-visualization'                    : TrFinetuneVisualization,
  'tr-tokenization-visualization'                : TrTokenizationVisualization,
  'tr-prompting-visualization'                   : TrPromptingVisualization,
  'tr-lora-visualization'                        : TrLoraVisualization,
  'tr-rag-visualization'                         : TrRagVisualization,
  'tr-eval-visualization'                        : TrEvalVisualization,
  'tr-end-to-end-visualization'                  : TrEndToEndVisualization,

  // Deployment & MLOps course
  'mlops-api-visualization'                      : MlopsApiVisualization,
  'mlops-latency-visualization'                  : MlopsLatencyVisualization,
  'mlops-docker-visualization'                   : MlopsDockerVisualization,
  'mlops-serve-llm-visualization'                : MlopsServeLlmVisualization,
  'mlops-versioning-visualization'               : MlopsVersioningVisualization,
  'mlops-experiment-visualization'               : MlopsExperimentVisualization,
  'mlops-dvc-visualization'                      : MlopsDvcVisualization,
  'mlops-cicd-visualization'                     : MlopsCicdVisualization,
  'mlops-monitor-visualization'                  : MlopsMonitorVisualization,
  'mlops-retrain-visualization'                  : MlopsRetrainVisualization,
  'mlops-cloud-visualization'                    : MlopsCloudVisualization,
  'mlops-managed-apis-visualization'             : MlopsManagedApisVisualization,
  'mlops-serverless-visualization'               : MlopsServerlessVisualization,
  'mlops-vector-db-visualization'                : MlopsVectorDbVisualization,
  'mlops-end-to-end-visualization'               : MlopsEndToEndVisualization,

  // Jupyter Notebooks course
  'jnb-setup-visualization'                      : JnbSetupVisualization,
  'jnb-cells-visualization'                      : JnbCellsVisualization,
  'jnb-widgets-visualization'                    : JnbWidgetsVisualization,
  'jnb-organise-visualization'                   : JnbOrganiseVisualization,
  'jnb-debugging-visualization'                  : JnbDebuggingVisualization,
  'jnb-production-visualization'                 : JnbProductionVisualization,
  'jnb-export-visualization'                     : JnbExportVisualization,
  'jnb-github-visualization'                     : JnbGithubVisualization,
  'jnb-collab-visualization'                     : JnbCollabVisualization,

  // Data Analytics Intro course
  'dai-what-is-visualization'                    : DaiWhatIsVisualization,

  // Supervised Learning course
  'sv-what-is-visualization'                     : SvWhatIsVisualization,
  'sv-rvc-visualization'                         : SvRvsCVisualization,
  'sv-splits-visualization'                      : SvSplitsVisualization,
  'sv-linear-regr-visualization'                 : SvLinearRegrVisualization,
  'sv-regr-eval-visualization'                   : SvRegrEvalVisualization,
  'sv-logistic-visualization'                    : SvLogisticVisualization,
  'sv-decision-tree-visualization'               : SvDecisionTreeVisualization,
  'sv-knn-visualization'                         : SvKnnVisualization,
  'sv-class-eval-visualization'                  : SvClassEvalVisualization,
  'sv-conf-matrix-visualization'                 : SvConfMatrixVisualization,
  'sv-overfit-visualization'                     : SvOverfitVisualization,
  'sv-cross-val-visualization'                   : SvCrossValVisualization,
  'sv-scaling-visualization'                     : SvScalingVisualization,
  'sv-random-forest-visualization'               : SvRandomForestVisualization,
  'sv-end-to-end-visualization'                  : SvEndToEndVisualization,

  // Unsupervised Learning course
  'unsup-what-is-visualization'                  : UnsupWhatIsVisualization,
  'unsup-kmeans-visualization'                   : UnsupKMeansVisualization,
  'unsup-clusters-num-visualization'             : UnsupClustersNumVisualization,
  'unsup-eval-visualization'                     : UnsupEvalVisualization,
  'unsup-hierarch-visualization'                 : UnsupHierarchVisualization,
  'unsup-curse-visualization'                    : UnsupCurseVisualization,
  'unsup-pca-visualization'                      : UnsupPcaVisualization,
  'unsup-pca-viz-visualization'                  : UnsupPcaVizVisualization,
  'unsup-tsne-visualization'                     : UnsupTsneVisualization,
  'unsup-dbscan-visualization'                   : UnsupDbscanVisualization,
  'unsup-anomaly-visualization'                  : UnsupAnomalyVisualization,
  'unsup-iso-forest-visualization'               : UnsupIsoForestVisualization,
  'unsup-segment-visualization'                  : UnsupSegmentVisualization,
  'unsup-clus-feat-visualization'                : UnsupClusFeatVisualization,
  'unsup-end-to-end-visualization'               : UnsupEndToEndVisualization,

  // Feature Engineering course
  'fe-what-is-visualization'                     : FeWhatIsVisualization,
  'fe-missing-visualization'                     : FeMissingVisualization,
  'fe-encoding-visualization'                    : FeEncodingVisualization,
  'fe-scaling-visualization'                     : FeScalingVisualization,
  'fe-datetime-visualization'                    : FeDatetimeVisualization,
  'fe-binning-visualization'                     : FeBinningVisualization,
  'fe-interaction-visualization'                 : FeInteractionVisualization,
  'fe-polynomial-visualization'                  : FePolynomialVisualization,
  'fe-text-visualization'                        : FeTextVisualization,
  'fe-aggregate-visualization'                   : FeAggregateVisualization,
  'fe-selection-visualization'                   : FeSelectionVisualization,
  'fe-correlation-visualization'                 : FeCorrelationVisualization,
  'fe-leakage-visualization'                     : FeLeakageVisualization,
  'fe-pipeline-visualization'                    : FePipelineVisualization,
  'fe-end-to-end-visualization'                  : FeEndToEndVisualization,

  // Neural Networks course
  'nn-what-is-visualization'                     : NnWhatIsVisualization,
  'nn-activation-visualization'                  : NnActivationVisualization,
  'nn-forward-prop-visualization'                : NnForwardPropVisualization,
  'nn-loss-visualization'                        : NnLossVisualization,
  'nn-backprop-visualization'                    : NnBackpropVisualization,
  'nn-scratch-visualization'                     : NnScratchVisualization,
  'nn-gd-variants-visualization'                 : NnGdVariantsVisualization,
  'nn-weight-init-visualization'                 : NnWeightInitVisualization,
  'nn-overfit-visualization'                     : NnOverfitVisualization,
  'nn-batch-norm-visualization'                  : NnBatchNormVisualization,
  'nn-pytorch-intro-visualization'               : NnPytorchIntroVisualization,
  'nn-nn-module-visualization'                   : NnNnModuleVisualization,
  'nn-training-loops-visualization'              : NnTrainingLoopsVisualization,
  'nn-debugging-visualization'                   : NnDebuggingVisualization,
  'nn-end-to-end-visualization'                  : NnEndToEndVisualization,

  // PyTorch course
  'pt-dataloader-visualization'                  : PtDataLoaderVisualization,
  'pt-custom-dataset-visualization'              : PtCustomDatasetVisualization,
  'pt-transforms-visualization'                  : PtTransformsVisualization,
  'pt-image-tensors-visualization'               : PtImageTensorsVisualization,
  'pt-embeddings-visualization'                  : PtEmbeddingsVisualization,
  'pt-tensor-ops-visualization'                  : PtTensorOpsVisualization,
  'pt-gpu-visualization'                         : PtGpuVisualization,
  'pt-custom-layers-visualization'               : PtCustomLayersVisualization,
  'pt-checkpoint-visualization'                  : PtCheckpointVisualization,
  'pt-mixed-precision-visualization'             : PtMixedPrecisionVisualization,
  'pt-transfer-visualization'                    : PtTransferVisualization,
  'pt-finetune-visualization'                    : PtFinetuneVisualization,
  'pt-experiment-visualization'                  : PtExperimentVisualization,
  'pt-pitfalls-visualization'                    : PtPitfallsVisualization,
  'pt-end-to-end-visualization'                  : PtEndToEndVisualization,

  // CNNs & Vision course
  'cnn-why-conv-visualization'                   : CnnWhyConvVisualization,
  'cnn-conv-layers-visualization'                : CnnConvLayersVisualization,
  'cnn-pooling-visualization'                    : CnnPoolingVisualization,
  'cnn-scratch-visualization'                    : CnnScratchVisualization,
  'cnn-visualizing-visualization'                : CnnVisualizingVisualization,
  'cnn-architectures-visualization'              : CnnArchitecturesVisualization,
  'cnn-augment-visualization'                    : CnnAugmentVisualization,
  'cnn-imbalanced-visualization'                 : CnnImbalancedVisualization,
  'cnn-detection-visualization'                  : CnnDetectionVisualization,
  'cnn-vit-visualization'                        : CnnVitVisualization,
  'cnn-interpret-visualization'                  : CnnInterpretVisualization,
  'cnn-debugging-visualization'                  : CnnDebuggingVisualization,
  'cnn-export-visualization'                     : CnnExportVisualization,
  'cnn-choose-arch-visualization'                : CnnChooseArchVisualization,
  'cnn-end-to-end-visualization'                 : CnnEndToEndVisualization,

  // Python (Programming & Math) course
  'pymath-what-is-visualization'                 : PyMathWhatIsVisualization,
  'pymath-setup-visualization'                   : PyMathSetupVisualization,
  'pymath-vars-visualization'                    : PyMathVarsVisualization,
  'pymath-strings-visualization'                 : PyMathStringsVisualization,
  'pymath-conditionals-visualization'            : PyMathConditionalsVisualization,
  'pymath-lists-visualization'                   : PyMathListsVisualization,
  'pymath-dicts-visualization'                   : PyMathDictsVisualization,
  'pymath-loops-visualization'                   : PyMathLoopsVisualization,
  'pymath-functions-visualization'               : PyMathFunctionsVisualization,
  'pymath-comprehension-visualization'           : PyMathComprehensionVisualization,
  'pymath-file-visualization'                    : PyMathFileVisualization,
  'pymath-error-visualization'                   : PyMathErrorVisualization,
  'pymath-oop-visualization'                     : PyMathOopVisualization,
  'pymath-libs-visualization'                    : PyMathLibsVisualization,
  'pymath-jupyter-visualization'                 : PyMathJupyterVisualization,

  // Math Foundations course
  'mf-why-visualization'                         : MfWhyVisualization,
  'mf-vectors-visualization'                     : MfVectorsVisualization,
  'mf-matrices-visualization'                    : MfMatricesVisualization,
  'mf-matrix-ops-visualization'                  : MfMatrixOpsVisualization,
  'mf-dot-product-visualization'                 : MfDotProductVisualization,
  'mf-derivative-visualization'                  : MfDerivativeVisualization,
  'mf-gradients-visualization'                   : MfGradientsVisualization,
  'mf-chain-rule-visualization'                  : MfChainRuleVisualization,
  'mf-gradient-descent-visualization'            : MfGradientDescentVisualization,
  'mf-viz-functions-visualization'               : MfVizFunctionsVisualization,
  'mf-probability-visualization'                 : MfProbabilityVisualization,
  'mf-descstats-visualization'                   : MfDescStatsVisualization,
  'mf-distributions-visualization'               : MfDistributionsVisualization,
  'mf-bayes-visualization'                       : MfBayesVisualization,
  'mf-synthesis-visualization'                   : MfSynthesisVisualization,

  // Capstone Project course
  'cap-brief-visualization'                      : CapBriefVisualization,
  'cap-question-visualization'                   : CapQuestionVisualization,
  'cap-eda-visualization'                        : CapEdaVisualization,
  'cap-clean-visualization'                      : CapCleanVisualization,
  'cap-sql-analysis-visualization'               : CapSqlAnalysisVisualization,
  'cap-pandas-visualization'                     : CapPandasVisualization,
  'cap-stats-visualization'                      : CapStatsVisualization,
  'cap-results-visualization'                    : CapResultsVisualization,
  'cap-dashboard-visualization'                  : CapDashboardVisualization,
  'cap-report-visualization'                     : CapReportVisualization,
  'cap-story-visualization'                      : CapStoryVisualization,
  'cap-github-visualization'                     : CapGithubVisualization,

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