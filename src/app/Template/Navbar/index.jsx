export default function Navbar({ s, t, isOpen, toggleContact, setIsOpen }) {
  function hamburgerHandler() {
    setIsOpen((prev) => !prev);
  }
  return (
    <nav className={s.nav}>
      {/* Normal nav */}
      <div className={s.contact} onClick={toggleContact}>
        {t.navContact}
      </div>
      <div className={s.logo}>
        Ringga<span>Maulana</span>
      </div>
      <div className={s.cv}>
        <a target="_blank" href="CV Muhamad Ringga Maulana.pdf">
          {t.navCv} <i className="bx bx-link-external"></i>
        </a>
      </div>
      <div className={s.menu} onClick={hamburgerHandler}>
        <i className="bx bx-menu"></i>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className={s.mobile}>
          <div className={s.mobile__contact} onClick={toggleContact}>
            {t.navContact}
          </div>
          <div className={s.mobile__cv}>
            <a target="_blank" href="CV Muhamad Ringga Maulana.pdf">
              {t.navCv} <i className="bx bx-link-external"></i>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
