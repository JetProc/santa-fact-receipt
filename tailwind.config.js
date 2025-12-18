export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 크리스마스 전용 컬러 정의
        xmas: {
          red: '#D32F2F', // 쨍한 빨강 (강조)
          green: '#004D40', // 짙은 초록 (기본 텍스트)
          brown: '#5D4037', // 따뜻한 갈색 (보조 텍스트)
          bg: '#8B0000', // 전체 배경 버건디
          paper: '#F8F1E5', // 영수증 종이색 (크라프트지 느낌)
        },
      },
      fontFamily: {
        receipt: ['"Galmuri9"', '"Courier New"', 'monospace'],
      },
      keyframes: {
        printer: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        typewriter: {
          '0%': { opacity: '0', transform: 'translateY(-5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        stamp: {
          '0%': { opacity: '0', transform: 'scale(3) rotate(-10deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-10deg)' },
        },
      },
      animation: {
        typewriter: 'typewriter 0.05s ease-out forwards',
        stamp: 'stamp 0.3s cubic-bezier(0.5, 0, 0.75, 0) forwards',
        printer: 'printer 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards',
      },
    },
  },
  plugins: [],
};
