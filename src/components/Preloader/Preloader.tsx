import preloader from '../../assets/icons/preloader.svg';

export default function Preloader() {
  return (
    <div className="preloader">
      <img src={preloader} alt="Preloader" />
    </div>
  );
}
