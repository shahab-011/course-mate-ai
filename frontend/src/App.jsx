import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Send,
  Upload,
  FileText,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Trash2,
  Cpu,
  Layers,
  Zap,
  Loader2,
  FileUp,
  Scissors,
  Boxes,
  Search,
  Database,
  MessageSquare,
  Brain,
  ArrowRight,
  Target,
  Users,
  GraduationCap,
  Rocket,
  Lightbulb,
} from 'lucide-react';
import './App.css';

const getApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return 'http://127.0.0.1:8765/api';
  const cleanUrl = envUrl.trim().replace(/\/+$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
};
const API_BASE = getApiBase();

/* ============================================================
   ANIMATED BACKGROUND — grid + floating orbs
============================================================ */
function AnimatedBackground() {
  return (
    <>
      <div className="bg-grid-fine" />
      <div className="bg-grid" />
      <div className="bg-orbs">
        <motion.div
          className="orb orb-1"
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="orb orb-2"
          animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="orb orb-3"
          animate={{ x: [0, 50, 0], y: [0, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </>
  );
}

/* ============================================================
   ANIMATED RAG FLOW DIAGRAM
============================================================ */
const INGEST_STEPS = [
  { icon: FileUp, title: 'Document Upload', desc: 'User uploads PDFs, notes & textbooks.' },
  { icon: FileText, title: 'Document Loading', desc: 'Loaders parse raw files into text objects.' },
  { icon: Scissors, title: 'Text Splitting', desc: 'Documents chunked for accurate retrieval.' },
  { icon: Brain, title: 'Embedding Generation', desc: 'HuggingFace creates semantic vectors.' },
  { icon: Database, title: 'Vector Store', desc: 'Embeddings saved in ChromaDB.' },
];

const QUERY_STEPS = [
  { icon: MessageSquare, title: 'User Question', desc: 'Student asks a study query.' },
  { icon: Brain, title: 'Query Embedding', desc: 'Question converted to vector form.' },
  { icon: Search, title: 'Similarity Search', desc: 'Vector DB finds closest chunks.' },
  { icon: Boxes, title: 'Retriever + Runnable', desc: 'Top-k context selected via LangChain.' },
  { icon: Sparkles, title: 'LLM Answer', desc: 'Grounded response with citations.' },
];

function FlowNode({ step, index, accent }) {
  const Icon = step.icon;
  return (
    <motion.div
      className={`flow-node ${accent === 'cyan' ? 'query' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flow-node-icon">
        <Icon size={18} />
      </div>
      <div className="flow-node-content">
        <h5>{step.title}</h5>
        <p>{step.desc}</p>
      </div>
    </motion.div>
  );
}

function RAGFlowDiagram() {
  return (
    <div className="rag-flow-container">
      <div className="flow-phases">
        {/* Ingestion Phase */}
        <div className="flow-phase">
          <motion.div
            className="phase-label ingest"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="phase-num">A</span> Ingestion Pipeline
          </motion.div>
          {INGEST_STEPS.map((step, i) => (
            <FlowNode key={i} step={step} index={i} accent="indigo" />
          ))}
        </div>

        {/* Connector */}
        <motion.div
          className="phase-connector"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="connector-circle"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <ArrowRight size={20} />
          </motion.div>
        </motion.div>

        {/* Query Phase */}
        <div className="flow-phase">
          <motion.div
            className="phase-label query"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="phase-num">B</span> Query Pipeline
          </motion.div>
          {QUERY_STEPS.map((step, i) => (
            <FlowNode key={i} step={step} index={i + 0.5} accent="cyan" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ABOUT PAGE
============================================================ */
function AboutPage({ onGoToChat }) {
  return (
    <motion.div
      className="about-page glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-inner">
        {/* Hero */}
        <motion.div
          className="about-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-badge">✦ CourseMate AI</div>
          <h2>
            Chat with your <span className="gradient-text">textbooks</span>.<br />
            Learn faster, study smarter.
          </h2>
          <p>
            An AI-powered study assistant that lets students upload their learning materials and
            ask questions in natural language — receiving grounded, cited answers directly from
            their own documents.
          </p>
        </motion.div>

        {/* What is this app */}
        <motion.div
          className="about-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Overview</div>
          <h3>What is CourseMate AI?</h3>
          <p>
            CourseMate AI is a Retrieval-Augmented Generation (RAG) application built for students.
            Instead of manually flipping through hundreds of pages of lecture notes, textbooks, and
            research papers, students can simply ask questions and receive accurate, context-aware
            answers extracted directly from their uploaded study materials.
          </p>
          <p>
            The system combines document retrieval with large language models to provide
            explanations, summaries, and answers — every response is grounded in the student's own
            resources, with page-level citations for verification.
          </p>
        </motion.div>

        {/* Who is the user */}
        <motion.div
          className="about-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Audience</div>
          <h3>Who is it for?</h3>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon"><GraduationCap size={20} /></div>
              <h4>Students</h4>
              <p>School, college & university students who want quick answers from lengthy study materials.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><Users size={20} /></div>
              <h4>Self-Learners</h4>
              <p>Anyone learning from PDFs, eBooks, or research papers who needs instant clarification.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><BookOpen size={20} /></div>
              <h4>Researchers</h4>
              <p>People who need to query large documents and trace answers back to source pages.</p>
            </div>
          </div>
        </motion.div>

        {/* Use & Scope */}
        <motion.div
          className="about-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Purpose & Scope</div>
          <h3>What it does — and where it goes</h3>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon"><Target size={20} /></div>
              <h4>Core Use Case</h4>
              <p>Upload study documents → ask questions → get cited, grounded answers in seconds.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><Rocket size={20} /></div>
              <h4>Scope</h4>
              <p>Currently supports PDF & TXT files with local embeddings and a vector database backend.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon"><Lightbulb size={20} /></div>
              <h4>Future Scope</h4>
              <p>Multi-format support, chat history, multi-user accounts, and collaborative study spaces.</p>
            </div>
          </div>
        </motion.div>

        {/* Animated RAG Flow */}
        <motion.div
          className="about-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Architecture</div>
          <h3>How CourseMate AI works</h3>
          <p>
            The system runs two connected pipelines — an <strong>Ingestion Pipeline</strong> that
            processes uploaded documents into searchable vectors, and a <strong>Query Pipeline</strong>
            that retrieves relevant context and generates grounded answers.
          </p>
          <RAGFlowDiagram />
        </motion.div>

        {/* What I learned */}
        <motion.div
          className="about-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-label">Learning Outcomes</div>
          <h3>What I learned building this</h3>
          <p>
            This project was a deep dive into the LangChain ecosystem and modern RAG architecture.
            Through building CourseMate AI, I gained hands-on experience with:
          </p>
          <div className="learned-tags">
            {[
              'Text Splitters & Chunking Strategies',
              'Vector Stores (ChromaDB)',
              'Embeddings (HuggingFace all-MiniLM-L6-v2)',
              'Retrievers & Top-k Search',
              'LangChain Runnables & LCEL',
              'Document Loaders',
              'Prompt Engineering',
              'Semantic Similarity Search',
              'RAG Pipeline Design',
              'FastAPI Backend Integration',
            ].map((tag, i) => (
              <motion.div
                key={i}
                className="learned-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="dot" />
                {tag}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="about-actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button className="btn-primary" onClick={onGoToChat}>
            <BookOpen size={16} /> Launch Study Assistant
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   FORMATTED TEXT RENDERER — Parses markdown, bold, lists & tables
============================================================ */
function FormattedText({ text }) {
  if (!text) return null;

  const cleanSource = text.replace(/<br\s*\/?>/gi, '\n');
  const rawLines = cleanSource.split('\n');

  const blocks = [];
  let currentTable = [];
  let currentList = [];
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const pText = currentParagraph.join(' ').trim();
      if (pText) {
        blocks.push({ type: 'paragraph', text: pText });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: 'list', items: [...currentList] });
      currentList = [];
    }
  };

  const flushTable = () => {
    if (currentTable.length > 0) {
      blocks.push({ type: 'table', rows: [...currentTable] });
      currentTable = [];
    }
  };

  rawLines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushParagraph();
      flushList();
      if (!/^\|[\s\-:|]+\|$/.test(trimmed)) {
        const cells = trimmed
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        currentTable.push(cells);
      }
      return;
    } else {
      flushTable();
    }

    if (/^[\-\*\•]\s+/.test(trimmed) || /^\d+[\.\)]\s+/.test(trimmed)) {
      flushParagraph();
      const content = trimmed.replace(/^[\-\*\•\d\.\)]+\s+/, '');
      currentList.push(content);
      return;
    } else if (currentList.length > 0 && trimmed === '') {
      flushList();
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h3', text: trimmed.replace(/^###\s+/, '') });
      return;
    } else if (trimmed.startsWith('## ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h2', text: trimmed.replace(/^##\s+/, '') });
      return;
    } else if (trimmed.startsWith('# ')) {
      flushParagraph();
      flushList();
      blocks.push({ type: 'h1', text: trimmed.replace(/^#\s+/, '') });
      return;
    }

    if (trimmed === '') {
      flushParagraph();
      flushList();
      return;
    }

    currentParagraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushTable();

  const renderInline = (str) => {
    if (!str) return '';
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="formatted-text-content">
      {blocks.map((block, bIdx) => {
        if (block.type === 'h1') return <h3 key={bIdx} className="formatted-h1">{renderInline(block.text)}</h3>;
        if (block.type === 'h2') return <h4 key={bIdx} className="formatted-h2">{renderInline(block.text)}</h4>;
        if (block.type === 'h3') return <h5 key={bIdx} className="formatted-h3">{renderInline(block.text)}</h5>;
        if (block.type === 'paragraph') return <p key={bIdx} className="formatted-p">{renderInline(block.text)}</p>;
        if (block.type === 'list') {
          return (
            <ul key={bIdx} className="formatted-ul">
              {block.items.map((item, iIdx) => (
                <li key={iIdx}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }
        if (block.type === 'table') {
          const header = block.rows[0];
          const body = block.rows.slice(1);
          return (
            <div key={bIdx} className="formatted-table-wrapper">
              <table className="formatted-table">
                {header && (
                  <thead>
                    <tr>
                      {header.map((cell, cIdx) => (
                        <th key={cIdx}>{renderInline(cell)}</th>
                      ))}
                    </tr>
                  </thead>
                )}
                {body.length > 0 && (
                  <tbody>
                    {body.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx}>{renderInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

/* ============================================================
   MAIN APP
============================================================ */
export default function App() {
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [expandedSources, setExpandedSources] = useState({});
  const [activeView, setActiveView] = useState('chat');

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${API_BASE}/documents`);
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.documents || []);
      }
    } catch (err) {
      console.error('Failed to load documents:', err);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus(`Uploading & Indexing ${file.name}...`);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setUploadStatus(`✓ Indexed ${data.chunks} chunks across ${data.pages} pages!`);
        fetchDocuments();
        setTimeout(() => setUploadStatus(''), 4000);
      } else {
        const errData = await res.json();
        setUploadStatus(`Error: ${errData.detail || 'Upload failed'}`);
      }
    } catch (err) {
      setUploadStatus(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSend = async (questionText = input) => {
    const query = questionText.trim();
    if (!query || loading) return;

    const userMessage = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    if (questionText === input) setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, k: 4 }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMessage = {
          id: Date.now() + 1,
          sender: 'ai',
          text: data.answer,
          sources: data.sources || [],
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const errData = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: `Error: ${errData.detail || 'Failed to generate answer'}`,
            sources: [],
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: 'Network error connecting to RAG backend server.',
          sources: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleSources = (msgId) => {
    setExpandedSources((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSuggestionClick = (promptText) => handleSend(promptText);
  const clearChat = () => setMessages([]);

  return (
    <>
      <AnimatedBackground />

      <div className="app-container">
        {/* ===== Header ===== */}
        <motion.header
          className="app-header glass-panel"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-left">
            <motion.div
              className="logo-icon"
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <BookOpen size={22} />
            </motion.div>
            <div>
              <h1 className="app-title gradient-text">CourseMate AI</h1>
            </div>
          </div>

          <div className="header-right">
            <motion.button
              className={`nav-button ${activeView === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveView('chat')}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              Home
            </motion.button>
            <motion.button
              className={`nav-button ${activeView === 'about' ? 'active' : ''}`}
              onClick={() => setActiveView('about')}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              About
            </motion.button>
            <span className="badge badge-model" title="Uses Google Generative AI text-embedding-004">
              <Cpu size={12} /> text-embedding-004
            </span>
            <span className="badge badge-free">
              <Zap size={12} /> 0 API Costs
            </span>
            <span className="badge badge-vector">
              <Layers size={12} /> ChromaDB
            </span>
            <div className="pulsing-dot" title="Local Engine Active" />
          </div>
        </motion.header>

        {/* ===== Views ===== */}
        <AnimatePresence mode="wait">
          {activeView === 'about' ? (
            <AboutPage key="about" onGoToChat={() => setActiveView('chat')} />
          ) : (
            <motion.main
              key="chat"
              className="app-main"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Sidebar */}
              <motion.aside
                className="sidebar glass-panel"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
              >
                <div className="sidebar-title">
                  <BookOpen size={18} /> My Library
                </div>

                <motion.label
                  className="upload-dropzone"
                  whileHover={{ scale: 1.01, borderColor: 'rgba(129, 140, 248, 0.5)' }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                >
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    style={{ display: 'none' }}
                  />
                  {uploading ? (
                    <Loader2 size={26} className="spinner upload-icon" />
                  ) : (
                    <Upload size={26} className="upload-icon" />
                  )}
                  <div className="upload-text">
                    {uploading ? 'Processing...' : 'Upload Document'}
                  </div>
                  <div className="upload-subtext">PDF (max 5 pages) & TXT supported</div>
                </motion.label>

                {uploadStatus && <div className="upload-status-box">{uploadStatus}</div>}

                <div className="doc-list">
                  {documents.length === 0 ? (
                    <div className="doc-list-empty">No documents uploaded yet.</div>
                  ) : (
                    documents.map((doc, idx) => (
                      <motion.div
                        className="doc-card"
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02, x: 2 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <div className="doc-icon">
                          <FileText size={18} />
                        </div>
                        <div className="doc-info">
                          <div className="doc-name">{doc.filename}</div>
                          <div className="doc-meta">
                            <span>{doc.pages > 0 ? `${doc.pages} Pages` : 'Text File'}</span>
                            <span>•</span>
                            <span>{doc.size_mb} MB</span>
                          </div>
                        </div>
                        <CheckCircle2 size={16} style={{ color: '#10b981' }} />
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.aside>

              {/* Chat */}
              <motion.section
                className="chat-container glass-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="chat-header">
                  <div className="chat-header-title">
                    <Sparkles size={18} style={{ color: '#818cf8' }} /> Study Assistant
                  </div>
                  {messages.length > 0 && (
                    <motion.button
                      className="btn-secondary"
                      onClick={clearChat}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <Trash2 size={14} /> Clear
                    </motion.button>
                  )}
                </div>

                <div className="messages-area">
                  {messages.length === 0 ? (
                    <motion.div
                      className="welcome-card glass-panel"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.15 }}
                    >
                      <div className="welcome-icon">
                        <Bot size={32} />
                      </div>
                      <h2 className="welcome-title">Ask Anything About Your Documents</h2>
                      <p className="welcome-subtitle">
                        Upload your study materials on the left. The AI reads them using the Google
                        Gemini text-embedding-004 model and answers with page-level citations.
                      </p>

                      <div className="model-note-home">
                        <strong>Embedding Model:</strong> Google Generative AI (models/text-embedding-004)
                        <br />
                        Generates high-accuracy 768-dimensional semantic embeddings for fast and precise document search.
                      </div>

                      <div className="suggestions-grid">
                        {[
                          { icon: '💡', text: 'Summarize the key concepts in this document' },
                          { icon: '📐', text: 'Explain the main topic in simple terms' },
                          { icon: '🧠', text: 'What are the important takeaways?' },
                          { icon: '📑', text: 'Create a study outline from this material' },
                        ].map((s, i) => (
                          <motion.button
                            key={i}
                            className="suggestion-pill"
                            onClick={() => handleSuggestionClick(s.text)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 + i * 0.06 }}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {s.icon} {s.text}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    messages.map((msg) => (
                      <motion.div
                        className={`message-wrapper ${msg.sender}`}
                        key={msg.id}
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      >
                        <div className={`message-avatar ${msg.sender}`}>
                          {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                        </div>
                        <div className="message-bubble">
                          <FormattedText text={msg.text} />

                          {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && (
                            <div className="citation-box">
                              <button
                                className="citation-toggle"
                                onClick={() => toggleSources(msg.id)}
                              >
                                <BookOpen size={14} />
                                {msg.sources.length} Source Citation{msg.sources.length > 1 ? 's' : ''}
                                {expandedSources[msg.id] ? (
                                  <ChevronUp size={14} />
                                ) : (
                                  <ChevronDown size={14} />
                                )}
                              </button>

                              <AnimatePresence>
                                {expandedSources[msg.id] && (
                                  <motion.div
                                    className="citation-list"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25, ease: 'easeOut' }}
                                  >
                                    {msg.sources.map((src, sIdx) => (
                                      <div className="citation-item" key={sIdx}>
                                        <div className="citation-header">
                                          <span>📖 {src.source}</span>
                                          <span>Page {src.page}</span>
                                        </div>
                                        <div className="citation-content">"{src.content}"</div>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}

                  {loading && (
                    <motion.div
                      className="message-wrapper ai"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="message-avatar ai">
                        <Bot size={18} />
                      </div>
                      <div
                        className="message-bubble"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        <Loader2 size={16} className="spinner" />
                        <span>Searching documents with Google Gemini vectors...</span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="chat-input-area">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask a question about your documents..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    disabled={loading}
                  />
                  <motion.button
                    className="btn-primary"
                    onClick={() => handleSend()}
                    disabled={loading || !input.trim()}
                    whileHover={loading || !input.trim() ? {} : { scale: 1.04, y: -1 }}
                    whileTap={loading || !input.trim() ? {} : { scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Send size={16} /> Ask AI
                  </motion.button>
                </div>
              </motion.section>
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}