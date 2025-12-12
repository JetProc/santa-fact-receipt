import { useStore } from '../store/useStore';
import { questions } from '../data/questions';
import QuestionCard from '../components/QuestionCard';

const Survey = () => {
  const { step, nextStep, prevStep, selectedChips } = useStore(); // prevStep 추가

  const currentQuestion = questions[step - 1];

  const isSelected = currentQuestion.chips.some((chip) => selectedChips.includes(chip.id));

  return (
    <div className='flex flex-col justify-between h-full py-4 px-5'>
      {/* 상단 프로그레스 바 */}
      <div className='w-full h-2 bg-gray-200 rounded-full mb-8 border border-black'>
        <div
          className='h-full bg-[#D32F2F] rounded-full transition-all duration-300 ease-out'
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      {/* 질문 카드 영역 */}
      <div className='flex-1 flex items-center justify-center'>
        <QuestionCard data={currentQuestion} />
      </div>

      {/* 하단 버튼 영역 */}
      <div className='mt-8 flex gap-3'>
        {step > 1 && (
          <button
            onClick={prevStep}
            className='flex-1 py-4 bg-white text-black border-2 border-black text-xl font-bold rounded-xl hover:bg-gray-100 transition-all'
          >
            이전
          </button>
        )}

        <button
          onClick={nextStep}
          disabled={!isSelected}
          className={`
            flex-[2] py-4 text-xl font-bold rounded-xl transition-all border-2 border-black
            ${
              isSelected
                ? 'bg-[#D32F2F] text-white hover:bg-[#B71C1C] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
            }
          `}
        >
          {step === questions.length ? '결과 확인하기' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default Survey;
