'use client'

import { useState } from 'react'
import {
  Activity,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Cloud,
  Code2,
  Download,
  Eye,
  EyeOff,
  FileText,
  Filter,
  Layers3,
  Map,
  MapPin,
  Menu,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  TerminalSquare,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

const jobs = [
  { name: 'NDVI vegetation health', status: 'Completed', date: 'Today, 09:42', color: 'green' },
  { name: 'Sentinel-2 cloud mask', status: 'Processing', date: 'Today, 09:18', color: 'blue' },
  { name: 'Urban expansion change', status: 'Completed', date: 'Yesterday, 16:05', color: 'green' },
]

export default function Page() {
  const [selectedAnalysis, setSelectedAnalysis] = useState('Vegetation health (NDVI)')
  const [opacity, setOpacity] = useState(78)
  const [layerVisible, setLayerVisible] = useState(true)
  const [running, setRunning] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const runAnalysis = () => {
    setRunning(true)
    window.setTimeout(() => setRunning(false), 2200)
  }

  return (
    <main className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand"><span className="brand-mark"><MapPin size={17} /></span><span>terraflow</span><button className="mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={18} /></button></div>
        <div className="workspace-switcher"><div className="workspace-icon">GF</div><div><strong>GeoLab Field Ops</strong><small>Personal workspace</small></div><ChevronDown size={15} /></div>
        <nav aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          <NavItem icon={<Map size={17} />} label="Map explorer" active />
          <NavItem icon={<Activity size={17} />} label="Analysis jobs" badge="3" />
          <NavItem icon={<Layers3 size={17} />} label="Data catalog" />
          <NavItem icon={<FileText size={17} />} label="Saved studies" />
          <p className="nav-label nav-gap">Tools</p>
          <NavItem icon={<Code2 size={17} />} label="API playground" />
          <NavItem icon={<BarChart3 size={17} />} label="Usage & billing" />
        </nav>
        <div className="sidebar-bottom"><div className="health"><span className="status-dot" />All systems operational</div><NavItem icon={<Settings2 size={17} />} label="Settings" /><div className="user-row"><div className="avatar">AN</div><div><strong>Alex Nguyen</strong><small>alex@geolab.dev</small></div><MoreHorizontal size={16} /></div></div>
      </aside>

      <section className="content-area">
        <header className="topbar"><button className="menu-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumb"><span>Projects</span><span>/</span><strong>Amazon basin study</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search"><Search size={18} /></button><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><button className="help-button"><CircleHelp size={16} /> Help center</button></div></header>
        <div className="page-heading"><div><div className="eyebrow"><span className="live-dot" />LIVE WORKSPACE</div><h1>Map explorer</h1><p>Run Earth Engine analyses against your area of interest.</p></div><div className="heading-actions"><button className="secondary-button"><Upload size={16} /> Import AOI</button><button className="primary-button" onClick={runAnalysis}><Plus size={17} /> New analysis</button></div></div>

        <div className="dashboard-grid">
          <section className="map-panel panel"><div className="map-toolbar"><div className="map-tabs"><button className="map-tab active">Satellite</button><button className="map-tab">Terrain</button><button className="map-tab">Street</button></div><div className="map-tools"><button aria-label="Zoom in"><ZoomIn size={17} /></button><button aria-label="Zoom out"><ZoomOut size={17} /></button><button aria-label="Filter"><Filter size={16} /></button></div></div><div className="map-canvas"><div className="map-grid-lines" /><div className="river river-one" /><div className="river river-two" /><div className="aoi-shape"><span className="aoi-pin"><MapPin size={13} /></span></div><div className="map-label label-one">Amazonas, BR</div><div className="map-label label-two">Rio Negro</div><div className="map-label label-three">4° 12' 06&quot; S&nbsp;&nbsp; 60° 01' 42&quot; W</div><div className="map-status"><span className="status-dot" />Satellite imagery · 2024-08-18</div><div className="map-legend"><div className="legend-title">NDVI index <span>ⓘ</span></div><div className="gradient-bar" /><div className="legend-labels"><span>-1</span><span>0</span><span>1</span></div></div><div className="map-scale">0&nbsp;&nbsp;&nbsp;&nbsp; 10&nbsp;&nbsp;&nbsp;&nbsp; 20 km</div></div></section>

          <aside className="config-panel panel"><div className="panel-header"><div><span className="section-kicker">ANALYSIS CONFIGURATION</span><h2>Set up an analysis</h2></div><button className="icon-button"><MoreHorizontal size={18} /></button></div><div className="form-body"><Field label="Area of interest"><button className="select-control"><MapPin size={15} /><span>Amazon basin · 142.4 km²</span><ChevronDown size={15} /></button></Field><Field label="Dataset"><button className="select-control"><span className="dataset-icon">S2</span><span>Sentinel-2 SR Harmonized</span><ChevronDown size={15} /></button><p className="field-note"><Sparkles size={13} /> 10 m resolution · 5-day revisit</p></Field><Field label="Analysis type"><select className="select-control native-select" value={selectedAnalysis} onChange={(e) => setSelectedAnalysis(e.target.value)}><option>Vegetation health (NDVI)</option><option>Water surface change</option><option>Urban expansion</option><option>Land cover classification</option></select></Field><div className="date-row"><Field label="Start date"><button className="select-control"><CalendarDays size={14} /><span>Jan 01, 2024</span></button></Field><Field label="End date"><button className="select-control"><CalendarDays size={14} /><span>Aug 31, 2024</span></button></Field></div><Field label="Cloud cover threshold"><div className="range-header"><span>Maximum cloud cover</span><strong>20%</strong></div><input type="range" min="0" max="100" defaultValue="20" /></Field><div className="layer-toggle"><div className="layer-info"><span className="layer-color" /><div><strong>Show result layer</strong><small>Overlay on map</small></div></div><button className={`toggle ${layerVisible ? 'on' : ''}`} onClick={() => setLayerVisible(!layerVisible)} aria-label="Toggle result layer"><span /></button></div><div className="run-box"><div><span className="run-icon"><TerminalSquare size={16} /></span><div><strong>Ready to run</strong><small>Est. processing time · 2–4 min</small></div></div><button className="run-button" onClick={runAnalysis} disabled={running}>{running ? 'Running…' : 'Run analysis'}<Play size={14} fill="currentColor" /></button></div></div></aside>
        </div>

        <section className="bottom-grid"><div className="panel recent-panel"><div className="panel-header"><div><span className="section-kicker">ACTIVITY</span><h2>Recent jobs</h2></div><button className="text-button">View all <span>→</span></button></div><div className="jobs-list">{jobs.map((job) => <div className="job-row" key={job.name}><div className={`job-status ${job.color}`}><Check size={13} /></div><div className="job-name"><strong>{job.name}</strong><span>{job.date}</span></div><span className={`job-pill ${job.color}`}>{job.status}</span><MoreHorizontal size={16} className="job-more" /></div>)}</div></div><div className="panel tile-panel"><div className="panel-header"><div><span className="section-kicker">OUTPUT</span><h2>Result layer</h2></div><button className="icon-button"><Download size={17} /></button></div><div className="tile-content"><div className="tile-code"><span className="code-label">TILE URL</span><code>https://earthengine.googleapis.com/v1alpha/...</code><button><Check size={14} /> Copy</button></div><div className="opacity-row"><div><span>Layer opacity</span><strong>{opacity}%</strong></div><input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} /></div></div></div></section>
      </section>
    </main>
  )
}

function NavItem({ icon, label, active, badge }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string }) { return <button className={`nav-item ${active ? 'active' : ''}`}>{icon}<span>{label}</span>{badge && <b>{badge}</b>}</button> }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div className="field"><label>{label}</label>{children}</div> }
