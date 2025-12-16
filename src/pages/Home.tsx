import { useState } from 'react';
import { useStore } from '../store/useStore';

const Home = () => {
  const [inputName, setInputName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { setNickname, nextStep } = useStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 1. 글자수 제한 (8글자)
    if (value.length > 8) return;

    setInputName(value);

    // 2. 사용자가 다시 입력을 시작하면 에러 메시지 초기화
    if (errorMsg) {
      setErrorMsg('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputName.trim()) return;

    // 3. 제출 버튼 눌렀을 때 유효성 검사 실행
    const regex = /^[가-힣a-zA-Z\s]+$/;

    if (!regex.test(inputName)) {
      // 검사 실패 시 에러 메시지 띄우고 중단
      setErrorMsg('한글이나 영문만 입력해주세요! (자음, 숫자, 특수문자 🚫)');

      // 에러 시 진동 울리기
      if (navigator.vibrate) navigator.vibrate(200);
      return;
    }

    // 검사 통과 시 다음 단계로
    setNickname(inputName);
    nextStep();
  };

  return (
    <div className='flex flex-col items-center min-h-full p-6 text-center relative z-10'>
      {/* 안내 문구 */}
      <div className='mb-2 animate-fade-in-up'>
        <h2 className='text-2xl font-bold text-[#1A1A1A] mb-4 leading-relaxed'>
          <span className='text-white bg-[#004D40] px-3 py-1 rounded-full text-sm align-middle border-2 border-black'>
            NOTICE
          </span>
          <br />
          <span className='inline-block mt-1'>
            2025년 당신의 행적을
            <br />
            <span className='text-[#D32F2F] underline decoration-4 underline-offset-4'>산타가 팩트체크</span> 후
            <br></br>
            영수증을 발행해줍니다.
          </span>
        </h2>
        <p className='text-sm text-gray-500 font-medium'>영수증에 얼마가 찍히는지 확인해보세요!</p>
      </div>

      {/* 메인 아이콘 */}
      <div className='text-8xl mb-1 drop-shadow-xl'>
        <img src='/santa1.png' alt='Santa' className='h-35 w-auto object-contain' />
      </div>

      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className='w-full max-w-xs animate-fade-in-up delay-200'>
        <div className='relative'>
          <label className='block text-left text-[#1A1A1A] text-s font-bold mb-1 ml-2'>이름</label>
          <input
            type='text'
            value={inputName}
            onChange={handleInputChange}
            placeholder='예: 루돌프'
            className={`
              w-full px-2 py-2 text-lg border-2 rounded-xl focus:outline-none transition-colors text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold placeholder-gray-300
              ${
                errorMsg
                  ? 'border-red-500 bg-red-50 text-red-500 focus:border-red-500 animate-shake'
                  : 'border-black bg-white text-black focus:border-[#D32F2F]'
              }
            `}
            required
          />
        </div>

        {/* 에러 메시지 영역 */}
        <div className='h-6 mb-2 text-xs font-bold text-red-500 flex items-center justify-center'>{errorMsg}</div>

        <button
          type='submit'
          disabled={!inputName.trim()}
          className={`
            w-full py-2 text-xl font-black rounded-xl transition-all transform border-2 border-black
            ${
              inputName.trim()
                ? 'bg-[#D32F2F] text-white hover:bg-[#B71C1C] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed shadow-none'
            }
          `}
        >
          시작하기 🎄
        </button>
      </form>
    </div>
  );
};

export default Home;
