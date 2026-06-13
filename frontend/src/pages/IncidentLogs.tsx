import { useState } from "react";
import {
  Search,
  AlertTriangle,
  Flame,
  Ambulance,
  Waves,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const incidents = [
  {
    id: "INC-001",
    title: "Fire reported near Sector 12",
    type: "Fire",
    priority: "Critical",
    status: "Active",
    location: "Sector 12",
    time: "2 min ago",
  },
  {
    id: "INC-002",
    title: "Medical assistance requested",
    type: "Medical",
    priority: "High",
    status: "Assigned",
    location: "Downtown",
    time: "12 min ago",
  },
  {
    id: "INC-003",
    title: "Flood risk probability increased",
    type: "Flood",
    priority: "Medium",
    status: "Monitoring",
    location: "Riverside",
    time: "20 min ago",
  },
];

export default function IncidentLogs() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.id.toLowerCase().includes(search.toLowerCase()) ||
      incident.location.toLowerCase().includes(search.toLowerCase()) ||
      incident.type.toLowerCase().includes(search.toLowerCase())
  );

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "High":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "text-red-400";
      case "Assigned":
        return "text-orange-400";
      case "Monitoring":
        return "text-cyan-400";
      case "Resolved":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Fire":
        return <Flame className="text-red-400" size={20} />;
      case "Medical":
        return <Ambulance className="text-orange-400" size={20} />;
      case "Flood":
        return <Waves className="text-cyan-400" size={20} />;
      default:
        return <AlertTriangle size={20} />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Incident Logs
        </h1>
        <p className="text-slate-400 mt-2">
          Historical and active incident records.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Total Incidents</p>
          <h2 className="text-3xl font-bold text-white">247</h2>
        </div>

        <div className="bg-slate-900 border border-red-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Active</p>
          <h2 className="text-3xl font-bold text-red-400">12</h2>
        </div>

        <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Critical</p>
          <h2 className="text-3xl font-bold text-orange-400">7</h2>
        </div>

        <div className="bg-slate-900 border border-green-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Resolved</p>
          <h2 className="text-3xl font-bold text-green-400">228</h2>
        </div>
      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Search className="text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search ID, Location, Type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none w-full text-white"
          />
        </div>
      </div>

      {/* Incident Feed */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-slate-900 border border-cyan-500/20 rounded-xl p-5 hover:border-cyan-500/40 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  {getIcon(incident.type)}

                  <h3 className="text-xl font-semibold text-white">
                    {incident.id}
                  </h3>

                  <span
                    className={`px-3 py-1 rounded-full text-xs border ${getPriorityStyle(
                      incident.priority
                    )}`}
                  >
                    {incident.priority}
                  </span>
                </div>

                <p className="text-slate-300 mt-3">
                  {incident.title}
                </p>

                <div className="flex gap-6 mt-4 text-sm text-slate-400">
                  <span>Location: {incident.location}</span>
                  <span className={getStatusStyle(incident.status)}>
                    {incident.status}
                  </span>
                </div>
              </div>

              <span className="text-slate-500">
                {incident.time}
              </span>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() =>
                  navigate(`/incident/${incident.id}`)
                }
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition"
              >
                View Details
              </button>

              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition">
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}