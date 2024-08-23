"use client";
import { emailServices } from "@/app/service/email";
import Alert from "@/app/ui/Alert";
import ManualLoading from "@/app/ui/Loading";
import sosmed from "@/data/sosmed.json";
import { useRef, useState } from "react";

export default function Kontak({ s, t, setIsC }) {
  const [isLoading, setIsLoading] = useState(false);
  const [nama, setNama] = useState(null);
  const [email, setEmail] = useState(null);
  const [pesan, setPesan] = useState(null);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(null);

  const [nameRef, emailRef, messageRef] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  async function handleSubmit() {
    setIsLoading(true);
    if (!nama || !email || !pesan) {
      setError(t.cError);
    } else {
      const data = {
        email,
        name: nama,
        message: pesan,
      };
      const res = await emailServices.sendEmail(data);
      console.log(res);
      setNama(null);
      setEmail(null);
      setPesan(null);
      setError(null);
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
      if (res.status === 200) {
        setAlert(t.cAlert);
      } else {
        setAlert("Something went wrong");
      }
    }
    setIsLoading(false);
  }

  return (
    <div className={s.c}>
      <ManualLoading isLoading={isLoading} />
      {alert && <Alert message={alert} setAlert={setAlert} />}
      <div className={s.c__wrapper}>
        <h1 className={s.c__wrapper__header}>{t.cHeader}</h1>
        <button className={s.c__wrapper__back} onClick={() => setIsC(false)}>
          <i className="bx bx-arrow-back"></i> {t.cBack}
        </button>

        <form action="" className={s.c__wrapper__form}>
          <div>{t.cFormTitle}</div>
          <div className={s.c__wrapper__form__input}>
            <label htmlFor="name">{t.cLabelNama}</label>
            <input
              type="text"
              placeholder="name..."
              id="name"
              onChange={(e) => setNama(e.target.value)}
              ref={nameRef}
            />
          </div>
          <div className={s.c__wrapper__form__input}>
            <label htmlFor="email">{t.cLabelEmail}</label>
            <input
              type="email"
              placeholder="email..."
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            />
          </div>
          <div className={s.c__wrapper__form__input}>
            <label htmlFor="message">{t.cLabelPesan}</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="2"
              placeholder="message..."
              onChange={(e) => setPesan(e.target.value)}
              ref={messageRef}
            ></textarea>
          </div>
          <button type="button" onClick={handleSubmit}>
            {t.cFormButton}
          </button>
          {error && <div className={s.c__wrapper__form__error}>{error}</div>}
        </form>

        <div className={s.c__wrapper__information}>
          <div className={s.c__wrapper__information__left}>
            <div className={s.c__wrapper__information__content}>
              <h1>{t.cEmailSaya}</h1>
              <div>
                <i className="bx bx-envelope"></i> mringga11@gmail.com
              </div>
            </div>
            <div className={s.c__wrapper__information__content}>
              <h1>{t.cNomorSaya}</h1>
              <div>
                <i className="bx bx-phone"></i> +62 851-7320-2162
              </div>
            </div>
          </div>
          <div className={s.c__wrapper__information__right}>
            <div className={s.c__wrapper__information__content}>
              <h1>{t.cDomisiliSekarang}</h1>
              <div>
                <i className="bx bx-current-location"></i>
                <div>
                  <div>Surabaya,</div>

                  <div>Provinsi Jawa Timur</div>
                </div>
              </div>
            </div>
            <div className={s.c__wrapper__information__content}>
              <h1>{t.cDomisiliAsal}</h1>
              <div>
                <i className="bx bx-map"></i>
                <div>
                  <div>Kota Serang,</div>

                  <div>Provinsi Banten</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.c__wrapper__social}>
          <h1>{t.cSosmed}</h1>
          <div className={s.c__wrapper__social__content}>
            <a
              href={sosmed.linkedin}
              className={s.c__wrapper__social__content__card}
              target="_blank"
            >
              <i className="bx bxl-linkedin-square"></i>
            </a>
            <a
              href={`https://wa.me/${sosmed.whatsapp}`}
              target="_blank"
              className={s.c__wrapper__social__content__card}
            >
              <i className="bx bxl-whatsapp"></i>
            </a>
            <a
              href={sosmed.instagram}
              target="_blank"
              className={s.c__wrapper__social__content__card}
            >
              <i className="bx bxl-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
