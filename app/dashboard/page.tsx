
"use client"

import Link from 'next/link'
import {
  Activity,
  Anchor,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  ClipboardCheck,
  Clock3,
  Compass,
  FileText,
  GraduationCap,
  MoreHorizontal,
  Plus,
  Sailboat,
  Search,
  Settings,
  ShipWheel,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Waves,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Progress } from '@/components/ui/progress'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getCurrentSchool } from '@/lib/school/get-current-school'


const stats = [
  {
    label: 'Aktywni kursanci',
    value: '128',
    change: '+12 w tym miesiącu',
    icon: Users,
    tone: 'blue',
  },
  {
    label: 'Aktywne grupy',
    value: '14',
    change: '3 nowe grupy',
    icon: GraduationCap,
    tone: 'aqua',
  },
  {
    label: 'Średni wynik',
    value: '82%',
    change: '+6% względem maja',
    icon: TrendingUp,
    tone: 'cream',
  },
  {
    label: 'Gotowi do egzaminu',
    value: '36',
    change: '8 wymaga powtórki',
    icon: ClipboardCheck,
    tone: 'navy',
  },
]

const recentStudents = [
  {
    name: 'Anna Kowalska',
    email: 'anna.kowalska@email.pl',
    course: 'Sternik motorowodny',
    progress: 86,
    initials: 'AK',
  },
  {
    name: 'Michał Nowak',
    email: 'michal.nowak@email.pl',
    course: 'Żeglarz jachtowy',
    progress: 72,
    initials: 'MN',
  },
  {
    name: 'Karolina Wójcik',
    email: 'karolina.wojcik@email.pl',
    course: 'Sternik motorowodny',
    progress: 94,
    initials: 'KW',
  },
  {
    name: 'Tomasz Lewandowski',
    email: 'tomasz.lewandowski@email.pl',
    course: 'Żeglarz jachtowy',
    progress: 61,
    initials: 'TL',
  },
]

const upcomingEvents = [
  {
    date: '18',
    month: 'CZE',
    title: 'Egzamin próbny',
    subtitle: 'Grupa weekendowa',
    time: '17:00',
  },
  {
    date: '21',
    month: 'CZE',
    title: 'Zajęcia teoretyczne',
    subtitle: 'Sternik motorowodny',
    time: '18:30',
  },
  {
    date: '24',
    month: 'CZE',
    title: 'Analiza wyników',
    subtitle: 'Spotkanie instruktorów',
    time: '09:00',
  },
]

const activity = [
  {
    icon: UserPlus,
    title: 'Dodano 4 nowych kursantów',
    description: 'Do grupy „Sternik — czerwiec”',
    time: '12 min temu',
  },
  {
    icon: CheckCircle2,
    title: 'Anna Kowalska ukończyła kurs',
    description: 'Wynik końcowy: 94%',
    time: '48 min temu',
  },
  {
    icon: FileText,
    title: 'Opublikowano nowy materiał',
    description: 'Znaki nawigacyjne — moduł 3',
    time: '2 godz. temu',
  },
]





export default function DashboardPage() {



  return (
    <div className="min-h-screen bg-[#F7FBFD] text-[#163A59]">

      <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <section className="relative mb-8 overflow-hidden rounded-[34px] bg-[#163A59] px-6 py-7 text-white sm:px-8 lg:px-10 lg:py-9">
          <div className="absolute -right-12 -top-28 size-80 rounded-full border-[44px] border-[#B4E1EB]/10" />
          <div className="absolute -bottom-28 left-[38%] size-72 rounded-full bg-[#4C8DD8]/15 blur-2xl" />

          <svg
            className="pointer-events-none absolute bottom-0 left-0 h-36 w-full"
            viewBox="0 0 1400 180"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0 110C170 45 330 160 520 100C725 35 865 145 1050 95C1200 55 1310 90 1400 70V180H0V110Z"
              fill="#78A4CB"
              opacity="0.18"
            />
            <path
              d="M0 145C190 90 350 180 560 130C780 80 920 160 1110 120C1240 90 1340 110 1400 105V180H0V145Z"
              fill="#B4E1EB"
              opacity="0.12"
            />
          </svg>

          <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Badge className="mb-4 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[#B4E1EB] hover:bg-white/10">
                <Waves className="mr-2 size-4" />
                Szkoła Błękitna Fala
              </Badge>



              <p className="mt-3 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
                Oto najważniejsze informacje o kursantach i szkoleniach
                w Twojej szkole.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button

                variant="outline"
                className="h-12 rounded-2xl border-white/15 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/dashboard/materials">
                  <BookOpen className="mr-2 size-5" />
                  Dodaj materiał
                </Link>
              </Button>

              <Button

                className="h-12 rounded-2xl bg-[#4C8DD8] px-5 font-semibold text-white hover:bg-[#397CC9]"
              >
                <Link href="/dashboard/students/new">
                  <UserPlus className="mr-2 size-5" />
                  Dodaj kursanta
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr_0.75fr]">
          <div className="space-y-6">
            <Card className="rounded-[30px] border-[#DDECF2] bg-white shadow-[0_16px_50px_rgba(33,78,110,0.06)]">
              <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-[#E8F1F5] px-6 py-5">
                <div>
                  <CardTitle className="text-xl text-[#163A59]">
                    Postęp kursantów
                  </CardTitle>
                  <CardDescription className="mt-1 text-[#7C98AB]">
                    Aktywność z ostatnich 7 dni
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  className="rounded-xl border-[#DDECF2] text-[#385B73]"
                >
                  Ostatnie 7 dni
                  <ChevronDown className="ml-2 size-4" />
                </Button>
              </CardHeader>

              <CardContent className="p-6">
                <ActivityChart />

                <div className="mt-6 grid gap-4 border-t border-[#E8F1F5] pt-5 sm:grid-cols-3">
                  <ChartMetric
                    label="Ukończone lekcje"
                    value="486"
                    icon={<BookOpen />}
                  />
                  <ChartMetric
                    label="Rozwiązane quizy"
                    value="1 248"
                    icon={<ClipboardCheck />}
                  />
                  <ChartMetric
                    label="Czas nauki"
                    value="392 h"
                    icon={<Clock3 />}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[30px] border-[#DDECF2] bg-white shadow-[0_16px_50px_rgba(33,78,110,0.06)]">
              <CardHeader className="flex flex-row items-center justify-between border-b border-[#E8F1F5] px-6 py-5">
                <div>
                  <CardTitle className="text-xl text-[#163A59]">
                    Ostatni kursanci
                  </CardTitle>
                  <CardDescription className="mt-1 text-[#7C98AB]">
                    Najnowsze osoby przypisane do szkoły
                  </CardDescription>
                </div>

                <Button

                  variant="ghost"
                  className="rounded-xl text-[#397CC9] hover:bg-[#EEF7FA] hover:text-[#286DAB]"
                >
                  <Link href="/dashboard/students">
                    Zobacz wszystkich
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardHeader>

              <CardContent className="p-0">
                <div className="divide-y divide-[#E8F1F5]">
                  {recentStudents.map((student) => (
                    <StudentRow key={student.email} {...student} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="overflow-hidden rounded-[30px] border-[#DDECF2] bg-white shadow-[0_16px_50px_rgba(33,78,110,0.06)]">
              <div className="bg-[#D9EEF7] px-6 py-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-3 rounded-full bg-white/70 text-[#3977A8] hover:bg-white/70">
                      Gotowość do egzaminu
                    </Badge>

                    <h2 className="text-2xl font-extrabold text-[#163A59]">
                      82% średniej gotowości
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#5A7A95]">
                      36 kursantów osiągnęło wymagany próg.
                    </p>
                  </div>

                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white/70 text-[#4C8DD8]">
                    <ShipWheel className="size-7" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-center">
                  <ReadinessCircle value={82} />
                </div>

                <div className="mt-6 space-y-3">
                  <ReadinessRow
                    label="Gotowi"
                    value="36"
                    color="bg-[#4C8DD8]"
                  />
                  <ReadinessRow
                    label="W trakcie"
                    value="74"
                    color="bg-[#B4E1EB]"
                  />
                  <ReadinessRow
                    label="Wymagają uwagi"
                    value="18"
                    color="bg-[#F9E8A2]"
                  />
                </div>

                <Button

                  className="mt-6 h-12 w-full rounded-2xl bg-[#163A59] hover:bg-[#214C6D]"
                >
                  <Link href="/dashboard/reports">
                    Zobacz raport gotowości
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[30px] border-[#DDECF2] bg-white shadow-[0_16px_50px_rgba(33,78,110,0.06)]">
              <CardHeader className="flex flex-row items-center justify-between px-6 pb-3 pt-6">
                <div>
                  <CardTitle className="text-xl text-[#163A59]">
                    Nadchodzące
                  </CardTitle>
                  <CardDescription className="mt-1 text-[#7C98AB]">
                    Najbliższe wydarzenia
                  </CardDescription>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-xl text-[#68859A]"
                >
                  <CalendarDays className="size-5" />
                </Button>
              </CardHeader>

              <CardContent className="space-y-3 p-6 pt-3">
                {upcomingEvents.map((event) => (
                  <EventRow key={`${event.date}-${event.title}`} {...event} />
                ))}

                <Button
                  variant="outline"
                  className="mt-2 h-11 w-full rounded-xl border-[#DDECF2] text-[#385B73]"
                >
                  Otwórz kalendarz
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-[30px] border-[#DDECF2] bg-white shadow-[0_16px_50px_rgba(33,78,110,0.06)]">
              <CardHeader className="px-6 pb-3 pt-6">
                <CardTitle className="text-xl text-[#163A59]">
                  Ostatnia aktywność
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5 p-6 pt-3">
                {activity.map((item) => {
                  const Icon = item.icon

                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#E4F2F7] text-[#4C8DD8]">
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#163A59]">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-[#68859A]">
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs text-[#9BBCCE]">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}



function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone,
}: {
  label: string
  value: string
  change: string
  icon: React.ElementType
  tone: string
}) {
  const tones: Record<string, string> = {
    blue: 'bg-[#E1F2F8] text-[#397CC9]',
    aqua: 'bg-[#E3F4F4] text-[#4B9EA4]',
    cream: 'bg-[#FFF5CC] text-[#AA8420]',
    navy: 'bg-[#E4EAF0] text-[#163A59]',
  }

  return (
    <Card className="rounded-[26px] border-[#DDECF2] bg-white shadow-[0_14px_40px_rgba(33,78,110,0.05)]">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={`flex size-11 items-center justify-center rounded-2xl ${tones[tone]}`}>
            <Icon className="size-5" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger >
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-xl text-[#9BBCCE]"
              >
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Zobacz szczegóły</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="mt-5 text-sm font-medium text-[#7C98AB]">{label}</p>
        <p className="mt-1 text-3xl font-extrabold tracking-tight text-[#163A59]">
          {value}
        </p>
        <p className="mt-2 text-xs text-[#5A7A95]">{change}</p>
      </CardContent>
    </Card>
  )
}

function ActivityChart() {
  const bars = [42, 58, 51, 71, 64, 82, 76, 92, 70, 86, 95, 88]

  return (
    <div>
      <div className="flex h-64 items-end gap-2 sm:gap-3">
        {bars.map((height, index) => (
          <div key={`${height}-${index}`} className="flex h-full flex-1 items-end">
            <div
              className={`w-full rounded-t-xl ${index === bars.length - 1
                ? 'bg-[#4C8DD8]'
                : 'bg-[#B4E1EB]'
                }`}
              style={{ height: `${height}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-between text-[11px] text-[#9BBCCE]">
        <span>Pon</span>
        <span>Wt</span>
        <span>Śr</span>
        <span>Czw</span>
        <span>Pt</span>
        <span>Sob</span>
        <span>Ndz</span>
      </div>
    </div>
  )
}

function ChartMetric({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-2xl bg-[#EAF5F9] text-[#4C8DD8] [&_svg]:size-5">
        {icon}
      </div>

      <div>
        <p className="text-lg font-bold text-[#163A59]">{value}</p>
        <p className="text-xs text-[#7C98AB]">{label}</p>
      </div>
    </div>
  )
}

function StudentRow({
  name,
  email,
  course,
  progress,
  initials,
}: {
  name: string
  email: string
  course: string
  progress: number
  initials: string
}) {
  return (
    <div className="grid gap-4 px-6 py-5 transition hover:bg-[#FAFCFD] sm:grid-cols-[1.2fr_1fr_0.8fr_auto] sm:items-center">
      <div className="flex items-center gap-3">
        <Avatar className="size-11">
          <AvatarFallback className="bg-[#D9EEF7] font-bold text-[#3977A8]">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="font-semibold text-[#163A59]">{name}</p>
          <p className="text-xs text-[#7C98AB]">{email}</p>
        </div>
      </div>

      <p className="text-sm text-[#5A7A95]">{course}</p>

      <div>
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-[#7C98AB]">Postęp</span>
          <span className="font-semibold text-[#397CC9]">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-[#E6EEF2]" />
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="rounded-xl text-[#9BBCCE]"
      >
        <MoreHorizontal className="size-5" />
      </Button>
    </div>
  )
}

function ReadinessCircle({ value }: { value: number }) {
  return (
    <div className="relative flex size-44 items-center justify-center rounded-full bg-[#EFF7FA]">
      <div className="absolute inset-3 rounded-full border-[14px] border-[#D7EAF2]" />
      <div
        className="absolute inset-3 rounded-full border-[14px] border-[#4C8DD8] border-l-transparent"
        style={{ transform: `rotate(${value * 2.2}deg)` }}
      />
      <div className="relative text-center">
        <p className="text-4xl font-extrabold text-[#163A59]">{value}%</p>
        <p className="text-xs text-[#7C98AB]">średnia szkoły</p>
      </div>
    </div>
  )
}

function ReadinessRow({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#F8FBFC] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className={`size-2.5 rounded-full ${color}`} />
        <span className="text-sm text-[#5A7A95]">{label}</span>
      </div>

      <span className="font-bold text-[#163A59]">{value}</span>
    </div>
  )
}

function EventRow({
  date,
  month,
  title,
  subtitle,
  time,
}: {
  date: string
  month: string
  title: string
  subtitle: string
  time: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#E4EEF2] p-3">
      <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#E1F2F8]">
        <span className="text-lg font-extrabold leading-none text-[#286DAB]">
          {date}
        </span>
        <span className="mt-1 text-[10px] font-bold text-[#5A88B0]">
          {month}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[#163A59]">
          {title}
        </p>
        <p className="mt-1 truncate text-xs text-[#7C98AB]">{subtitle}</p>
      </div>

      <Badge
        variant="outline"
        className="rounded-lg border-[#D7E8EF] text-[#5A7A95]"
      >
        {time}
      </Badge>
    </div>
  )
}