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

export function CalculatorClient() {
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
            <h1 className="font-medium text-4xl md:text-5xl text-[var(--color-ink-primary)] mb-4 leading-[1.05] tracking-tight">
              Remote Hiring Cost Calculator
            </h1>
            <p className="text-lg text-[var(--color-ink-secondary)] leading-relaxed mb-3">
              See how much you could save by hiring from cost-effective markets like South America, Eastern Europe, and South Africa. Yander also sources premium talent from the US, Canada, UK, and Australia. Add roles below to build your team.
            </p>
            <p className="text-sm text-[var(--color-ink-faded)] leading-relaxed">
              These are estimates for experienced, qualified professionals. Salaries are slightly above local market rate to reflect what you should expect to pay to attract and retain top talent.
            </p>
          </div>

          {/* Team Builder */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="space-y-3">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-[var(--color-surface-subtle)] border border-[var(--color-border-canon)] rounded-2xl p-4"
                >
                  {/* Count */}
                  <div className="flex items-center gap-2 sm:w-20">
                    <button
                      onClick={() =>
                        updateMember(member.id, {
                          count: Math.max(1, member.count - 1),
                        })
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--color-border-canon-strong)] bg-white text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-subtle)] text-sm font-medium"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-sm font-medium text-[var(--color-ink-primary)]">
                      {member.count}
                    </span>
                    <button
                      onClick={() =>
                        updateMember(member.id, { count: member.count + 1 })
                      }
                      className="w-8 h-8 flex items-center justify-center rounded-md border border-[var(--color-border-canon-strong)] bg-white text-[var(--color-ink-secondary)] hover:bg-[var(--color-surface-subtle)] text-sm font-medium"
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
                      className="w-full appearance-none px-4 py-2.5 pr-10 text-sm border border-[var(--color-border-canon-strong)] rounded-md bg-white text-[var(--color-ink-primary)] outline-none focus:border-[var(--color-ink-primary)]"
                    >
                      {roles.map((role, i) => (
                        <option key={role.slug} value={i}>
                          {role.role}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-faded)] pointer-events-none" />
                  </div>

                  {/* Country Select */}
                  <div className="relative sm:w-48">
                    <select
                      value={member.countryId}
                      onChange={(e) =>
                        updateMember(member.id, { countryId: e.target.value })
                      }
                      className="w-full appearance-none px-4 py-2.5 pr-10 text-sm border border-[var(--color-border-canon-strong)] rounded-md bg-white text-[var(--color-ink-primary)] outline-none focus:border-[var(--color-ink-primary)]"
                    >
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.flag} {country.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-faded)] pointer-events-none" />
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeRole(member.id)}
                    className="sm:w-8 flex items-center justify-center text-[var(--color-ink-faded)] hover:text-red-500 transition-colors"
                    disabled={team.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addRole}
              className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[var(--color-ink-secondary)] border border-dashed border-[var(--color-border-canon-strong)] rounded-md hover:border-[var(--color-ink-primary)] hover:text-[var(--color-ink-primary)] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Role
            </button>
          </div>

          {/* Results */}
          {team.length > 0 && (
            <div className="max-w-3xl mx-auto">
              {/* Summary Cards — accent purple on "You Save" for the wow moment */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-[var(--color-surface-subtle)] border border-[var(--color-border-canon)] rounded-2xl p-5">
                  <p className="text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em] mb-1">
                    US Cost
                  </p>
                  <p className="font-medium text-2xl text-[var(--color-ink-primary)] tracking-tight">
                    {formatCurrencyShort(results.totalUS)}
                  </p>
                  <p className="text-xs text-[var(--color-ink-faded)] mt-1">per year</p>
                </div>
                <div className="bg-[var(--color-surface-subtle)] border border-[var(--color-border-canon)] rounded-2xl p-5">
                  <p className="text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em] mb-1">
                    Remote Cost
                  </p>
                  <p className="font-medium text-2xl text-[var(--color-ink-primary)] tracking-tight">
                    {formatCurrencyShort(results.totalOffshore)}
                  </p>
                  <p className="text-xs text-[var(--color-ink-faded)] mt-1">per year</p>
                </div>
                <div className="bg-[var(--color-accent-primary)] rounded-2xl p-5">
                  <p className="text-[11px] font-[var(--font-geist-mono)] text-white/60 uppercase tracking-[0.22em] mb-1">
                    You Save
                  </p>
                  <p className="font-medium text-2xl text-white tracking-tight">
                    {formatCurrencyShort(results.totalSavings)}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    {results.totalSavingsPercent}% less per year
                  </p>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="bg-[var(--color-surface-subtle)] border border-[var(--color-border-canon)] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--color-border-canon)]">
                        <th className="text-left px-5 py-3 text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em]">
                          Role
                        </th>
                        <th className="text-left px-5 py-3 text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em]">
                          Region
                        </th>
                        <th className="text-right px-5 py-3 text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em]">
                          US Salary
                        </th>
                        <th className="text-right px-5 py-3 text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em]">
                          Remote
                        </th>
                        <th className="text-right px-5 py-3 text-[11px] font-[var(--font-geist-mono)] text-[var(--color-ink-faded)] uppercase tracking-[0.22em]">
                          Savings
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.breakdown.map((row) => (
                        <tr
                          key={row.id}
                          className="border-b border-[var(--color-border-canon-subtle)] last:border-0"
                        >
                          <td className="px-5 py-3 text-[var(--color-ink-primary)] font-medium">
                            {row.count > 1 && (
                              <span className="text-[var(--color-ink-faded)] mr-1">
                                {row.count}x
                              </span>
                            )}
                            {row.role}
                          </td>
                          <td className="px-5 py-3 text-[var(--color-ink-secondary)]">
                            {row.country?.flag} {row.country?.label}
                          </td>
                          <td className="px-5 py-3 text-right text-[var(--color-ink-secondary)]">
                            {formatCurrency(row.usTotal)}
                          </td>
                          <td className="px-5 py-3 text-right text-[var(--color-ink-secondary)]">
                            {formatCurrency(row.offshoreTotal)}
                          </td>
                          <td className="px-5 py-3 text-right font-medium text-[var(--color-ink-primary)]">
                            {formatCurrency(row.savings)}
                            <span className="text-[var(--color-ink-faded)] text-xs ml-1">
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
                <p className="text-[var(--color-ink-secondary)] mb-4">
                  Want to find A-player talent in these regions without the guesswork?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a href="/remote-hiring-playbook">
                    <Button variant="secondary" size="lg">
                      Get The Free Playbook
                    </Button>
                  </a>
                  <a href="https://yander.ai">
                    <Button variant="accent" size="lg">
                      Join The Yander Waitlist
                    </Button>
                  </a>
                </div>
                <p className="text-xs text-[var(--color-ink-faded)] mt-6 max-w-lg mx-auto leading-relaxed">
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
