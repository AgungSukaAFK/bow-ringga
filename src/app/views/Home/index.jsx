"use client";
import { useEffect, useState } from "react";
import s from "./index.module.scss";
import Image from "next/image";
import { useTheme } from "next-themes";
import text from "@/data/text.json";
import ManualLoading from "@/app/ui/Loading";
import Navbar from "@/app/Template/Navbar";
import Kontak from "@/app/Template/Kontak";

export default function HomeView() {
  const [lang, setLang] = useState("bahasa");
  const [t, setT] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isC, setIsC] = useState(false);
  const { theme, setTheme } = useTheme();

  function hamburgerHandler() {
    setIsOpen((prev) => !prev);
  }

  function langHandler() {
    setLang(lang == "bahasa" ? "english" : "bahasa");
  }

  function toggleContact() {
    setIsC((prev) => !prev);
  }

  useEffect(() => {
    setT(text[lang]);
  }, [lang]);

  return (
    <>
      {t ? (
        <main className={s.container}>
          <Navbar
            s={s}
            t={t}
            isOpen={isOpen}
            toggleContact={toggleContact}
            setIsOpen={setIsOpen}
          />

          {/* Halaman Utama */}
          <section className={s.main}>
            <h1 className={s.main__title}>{t.poi}</h1>
            <p className={s.main__description}>{t.desc}</p>
            <Image
              src={"/profile.png"}
              width={300}
              height={300}
              alt="Profile Pic"
              className={s.main__image}
              draggable={false}
            />
          </section>

          {/* Bagian opsi */}
          <section className={s.theme}>
            <div className={`${s.theme__wrapper} ${s.theme__theme}`}>
              {theme === "light" ? (
                <div
                  onClick={() => setTheme("dark")}
                  className={s.theme__toggle}
                >
                  <i className="bx bx-sun"></i> {t.light}
                </div>
              ) : (
                <div
                  onClick={() => setTheme("light")}
                  className={s.theme__toggle}
                >
                  <i className="bx bx-moon"></i> {t.dark}
                </div>
              )}
            </div>
            <span>|</span>
            <div className={s.theme__wrapper}>
              <div className={s.theme__toggle} onClick={langHandler}>
                <i className="bx bx-world"></i>{" "}
                {lang === "bahasa" ? "Bahasa" : "English"}
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className={s.footer}>
            <div>{t.footer}</div>
          </section>

          {/* Kontak */}
          {isC && <Kontak s={s} t={t} setIsC={setIsC} />}
        </main>
      ) : (
        <main className={s.container}>
          <ManualLoading isLoading={true} />
        </main>
      )}
    </>
  );
}
