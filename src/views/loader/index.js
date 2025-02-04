import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div
      className={`${styles["loader-background"]} d-flex justify-content-center align-items-center`}
    >
      <div className="d-flex flex-column justify-content-center align-content-center">
        <div className="d-flex flex-column text-center">
          <h5 className="fw-bold mb-0 text-white w-auto mx-auto p-2">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Loader;
