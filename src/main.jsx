import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Fuel, Gauge,
  Menu, MapPin, Search, ShieldCheck, Sparkles, Star, Users, X, LogIn, Mail, Lock, Eye, EyeOff, Facebook, Instagram, Twitter, Phone, Heart
} from "lucide-react";
import "./index.css";

const cars = [
  { id:1, name:"Mercedes-Benz C-Class", type:"Luxury", seats:5, fuel:"Petrol", transmission:"Automatic", price:89, rating:4.9, image:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85" },
  { id:2, name:"BMW 5 Series", type:"Executive", seats:5, fuel:"Hybrid", transmission:"Automatic", price:99, rating:4.8, image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85" },
  { id:3, name:"Porsche 911 Carrera", type:"Sports", seats:2, fuel:"Petrol", transmission:"Automatic", price:149, rating:5.0, image:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85" },
  { id:4, name:"Range Rover Sport", type:"SUV", seats:5, fuel:"Diesel", transmission:"Automatic", price:129, rating:4.9, image:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85" },
  { id:5, name:"Audi A6", type:"Executive", seats:5, fuel:"Petrol", transmission:"Automatic", price:92, rating:4.8, image:"https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85" },
  { id:6, name:"Tesla Model 3", type:"Electric", seats:5, fuel:"Electric", transmission:"Automatic", price:85, rating:4.7, image:"https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=85" }
];

function App() {
  const [menu, setMenu] = useState(false);
  const [location, setLocation] = useState("");
  const [pickup, setPickup] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searched, setSearched] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [signInOpen, setSignInOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [newsletter, setNewsletter] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [toast, setToast] = useState("");

  const filteredCars = useMemo(
    () => filter === "All" ? cars : cars.filter(c => c.type === filter),
    [filter]
  );

  const searchCars = () => {
    if (!location || !pickup || !returnDate) {
      setToast("Please select a location, pick-up date and return date.");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    if (returnDate < pickup) {
      setToast("Return date must be after the pick-up date.");
      setTimeout(() => setToast(""), 3000);
      return;
    }
    setSearched(true);
    document.getElementById("fleet")?.scrollIntoView({ behavior:"smooth" });
  };

  const book = (car) => {
    setSelected(car);
    setToast(`${car.name} is ready to book.`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950">
      {toast && (
        <div className="fixed right-4 top-4 z-[80] max-w-sm rounded-2xl border border-amber-400/30 bg-slate-900 px-5 py-4 text-sm font-semibold text-white shadow-2xl">
          {toast}
        </div>
      )}

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400 text-slate-950">
              <Sparkles size={21} />
            </div>
            <span className="text-xl font-extrabold tracking-tight">Drive<span className="text-amber-400">Luxe</span></span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#fleet" className="text-sm text-slate-300 hover:text-amber-400">Our Fleet</a>
            <a href="#why" className="text-sm text-slate-300 hover:text-amber-400">Why Us</a>
            <a href="#process" className="text-sm text-slate-300 hover:text-amber-400">How It Works</a>
            <button onClick={() => setSignInOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-amber-400"><LogIn size={17}/> {signedIn ? "My Account" : "Sign In"}</button>
            <button onClick={() => document.getElementById("booking")?.scrollIntoView({behavior:"smooth"})} className="rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-300">Book a Car</button>
          </nav>

          <button onClick={() => setMenu(!menu)} className="rounded-xl border border-white/10 p-2 md:hidden" aria-label="Menu">
            {menu ? <X /> : <Menu />}
          </button>
        </div>

        {menu && (
          <div className="border-t border-white/10 bg-slate-950 px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4">
              <a onClick={() => setMenu(false)} href="#fleet">Our Fleet</a>
              <a onClick={() => setMenu(false)} href="#why">Why Us</a>
              <a onClick={() => setMenu(false)} href="#process">How It Works</a>
              <button onClick={() => {setMenu(false); setSignInOpen(true)}} className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 font-bold text-white"><LogIn size={17}/> {signedIn ? "My Account" : "Sign In"}</button>
              <button onClick={() => {setMenu(false); document.getElementById("booking")?.scrollIntoView({behavior:"smooth"})}} className="rounded-xl bg-amber-400 px-4 py-3 font-bold text-slate-950">Book a Car</button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative min-h-[820px] overflow-hidden pt-28 hero-grid animate-[fadeIn_.8s_ease-out]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(245,158,11,.18),transparent_30%),linear-gradient(180deg,rgba(2,6,23,.1),#020617)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-28 pt-12 lg:grid-cols-2 lg:px-8 lg:pt-20">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300">
                <Sparkles size={15} /> Premium mobility, made simple
              </div>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Drive the car.
                <span className="block text-amber-400">Own the moment.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Premium cars, flexible rentals and a seamless booking experience. Pick your ride and hit the road with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-2"><ShieldCheck className="text-amber-400" size={18}/> Fully insured</span>
                <span className="flex items-center gap-2"><Check className="text-amber-400" size={18}/> No hidden fees</span>
                <span className="flex items-center gap-2"><Clock3 className="text-amber-400" size={18}/> 24/7 support</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-amber-400/10 blur-3xl" />
              <img className="relative w-full rounded-[2rem] object-cover shadow-2xl shadow-black/50 animate-[float_6s_ease-in-out_infinite]" src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85" alt="Luxury sports car" />
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-amber-400"><Star fill="currentColor" size={16}/> <b>4.9/5</b></div>
                <p className="mt-1 text-xs text-slate-400">Trusted by 12k+ drivers</p>
              </div>
            </div>
          </div>

          <div id="booking" className="relative mx-auto -mb-14 max-w-6xl px-5 lg:px-8">
            <div className="glass rounded-3xl border border-white/10 p-4 shadow-2xl shadow-black/40 sm:p-5">
              <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
                <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400"><MapPin size={15} className="text-amber-400"/> Location</span>
                  <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="City or airport" className="mt-1 w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-500" />
                </label>
                <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400"><CalendarDays size={15} className="text-amber-400"/> Pick-up</span>
                  <input type="date" min={new Date().toISOString().split("T")[0]} value={pickup} onChange={e=>setPickup(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-semibold outline-none [color-scheme:dark]" />
                </label>
                <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400"><CalendarDays size={15} className="text-amber-400"/> Return</span>
                  <input type="date" min={pickup || new Date().toISOString().split("T")[0]} value={returnDate} onChange={e=>setReturnDate(e.target.value)} className="mt-1 w-full bg-transparent text-sm font-semibold outline-none [color-scheme:dark]" />
                </label>
                <button onClick={searchCars} className="flex min-h-[64px] items-center justify-center gap-2 rounded-2xl bg-amber-400 px-7 font-extrabold text-slate-950 transition hover:bg-amber-300 active:scale-[.98]">
                  <Search size={19}/> Search Cars
                </button>
              </div>
              {searched && <p className="mt-3 px-1 text-xs text-amber-300">Showing cars available for {location} from {pickup} to {returnDate}.</p>}
            </div>
          </div>
        </section>

        <section id="fleet" className="mx-auto max-w-7xl px-5 pb-20 pt-28 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.22em] text-amber-400">Our fleet</p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Choose your perfect ride</h2>
              <p className="mt-3 max-w-2xl text-slate-400">From elegant executive sedans to exciting sports cars, every vehicle is inspected and ready.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All","Luxury","Executive","Sports","SUV","Electric"].map(x=>(
                <button key={x} onClick={()=>setFilter(x)} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter===x ? "bg-amber-400 text-slate-950" : "border border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/30"}`}>{x}</button>
              ))}
            </div>
          </div>

          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCars.map(car=>(
              <article key={car.id} className="card-lift overflow-hidden rounded-3xl animate-[fadeUp_.7s_ease-out_both] border border-white/10 bg-slate-900">
                <div className="relative h-56 overflow-hidden">
                  <img src={car.image} alt={car.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-bold backdrop-blur">Available</div>
                  <div className="absolute right-4 top-4 flex items-center gap-2">
                    <button onClick={()=>setFavoriteIds(v=>v.includes(car.id)?v.filter(id=>id!==car.id):[...v,car.id])} className="grid h-9 w-9 place-items-center rounded-full bg-slate-950/75 backdrop-blur hover:bg-amber-400 hover:text-slate-950"><Heart size={16} fill={favoriteIds.includes(car.id)?"currentColor":"none"}/></button>
                    <div className="flex items-center gap-1 rounded-full bg-slate-950/75 px-3 py-1.5 text-xs font-bold backdrop-blur"><Star size={13} fill="currentColor" className="text-amber-400"/>{car.rating}</div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div><p className="text-xs font-bold uppercase tracking-widest text-amber-400">{car.type}</p><h3 className="mt-1 text-xl font-bold">{car.name}</h3></div>
                    <div className="text-right"><span className="text-2xl font-extrabold">${car.price}</span><span className="text-xs text-slate-500">/day</span></div>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-2"><Users size={15}/> {car.seats} seats</span>
                    <span className="flex items-center gap-2"><Fuel size={15}/> {car.fuel}</span>
                    <span className="flex items-center gap-2"><Gauge size={15}/> Automatic</span>
                    <span className="flex items-center gap-2"><ShieldCheck size={15}/> Insured</span>
                  </div>
                  <button onClick={()=>book(car)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 py-3.5 font-bold text-amber-300 hover:bg-amber-400 hover:text-slate-950">Reserve this car <ArrowRight size={17}/></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="why" className="border-y border-white/10 bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.22em] text-amber-400">Why DriveLuxe</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">A rental experience built around you</h2></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                ["01","Premium fleet","Drive clean, modern and carefully maintained cars for every kind of journey."],
                ["02","Simple pricing","Clear daily rates with no surprise charges waiting for you at checkout."],
                ["03","Always supported","Our support team is available whenever you need help on your trip."]
              ].map(([n,t,d])=><div key={n} className="rounded-3xl border border-white/10 bg-slate-950 p-7"><span className="text-sm font-extrabold text-amber-400">{n}</span><h3 className="mt-7 text-xl font-bold">{t}</h3><p className="mt-3 leading-7 text-slate-400">{d}</p></div>)}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="text-center"><p className="text-sm font-bold uppercase tracking-[.22em] text-amber-400">How it works</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Book in three easy steps</h2></div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[["1","Search","Choose your location and travel dates."],["2","Select","Compare our cars and pick your favorite."],["3","Drive","Confirm your booking and enjoy the ride."]].map(([n,t,d])=><div key={n} className="relative rounded-3xl border border-white/10 bg-white/[.03] p-7 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-amber-400 text-xl font-extrabold text-slate-950">{n}</div><h3 className="mt-5 text-xl font-bold">{t}</h3><p className="mt-2 text-slate-400">{d}</p></div>)}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div><div className="text-xl font-extrabold">Drive<span className="text-amber-400">Luxe</span></div><p className="mt-4 text-sm leading-7 text-slate-400">Premium cars, flexible rentals and a first-class experience from reservation to return.</p><div className="mt-5 flex gap-2">{[Facebook,Instagram,Twitter].map((Icon,i)=><a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-400 hover:border-amber-400 hover:bg-amber-400 hover:text-slate-950"><Icon size={17}/></a>)}</div></div>
            <div><h4 className="font-bold">Company</h4><div className="mt-4 space-y-3 text-sm text-slate-400"><a href="#fleet" className="block hover:text-amber-400">Our Fleet</a><a href="#why" className="block hover:text-amber-400">Why Us</a><a href="#process" className="block hover:text-amber-400">How It Works</a></div></div>
            <div><h4 className="font-bold">Support</h4><div className="mt-4 space-y-3 text-sm text-slate-400"><a href="#" className="block hover:text-amber-400">FAQ</a><a href="#" className="block hover:text-amber-400">Terms & Conditions</a><a href="#" className="block hover:text-amber-400">Privacy Policy</a><a href="#" className="flex items-center gap-2 hover:text-amber-400"><Phone size={14}/> 24/7 Support</a></div></div>
            <div><h4 className="font-bold">Get travel updates</h4><p className="mt-4 text-sm leading-6 text-slate-400">New cars, offers and useful driving tips — straight to your inbox.</p><form onSubmit={e=>{e.preventDefault();setNewsletterDone(true);setNewsletter("")}} className="mt-4 flex overflow-hidden rounded-xl border border-white/10 bg-white/5"><input value={newsletter} onChange={e=>setNewsletter(e.target.value)} placeholder="Your email" type="email" required className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"/><button className="bg-amber-400 px-4 font-bold text-slate-950">Join</button></form>{newsletterDone&&<p className="mt-2 text-xs font-semibold text-amber-300">You're on the list — thank you!</p>}</div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between"><p>© 2026 DriveLuxe. All rights reserved.</p><p>Secure booking • Inspected vehicles • 24/7 assistance</p></div>
        </div>
      </footer>

      {signInOpen && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onClick={()=>setSignInOpen(false)}>
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-7 shadow-2xl" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-amber-400">Welcome back</p><h3 className="mt-1 text-2xl font-extrabold">Sign in to DriveLuxe</h3></div><button onClick={()=>setSignInOpen(false)} className="rounded-xl p-2 hover:bg-white/10"><X/></button></div>
            <form onSubmit={e=>{e.preventDefault();setSignedIn(true);setSignInOpen(false);setToast("Signed in successfully!");setTimeout(()=>setToast(""),3000)}} className="mt-7 space-y-4">
              <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">Email address</span><div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4"><Mail size={17} className="text-slate-500"/><input type="email" required placeholder="you@example.com" className="w-full bg-transparent py-3 outline-none"/></div></label>
              <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-300">Password</span><div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4"><Lock size={17} className="text-slate-500"/><input required minLength="6" type={showPassword?"text":"password"} placeholder="••••••••" className="w-full bg-transparent py-3 outline-none"/><button type="button" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
              <div className="flex justify-between text-xs text-slate-400"><label><input type="checkbox" className="mr-2"/>Remember me</label><button type="button" className="text-amber-400">Forgot password?</button></div>
              <button className="w-full rounded-xl bg-amber-400 py-3.5 font-extrabold text-slate-950 hover:bg-amber-300">Sign In</button>
            </form>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onClick={()=>setSelected(null)}>
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-amber-400">Reservation</p><h3 className="mt-1 text-2xl font-extrabold">{selected.name}</h3></div><button onClick={()=>setSelected(null)} className="rounded-xl p-2 hover:bg-white/10"><X/></button></div>
            <div className="mt-6 grid gap-3 rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
              <p className="flex justify-between"><span>Location</span><b>{location || "Not selected"}</b></p>
              <p className="flex justify-between"><span>Pick-up</span><b>{pickup || "Not selected"}</b></p>
              <p className="flex justify-between"><span>Return</span><b>{returnDate || "Not selected"}</b></p>
              <p className="flex justify-between"><span>Daily rate</span><b>${selected.price}/day</b></p>
            </div>
            <button onClick={()=>{setSelected(null); setToast("Booking request submitted successfully!"); setTimeout(()=>setToast(""),3000)}} className="mt-5 w-full rounded-2xl bg-amber-400 py-3.5 font-extrabold text-slate-950 hover:bg-amber-300">Confirm Booking</button>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
