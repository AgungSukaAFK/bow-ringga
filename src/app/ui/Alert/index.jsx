import s from "./index.module.scss";

const Alert = ({ message, setAlert }) => {
  return (
    <div className={s.container}>
      <div onClick={() => setAlert(null)}>
        <button>back</button>
      </div>
      <div>
        <i className="bx bxs-bell"></i> {message}
      </div>
    </div>
  );
};

export default Alert;
