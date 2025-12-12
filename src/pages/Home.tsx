import { useState } from 'react';
import { useStore } from '../store/useStore';

const Home = () => {
  const [inputName, setInputName] = useState('');
  const { setNickname, nextStep } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputName.trim()) {
      setNickname(inputName);
      nextStep();
    }
  };

  return (
    <div className='flex flex-col items-center min-h-full p-6 text-center relative z-10'>
      {/* 안내 문구 */}
      <div className='mt-4 mb-2 animate-fade-in-up'>
        <h2 className='text-2xl font-bold text-[#1A1A1A] mb-4 leading-relaxed'>
          <span className='text-white bg-[#004D40] px-3 py-1 rounded-full text-sm mr-2 align-middle border-2 border-black'>
            NOTICE
          </span>
          <br />
          <span className='inline-block mt-3'>
            2025년 당신의 행적을
            <br />
            <span className='text-[#D32F2F] underline decoration-4 underline-offset-4'>산타가 팩트체크</span> 후
            <br></br>
            영수증을 발행해줍니다.
          </span>
        </h2>
        <p className='text-sm text-gray-500 font-medium mt-4'>
          어떤 항목들이 영수증에 찍힐지 궁금하지 않나요?
          <br />
          영수증에 얼마가 찍히는지 확인해보세요!
        </p>
      </div>
      {/* 메인 아이콘 */}
      <div className='text-8xl mb-3 drop-shadow-xl'>
        <img src='/santa1.png' alt='Santa' className='h-50 w-auto object-contain' />
      </div>
      {/* 입력 폼 */}
      <form onSubmit={handleSubmit} className='w-full max-w-xs animate-fade-in-up delay-200'>
        <div className='relative mb-4'>
          <label className='block text-left text-[#1A1A1A] text-xs font-bold mb-2 ml-2'>이름(닉네임)</label>
          <input
            type='text'
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder='예: 루돌프'
            className='w-full px-4 py-4 text-lg border-2 border-black rounded-xl focus:outline-none focus:border-[#D32F2F] transition-colors text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white text-black font-bold placeholder-gray-300'
            maxLength={10}
            required
          />
        </div>

        <button
          type='submit'
          disabled={!inputName.trim()}
          className={`
            w-full py-4 text-xl font-black rounded-xl transition-all transform border-2 border-black
            ${
              inputName.trim()
                ? 'bg-[#D32F2F] text-white hover:bg-[#B71C1C] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
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
