import preloader from '../../assets/icons/preloader.svg';

export default function Preloader() {
  return (
    <div className="preloader">
      <span className="preloader__item">
        <img src={preloader} alt="Preloader" />
      </span>
    </div>
  );
}
