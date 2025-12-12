import { useStore } from '../store/useStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { reset } = useStore();

  const handleGoHome = () => {
    if (window.confirm('처음 화면으로 돌아가시겠습니까?\n작성 중인 내용은 사라집니다.')) {
      reset();
    }
  };

  return (
    <div className='flex flex-col h-full font-receipt text-[#1A1A1A]'>
      {/* 헤더 */}
      <header className='w-full h-[60px] flex items-center justify-center bg-[#FDFBF7] border-b-2 border-[#1A1A1A] px-4 shrink-0 relative z-50'>
        <button onClick={handleGoHome} className='flex items-center gap-3 hover:opacity-70 transition-opacity'>
          <img src='/santa2.png' alt='Santa' className='h-8 w-auto object-contain' />
          <h1 className='text-xl font-black tracking-tighter text-[#1A1A1A]'>SANTA'S FACT RECEIPT</h1>
        </button>
      </header>

      {/* 메인 콘텐츠 */}
      <main className='flex-1 w-full overflow-y-auto relative bg-[#FDFBF7]'>{children}</main>

      {/* 푸터 */}
      <footer className='w-full py-4 text-center text-gray-400 text-[10px] font-light bg-[#FDFBF7] border-t border-gray-100 shrink-0 relative z-50'>
        <p>Contact: jetproc@gmail.com</p>
        <p>© 2025 Santa's Fact Receipt</p>
      </footer>
    </div>
  );
};

export default Layout;
