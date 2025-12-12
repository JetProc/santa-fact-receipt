export interface ChipItem {
  id: string;
  label: string;
  receiptTexts: string[];
  priceMin: number;
  priceMax: number;
}

export interface Question {
  id: number;
  category: string;
  title: string;
  chips: ChipItem[];
}

export const questions: Question[] = [
  {
    id: 1,
    category: 'home',
    title: '올해 집에서 나는 주로...',
    chips: [
      {
        id: 'sleep',
        label: '잠/수면',
        receiptTexts: [
          '😴 알람을 몇 번이나 미뤘는지 계산하기도 포기한 아침 비용',
          '🛌 침대와 한 몸이 된 날의 책임 비용',
          '⏰ 스누즈 버튼 의존도 상승 관리비',
        ],
        priceMin: 30000,
        priceMax: 250000,
      },
      {
        id: 'youtube',
        label: '유튜브/OTT',
        receiptTexts: [
          '📺 “딱 한 편만”이 결국 마라톤이 된 시청료',
          '🍽️ 밥 다 먹고도 계속 골라보다 생긴 시간 지연비',
          '🎬 밀린 OTT 구독권 유지비',
        ],
        priceMin: 15000,
        priceMax: 180000,
      },
      {
        id: 'delivery',
        label: '배달음식',
        receiptTexts: [
          '🛵 배달비가 음식값보다 비싸 보인 날의 반성비',
          '🌏 일회용품 안 받기로 했지만 결국 받은 환경 죄책비',
          '🌶️ 매운 음식 먹고 후폭풍 겪은 회복비',
        ],
        priceMin: 15000,
        priceMax: 500000,
      },
      {
        id: 'cleaning',
        label: '청소/정리',
        receiptTexts: [
          '🧹 손님 온다 해서 급히 치운 흔적 정리비',
          '🪑 의자 위 옷더미 치우기 인건비(본인 부담)',
          '🧻 돌돌이 3회전 만에 끝나버린 테이프 추가 구매비',
        ],
        priceMin: 8900,
        priceMax: 50000,
      },
      {
        id: 'game',
        label: '게임/PC',
        receiptTexts: [
          '🎮 연패로 멘탈 수습하는 데 든 감정 회복비',
          '💎 할인 뜨면 결국 지른 현질 방어 실패비',
          '🏠 가상 세계에서 집 사고 꾸민 내적 만족비',
        ],
        priceMin: 0,
        priceMax: 99000,
      },
      {
        id: 'home_cook',
        label: '요리/베이킹',
        receiptTexts: [
          '🍳 레시피 따라 했지만 결국 배달로 끝난 시도비',
          '🥬 냉장고 파먹기 성공의 작은 성취 보너스',
          '🔥 한 번 태운 냄비 되살리기 복구비',
        ],
        priceMin: -5000,
        priceMax: 30000,
      },
      {
        id: 'pet',
        label: '반려동물',
        receiptTexts: [
          '🐾 간식 조공비 정기 납부',
          '🐕 산책 나갔다가 결국 같이 지친 본인 노동비',
          '🧼 털 제거하다 테이프 한 롤 순삭 비용',
        ],
        priceMin: 50000,
        priceMax: 300000,
      },
      {
        id: 'workout_home',
        label: '홈트',
        receiptTexts: [
          '🧘 요가매트는 폈지만 결국 누워있던 시간 사용료',
          '🌀 폼롤러 방치해둔 보관료',
          '💪 작심삼일 운동 결심 갱신비',
        ],
        priceMin: 0,
        priceMax: 50000,
      },
      {
        id: 'plant',
        label: '식물키우기',
        receiptTexts: [
          '🌱 과습으로 보내버린 식물 추모비',
          '🌿 화분 하나가 둘 되고 셋 된 번식 확장비',
          '🐛 갑자기 나타난 벌레 퇴치 전쟁비',
        ],
        priceMin: 5000,
        priceMax: 100000,
      },
    ],
  },
  {
    id: 2,
    category: 'consumption',
    title: '내 지갑을 털어간 주범은?',
    chips: [
      {
        id: 'food',
        label: '식비/맛집',
        receiptTexts: [
          '🍽️ 배는 찼는데 지갑은 가벼워진 외식비',
          '⏳ 웨이팅하면서 포기 못 하고 버틴 인내 비용',
          '💥 식비 지출 그래프 폭등 경고',
        ],
        priceMin: 4500,
        priceMax: 150000,
      },
      {
        id: 'coffee',
        label: '커피/카페',
        receiptTexts: [
          '☕ 카페인 없으면 하루가 안 굴러가서 생긴 유지비',
          '📸 분위기만 보고 들어갔는데 가격은 안 예뻤던 감성비',
          '💺 카공 4시간 자리 점유 사용료',
        ],
        priceMin: 4500,
        priceMax: 120000,
      },
      {
        id: 'impulse',
        label: '홧김비용',
        receiptTexts: [
          '💢 스트레스 받아서 일단 질러본 해소비',
          '🎁 사놓고 어디에 둘지 애매한 물건 구매비',
          '📦 택배 뜯는 순간의 행복 사용료',
        ],
        priceMin: 2500,
        priceMax: 181818,
      },
      {
        id: 'taxi',
        label: '택시/교통',
        receiptTexts: [
          "🚖 '지각각' 떠오르는 순간 호출한 긴급비",
          '🌙 심야 할증 만난 날의 충격비',
          '🏃 버스 놓치고 울며 탄 택시비',
        ],
        priceMin: 9800,
        priceMax: 50000,
      },
      {
        id: 'fashion',
        label: '패션/옷',
        receiptTexts: [
          '👗 이미 옷이 꽉 찼는데도 입을 게 없어서 생긴 해결비',
          '🛍️ 쇼핑앱 돌고 도는 순환구매비',
          '📦 언젠가 입겠지 하며 쌓아둔 옷 보관비',
        ],
        priceMin: 30000,
        priceMax: 500000,
      },
      {
        id: 'hobby',
        label: '취미/덕질',
        receiptTexts: [
          '📸 포카·굿즈 모으면서 생긴 수집 비용',
          '📦 굿즈 전용 수납공간 확보비',
          '🎫 티켓팅 실패 후 멘탈 회복비',
        ],
        priceMin: 15000,
        priceMax: 300000,
      },
      {
        id: 'convenience',
        label: '편의점',
        receiptTexts: [
          '🏪 2+1이면 일단 집어오는 습관 유지비',
          '🍜 신상 라면 테스트 비용',
          '🍺 맥주 4캔 만원의 달콤한 유혹비',
        ],
        priceMin: 5000,
        priceMax: 50000,
      },
      {
        id: 'beauty',
        label: '미용/관리',
        receiptTexts: [
          '🎨 꾸며볼까 하는 마음에 쓴 스타일링 실험비',
          '🧴 올영 세일 때 계획 없는 구매 충동비',
          '✂️ 셀프컷 실패 후 복구 시도비',
        ],
        priceMin: 15000,
        priceMax: 200000,
      },
    ],
  },
  {
    id: 3,
    category: 'work_school',
    title: '올해 학교/직장 생활은?',
    chips: [
      {
        id: 'soul_out',
        label: '영혼가출',
        receiptTexts: [
          '👻 물어보면 자동으로 ‘네…’ 나오는 상태 유지비',
          '🧠 두뇌 절전 모드로 버틴 하루 비용',
          '🐟 초점 잃은 눈빛 되찾기 복구비',
        ],
        priceMin: 0,
        priceMax: 50000,
      },
      {
        id: 'lupin',
        label: '월급루팡',
        receiptTexts: ['⌨️ Alt+Tab 스킬 남용비', '🚽 화장실 20분 평온 유지 관리비', '⚖️ 해야 할 만큼만 한 균형 유지비'],
        priceMin: 9860,
        priceMax: 100000,
      },
      {
        id: 'slave',
        label: '노예모드',
        receiptTexts: ['🧟 야근과 과제로 좀비화된 회복비', '🔥 번아웃 경고등 소등 비용', '💆 거북목·어깨 교정비'],
        priceMin: 0,
        priceMax: 1000000,
      },
      {
        id: 'lunch',
        label: '점심메뉴',
        receiptTexts: [
          '🤔 “뭐 먹지?” 고민하다 보낸 시간비',
          '💳 법카 쓰는 날의 묘한 책임감 비용',
          '🍚 구내식당 회피 후 생긴 외식비',
        ],
        priceMin: 0,
        priceMax: 15000,
      },
      {
        id: 'meeting',
        label: '회의/발표',
        receiptTexts: ['💤 회의 중 졸음 버티기 유지비', '📢 발표할 때 떨림 잡는 비용', '🤖 말 더듬음 오류 수정비'],
        priceMin: 500,
        priceMax: 5000,
      },
      {
        id: 'commute',
        label: '출퇴근/통학',
        receiptTexts: [
          '🚇 지옥철에서 체력 갈린 샌드위치 체험료',
          '🚌 서서 가느라 생긴 균형 잡기 스킬비',
          '🎧 이어폰 배터리 끊겨 생긴 현자 타임비',
        ],
        priceMin: 1500,
        priceMax: 3000,
      },
      {
        id: 'snack_office',
        label: '탕비실',
        receiptTexts: [
          '🍪 과자 어디 갔나 했더니 내가 먹은 비용',
          '☕ 믹스커피 하루 3잔 유지비',
          '🍫 회사 간식 몰래 추가 섭취비',
        ],
        priceMin: -1000,
        priceMax: 0,
      },
    ],
  },
  {
    id: 4,
    category: 'relationship',
    title: '올해 나의 인간관계는?',
    chips: [
      {
        id: 'introvert',
        label: '집순이/I형',
        receiptTexts: [
          '🚕 약속 가기 전에 이미 체력 반 쓴 기력비',
          '🙏 취소되면 솔직히 조금 기뻤던 속마음비',
          '📵 읽씹 안 하려다 실패한 관계 관리비',
        ],
        priceMin: 500,
        priceMax: 15000,
      },
      {
        id: 'party',
        label: '파티/E형',
        receiptTexts: ['🎤 노래방 마이크 독점 사용료', '🧠 사라진 기억 복구 시도비', '🍻 숙취 해결에 든 아침 회복비'],
        priceMin: 5000,
        priceMax: 30000,
      },
      {
        id: 'romance',
        label: '연애/썸',
        receiptTexts: [
          '🎄 크리스마스에 나 자신과 보내는 데 쓴 알뜰비',
          '💔 연애 세포 깨워보려다 실패한 시도비',
          '💸 데이트 통장 잠들어 있는 유지비',
        ],
        priceMin: 0,
        priceMax: 500,
      },
      {
        id: 'family',
        label: '가족/효도',
        receiptTexts: ['🛡️ 잔소리 방패 활성화비', '💝 어버이날 크게 쓴 효도비', '🧑‍🤝‍🧑 동생 심부름 수고비(본인 부담)'],
        priceMin: -5000,
        priceMax: 200000,
      },
      {
        id: 'gift',
        label: '선물/경조사',
        receiptTexts: [
          '🎁 친구 생일 챙기기 기본 의례비',
          '💒 결혼식 축의금 프로 하객비',
          '🤷 애매한 지인 축의금 고민 수수료',
        ],
        priceMin: 20000,
        priceMax: 100000,
      },
      {
        id: 'gossip',
        label: '수다/뒷담',
        receiptTexts: [
          '🗣️ 카페에서 4시간 떠든 후 목소리 관리비',
          '🎋 친구랑 비밀 나눈 신뢰 유지비',
          '🙊 말 조심하려던 다짐 실패비',
        ],
        priceMin: 0,
        priceMax: 5000,
      },
      {
        id: 'sns_rel',
        label: 'SNS/인스타',
        receiptTexts: [
          '🔍 과거 인물 탐색에 사용한 심층 조사비',
          '❤️ 좋아요 누르며 유지한 예의비',
          '📩 답장 미루기 연체비',
        ],
        priceMin: 0,
        priceMax: 100,
      },
    ],
  },
  {
    id: 5,
    category: 'addiction',
    title: '2025년 내가 못 끊은 것은?',
    chips: [
      {
        id: 'shorts',
        label: '숏폼/릴스',
        receiptTexts: [
          '📱 잠깐 본다고 시작했는데 멈추지 못한 스크롤비',
          '⏱️ 시간 순삭의 책임비',
          '🧠 도파민 과다 공급 조절비',
        ],
        priceMin: 7000,
        priceMax: 200000,
      },
      {
        id: 'zero',
        label: '제로음료',
        receiptTexts: [
          '🥤 제로니까 괜찮다며 스스로 설득한 비용',
          '⚗️ 하루 한 캔이 두 캔 된 습관비',
          '🧃 신상 제로 음료 시음비',
        ],
        priceMin: 1500,
        priceMax: 3000,
      },
      {
        id: 'meme',
        label: '밈/드립',
        receiptTexts: [
          '🚫 말 끝마다 밈 붙이다 발생한 자제 실패비',
          '🕺 어설픈 챌린지 따라 하다 난감했던 순간비',
          '🎭 과다 드립 사용 진정비',
        ],
        priceMin: 0,
        priceMax: 500,
      },
      {
        id: 'sugar',
        label: '단짠음식',
        receiptTexts: [
          '📈 혈당 롤러코스터 체험비',
          '🍟 야식의 유혹을 못 이긴 위장 보상비',
          '🦷 단순당 섭취로 예약한 치과 선납비',
        ],
        priceMin: 3000,
        priceMax: 100000,
      },
      {
        id: 'idol',
        label: '아이돌/덕질',
        receiptTexts: ['💿 앨범 여러 장 쌓여 생긴 중복 파티비', '🔋 응원봉 배터리 교체비', '💖 최애 사랑 유지비'],
        priceMin: 15000,
        priceMax: 150000,
      },
      {
        id: 'shopping',
        label: '쇼핑/택배',
        receiptTexts: [
          '📦 와우 회원비 본전 뽑기 프로젝트비',
          '🛒 장바구니에 담기만 하려다가 결국 결제한 비용',
          '📮 반품 귀찮아서 그냥 쓰는 체념비',
        ],
        priceMin: 5000,
        priceMax: 500000,
      },
      {
        id: 'alcohol',
        label: '술/알콜',
        receiptTexts: [
          '🤦‍♂️ 어제의 나를 후회한 흑역사 정리비',
          '💊 간 보호 영양제 정기 복용비',
          '🍲 해장국으로 정신 차리는 회복비',
        ],
        priceMin: 10000,
        priceMax: 300000,
      },
    ],
  },
];
