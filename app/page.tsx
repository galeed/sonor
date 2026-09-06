'use client'

import { useMemo, useState } from 'react'
import {
  ChevronDown,
  Clock3,
  Heart,
  ListMusic,
  MoreHorizontal,
  Pause,
  Play,
  Repeat2,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  SlidersHorizontal,
  Volume2,
  VolumeX,
} from 'lucide-react'

const tracks = [
  { title: 'Midnight City', artist: 'M83', album: 'Hurry Up, We’re Dreaming', time: '4:03', color: 'from-cyan-300 via-sky-500 to-indigo-700', glyph: 'M' },
  { title: 'Awake', artist: 'Tycho', album: 'Dive', time: '4:44', color: 'from-orange-300 via-pink-500 to-purple-700', glyph: 'A' },
  { title: 'Sunset Lover', artist: 'Petit Biscuit', album: 'Presence', time: '3:58', color: 'from-amber-300 via-orange-500 to-rose-700', glyph: 'S' },
  { title: 'Open Eye Signal', artist: 'Jon Hopkins', album: 'Immunity', time: '7:50', color: 'from-lime-200 via-emerald-500 to-teal-800', glyph: 'O' },
  { title: 'A Walk', artist: 'Tycho', album: 'Past Is Prologue', time: '5:19', color: 'from-violet-300 via-fuchsia-500 to-indigo-800', glyph: 'A' },
  { title: 'Kerala', artist: 'Bonobo', album: 'Migration', time: '3:49', color: 'from-yellow-200 via-green-500 to-cyan-800', glyph: 'K' },
]

function Cover({ track, large = false }: { track: (typeof tracks)[number]; large?: boolean }) {
  return (
    <div className={`cover relative overflow-hidden bg-gradient-to-br ${track.color} ${large ? 'size-52 sm:size-64' : 'size-12'}`}>
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_35%_30%,white_0_1px,transparent_1px),radial-gradient(circle_at_75%_70%,white_0_1px,transparent_1px)] [background-size:13px_13px,19px_19px]" />
      <div className={`absolute inset-0 flex items-center justify-center font-semibold text-white/80 ${large ? 'text-8xl tracking-[-0.12em]' : 'text-lg'}`}>{track.glyph}</div>
      {large && <div className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">Sonora / 004</div>}
    </div>
  )
}

export default function Page() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [liked, setLiked] = useState(false)
  const [muted, setMuted] = useState(false)
  const [progress, setProgress] = useState(38)
  const [volume, setVolume] = useState(72)
  const [activeTab, setActiveTab] = useState<'queue' | 'recent'>('queue')
  const track = tracks[current]
  const remaining = useMemo(() => tracks.filter((_, index) => index !== current), [current])

  const selectTrack = (index: number) => {
    setCurrent(index)
    setPlaying(true)
    setProgress(0)
  }
  const next = () => selectTrack((current + 1) % tracks.length)
  const previous = () => selectTrack((current - 1 + tracks.length) % tracks.length)

  return (
    <main className="min-h-screen bg-[#f5f5f1] text-[#171817] selection:bg-[#d8f75b]">
      <header className="flex items-center justify-between border-b border-black/10 px-5 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center gap-10">
          <a href="#" className="text-xl font-semibold tracking-[-0.05em]">sonora<span className="text-[#91b51d]">.</span></a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-black/50 md:flex" aria-label="Main navigation">
            <a className="text-black" href="#library">Library</a><a href="#explore">Explore</a><a href="#radio">Radio</a>
          </nav>
        </div>
        <div className="flex items-center gap-3 sm:gap-6">
          <button className="hidden items-center gap-2 text-sm text-black/45 transition hover:text-black sm:flex" aria-label="Search"><Search size={17} /> Search</button>
          <button className="flex size-9 items-center justify-center rounded-full bg-[#d8f75b] text-sm font-bold" aria-label="Open profile">JD</button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1380px] gap-10 px-5 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1fr_390px] lg:px-16 lg:py-16">
        <section id="library">
          <div className="mb-10 flex items-end justify-between">
            <div><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black/35">Now playing</p><h1 className="text-4xl font-medium tracking-[-0.07em] sm:text-6xl">Good evening, Jordan.</h1></div>
            <button className="hidden items-center gap-2 text-sm text-black/45 sm:flex"><SlidersHorizontal size={15} /> Filters</button>
          </div>

          <div className="grid items-center gap-10 border-b border-black/10 pb-12 sm:grid-cols-[auto_1fr] sm:gap-14">
            <Cover track={track} large />
            <div className="max-w-xl">
              <div className="mb-7 flex items-start justify-between gap-4"><div><p className="mb-2 text-sm text-black/45">{track.artist} · {track.album}</p><h2 className="text-4xl font-medium tracking-[-0.07em] sm:text-6xl">{track.title}</h2></div><button onClick={() => setLiked(!liked)} className="mt-1 rounded-full p-2 transition hover:bg-black/5" aria-label={liked ? 'Unlike track' : 'Like track'}>{liked ? <Heart fill="currentColor" className="text-[#91b51d]" /> : <Heart className="text-black/30" />}</button></div>
              <div className="mb-3 flex items-center gap-3 text-[11px] text-black/40"><span>1:32</span><div className="relative h-1 flex-1 rounded-full bg-black/10"><input aria-label="Track progress" type="range" min="0" max="100" value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="range absolute inset-0 w-full" /></div><span>{track.time}</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-5"><button onClick={previous} aria-label="Previous track" className="text-black/55 transition hover:text-black"><SkipBack fill="currentColor" /></button><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause' : 'Play'} className="flex size-14 items-center justify-center rounded-full bg-[#171817] text-[#f5f5f1] transition hover:scale-105">{playing ? <Pause fill="currentColor" /> : <Play fill="currentColor" />}</button><button onClick={next} aria-label="Next track" className="text-black/55 transition hover:text-black"><SkipForward fill="currentColor" /></button></div><div className="flex items-center gap-3"><button onClick={() => setMuted(!muted)} aria-label={muted ? 'Unmute' : 'Mute'} className="text-black/45">{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button><input aria-label="Volume" type="range" min="0" max="100" value={muted ? 0 : volume} onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false) }} className="volume-range hidden w-20 sm:block" /></div></div>
            </div>
          </div>

          <div className="mt-10"><div className="mb-5 flex items-center justify-between"><h3 className="text-xl font-medium tracking-[-0.04em]">Made for you</h3><button className="text-xs font-semibold text-black/40 hover:text-black">View all</button></div><div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">{tracks.slice(1, 4).map((item, i) => <button key={item.title} onClick={() => selectTrack(i + 1)} className="group text-left"><Cover track={item} large={false} /><div className="mt-3 text-sm font-medium">{item.title}</div><div className="mt-1 text-xs text-black/40">{item.artist}</div></button>)}</div></div>
        </section>

        <aside className="border-t border-black/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"><div className="mb-7 flex items-center justify-between"><div className="flex gap-6 text-sm font-medium"><button onClick={() => setActiveTab('queue')} className={activeTab === 'queue' ? 'border-b-2 border-[#91b51d] pb-2' : 'text-black/35'}>Up next</button><button onClick={() => setActiveTab('recent')} className={activeTab === 'recent' ? 'border-b-2 border-[#91b51d] pb-2' : 'text-black/35'}>Recently played</button></div><button aria-label="Playlist options" className="text-black/35"><MoreHorizontal size={18} /></button></div><div className="mb-6 flex items-center gap-3 rounded-xl bg-white/70 p-3"><Cover track={track} /><div className="min-w-0 flex-1"><div className="truncate text-sm font-medium">{track.title}</div><div className="mt-1 truncate text-xs text-black/40">{track.artist}</div></div><span className="text-xs text-black/35">{track.time}</span></div><div className="flex flex-col gap-1">{(activeTab === 'queue' ? remaining : [...tracks].reverse()).map((item) => { const index = tracks.indexOf(item); return <button key={item.title} onClick={() => selectTrack(index)} className="group flex items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/70"><span className="w-5 text-center text-xs text-black/25">{String(index + 1).padStart(2, '0')}</span><Cover track={item} /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{item.title}</span><span className="mt-1 block truncate text-xs text-black/40">{item.artist}</span></span><span className="text-xs text-black/30">{item.time}</span><ChevronDown className="hidden rotate-[-90deg] text-black/20 group-hover:block" size={15} /></button> })}</div><div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5 text-xs text-black/40"><span className="flex items-center gap-2"><ListMusic size={15} /> {tracks.length} songs</span><button className="flex items-center gap-2 hover:text-black"><Clock3 size={15} /> 29 min</button></div></aside>
      </div>

      <footer className="border-t border-black/10 px-5 py-5 sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1380px] items-center justify-between text-xs text-black/35"><span>© 2024 sonora audio</span><div className="flex gap-5"><button aria-label="Shuffle" className="hover:text-black"><Shuffle size={16} /></button><button aria-label="Repeat" className="hover:text-black"><Repeat2 size={16} /></button></div></div></footer>
    </main>
  )
}
