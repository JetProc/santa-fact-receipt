interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const Chip = ({ label, selected, onClick }: ChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 rounded-full text-sm font-bold border-2 transition-all duration-200 shadow-sm
        ${
          selected
            ? 'bg-[#D32F2F] text-white border-[#D32F2F] transform scale-105 shadow-md'
            : 'bg-white text-[#004D40] border-[#004D40]/30 hover:border-[#D32F2F] hover:text-[#D32F2F] hover:bg-red-50'
        }
      `}
    >
      {selected && (
        <span className='absolute -top-1 -right-1 flex h-3 w-3'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-3 w-3 bg-yellow-500 border border-white'></span>
        </span>
      )}

      {label}
    </button>
  );
};

export default Chip;
