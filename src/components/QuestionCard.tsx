import type { Question } from '../data/questions';
import Chip from './Chip';
import { useStore } from '../store/useStore';

interface Props {
  data: Question;
}

const QuestionCard = ({ data }: Props) => {
  const { selectedChips, addChip, removeChip } = useStore();

  const currentQuestionSelectedCount = data.chips.filter((chip) => selectedChips.includes(chip.id)).length;

  const handleToggle = (chipId: string) => {
    if (selectedChips.includes(chipId)) {
      removeChip(chipId);
    } else {
      if (currentQuestionSelectedCount >= 3) {
        if (navigator.vibrate) navigator.vibrate(50);
        return;
      }
      addChip(chipId);
    }
  };

  return (
    <div className='w-full animate-fade-in-up px-4'>
      {/* 질문 제목 영역 */}
      <div className='mb-8 text-center'>
        {/* 소제목: 빨간색 */}
        <span className='text-[#D32F2F] font-bold text-sm tracking-widest uppercase block mb-2'>
          Question {data.id}
          {/* 장식용 루돌프 코 */}
          <span className='inline-block w-2 h-2 bg-red-600 rounded-full ml-2 animate-pulse'></span>
        </span>

        {/* 메인 질문: 짙은 초록색 */}
        <h2 className='text-2xl font-bold whitespace-pre-line leading-snug text-[#004D40]'>{data.title}</h2>

        {/* 안내 문구: 톤다운된 색상 */}
        <p className='text-[#5D4037] text-xs mt-3 font-bold'>(최대 3개까지 선택해주세요!)</p>
      </div>

      {/* 칩 리스트 */}
      <div className='flex flex-wrap justify-center gap-3'>
        {data.chips.map((chip) => (
          <Chip
            key={chip.id}
            label={chip.label}
            selected={selectedChips.includes(chip.id)}
            onClick={() => handleToggle(chip.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
