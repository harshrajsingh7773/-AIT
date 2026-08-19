import { useEffect, useRef, useState } from "react";

function App() {
  /* ================= TIME ================= */

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      let hours = now.getHours();
      const minutes = now.getMinutes();

      const ampm = hours >= 12 ? "pm" : "am";

      hours = hours % 12 || 12;

      setTime(`${hours}:${String(minutes).padStart(2, "0")} ${ampm}`);
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ================= SONGS ================= */

 const songs = [
  {
    id: 1,
    title: "Anyway",
    artist: "ANYWAY",
    src: "/Anyway - ANYWAY (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 2,
    title: "Arhe So Jhde",
    artist: "ANYWAY",
    src: "/Arhe So Jhde - ANYWAY (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 3,
    title: "Bholi Si Surat",
    artist: "Dil To Pagal Hai",
    src: "/Bholi Si Surat - Dil To Pagal Hai (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 4,
    title: "California Love",
    artist: "ANYWAY",
    src: "/California Love - ANYWAY (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 5,
    title: "Chaal Patlo",
    artist: "Jass Dhaliwal & Rouble Malhi",
    src: "/Chaal Patlo - Jass Dhaliwal & Rouble Malhi (Mr-Punjab.Com).mp3",
    image: "/im.png",
  },
  {
    id: 6,
    title: "Cheema Y (Intro)",
    artist: "ANYWAY",
    src: "/Cheema Y (Intro) - ANYWAY (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 7,
    title: "Dhadkan",
    artist: "Romy Ranjan",
    src: "/Dhadkan - Romy Ranjan.mp3",
    image: "/im.png",
  },
  {
    id: 8,
    title: "Dil To Pagal Hai",
    artist: "Dil To Pagal Hai",
    src: "/Dil To Pagal Hai - Dil To Pagal Hai (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 9,
    title: "EX-FILES",
    artist: "Baggh-E SMG",
    src: "/EX-FILES - Baggh-E SMG.mp3",
    image: "/im.png",
  },
  {
    id: 10,
    title: "Feem Feem",
    artist: "Sardar Khehra & Gur Brar & Rahul Sidhu",
    src: "/Feem Feem - Sardar Khehra & Gur Brar & Rahul Sidhu (Mr-Punjab.Com).mp3",
    image: "/im.png",
  },
  {
    id: 11,
    title: "Freestyle",
    artist: "Jas Dhaliwal",
    src: "/Freestyle - Jas Dhaliwal (Mr-Punjab.Com).mp3",
    image: "/im.png",
  },
  {
    id: 12,
    title: "Gun Culture",
    artist: "Cloud 9",
    src: "/Gun Culture - Cloud 9 (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 13,
    title: "Haske",
    artist: "Cloud 9",
    src: "/Haske - Cloud 9 (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 14,
    title: "Jogi",
    artist: "Jxggi & Hxrmxn",
    src: "/Jogi - Jxggi & Hxrmxn (Mr-Punjab.Com).mp3",
    image: "/im.png",
  },
  {
    id: 15,
    title: "Khat",
    artist: "Khat",
    src: "/Khat - Khat (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 16,
    title: "Koi Ladki Hai",
    artist: "Dil To Pagal Hai",
    src: "/Koi Ladki Hai - Dil To Pagal Hai (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 17,
    title: "Malpur De Munde",
    artist: "Singga",
    src: "/Malpur De Munde - Singga (Mr-Punjab.Com).mp3",
    image: "/im.png",
  },
  {
    id: 18,
    title: "NYPD",
    artist: "F.A.T.H.E.R",
    src: "/NYPD - F.A.T.H.E.R (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 19,
    title: "Proper Patola",
    artist: "Proper Patola",
    src: "/Proper Patola - Proper Patola (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 20,
    title: "Snap",
    artist: "Cloud 9",
    src: "/Snap - Cloud 9 (320 kbps).mp3",
    image: "/im.png",
  },
  {
    id: 21,
    title: "Tequila Shot",
    artist: "Proper Patola",
    src: "/Tequila Shot - Proper Patola (320 kbps).mp3",
    image: "/im.png",
  },
];

  /* ================= MUSIC STATE ================= */

  const audioRef = useRef(null);

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = songs[currentSong];

  /* ================= LOAD SONG ================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.load();

    setCurrentTime(0);
    setDuration(0);

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  /* ================= AUDIO EVENTS ================= */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setCurrentSong((prev) => {
        if (prev === songs.length - 1) {
          return 0;
        }

        return prev + 1;
      });
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  /* ================= PLAY / PAUSE ================= */

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.log("Audio error:", error);
        });
    }
  };

  /* ================= PREVIOUS ================= */

  const previousSong = () => {
    setCurrentSong((prev) => {
      if (prev === 0) {
        return songs.length - 1;
      }

      return prev - 1;
    });

    setIsPlaying(true);
  };

  /* ================= NEXT ================= */

  const nextSong = () => {
    setCurrentSong((prev) => {
      if (prev === songs.length - 1) {
        return 0;
      }

      return prev + 1;
    });

    setIsPlaying(true);
  };

  /* ================= SEEK ================= */

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);

    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = newTime;

    setCurrentTime(newTime);
  };

  /* ================= FORMAT TIME ================= */

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/ait-campus.png.png')",
      }}
    >

      {/* ================= SMOOTH CLOCK ================= */}

     <style>
  {`
    @keyframes smoothBlink {
      0%,
      42% {
        opacity: 1;
      }

      50% {
        opacity: 0.15;
      }

      58%,
      100% {
        opacity: 1;
      }
    }

    .clock-colon {
      animation: smoothBlink 1.2s ease-in-out infinite;
    }

    .music-disc {
      animation: rotateDisc 8s linear infinite;
      animation-play-state: paused;
    }

    .music-disc.playing {
      animation-play-state: running;
    }

    @keyframes rotateDisc {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    input[type="range"] {
      appearance: none;
      -webkit-appearance: none;
    }

    input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      -webkit-appearance: none;
      width: 0;
      height: 0;
    }

    input[type="range"]::-moz-range-thumb {
      width: 0;
      height: 0;
      border: 0;
    }
  `}
</style>

      {/* ================= DARK OVERLAY ================= */}

      <div className="absolute inset-0 bg-black/10" />


      {/* ================= NAVBAR ================= */}

      <nav className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 text-white">

        {/* TIME */}

        <div className="text-sm font-medium tracking-wide">

          <span>
            {time.split(":")[0]}

            <span className="clock-colon">
              :
            </span>

            {time.split(":")[1]}
          </span>

        </div>


        {/* ONLINE */}

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 text-sm font-semibold drop-shadow-lg">

          <span className="h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,1)]" />

          <span>
            2 online
          </span>

        </div>


        {/* ================= RIGHT MUSIC LINKS ================= */}

        <div className="ml-auto flex items-center gap-7">

          {/* SPOTIFY */}

          <a
            href="https://open.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white transition hover:opacity-70"
          >

            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >

              <circle
                cx="12"
                cy="12"
                r="10"
              />

              <path
                d="M7 9.5c3.5-1 7-.7 10 .6"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />

              <path
                d="M7.5 12.5c3-.7 5.8-.4 8.5.7"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />

              <path
                d="M8 15.2c2.2-.4 4.3-.1 6.3.6"
                stroke="black"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />

            </svg>

            <span>
              Spotify
            </span>

          </a>


          {/* YOUTUBE MUSIC */}

          <a
            href="https://music.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white transition hover:opacity-70"
          >

            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >

              <circle
                cx="12"
                cy="12"
                r="10"
              />

              <polygon
                points="10,8.5 16,12 10,15.5"
                fill="black"
              />

            </svg>

            <span>
              YT Music
            </span>

          </a>

        </div>

      </nav>


      {/* ================= CENTER ================= */}

      <section className="absolute inset-0 z-20 flex items-center justify-center -translate-y-40">

        <div className="text-center text-white drop-shadow-[0_6px_15px_rgba(0,0,0,0.5)]">

          <h1 className="text-7xl font-black md:text-[150px]">
            हार्ड AIT
          </h1>

        </div>

      </section>


      {/* ================= AUDIO ================= */}

      <audio
  ref={audioRef}
  src={song.src}
  preload="metadata"
/>


      {/* ================= MUSIC PLAYER ================= */}

      <div className="absolute bottom-[82px] left-1/2 z-50 w-[90%] max-w-2xl -translate-x-1/2">

        <div className="flex items-center gap-4 rounded-full border border-white/20 bg-[#79392f]/20 px-4 py-3 text-white shadow-2xl backdrop-blur-md">


          {/* ================= ALBUM IMAGE ================= */}

         <div className="hidden h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/30 sm:block">

  <img
    src="/im.png"
    alt="Music"
    className={`h-full w-full object-cover music-disc ${
      isPlaying ? "playing" : ""
    }`}
  />

</div>


          {/* ================= SONG INFORMATION ================= */}

          <div className="min-w-0 flex-1">

            <p className="truncate text-sm font-bold md:text-base">
              {song.title}
            </p>

            <p className="truncate text-xs text-white/70 md:text-sm">
              {song.artist}
            </p>


            {/* ================= PROGRESS BAR ================= */}

            <div className="relative mt-3 h-1 w-full">

              <div className="absolute inset-0 rounded-full bg-white/30" />

              <div
                className="absolute left-0 top-0 h-1 rounded-full bg-white"
                style={{
                  width:
                    duration > 0
                      ? `${(currentTime / duration) * 100}%`
                      : "0%",
                }}
              />

              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="absolute left-0 top-[-6px] h-4 w-full cursor-pointer opacity-0"
              />

            </div>


            {/* TIME */}

            <p className="mt-1 text-[10px] text-white/70">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>

          </div>


          {/* ================= MUSIC CONTROLS ================= */}

          <div className="flex items-center gap-5">


            {/* PREVIOUS */}

            <button
              onClick={previousSong}
              className="hidden items-center justify-center text-white outline-none transition-all duration-200 hover:scale-110 hover:opacity-70 md:flex"
              aria-label="Previous song"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 5V19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M18 6L10 12L18 18V6Z"
                  fill="white"
                />
              </svg>
            </button>


            {/* PLAY / PAUSE */}

            <button
              onClick={togglePlay}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-xl outline-none transition hover:scale-105 focus:outline-none"
              aria-label={isPlaying ? "Pause" : "Play"}
            >

              {isPlaying ? (

                <span className="flex gap-[3px]">

                  <span className="h-4 w-[3px] rounded-sm bg-black" />

                  <span className="h-4 w-[3px] rounded-sm bg-black" />

                </span>

              ) : (

                <span
                  className="ml-[3px] h-0 w-0"
                  style={{
                    borderTop: "8px solid transparent",
                    borderBottom: "8px solid transparent",
                    borderLeft: "12px solid black",
                  }}
                />

              )}

            </button>


            {/* NEXT */}

            <button
              onClick={nextSong}
              className="hidden items-center justify-center text-white outline-none transition-all duration-200 hover:scale-110 hover:opacity-70 md:flex"
              aria-label="Next song"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 5V19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6L14 12L6 18V6Z"
                  fill="white"
                />
              </svg>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;