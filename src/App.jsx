import React, { useState, useEffect, useRef } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  VolumeX,
  Play,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(-1); // -1 = Welcome Overlay, 0 = Cover, 1 = Page 1, 2 = Page 2, 3 = Page 3
  const [isOpeningCover, setIsOpeningCover] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right"); // 'right' or 'left'
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);

  const audioSource = "/wedding-song.mp3";
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
      } else {
        clearInterval(timer);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const destLat = 10.9029;
        const destLng = 75.9268;

        const mapUrl = `https://www.google.com/maps/dir/?api=1` +
          `&origin=${latitude},${longitude}` +
          `&destination=${destLat},${destLng}` +
          `&travelmode=driving`;

        window.open(mapUrl, "_blank");
      },
      (error) => {
        alert("Please allow location access to get directions.");
        console.error(error);
      },
    );
  };

  const handleOpenCover = async () => {
    setIsOpeningCover(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 8000); // Clear confetti after 8 seconds

    setTimeout(() => {
      setCurrentPage(1);
      setIsOpeningCover(false);
    }, 1200); // Match 3D book cover open transition
  };

  const toggleMusic = () => {
    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  const nextPage = () => {
    setSlideDirection("right");
    setCurrentPage((prev) => Math.min(prev + 1, 3));
  };

  const prevPage = () => {
    setSlideDirection("left");
    setCurrentPage((prev) => Math.max(prev - 1, 0));
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
          {Array.from({ length: 35 }).map((_, i) => {
            const size = Math.random() * 12 + 10;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 5 + 4;
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

      {/* Welcome Screen Overlay (Bismillah Card) */}
      {currentPage === -1 && (
        <div className="fixed inset-0 bg-[#F5F1E9] flex items-center justify-center p-6 text-center z-50 overflow-hidden">
          {/* Background Decorative Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#C5A04F 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          {/* Center Card */}
          <div className="max-w-md w-full bg-white/90 backdrop-blur-md border border-[#C5A04F]/30 p-10 md:p-12 rounded-3xl shadow-2xl relative z-10">
            {/* Islamic Dome & Crescent/Star Emblem */}
            <div className="flex justify-center mb-6">
              <svg className="w-16 h-16 text-[#C5A04F]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M50,15 C65,35 80,45 80,75 C80,85 75,85 50,85 C25,85 20,85 20,75 C20,45 35,35 50,15 Z" />
                <path d="M48,45 A6,6 0 1 1 54,51 A4.5,4.5 0 1 0 48,45 Z" fill="currentColor" stroke="none" />
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
              onClick={() => {
                try {
                  if (audioRef.current) {
                    audioRef.current.play();
                    setMusicPlaying(true);
                  }
                } catch (err) {
                  console.error("Play failed:", err);
                }
                setCurrentPage(0); // transition to book cover page
              }}
              className="flex items-center gap-2 mx-auto bg-[#5C7347] text-white px-10 py-4 rounded-full hover:bg-[#485b37] hover:scale-105 transition-all shadow-lg text-lg font-medium cursor-pointer"
            >
              <Play size={22} className="fill-white" /> Open Invitation
            </button>
          </div>
        </div>
      )}

      {/* Pages >= 0: Interactive Open Book Layout */}
      {currentPage >= 0 && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#F5F1E9]">
          {/* Slow Spinning Background Mandala Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-10 overflow-hidden">
            <svg className="w-[180vw] h-[180vw] md:w-[85vh] md:h-[85vh] text-[#C5A04F] stroke-current fill-none animate-spin" style={{ animationDuration: "180s" }} strokeWidth="0.5" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" />
              <circle cx="50" cy="50" r="38" />
              <circle cx="50" cy="50" r="28" />
              <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" />
              <polygon points="50,15 59,41 85,50 59,59 50,85 41,59 15,50 41,41" />
              <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" transform="rotate(22.5 50 50)" />
              <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" transform="rotate(45 50 50)" />
              <polygon points="50,5 62,38 95,50 62,62 50,95 38,62 5,50 38,38" transform="rotate(67.5 50 50)" />
              <path d="M50,35 C52,42 58,48 50,50 C42,48 48,42 50,35 Z" transform="rotate(0 50 50)" />
              <path d="M50,35 C52,42 58,48 50,50 C42,48 48,42 50,35 Z" transform="rotate(30 50 50)" />
              <path d="M50,35 C52,42 58,48 50,50 C42,48 48,42 50,35 Z" transform="rotate(60 50 50)" />
              <path d="M50,35 C52,42 58,48 50,50 C42,48 48,42 50,35 Z" transform="rotate(90 50 50)" />
              <path d="M50,35 C52,42 58,48 50,50 C42,48 48,42 50,35 Z" transform="rotate(120 50 50)" />
              <path d="M50,35 C52,42 58,48 50,50 C42,48 48,42 50,35 Z" transform="rotate(150 50 50)" />
              <path d="M50,35 C52,42 58,48 50,50 C42,48 48,42 50,35 Z" transform="rotate(180 50 50)" />
            </svg>
          </div>

          {/* Music Visualizer Widget (Fixed Top-Right) */}
          <button
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-50 bg-[#5C7347] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all flex items-center justify-center gap-1"
            style={{ width: "46px", height: "46px" }}
          >
            {musicPlaying ? (
              <div className="flex items-end gap-[2px] h-4 w-4 justify-center">
                <span className="w-[2.5px] bg-white rounded-full animate-bar-1 h-full"></span>
                <span className="w-[2.5px] bg-white rounded-full animate-bar-2 h-full"></span>
                <span className="w-[2.5px] bg-white rounded-full animate-bar-3 h-full"></span>
              </div>
            ) : (
              <VolumeX size={20} />
            )}
          </button>

          {/* Book Wrapper with 3D Perspective */}
          <div className="max-w-md w-full relative z-10 flex flex-col justify-between min-h-[75vh] md:min-h-[80vh] book-perspective">
            
            {/* The Active Inside Page (Always rendered as backing canvas for opening animation) */}
            <div className="absolute inset-0 flex flex-col justify-between bg-white rounded-3xl shadow-2xl border border-[#C5A04F]/30 p-6 md:p-8 paper-page z-10">
              {/* Book Corner Golden Filigrees */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#C5A04F]/40 rounded-tl-lg pointer-events-none"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#C5A04F]/40 rounded-tr-lg pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#C5A04F]/40 rounded-bl-lg pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#C5A04F]/40 rounded-br-lg pointer-events-none"></div>

            
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-r from-transparent via-[#5C7347]/10 to-transparent pointer-events-none"></div>

           
              <div className="flex justify-between items-center border-b border-[#C5A04F]/20 pb-3 mb-6 relative z-10">
                <span className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#A7B39E] uppercase">
                  Wedding Invite
                </span>
                <span className="text-xs font-sans font-bold text-[#C5A04F]">
                  Page {currentPage === 0 ? 1 : currentPage} of 3
                </span>
              </div>

           
              <div
                className={`flex-grow flex flex-col justify-center relative z-10 ${
                  slideDirection === "right" ? "animate-flip-next" : "animate-flip-prev"
                }`}
                key={currentPage}
              >
                {/* Page 1: Welcome & Countdown */}
                {(currentPage === 0 || currentPage === 1) && (
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <svg className="w-12 h-12 text-[#C5A04F]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M50,15 C65,35 80,45 80,75 C80,85 75,85 50,85 C25,85 20,85 20,75 C20,45 35,35 50,15 Z" />
                        <path d="M48,45 A6,6 0 1 1 54,51 A4.5,4.5 0 1 0 48,45 Z" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                    <p className="text-xl md:text-2xl text-[#C5A04F] font-serif mb-2 tracking-wide font-medium">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#A7B39E] font-bold font-sans">Save The Date</p>
                    <h2 className="text-4xl md:text-5xl font-cursive text-[#5C7347] leading-tight">
                      Shahaban & Muhseena
                    </h2>
                    <p className="text-[#3B4830] font-sans font-semibold text-xs max-w-xs mx-auto leading-relaxed">
                      We cordially invite you to celebrate our union and witness our wedding day.
                    </p>

                    <div className="pt-2">
                      <p className="text-[9px] tracking-[0.2em] text-[#C5A04F] font-sans font-bold uppercase mb-2">Countdown</p>
                      <div className="grid grid-cols-4 gap-2 max-w-[280px] mx-auto">
                        {[
                          { val: timeLeft.days, label: "Days" },
                          { val: timeLeft.hours, label: "Hrs" },
                          { val: timeLeft.minutes, label: "Min" },
                          { val: timeLeft.seconds, label: "Sec" },
                        ].map((t, i) => (
                          <div key={i} className="flex flex-col items-center p-2 bg-[#E8EDE5] rounded-lg shadow-sm border border-[#5C7347]/10">
                            <span className="text-lg font-bold font-sans text-[#5C7347]">{String(t.val).padStart(2, "0")}</span>
                            <span className="text-[8px] font-sans text-[#A7B39E] font-semibold">{t.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

    
                {currentPage === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-display font-bold text-[#5C7347] text-center mb-1">
                      Wedding Details
                    </h3>

                    <div className="w-full h-24 bg-[#E8EDE5] rounded-xl overflow-hidden relative flex items-center justify-center border border-[#5C7347]/10">
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#5C7347 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
                      <svg className="w-16 h-16 text-[#C5A04F]/60" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M50,15 C65,35 80,45 80,75 C80,85 75,85 50,85 C25,85 20,85 20,75 C20,45 35,35 50,15 Z" />
                        <path d="M50,35 C42,35 36,41 36,49 C36,59 50,71 50,71 C50,71 64,59 64,49 C64,41 58,35 50,35 Z" fill="#5C7347" className="text-[#5C7347] opacity-80" stroke="none" />
                        <circle cx="50" cy="47" r="4" fill="#F5F1E9" stroke="none" />
                      </svg>
                    </div>

                    <div className="space-y-2.5 font-sans">
                      <div className="flex items-center gap-3 p-2 bg-[#F5F1E9]/50 rounded-xl border border-[#C5A04F]/10">
                        <Calendar size={16} className="text-[#5C7347]" />
                        <p className="font-semibold text-xs text-[#5C7347]">Monday, July 20th, 2026</p>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-[#F5F1E9]/50 rounded-xl border border-[#C5A04F]/10">
                        <Clock size={16} className="text-[#5C7347]" />
                        <p className="font-semibold text-xs text-[#5C7347]">11:30 AM - 3:30 PM</p>
                      </div>
                      <div className="flex gap-3 p-2 bg-[#F5F1E9]/50 rounded-xl border border-[#C5A04F]/10">
                        <MapPin size={16} className="text-[#5C7347] shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-xs text-[#5C7347]">Kairali Auditorium</p>
                          <p className="text-[10px] text-[#A7B39E] font-semibold mt-0.5 leading-normal">
                            Parasseri, Poozhikunnu, B.P. Angadi, Tirur, Kerala 676102
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <a
                        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Shahaban+%26+Muhseena+Wedding&dates=20260720T060000Z/20260720T100000Z&details=You+are+cordially+invited+to+the+wedding+of+Shahaban+%26+Muhseena+at+Kairali+Auditorium%2C+Parasseri%2C+Poozhikunnu.&location=Kairali+Auditorium%2C+Parasseri%2C+Poozhikunnu%2C+B.P.+Angadi%2C+Tirur%2C+Kerala+676102"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 border border-[#C5A04F]/40 text-[#5C7347] font-bold text-xs rounded-xl hover:bg-[#E8EDE5] transition-colors"
                      >
                        <Calendar size={14} /> Add Calendar
                      </a>
                      <button
                        onClick={handleNavigate}
                        className="flex items-center justify-center gap-1.5 py-2.5 bg-[#5C7347] text-white font-bold text-xs rounded-xl hover:bg-[#485b37] transition-colors cursor-pointer"
                      >
                        <MapPin size={14} /> Navigate Map
                      </button>
                    </div>
                  </div>
                )}

                {/* Page 3: RSVP Actions */}
                {currentPage === 3 && (
                  <div className="text-center space-y-4">
                    <div>
                      <p className="uppercase tracking-[0.2em] text-[9px] text-[#C5A04F] mb-0.5 font-sans font-bold">
                        RSVP
                      </p>
                      <h3 className="text-2xl font-display font-bold text-[#5C7347]">
                        Will You Attend?
                      </h3>
                    </div>

                    <p className="text-[#3B4830] leading-relaxed font-sans font-semibold text-xs max-w-xs mx-auto">
                      Kindly let us know if you can join. We would be honored to celebrate this special day with you.
                    </p>

                    <div className="flex flex-col gap-2.5 py-1">
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageYes)}`}
                        className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl text-sm font-bold shadow-md hover:scale-105 transition-all duration-300 font-sans"
                      >
                        <CheckCircle2 size={16} />
                        Yes, In Sha Allah
                      </a>
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageNo)}`}
                        className="flex items-center justify-center gap-2 bg-white text-[#5C7347] py-3 rounded-xl text-sm font-bold border border-[#5C7347] shadow-sm hover:bg-[#E8EDE5] hover:scale-105 transition-all duration-300 font-sans"
                      >
                        <XCircle size={16} />
                        Unable to Attend
                      </a>
                    </div>

                    <div className="pt-2 border-t border-[#C5A04F]/20">
                      <p className="text-[#A7B39E] italic font-serif text-sm">
                        "Your presence is our greatest gift."
                      </p>
                      <p className="text-3xl font-cursive text-[#C5A04F] mt-1 capitalize tracking-wide font-medium leading-none">
                        Shahaban & Muhseena
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Navigation controls */}
              <div className="flex justify-between items-center border-t border-[#C5A04F]/20 pt-4 mt-6 relative z-10">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center gap-1 text-[#5C7347] font-sans font-bold text-xs uppercase tracking-wider transition-opacity cursor-pointer ${
                    currentPage === 0 ? "opacity-30 pointer-events-none" : "hover:text-[#485b37]"
                  }`}
                >
                  <ChevronLeft size={16} /> Back
                </button>

                <button
                  onClick={nextPage}
                  disabled={currentPage === 3 || currentPage === 0}
                  className={`flex items-center gap-1 text-[#5C7347] font-sans font-bold text-xs uppercase tracking-wider transition-opacity cursor-pointer ${
                    currentPage === 3 || currentPage === 0 ? "opacity-30 pointer-events-none" : "hover:text-[#485b37]"
                  }`}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Book Cover Card Overlay (z-20) - Placed directly on top of Page 1. Tapping flips it open to the left */}
            {currentPage === 0 && (
              <div
                onClick={handleOpenCover}
                className={`absolute inset-0 rounded-3xl shadow-2xl z-20 overflow-hidden border border-[#C5A04F]/20 book-cover-wrapper flex flex-col justify-end p-8 cursor-pointer ${
                  isOpeningCover ? "book-cover-open" : ""
                }`}
                style={{
                  backgroundImage: "url('/bg4.webp')",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                }}
              >
                {/* Tap to Open Hint */}
                <div className="mb-4 text-center">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#5C7347] font-sans font-bold bg-[#F5F1E9]/90 border border-[#C5A04F]/30 py-2 px-4 rounded-full inline-block shadow-md animate-pulse">
                    📖 Tap Cover to Open
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Credits footer */}
          <footer className="mt-6 text-center text-[10px] text-[#A7B39E] font-sans tracking-widest opacity-60 relative z-10">
            <p>Created with 🤍 by Jaseel</p>
          </footer>
        </div>
      )}
    </div>
  );
}
