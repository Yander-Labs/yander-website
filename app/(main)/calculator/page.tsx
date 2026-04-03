"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { roles, countries } from "@/lib/salary-data";
import { Plus, Trash2, ChevronDown } from "lucide-react";

interface TeamMember {
  id: string;
  roleIndex: number;
  countryId: string;
  count: number;
}

function formatCurrency(amount: number): string {
  return "$" + amount.toLocaleString("en-US");
}

function formatCurrencyShort(amount: number): string {
  if (amount >= 1000000) return "$" + (amount / 1000000).toFixed(1) + "M";
  if (amount >= 1000) return "$" + (amount / 1000).toFixed(0) + "K";
  return "$" + amount.toLocaleString("en-US");
}

export default function CalculatorPage() {
  const [team, setTeam] = useState<TeamMember[]>([
    { id: "1", roleIndex: 0, countryId: "brazil", count: 1 },
  ]);

  function addRole() {
    setTeam((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        roleIndex: 0,
        countryId: "brazil",
        count: 1,
      },
    ]);
  }

  function removeRole(id: string) {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  }

  function updateMember(id: string, updates: Partial<TeamMember>) {
    setTeam((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  }

  const results = useMemo(() => {
    let totalUS = 0;
    let totalOffshore = 0;

    const breakdown = team.map((member) => {
      const role = roles[member.roleIndex];
      const usSalary = role.salaries["united-states"].median;
      const offshoreSalary = role.salaries[member.countryId].median;
      const usTotal = usSalary * member.count;
      const offshoreTotal = offshoreSalary * member.count;
      const savings = usTotal - offshoreTotal;
      const savingsPercent = Math.round((savings / usTotal) * 100);

      totalUS += usTotal;
      totalOffshore += offshoreTotal;

      return {
        ...member,
        role: role.role,
        country: countries.find((c) => c.id === member.countryId),
        usSalary,
        offshoreSalary,
        usTotal,
        offshoreTotal,
        savings,
        savingsPercent,
      };
    });

    const totalSavings = totalUS - totalOffshore;
    const totalSavingsPercent =
      totalUS > 0 ? Math.round((totalSavings / totalUS) * 100) : 0;

    return { breakdown, totalUS, totalOffshore, totalSavings, totalSavingsPercent };
  }, [team]);

  return (
    <main className="min-h-screen bg-white">
      <Container>
        <div className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-instrument text-4xl md:text-5xl text-gray-900 mb-4 leading-[1.15] tracking-tight">
              Offshore Hiring Cost Calculator
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-3">
              See how much you could save by hiring from South America, Eastern
              Europe, and South Africa. Add roles below to build your team.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              These are estimates for experienced, qualified professionals. Salaries are slightly above local market rate to reflect what you should expect to pay to attract and retain top talent.
            </p>
          </div>

          {/* Team Builder */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="space-y-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4"
                >
                  {/* Count */}
                  <div className="flex items-center gap-2 sm:w-20">
                    <button
                      onClick={() =>
                        updateMember(member.id, {
                          count: Math.max(1, member.count - 1),
                        })
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 text-sm font-medium"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-gray-900">
                      {member.count}
                    </span>
                    <button
                      onClick={() =>
                        updateMember(member.id, { count: member.count + 1 })
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 text-sm font-medium"
                    >
                      +
                    </button>
                  </div>

                  {/* Role Select */}
                  <div className="relative flex-1">
                    <select
                      value={member.roleIndex}
                      onChange={(e) =>
                        updateMember(member.id, {
                          roleIndex: parseInt(e.target.value),
                        })
                      }
                      className="w-full appearance-none px-4 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-gray-900"
                    >
                      {roles.map((role, i) => (
                        <option key={role.slug} value={i}>
                          {role.role}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Country Select */}
                  <div className="relative sm:w-48">
                    <select
                      value={member.countryId}
                      onChange={(e) =>
                        updateMember(member.id, { countryId: e.target.value })
                      }
                      className="w-full appearance-none px-4 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 outline-none focus:border-gray-900"
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.flag} {country.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeRole(member.id)}
                    className="sm:w-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                    disabled={team.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addRole}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 border border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:text-gray-900 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Role
            </button>
          </div>

          {/* Results */}
          {team.length > 0 && (
            <div className="max-w-3xl mx-auto">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    US Cost
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrencyShort(results.totalUS)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">per year</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    Offshore Cost
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatCurrencyShort(results.totalOffshore)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">per year</p>
                </div>
                <div className="bg-gray-900 rounded-xl p-5">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    You Save
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {formatCurrencyShort(results.totalSavings)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {results.totalSavingsPercent}% less per year
                  </p>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Region
                        </th>
                        <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          US Salary
                        </th>
                        <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Offshore
                        </th>
                        <th className="text-right px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Savings
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.breakdown.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b border-gray-100 last:border-0"
                        >
                          <td className="px-5 py-3 text-gray-900 font-medium">
                            {row.count > 1 && (
                              <span className="text-gray-400 mr-1">
                                {row.count}x
                              </span>
                            )}
                            {row.role}
                          </td>
                          <td className="px-5 py-3 text-gray-600">
                            {row.country?.flag} {row.country?.label}
                          </td>
                          <td className="px-5 py-3 text-right text-gray-600">
                            {formatCurrency(row.usTotal)}
                          </td>
                          <td className="px-5 py-3 text-right text-gray-600">
                            {formatCurrency(row.offshoreTotal)}
                          </td>
                          <td className="px-5 py-3 text-right font-medium text-gray-900">
                            {formatCurrency(row.savings)}
                            <span className="text-gray-400 text-xs ml-1">
                              ({row.savingsPercent}%)
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10 text-center">
                <p className="text-gray-500 mb-4">
                  Want to find A-player talent in these regions without the guesswork?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/remote-hiring-playbook">
                    <Button variant="secondary">
                      Get The Free Playbook
                    </Button>
                  </a>
                  <a href="https://yander.io">
                    <Button>
                      Join The Yander Waitlist
                    </Button>
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-6 max-w-lg mx-auto leading-relaxed">
                  Salary estimates based on data from PayScale, Howdy, Pnet, Glassdoor, and regional benchmarks, combined with first-hand experience hiring 60+ people across these regions. Figures reflect competitive rates to attract and retain experienced talent. All numbers are estimates and may not represent exact market rates.
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
