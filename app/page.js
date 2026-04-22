"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const headcountData = [
  { month: "Jan", total: 112 }, { month: "Fév", total: 118 },
  { month: "Mar", total: 121 }, { month: "Avr", total: 119 },
  { month: "Mai", total: 130 }, { month: "Jun", total: 134 },
  { month: "Jul", total: 138 }, { month: "Aoû", total: 135 },
  { month: "Sep", total: 142 }, { month: "Oct", total: 148 },
  { month: "Nov", total: 152 }, { month: "Déc", total: 158 },
];

const presenceData = [
  { day: "Lun", present: 142, absent: 16 },
  { day: "Mar", present: 148, absent: 10 },
  { day: "Mer", present: 139, absent: 19 },
  { day: "Jeu", present: 151, absent: 7  },
  { day: "Ven", present: 133, absent: 25 },
];

const deptData = [
  { name: "Technique",  value: 45 },
  { name: "RH",         value: 18 },
  { name: "Finance",    value: 22 },
  { name: "Commercial", value: 38 },
  { name: "Support",    value: 35 },
];

const recentLeaves = [
  { name: "Amina Benali",     dept: "Technique",  type: "Annuel",       days: 5,  status: "Approuvé"   },
  { name: "Youssef Erraji",   dept: "Finance",    type: "Maladie",      days: 3,  status: "En attente" },
  { name: "Sara Idrissi",     dept: "Commercial", type: "Annuel",       days: 10, status: "Approuvé"   },
  { name: "Khalid Moussaoui", dept: "RH",         type: "Exceptionnel", days: 2,  status: "Refusé"     },
  { name: "Nadia Tazi",       dept: "Support",    type: "Annuel",       days: 7,  status: "Approuvé"   },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: "easeOut" },
  }),
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusStyle = {
  "Approuvé":   "text-green-600 bg-green-50",
  "En attente": "text-yellow-600 bg-yellow-50",
  "Refusé":     "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-1)/0.55)",
  "hsl(var(--chart-2)/0.5)",
];

const tooltipStyle = {
  background: "hsl(var(--card))",
  border: "0.5px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, delta, icon, color }) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span
          className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
          style={{
            background: `hsl(var(--${color})/0.12)`,
            color: `hsl(var(--${color}))`,
          }}
        >
          <i className={`bi text-2xl text-chart-1 ${icon}`} />
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
        <span
          className="text-xs mb-1 font-medium"
          style={{ color: `hsl(var(--${color}))` }}
        >
          {delta}
        </span>
      </div>
    </motion.div>
  );
}

function Section({ children, className = "" }) {
  return (
    <motion.div
      variants={cardVariants}
      className={`bg-card border border-border rounded-xl p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
      {children}
    </h2>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <motion.div
      className="p-6 space-y-6 border w-full"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      {/* KPI Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total employés"       value="158" delta="+4 ce mois"           icon="bi-people-fill"          color="chart-1" />
        <StatCard label="Présents aujourd'hui" value="142" delta="89.9%"                icon="bi-calendar2-check-fill" color="chart-2" />
        <StatCard label="Congés en cours"      value="11"  delta="5 en attente"         icon="bi-alarm-fill"           color="chart-3" />
        <StatCard label="Nouveaux ce mois"     value="6"   delta="↑ 2 vs mois dernier"  icon="bi-person-plus-fill"     color="chart-1" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        <Section className="lg:col-span-2">
          <SectionTitle>Évolution des effectifs — 2024</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={headcountData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="headFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="hsl(var(--chart-1))" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} domain={[100, 170]} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "hsl(var(--foreground))" }} />
              <Area
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#headFill)"
                dot={false}
                activeDot={{ r: 4, fill: "hsl(var(--chart-1))" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Section>

        <Section>
          <SectionTitle>Répartition par département</SectionTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={deptData} cx="50%" cy="50%" innerRadius={52} outerRadius={78} paddingAngle={3} dataKey="value">
                {deptData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1">
            {deptData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                <span className="text-xs text-muted-foreground truncate">{d.name}</span>
                <span className="text-xs font-medium ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Presence + Leaves Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

        <Section>
          <SectionTitle>Présence — semaine en cours</SectionTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={presenceData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="present" name="Présents" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent"  name="Absents"  fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Section>

        <Section className="lg:col-span-2">
          <SectionTitle>Dernières demandes de congés</SectionTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-muted-foreground border-b border-border">
                  <th className="text-left pb-2 font-medium">Employé</th>
                  <th className="text-left pb-2 font-medium">Département</th>
                  <th className="text-left pb-2 font-medium">Type</th>
                  <th className="text-center pb-2 font-medium">Jours</th>
                  <th className="text-right pb-2 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                {recentLeaves.map((row, i) => (
                  <motion.tr
                    key={row.name}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="show"
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="py-2.5 font-medium">{row.name}</td>
                    <td className="py-2.5 text-muted-foreground">{row.dept}</td>
                    <td className="py-2.5 text-muted-foreground">{row.type}</td>
                    <td className="py-2.5 text-center">{row.days}</td>
                    <td className="py-2.5 text-right">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full font-medium ${statusStyle[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      {/* Quick Actions */}
      <motion.div variants={cardVariants} className="flex flex-wrap gap-3">
        {[
          { label: "Ajouter un employé",       icon: "bi-person-plus",    color: "chart-1" },
          { label: "Nouvelle demande de congé", icon: "bi-alarm",          color: "chart-2" },
          { label: "Générer un rapport",        icon: "bi-clipboard-data", color: "chart-3" },
          { label: "Émettre un certificat",     icon: "bi-file-text",      color: "chart-1" },
        ].map((a) => (
          <button
            key={a.label}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-card hover:bg-accent transition-colors"
            style={{ color: `hsl(var(--${a.color}))` }}
          >
            <i className={`bi ${a.icon} text-base`} />
            {a.label}
          </button>
        ))}
      </motion.div>
    </motion.div>
  );
}