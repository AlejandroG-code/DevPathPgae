// src/app/roadmaps/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  resources?: { name: string; url: string }[];
  children?: RoadmapNode[];
}

interface Roadmap {
  id: string;
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

const roadmapsData: Roadmap[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer Roadmap',
    description: 'A step-by-step guide to becoming a modern frontend developer.',
    nodes: [
      {
        id: 'internet-web-fundamentals-fe',
        title: 'Internet & Web Fundamentals',
        description: 'Understand how the internet and web work.',
        resources: [
          { name: 'How the web works (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/How_the_Web_works' },
          { name: 'HTTP (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
        ],
      },
      {
        id: 'html-fundamentals',
        title: 'HTML Fundamentals',
        description: 'Learn the core language for structuring web content.',
        resources: [
          { name: 'MDN Web Docs (HTML)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        ],
      },
      {
        id: 'css-fundamentals',
        title: 'CSS Fundamentals',
        description: 'Style your web pages with cascading style sheets.',
        resources: [
          { name: 'MDN Web Docs (CSS)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
          { name: 'Flexbox Froggy', url: 'https://flexboxfroggy.com/' },
          { name: 'CSS Grid Garden', url: 'https://cssgridgarden.com/' },
        ],
        children: [
          { id: 'responsive-design', title: 'Responsive Design', description: 'Media Queries, Flexbox, Grid.' },
          { id: 'css-animations', title: 'Animations & Transitions', description: 'Bring your UI to life.' },
          { id: 'css-frameworks', title: 'CSS Frameworks (Optional)', description: 'Tailwind CSS, Bootstrap.' },
        ],
      },
      {
        id: 'javascript-fundamentals-fe',
        title: 'JavaScript Fundamentals',
        description: 'Master the language of the web for interactivity.',
        resources: [
          { name: 'MDN Web Docs (JavaScript)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
          { name: 'JavaScript.info', url: 'https://javascript.info/' },
        ],
        children: [
          { id: 'dom-manipulation', title: 'DOM Manipulation & Events', description: 'Interact with page elements.' },
          { id: 'async-js', title: 'Asynchronous JavaScript', description: 'Callbacks, Promises, Async/Await.' },
          { id: 'es6-features', title: 'ES6+ Features', description: 'Arrow Functions, Destructuring, Modules.' },
        ],
      },
      {
        id: 'dev-tools-fe',
        title: 'Development Tools',
        description: 'Essential tools for every frontend developer.',
        children: [
          { id: 'git-github-fe', title: 'Git & GitHub', description: 'Version control system.' },
          { id: 'cli-fe', title: 'Command Line Basics', description: 'Navigate and execute commands.' },
          { id: 'package-managers-fe', title: 'Package Managers', description: 'npm/Yarn for managing dependencies.' },
          { id: 'browser-devtools', title: 'Browser DevTools', description: 'Debugging and inspection.' },
        ],
      },
      {
        id: 'framework-choice-fe',
        title: 'Choose a Framework/Library',
        description: 'Select and deep dive into a popular frontend framework.',
        children: [
          { id: 'reactjs', title: 'React.js', description: 'Component-based UI library with Hooks, Context, State Management (Redux/Zustand), and Next.js.' },
          { id: 'vuejs', title: 'Vue.js', description: 'Progressive framework with Composition API, Vue Router, Pinia/Vuex, and Nuxt.js.' },
          { id: 'angular', title: 'Angular', description: 'Comprehensive framework with Components, Services, RxJS, and TypeScript.' },
        ],
      },
      {
        id: 'build-perf-test-fe',
        title: 'Build, Performance & Testing',
        description: 'Tools and techniques for robust and fast applications.',
        children: [
          { id: 'bundlers', title: 'Bundlers', description: 'Webpack, Vite, Parcel.' },
          { id: 'linting-formatting', title: 'Linting & Formatting', description: 'ESLint, Prettier.' },
          { id: 'performance-opt', title: 'Performance Optimization', description: 'Lighthouse, Core Web Vitals.' },
          { id: 'testing-fe', title: 'Testing', description: 'Unit (Jest), E2E (Cypress, Playwright).' },
        ],
      },
      {
        id: 'advanced-fe',
        title: 'Advanced & Trends',
        description: 'Explore modern frontend concepts and emerging technologies.',
        children: [
          { id: 'ssr-ssg', title: 'SSR/SSG/ISR', description: 'Server-Side Rendering, Static Site Generation, Incremental Static Regeneration.' },
          { id: 'web-components', title: 'Web Components', description: 'Reusable custom elements.' },
          { id: 'websockets-fe', title: 'WebSockets', description: 'Real-time communication.' },
          { id: 'graphql-fe', title: 'GraphQL Integration', description: 'Efficient data fetching.' },
          { id: 'pwa', title: 'Progressive Web Apps (PWA)', description: 'Web apps with native-like features.' },
        ],
      },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Developer Roadmap',
    description: 'A comprehensive guide to backend development.',
    nodes: [
      {
        id: 'internet-web-fundamentals-be',
        title: 'Internet & Web Fundamentals',
        description: 'Deep dive into server-side communication.',
        resources: [
          { name: 'HTTP (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP' },
          { name: 'DNS Explained', url: 'https://howdns.works/' },
        ],
      },
      {
        id: 'os-cli-be',
        title: 'OS & CLI Fundamentals',
        description: 'Understand operating systems and command line interfaces.',
        children: [
          { id: 'linux-be', title: 'Linux Basics', description: 'Essential commands, process management, networking.' },
          { id: 'os-concepts', title: 'OS Concepts', description: 'Memory, CPU, I/O.' },
        ],
      },
      {
        id: 'version-control-be',
        title: 'Version Control (Git)',
        description: 'Master Git for collaborative backend development.',
        resources: [
          { name: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2' },
        ],
      },
      {
        id: 'language-ecosystem-be',
        title: 'Choose a Language & Ecosystem',
        description: 'Select your primary backend programming language.',
        children: [
          { id: 'nodejs-be', title: 'JavaScript (Node.js)', description: 'Frameworks (Express, NestJS), npm/Yarn, Async/Await.' },
          { id: 'python-be', title: 'Python', description: 'Frameworks (Django, Flask, FastAPI), Pip.' },
          { id: 'java-be', title: 'Java', description: 'Frameworks (Spring Boot), Maven/Gradle.' },
          { id: 'go-be', title: 'Go', description: 'Frameworks (Gin, Echo).' },
          { id: 'php-be', title: 'PHP', description: 'Frameworks (Laravel, Symfony), Composer.' },
        ],
      },
      {
        id: 'databases-be',
        title: 'Databases',
        description: 'Learn to design, manage, and query databases.',
        children: [
          { id: 'sql-db', title: 'Relational Databases (SQL)', description: 'PostgreSQL, MySQL, Normalization, Joins, ORMs.' },
          { id: 'nosql-db', title: 'Non-Relational Databases (NoSQL)', description: 'MongoDB (Document), Redis (Key-Value), Cassandra (Columnar).' },
        ],
      },
      {
        id: 'apis-be',
        title: 'APIs',
        description: 'Understand how to build and consume Application Programming Interfaces.',
        children: [
          { id: 'restful-apis', title: 'RESTful APIs', description: 'HTTP Methods, Status Codes, Idempotency.' },
          { id: 'graphql-be', title: 'GraphQL (Optional)', description: 'Schema, Queries, Mutations, Resolvers.' },
        ],
      },
      {
        id: 'auth-authz-be',
        title: 'Authentication & Authorization',
        description: 'Secure your applications.',
        children: [
          { id: 'tokens', title: 'Tokens (JWT), OAuth', description: 'Stateless authentication.' },
          { id: 'rbac', title: 'RBAC/ABAC', description: 'Role/Attribute Based Access Control.' },
        ],
      },
      {
        id: 'caching-be',
        title: 'Caching',
        description: 'Improve application performance with caching strategies (Redis, Memcached).',
      },
      {
        id: 'messaging-queues',
        title: 'Messaging / Message Queues (Optional)',
        description: 'RabbitMQ, Apache Kafka, AWS SQS for asynchronous communication.',
      },
      {
        id: 'deployment-be',
        title: 'Deployment',
        description: 'Deploy your backend applications.',
        children: [
          { id: 'web-servers', title: 'Web Servers & Proxies', description: 'Nginx, Apache as reverse proxies.' },
          { id: 'containerization', title: 'Containerization (Docker)', description: 'Dockerfile, Docker Compose.' },
          { id: 'ci-cd-be', title: 'CI/CD Basics', description: 'Continuous Integration/Deployment.' },
          { id: 'cloud-providers-be', title: 'Cloud Providers Basics', description: 'AWS, GCP, Azure for compute and DBs.' },
        ],
      },
      {
        id: 'security-be',
        title: 'Security',
        description: 'Protect your backend from common vulnerabilities.',
        children: [
          { id: 'owasp-top-10', title: 'OWASP Top 10', description: 'Common vulnerabilities (SQL Injection, XSS, CSRF).' },
          { id: 'password-hashing', title: 'Password Hashing & Salting', description: 'Secure password storage.' },
          { id: 'input-validation', title: 'Input Validation', description: 'Sanitization and validation.' },
        ],
      },
      {
        id: 'monitoring-logging',
        title: 'Monitoring & Logging',
        description: 'Track application health and debug issues.',
        children: [
          { id: 'logging-tools', title: 'Logging Tools', description: 'ELK Stack (Elasticsearch, Logstash, Kibana).' },
          { id: 'metrics-monitoring', title: 'Metrics & Monitoring', description: 'Prometheus, Grafana.' },
        ],
      },
    ],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer Roadmap',
    description: 'Master both frontend and backend development to build complete applications.',
    nodes: [
      {
        id: 'general-fundamentals-fs',
        title: 'General Fundamentals',
        description: 'Core knowledge for any developer.',
        children: [
          { id: 'internet-fs', title: 'How Internet Works', description: 'HTTP/HTTPS, DNS.' },
          { id: 'git-github-fs', title: 'Git & GitHub (Advanced)', description: 'Version control system.' },
          { id: 'cli-fs', title: 'Command Line (Intermediate)', description: 'Linux CLI.' },
        ],
      },
      {
        id: 'frontend-fundamentals-fs',
        title: 'Frontend Fundamentals (See Frontend Roadmap)',
        description: 'Build user interfaces with HTML, CSS, JavaScript, and a modern framework.',
        children: [
          { id: 'html-css-fs', title: 'HTML, CSS', description: 'Including responsive design, Flexbox, Grid.' },
          { id: 'javascript-fs', title: 'JavaScript', description: 'ES6+, Asynchrony, DOM.' },
          { id: 'package-managers-fs', title: 'Package Managers', description: 'npm/Yarn.' },
          { id: 'framework-fs', title: 'Frontend Framework', description: 'React/Next.js, Vue/Nuxt.js, or Angular (Intermediate/Advanced).' },
          { id: 'bundlers-optim', title: 'Bundlers & Optimization', description: 'Webpack/Vite, Performance.' },
        ],
      },
      {
        id: 'backend-fundamentals-fs',
        title: 'Backend Fundamentals (See Backend Roadmap)',
        description: 'Develop server-side logic, APIs, and manage databases.',
        children: [
          { id: 'lang-framework-fs', title: 'Backend Language & Framework', description: 'Node.js/Express, Python/Django/Flask, etc. (Intermediate/Advanced).' },
          { id: 'databases-fs', title: 'Databases', description: 'Relational (SQL, ORMs), Non-Relational (NoSQL).' },
          { id: 'apis-fs', title: 'APIs', description: 'RESTful, GraphQL.' },
          { id: 'auth-authz-fs', title: 'Authentication & Authorization', description: 'JWT, OAuth.' },
          { id: 'caching-fs', title: 'Caching', description: 'Redis.' },
        ],
      },
      {
        id: 'fullstack-essentials',
        title: 'Full Stack Essential Concepts & Skills',
        description: 'Skills unique to managing both sides of an application.',
        children: [
          { id: 'deployment-fs', title: 'Deployment', description: 'Web Servers (Nginx), Containerization (Docker), CI/CD, Cloud Providers (AWS, GCP, Azure).' },
          { id: 'client-server-comm', title: 'Client-Server Communication', description: 'Fetch API, Axios, WebSockets.' },
          { id: 'security-fs', title: 'Security', description: 'OWASP Top 10, Encryption, Secret Management.' },
          { id: 'testing-fs', title: 'Testing', description: 'Unit, Integration, End-to-End Testing.' },
          { id: 'app-arch-fs', title: 'Application Architecture', description: 'MVC, Microservices (basics), Scalability.' },
          { id: 'monitoring-logging-fs', title: 'Monitoring & Logging', description: 'Logs collection, Performance Metrics.' },
          { id: 'devops-basics-fs', title: 'DevOps Basics', description: 'Initial steps into DevOps principles.' },
        ],
      },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps Roadmap',
    description: 'Automate, optimize, and secure the software development lifecycle.',
    nodes: [
      {
        id: 'os-fundamentals-devops',
        title: 'Operating System Fundamentals',
        description: 'Deep understanding of Linux for server management.',
        children: [
          { id: 'linux-advanced', title: 'Linux (Essential)', description: 'Advanced commands, process management, networking, systemd.' },
          { id: 'kernel-concepts', title: 'OS Kernel Concepts', description: 'Kernel, user space, system calls.' },
        ],
      },
      {
        id: 'networking-devops',
        title: 'Networking Fundamentals',
        description: 'Core concepts of network communication.',
        children: [
          { id: 'tcp-ip', title: 'OSI/TCP-IP Model', description: 'IP, Ports, Firewalls, DNS.' },
          { id: 'load-balancing', title: 'Load Balancing', description: 'L4/L7, Nginx, HAProxy.' },
          { id: 'ssh-advanced', title: 'SSH & VPNs', description: 'Advanced configurations.' },
        ],
      },
      {
        id: 'programming-scripting-devops',
        title: 'Programming & Scripting',
        description: 'Automate tasks and build tools.',
        children: [
          { id: 'python-devops', title: 'Python', description: 'For complex automation.' },
          { id: 'bash-scripting', title: 'Bash Scripting', description: 'For shell scripts.' },
          { id: 'go-devops', title: 'Go (Optional)', description: 'For building DevOps tools.' },
        ],
      },
      {
        id: 'version-control-devops',
        title: 'Version Control (Advanced)',
        description: 'Advanced Git concepts for CI/CD pipelines.',
        resources: [{ name: 'Git branching strategies', url: 'https://www.atlassian.com/git/tutorials/comparing-workflows' }],
      },
      {
        id: 'web-servers-proxies-devops',
        title: 'Web Servers & Proxies',
        description: 'Configure and optimize web servers.',
        children: [
          { id: 'nginx-apache', title: 'Nginx/Apache', description: 'Advanced configuration, SSL/TLS.' },
          { id: 'ssl-tls-certs', title: 'SSL/TLS Certificates', description: 'Let\'s Encrypt.' },
        ],
      },
      {
        id: 'containerization-devops',
        title: 'Containerization',
        description: 'Manage applications with containers.',
        children: [
          { id: 'docker', title: 'Docker', description: 'Dockerfile best practices, Docker Compose.' },
          { id: 'kubernetes', title: 'Kubernetes (Fundamental)', description: 'Pods, Deployments, Services, kubectl, Helm, Ingress.' },
        ],
      },
      {
        id: 'iac-devops',
        title: 'Infrastructure as Code (IaC)',
        description: 'Manage infrastructure declaratively.',
        children: [
          { id: 'terraform', title: 'Terraform', description: 'Multi-Cloud IaC, modules, state.' },
          { id: 'ansible', title: 'Ansible', description: 'Playbooks, roles, inventories.' },
        ],
      },
      {
        id: 'ci-cd-devops',
        title: 'Continuous Integration / Delivery',
        description: 'Automate your software delivery pipeline.',
        children: [
          { id: 'pipeline-design', title: 'CI/CD Pipeline Design', description: 'Robust pipeline creation.' },
          { id: 'ci-cd-tools', title: 'CI/CD Tools', description: 'Jenkins, GitHub Actions, GitLab CI/CD.' },
        ],
      },
      {
        id: 'cloud-providers-devops',
        title: 'Cloud Providers (Deep Dive)',
        description: 'Expertise in at least one major cloud platform.',
        children: [
          { id: 'aws-devops', title: 'AWS (Amazon Web Services)', description: 'EC2, S3, VPC, RDS, IAM, EKS.' },
          { id: 'gcp-devops', title: 'GCP (Google Cloud Platform)', description: 'GCE, GCS, VPC, Cloud SQL, GKE.' },
          { id: 'azure-devops', title: 'Azure', description: 'VMs, Blob Storage, VNet, Azure SQL, AKS.' },
        ],
      },
      {
        id: 'monitoring-logging-observ',
        title: 'Monitoring, Logging & Observability',
        description: 'Gain insights into your systems.',
        children: [
          { id: 'logging', title: 'Logging', description: 'ELK Stack, Splunk.' },
          { id: 'metrics', title: 'Metrics', description: 'Prometheus, Grafana.' },
          { id: 'tracing', title: 'Tracing (Optional)', description: 'OpenTelemetry, Jaeger.' },
        ],
      },
      {
        id: 'devsecops',
        title: 'Security in DevOps (DevSecOps)',
        description: 'Integrate security throughout the DevOps pipeline.',
        children: [
          { id: 'devsecops-principles', title: 'DevSecOps Principles', description: 'Security from the start.' },
          { id: 'vuln-scanning', title: 'Vulnerability Scanning', description: 'SAST, DAST, SCA.' },
          { id: 'secret-management', title: 'Secret Management', description: 'HashiCorp Vault.' },
        ],
      },
    ],
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer Roadmap',
    description: 'Design, build, and deploy intelligent systems powered by AI and Machine Learning.',
    nodes: [
      {
        id: 'math-fundamentals-ai',
        title: 'Math Fundamentals',
        description: 'Core mathematical concepts for AI.',
        children: [
          { id: 'linear-algebra-ai', title: 'Linear Algebra', description: 'Vectors, Matrices, Operations.' },
          { id: 'calculus-ai', title: 'Calculus', description: 'Derivatives, Gradients, Optimization.' },
          { id: 'prob-stats-ai', title: 'Probability & Statistics', description: 'Distributions, Hypothesis Testing, Regression.' },
        ],
      },
      {
        id: 'programming-fundamentals-ai',
        title: 'Programming Fundamentals',
        description: 'Essential programming skills for AI.',
        children: [
          { id: 'python-ai', title: 'Python (Essential)', description: 'Advanced syntax, Data Structures & Algorithms, OOP, NumPy, Pandas, Matplotlib.' },
          { id: 'git-github-ai', title: 'Git & GitHub', description: 'Version Control.' },
        ],
      },
      {
        id: 'ml-fundamentals-ai',
        title: 'Machine Learning Fundamentals',
        description: 'Core concepts of Machine Learning.',
        children: [
          { id: 'ml-types', title: 'ML Types', description: 'Supervised, Unsupervised, Reinforcement.' },
          { id: 'data-preprocessing', title: 'Data Preprocessing', description: 'Cleaning, Handling Nulls, Normalization.' },
          { id: 'feature-eng', title: 'Feature Engineering', description: 'Creation and selection.' },
          { id: 'classic-algorithms', title: 'Classic Algorithms', description: 'Regression, Classification (KNN, SVM, Trees), Clustering (K-Means), Dimensionality Reduction (PCA).' },
          { id: 'model-eval', title: 'Model Evaluation', description: 'Metrics (Accuracy, Precision, Recall, F1), Overfitting/Underfitting.' },
          { id: 'scikit-learn', title: 'ML Frameworks', description: 'Scikit-learn.' },
        ],
      },
      {
        id: 'deep-learning-ai',
        title: 'Deep Learning',
        description: 'Neural networks and their applications.',
        children: [
          { id: 'nn-fundamentals', title: 'Neural Network Fundamentals', description: 'Perceptron, Layers, Activation Functions, Backpropagation.' },
          { id: 'nn-types', title: 'Types of Neural Networks', description: 'CNNs (Vision), RNNs/LSTMs (Sequential), Transformers (LLMs).' },
          { id: 'dl-frameworks', title: 'DL Frameworks', description: 'TensorFlow, Keras, PyTorch.' },
          { id: 'dl-optimization', title: 'Optimization & Regularization', description: 'Adam, SGD, Dropout, Batch Norm.' },
        ],
      },
      {
        id: 'nlp',
        title: 'Natural Language Processing (NLP)',
        description: 'Work with human language data.',
        children: [
          { id: 'nlp-concepts', title: 'NLP Concepts', description: 'Tokenization, Stemming, N-grams.' },
          { id: 'embeddings', title: 'Embeddings', description: 'Word2Vec, GloVe, FastText.' },
          { id: 'language-models', title: 'Language Models', description: 'RNNs/LSTMs for text, Transformers (BERT, GPT).' },
          { id: 'nlp-libraries', title: 'NLP Libraries', description: 'Hugging Face Transformers, NLTK, spaCy.' },
        ],
      },
      {
        id: 'computer-vision',
        title: 'Computer Vision (CV)',
        description: 'Enable computers to "see" and interpret images.',
        children: [
          { id: 'cv-concepts', title: 'CV Concepts', description: 'Image preprocessing, Filters, Edge Detection.' },
          { id: 'object-detection', title: 'Object Detection', description: 'YOLO, SSD.' },
          { id: 'image-segmentation', title: 'Image Segmentation', description: 'U-Net.' },
          { id: 'cv-libraries', title: 'CV Libraries', description: 'OpenCV, PyTorchVision.' },
        ],
      },
      {
        id: 'mlops',
        title: 'MLOps (Machine Learning Operations)',
        description: 'Streamline the ML lifecycle from development to production.',
        children: [
          { id: 'ml-lifecycle', title: 'ML Lifecycle', description: 'Experimentation, Training, Deployment, Monitoring.' },
          { id: 'data-versioning', title: 'Data & Model Versioning', description: 'MLflow, DVC.' },
          { id: 'model-deployment', title: 'Model Deployment', description: 'REST APIs (FastAPI), Docker, Kubernetes, Cloud Platforms (SageMaker).' },
          { id: 'model-monitoring', title: 'Model Monitoring', description: 'Data Drift, Performance.' },
        ],
      },
      {
        id: 'cloud-platforms-ai',
        title: 'Cloud Platforms for AI',
        description: 'Leverage cloud services for AI development.',
        children: [
          { id: 'aws-ai', title: 'AWS AI', description: 'SageMaker, Rekognition.' },
          { id: 'gcp-ai', title: 'Google Cloud AI', description: 'Vertex AI, Cloud AI APIs.' },
          { id: 'azure-ai', title: 'Azure AI', description: 'Azure Machine Learning, Cognitive Services.' },
        ],
      },
      {
        id: 'ethics-governance-ai',
        title: 'Ethics, Governance & Bias in AI',
        description: 'Understand responsible AI development.',
        children: [
          { id: 'fat-principles', title: 'FAT Principles', description: 'Fairness, Accountability, Transparency.' },
          { id: 'bias-mitigation', title: 'Bias Mitigation', description: 'Handling bias in data and models.' },
          { id: 'data-privacy', title: 'Data Privacy & Security', description: 'In AI systems.' },
        ],
      },
    ],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst Roadmap',
    description: 'Collect, clean, analyze, and interpret data to extract insights and support decision-making.',
    nodes: [
      {
        id: 'math-stats-fundamentals-da',
        title: 'Math & Statistics Fundamentals',
        description: 'The quantitative backbone of data analysis.',
        children: [
          { id: 'descriptive-stats', title: 'Descriptive Statistics', description: 'Mean, Median, Mode, Standard Deviation, Variance, Percentiles.' },
          { id: 'inferential-stats', title: 'Inferential Statistics', description: 'Hypothesis Testing (t-tests, ANOVA), Confidence Intervals, Regression.' },
          { id: 'probability-basic', title: 'Basic Probability', description: 'Bayes Theorem.' },
        ],
      },
      {
        id: 'spreadsheet-skills',
        title: 'Spreadsheet Skills',
        description: 'Mastering data manipulation in Excel or Google Sheets.',
        children: [
          { id: 'advanced-formulas', title: 'Advanced Formulas', description: 'VLOOKUP, INDEX/MATCH, SUMIFS, OFFSET.' },
          { id: 'pivot-tables', title: 'Pivot Tables & Charts', description: 'Dynamic data summarization.' },
          { id: 'power-query', title: 'Power Query (Excel)', description: 'Data transformation and loading.' },
        ],
      },
      {
        id: 'databases-sql-da',
        title: 'Databases & SQL',
        description: 'Querying and managing relational data.',
        children: [
          { id: 'db-concepts', title: 'Relational DB Concepts', description: 'Tables, Columns, Relationships, Normalization.' },
          { id: 'sql-advanced', title: 'SQL (Advanced)', description: 'SELECT, JOINs, Aggregation, Subqueries, CTEs, Window Functions.' },
          { id: 'common-dbs', title: 'Common Databases', description: 'PostgreSQL, MySQL, SQL Server.' },
        ],
      },
      {
        id: 'programming-for-data',
        title: 'Programming Language for Data',
        description: 'Automate analysis and handle larger datasets.',
        children: [
          { id: 'python-da', title: 'Python (Primary)', description: 'Syntax, Data Structures, OOP, Pandas (DataFrames), NumPy, Matplotlib/Seaborn (Visualization).' },
          { id: 'r-da', title: 'R (Alternative)', description: 'Dplyr, Tidyr, Ggplot2.' },
        ],
      },
      {
        id: 'data-visualization-da',
        title: 'Data Visualization',
        description: 'Create compelling visual narratives from data.',
        children: [
          { id: 'bi-tools', title: 'BI Tools (Master at least one)', description: 'Tableau, Microsoft Power BI, Looker Studio.' },
          { id: 'design-principles', title: 'Design Principles', description: 'Dashboard design, Storytelling with data.' },
        ],
      },
      {
        id: 'data-cleaning-prep',
        title: 'Data Cleaning & Preprocessing',
        description: 'Transform raw data into usable formats.',
        children: [
          { id: 'missing-duplicates', title: 'Handling Missing & Duplicates', description: 'Identification and treatment.' },
          { id: 'outliers', title: 'Outlier Detection & Treatment', description: 'Managing abnormal data points.' },
          { id: 'data-transf', title: 'Data Transformation', description: 'Normalization, Encoding.' },
        ],
      },
      {
        id: 'data-modeling-basic',
        title: 'Data Modeling (Basic)',
        description: 'Understand basic data structures for analysis.',
        children: [
          { id: 'relational-modeling', title: 'Relational Modeling', description: 'Star/Snowflake Schemas.' },
          { id: 'ml-intro-da', title: 'ML Intro for Analysis (Basic)', description: 'Linear Regression, Clustering.' },
        ],
      },
      {
        id: 'collaboration-deployment-da',
        title: 'Collaboration & Deployment Tools',
        description: 'Share and present your analysis.',
        children: [
          { id: 'git-github-da', title: 'Git & GitHub', description: 'Version control for analysis.' },
          { id: 'notebooks', title: 'Jupyter Notebooks / Colab', description: 'Interactive analysis environments.' },
          { id: 'presentation-tools', title: 'Presentation Tools', description: 'PowerPoint, Google Slides.' },
        ],
      },
      {
        id: 'business-comm-da',
        title: 'Business & Communication',
        description: 'Bridge the gap between data and business decisions.',
        children: [
          { id: 'business-domain', title: 'Business Domain Understanding', description: 'Understanding objectives.' },
          { id: 'communication-skills', title: 'Communication Skills', description: 'Explaining complex findings simply.' },
          { id: 'kpis', title: 'KPIs', description: 'Definition and interpretation.' },
        ],
      },
    ],
  },
  {
    id: 'robotics-intro',
    title: 'Robotics Roadmap (Introduction)',
    description: 'A beginner\'s guide to entering the world of robotics.',
    nodes: [
      {
        id: 'math-physics-robotics',
        title: 'Math & Physics Fundamentals',
        description: 'The foundational science for robotics.',
        children: [
          { id: 'linear-algebra-robotics', title: 'Linear Algebra', description: 'Vectors, Matrices, 3D Transformations.' },
          { id: 'calculus-robotics', title: 'Calculus', description: 'Derivatives, Integrals (basics).' },
          { id: 'physics-robotics', title: 'Physics', description: 'Kinematics, Dynamics, Basic Electricity (Ohm\'s Law).' },
        ],
      },
      {
        id: 'programming-robotics',
        title: 'Programming Fundamentals',
        description: 'Languages for robot control and prototyping.',
        children: [
          { id: 'python-robotics', title: 'Python', description: 'For prototyping and high-level control (NumPy, SciPy).' },
          { id: 'cpp-robotics', title: 'C++', description: 'For low-level and real-time control (pointers, memory management, classes).' },
        ],
      },
      {
        id: 'basic-electronics-robotics',
        title: 'Basic Electronics',
        description: 'Understanding the hardware components of robots.',
        children: [
          { id: 'components', title: 'Components', description: 'Resistors, Capacitors, Diodes, Transistors.' },
          { id: 'circuit-concepts', title: 'Circuit Concepts', description: 'Series, Parallel, Voltage Dividers.' },
          { id: 'tools-electronics', title: 'Tools', description: 'Breadboard, Multimeter, Soldering Iron.' },
        ],
      },
      {
        id: 'microcontrollers-robotics',
        title: 'Microcontrollers & Embedded Systems',
        description: 'The brains of small robots.',
        children: [
          { id: 'arduino', title: 'Arduino (Beginner-Friendly)', description: 'Digital/Analog I/O, PWM, Serial Communication, Interrupts.' },
          { id: 'raspberry-pi', title: 'Raspberry Pi', description: 'OS installation, SSH, GPIO, Linux basics.' },
        ],
      },
      {
        id: 'actuators-sensors',
        title: 'Actuators & Sensors',
        description: 'How robots move and perceive their environment.',
        children: [
          { id: 'actuators', title: 'Actuators', description: 'DC Motors, Servomotors, Stepper Motors, Relays.' },
          { id: 'sensors', title: 'Sensors', description: 'Distance (Ultrasonic, IR), Light (LDR), Motion (IMU), Line Sensors.' },
        ],
      },
      {
        id: 'robot-kinematics',
        title: 'Robot Kinematics (Introduction)',
        description: 'Understanding robot movement without considering forces.',
        children: [
          { id: 'forward-kinematics', title: 'Forward Kinematics', description: 'Position from joint angles.' },
          { id: 'inverse-kinematics', title: 'Inverse Kinematics (Basic)', description: 'Joint angles for desired position.' },
        ],
      },
      {
        id: 'ros-intro',
        title: 'Robot Operating System (ROS - Introduction)',
        description: 'A flexible framework for writing robot software.',
        children: [
          { id: 'ros-concepts', title: 'ROS Basic Concepts', description: 'Nodes, Topics, Messages, Services, Actions.' },
          { id: 'ros-cli-tools', title: 'ROS CLI Tools', description: 'roscore, rostopic, rosnode.' },
          { id: 'ros-packages', title: 'Simple ROS Packages', description: 'Creating packages in Python/C++.' },
        ],
      },
      {
        id: 'robot-control-basic',
        title: 'Robot Control (Basic)',
        description: 'Making robots follow commands.',
        children: [
          { id: 'open-closed-loop', title: 'Open vs. Closed-Loop Control', description: 'Feedback mechanisms.' },
          { id: 'pid-control', title: 'PID Control', description: 'Proportional-Integral-Derivative control concepts.' },
        ],
      },
      {
        id: 'perception-basic',
        title: 'Perception (Basic)',
        description: 'How robots interpret sensory data.',
        children: [
          { id: 'computer-vision-basic', title: 'Computer Vision (Basic)', description: 'OpenCV with Python, Image Capture, Edge Detection.' },
          { id: 'range-sensors', title: 'Range Sensors', description: 'LiDAR, Depth Cameras (concepts).' },
        ],
      },
      {
        id: 'practical-projects',
        title: 'Practical Projects',
        description: 'Hands-on experience to solidify understanding.',
        children: [
          { id: 'led-button-control', title: 'LED & Button Control', description: 'Arduino basics.' },
          { id: 'line-follower', title: 'Line Follower Robot', description: 'Build a simple line follower.' },
          { id: 'obstacle-avoider', title: 'Obstacle Avoiding Robot', description: 'Program a mobile robot.' },
          { id: 'robot-arm', title: 'Simple Robotic Arm', description: 'Control with servos.' },
        ],
      },
    ],
  },
  {
    id: 'ai-simple-intro',
    title: 'Artificial Intelligence (Simple/Introductory) Roadmap',
    description: 'A gentle introduction to basic AI and Machine Learning concepts and practices.',
    nodes: [
      {
        id: 'programming-fundamentals-ai-simple',
        title: 'Programming Fundamentals',
        description: 'Essential Python skills for AI.',
        children: [
          { id: 'python-basics-ai-simple', title: 'Python (Essential)', description: 'Syntax, Data Structures, Functions, OOP basics.' },
          { id: 'ds-algo-basic', title: 'Data Structures & Algorithms (Basic)', description: 'Big O notation, simple search/sort.' },
        ],
      },
      {
        id: 'math-fundamentals-ai-simple',
        title: 'Math Fundamentals (Applied to AI)',
        description: 'The mathematical basis for AI algorithms.',
        children: [
          { id: 'linear-algebra-basic', title: 'Basic Linear Algebra', description: 'Vectors, Matrices, simple operations.' },
          { id: 'probability-basic-ai-simple', title: 'Basic Probability', description: 'Random variables, simple distributions.' },
          { id: 'stats-basic-ai-simple', title: 'Basic Statistics', description: 'Mean, Median, Mode, Variance, Correlation.' },
        ],
      },
      {
        id: 'data-science-python-intro',
        title: 'Introduction to Data Science with Python',
        description: 'Tools for data manipulation and visualization.',
        children: [
          { id: 'numpy', title: 'NumPy', description: 'N-dimensional arrays.' },
          { id: 'pandas', title: 'Pandas', description: 'DataFrames for cleaning and manipulation.' },
          { id: 'matplotlib-seaborn', title: 'Matplotlib / Seaborn', description: 'Basic data visualization.' },
        ],
      },
      {
        id: 'ai-key-concepts',
        title: 'Key AI Concepts',
        description: 'Understanding what AI and ML are.',
        children: [
          { id: 'what-is-ai', title: 'What is AI?', description: 'Definition, History, Types (Weak/Strong AI).' },
          { id: 'ai-ml-dl-diff', title: 'AI, ML, DL Difference', description: 'Distinguishing the terms.' },
          { id: 'ml-overview', title: 'Machine Learning Overview', description: 'Learning from data.' },
          { id: 'ml-types-simple', title: 'Types of ML (Simple)', description: 'Supervised, Unsupervised, Reinforcement (concept).' },
        ],
      },
      {
        id: 'classic-ml-practical',
        title: 'Classic Machine Learning (Practical)',
        description: 'Hands-on implementation of basic ML models.',
        children: [
          { id: 'scikit-learn-intro', title: 'Scikit-learn', description: 'Using the library for ML.' },
          { id: 'simple-regression', title: 'Simple Regression', description: 'Linear Regression.' },
          { id: 'simple-classification', title: 'Simple Classification', description: 'KNN, Decision Trees.' },
          { id: 'simple-clustering', title: 'Simple Clustering', description: 'K-Means.' },
          { id: 'basic-preprocessing', title: 'Basic Data Preprocessing', description: 'Scaling, handling nulls.' },
          { id: 'model-eval-basic', title: 'Basic Model Evaluation', description: 'Accuracy, R-squared.' },
          { id: 'overfitting-underfitting', title: 'Overfitting & Underfitting', description: 'Simple explanation.' },
        ],
      },
      {
        id: 'neural-networks-intro',
        title: 'Introduction to Neural Networks (Very Basic)',
        description: 'Understanding the basic building blocks of deep learning.',
        children: [
          { id: 'artificial-neuron', title: 'Artificial Neuron (Perceptron)', description: 'How it simulates a biological neuron.' },
          { id: 'simple-nns', title: 'Simple Neural Networks', description: 'Input, Hidden, Output Layers.' },
          { id: 'keras-tensorflow-glance', title: 'Frameworks (A Glance)', description: 'Brief look at Keras or TensorFlow.' },
        ],
      },
      {
        id: 'simple-practical-projects',
        title: 'Simple Practical Projects',
        description: 'Apply learned concepts to small projects.',
        children: [
          { id: 'titanic-prediction', title: 'Titanic Survival Prediction', description: 'Classification project.' },
          { id: 'diamond-price-prediction', title: 'Diamond Price Prediction', description: 'Regression project.' },
          { id: 'data-clustering', title: 'Data Clustering', description: 'Unsupervised learning.' },
          { id: 'rule-based-chatbot', title: 'Rule-Based Chatbot', description: 'Very simple example.' },
        ],
      },
    ],
  },
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals Roadmap',
    description: 'An introduction to essential cybersecurity concepts and practices.',
    nodes: [
      {
        id: 'it-fundamentals-cs',
        title: 'IT Fundamentals',
        description: 'Core knowledge of computing systems and networks.',
        children: [
          { id: 'os-basics-cs', title: 'Operating Systems', description: 'Linux (basic commands, users, permissions), Windows (security concepts).' },
          { id: 'networking-basics-cs', title: 'Networking', description: 'OSI/TCP-IP Model, DNS, IP, Ports, Firewalls, VPNs.' },
          { id: 'hardware-basics-cs', title: 'Hardware', description: 'Computer components.' },
          { id: 'programming-scripting-cs', title: 'Programming/Scripting (Basic)', description: 'Python or Bash for automation.' },
        ],
      },
      {
        id: 'cybersecurity-key-concepts',
        title: 'Key Cybersecurity Concepts',
        description: 'Understanding the foundational principles of security.',
        children: [
          { id: 'cia-triad', title: 'C.I.A. Triad', description: 'Confidentiality, Integrity, Availability.' },
          { id: 'threats-vulnerabilities', title: 'Threats & Vulnerabilities', description: 'Malware, Phishing, DDoS, Social Engineering.' },
          { id: 'risk-management', title: 'Risk Management', description: 'Identification, Assessment, Mitigation.' },
          { id: 'security-principles', title: 'Security Principles', description: 'Least Privilege, Defense in Depth.' },
        ],
      },
      {
        id: 'network-security',
        title: 'Network Security',
        description: 'Protecting network infrastructure and data in transit.',
        children: [
          { id: 'firewalls', title: 'Firewalls', description: 'Types, Basic Rule Configuration.' },
          { id: 'ids-ips', title: 'IDS/IPS', description: 'Intrusion Detection/Prevention Systems.' },
          { id: 'wlan-security', title: 'WLAN Security', description: 'WEP, WPA, WPA2, WPA3.' },
          { id: 'port-scanners', title: 'Port Scanners', description: 'Nmap (basic use).' },
        ],
      },
      {
        id: 'os-security',
        title: 'Operating System Security',
        description: 'Securing individual systems.',
        children: [
          { id: 'hardening', title: 'Hardening', description: 'System hardening techniques.' },
          { id: 'patch-management', title: 'Patch Management', description: 'Importance of updates.' },
          { id: 'antivirus-edr', title: 'Antivirus/EDR', description: 'Endpoint protection.' },
          { id: 'user-permissions', title: 'User & Permissions Management', description: 'Linux chmod, chown.' },
        ],
      },
      {
        id: 'web-security-basics',
        title: 'Web Security (Basic Concepts)',
        description: 'Common web vulnerabilities and protection.',
        children: [
          { id: 'owasp-top10-web', title: 'OWASP Top 10', description: 'SQL Injection, XSS, CSRF, Broken Auth.' },
          { id: 'ssl-tls', title: 'SSL/TLS', description: 'HTTPS, Certificates.' },
        ],
      },
      {
        id: 'data-security-cs',
        title: 'Data Security',
        description: 'Protecting data at rest and in transit.',
        children: [
          { id: 'backup-recovery', title: 'Backup & Disaster Recovery', description: '3-2-1 rule.' },
          { id: 'password-management', title: 'Secure Password Handling', description: 'Complexity, Rotation, Managers.' },
          { id: 'encryption-hashing', title: 'Encryption & Hashing', description: 'Symmetric (AES), Asymmetric (RSA), Hashing (SHA-256).' },
        ],
      },
      {
        id: 'iam-cs',
        title: 'Identity & Access Management (IAM)',
        description: 'Controlling who can do what.',
        children: [
          { id: 'authentication', title: 'Authentication', description: 'Passwords, MFA.' },
          { id: 'authorization', title: 'Authorization', description: 'Roles and Permissions.' },
        ],
      },
      {
        id: 'monitoring-logging-cs',
        title: 'Monitoring & Logging',
        description: 'Detecting and analyzing security events.',
        children: [
          { id: 'security-logs', title: 'Security Logs', description: 'System, network, application events.' },
          { id: 'siem-intro', title: 'SIEM (Optional)', description: 'Security Information and Event Management.' },
        ],
      },
      {
        id: 'incident-response-basic',
        title: 'Incident Response (Basic)',
        description: 'Handling security breaches.',
        children: [
          { id: 'incident-phases', title: 'Phases of Response', description: 'Identification, Containment, Eradication.' },
          { id: 'response-plan', title: 'Response Plan (Intro)', description: 'Creating a basic plan.' },
        ],
      },
      {
        id: 'ethics-legal-cs',
        title: 'Ethics & Legal Aspects',
        description: 'Navigating the legal and ethical landscape of cybersecurity.',
        children: [
          { id: 'ethical-hacking', title: 'Ethical Hacking', description: 'Distinction from malicious hacking.' },
          { id: 'cyber-laws', title: 'Cybersecurity Laws', description: 'Basic privacy laws (GDPR, CCPA - if applicable).' },
        ],
      },
    ],
  },
  {
    id: 'mobile-dev-basics',
    title: 'Mobile Development (iOS/Android Basics) Roadmap',
    description: 'An introduction to building native mobile applications.',
    nodes: [
      {
        id: 'programming-fundamentals-mobile',
        title: 'Programming Fundamentals',
        description: 'Core programming concepts for mobile development.',
        children: [
          { id: 'oop-mobile', title: 'Object-Oriented Programming (OOP)', description: 'Classes, Objects, Inheritance, Polymorphism.' },
          { id: 'data-structures-mobile', title: 'Data Structures & Algorithms (Basic)', description: 'Lists, Arrays, Dictionaries, Basic Sorting.' },
        ],
      },
      {
        id: 'platform-language-choice',
        title: 'Choose Platform & Language (Start with one)',
        description: 'Decide between Android and iOS development and their respective languages.',
        children: [
          {
            id: 'android-dev',
            title: 'For Android',
            description: 'Develop apps for Android devices.',
            children: [
              { id: 'kotlin-java-android', title: 'Language: Kotlin (Preferred) / Java', description: 'Programming languages for Android.' },
              { id: 'android-studio', title: 'IDE: Android Studio', description: 'Installation and basic usage.' },
              { id: 'android-fundamentals', title: 'Android Fundamentals', description: 'Activities lifecycle, Views & Layouts, Intents.' },
            ],
          },
          {
            id: 'ios-dev',
            title: 'For iOS',
            description: 'Develop apps for Apple devices.',
            children: [
              { id: 'swift-obj-c-ios', title: 'Language: Swift (Preferred) / Objective-C', description: 'Programming languages for iOS.' },
              { id: 'xcode', title: 'IDE: Xcode (macOS only)', description: 'Installation and basic usage.' },
              { id: 'ios-fundamentals', title: 'iOS Fundamentals', description: 'Views & View Controllers lifecycle, Storyboard/SwiftUI, Navigation.' },
            ],
          },
        ],
      },
      {
        id: 'mobile-ui-ux',
        title: 'Mobile UI/UX Fundamentals',
        description: 'Design user-friendly and responsive mobile interfaces.',
        children: [
          { id: 'responsive-design-mobile', title: 'Adaptive & Responsive Design', description: 'For different screen sizes.' },
          { id: 'design-guidelines', title: 'Platform Design Guidelines', description: 'Material Design (Android), Human Interface Guidelines (iOS).' },
          { id: 'common-ui-components', title: 'Common UI Components', description: 'Buttons, Text Fields, Lists (RecyclerView/TableView).' },
        ],
      },
      {
        id: 'data-persistence-mobile',
        title: 'Data Persistence (Local)',
        description: 'Store data on the device.',
        children: [
          { id: 'shared-prefs-userdefaults', title: 'Simple Data Storage', description: 'Shared Preferences (Android) / UserDefaults (iOS).' },
          { id: 'local-dbs', title: 'Local Databases (Basic)', description: 'SQLite with Room (Android) / Core Data or Realm (iOS).' },
        ],
      },
      {
        id: 'api-consumption-mobile',
        title: 'API Consumption (Networking)',
        description: 'Connect your app to backend services.',
        children: [
          { id: 'http-requests', title: 'HTTP Requests', description: 'RESTful API calls.' },
          { id: 'json-handling', title: 'JSON Handling', description: 'Parsing and Serialization.' },
          { id: 'networking-libs', title: 'Networking Libraries', description: 'Retrofit (Android) / Alamofire (iOS).' },
          { id: 'async-mobile', title: 'Asynchrony in Mobile', description: 'Coroutines/RxJava (Android), GCD/Combine (iOS).' },
        ],
      },
      {
        id: 'state-management-mobile',
        title: 'State Management (Basic)',
        description: 'Manage data flow and application state.',
      },
      {
        id: 'platform-specific-concepts',
        title: 'Platform-Specific Concepts (Deepen)',
        description: 'Advanced topics for your chosen platform.',
        children: [
          { id: 'android-lifecycle', title: 'Android Lifecycle', description: 'Activities & Fragments lifecycle.' },
          { id: 'recyclerview-android', title: 'RecyclerView (Android)', description: 'Efficient list handling.' },
          { id: 'permissions-android', title: 'Runtime Permissions (Android)', description: 'Handling user permissions.' },
          { id: 'ios-viewcontroller', title: 'iOS ViewController Lifecycle', description: 'View controller management.' },
          { id: 'tableview-ios', title: 'TableView/CollectionView (iOS)', description: 'Displaying lists and grids.' },
          { id: 'delegates-protocols-ios', title: 'Delegates & Protocols (iOS)', description: 'Communication patterns.' },
          { id: 'auto-layout-ios', title: 'Auto Layout/SwiftUI (iOS)', description: 'Adaptive UI.' },
        ],
      },
      {
        id: 'version-control-mobile',
        title: 'Version Control',
        description: 'Git and GitHub/GitLab/Bitbucket for mobile projects.',
      },
      {
        id: 'deployment-mobile',
        title: 'Deployment (Basic)',
        description: 'Prepare and publish your mobile app.',
        children: [
          { id: 'generate-builds', title: 'Generate Builds', description: 'APK/AAB (Android), IPA (iOS).' },
          { id: 'app-store-concepts', title: 'App Store Concepts', description: 'Google Play Console, Apple App Store Connect.' },
        ],
      },
      {
        id: 'dev-tools-mobile',
        title: 'Development Tools',
        description: 'Tools for debugging and optimizing mobile apps.',
        children: [
          { id: 'debuggers-profilers', title: 'Debuggers & Profilers', description: 'Android Studio/Xcode tools.' },
          { id: 'emulators-simulators', title: 'Emulators/Simulators', description: 'Testing on virtual devices.' },
        ],
      },
    ],
  },
  {
    id: 'cloud-computing-fundamentals',
    title: 'Cloud Computing Fundamentals Roadmap (Cloud Provider Agnostic)',
    description: 'An introduction to the core concepts and services of cloud computing, applicable across major providers.',
    nodes: [
      {
        id: 'it-fundamentals-cloud',
        title: 'IT Fundamentals',
        description: 'Basic knowledge of IT infrastructure.',
        children: [
          { id: 'networking-basics-cloud', title: 'Networking Concepts', description: 'TCP/IP, DNS, IP Addressing, Firewalls.' },
          { id: 'os-hardware-cloud', title: 'OS & Hardware', description: 'Linux basics, Virtualization (VMs), Servers, Storage.' },
          { id: 'security-basics-cloud', title: 'Security Basics', description: 'Authentication, Authorization, Encryption.' },
        ],
      },
      {
        id: 'intro-cloud-computing',
        title: 'Introduction to Cloud Computing',
        description: 'Understanding the paradigm shift to cloud.',
        children: [
          { id: 'what-is-cloud', title: 'What is Cloud Computing?', description: 'Definition, Benefits (Agility, Scalability, Cost).' },
          { id: 'service-models', title: 'Service Models', description: 'IaaS, PaaS, SaaS (Shared Responsibility).' },
          { id: 'deployment-models', title: 'Deployment Models', description: 'Public, Private, Hybrid Cloud.' },
          { id: 'key-concepts-cloud', title: 'Key Concepts', description: 'Elasticity, Scalability, High Availability, Resilience.' },
        ],
      },
      {
        id: 'key-cloud-components',
        title: 'Key Cloud Components (Service Types)',
        description: 'Core cloud services across providers.',
        children: [
          { id: 'compute-cloud', title: 'Compute', description: 'Virtual Machines (VMs), Containers (Docker), Serverless Functions (FaaS).' },
          { id: 'storage-cloud', title: 'Storage', description: 'Block Storage, Object Storage, File Storage, Archiving.' },
          { id: 'networking-cloud', title: 'Networking', description: 'Virtual Networks (VPC/VNet), Subnets, Gateways, Route Tables, Security Groups, Load Balancers.' },
          { id: 'databases-cloud', title: 'Databases', description: 'Managed Relational (RDS), NoSQL (DynamoDB).' },
          { id: 'iam-cloud', title: 'Identity & Access Management (IAM)', description: 'Users, Groups, Roles, Policies, MFA.' },
        ],
      },
      {
        id: 'cloud-operations',
        title: 'Cloud Operations Concepts',
        description: 'Managing cloud resources effectively.',
        children: [
          { id: 'monitoring-logging-cloud', title: 'Monitoring & Logging', description: 'Metrics, Logs, Alerts.' },
          { id: 'cost-management', title: 'Cost Management', description: 'Pricing Models, Optimization.' },
          { id: 'iac-intro', title: 'Infrastructure as Code (IaC - Intro)', description: 'Terraform, CloudFormation.' },
          { id: 'ci-cd-intro', title: 'CI/CD (Intro)', description: 'Facilitating continuous delivery.' },
        ],
      },
      {
        id: 'cloud-security',
        title: 'Security in the Cloud',
        description: 'Protecting your cloud environment.',
        children: [
          { id: 'shared-responsibility', title: 'Shared Responsibility Model', description: 'Understanding security roles.' },
          { id: 'data-security-cloud', title: 'Data Security', description: 'In transit and at rest.' },
          { id: 'cloud-security-principles', title: 'Cloud Security Principles', description: 'Best practices.' },
        ],
      },
      {
        id: 'practical-cloud-intro',
        title: 'Practical Introduction to a Cloud Provider (Highly Recommended)',
        description: 'Hands-on experience with a major cloud platform.',
        children: [
          { id: 'free-tier', title: 'Create Free Tier Account', description: 'AWS, GCP, or Azure.' },
          { id: 'deploy-vm', title: 'Deploy a Simple VM', description: 'Launch a virtual machine.' },
          { id: 'object-storage-bucket', title: 'Configure Object Storage Bucket', description: 'Store data.' },
          { id: 'console-explore', title: 'Explore Management Console', description: 'Familiarize with the UI.' },
        ],
      },
    ],
  },
];

const RoadmapNodeComponent: React.FC<{ node: RoadmapNode }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-l-2 border-vibrant-teal pl-4 ml-4 my-2 relative">
      <div
        className="cursor-pointer bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-white">{node.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{node.description}</p>
        {node.children && node.children.length > 0 && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-vibrant-teal text-2xl">
            {isOpen ? '−' : '+'}
          </span>
        )}
      </div>

      {isOpen && node.resources && node.resources.length > 0 && (
        <div className="mt-2 ml-4">
          <h4 className="text-md font-semibold text-vibrant-teal mb-1">Resources:</h4>
          <ul className="list-disc list-inside text-gray-400">
            {node.resources.map((res, idx) => (
              <li key={idx}>
                <Link href={res.url} target="_blank" rel="noopener noreferrer" className="hover:text-[#00FFC6] transition-colors duration-200">
                  {res.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && node.children && (
        <div className="ml-4 mt-2 border-l border-gray-700">
          {node.children.map(childNode => (
            <RoadmapNodeComponent key={childNode.id} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};

const RoadmapsPage: React.FC = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);

  return (
    <div className="flex flex-col items-center p-8 min-h-[calc(100vh-64px)] text-white">
      <h1 className="text-5xl font-extrabold mb-4 text-vibrant-teal text-center drop-shadow-md">
        Developer Roadmaps
      </h1>
      <p className="text-gray-200 mb-8 text-center text-lg max-w-3xl mx-auto">
        Navigate your learning path with our curated developer roadmaps.
      </p>

      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-7xl">
        {!selectedRoadmap ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapsData.map(roadmap => (
              <div
                key={roadmap.id}
                onClick={() => setSelectedRoadmap(roadmap)}
                className="bg-transparent backdrop-blur-sm p-6 rounded-lg shadow-md cursor-pointer hover:scale-[1.02] transition-transform duration-200 border border-gray-700 hover:border-vibrant-teal text-white"
              >
                <h2 className="text-2xl font-semibold mb-2 text-white">{roadmap.title}</h2>
                <p className="text-gray-400 text-sm line-clamp-3">{roadmap.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedRoadmap(null)}
              className="mb-6 text-vibrant-teal hover:text-[#00FFC6]/80 transition-colors duration-200 flex items-center text-lg font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                <path d="M165.66,200.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
              <span className="ml-2">Back to Roadmaps</span>
            </button>
            <h2 className="text-4xl font-bold mb-4 text-white">{selectedRoadmap.title}</h2>
            <p className="text-gray-400 text-lg mb-6">{selectedRoadmap.description}</p>

            <div className="roadmap-flow">
              {selectedRoadmap.nodes.map(node => (
                <RoadmapNodeComponent key={node.id} node={node} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoadmapsPage;