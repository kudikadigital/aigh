"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Activity, Users, UserCheck, FolderGit, TrendingUp, Eye, Mail, Phone, User, PieChart, BarChart3, Target } from "lucide-react";
import { parseISO, format, subDays, subWeeks, subMonths, subYears, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

/**
 * @typedef {Object} Subscriber
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} role
 * @property {string} [phone]
 * @property {string} [profile]
 * @property {string} created_at
 */
/**
 * @param {{ subscribers: Subscriber[] }} props
 */
export default function DashboardClient({ subscribers: initialSubscribers }) {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [loading, setLoading] = useState(!initialSubscribers.length);
  const [period, setPeriod] = useState("month");
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeChart, setActiveChart] = useState("bar"); // 'bar', 'line', 'pie', 'doughnut'

  useEffect(() => {
    async function fetchSubscribers() {
      if (initialSubscribers.length > 0) {
        setSubscribers(initialSubscribers);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("inscritos")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) setSubscribers(data);
      } catch (err) {
        console.error("Erro ao buscar inscritos:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSubscribers();
  }, [initialSubscribers]);

  // Estatísticas
  const totalSubscribers = subscribers.length;
  const totalWithProfile = subscribers.filter((s) => s.profile).length;
  const uniqueRoles = new Set(subscribers.map((s) => s.role)).size;

  // Análise de perfis por role
  const roleDistribution = useMemo(() => {
    const roles = subscribers.reduce((acc, subscriber) => {
      const role = subscriber.role || "Não informado";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    // Ordenar por quantidade (decrescente)
    return Object.entries(roles)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [role, count]) => {
        acc[role] = count;
        return acc;
      }, {});
  }, [subscribers]);

  // Perfis com e sem profile
  const profileStatus = useMemo(() => {
    const withProfile = subscribers.filter(s => s.profile).length;
    const withoutProfile = subscribers.length - withProfile;
    
    return {
      "Com Perfil": withProfile,
      "Sem Perfil": withoutProfile
    };
  }, [subscribers]);

  // Evolução temporal (últimos 30 dias)
  const last30DaysData = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = subDays(new Date(), 29 - i);
      return format(date, "dd/MM", { locale: ptBR });
    });

    const dailyCounts = subscribers.reduce((acc, subscriber) => {
      const date = format(parseISO(subscriber.created_at), "dd/MM", { locale: ptBR });
      if (last30Days.includes(date)) {
        acc[date] = (acc[date] || 0) + 1;
      }
      return acc;
    }, {});

    // Preencher dias sem inscrições com 0
    last30Days.forEach(date => {
      if (!dailyCounts[date]) {
        dailyCounts[date] = 0;
      }
    });

    return {
      labels: last30Days,
      data: last30Days.map(date => dailyCounts[date])
    };
  }, [subscribers]);

  // Filtro por período
  const filteredSubscribers = useMemo(() => {
    let startDate = new Date(0);
    const now = new Date();
    
    if (period === "day") startDate = subDays(now, 1);
    else if (period === "week") startDate = subWeeks(now, 1);
    else if (period === "month") startDate = subMonths(now, 1);
    else if (period === "year") startDate = subYears(now, 1);

    return subscribers.filter((s) => isAfter(parseISO(s.created_at), startDate));
  }, [subscribers, period]);

  const newSubscribers = filteredSubscribers.length;

  // Dados para gráficos principais
  const chartColors = [
    '#FF5C00', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', 
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#14B8A6', '#6366F1'
  ];

  const barData = {
    labels: Object.keys(roleDistribution),
    datasets: [
      {
        label: "Inscritos por Perfil",
        data: Object.values(roleDistribution),
        backgroundColor: chartColors.slice(0, Object.keys(roleDistribution).length),
        borderColor: chartColors.map(color => color.replace('0.8', '1')),
        borderWidth: 2,
        borderRadius: 6,
        barPercentage: 0.7,
      },
    ],
  };

  const lineData = {
    labels: last30DaysData.labels,
    datasets: [
      {
        label: "Inscrições (Últimos 30 dias)",
        data: last30DaysData.data,
        borderColor: '#FF5C00',
        backgroundColor: 'rgba(255, 92, 0, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#FF5C00',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(roleDistribution),
    datasets: [
      {
        data: Object.values(roleDistribution),
        backgroundColor: chartColors,
        borderColor: '#1F2937',
        borderWidth: 2,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(profileStatus),
    datasets: [
      {
        data: Object.values(profileStatus),
        backgroundColor: ['#10B981', '#6B7280'],
        borderColor: '#1F2937',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#E5E7EB',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        titleColor: '#F3F4F6',
        bodyColor: '#D1D5DB',
        borderColor: '#4B5563',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: { 
          color: 'rgba(255,255,255,0.1)',
          borderColor: 'rgba(255,255,255,0.3)'
        },
        ticks: { 
          color: '#D1D5DB',
          font: {
            size: 11,
            weight: '500'
          }
        }
      },
      y: {
        grid: { 
          color: 'rgba(255,255,255,0.1)',
          borderColor: 'rgba(255,255,255,0.3)'
        },
        ticks: { 
          color: '#D1D5DB',
          font: {
            size: 11,
            weight: '500'
          }
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#E5E7EB',
          font: {
            size: 11,
            weight: '500'
          },
          padding: 15,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.9)',
        titleColor: '#F3F4F6',
        bodyColor: '#D1D5DB'
      }
    },
  };

  const visibleSubscribers = useMemo(
    () => filteredSubscribers.slice(0, visibleCount),
    [filteredSubscribers, visibleCount]
  );

  function handleShowMore() {
    setVisibleCount((prev) => prev + 10);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-300">Carregando dados...</p>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    switch (activeChart) {
      case 'bar':
        return <Bar data={barData} options={chartOptions} />;
      case 'line':
        return <Line data={lineData} options={chartOptions} />;
      case 'pie':
        return <Pie data={pieData} options={pieChartOptions} />;
      case 'doughnut':
        return <Doughnut data={doughnutData} options={pieChartOptions} />;
      default:
        return <Bar data={barData} options={chartOptions} />;
    }
  };

  return (
    <main className="space-y-8 bg-black text-white p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Dashboard de Inscrições
          </h1>
          <p className="text-gray-300 mt-1">Análise completa dos perfis dos participantes</p>
        </div>
        <div className="flex items-center gap-3 bg-gray-900/50 px-4 py-2 rounded-lg">
          <Activity className="text-orange-500" size={24} />
          <span className="text-sm text-gray-200">
            {newSubscribers} novos no período
          </span>
        </div>
      </header>

      {/* Filtros de período */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-gray-900/30 p-1 rounded-lg w-fit">
          <Tabs value={period} onValueChange={setPeriod} className="w-full">
            <TabsList className="bg-transparent gap-1">
              <TabsTrigger value="day" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 rounded-md px-4 py-2">
                24h
              </TabsTrigger>
              <TabsTrigger value="week" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 rounded-md px-4 py-2">
                Semana
              </TabsTrigger>
              <TabsTrigger value="month" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 rounded-md px-4 py-2">
                Mês
              </TabsTrigger>
              <TabsTrigger value="year" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 rounded-md px-4 py-2">
                Ano
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Seletor de tipo de gráfico */}
        <div className="bg-gray-900/30 p-1 rounded-lg w-fit">
          <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
            <TabsList className="bg-transparent gap-1">
              <TabsTrigger value="bar" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 rounded-md px-3 py-2">
                <BarChart3 size={16} className="mr-2" />
                Barras
              </TabsTrigger>
              <TabsTrigger value="line" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 rounded-md px-3 py-2">
                <TrendingUp size={16} className="mr-2" />
                Linha
              </TabsTrigger>
              <TabsTrigger value="pie" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 rounded-md px-3 py-2">
                <PieChart size={16} className="mr-2" />
                Pizza
              </TabsTrigger>
              <TabsTrigger value="doughnut" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-gray-300 rounded-md px-3 py-2">
                <Target size={16} className="mr-2" />
                Rosca
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Cards de métricas */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total de Inscritos" 
          value={totalSubscribers} 
          icon={<Users className="text-orange-500" size={20} />}
          trend={newSubscribers}
        />
        <MetricCard 
          title="Com Perfil" 
          value={totalWithProfile} 
          icon={<UserCheck className="text-green-500" size={20} />}
          percentage={totalSubscribers ? Math.round((totalWithProfile / totalSubscribers) * 100) : 0}
        />
        <MetricCard 
          title="Tipos de Perfil" 
          value={uniqueRoles} 
          icon={<FolderGit className="text-blue-500" size={20} />}
        />
        <MetricCard 
          title="Novos Inscritos" 
          value={newSubscribers} 
          icon={<TrendingUp className="text-purple-500" size={20} />}
          trend={newSubscribers}
        />
      </section>

      {/* Gráfico Principal */}
      <section>
        <Card className="bg-gray-900/20 border-gray-700 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-white font-semibold">
              {activeChart === 'bar' && <BarChart3 size={20} className="text-orange-500" />}
              {activeChart === 'line' && <TrendingUp size={20} className="text-orange-500" />}
              {activeChart === 'pie' && <PieChart size={20} className="text-orange-500" />}
              {activeChart === 'doughnut' && <Target size={20} className="text-orange-500" />}
              {activeChart === 'bar' && "Distribuição por Tipo de Perfil"}
              {activeChart === 'line' && "Evolução Temporal (30 dias)"}
              {activeChart === 'pie' && "Composição por Perfil"}
              {activeChart === 'doughnut' && "Status de Perfil"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {renderChart()}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Cards de Insights */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900/20 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Users size={18} />
              Top Perfis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(roleDistribution).slice(0, 5).map(([role, count], index) => (
                <div key={role} className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">{role}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ 
                          width: `${(count / totalSubscribers) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-white text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/20 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Activity size={18} />
              Estatísticas Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Perfil mais comum:</span>
                <span className="text-white font-medium">
                  {Object.keys(roleDistribution)[0] || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Taxa de perfis completos:</span>
                <span className="text-green-400 font-medium">
                  {totalSubscribers ? Math.round((totalWithProfile / totalSubscribers) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Média diária (30 dias):</span>
                <span className="text-white font-medium">
                  {Math.round(last30DaysData.data.reduce((a, b) => a + b, 0) / 30)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Tabela de inscritos */}
      <section className="bg-gray-900/20 border border-gray-700 rounded-xl backdrop-blur-sm">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
            <Users size={20} className="text-orange-500" />
            Detalhes dos Inscritos
            <span className="text-sm text-gray-300 ml-2">({filteredSubscribers.length})</span>
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-300 font-semibold">
                  <User size={16} className="inline mr-2" />
                  Nome
                </th>
                <th className="text-left p-4 text-gray-300 font-semibold hidden md:table-cell">
                  <Mail size={16} className="inline mr-2" />
                  Email
                </th>
                <th className="text-left p-4 text-gray-300 font-semibold">Perfil</th>
                <th className="text-left p-4 text-gray-300 font-semibold hidden lg:table-cell">
                  <Phone size={16} className="inline mr-2" />
                  Telefone
                </th>
                <th className="text-left p-4 text-gray-300 font-semibold hidden sm:table-cell">
                  <Eye size={16} className="inline mr-2" />
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors duration-200">
                  <td className="p-4 font-medium text-gray-100">{subscriber.name}</td>
                  <td className="p-4 text-gray-300 hidden md:table-cell">{subscriber.email}</td>
                  <td className="p-4">
                    <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs font-medium">
                      {subscriber.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-300 hidden lg:table-cell">
                    {subscriber.phone || "N/A"}
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    {subscriber.profile ? (
                      <a
                        href={subscriber.profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1 font-medium"
                      >
                        <Eye size={14} />
                        Ver Perfil
                      </a>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleCount < filteredSubscribers.length && (
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleShowMore}
              className="w-full py-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/40 rounded-lg text-orange-300 hover:text-orange-200 transition-all duration-200 font-medium"
            >
              Carregar mais 10 inscritos
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

/**
 * @typedef {Object} MetricCardProps
 * @property {string} title
 * @property {number} value
 * @property {React.ReactNode} icon
 * @property {number} [trend]
 * @property {number} [percentage]
 */

/**
 * @param {MetricCardProps} props
 */
function MetricCard({ title, value, icon, trend, percentage }) {
  return (
    <Card className="bg-gray-900/20 border-gray-700 hover:border-gray-600 transition-all duration-200 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-gray-300">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value.toLocaleString('pt-BR')}</div>
        {(trend !== undefined || percentage !== undefined) && (
          <div className="flex items-center gap-1 mt-1">
            {trend !== undefined && trend > 0 && (
              <span className="text-xs text-green-300 font-medium">
                +{trend} este período
              </span>
            )}
            {percentage !== undefined && (
              <span className="text-xs text-blue-300 font-medium">
                {percentage}% do total
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}