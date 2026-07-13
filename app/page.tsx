import Image from 'next/image'
import Link from 'next/link'
import {
  Anchor,
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  CircleCheck,
  Compass,
  GraduationCap,
  LifeBuoy,
  Menu,
  Sailboat,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const NAVIGATION = [
  { label: 'Funkcje', href: '#funkcje' },
  { label: 'Jak to działa', href: '#jak-to-dziala' },
  { label: 'Dla szkół', href: '#dla-szkol' },
  { label: 'Cennik', href: '#cennik' },
]

const FEATURES = [
  {
    icon: Users,
    title: 'Zarządzanie kursantami',
    description:
      'Dodawaj uczniów, przypisuj ich do grup i obserwuj postępy z jednego panelu.',
  },
  {
    icon: BookOpen,
    title: 'Materiały szkoleniowe',
    description:
      'Udostępniaj lekcje, quizy oraz własne materiały dopasowane do programu szkoły.',
  },
  {
    icon: BarChart3,
    title: 'Raporty i postępy',
    description:
      'Sprawdzaj wyniki, aktywność oraz obszary, które wymagają dodatkowej pracy.',
  },
  {
    icon: GraduationCap,
    title: 'Przygotowanie do egzaminu',
    description:
      'Kursanci ćwiczą na pytaniach egzaminacyjnych i widzą swoją gotowość.',
  },
  {
    icon: ShieldCheck,
    title: 'Kontrola dostępu',
    description:
      'Zarządzaj rolami instruktorów, administratorów i uczniów swojej szkoły.',
  },
  {
    icon: Sparkles,
    title: 'Własny branding',
    description:
      'Dostosuj platformę do identyfikacji swojej szkoły i buduj spójne doświadczenie.',
  },
]

const STEPS = [
  {

    title: 'Zakładasz konto szkoły',
    description:
      'Konfigurujesz profil, dane placówki i dostęp dla instruktorów.',
  },
  {

    title: 'Zapraszasz kursantów',
    description:
      'Uczniowie dołączają za pomocą bezpośredniego zaproszenia.',
  },
  {

    title: 'Śledzisz postępy',
    description:
      'Otrzymujesz czytelne raporty i wiesz, kto jest gotowy do egzaminu.',
  },
]

const SCHOOL_BENEFITS = [
  'Mniej ręcznego sprawdzania wyników',
  'Jedno miejsce dla instruktorów i uczniów',
  'Automatyczne raporty postępów',
  'Materiały dostępne przez całą dobę',
  'Szybsze przygotowanie do egzaminu',
  'Profesjonalny wizerunek szkoły',
]

const FAQ = [
  {
    question: 'Czy Helmio zastępuje zajęcia z instruktorem?',
    answer:
      'Nie. Helmio uzupełnia szkolenie prowadzone przez instruktora. Platforma pomaga kursantom utrwalać wiedzę, rozwiązywać quizy i przygotowywać się do egzaminu.',
  },
  {
    question: 'Jak uczniowie dołączają do szkoły?',
    answer:
      'Każda szkoła otrzymuje własny kod lub link zaproszeniowy. Po rejestracji kursant zostaje automatycznie przypisany do właściwej placówki.',
  },
  {
    question: 'Czy możemy dodać własne materiały?',
    answer:
      'Tak. Administrator szkoły może publikować własne lekcje, pliki, pytania oraz dodatkowe materiały dla wybranych grup.',
  },
  {
    question: 'Czy platforma działa na telefonach?',
    answer:
      'Tak. Kursanci korzystają z aplikacji mobilnej, natomiast szkoły i instruktorzy zarządzają szkoleniami poprzez panel internetowy.',
  },
]

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7FBFD] text-[#163A59]">
      <Navbar />

      <section className="relative isolate overflow-hidden px-4 pb-24 pt-16 sm:px-6 lg:px-8 lg:pb-32 lg:pt-24">
        <HeroDecoration />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-2xl">


            <h1 className="text-balance text-5xl font-light tracking-[-0.04em] text-[#163A59] sm:text-6xl lg:text-7xl">
              Nowoczesna platforma edukacyjna
              <span className="block text-[#4C8DD8]">
                Dla szkół żeglarskich
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-pretty text-lg font-light leading-8 text-[#5A7A95] sm:text-xl">
              Zarządzaj kursantami, materiałami i wynikami egzaminacyjnymi
              w jednym miejscu. Helmio łączy panel dla szkoły z aplikacją
              mobilną dla uczniów.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button

                size="lg"
                className="h-13 rounded-2xl bg-[#4C8DD8] px-7 text-base font-medium text-white hover:bg-[#397CC9]"
              >
                <Link href="/register">
                  Rozpocznij bezpłatnie

                </Link>
              </Button>

              <Button

                variant="outline"
                size="lg"
                className="h-13 rounded-2xl border-[#D0E8F0] bg-white px-7 text-base font-semibold text-[#163A59] hover:bg-[#EEF7FA]"
              >
                <Link href="#demo">Zobacz platformę</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#5A7A95]">
              <TrustItem text="Bez karty płatniczej" />
              <TrustItem text="Konfiguracja w kilka minut" />
              <TrustItem text="Wsparcie przy wdrożeniu" />
            </div>
          </div>

          <HeroPreview />
        </div>
      </section>

      <section className="border-y border-[#E3EFF4] bg-white/75 px-4 py-8 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-center text-sm mx-auto font-semibold uppercase tracking-widest  text-[#7C98AB] md:text-left">
            Wszystko, czego potrzebuje nowoczesna szkoła
          </p>


        </div>
      </section>

      <section
        id="funkcje"
        className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow=""
            title="Cała szkoła w jednym miejscu"
            description="Helmio porządkuje codzienną pracę szkoły, pozwalając instruktorom skupić się na szkoleniu, a nie na ręcznej administracji."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon

              return (
                <Card
                  key={feature.title}
                  className="group rounded-[28px] border-[#DDECF2] bg-white/85 shadow-[0_16px_50px_rgba(33,78,110,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[#B4E1EB] hover:shadow-[0_22px_60px_rgba(33,78,110,0.1)]"
                >
                  <CardHeader className="p-7 pb-4">
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#E3F2F8] text-[#4C8DD8] transition group-hover:bg-[#4C8DD8] group-hover:text-white">
                      <Icon className="size-6" />
                    </div>

                    <CardTitle className="text-xl text-[#163A59]">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-7 pb-7">
                    <CardDescription className="text-base leading-7 text-[#68859A]">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section
        id="demo"
        className="relative px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="absolute inset-0 -z-10 bg-[#EAF5F9]" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>

            <h2 className="text-balance text-4xl font-extrabold tracking-[-0.03em] text-[#163A59] sm:text-5xl">
              Pełna kontrola bez skomplikowanych narzędzi
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5A7A95]">
              Panel został zaprojektowany tak, aby instruktor od razu widział
              najważniejsze informacje: aktywność kursantów, postępy, wyniki
              quizów i najbliższe działania.
            </p>

            <div className="mt-8 space-y-4">
              <FeatureLine text="Przejrzysty dashboard szkoły" />
              <FeatureLine text="Raporty uczniów i grup szkoleniowych" />
              <FeatureLine text="Zarządzanie materiałami oraz quizami" />
              <FeatureLine text="Eksport wyników i danych kursantów" />
            </div>

            <Button

              variant="link"
              className="mt-7 h-auto p-0 text-base font-semibold text-[#397CC9]"
            >
              <Link href="/demo" className='flex items-center justify-center '>
                Poznaj panel szkoły
                <ChevronRight className="ml-1 size-5" />
              </Link>
            </Button>
          </div>

          <DashboardPreview />
        </div>
      </section>

      <section
        id="jak-to-dziala"
        className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow=""
            title="Uruchom szkołę w trzech krokach"
            description="Nie potrzebujesz działu IT. Konfiguracja platformy jest szybka, a przy wdrożeniu otrzymujesz nasze wsparcie."
          />

          <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-[#CDE4EE] lg:block" />

            {STEPS.map((step) => (
              <div
                key={step.title}
                className="relative rounded-[28px] border border-[#DDECF2] bg-white p-7 shadow-[0_14px_45px_rgba(33,78,110,0.05)]"
              >


                <h3 className="text-2xl font-bold text-[#163A59]">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-[#68859A]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section
        id="dla-szkol"
        className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[36px] bg-[#286DAB] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[460px] overflow-hidden bg-[#BDE3F1] p-8 sm:p-12">
            <div className="absolute -bottom-16 -left-16 size-72 rounded-full bg-[#78A4CB]/35" />
            <div className="absolute -right-10 top-12 size-52 rounded-full border-[34px] border-[#F9E8A2]/45" />

            <div className="relative flex h-full flex-col justify-between">

              <div className="mt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#3977A8]">
                  Rozwijaj swoją szkołę
                </p>
                <h2 className="mt-3 max-w-lg text-4xl font-extrabold tracking-[-0.03em] text-[#163A59] sm:text-5xl">
                  Technologia, która wspiera instruktorów
                </h2>
              </div>

              <div className="mt-10 flex items-center gap-3 text-[#3977A8]">
                <Sailboat className="size-10" />
                <Waves className="size-10" />
                <Anchor className="size-10" />
              </div>
            </div>
          </div>

          <div className="p-8 text-white sm:p-12 lg:p-14">
            <Badge className="mb-6 rounded-full bg-white/12 px-4 py-2 text-white hover:bg-white/12">
              Dla szkół żeglarskich
            </Badge>

            <h3 className="text-3xl font-extrabold sm:text-4xl">
              Mniej administracji. Więcej dobrego szkolenia.
            </h3>

            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              Helmio pomaga uporządkować proces szkoleniowy od pierwszego
              kontaktu z kursantem aż do egzaminu.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {SCHOOL_BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-[#F9E8A2]" />
                  <span className="leading-6 text-white/90">{benefit}</span>
                </div>
              ))}
            </div>

            <Button

              size="lg"
              className="mt-10 rounded-2xl bg-white px-7 font-semibold text-[#286DAB] hover:bg-[#F4FAFC]"
            >
              <Link href="/register">
                Załóż konto szkoły

              </Link>
            </Button>
          </div>
        </div>
      </section> */}

      <section
        id="cennik"
        className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow=""
            title="Zacznij bez kosztownego wdrożenia"
            description="Jedna subskrypcja dla całej szkoły. Bez skomplikowanych pakietów i ukrytych opłat."
          />

          <Card className="relative mt-14 overflow-hidden rounded-[36px] border-[#CFE5EE] bg-white shadow-[0_24px_80px_rgba(33,78,110,0.1)]">
            <div className="absolute right-0 top-0 h-full w-56 bg-gradient-to-l from-[#E1F2F8] to-transparent" />

            <CardContent className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
              <div>


                <h3 className="text-3xl font-extrabold text-[#163A59]">
                  Wszystkie funkcje w jednym planie
                </h3>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {[
                    'Nielimitowani instruktorzy',
                    'Zarządzanie kursantami',
                    'Raporty i analityka',
                    'Własne materiały',
                    'Aplikacja mobilna ucznia',
                    'Wsparcie techniczne',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-[#5A7A95]"
                    >
                      <Check className="size-5 text-[#4C8DD8]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-64 rounded-[28px] bg-[#F0F7FA] p-7 text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#7C98AB]">
                  Od
                </p>

                <div className="mt-2">
                  <span className="text-5xl font-extrabold text-[#163A59]">
                    199 zł
                  </span>
                  <span className="text-[#68859A]"> / miesiąc</span>
                </div>

                <p className="mt-3 text-sm text-[#7C98AB]">
                  Cena zależna od liczby aktywnych kursantów
                </p>

                <Button

                  className="mt-6 w-full rounded-2xl bg-[#4C8DD8] hover:bg-[#397CC9]"
                >
                  <Link href="/register">Rozpocznij test</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow=""
            title="Najczęściej zadawane pytania"
            description="Najważniejsze informacje przed rozpoczęciem korzystania z platformy."
          />

          <Accordion
            className="mt-12 space-y-3"
          >
            {FAQ.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="rounded-2xl  border-[#DDECF2] bg-white px-6 shadow-[1px]"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-[#163A59] hover:no-underline">
                  {item.question}
                </AccordionTrigger>

                <AccordionContent className="pb-5 leading-7 text-[#68859A]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#163A59] px-7 py-14 text-center text-white sm:px-12 lg:py-20">
          <div className="absolute -left-20 -top-24 size-80 rounded-full bg-[#4C8DD8]/25" />
          <div className="absolute -bottom-32 -right-20 size-96 rounded-full border-[55px] border-[#B4E1EB]/10" />

          <div className="relative mx-auto max-w-3xl">


            <h2 className="mt-6 text-balance text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
              Gotowi wprowadzić szkolenia na nowy poziom?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Dołącz do szkół, które chcą lepiej organizować szkolenia
              i skuteczniej przygotowywać kursantów do egzaminów.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-2xl bg-white px-7 font-semibold text-[#163A59] hover:bg-[#EFF7FA]"
              >
                <Link href="/register">
                  Rozpocznij bezpłatnie

                </Link>
              </Button>

              <Button

                size="lg"
                variant="outline"
                className="rounded-2xl border-white/25 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Umów prezentację</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E4EFF4]/80 bg-[#F7FBFD]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">


          <span className="text-xl font-extrabold tracking-tight text-[#163A59]">
            Helmio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#5A7A95] transition hover:text-[#163A59]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Button

            variant="ghost"
            className="rounded-xl text-[#163A59]"
          >
            <Link href="/login">Zaloguj się</Link>
          </Button>

          <Button

            className="rounded-xl bg-[#4C8DD8] px-5 hover:bg-[#397CC9]"
          >
            <Link href="/register">Załóż konto szkoły</Link>
          </Button>
        </div>

        <Button
          size="icon"
          variant="outline"
          className="rounded-xl border-[#D0E8F0] sm:hidden"
        >
          <Menu className="size-5" />
          <span className="sr-only">Otwórz menu</span>
        </Button>
      </div>
    </header>
  )
}

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[590px]">
      <div className="absolute -left-12 top-20 size-44 rounded-full bg-[#B4E1EB]/45 blur-3xl" />
      <div className="absolute -right-8 bottom-12 size-52 rounded-full bg-[#F9E8A2]/35 blur-3xl" />

      <div className="relative rounded-[36px] border border-white/80 bg-white/80 p-3 shadow-[0_40px_100px_rgba(33,78,110,0.18)] backdrop-blur">
        <div className="overflow-hidden rounded-[28px] border border-[#E1EDF2] bg-white">
          <div className="flex items-center justify-between border-b border-[#E5EFF3] px-5 py-4">
            <div className="flex items-center gap-3">


              <div>
                <p className="text-sm font-bold text-[#163A59]">
                  Szkoła Błękitna Fala
                </p>
                <p className="text-xs text-[#7C98AB]">Panel administratora</p>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-[86px_1fr]">
            <div className="border-r border-[#E5EFF3] bg-[#F7FBFD] p-3">
              <div className="mb-5 h-9 rounded-xl bg-[#DCEEF6]" />

              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className={`h-8 rounded-lg ${item === 1 ? 'bg-[#4C8DD8]' : 'bg-[#EAF3F7]'
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="h-3 w-24 rounded bg-[#D6E7EE]" />
                  <div className="mt-2 h-6 w-40 rounded bg-[#163A59]/90" />
                </div>

                <div className="h-9 w-28 rounded-xl bg-[#4C8DD8]" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  ['128', 'Kursantów'],
                  ['82%', 'Śr. wynik egzaminów'],
                  ['14', 'Grup'],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#E1EDF2] bg-[#F8FBFC] p-4"
                  >
                    <div className="text-xl font-extrabold text-[#163A59]">
                      {value}
                    </div>
                    <div className="mt-1 text-[10px] text-[#7C98AB]">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-[#E1EDF2] p-4">
                <div className="mb-6 flex items-center justify-between">
                  <div className="h-4 w-32 rounded bg-[#D7E7ED]" />
                  <div className="h-4 w-14 rounded bg-[#E7F1F5]" />
                </div>

                <div className="flex h-32 items-end gap-2">
                  {[34, 56, 44, 70, 58, 88, 76, 92].map((height, index) => (
                    <div
                      key={`${height}-${index}`}
                      className="flex-1 rounded-t-lg bg-[#B4E1EB]"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-[1.25fr_0.75fr] gap-3">
                <div className="rounded-2xl border border-[#E1EDF2] p-4">
                  <div className="mb-3 h-4 w-28 rounded bg-[#D7E7ED]" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl bg-[#F7FAFC] p-2"
                      >
                        <div className="size-7 rounded-full bg-[#D6ECF6]" />
                        <div className="h-3 flex-1 rounded bg-[#DFEBF0]" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center rounded-2xl bg-[#EAF5F9]">
                  <div className="flex size-20 items-center justify-center rounded-full border-[12px] border-[#4C8DD8] text-sm font-bold text-[#163A59]">
                    82%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="absolute -bottom-8 -left-6 hidden w-56 rounded-2xl border-[#DDECF2] bg-white/95 shadow-xl backdrop-blur sm:block">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#E2F2F7] text-[#4C8DD8]">
            <CircleCheck className="size-5" />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#163A59]">
              12 osób gotowych
            </p>
            <p className="text-xs text-[#7C98AB]">do egzaminu</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-8 rounded-[48px] bg-[#B4E1EB]/35 blur-3xl" />

      <div className="relative rounded-[34px] border border-white bg-white p-3 shadow-[0_30px_90px_rgba(33,78,110,0.16)]">
        <div className="overflow-hidden rounded-[26px] border border-[#DDECF2]">
          <div className="flex h-14 items-center gap-2 border-b border-[#E3EDF2] bg-[#F9FCFD] px-5">
            <div className="size-2.5 rounded-full bg-[#F2B7B7]" />
            <div className="size-2.5 rounded-full bg-[#F9DCA0]" />
            <div className="size-2.5 rounded-full bg-[#B4E1C4]" />

            <div className="ml-4 h-7 flex-1 rounded-lg bg-white shadow-sm" />
          </div>

          <div className="grid min-h-[430px] grid-cols-[150px_1fr] bg-white">
            <div className="border-r border-[#E3EDF2] bg-[#F7FBFD] p-4">
              <div className="mb-7 flex items-center gap-2">
                <div className="size-8 rounded-xl bg-[#4C8DD8]" />
                <div className="h-4 w-16 rounded bg-[#163A59]" />
              </div>

              <div className="space-y-3">
                {['Dashboard', 'Kursanci', 'Grupy', 'Materiały', 'Raporty'].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`rounded-xl px-3 py-2 text-xs ${index === 0
                        ? 'bg-[#4C8DD8] font-semibold text-white'
                        : 'text-[#68859A]'
                        }`}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#7C98AB]">Dzień dobry</div>
                  <div className="mt-1 font-bold text-[#163A59]">
                    Szkoła Błękitna Fala
                  </div>
                </div>

                <div className="h-9 w-24 rounded-xl bg-[#4C8DD8]" />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {['Kursanci', 'Aktywne grupy', 'Średni wynik'].map(
                  (item, index) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-[#E3EDF2] p-3"
                    >
                      <div className="text-xl font-bold text-[#163A59]">
                        {index === 0 ? '128' : index === 1 ? '14' : '82%'}
                      </div>
                      <div className="mt-1 text-[10px] text-[#7C98AB]">
                        {item}
                      </div>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-4 rounded-2xl border border-[#E3EDF2] p-4">
                <div className="text-xs font-semibold text-[#163A59]">
                  Aktywność kursantów
                </div>

                <div className="mt-6 flex h-28 items-end gap-2">
                  {[40, 52, 48, 70, 64, 85, 72].map((height, index) => (
                    <div
                      key={`${height}-${index}`}
                      className="flex-1 rounded-t-md bg-[#78A4CB]"
                      style={{ height: `${height}%`, opacity: 0.45 + index * 0.07 }}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#E3EDF2] p-4">
                  <div className="mb-3 text-xs font-semibold text-[#163A59]">
                    Ostatni kursanci
                  </div>

                  <div className="space-y-2">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-lg bg-[#F7FAFC] p-2"
                      >
                        <div className="size-6 rounded-full bg-[#B4E1EB]" />
                        <div className="h-2.5 flex-1 rounded bg-[#DCE9EE]" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#EAF5F9]">
                  <div className="flex size-20 items-center justify-center rounded-full border-[10px] border-[#4C8DD8] text-sm font-bold text-[#163A59]">
                    82%
                  </div>
                  <div className="mt-3 text-[10px] text-[#68859A]">
                    gotowość do egzaminu
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4C8DD8]">
        {eyebrow}
      </p>

      <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-[-0.03em] text-[#163A59] sm:text-5xl">
        {title}
      </h2>

      <p className="mt-5 text-pretty text-lg leading-8 text-[#68859A]">
        {description}
      </p>
    </div>
  )
}

function TrustItem({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2">
      <Check className="size-4 text-[#4C8DD8]" />
      {text}
    </span>
  )
}

function FeatureLine({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-7 items-center justify-center rounded-full bg-[#D3EAF4]">
        <Check className="size-4 text-[#3977A8]" />
      </div>

      <span className="font-medium text-[#385B73]">{text}</span>
    </div>
  )
}

function HeroDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -left-36 top-20 size-[420px] rounded-full bg-[#CBEAF3]/50 blur-3xl" />
      <div className="absolute -right-40 top-32 size-[500px] rounded-full bg-[#DCEFF7]/70 blur-3xl" />

      <svg
        className="absolute bottom-0 left-0 right-0 h-56 w-full text-[#B4E1EB]/25"
        viewBox="0 0 1440 300"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200C180 120 300 250 500 175C700 100 800 220 1000 150C1180 85 1290 190 1440 120V300H0V200Z"
          fill="currentColor"
        />
        <path
          d="M0 235C180 165 340 280 520 215C730 140 870 255 1050 195C1210 140 1320 210 1440 165V300H0V235Z"
          fill="#78A4CB"
          opacity="0.12"
        />
      </svg>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#DDECF2] bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">


            <span className="text-xl font-extrabold text-[#163A59]">
              Helmio
            </span>
          </Link>

          <p className="mt-5 max-w-sm leading-7 text-[#68859A]">
            Platforma edukacyjna dla szkół żeglarskich i ich kursantów.
          </p>
        </div>

        <FooterColumn
          title="Produkt"
          links={['Funkcje', 'Cennik', 'Aplikacja mobilna', 'Aktualizacje']}
        />

        <FooterColumn
          title="Firma"
          links={['O nas', 'Kontakt', 'Partnerzy', 'Kariera']}
        />

        <FooterColumn
          title="Informacje"
          links={['Regulamin', 'Prywatność', 'Cookies', 'Pomoc']}
        />
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-[#E5EFF3] pt-7 text-sm text-[#7C98AB] sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Helmio. Wszystkie prawa zastrzeżone.</span>
        <span>Stworzone dla nowoczesnych szkół żeglarskich.</span>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: string[]
}) {
  return (
    <div>
      <h3 className="font-bold text-[#163A59]">{title}</h3>

      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="text-sm text-[#68859A] transition hover:text-[#4C8DD8]"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}