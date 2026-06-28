import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Heart,
  Volume2,
  VolumeX,
  Play,
  MessageCircle,
  CheckCircle2,
  XCircle,
  ChevronsDown,
} from "lucide-react";

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);

  // PLACE YOUR SONG URL HERE (Direct MP3 link)
  // const audioSource = "https://drive.google.com/file/d/1fMo_LfhODhWE5LM3XyRby2sZXocQYsTB/view?usp=drivesdk";
  const audioSource = "/wedding-song.mp3";
  const mapLink =
    "https://www.google.com/maps/dir/?api=1&destination=Kairali+Auditorium%2C+Parasseri%2C+Poozhikunnu%2C+B.P.+Angadi%2C+Tirur%2C+Kerala+676102&travelmode=driving";
  const whatsappNumber = "917736948494";
  const messageYes =
    "Assalamu Alaikum, I am confirming my presence for Shahaban & Muhseena Wedding! Looking forward to it.";
  const messageNo =
    "Assalamu Alaikum, I regret to inform that I cannot attend the wedding of Shahaban & Muhseena. My prayers are with you.";

  useEffect(() => {
    const weddingDate = new Date("2026-07-20T11:30:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isOpened) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll(".reveal-on-scroll, .reveal-scale");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [isOpened]);
  const handleNavigate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const destination =
          "Kairali Auditorium, Parasseri, Poozhikunnu, B.P. Angadi, Tirur, Kerala 676102";

        const mapUrl =
          `https://www.google.com/maps/dir/?api=1` +
          `&origin=${latitude},${longitude}` +
          `&destination=${encodeURIComponent(destination)}` +
          `&travelmode=driving`;

        window.open(mapUrl, "_blank");
      },
      (error) => {
        alert("Please allow location access to get directions.");
        console.error(error);
      },
    );
  };
  const handleOpen = async () => {
    setIsOpening(true);

    try {
      if (audioRef.current) {
        await audioRef.current.play();
        setMusicPlaying(true);
      }
    } catch (err) {
      console.error("Play failed:", err);
    }

    setTimeout(() => {
      setIsOpened(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 8000); // Stop confetti after 8 seconds
    }, 1000);
  };
  const toggleMusic = () => {
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E9] text-[#2C3524] font-sans selection:bg-[#DCE5D8] relative overflow-x-hidden">
      <audio
        ref={audioRef}
        src={audioSource}
        loop
        preload="auto"
        onError={(e) => console.log("Audio Error:", e)}
      />

      {/* Falling Rose Petals & Gold Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            const size = Math.random() * 12 + 10; // 10px to 22px
            const left = Math.random() * 100; // 0% to 100%
            const delay = Math.random() * 5; // 0s to 5s delay
            const duration = Math.random() * 5 + 4; // 4s to 9s duration
            const type = Math.random() > 0.5 ? "petal" : "gold";
            
            return (
              <div
                key={i}
                className="absolute top-[-30px] animate-fall"
                style={{
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: type === "petal" ? "#ffccd5" : "#C5A04F",
                  opacity: Math.random() * 0.5 + 0.5,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  borderRadius: type === "petal" ? "100% 0% 100% 100%" : "50%",
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Welcome Screen Overlay */}
      {!isOpened && (
        <div
          className={`fixed inset-0 bg-[#F5F1E9] flex items-center justify-center p-6 text-center z-50 overflow-hidden transition-all duration-1000 ease-in-out ${
            isOpening ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Background Decorative Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#C5A04F 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          {/* Center Card */}
          <div
            className={`max-w-md w-full bg-white/90 backdrop-blur-md border border-[#C5A04F]/30 p-10 md:p-12 rounded-3xl shadow-2xl relative z-10 transition-all duration-1000 ease-in-out ${
              isOpening ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Islamic Dome & Crescent/Star Emblem */}
            <div className="flex justify-center mb-6">
              <svg className="w-16 h-16 text-[#C5A04F]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                {/* Dome Arch */}
                <path d="M50,15 C65,35 80,45 80,75 C80,85 75,85 50,85 C25,85 20,85 20,75 C20,45 35,35 50,15 Z" />
                {/* Crescent Moon */}
                <path d="M48,45 A6,6 0 1 1 54,51 A4.5,4.5 0 1 0 48,45 Z" fill="currentColor" stroke="none" />
                {/* Small Star */}
                <polygon points="56,46 57,48 59,48 57.5,49.5 58,51.5 56,50.2 54,51.5 54.5,49.5 53,48 55,48" fill="currentColor" stroke="none" />
              </svg>
            </div>

            {/* Bismillah Calligraphy */}
            <p className="text-2xl md:text-3xl text-[#C5A04F] font-serif mb-4 tracking-wide font-medium">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>

            <p className="text-xs uppercase tracking-[0.2em] text-[#A7B39E] mb-2 font-semibold font-sans">The Wedding Invitation of</p>
            <h1 className="text-6xl md:text-7xl font-cursive text-[#5C7347] my-4 leading-normal font-medium">
              Shahaban <br />
              <span className="text-4xl font-serif text-[#C5A04F] block my-2 font-normal">&</span>
              Muhseena
            </h1>
            <p className="text-[#A7B39E] italic mb-8 font-serif text-lg">
              We cordially invite you to our wedding.
            </p>
            <button
              onClick={handleOpen}
              className="flex items-center gap-2 mx-auto bg-[#5C7347] text-white px-10 py-4 rounded-full hover:bg-[#485b37] hover:scale-105 transition-all shadow-lg text-lg font-medium cursor-pointer"
            >
              <Play size={22} className="fill-white" /> Open Invitation
            </button>
          </div>
        </div>
      )}

      {/* Main Content (Conditional) */}
      {(isOpened || isOpening) && (
        <>
          {/* Decorative Border */}
          <div className="fixed inset-4 border-[1px] border-[#C5A04F]/20 pointer-events-none z-40"></div>

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 bg-[#5C7347] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center gap-1"
        style={{ width: "56px", height: "56px" }}
      >
        {musicPlaying ? (
          <div className="flex items-end gap-[3px] h-5 w-5 justify-center">
            <span className="w-[3px] bg-white rounded-full animate-bar-1 h-full"></span>
            <span className="w-[3px] bg-white rounded-full animate-bar-2 h-full"></span>
            <span className="w-[3px] bg-white rounded-full animate-bar-3 h-full"></span>
          </div>
        ) : (
          <VolumeX size={24} />
        )}
      </button>

      {/* Gently Floating Background Leaves */}
      {isOpened && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
          {/* Leaf 1 (Top Right) */}
          <div className="absolute top-48 -right-8 opacity-25 animate-float" style={{ animationDelay: "0s", animationDuration: "7s" }}>
            <svg className="w-16 h-16 text-[#5C7347] fill-current transform rotate-45" viewBox="0 0 24 24">
              <path d="M21 3C21 3 14 3.5 9 8.5C4 13.5 3 21 3 21C3 21 10.5 20 15.5 15C20.5 10 21 3 21 3ZM12.5 15.5C10.5 15.5 8.5 14.5 7 13C6.5 12.5 6.5 11.5 7 11C7.5 10.5 8.5 10.5 9 11C10 12 11.5 12.5 12.5 12.5C13.5 12.5 14 12 14.5 11.5C15 11 15.5 10 15.5 9C15.5 8 15 6.5 14 5.5C13.5 5 13.5 4 14 3.5C14.5 3 15.5 3 16 3.5C17.5 5 18.5 7 18.5 9C18.5 11 17.5 13 15.5 15C14.5 15.5 13.5 15.5 12.5 15.5Z" />
            </svg>
          </div>
          {/* Leaf 2 (Mid Left) */}
          <div className="absolute top-[80vh] -left-8 opacity-20 animate-float" style={{ animationDelay: "1.5s", animationDuration: "9s" }}>
            <svg className="w-20 h-20 text-[#5C7347] fill-current transform -rotate-45" viewBox="0 0 24 24">
              <path d="M21 3C21 3 14 3.5 9 8.5C4 13.5 3 21 3 21C3 21 10.5 20 15.5 15C20.5 10 21 3 21 3ZM12.5 15.5C10.5 15.5 8.5 14.5 7 13C6.5 12.5 6.5 11.5 7 11C7.5 10.5 8.5 10.5 9 11C10 12 11.5 12.5 12.5 12.5C13.5 12.5 14 12 14.5 11.5C15 11 15.5 10 15.5 9C15.5 8 15 6.5 14 5.5C13.5 5 13.5 4 14 3.5C14.5 3 15.5 3 16 3.5C17.5 5 18.5 7 18.5 9C18.5 11 17.5 13 15.5 15C14.5 15.5 13.5 15.5 12.5 15.5Z" />
            </svg>
          </div>
          {/* Leaf 3 (Bottom Right) */}
          <div className="absolute bottom-[60vh] -right-12 opacity-25 animate-float" style={{ animationDelay: "3s", animationDuration: "8s" }}>
            <svg className="w-24 h-24 text-[#5C7347] fill-current transform rotate-[120deg]" viewBox="0 0 24 24">
              <path d="M21 3C21 3 14 3.5 9 8.5C4 13.5 3 21 3 21C3 21 10.5 20 15.5 15C20.5 10 21 3 21 3ZM12.5 15.5C10.5 15.5 8.5 14.5 7 13C6.5 12.5 6.5 11.5 7 11C7.5 10.5 8.5 10.5 9 11C10 12 11.5 12.5 12.5 12.5C13.5 12.5 14 12 14.5 11.5C15 11 15.5 10 15.5 9C15.5 8 15 6.5 14 5.5C13.5 5 13.5 4 14 3.5C14.5 3 15.5 3 16 3.5C17.5 5 18.5 7 18.5 9C18.5 11 17.5 13 15.5 15C14.5 15.5 13.5 15.5 12.5 15.5Z" />
            </svg>
          </div>
          {/* Leaf 4 (Bottom Left) */}
          <div className="absolute bottom-48 -left-6 opacity-20 animate-float" style={{ animationDelay: "4.5s", animationDuration: "10s" }}>
            <svg className="w-14 h-14 text-[#5C7347] fill-current transform rotate-[30deg]" viewBox="0 0 24 24">
              <path d="M21 3C21 3 14 3.5 9 8.5C4 13.5 3 21 3 21C3 21 10.5 20 15.5 15C20.5 10 21 3 21 3ZM12.5 15.5C10.5 15.5 8.5 14.5 7 13C6.5 12.5 6.5 11.5 7 11C7.5 10.5 8.5 10.5 9 11C10 12 11.5 12.5 12.5 12.5C13.5 12.5 14 12 14.5 11.5C15 11 15.5 10 15.5 9C15.5 8 15 6.5 14 5.5C13.5 5 13.5 4 14 3.5C14.5 3 15.5 3 16 3.5C17.5 5 18.5 7 18.5 9C18.5 11 17.5 13 15.5 15C14.5 15.5 13.5 15.5 12.5 15.5Z" />
            </svg>
          </div>
        </div>
      )}

      <header className="custome-bg min-h-screen flex flex-col items-center justify-center p-6 text-center relative">
        {/* <div className="space-y-6 animate-in fade-in duration-1000 bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-3xl border border-[#C5A04F]/30 max-w-xl mx-auto shadow-2xl relative z-10">
          <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#C5A04F]/40"></div>
          <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#C5A04F]/40"></div>
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#C5A04F]/40"></div>
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#C5A04F]/40"></div>

          <p className="text-xs uppercase tracking-[0.2em] text-[#A7B39E] font-semibold font-sans">Save The Date</p>
          <h1 className="text-2xl text-[#5C7347] font-display font-bold">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h1>
          <div className="text-6xl md:text-7xl font-cursive text-[#5C7347] py-6 leading-normal font-medium">
            Shahaban <br />
            <span className="text-4xl font-serif text-[#C5A04F] block my-2 font-normal">&</span>
            Muhseena
          </div>
          <p className="text-[#A7B39E] italic text-lg mt-4">We are getting married!</p>
        </div> */}

        {/* Bouncing Scroll Down Arrow */}
        <button
          onClick={() => {
            const contentSection = document.getElementById("wedding-content");
            if (contentSection) {
              contentSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="absolute bottom-8 left-8 text-[#5C7347] cursor-pointer focus:outline-none z-30"
        >
          <div className="w-10 h-10 border border-[#5C7347]/30 rounded-full flex items-center justify-center bg-[#F5F1E9]/60 backdrop-blur-sm shadow-sm animate-bounce hover:bg-[#E8EDE5] transition-colors">
            <ChevronsDown size={20} className="stroke-[1.5] animate-pulse" />
          </div>
        </button>
      </header>

      <section id="wedding-content" className="py-16 px-6 reveal-on-scroll">
        <div className="max-w-xl mx-auto grid grid-cols-4 gap-4">
          {[
            { val: timeLeft.days, label: "Days" },
            { val: timeLeft.hours, label: "Hours" },
            { val: timeLeft.minutes, label: "Min" },
            { val: timeLeft.seconds, label: "Sec" },
          ].map((t, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-4 bg-[#E8EDE5] rounded-xl shadow-sm"
            >
              <span className="text-2xl font-bold text-[#5C7347]">{t.val}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#A7B39E]">
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-10 px-4 reveal-on-scroll">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border border-[#C5A04F]/20">
          <h2 className="text-3xl font-display font-bold text-[#5C7347] mb-8 text-center border-b border-[#C5A04F]/30 pb-4">
            Wedding Details
          </h2>

          {/* Venue Illustration Preview */}
          <div className="w-full h-32 bg-[#E8EDE5] rounded-xl overflow-hidden mb-6 relative flex items-center justify-center border border-[#5C7347]/10">
            {/* Decorative grid pattern in background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#5C7347 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
            {/* Golden Islamic arch outline with a pin in the center */}
            <svg className="w-24 h-24 text-[#C5A04F]/60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M50,15 C65,35 80,45 80,75 C80,85 75,85 50,85 C25,85 20,85 20,75 C20,45 35,35 50,15 Z" />
              <path d="M50,35 C42,35 36,41 36,49 C36,59 50,71 50,71 C50,71 64,59 64,49 C64,41 58,35 50,35 Z" fill="#5C7347" className="text-[#5C7347] opacity-80" stroke="none" />
              <circle cx="50" cy="47" r="4" fill="#F5F1E9" stroke="none" />
            </svg>
            {/* Text label */}
            <div className="absolute bottom-2 right-3 text-[10px] uppercase tracking-widest text-[#5C7347]/70 font-sans font-bold">
              Kairali Venue
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-[#E8EDE5] p-3 rounded-full text-[#5C7347]">
                <Calendar />
              </div>
              <p className="font-sans font-semibold text-lg text-[#5C7347]">Monday, July 20th, 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#E8EDE5] p-3 rounded-full text-[#5C7347]">
                <Clock />
              </div>
              <p className="font-sans font-semibold text-lg text-[#5C7347]">11:30 AM - 3:30 PM</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-[#E8EDE5] p-3 rounded-full text-[#5C7347]">
                <MapPin />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-[#5C7347] mb-1">Kairali Auditorium</p>
                <p className="text-sm text-[#A7B39E] font-sans font-semibold">
                  Parasseri, Poozhikunnu, B.P. Angadi, Tirur, Kerala 676102
                </p>
              </div>
            </div>
            
            {/* Add to Calendar Button */}
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shahaban+%26+Muhseena+Wedding&dates=20260720T060000Z/20260720T100000Z&details=You+are+cordially+invited+to+the+wedding+of+Shahaban+%26+Muhseena+at+Kairali+Auditorium%2C+Parasseri%2C+Poozhikunnu.&location=Kairali+Auditorium%2C+Parasseri%2C+Poozhikunnu%2C+B.P.+Angadi%2C+Tirur%2C+Kerala+676102"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 border border-[#C5A04F]/40 text-[#5C7347] font-sans font-bold text-sm rounded-xl hover:bg-[#E8EDE5] transition-colors"
            >
              <Calendar size={16} /> Add to Google Calendar
            </a>

            <button
              onClick={handleNavigate}
              className="block w-full py-4 bg-[#5C7347] text-white text-center rounded-xl font-sans font-bold tracking-wider text-base hover:bg-[#485b37] transition-colors cursor-pointer"
            >
              Navigate to Venue
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-gradient-to-b from-[#F5F1E9] to-[#E8EDE5] text-center reveal-scale">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <p className="uppercase tracking-[0.2em] text-xs text-[#C5A04F] mb-3 font-sans font-bold">
              RSVP
            </p>

            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#5C7347] mb-4">
              Will You Be Joining Us?
            </h2>

            <p className="text-[#A7B39E] italic text-lg font-serif">
              In Sha Allah, your presence will make our celebration even more
              special.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-[#C5A04F]/20 p-8 md:p-10">
            <div className="text-5xl mb-4">🤍</div>

            <p className="text-[#3B4830] leading-relaxed mb-8 font-sans font-semibold text-base">
              We would be honored to celebrate this joyful occasion with you.
              Kindly let us know whether you will be able to attend.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageYes)}`}
                className="group flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-lg hover:scale-105 transition-all duration-300 font-sans"
              >
                <CheckCircle2 size={26} />
                Yes, In Sha Allah
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageNo)}`}
                className="group flex items-center justify-center gap-3 bg-white text-[#5C7347] px-10 py-5 rounded-2xl text-lg font-bold border-2 border-[#5C7347] shadow-lg hover:bg-[#E8EDE5] hover:scale-105 transition-all duration-300 font-sans"
              >
                <XCircle size={26} />
                Unable to Attend
              </a>
            </div>

            <div className="mt-10 pt-6 border-t border-[#C5A04F]/20">
              <p className="text-[#A7B39E] italic font-serif text-lg">
                "Your presence is our greatest gift."
              </p>

              <p className="text-4xl font-cursive text-[#C5A04F] mt-3 tracking-wide capitalize leading-normal font-medium">
                Shahaban & Muhseena
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Credit Footer */}
      <footer className="py-8 text-center text-xs text-[#A7B39E] font-sans tracking-widest opacity-60">
        <p>Created with 🤍 by Jaseel</p>
      </footer>
        </>
      )}
    </div>
  );
}
