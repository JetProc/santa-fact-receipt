import { useStore } from './store/useStore';
import Home from './pages/Home';
import Survey from './pages/Survey';
import Result from './pages/Result';
import Layout from './components/Layout';

function App() {
  const { step } = useStore();

  return (
    <main className='w-full h-screen relative overflow-hidden bg-[#FDFBF7]'>
      <div className='w-full max-w-[480px] mx-auto h-full relative z-10 box-border shadow-2xl bg-[#FDFBF7]'>
        <Layout>
          {step === 0 && <Home />}
          {step >= 1 && step <= 5 && <Survey />}
          {step === 6 && <Result />}
        </Layout>
      </div>
    </main>
  );
}

export default App;
