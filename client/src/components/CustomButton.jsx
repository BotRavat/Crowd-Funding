export default function CustomButton({ btnType, title, handleClick, styles }) {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-base leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
