export const profile = {
  name: 'Pablo Amion',
  email: 'pamionj@gmail.com',
  github: 'https://github.com/pamionj',
  linkedin: 'https://www.linkedin.com/in/pamionj',
  location: 'Santiago, Chile',
};

export const navigation = [
  { id: 'inicio', label: 'Inicio / Sobre mí', icon: 'home' },
  { id: 'proyectos', label: 'Proyectos', icon: 'grid' },
  { id: 'servicios', label: 'Servicios / Capacidades', icon: 'code' },
  { id: 'stack', label: 'Stack técnico', icon: 'layers' },
  { id: 'impacto', label: 'Impacto', icon: 'chart' },
  { id: 'contacto', label: 'Contacto', icon: 'mail' },
];

export interface Project {
  id: string;
  title: string;
  category: 'Datos & IA' | 'Desarrollo web' | 'Backend' | 'QA';
  label: string;
  summary: string;
  tags: string[];
  repo: string;
  demo?: string;
  visual: string;
  context: string;
  challenge: string;
  solution: string;
  outcome: string;
}

export const projects: Project[] = [
  {
    id: 'unified-data', title: 'Unified Data Insights Platform', category: 'Datos & IA',
    label: 'CASO DESTACADO · DATA ENGINEERING',
    summary: 'De fuentes dispersas a decisiones informadas. Un pipeline ETL con calidad, trazabilidad y analítica en un solo lugar.',
    tags: ['Python', 'Pandas', 'SQLite', 'Streamlit', 'Plotly'],
    repo: 'https://github.com/pamionj/unified-data-insights-platform',
    demo: 'https://unified-data-insights-platform.streamlit.app/', visual: 'data',
    context: 'Implementación real en Déficit Cero · Cámara Chilena de la Construcción. El repositorio y la demo públicos utilizan datos sintéticos.',
    challenge: 'Integrar fuentes con formatos inconsistentes, duplicados e identidades fragmentadas, conservando el origen de cada registro.',
    solution: 'Pipeline modular de cinco fases, conciliación de identidades en dos pasadas, carga idempotente, auditoría de ejecuciones y dashboard interactivo.',
    outcome: 'Más de 48.000 registros consolidados en la implementación descrita en mi CV. La demo pública reproduce el problema con datos sintéticos; no expone datos institucionales.',
  },
  {
    id: 'ai-agent', title: 'AI Commercial Agent', category: 'Datos & IA',
    label: 'INTELIGENCIA ARTIFICIAL · BACKEND',
    summary: 'IA conectada a lógica de negocio: orquestación de modelos, recuperación de contexto y ejecución de herramientas.',
    tags: ['Python', 'FastAPI', 'LLMs', 'RAG'],
    repo: 'https://github.com/pamionj/ai-commercial-agent', visual: 'agent',
    context: 'Proyecto de arquitectura backend de IA. Código y configuración reproducible disponibles en GitHub.',
    challenge: 'Ir más allá de un chatbot: separar la generación de lenguaje de las operaciones y los datos de cada organización.',
    solution: 'Clasificación de intención, router de proveedores con reintentos y fallback, memoria conversacional y pipeline RAG multi-tenant.',
    outcome: 'Una base extensible para integrar IA con procesos comerciales, con contratos de respuesta y ejecución determinística de herramientas.',
  },
  {
    id: 'biomagnetismo', title: 'Biomagnetismo & Terapias', category: 'Desarrollo web',
    label: 'SITIO EN PRODUCCIÓN',
    summary: 'Una presencia digital real: sitio responsive, SEO técnico y despliegue con dominio propio y CDN.',
    tags: ['JavaScript', 'Bootstrap', 'SEO', 'Cloudflare'],
    repo: 'https://github.com/pamionj/biomagnetismoyterapiasalternativas',
    demo: 'https://biomagnetismoyterapiasalternativas.cl/', visual: 'web',
    context: 'Sitio público para un negocio real. Caso de desarrollo web e infraestructura.',
    challenge: 'Crear una presencia profesional, accesible desde móviles y visible para buscadores, con costos de infraestructura acotados.',
    solution: 'Diseño adaptable con Bootstrap, metadatos, sitemap, robots.txt, Google Search Console y hosting estático con Cloudflare y dominio .cl.',
    outcome: 'Sitio publicado con HTTPS y dominio propio. Un proyecto que conecta desarrollo, despliegue y necesidades de usuarios finales.',
  },
  {
    id: 'java-api', title: 'User Management API', category: 'Backend',
    label: 'JAVA · API REST',
    summary: 'Gestión de usuarios con una arquitectura en capas, validación de entrada y persistencia relacional.',
    tags: ['Java 17', 'Spring Boot', 'PostgreSQL', 'JPA'],
    repo: 'https://github.com/pamionj/user-management-api', visual: 'api',
    context: 'Proyecto de backend con CRUD completo y documentación de endpoints.',
    challenge: 'Organizar las operaciones de usuarios con validación consistente y responsabilidades bien separadas.',
    solution: 'Capas Controller, Service y Repository, DTOs, Bean Validation, manejo global de errores y persistencia con Spring Data JPA.',
    outcome: 'API REST con operaciones de creación, consulta, actualización y eliminación, respaldadas por PostgreSQL.',
  },
  {
    id: 'machine-learning', title: 'Neural Network Classifier', category: 'Datos & IA',
    label: 'MACHINE LEARNING · LABORATORIO',
    summary: 'Un pipeline de aprendizaje supervisado: desde imágenes sintéticas hasta evaluación reproducible de una red neuronal.',
    tags: ['Python', 'PyTorch', 'scikit-learn', 'NumPy'],
    repo: 'https://github.com/pamionj/neural-network-classifier', visual: 'neural',
    context: 'Laboratorio de clasificación binaria de círculos y cuadrados en imágenes sintéticas de 28 × 28 píxeles.',
    challenge: 'Entrenar y evaluar una red neuronal sin confundir resultados de laboratorio con rendimiento en imágenes del mundo real.',
    solution: 'MLP, separación estratificada de entrenamiento/validación/test, control de semillas, regularización y seguimiento de métricas.',
    outcome: 'El README reporta 100% de accuracy en 60 imágenes sintéticas de test. Es un resultado limitado a ese conjunto, no una garantía de generalización.',
  },
  {
    id: 'qa-automation', title: 'QA Automation Lab', category: 'QA',
    label: 'CALIDAD · AUTOMATIZACIÓN',
    summary: 'Validación de flujos críticos con pruebas end-to-end, Page Object Model e integración continua.',
    tags: ['Java', 'Selenium', 'TestNG', 'GitHub Actions'],
    repo: 'https://github.com/pamionj/qa-automation-lab', visual: 'qa',
    context: 'Laboratorio de pruebas funcionales UI sobre SauceDemo, preparado para ejecución local y CI.',
    challenge: 'Convertir verificaciones manuales repetitivas en pruebas mantenibles y ejecutables en cada cambio.',
    solution: 'Page Object Model, esperas explícitas, pruebas positivas y negativas y ejecución de Chrome headless mediante GitHub Actions.',
    outcome: 'Tres escenarios documentados: acceso exitoso, credenciales inválidas y usuario bloqueado. Evidencia de un flujo QA reproducible.',
  },
  {
    id: 'ecommerce', title: 'La Tienda del Ganso', category: 'Desarrollo web',
    label: 'FULLSTACK · DEMO E-COMMERCE',
    summary: 'Catálogo conectado a PostgreSQL, carrito global y validación del checkout en el servidor.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Neon'],
    repo: 'https://github.com/pamionj/tienda-del-ganso-fullstack',
    demo: 'https://tienda-del-ganso-fullstack.vercel.app/', visual: 'store',
    context: 'Proyecto de portafolio fullstack con base de datos en la nube. No se presenta como una tienda comercial operativa.',
    challenge: 'Conectar una experiencia de compra responsive con datos persistentes y validaciones que no dependan del navegador.',
    solution: 'Next.js, Prisma y Neon PostgreSQL; estado global con Zustand; formularios con React Hook Form y Zod; cálculo del checkout en backend.',
    outcome: 'Demo navegable de catálogo, filtros y carrito. El checkout demuestra validación de datos; no se afirma una integración de pagos real.',
  },
];

export const capabilities = [
  { icon: 'code', number: '01', title: 'Desarrollo web & fullstack', text: 'Interfaces que se entienden. Sistemas que se sostienen.', items: ['Sitios responsive y SEO técnico', 'Aplicaciones con React y Next.js', 'APIs REST y bases de datos'] },
  { icon: 'spark', number: '02', title: 'Datos, automatización & IA', text: 'Menos tareas repetitivas. Más información útil.', items: ['Pipelines ETL y calidad de datos', 'Dashboards y reportes automatizados', 'Integración de LLMs y flujos RAG'] },
  { icon: 'shield', number: '03', title: 'Soporte TI & calidad', text: 'La operación también es parte de la ingeniería.', items: ['Diagnóstico y soporte remoto', 'Configuración y despliegue de equipos', 'Pruebas automatizadas y documentación'] },
];

export const stack = [
  { title: 'Backend & datos', icon: 'database', text: 'El núcleo de mi trabajo.', skills: ['Python', 'FastAPI', 'Java', 'Spring Boot', 'SQL', 'PostgreSQL', 'SQLite', 'Pandas'] },
  { title: 'Frontend & experiencia', icon: 'code', text: 'De la lógica a la interfaz.', skills: ['TypeScript', 'React', 'Next.js', 'HTML / CSS', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'IA & automatización', icon: 'spark', text: 'Tecnología aplicada a problemas reales.', skills: ['LLMs', 'RAG', 'PyTorch', 'Selenium', 'Streamlit', 'Plotly'] },
  { title: 'Herramientas & entrega', icon: 'terminal', text: 'Construir, probar y mantener.', skills: ['Git / GitHub', 'Docker', 'Linux', 'Postman', 'TestNG', 'GitHub Actions'] },
];
