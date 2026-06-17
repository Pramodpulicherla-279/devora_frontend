/**
 * roadmapData.js — All learning-path roadmaps for Dev.EL
 *
 * Each roadmap has phases; each phase has steps.
 * Steps can link to a Dev.EL course via courseSlug.
 * type: 'required' | 'optional' | 'advanced'
 */

export const ROADMAPS = [
  /* ═══════════════════════════════════════════════════════════════
     1. MERN STACK
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'mern-stack',
    name: 'MERN Stack',
    icon: '🧩',
    color: '#7c3aed',
    description: 'Build full-stack JavaScript applications with MongoDB, Express, React and Node.js.',
    phases: [
      {
        id: 'mern-p1',
        title: 'Web Foundations',
        steps: [
          { id: 'mern-html', title: 'HTML', icon: '🌐', type: 'required', courseSlug: 'html/introduction-to-html', description: 'Learn semantic HTML structure, forms, tables, multimedia and accessibility best practices.', topics: ['Document structure', 'Semantic tags', 'Forms & inputs', 'Accessibility', 'SEO basics'] },
          { id: 'mern-css', title: 'CSS', icon: '🎨', type: 'required', courseSlug: 'css/css-get-started', description: 'Style and layout web pages using Flexbox, Grid, animations, and responsive design.', topics: ['Box model', 'Flexbox', 'CSS Grid', 'Media queries', 'Animations'] },
          { id: 'mern-js', title: 'JavaScript', icon: '⚡', type: 'required', courseSlug: 'javascript/variables-data-types', description: 'Master modern JavaScript including ES6+, async/await, closures, DOM manipulation and more.', topics: ['Variables & data types', 'Functions & scope', 'DOM manipulation', 'Promises & async/await', 'ES6+ features'] },
        ],
      },
      {
        id: 'mern-p2',
        title: 'Developer Tools',
        steps: [
          { id: 'mern-terminal', title: 'Terminal / CLI', icon: '💻', type: 'required', courseSlug: 'terminal-command-line/terminal-basics-for-developers', description: 'Work efficiently with the command line to navigate, automate tasks and run scripts.', topics: ['Navigation commands', 'File operations', 'Environment variables', 'Shell scripting basics'] },
          { id: 'mern-git', title: 'Git & GitHub', icon: '🐙', type: 'required', courseSlug: 'git-and-github/introduction-to-git-and-github-version-control-essentials', description: 'Version control with Git, collaboration with GitHub, branching strategies and pull requests.', topics: ['Init & commits', 'Branching & merging', 'Remote repos', 'Pull requests', 'Conflict resolution'] },
        ],
      },
      {
        id: 'mern-p3',
        title: 'React Frontend',
        steps: [
          { id: 'mern-react-basics', title: 'React Basics', icon: '⚛️', type: 'required', description: 'Components, JSX, props and the core mental model of React.', topics: ['JSX syntax', 'Functional components', 'Props & state', 'Events', 'Conditional rendering'] },
          { id: 'mern-react-hooks', title: 'React Hooks', icon: '🪝', type: 'required', description: 'useState, useEffect, useRef, useContext and custom hooks.', topics: ['useState', 'useEffect', 'useRef / useMemo', 'useContext', 'Custom hooks'] },
          { id: 'mern-react-router', title: 'React Router', icon: '🗺️', type: 'required', description: 'Client-side routing for single-page apps with React Router v6.', topics: ['Route setup', 'useNavigate / useParams', 'Nested routes', 'Protected routes', 'Lazy loading'] },
          { id: 'mern-state-mgmt', title: 'State Management', icon: '🗂️', type: 'optional', description: 'Manage global state with Context API, Redux Toolkit or Zustand.', topics: ['Context API', 'Redux Toolkit', 'Zustand', 'Async state (RTK Query)'] },
        ],
      },
      {
        id: 'mern-p4',
        title: 'Node.js & Express Backend',
        steps: [
          { id: 'mern-node', title: 'Node.js', icon: '🟢', type: 'required', courseSlug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl', description: 'Server-side JavaScript, modules, event loop, file system and streams.', topics: ['Modules (CJS/ESM)', 'Event loop', 'fs / path', 'npm & packages', 'Streams & buffers'] },
          { id: 'mern-express', title: 'Express.js', icon: '🚂', type: 'required', courseSlug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl', description: 'Build REST APIs with Express: routing, middleware, error handling, CORS.', topics: ['Routing', 'Middleware pipeline', 'Error handling', 'CORS', 'Body parsing'] },
          { id: 'mern-rest', title: 'REST API Design', icon: '🔗', type: 'required', courseSlug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl', description: 'Design clean, consistent REST APIs following best practices.', topics: ['HTTP methods & status codes', 'Resource naming', 'Request validation', 'Pagination', 'API versioning'] },
        ],
      },
      {
        id: 'mern-p5',
        title: 'MongoDB & Mongoose',
        steps: [
          { id: 'mern-mongo', title: 'MongoDB Basics', icon: '🍃', type: 'required', description: 'NoSQL concepts, CRUD operations, queries and indexing.', topics: ['Documents & collections', 'CRUD operations', 'Query operators', 'Indexes', 'Aggregation pipeline'] },
          { id: 'mern-mongoose', title: 'Mongoose ODM', icon: '🗃️', type: 'required', description: 'Schema design, models, virtuals, middleware and population in Mongoose.', topics: ['Schema & models', 'Validation', 'Middleware (hooks)', 'Population (refs)', 'Lean queries'] },
        ],
      },
      {
        id: 'mern-p6',
        title: 'Full-Stack Integration',
        steps: [
          { id: 'mern-auth', title: 'Authentication (JWT)', icon: '🔐', type: 'required', description: 'Implement secure login and registration with JWT, bcrypt and protected routes.', topics: ['Password hashing (bcrypt)', 'JWT signing & verification', 'Auth middleware', 'Refresh tokens', 'Role-based access'] },
          { id: 'mern-file-upload', title: 'File Uploads', icon: '📁', type: 'optional', description: 'Handle file uploads with Multer and store them in the cloud.', topics: ['Multer middleware', 'Cloudinary / S3', 'Image optimisation', 'File validation'] },
          { id: 'mern-env', title: 'Env & Config', icon: '⚙️', type: 'required', description: 'Manage secrets and environment-specific configuration securely.', topics: ['.env & dotenv', 'Config patterns', 'Secret management', 'CORS & proxies'] },
        ],
      },
      {
        id: 'mern-p7',
        title: 'Testing & Deployment',
        steps: [
          { id: 'mern-testing', title: 'Testing', icon: '🧪', type: 'optional', description: 'Unit, integration, and API testing with Jest and Supertest.', topics: ['Jest basics', 'Unit testing', 'API testing (Supertest)', 'Test coverage'] },
          { id: 'mern-deploy', title: 'Deployment', icon: '🚀', type: 'required', description: 'Deploy your MERN app to the cloud with Vercel, Render and MongoDB Atlas.', topics: ['MongoDB Atlas', 'Render (backend)', 'Vercel / Firebase (frontend)', 'Environment variables in prod', 'CI/CD basics'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     2. MEAN STACK
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'mean-stack',
    name: 'MEAN Stack',
    icon: '🔷',
    color: '#1565c0',
    description: 'Full-stack JavaScript with MongoDB, Express, Angular and Node.js.',
    phases: [
      {
        id: 'mean-p1', title: 'Foundations',
        steps: [
          { id: 'mean-html', title: 'HTML', icon: '🌐', type: 'required', courseSlug: 'html/introduction-to-html', description: 'Build structured, semantic web pages with HTML5.', topics: ['Document structure', 'Semantic tags', 'Forms', 'Accessibility'] },
          { id: 'mean-css', title: 'CSS', icon: '🎨', type: 'required', courseSlug: 'css/css-get-started', description: 'Style and layout web pages using modern CSS.', topics: ['Box model', 'Flexbox', 'CSS Grid', 'Media queries'] },
          { id: 'mean-js', title: 'JavaScript', icon: '⚡', type: 'required', courseSlug: 'javascript/variables-data-types', description: 'Master modern JavaScript and ES6+ syntax.', topics: ['ES6+ features', 'Async/await', 'Modules', 'DOM APIs'] },
          { id: 'mean-ts', title: 'TypeScript', icon: '🔷', type: 'required', description: 'Add static types to JavaScript for safer, more maintainable code.', topics: ['Types & interfaces', 'Classes & generics', 'Decorators', 'tsconfig'] },
        ],
      },
      {
        id: 'mean-p2', title: 'Developer Tools',
        steps: [
          { id: 'mean-terminal', title: 'Terminal / CLI', icon: '💻', type: 'required', courseSlug: 'terminal-command-line/terminal-basics-for-developers', description: 'Command-line skills for efficient development.', topics: ['Navigation', 'File ops', 'npm scripts', 'Environment'] },
          { id: 'mean-git', title: 'Git & GitHub', icon: '🐙', type: 'required', courseSlug: 'git-and-github/introduction-to-git-and-github-version-control-essentials', description: 'Version control and collaboration with Git.', topics: ['Commits', 'Branching', 'Merging', 'Pull requests'] },
        ],
      },
      {
        id: 'mean-p3', title: 'Angular Frontend',
        steps: [
          { id: 'mean-angular-basics', title: 'Angular Basics', icon: '🅰️', type: 'required', description: 'Components, templates, data binding and the Angular CLI.', topics: ['Angular CLI', 'Components', 'Data binding', 'Directives', 'Pipes'] },
          { id: 'mean-angular-services', title: 'Services & DI', icon: '🔧', type: 'required', description: 'Dependency injection and services for shared logic.', topics: ['Services', 'Dependency injection', 'HttpClient', 'Observables (RxJS)'] },
          { id: 'mean-angular-router', title: 'Angular Router', icon: '🗺️', type: 'required', description: 'Multi-page navigation and guards in Angular.', topics: ['RouterModule', 'Route guards', 'Lazy loading', 'Resolvers'] },
          { id: 'mean-angular-forms', title: 'Forms (Reactive)', icon: '📝', type: 'required', description: 'Build robust forms with validation using Reactive Forms.', topics: ['FormControl', 'FormGroup', 'Validators', 'Async validators'] },
        ],
      },
      {
        id: 'mean-p4', title: 'Node.js & Express Backend',
        steps: [
          { id: 'mean-node', title: 'Node.js', icon: '🟢', type: 'required', courseSlug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl', description: 'Server-side JavaScript fundamentals.', topics: ['Modules', 'Event loop', 'npm', 'File system'] },
          { id: 'mean-express', title: 'Express.js', icon: '🚂', type: 'required', description: 'REST API development with Express.', topics: ['Routing', 'Middleware', 'Error handling', 'CORS'] },
        ],
      },
      {
        id: 'mean-p5', title: 'MongoDB & Mongoose',
        steps: [
          { id: 'mean-mongo', title: 'MongoDB', icon: '🍃', type: 'required', description: 'NoSQL data modelling and CRUD with MongoDB.', topics: ['Collections & documents', 'CRUD', 'Aggregation'] },
          { id: 'mean-mongoose', title: 'Mongoose', icon: '🗃️', type: 'required', description: 'Schema design and data access with Mongoose.', topics: ['Schemas', 'Models', 'Population', 'Middleware'] },
        ],
      },
      {
        id: 'mean-p6', title: 'Auth & Deployment',
        steps: [
          { id: 'mean-auth', title: 'Authentication', icon: '🔐', type: 'required', description: 'JWT auth and role-based access control.', topics: ['JWT', 'bcrypt', 'Guards', 'HTTP interceptors'] },
          { id: 'mean-deploy', title: 'Deployment', icon: '🚀', type: 'required', description: 'Deploy your MEAN app to production.', topics: ['MongoDB Atlas', 'Render', 'Vercel', 'CI/CD'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     3. FRONTEND DEVELOPMENT
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'frontend-development',
    name: 'Frontend Development',
    icon: '🎨',
    color: '#7b1fa2',
    description: 'Master HTML, CSS, JavaScript and React to build beautiful, responsive UIs.',
    phases: [
      {
        id: 'fe-p1', title: 'HTML Mastery',
        steps: [
          { id: 'fe-html-basics', title: 'HTML Basics', icon: '🌐', type: 'required', courseSlug: 'html/introduction-to-html', description: 'Structure web content with clean, semantic HTML5.', topics: ['Document structure', 'Semantic elements', 'Headings, lists, links'] },
          { id: 'fe-html-forms', title: 'Forms & Tables', icon: '📋', type: 'required', description: 'Build interactive forms and structured data tables.', topics: ['Input types', 'Form validation', 'Tables', 'Fieldsets & labels'] },
          { id: 'fe-html-a11y', title: 'Accessibility', icon: '♿', type: 'optional', description: 'Make websites usable by everyone with ARIA and WCAG.', topics: ['ARIA roles', 'Alt text', 'Keyboard navigation', 'Colour contrast'] },
        ],
      },
      {
        id: 'fe-p2', title: 'CSS Mastery',
        steps: [
          { id: 'fe-css-core', title: 'CSS Fundamentals', icon: '🎨', type: 'required', courseSlug: 'css/css-get-started', description: 'Selectors, box model, colours, typography and cascade.', topics: ['Selectors & specificity', 'Box model', 'Typography', 'Colours & backgrounds'] },
          { id: 'fe-css-layout', title: 'Flexbox & Grid', icon: '🟦', type: 'required', description: 'Modern layout with CSS Flexbox and Grid.', topics: ['Flexbox', 'CSS Grid', 'Alignment', 'Responsive grid'] },
          { id: 'fe-css-responsive', title: 'Responsive Design', icon: '📱', type: 'required', description: 'Mobile-first design with media queries and fluid layouts.', topics: ['Mobile-first', 'Media queries', 'Fluid typography', 'Viewport units'] },
          { id: 'fe-css-animations', title: 'Animations & Effects', icon: '✨', type: 'optional', description: 'CSS transitions, keyframe animations and transforms.', topics: ['Transitions', 'Keyframe animations', 'Transforms', 'will-change'] },
        ],
      },
      {
        id: 'fe-p3', title: 'JavaScript',
        steps: [
          { id: 'fe-js-core', title: 'JS Core', icon: '⚡', type: 'required', courseSlug: 'javascript/variables-data-types', description: 'Variables, data types, functions, objects and arrays.', topics: ['Variables', 'Functions', 'Objects & arrays', 'Scope & closures'] },
          { id: 'fe-js-dom', title: 'DOM Manipulation', icon: '🌳', type: 'required', description: 'Interact with HTML elements dynamically using the DOM API.', topics: ['Query selectors', 'Event listeners', 'DOM CRUD', 'Event delegation'] },
          { id: 'fe-js-async', title: 'Async JavaScript', icon: '⏱️', type: 'required', description: 'Fetch data from APIs using Promises and async/await.', topics: ['Callbacks', 'Promises', 'async/await', 'Fetch API', 'Error handling'] },
          { id: 'fe-js-es6', title: 'ES6+ Features', icon: '🔮', type: 'required', description: 'Destructuring, spread, modules, template literals and more.', topics: ['Destructuring', 'Spread/rest', 'Modules', 'Optional chaining'] },
        ],
      },
      {
        id: 'fe-p4', title: 'Version Control',
        steps: [
          { id: 'fe-terminal', title: 'Terminal', icon: '💻', type: 'required', courseSlug: 'terminal-command-line/terminal-basics-for-developers', description: 'Basic command-line skills for developers.', topics: ['Navigation', 'File operations', 'npm scripts'] },
          { id: 'fe-git', title: 'Git & GitHub', icon: '🐙', type: 'required', courseSlug: 'git-and-github/introduction-to-git-and-github-version-control-essentials', description: 'Track, manage and share code with Git.', topics: ['Commits', 'Branches', 'Pull requests', 'GitHub Pages'] },
        ],
      },
      {
        id: 'fe-p5', title: 'React',
        steps: [
          { id: 'fe-react-basics', title: 'React Basics', icon: '⚛️', type: 'required', description: 'JSX, components, props and state fundamentals.', topics: ['JSX', 'Components', 'Props', 'State', 'Lists & keys'] },
          { id: 'fe-react-hooks', title: 'Hooks', icon: '🪝', type: 'required', description: 'useState, useEffect, useContext, useRef and custom hooks.', topics: ['useState', 'useEffect', 'useRef', 'useContext', 'Custom hooks'] },
          { id: 'fe-react-router', title: 'React Router', icon: '🗺️', type: 'required', description: 'Multi-page navigation in React SPAs.', topics: ['BrowserRouter', 'Route/Link', 'useNavigate', 'Protected routes'] },
        ],
      },
      {
        id: 'fe-p6', title: 'Build Tools & Deployment',
        steps: [
          { id: 'fe-vite', title: 'Vite / Webpack', icon: '⚡', type: 'required', description: 'Bundle and optimise your frontend code for production.', topics: ['Vite setup', 'Build & preview', 'Environment vars', 'Code splitting'] },
          { id: 'fe-testing', title: 'Testing', icon: '🧪', type: 'optional', description: 'Test your components with Vitest and React Testing Library.', topics: ['Vitest', 'React Testing Library', 'User event', 'Snapshots'] },
          { id: 'fe-deploy', title: 'Deployment', icon: '🚀', type: 'required', description: 'Ship your React app to the web with Vercel or Firebase.', topics: ['Vercel', 'Firebase Hosting', 'Domain setup', 'Performance optimisation'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     4. BACKEND DEVELOPMENT
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'backend-development',
    name: 'Backend Development',
    icon: '⚙️',
    color: '#2e7d32',
    description: 'Build powerful server-side applications with Node.js, Express, databases and APIs.',
    phases: [
      {
        id: 'be-p1', title: 'Foundations',
        steps: [
          { id: 'be-js', title: 'JavaScript', icon: '⚡', type: 'required', courseSlug: 'javascript/variables-data-types', description: 'JavaScript fundamentals and ES6+ needed for server-side development.', topics: ['Modules', 'Async/await', 'Error handling', 'Closures'] },
          { id: 'be-terminal', title: 'Terminal / CLI', icon: '💻', type: 'required', courseSlug: 'terminal-command-line/terminal-basics-for-developers', description: 'Efficient command-line usage for backend developers.', topics: ['Bash basics', 'Process management', 'SSH', 'Shell scripts'] },
          { id: 'be-git', title: 'Git & GitHub', icon: '🐙', type: 'required', courseSlug: 'git-and-github/introduction-to-git-and-github-version-control-essentials', description: 'Version control and collaboration workflows.', topics: ['Commits', 'Branching', 'Code review', 'Git hooks'] },
        ],
      },
      {
        id: 'be-p2', title: 'Node.js',
        steps: [
          { id: 'be-node', title: 'Node.js Core', icon: '🟢', type: 'required', courseSlug: 'backend-nodejs-express/introduction-to-nodejs-and-node-repl', description: 'Understand Node.js runtime, modules, event loop and async I/O.', topics: ['Event loop', 'Modules (CJS/ESM)', 'fs, path, os', 'Streams', 'npm'] },
          { id: 'be-express', title: 'Express.js', icon: '🚂', type: 'required', description: 'Build web servers and REST APIs with Express.', topics: ['Routing', 'Middleware', 'Error handling', 'Request/Response', 'CORS'] },
        ],
      },
      {
        id: 'be-p3', title: 'Databases',
        steps: [
          { id: 'be-sql', title: 'SQL', icon: '🗄️', type: 'required', courseSlug: 'sql/every-app-runs-on-a-database', description: 'Query and manage relational databases with SQL.', topics: ['SELECT, INSERT, UPDATE, DELETE', 'Joins', 'Indexes', 'Transactions', 'Stored procedures'] },
          { id: 'be-mongo', title: 'MongoDB', icon: '🍃', type: 'required', description: 'NoSQL data modelling and querying with MongoDB.', topics: ['CRUD', 'Aggregation', 'Indexes', 'Schema design'] },
          { id: 'be-orm', title: 'ORMs & ODMs', icon: '🗃️', type: 'optional', description: 'Mongoose for MongoDB and Prisma/Sequelize for SQL.', topics: ['Mongoose', 'Prisma', 'Migrations', 'Relations'] },
        ],
      },
      {
        id: 'be-p4', title: 'API Design',
        steps: [
          { id: 'be-rest', title: 'REST APIs', icon: '🔗', type: 'required', description: 'Design and build clean, scalable REST APIs.', topics: ['HTTP verbs', 'Status codes', 'Resource naming', 'Pagination', 'Versioning'] },
          { id: 'be-graphql', title: 'GraphQL', icon: '🔺', type: 'optional', description: 'Flexible data fetching with GraphQL schemas and resolvers.', topics: ['Schema definition', 'Queries & mutations', 'Resolvers', 'Apollo Server'] },
        ],
      },
      {
        id: 'be-p5', title: 'Security & Auth',
        steps: [
          { id: 'be-auth', title: 'Authentication', icon: '🔐', type: 'required', description: 'Implement JWT-based auth with secure password handling.', topics: ['JWT', 'bcrypt', 'Sessions vs tokens', 'OAuth / SSO'] },
          { id: 'be-security', title: 'API Security', icon: '🛡️', type: 'required', description: 'Protect APIs from common attacks and vulnerabilities.', topics: ['Input validation', 'Rate limiting', 'CORS', 'Helmet.js', 'SQL injection prevention'] },
        ],
      },
      {
        id: 'be-p6', title: 'Performance & Deployment',
        steps: [
          { id: 'be-caching', title: 'Caching', icon: '⚡', type: 'optional', description: 'Improve performance with Redis caching and CDN.', topics: ['Redis basics', 'Cache strategies', 'TTL', 'Invalidation'] },
          { id: 'be-testing', title: 'Testing', icon: '🧪', type: 'required', description: 'Test your backend with Jest and Supertest.', topics: ['Unit tests', 'Integration tests', 'API testing', 'Mocking'] },
          { id: 'be-deploy', title: 'Deployment', icon: '🚀', type: 'required', description: 'Deploy Node.js apps with Docker and cloud platforms.', topics: ['Docker', 'Render / Railway', 'PM2', 'Environment config', 'Monitoring'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     5. CI/CD
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'cicd',
    name: 'CI/CD',
    icon: '🚀',
    color: '#00695c',
    description: 'Automate building, testing and deploying software with modern CI/CD pipelines.',
    phases: [
      {
        id: 'cicd-p1', title: 'Foundations',
        steps: [
          { id: 'cicd-git', title: 'Git & GitHub', icon: '🐙', type: 'required', courseSlug: 'git-and-github/introduction-to-git-and-github-version-control-essentials', description: 'Version control is the foundation of every CI/CD pipeline.', topics: ['Branching strategies', 'Pull requests', 'Git hooks', 'Conventional commits'] },
          { id: 'cicd-terminal', title: 'Terminal & Bash', icon: '💻', type: 'required', courseSlug: 'terminal-command-line/terminal-basics-for-developers', description: 'Shell scripting skills essential for writing CI/CD pipelines.', topics: ['Bash scripting', 'Variables', 'Conditionals', 'Exit codes', 'Pipelines'] },
        ],
      },
      {
        id: 'cicd-p2', title: 'Containers',
        steps: [
          { id: 'cicd-docker', title: 'Docker', icon: '🐳', type: 'required', description: 'Package applications into portable containers.', topics: ['Dockerfile', 'docker build & run', 'Volumes & networking', 'Docker Compose', 'Registries (Docker Hub)'] },
          { id: 'cicd-k8s', title: 'Kubernetes Basics', icon: '☸️', type: 'optional', description: 'Orchestrate containers at scale with Kubernetes.', topics: ['Pods & services', 'Deployments', 'ConfigMaps', 'kubectl basics'] },
        ],
      },
      {
        id: 'cicd-p3', title: 'CI Pipelines',
        steps: [
          { id: 'cicd-gh-actions', title: 'GitHub Actions', icon: '⚡', type: 'required', description: 'Automate workflows with GitHub Actions — the most popular CI tool.', topics: ['Workflow YAML', 'Triggers (push, PR)', 'Jobs & steps', 'Actions marketplace', 'Secrets & env vars'] },
          { id: 'cicd-jenkins', title: 'Jenkins', icon: '🔧', type: 'optional', description: 'Industry-standard CI server with extensive plugin ecosystem.', topics: ['Pipelines (Jenkinsfile)', 'Stages', 'Agents', 'Plugins'] },
        ],
      },
      {
        id: 'cicd-p4', title: 'Testing in CI',
        steps: [
          { id: 'cicd-unit', title: 'Unit & Integration Tests', icon: '🧪', type: 'required', description: 'Automated testing as a gate in your pipeline.', topics: ['Jest / Vitest', 'Test coverage thresholds', 'Test reporters', 'Parallel testing'] },
          { id: 'cicd-e2e', title: 'E2E Tests in CI', icon: '🌐', type: 'optional', description: 'Run Playwright or Cypress tests automatically on every PR.', topics: ['Playwright in GitHub Actions', 'Headed vs headless', 'Artifacts upload', 'Test reporting'] },
        ],
      },
      {
        id: 'cicd-p5', title: 'CD & Deployment',
        steps: [
          { id: 'cicd-cd', title: 'Continuous Delivery', icon: '📦', type: 'required', description: 'Automatically deploy tested builds to staging and production.', topics: ['Deploy on merge', 'Environment promotions', 'Blue-green deployments', 'Rollback strategies'] },
          { id: 'cicd-monitoring', title: 'Monitoring & Alerts', icon: '📊', type: 'optional', description: 'Observe your deployed apps and get alerted on failures.', topics: ['Uptime monitoring', 'Error tracking (Sentry)', 'Log aggregation', 'Alerting channels'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     6. DEVOPS
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'devops',
    name: 'DevOps',
    icon: '♾️',
    color: '#0891b2',
    description: 'Bridge development and operations — automate everything from Linux, containers and Kubernetes to IaC, CI/CD, cloud and observability.',
    phases: [
      {
        id: 'devops-p1', title: 'DevOps Foundations',
        steps: [
          { id: 'devops-culture', title: 'DevOps Culture & Agile', icon: '🤝', type: 'required', description: 'Understand the DevOps mindset — collaboration, ownership and continuous improvement — and how it fits Agile/Scrum delivery.', topics: ['CALMS & the Three Ways', 'Dev + Ops collaboration', 'Agile & Scrum basics', 'Blameless postmortems', 'DORA metrics (lead time, MTTR)'] },
          { id: 'devops-linux', title: 'Linux Fundamentals', icon: '🐧', type: 'required', description: 'Linux is the OS of servers and containers — master the filesystem, permissions, processes and services.', topics: ['Filesystem hierarchy', 'Users, groups & permissions', 'Processes & signals', 'systemd & services', 'Package managers (apt/dnf)'] },
          { id: 'devops-shell', title: 'Shell Scripting & Bash', icon: '💻', type: 'required', courseSlug: 'terminal-command-line/terminal-basics-for-developers', description: 'Automate repetitive operational tasks with Bash scripting and the command line.', topics: ['Bash scripting', 'Variables & conditionals', 'Loops & functions', 'cron & scheduling', 'grep / sed / awk', 'Exit codes & piping'] },
        ],
      },
      {
        id: 'devops-p2', title: 'Version Control & Collaboration',
        steps: [
          { id: 'devops-git', title: 'Git & GitHub/GitLab', icon: '🐙', type: 'required', courseSlug: 'git-and-github/introduction-to-git-and-github-version-control-essentials', description: 'Version control is the backbone of DevOps automation and team collaboration.', topics: ['Commits & branching', 'Pull / Merge requests', 'Conventional commits', 'Git hooks', 'Tags & releases'] },
          { id: 'devops-workflows', title: 'Branching Workflows', icon: '🌿', type: 'required', description: 'Choose the right branching and release strategy for your team.', topics: ['Trunk-based development', 'GitFlow', 'PR review culture', 'Semantic versioning', 'Monorepo vs polyrepo'] },
        ],
      },
      {
        id: 'devops-p3', title: 'Programming & Networking',
        steps: [
          { id: 'devops-python', title: 'Python for Automation', icon: '🐍', type: 'required', description: 'A scripting language for tooling, glue code, automation and cloud SDKs.', topics: ['Scripting basics', 'requests & REST APIs', 'os / subprocess modules', 'boto3 / cloud SDKs', 'venv & pip'] },
          { id: 'devops-networking', title: 'Networking & Protocols', icon: '🌐', type: 'required', description: 'How traffic flows between clients, services and the internet.', topics: ['TCP/IP & ports', 'DNS', 'HTTP/HTTPS & TLS', 'SSH', 'Load balancing', 'Firewalls & NAT'] },
          { id: 'devops-webservers', title: 'Web Servers & Proxies', icon: '🚦', type: 'optional', description: 'Serve, route and reverse-proxy traffic to your applications.', topics: ['Nginx', 'Reverse proxy', 'TLS termination', 'Caddy', 'Rate limiting'] },
        ],
      },
      {
        id: 'devops-p4', title: 'Containerization',
        steps: [
          { id: 'devops-docker', title: 'Docker', icon: '🐳', type: 'required', description: 'Package applications and their dependencies into portable, reproducible containers.', topics: ['Images & layers', 'Dockerfile', 'Multi-stage builds', 'Docker Compose', 'Volumes & networks', 'Distroless images'] },
          { id: 'devops-registry', title: 'Registries & Image Security', icon: '📦', type: 'optional', description: 'Store, scan and harden container images for production.', topics: ['Docker Hub / GHCR / Harbor', 'Image tagging strategy', 'Vulnerability scanning (Trivy/Grype)', 'SBOM (Syft)', 'Image signing (cosign)'] },
        ],
      },
      {
        id: 'devops-p5', title: 'Container Orchestration',
        steps: [
          { id: 'devops-k8s', title: 'Kubernetes Core', icon: '☸️', type: 'required', description: 'Deploy, scale and self-heal containerized workloads in production with Kubernetes.', topics: ['Pods, ReplicaSets & Deployments', 'Services & Ingress', 'ConfigMaps & Secrets', 'Namespaces', 'kubectl', 'Liveness / readiness probes'] },
          { id: 'devops-helm', title: 'Helm & Kustomize', icon: '⚓', type: 'required', description: 'Package, template and manage Kubernetes manifests at scale.', topics: ['Helm charts', 'Values & templating', 'Releases & rollbacks', 'Kustomize overlays', 'Chart repositories'] },
          { id: 'devops-k8s-ops', title: 'K8s Operations', icon: '🛠️', type: 'advanced', description: 'Operate clusters reliably with scaling, access control and policy enforcement.', topics: ['HPA & autoscaling', 'RBAC', 'Network policies', 'Resource requests & limits', 'Operators & CRDs'] },
        ],
      },
      {
        id: 'devops-p6', title: 'Infrastructure as Code',
        steps: [
          { id: 'devops-terraform', title: 'Terraform / OpenTofu', icon: '🏗️', type: 'required', description: 'Provision cloud infrastructure declaratively, reproducibly and version-controlled.', topics: ['Providers & resources', 'State & remote backends', 'Modules', 'Variables & outputs', 'Workspaces', 'OpenTofu (OSS fork)'] },
          { id: 'devops-ansible', title: 'Ansible', icon: '📜', type: 'required', description: 'Automate server configuration and application deployment idempotently.', topics: ['Playbooks & roles', 'Inventory', 'Modules & tasks', 'Idempotency', 'Ansible Vault'] },
          { id: 'devops-pulumi', title: 'Pulumi', icon: '🧩', type: 'optional', description: 'Infrastructure as code using real programming languages instead of HCL.', topics: ['IaC in TS / Python / Go', 'Stacks', 'State management', 'Pulumi vs Terraform'] },
        ],
      },
      {
        id: 'devops-p7', title: 'CI/CD & GitOps',
        steps: [
          { id: 'devops-cicd', title: 'CI/CD Pipelines', icon: '⚡', type: 'required', description: 'Automate build, test and deploy with modern pipeline tooling.', topics: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Pipeline stages & artifacts', 'Caching & matrix builds', 'Pipeline secrets'] },
          { id: 'devops-gitops', title: 'GitOps (Argo CD / Flux)', icon: '🔄', type: 'required', description: 'Make Git the single source of truth for declarative, auditable deployments.', topics: ['GitOps principles', 'Argo CD', 'Flux CD', 'Sync & drift detection', 'Declarative rollbacks'] },
          { id: 'devops-progressive', title: 'Progressive Delivery', icon: '🐤', type: 'optional', description: 'Ship changes safely with gradual, automated, observable rollouts.', topics: ['Blue-green deployments', 'Canary releases', 'Argo Rollouts / Flagger', 'Feature flags', 'Automated rollback'] },
        ],
      },
      {
        id: 'devops-p8', title: 'Cloud Platforms',
        steps: [
          { id: 'devops-cloud', title: 'Cloud Fundamentals', icon: '☁️', type: 'required', description: 'Core building blocks shared across AWS, Azure and GCP.', topics: ['IAM & identity', 'Compute (EC2 / VMs)', 'Storage (S3 / blob)', 'VPC & networking', 'Managed databases', 'Billing & cost control'] },
          { id: 'devops-managed', title: 'Managed & Serverless', icon: '🚀', type: 'optional', description: 'Reduce operational toil with managed Kubernetes and serverless.', topics: ['Managed K8s (EKS / GKE / AKS)', 'Serverless (Lambda / Cloud Run)', 'Managed queues & caches', 'Auto-scaling', 'Well-Architected basics'] },
        ],
      },
      {
        id: 'devops-p9', title: 'Observability, DevSecOps & SRE',
        steps: [
          { id: 'devops-observability', title: 'Observability Stack', icon: '📊', type: 'required', description: 'Know exactly what your systems are doing with metrics, logs and traces.', topics: ['Prometheus & Grafana', 'Logging (Loki / ELK)', 'Distributed tracing (Tempo / Jaeger)', 'OpenTelemetry', 'Alerting (Alertmanager)'] },
          { id: 'devops-devsecops', title: 'DevSecOps', icon: '🛡️', type: 'required', description: 'Shift security left and bake it into every stage of the pipeline.', topics: ['SAST & DAST', 'Dependency / image scanning (Snyk / Trivy)', 'Secrets management (Vault)', 'Policy as Code (OPA / Kyverno)', 'Supply-chain security'] },
          { id: 'devops-sre', title: 'SRE & Reliability', icon: '🧯', type: 'advanced', description: 'Engineer for reliability with SLOs, incident response and resilience practices.', topics: ['SLI / SLO / SLA', 'Error budgets', 'Incident management & on-call', 'Backups & disaster recovery', 'Chaos engineering', 'Platform engineering (Backstage)'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     7. DATA ANALYTICS
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'data-analytics',
    name: 'Data Analytics',
    icon: '📊',
    color: '#0277bd',
    description: 'Turn raw data into insights with SQL, Python, Pandas and visualisation tools.',
    phases: [
      {
        id: 'da-p1', title: 'Data Foundations',
        steps: [
          { id: 'da-sql', title: 'SQL', icon: '🗄️', type: 'required', courseSlug: 'sql/every-app-runs-on-a-database', description: 'Query, filter and aggregate data with SQL — the #1 analyst skill.', topics: ['SELECT & WHERE', 'Aggregations (GROUP BY)', 'Joins', 'Subqueries', 'Window functions'] },
          { id: 'da-spreadsheets', title: 'Spreadsheets', icon: '📑', type: 'required', description: 'Excel and Google Sheets for quick data exploration and reporting.', topics: ['Formulas', 'Pivot tables', 'VLOOKUP / INDEX-MATCH', 'Charts', 'Data cleaning'] },
        ],
      },
      {
        id: 'da-p2', title: 'Python for Data',
        steps: [
          { id: 'da-python', title: 'Python Basics', icon: '🐍', type: 'required', description: 'Python syntax, data structures, functions and file I/O.', topics: ['Variables & types', 'Lists, dicts, sets', 'Loops & functions', 'File I/O', 'Virtual environments'] },
          { id: 'da-pandas', title: 'Pandas & NumPy', icon: '🐼', type: 'required', description: 'Manipulate and analyse tabular data with Pandas DataFrames.', topics: ['DataFrames', 'Filtering & sorting', 'Groupby & merge', 'Missing data', 'NumPy arrays'] },
        ],
      },
      {
        id: 'da-p3', title: 'Data Visualisation',
        steps: [
          { id: 'da-matplotlib', title: 'Matplotlib & Seaborn', icon: '📈', type: 'required', description: 'Create charts and statistical plots with Python libraries.', topics: ['Line & bar charts', 'Scatter plots', 'Histograms', 'Heatmaps', 'Customisation'] },
          { id: 'da-powerbi', title: 'Power BI / Tableau', icon: '🟡', type: 'optional', description: 'Build interactive dashboards and business reports.', topics: ['Connecting data sources', 'DAX basics', 'Visuals & filters', 'Publishing dashboards'] },
        ],
      },
      {
        id: 'da-p4', title: 'Statistics & Probability',
        steps: [
          { id: 'da-stats', title: 'Descriptive Statistics', icon: '📐', type: 'required', description: 'Mean, median, standard deviation, distributions and outliers.', topics: ['Central tendency', 'Spread & variance', 'Distributions', 'Outlier detection'] },
          { id: 'da-inferential', title: 'Inferential Statistics', icon: '🔬', type: 'optional', description: 'Hypothesis testing, p-values, confidence intervals and A/B testing.', topics: ['Hypothesis testing', 'p-values', 'Confidence intervals', 'A/B testing', 'Chi-square'] },
        ],
      },
      {
        id: 'da-p5', title: 'ML Basics & Capstone',
        steps: [
          { id: 'da-ml', title: 'Machine Learning Intro', icon: '🤖', type: 'optional', description: 'Supervised learning with scikit-learn for prediction and classification.', topics: ['Linear regression', 'Decision trees', 'Model evaluation', 'Feature engineering', 'scikit-learn'] },
          { id: 'da-capstone', title: 'End-to-End Project', icon: '🏆', type: 'required', description: 'Apply everything: clean data, analyse it and present findings.', topics: ['Data cleaning', 'EDA', 'Visualisation', 'Storytelling', 'Portfolio project'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     8. APPIUM AUTOMATION
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'appium-automation',
    name: 'Appium Automation',
    icon: '📱',
    color: '#bf360c',
    description: 'Automate iOS and Android app testing with Appium and Java/Python.',
    phases: [
      {
        id: 'app-p1', title: 'Programming Basics',
        steps: [
          { id: 'app-java', title: 'Java Basics', icon: '☕', type: 'required', description: 'OOP fundamentals in Java — the most common language for Appium.', topics: ['Classes & objects', 'Inheritance', 'Collections', 'Exception handling', 'Maven'] },
          { id: 'app-python-alt', title: 'Python (Alternative)', icon: '🐍', type: 'optional', description: 'Python as an alternative to Java for Appium scripting.', topics: ['Classes', 'pip & venv', 'pytest', 'Selenium WebDriver bindings'] },
        ],
      },
      {
        id: 'app-p2', title: 'Mobile Fundamentals',
        steps: [
          { id: 'app-android', title: 'Android Basics', icon: '🤖', type: 'required', description: 'Understand Android app structure, ADB and emulator setup.', topics: ['APK structure', 'ADB commands', 'Android emulator', 'Activity & intents', 'Permissions'] },
          { id: 'app-ios', title: 'iOS Basics', icon: '🍎', type: 'optional', description: 'iOS app lifecycle, Xcode simulator and IPA setup.', topics: ['IPA/WebDriverAgent', 'Xcode simulator', 'iOS permissions', 'Provisioning profiles'] },
        ],
      },
      {
        id: 'app-p3', title: 'Appium Core',
        steps: [
          { id: 'app-setup', title: 'Appium Setup', icon: '⚙️', type: 'required', description: 'Install and configure Appium server, drivers and Appium Inspector.', topics: ['Appium server', 'UiAutomator2 driver', 'Appium Inspector', 'DesiredCapabilities'] },
          { id: 'app-locators', title: 'Locator Strategies', icon: '🔍', type: 'required', description: 'Find UI elements using accessibility IDs, XPath and resource IDs.', topics: ['Accessibility ID', 'XPath', 'Class name', 'Android UIAutomator', 'iOS ClassChain'] },
          { id: 'app-interactions', title: 'Touch & Gestures', icon: '👆', type: 'required', description: 'Simulate taps, swipes, long press, pinch-zoom and scroll.', topics: ['Tap & click', 'Swipe & scroll', 'Long press', 'Multi-touch (W3C Actions)'] },
        ],
      },
      {
        id: 'app-p4', title: 'Test Frameworks',
        steps: [
          { id: 'app-testng', title: 'TestNG / JUnit', icon: '🧪', type: 'required', description: 'Structure tests with annotations, data providers and assertions.', topics: ['Annotations (@Test, @Before)', 'DataProvider', 'Assertions', 'Groups & priority', 'Listeners'] },
          { id: 'app-pageobj', title: 'Page Object Model', icon: '📄', type: 'required', description: 'POM pattern for maintainable, reusable mobile test code.', topics: ['Page classes', 'Element encapsulation', 'Base page', 'Factory pattern'] },
        ],
      },
      {
        id: 'app-p5', title: 'Advanced & CI',
        steps: [
          { id: 'app-parallel', title: 'Parallel Execution', icon: '⚡', type: 'optional', description: 'Run tests on multiple devices simultaneously with Selenium Grid.', topics: ['Selenium Grid 4', 'TestNG parallel config', 'Cloud testing (BrowserStack)'] },
          { id: 'app-ci', title: 'CI Integration', icon: '🔄', type: 'required', description: 'Trigger Appium tests on every build with GitHub Actions or Jenkins.', topics: ['GitHub Actions + Appium', 'Jenkins pipeline', 'Emulator in CI', 'Reporting (Allure)'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     9. PLAYWRIGHT AUTOMATION
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'playwright-automation',
    name: 'Playwright Automation',
    icon: '🎭',
    color: '#2e7d32',
    description: 'Modern end-to-end web testing with Playwright and TypeScript.',
    phases: [
      {
        id: 'pw-p1', title: 'Foundations',
        steps: [
          { id: 'pw-js', title: 'JavaScript / TypeScript', icon: '⚡', type: 'required', courseSlug: 'javascript/variables-data-types', description: 'Modern JS/TS as the primary language for Playwright.', topics: ['Async/await', 'Classes', 'TypeScript types', 'ES modules', 'npm'] },
          { id: 'pw-web', title: 'Web Fundamentals', icon: '🌐', type: 'required', courseSlug: 'html/introduction-to-html', description: 'HTML, DOM and browser APIs needed for effective test selectors.', topics: ['DOM structure', 'CSS selectors', 'Accessibility attributes', 'Network requests'] },
        ],
      },
      {
        id: 'pw-p2', title: 'Playwright Core',
        steps: [
          { id: 'pw-setup', title: 'Setup & Config', icon: '⚙️', type: 'required', description: 'Install Playwright, configure browsers and project structure.', topics: ['playwright install', 'playwright.config.ts', 'Multiple browsers', 'Base URL', 'Test directories'] },
          { id: 'pw-locators', title: 'Locators & Actions', icon: '🔍', type: 'required', description: 'Find and interact with elements using Playwright\'s smart locators.', topics: ['getByRole / getByText', 'getByTestId', 'Chaining locators', 'click / fill / type', 'Drag & drop'] },
          { id: 'pw-assertions', title: 'Assertions', icon: '✅', type: 'required', description: 'Assert page state with Playwright\'s built-in expect API.', topics: ['expect(locator).toBeVisible', 'toHaveText / toHaveValue', 'Soft assertions', 'Custom matchers'] },
        ],
      },
      {
        id: 'pw-p3', title: 'Test Structure',
        steps: [
          { id: 'pw-fixtures', title: 'Fixtures & Hooks', icon: '🪝', type: 'required', description: 'Manage test setup and teardown with fixtures and test hooks.', topics: ['test.beforeEach', 'Custom fixtures', 'Worker-scoped fixtures', 'Shared state'] },
          { id: 'pw-pom', title: 'Page Object Model', icon: '📄', type: 'required', description: 'Reusable, maintainable test code with the Page Object pattern.', topics: ['Page classes', 'Component objects', 'Fixture injection', 'Action methods'] },
          { id: 'pw-api', title: 'API Testing', icon: '🔗', type: 'optional', description: 'Test REST APIs directly or intercept network calls.', topics: ['request.get / post', 'Network interception', 'Mock responses', 'API fixtures'] },
        ],
      },
      {
        id: 'pw-p4', title: 'Advanced Features',
        steps: [
          { id: 'pw-parallel', title: 'Parallel & Cross-browser', icon: '🌍', type: 'required', description: 'Run tests in parallel across Chromium, Firefox and WebKit.', topics: ['Workers config', 'Sharding', 'Browser projects', 'Mobile emulation'] },
          { id: 'pw-visual', title: 'Visual Testing', icon: '👁️', type: 'optional', description: 'Catch UI regressions with screenshot and visual comparison testing.', topics: ['toHaveScreenshot', 'Update snapshots', 'Masking', 'Full-page screenshots'] },
        ],
      },
      {
        id: 'pw-p5', title: 'Reporting & CI/CD',
        steps: [
          { id: 'pw-reports', title: 'Reporting', icon: '📊', type: 'required', description: 'Generate rich HTML and trace reports for test results.', topics: ['HTML reporter', 'Trace viewer', 'Allure integration', 'Test retries', 'Video recording'] },
          { id: 'pw-ci', title: 'CI/CD Integration', icon: '🔄', type: 'required', description: 'Run Playwright tests automatically in GitHub Actions.', topics: ['GitHub Actions workflow', 'Headless mode', 'Artifact upload', 'PR comments with results'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     10. PROMPT ENGINEERING
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'prompt-engineering',
    name: 'Prompt Engineering',
    icon: '🤖',
    color: '#6a1b9a',
    description: 'Design effective prompts to get the best results from AI language models.',
    phases: [
      {
        id: 'pe-p1', title: 'AI & LLM Basics',
        steps: [
          { id: 'pe-llm', title: 'How LLMs Work', icon: '🧠', type: 'required', description: 'Understand transformers, tokens, context windows and temperature.', topics: ['Transformers overview', 'Tokenisation', 'Context window', 'Temperature & top-p', 'Training vs inference'] },
          { id: 'pe-models', title: 'Major AI Models', icon: '🔮', type: 'required', description: 'Explore GPT-4, Claude, Gemini and open-source models.', topics: ['OpenAI GPT-4/o', 'Anthropic Claude', 'Google Gemini', 'Llama & Mistral', 'Model comparison'] },
        ],
      },
      {
        id: 'pe-p2', title: 'Core Prompting Techniques',
        steps: [
          { id: 'pe-zero-shot', title: 'Zero & Few-Shot', icon: '🎯', type: 'required', description: 'Instruct models with no examples or a few to set the pattern.', topics: ['Zero-shot prompting', 'One-shot examples', 'Few-shot patterns', 'Format control'] },
          { id: 'pe-cot', title: 'Chain-of-Thought', icon: '🔗', type: 'required', description: 'Improve reasoning by asking the model to think step-by-step.', topics: ['CoT prompting', 'Step-by-step reasoning', 'Self-consistency', 'Tree of Thoughts'] },
          { id: 'pe-role', title: 'Role & Persona Prompting', icon: '🎭', type: 'required', description: 'Set system roles and personas for consistent model behaviour.', topics: ['System prompts', 'Persona design', 'Tone control', 'Domain expertise prompts'] },
        ],
      },
      {
        id: 'pe-p3', title: 'Advanced Techniques',
        steps: [
          { id: 'pe-rag', title: 'RAG (Retrieval-Augmented)', icon: '📚', type: 'required', description: 'Ground model outputs in your own documents with RAG.', topics: ['Embeddings & vector DBs', 'Chunking strategies', 'Retrieval ranking', 'Prompt with context'] },
          { id: 'pe-agents', title: 'AI Agents & Tool Use', icon: '🤖', type: 'optional', description: 'Build autonomous agents that call tools and plan multi-step tasks.', topics: ['ReAct pattern', 'Tool definitions', 'Multi-step planning', 'Agent loops', 'LangChain agents'] },
          { id: 'pe-fine-tuning', title: 'Fine-tuning Basics', icon: '⚙️', type: 'advanced', description: 'Customise model behaviour by fine-tuning on your own data.', topics: ['When to fine-tune vs prompt', 'Dataset preparation', 'OpenAI fine-tuning API', 'Evaluation'] },
        ],
      },
      {
        id: 'pe-p4', title: 'Building AI Apps',
        steps: [
          { id: 'pe-api', title: 'Using AI APIs', icon: '🔗', type: 'required', description: 'Call OpenAI and Anthropic APIs from your applications.', topics: ['OpenAI API', 'Anthropic Claude API', 'Streaming responses', 'Function calling', 'Cost optimisation'] },
          { id: 'pe-langchain', title: 'LangChain / LlamaIndex', icon: '🦜', type: 'optional', description: 'Build LLM-powered pipelines and apps with popular frameworks.', topics: ['Chains & prompts', 'Document loaders', 'Vector stores', 'Memory', 'Chat history'] },
          { id: 'pe-eval', title: 'Prompt Evaluation', icon: '📊', type: 'required', description: 'Measure, iterate and improve your prompts systematically.', topics: ['Evaluation metrics', 'A/B prompt testing', 'Red-teaming', 'Hallucination detection'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     11. AI ENGINEERING
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'ai-engineering',
    name: 'AI Engineering',
    icon: '🧠',
    color: '#e65100',
    description: 'Build, train and deploy intelligent AI systems and machine learning models.',
    phases: [
      {
        id: 'ai-p1', title: 'Programming & Math',
        steps: [
          { id: 'ai-python', title: 'Python', icon: '🐍', type: 'required', description: 'Python is the primary language for AI and ML development.', topics: ['OOP', 'NumPy', 'Pandas', 'Virtual environments', 'Jupyter notebooks'] },
          { id: 'ai-math', title: 'Math Foundations', icon: '📐', type: 'required', description: 'Linear algebra, calculus, probability and statistics for ML.', topics: ['Vectors & matrices', 'Derivatives & gradients', 'Probability', 'Statistics', 'Information theory'] },
        ],
      },
      {
        id: 'ai-p2', title: 'Classical ML',
        steps: [
          { id: 'ai-supervised', title: 'Supervised Learning', icon: '📊', type: 'required', description: 'Regression and classification algorithms with scikit-learn.', topics: ['Linear & logistic regression', 'Decision trees', 'SVM', 'Ensemble methods (RF, XGBoost)', 'Model evaluation'] },
          { id: 'ai-unsupervised', title: 'Unsupervised Learning', icon: '🔍', type: 'optional', description: 'Clustering and dimensionality reduction techniques.', topics: ['K-Means clustering', 'PCA', 'Autoencoders', 'Anomaly detection'] },
          { id: 'ai-feature', title: 'Feature Engineering', icon: '⚙️', type: 'required', description: 'Transform raw data into meaningful features for ML models.', topics: ['Missing data', 'Encoding categoricals', 'Normalisation', 'Feature selection', 'Pipeline'] },
        ],
      },
      {
        id: 'ai-p3', title: 'Deep Learning',
        steps: [
          { id: 'ai-nn', title: 'Neural Networks', icon: '🕸️', type: 'required', description: 'Understand perceptrons, backpropagation and MLP architectures.', topics: ['Perceptron', 'Activation functions', 'Backpropagation', 'Gradient descent', 'Overfitting & regularisation'] },
          { id: 'ai-pytorch', title: 'PyTorch', icon: '🔥', type: 'required', description: 'Build, train and evaluate neural networks with PyTorch.', topics: ['Tensors', 'DataLoader', 'nn.Module', 'Training loop', 'GPU acceleration'] },
          { id: 'ai-cnn', title: 'CNNs & Vision', icon: '👁️', type: 'optional', description: 'Convolutional networks for image classification and detection.', topics: ['Conv layers', 'Pooling', 'Transfer learning (ResNet, EfficientNet)', 'Object detection basics'] },
        ],
      },
      {
        id: 'ai-p4', title: 'LLMs & Transformers',
        steps: [
          { id: 'ai-transformers', title: 'Transformer Architecture', icon: '🔮', type: 'required', description: 'Attention mechanism, encoder-decoder and BERT/GPT architectures.', topics: ['Self-attention', 'Multi-head attention', 'Positional encoding', 'BERT vs GPT', 'Hugging Face Transformers'] },
          { id: 'ai-llm-fine', title: 'Fine-tuning LLMs', icon: '⚙️', type: 'optional', description: 'Fine-tune pre-trained LLMs on domain-specific datasets.', topics: ['LoRA / QLoRA', 'PEFT', 'Instruction tuning', 'RLHF basics', 'Hugging Face PEFT'] },
          { id: 'ai-rag', title: 'RAG Systems', icon: '📚', type: 'required', description: 'Build retrieval-augmented generation pipelines.', topics: ['Embeddings', 'Vector databases (Pinecone, FAISS)', 'Chunking', 'Reranking', 'LangChain / LlamaIndex'] },
        ],
      },
      {
        id: 'ai-p5', title: 'Deployment & MLOps',
        steps: [
          { id: 'ai-serving', title: 'Model Serving', icon: '🚀', type: 'required', description: 'Serve ML models as REST APIs with FastAPI and Docker.', topics: ['FastAPI', 'Model serialisation', 'Docker packaging', 'Inference optimisation'] },
          { id: 'ai-mlops', title: 'MLOps', icon: '🔄', type: 'optional', description: 'Track experiments, version models and automate retraining.', topics: ['MLflow', 'Weights & Biases', 'Model registry', 'CI/CD for ML', 'Data versioning (DVC)'] },
          { id: 'ai-cloud', title: 'Cloud AI Services', icon: '☁️', type: 'optional', description: 'Use AWS SageMaker, GCP Vertex AI or Azure ML for production.', topics: ['SageMaker / Vertex AI', 'Managed training', 'Auto-scaling endpoints', 'Cost optimisation'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     12. DSA WITH PYTHON
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'dsa-python',
    name: 'DSA with Python',
    icon: '🐍',
    color: '#306998',
    description: 'Master data structures and algorithms using Python — from Big-O and recursion to dynamic programming and interview prep.',
    phases: [
      {
        id: 'dsapy-p1', title: 'Python Foundations',
        steps: [
          { id: 'dsapy-basics', title: 'Python Basics', icon: '🐍', type: 'required', courseSlug: 'javascript/variables-data-types', description: 'Core Python syntax, control flow and functions needed to write algorithms.', topics: ['Variables & types', 'Control flow', 'Functions', 'Input / output', 'Modules & imports'] },
          { id: 'dsapy-builtins', title: 'Built-in Data Types', icon: '📦', type: 'required', description: 'Python\'s built-in containers that power most data-structure work.', topics: ['Lists & tuples', 'Dictionaries', 'Sets', 'Strings', 'Comprehensions'] },
          { id: 'dsapy-oop', title: 'OOP in Python', icon: '🧱', type: 'optional', description: 'Use classes to model nodes, linked lists, trees and graphs.', topics: ['Classes & objects', '__init__ & self', 'Magic methods', 'Inheritance', 'Encapsulation'] },
        ],
      },
      {
        id: 'dsapy-p2', title: 'Complexity Analysis',
        steps: [
          { id: 'dsapy-bigo', title: 'Big-O Notation', icon: '📈', type: 'required', description: 'Measure how time and space scale as input grows.', topics: ['Time complexity', 'Space complexity', 'Best / average / worst case', 'Asymptotic notation', 'Amortized analysis'] },
          { id: 'dsapy-recursion', title: 'Recursion', icon: '🔁', type: 'required', description: 'Think recursively with base cases, the call stack and backtracking.', topics: ['Base & recursive case', 'Call stack', 'Recursion vs iteration', 'Tail recursion', 'Backtracking intro'] },
        ],
      },
      {
        id: 'dsapy-p3', title: 'Linear Data Structures',
        steps: [
          { id: 'dsapy-arrays', title: 'Arrays & Lists', icon: '🔢', type: 'required', description: 'Traverse, slice and manipulate lists with classic patterns.', topics: ['Indexing & slicing', 'Traversal', 'Insertion / deletion', 'Two-pointer technique', 'Sliding window'] },
          { id: 'dsapy-strings', title: 'Strings', icon: '🔤', type: 'required', description: 'String manipulation and common interview string problems.', topics: ['String methods', 'Pattern matching', 'Palindromes', 'Anagrams', 'ASCII / Unicode'] },
          { id: 'dsapy-linkedlist', title: 'Linked Lists', icon: '🔗', type: 'required', description: 'Build and manipulate singly and doubly linked lists.', topics: ['Singly linked list', 'Doubly linked list', 'Reversal', 'Cycle detection', 'Fast & slow pointers'] },
          { id: 'dsapy-stackqueue', title: 'Stacks & Queues', icon: '🥞', type: 'required', description: 'LIFO and FIFO structures and where they shine.', topics: ['Stack (LIFO)', 'Queue (FIFO)', 'collections.deque', 'Monotonic stack', 'Applications'] },
          { id: 'dsapy-hash', title: 'Hash Tables', icon: '🗂️', type: 'required', description: 'Use dicts and sets for O(1) lookups and counting.', topics: ['dict & set internals', 'Hashing', 'Collisions', 'Frequency counting', 'Two-sum pattern'] },
        ],
      },
      {
        id: 'dsapy-p4', title: 'Non-Linear Data Structures',
        steps: [
          { id: 'dsapy-trees', title: 'Trees', icon: '🌳', type: 'required', description: 'Binary trees, BSTs and tree traversals.', topics: ['Binary tree', 'Binary search tree', 'DFS & BFS traversals', 'Height & depth', 'Recursion on trees'] },
          { id: 'dsapy-heaps', title: 'Heaps & Priority Queues', icon: '⛰️', type: 'optional', description: 'Priority queues with Python\'s heapq module.', topics: ['Min / max heap', 'heapq module', 'Heapify', 'Top-K problems', 'Heap sort'] },
          { id: 'dsapy-trie', title: 'Tries', icon: '🌲', type: 'advanced', description: 'Prefix trees for fast string lookups and autocomplete.', topics: ['Prefix tree', 'Insert & search', 'Autocomplete', 'Word dictionaries'] },
          { id: 'dsapy-graphs', title: 'Graphs', icon: '🕸️', type: 'required', description: 'Represent and traverse graphs with BFS and DFS.', topics: ['Adjacency list / matrix', 'BFS', 'DFS', 'Connected components', 'Topological sort'] },
        ],
      },
      {
        id: 'dsapy-p5', title: 'Core Algorithms',
        steps: [
          { id: 'dsapy-search', title: 'Searching', icon: '🔍', type: 'required', description: 'Linear and binary search, including binary search on the answer.', topics: ['Linear search', 'Binary search', 'Binary search on answer', 'Search in rotated array'] },
          { id: 'dsapy-sort', title: 'Sorting', icon: '🗃️', type: 'required', description: 'Classic sorting algorithms and Python\'s built-in sort.', topics: ['Bubble / insertion / selection', 'Merge sort', 'Quick sort', 'Counting / radix sort', 'sorted() & .sort()'] },
          { id: 'dsapy-backtrack', title: 'Recursion & Backtracking', icon: '♟️', type: 'required', description: 'Generate combinations and solve constraint problems.', topics: ['Subsets & permutations', 'N-Queens', 'Sudoku solver', 'Pruning'] },
        ],
      },
      {
        id: 'dsapy-p6', title: 'Advanced Techniques',
        steps: [
          { id: 'dsapy-greedy', title: 'Greedy Algorithms', icon: '💰', type: 'optional', description: 'Make locally optimal choices for global solutions.', topics: ['Greedy choice property', 'Interval scheduling', 'Huffman coding', 'Activity selection'] },
          { id: 'dsapy-dp', title: 'Dynamic Programming', icon: '🧩', type: 'required', description: 'Solve overlapping subproblems with memoization and tabulation.', topics: ['Memoization', 'Tabulation', '0/1 Knapsack', 'LCS / LIS', 'DP on grids'] },
          { id: 'dsapy-graphalgo', title: 'Advanced Graph Algorithms', icon: '🛰️', type: 'advanced', description: 'Shortest paths, union-find and minimum spanning trees.', topics: ['Dijkstra', 'Bellman-Ford', 'Union-Find (DSU)', 'MST (Kruskal / Prim)', 'Floyd-Warshall'] },
          { id: 'dsapy-bits', title: 'Bit Manipulation', icon: '🔣', type: 'optional', description: 'Solve problems efficiently with bitwise tricks.', topics: ['Bitwise operators', 'Bit masks', 'XOR tricks', 'Power of two', 'Counting bits'] },
        ],
      },
      {
        id: 'dsapy-p7', title: 'Interview Preparation',
        steps: [
          { id: 'dsapy-patterns', title: 'Problem Patterns', icon: '🎯', type: 'required', description: 'Recognise the patterns behind most coding-interview questions.', topics: ['Two pointers', 'Sliding window', 'Fast & slow pointers', 'Prefix sum', 'Binary search patterns'] },
          { id: 'dsapy-practice', title: 'Coding Practice', icon: '🏋️', type: 'required', description: 'Build problem-solving speed on LeetCode and HackerRank.', topics: ['LeetCode / HackerRank', 'Easy → hard progression', 'Mock interviews', 'Time management'] },
          { id: 'dsapy-sysdesign', title: 'System Design Basics', icon: '🏗️', type: 'optional', description: 'Understand the data-structure trade-offs behind scalable systems.', topics: ['Scalability basics', 'Caching', 'Load balancing', 'DS trade-offs'] },
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════
     13. DSA WITH C++
  ═══════════════════════════════════════════════════════════════ */
  {
    slug: 'dsa-cpp',
    name: 'DSA with C++',
    icon: '🔵',
    color: '#00599c',
    description: 'Master data structures and algorithms using C++ and the STL — from pointers and Big-O to dynamic programming and competitive coding.',
    phases: [
      {
        id: 'dsacpp-p1', title: 'C++ Foundations',
        steps: [
          { id: 'dsacpp-basics', title: 'C++ Basics', icon: '🔵', type: 'required', description: 'Core C++ syntax, I/O and functions to start writing algorithms.', topics: ['Syntax & I/O (cin/cout)', 'Data types', 'Control flow', 'Functions', 'Header files'] },
          { id: 'dsacpp-pointers', title: 'Pointers & Memory', icon: '📍', type: 'required', description: 'Pointers, references and dynamic memory — the heart of C++ DSA.', topics: ['Pointers & references', 'new / delete', 'Memory layout', 'Pointer arithmetic', 'Smart pointers'] },
          { id: 'dsacpp-stl', title: 'STL Essentials', icon: '🧰', type: 'required', description: 'The Standard Template Library containers and algorithms.', topics: ['vector & pair', 'string', 'Iterators', '<algorithm> header', 'Templates'] },
          { id: 'dsacpp-oop', title: 'OOP in C++', icon: '🧱', type: 'optional', description: 'Model data structures with classes and operator overloading.', topics: ['Classes & objects', 'Constructors / destructors', 'Operator overloading', 'Templates', 'Inheritance'] },
        ],
      },
      {
        id: 'dsacpp-p2', title: 'Complexity Analysis',
        steps: [
          { id: 'dsacpp-bigo', title: 'Big-O Notation', icon: '📈', type: 'required', description: 'Measure how time and space scale as input grows.', topics: ['Time complexity', 'Space complexity', 'Best / average / worst case', 'Asymptotic notation', 'Amortized analysis'] },
          { id: 'dsacpp-recursion', title: 'Recursion', icon: '🔁', type: 'required', description: 'Think recursively with base cases, the call stack and backtracking.', topics: ['Base & recursive case', 'Call stack', 'Recursion vs iteration', 'Tail recursion', 'Backtracking intro'] },
        ],
      },
      {
        id: 'dsacpp-p3', title: 'Linear Data Structures',
        steps: [
          { id: 'dsacpp-arrays', title: 'Arrays & Vectors', icon: '🔢', type: 'required', description: 'Static arrays and dynamic std::vector with classic patterns.', topics: ['Static vs dynamic arrays', 'std::vector', 'Traversal', 'Two-pointer technique', 'Sliding window'] },
          { id: 'dsacpp-strings', title: 'Strings', icon: '🔤', type: 'required', description: 'std::string, char arrays and pattern-matching algorithms.', topics: ['std::string', 'Manipulation', 'Pattern matching (KMP)', 'Palindromes', 'char arrays'] },
          { id: 'dsacpp-linkedlist', title: 'Linked Lists', icon: '🔗', type: 'required', description: 'Build singly and doubly linked lists with pointers.', topics: ['Singly linked list', 'Doubly linked list', 'std::list', 'Reversal', 'Cycle detection'] },
          { id: 'dsacpp-stackqueue', title: 'Stacks & Queues', icon: '🥞', type: 'required', description: 'STL stack, queue and deque and their applications.', topics: ['std::stack', 'std::queue', 'std::deque', 'Monotonic stack', 'Applications'] },
          { id: 'dsacpp-hash', title: 'Hash Tables', icon: '🗂️', type: 'required', description: 'O(1) lookups with unordered_map and unordered_set.', topics: ['unordered_map', 'unordered_set', 'Hashing', 'Collisions', 'Frequency counting'] },
        ],
      },
      {
        id: 'dsacpp-p4', title: 'Non-Linear Data Structures',
        steps: [
          { id: 'dsacpp-trees', title: 'Trees', icon: '🌳', type: 'required', description: 'Binary trees, BSTs and tree traversals.', topics: ['Binary tree', 'Binary search tree', 'DFS & BFS traversals', 'Height & depth', 'Recursion on trees'] },
          { id: 'dsacpp-heaps', title: 'Heaps & Priority Queues', icon: '⛰️', type: 'optional', description: 'Priority queues with std::priority_queue.', topics: ['std::priority_queue', 'Min / max heap', 'Heapify', 'Top-K problems', 'Heap sort'] },
          { id: 'dsacpp-trie', title: 'Tries', icon: '🌲', type: 'advanced', description: 'Prefix trees for fast string lookups and autocomplete.', topics: ['Prefix tree', 'Insert & search', 'Autocomplete', 'Word dictionaries'] },
          { id: 'dsacpp-graphs', title: 'Graphs', icon: '🕸️', type: 'required', description: 'Represent and traverse graphs with BFS and DFS.', topics: ['Adjacency list / matrix', 'BFS', 'DFS', 'Connected components', 'Topological sort'] },
        ],
      },
      {
        id: 'dsacpp-p5', title: 'Core Algorithms',
        steps: [
          { id: 'dsacpp-search', title: 'Searching', icon: '🔍', type: 'required', description: 'Linear and binary search with STL helpers.', topics: ['Linear search', 'Binary search', 'lower_bound / upper_bound', 'Search in rotated array'] },
          { id: 'dsacpp-sort', title: 'Sorting', icon: '🗃️', type: 'required', description: 'Classic sorting algorithms and std::sort.', topics: ['Bubble / insertion / selection', 'Merge sort', 'Quick sort', 'Counting / radix sort', 'std::sort'] },
          { id: 'dsacpp-backtrack', title: 'Recursion & Backtracking', icon: '♟️', type: 'required', description: 'Generate combinations and solve constraint problems.', topics: ['Subsets & permutations', 'N-Queens', 'Sudoku solver', 'Pruning'] },
        ],
      },
      {
        id: 'dsacpp-p6', title: 'Advanced Techniques',
        steps: [
          { id: 'dsacpp-greedy', title: 'Greedy Algorithms', icon: '💰', type: 'optional', description: 'Make locally optimal choices for global solutions.', topics: ['Greedy choice property', 'Interval scheduling', 'Huffman coding', 'Activity selection'] },
          { id: 'dsacpp-dp', title: 'Dynamic Programming', icon: '🧩', type: 'required', description: 'Solve overlapping subproblems with memoization and tabulation.', topics: ['Memoization', 'Tabulation', '0/1 Knapsack', 'LCS / LIS', 'DP on grids'] },
          { id: 'dsacpp-graphalgo', title: 'Advanced Graph Algorithms', icon: '🛰️', type: 'advanced', description: 'Shortest paths, union-find and minimum spanning trees.', topics: ['Dijkstra', 'Bellman-Ford', 'Union-Find (DSU)', 'MST (Kruskal / Prim)', 'Floyd-Warshall'] },
          { id: 'dsacpp-bits', title: 'Bit Manipulation', icon: '🔣', type: 'optional', description: 'Solve problems efficiently with bitwise tricks.', topics: ['Bitwise operators', 'Bit masks', 'XOR tricks', 'Power of two', '__builtin_popcount'] },
        ],
      },
      {
        id: 'dsacpp-p7', title: 'Competitive & Interview Prep',
        steps: [
          { id: 'dsacpp-patterns', title: 'Problem Patterns', icon: '🎯', type: 'required', description: 'Recognise the patterns behind most coding-interview questions.', topics: ['Two pointers', 'Sliding window', 'Prefix sum', 'Binary search patterns', 'Greedy patterns'] },
          { id: 'dsacpp-competitive', title: 'Competitive Coding', icon: '🏆', type: 'optional', description: 'Speed and tricks for Codeforces, AtCoder and contests.', topics: ['Fast I/O', 'Codeforces / AtCoder', 'Time limits', 'Templates', 'Number theory basics'] },
          { id: 'dsacpp-practice', title: 'Coding Practice', icon: '🏋️', type: 'required', description: 'Build problem-solving speed on LeetCode and GeeksforGeeks.', topics: ['LeetCode / GfG', 'Easy → hard progression', 'Mock interviews', 'Time management'] },
        ],
      },
    ],
  },
];
