import { useStore } from './store/useStore';
import Home from './pages/Home';
import Result from './pages/Result';
import Layout from './components/Layout';
import { personas, questionsData, getAllChips } from './data/data';

function App() {
  const { step, setStep, nextStep, setPersona, selectedChips, toggleChip, answers, setAnswer } = useStore();

  // 현재 진행 중인 칩 질문 인덱스 계산 (Step 2부터 질문 시작)
  const currentQuestionIndex = step - 2;
  const currentQuestion = questionsData[currentQuestionIndex];

  // 전체 칩 데이터 가져오기
  const allChips = getAllChips();

  // 심층 질문이 필요한 칩들만 필터링
  const interrogationChips = allChips.filter(
    (chip) => selectedChips.includes(chip.id) && (chip.type === 'input' || chip.type === 'select')
  );

  // 총 질문 수
  const totalQuestions = questionsData.length;

  // 심층 질문 단계의 Step 번호
  const interrogationStep = 2 + totalQuestions;

  // 결과 페이지 Step 번호
  const resultStep = interrogationStep + 1;

  // 현재 질문에서 선택된 칩 개수 계산
  const selectedCountInCurrentQuestion = currentQuestion
    ? currentQuestion.chips.filter((chip) => selectedChips.includes(chip.id)).length
    : 0;

  // 칩 토글 핸들러
  const handleChipClick = (chipId: string) => {
    const isAlreadySelected = selectedChips.includes(chipId);

    if (isAlreadySelected) {
      toggleChip(chipId);
      return;
    }

    if (selectedCountInCurrentQuestion >= 3) {
      if (navigator.vibrate) navigator.vibrate(50);
      return;
    }

    toggleChip(chipId);
  };

  return (
    <main className='w-full h-screen relative overflow-hidden bg-[#FDFBF7]'>
      <div className='w-full max-w-[480px] mx-auto h-full relative z-10 box-border shadow-2xl bg-[#FDFBF7]'>
        <Layout>
          {/* Step 0: 홈 */}
          {step === 0 && <Home />}

          {/* Step 1: 신분 선택 */}
          {step === 1 && (
            <div className='p-4 h-full flex flex-col animate-fade-in-up'>
              <h2 className='text-xl font-bold mb-1 text-[#004D40]'>Q. 당신의 현재 상태는?</h2>
              <p className='text-xs text-[#5D4037] mb-3'>가장 가까운 모습을 골라주세요.</p>
              <div className='flex flex-col gap-2'>
                {personas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPersona(p.id);
                      nextStep();
                    }}
                    className='p-3 border-2 border-black rounded-lg hover:bg-red-50 hover:border-[#D32F2F] transition text-left shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-white'
                  >
                    <div className='font-bold text-sm mb-0.5'>{p.label}</div>
                    <div className='text-xs text-gray-500'>{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 ~ N: 칩 질문 반복 */}
          {currentQuestion && (
            <div className='p-4 h-full flex flex-col animate-fade-in-up'>
              <h2 className='text-xl font-bold mb-1 text-[#004D40]'>{currentQuestion.title}</h2>
              <p className='text-xs text-[#5D4037] mb-4'>{currentQuestion.subtitle}</p>

              <div className='grid grid-cols-2 gap-2 mb-4 content-start flex-1 overflow-y-auto'>
                {currentQuestion.chips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => handleChipClick(chip.id)}
                    className={`
                      px-2 py-2 rounded-lg text-xs font-bold border-2 transition-all shadow-sm w-full min-h-[48px] flex items-center justify-center break-keep leading-tight
                      ${
                        selectedChips.includes(chip.id)
                          ? 'bg-[#D32F2F] text-white border-[#D32F2F] shadow-md'
                          : 'bg-white text-[#004D40] border-[#004D40]/30'
                      }
                      ${
                        !selectedChips.includes(chip.id) && selectedCountInCurrentQuestion >= 3
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }
                    `}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* 이전/다음 버튼 그룹 */}
              <div className='flex gap-2 w-full shrink-0 mt-auto pt-2'>
                <button
                  onClick={() => setStep(step - 1)}
                  className='flex-1 py-3 bg-white text-black border-2 border-black rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors'
                >
                  이전
                </button>

                <button
                  onClick={() => {
                    if (currentQuestionIndex < totalQuestions - 1) {
                      nextStep();
                    } else {
                      if (interrogationChips.length > 0) {
                        setStep(interrogationStep);
                      } else {
                        setStep(resultStep);
                      }
                    }
                  }}
                  disabled={selectedCountInCurrentQuestion === 0}
                  className={`
                    flex-[2] py-3 text-lg font-bold rounded-lg transition-colors
                    ${
                      selectedCountInCurrentQuestion > 0
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  다음
                </button>
              </div>
            </div>
          )}

          {/* 심층 취조 */}
          {step === interrogationStep && (
            <div className='p-4 h-full flex flex-col animate-fade-in-up overflow-y-auto'>
              <h2 className='text-xl font-bold mb-1 text-[#D32F2F]'>🎅 산타의 심층 취조</h2>
              <p className='text-xs text-[#5D4037] mb-4'>정확한 팩트 체크를 위해 확인이 필요합니다.</p>

              <div className='space-y-4 flex-1'>
                {interrogationChips.map((chip) => (
                  <div key={chip.id} className='bg-white p-3 rounded-lg border-2 border-dashed border-gray-300'>
                    <label className='block font-bold mb-2 text-[#004D40] text-sm'>"{chip.question}"</label>

                    {chip.type === 'input' && (
                      <input
                        type='text'
                        className='w-full p-2 border-2 border-black rounded-lg font-bold text-center text-sm focus:outline-none focus:border-[#D32F2F]'
                        placeholder='입력해주세요'
                        value={answers[chip.id] || ''}
                        onChange={(e) => setAnswer(chip.id, e.target.value)}
                      />
                    )}

                    {chip.type === 'select' && (
                      <div className='flex flex-wrap gap-1.5'>
                        {chip.options?.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setAnswer(chip.id, opt)}
                            className={`flex-1 py-2 px-1.5 rounded-lg border-2 text-xs font-bold transition ${
                              answers[chip.id] === opt
                                ? 'bg-[#D32F2F] text-white border-[#D32F2F]'
                                : 'bg-gray-50 text-gray-600 border-gray-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(resultStep)}
                className='w-full mt-3 py-3 bg-[#D32F2F] text-white text-lg font-bold rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0'
              >
                영수증 출력하기 🧾
              </button>
            </div>
          )}

          {/* 결과 페이지 */}
          {step === resultStep && <Result />}
        </Layout>
      </div>
    </main>
  );
}

export default App;
