import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import GlitchTitle from '../components/GlitchTitle'
import CrystalBall from '../components/CrystalBall'
import Whisper from '../components/Whisper'
import { databases, env } from '../lib/appwrite'
import TarotCard from "../components/TarotCard"

const whisperSrc = '/spookymagic.mp3'

interface Fortune {
  $id: string;
  title: string;
  body?: string;
  card?: string;
}

interface CardMeta {
  title: string;
  slug: string;
  file: string;
}

const ORDER_KEY  = "cursed:order:v1";
const CURSOR_KEY = "cursed:cursor:v1";
const SIG_KEY    = "cursed:sig:v1";

function shuffle<T>(arr: T[]) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const r = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
    const j = Math.floor(r * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [order, setOrder]       = useState<number[]>([]);
  const cursor                  = useRef(0);
  const [fortune, setFortune]   = useState<Fortune | null>(null);
  const [manifest, setManifest] = useState<CardMeta[]>([]);
  const [byTitle, setByTitle]   = useState<Map<string, string>>(new Map());
  const whisperKey = cursor.current;

  // Load manifest.json on app start
  useEffect(() => {
    async function loadCardManifest() {
      const res = await fetch('/cards/manifest.json');
      const manifest: CardMeta[] = await res.json();
      setManifest(manifest);
      setByTitle(new Map(manifest.map(m => [m.title.toLowerCase(), `/cards/${m.file}`])));
      manifest.forEach(m => {
        const img = new window.Image();
        img.src = `/cards/${m.file}`;
      });
    }
    loadCardManifest();
  }, []);

  // Load deck once and restore order/cursor if signature matches
  useEffect(() => {
    (async () => {
      const res  = await databases.listDocuments(env.dbId, env.collectionId);
      const docs = res.documents as unknown as Fortune[];
      if (!docs?.length) return;

      const sig = JSON.stringify(docs.map(d => d.$id)); // deck signature
      const savedSig = sessionStorage.getItem(SIG_KEY);

      let ord: number[] | null = null;
      let cur = 0;

      if (savedSig === sig) {
        try {
          const so = sessionStorage.getItem(ORDER_KEY);
          const sc = sessionStorage.getItem(CURSOR_KEY);
          if (so && sc) {
            const parsed = JSON.parse(so) as number[];
            if (parsed.length === docs.length) {
              ord = parsed;
              cur = Math.min(parseInt(sc, 10) || 0, parsed.length - 1);
            }
          }
        } catch { /* ignore */ }
      }

      if (!ord) {
        ord = shuffle([...Array(docs.length).keys()]);
        cur = 0;
        sessionStorage.setItem(SIG_KEY, sig);
      }

      setFortunes(docs);
      setOrder(ord);
      cursor.current = cur;
      setFortune(docs[ord[cur]]);
    })();
  }, []);

  // Persist order whenever it changes
  useEffect(() => {
    if (order.length) {
      sessionStorage.setItem(ORDER_KEY, JSON.stringify(order));
    }
  }, [order]);

  // Persist cursor on every reveal
  useEffect(() => {
    sessionStorage.setItem(CURSOR_KEY, String(cursor.current));
  }, [fortune]);

  async function draw() {
    if (!fortunes.length || !order.length) return;

    let next = cursor.current + 1;

    if (next >= order.length) {
      const fresh = shuffle(order);
      setOrder(fresh);
      cursor.current = 0;
      setFortune(fortunes[fresh[0]]);
      return;
    }

    cursor.current = next;
    setFortune(fortunes[order[next]]);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0614] text-purple-100 relative overflow-hidden">
      {/* Room background */}
      <img
        src="/room.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover -z-10"
        style={{ pointerEvents: "none" }}
      />
      {/* Optional dark overlay for mood */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 -z-10" />

      <nav className="p-4 md:p-6 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-wide hover:opacity-80">🔮 Cursed Fortune</Link>
        <div className="space-x-3">
          <Link to="/about" className="px-4 py-2 rounded-full border border-purple-300/40 hover:bg-purple-300/10 transition">About</Link>
          <a href="https://appwrite.io" target="_blank" className="px-4 py-2 rounded-full border border-purple-300/40 hover:bg-purple-300/10 transition">Built on Appwrite</a>
        </div>
      </nav>

      <main className="flex-1">
        {/* HERO */}
        <section className="relative grid place-items-center px-6 min-h-[80vh]">
          {/* your heading, crystal, etc */}
          <div className="text-center mt-4 space-y-4">
            <GlitchTitle text="Ask… if you dare" className="font-display" />
            <p className="text-purple-200/90 max-w-xl mx-auto">Touch the crystal and let the ether speak. A single draw. A chilling whisper. Your fate, unveiled.</p>
          </div>

          {/* Subtle grain overlay */}
          <div className="pointer-events-none fixed inset-0 opacity-[.06] mix-blend-overlay"
            style={{backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence baseFrequency='0.8' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.9'/></svg>\")"
            }} />

          <CrystalBall onClick={draw} />
          <Whisper src={whisperSrc} triggerKey={whisperKey} />

          {fortune && (
            <div className="mt-10 grid place-items-center gap-6">
              {(() => {
                const rawTitle = (fortune.card ?? fortune.title ?? '').trim();
                const rawSubtitle = (fortune.title ?? '').trim();
                const title = rawTitle || rawSubtitle || 'Unknown';
                const subtitle = rawSubtitle && rawSubtitle !== rawTitle ? rawSubtitle : '';
                const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
                const fallback = `/cards/${slugify(title)}.svg`;
                const img = byTitle.get(title.toLowerCase()) ?? fallback;
                return (
                  <TarotCard
                    title={title}
                    subtitle={subtitle}
                    image={img}
                    reversed={Math.random() < 0.4}
                  />
                );
              })()}
              <div className="max-w-xl p-6 rounded-2xl bg-white/5 backdrop-blur border border-purple-300/30 shadow-neon">
                <h3 className="text-2xl font-bold mb-2">{fortune.title}</h3>
                <p className="leading-relaxed">{fortune.message}</p>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-auto py-8 text-center opacity-80">
        © {new Date().getFullYear()} — A haunted site by Shaina
      </footer>
    </div>
  );
}

export default App;
