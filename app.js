/* ================================================
   app.js — GameRank 스팀 신작 랭킹 사이트
   ================================================ */

/* ===== 1. 게임 데이터 =====
   여기에 게임을 자유롭게 추가 / 수정하세요.

   필드 설명
   ─────────────────────────────────────────────
   rank    {number}  기준 순위
   name    {string}  게임 이름
   genre   {string}  shooter | survival | strategy | rpg | action
   thumb   {string}  썸네일 이모지 (이미지 URL로 교체도 가능)
   peak    {string}  최고 동시접속자 (콤마 포함 문자열)
   sales   {string}  판매량  예) "8.2M"
   score   {number}  평점 0~100
   prev    {number|null}  이전 순위 (null 이면 NEW 표시)
   badge   {string}  "hot" | "new" | "" (빈 문자열 = 배지 없음)
   release {string}  출시일  예) "2026-03-01"
   dev     {string}  개발사 이름
   ─────────────────────────────────────────────
*/
const GAMES = {

  /* ── 주간 ── */
  weekly: [
    { rank: 1,  name: 'Helldivers 2',           genre: 'shooter',  thumb: '🪖', peak: '485,329',   sales: '8.2M',  score: 92, prev: 2,    badge: 'hot', release: '2025-12-18', dev: 'Arrowhead' },
    { rank: 2,  name: 'Palworld 2',              genre: 'survival', thumb: '🐉', peak: '312,445',   sales: '5.1M',  score: 88, prev: 1,    badge: 'hot', release: '2026-01-05', dev: 'Pocketpair' },
    { rank: 3,  name: 'Path of Exile 3',         genre: 'rpg',      thumb: '🧙', peak: '278,002',   sales: '4.7M',  score: 94, prev: 4,    badge: '',    release: '2026-02-10', dev: 'GGG' },
    { rank: 4,  name: 'Nightingale 2',           genre: 'survival', thumb: '🌿', peak: '198,500',   sales: '3.2M',  score: 82, prev: 3,    badge: '',    release: '2026-01-22', dev: 'Inflexion' },
    { rank: 5,  name: 'ARC Raiders',             genre: 'shooter',  thumb: '🤖', peak: '175,320',   sales: '2.9M',  score: 79, prev: null, badge: 'new', release: '2026-03-01', dev: 'Embark' },
    { rank: 6,  name: 'Company of Heroes 4',     genre: 'strategy', thumb: '💣', peak: '142,880',   sales: '2.4M',  score: 87, prev: 5,    badge: '',    release: '2026-02-20', dev: 'Relic' },
    { rank: 7,  name: 'Monster Hunter Wilds 2',  genre: 'action',   thumb: '🐺', peak: '138,990',   sales: '2.1M',  score: 91, prev: 9,    badge: '',    release: '2026-02-28', dev: 'Capcom' },
    { rank: 8,  name: 'Starcraft III',           genre: 'strategy', thumb: '👾', peak: '120,405',   sales: '1.9M',  score: 86, prev: 6,    badge: '',    release: '2026-01-15', dev: 'Blizzard' },
    { rank: 9,  name: 'The Cycle: Frontier 2',   genre: 'shooter',  thumb: '🌌', peak: '98,770',    sales: '1.7M',  score: 76, prev: null, badge: 'new', release: '2026-03-10', dev: 'YAGER' },
    { rank: 10, name: 'Frostpunk 3',             genre: 'strategy', thumb: '❄',  peak: '87,440',    sales: '1.5M',  score: 93, prev: 12,   badge: '',    release: '2026-02-05', dev: '11bit' },
  ],

  /* ── 월간 ── */
  monthly: [
    { rank: 1,  name: 'Path of Exile 3',         genre: 'rpg',      thumb: '🧙', peak: '821,002',   sales: '14.7M', score: 94, prev: 3,    badge: 'hot', release: '2026-02-10', dev: 'GGG' },
    { rank: 2,  name: 'Helldivers 2',            genre: 'shooter',  thumb: '🪖', peak: '712,445',   sales: '13.1M', score: 92, prev: 1,    badge: '',    release: '2025-12-18', dev: 'Arrowhead' },
    { rank: 3,  name: 'Palworld 2',              genre: 'survival', thumb: '🐉', peak: '600,000',   sales: '12.2M', score: 88, prev: 2,    badge: '',    release: '2026-01-05', dev: 'Pocketpair' },
    { rank: 4,  name: 'Monster Hunter Wilds 2',  genre: 'action',   thumb: '🐺', peak: '498,990',   sales: '9.1M',  score: 91, prev: 6,    badge: 'hot', release: '2026-02-28', dev: 'Capcom' },
    { rank: 5,  name: 'Frostpunk 3',             genre: 'strategy', thumb: '❄',  peak: '387,440',   sales: '7.5M',  score: 93, prev: 4,    badge: '',    release: '2026-02-05', dev: '11bit' },
    { rank: 6,  name: 'Starcraft III',           genre: 'strategy', thumb: '👾', peak: '350,405',   sales: '6.9M',  score: 86, prev: 5,    badge: '',    release: '2026-01-15', dev: 'Blizzard' },
    { rank: 7,  name: 'Nightingale 2',           genre: 'survival', thumb: '🌿', peak: '298,500',   sales: '5.2M',  score: 82, prev: 8,    badge: '',    release: '2026-01-22', dev: 'Inflexion' },
    { rank: 8,  name: 'Company of Heroes 4',     genre: 'strategy', thumb: '💣', peak: '282,880',   sales: '4.4M',  score: 87, prev: 7,    badge: '',    release: '2026-02-20', dev: 'Relic' },
    { rank: 9,  name: 'ARC Raiders',             genre: 'shooter',  thumb: '🤖', peak: '255,320',   sales: '4.1M',  score: 79, prev: null, badge: 'new', release: '2026-03-01', dev: 'Embark' },
    { rank: 10, name: 'The Cycle: Frontier 2',   genre: 'shooter',  thumb: '🌌', peak: '198,770',   sales: '3.7M',  score: 76, prev: null, badge: 'new', release: '2026-03-10', dev: 'YAGER' },
  ],

  /* ── 전체 ── */
  all: [
    { rank: 1,  name: 'Frostpunk 3',             genre: 'strategy', thumb: '❄',  peak: '1,200,440', sales: '22.5M', score: 93, prev: 2,    badge: 'hot', release: '2026-02-05', dev: '11bit' },
    { rank: 2,  name: 'Path of Exile 3',         genre: 'rpg',      thumb: '🧙', peak: '1,121,002', sales: '21.7M', score: 94, prev: 1,    badge: '',    release: '2026-02-10', dev: 'GGG' },
    { rank: 3,  name: 'Monster Hunter Wilds 2',  genre: 'action',   thumb: '🐺', peak: '998,990',   sales: '19.1M', score: 91, prev: 3,    badge: '',    release: '2026-02-28', dev: 'Capcom' },
    { rank: 4,  name: 'Helldivers 2',            genre: 'shooter',  thumb: '🪖', peak: '912,445',   sales: '18.2M', score: 92, prev: 4,    badge: '',    release: '2025-12-18', dev: 'Arrowhead' },
    { rank: 5,  name: 'Palworld 2',              genre: 'survival', thumb: '🐉', peak: '800,000',   sales: '15.1M', score: 88, prev: 6,    badge: '',    release: '2026-01-05', dev: 'Pocketpair' },
    { rank: 6,  name: 'Starcraft III',           genre: 'strategy', thumb: '👾', peak: '750,405',   sales: '13.9M', score: 86, prev: 5,    badge: '',    release: '2026-01-15', dev: 'Blizzard' },
    { rank: 7,  name: 'Company of Heroes 4',     genre: 'strategy', thumb: '💣', peak: '582,880',   sales: '11.4M', score: 87, prev: 7,    badge: '',    release: '2026-02-20', dev: 'Relic' },
    { rank: 8,  name: 'Nightingale 2',           genre: 'survival', thumb: '🌿', peak: '498,500',   sales: '9.2M',  score: 82, prev: 9,    badge: '',    release: '2026-01-22', dev: 'Inflexion' },
    { rank: 9,  name: 'ARC Raiders',             genre: 'shooter',  thumb: '🤖', peak: '375,320',   sales: '7.1M',  score: 79, prev: null, badge: 'new', release: '2026-03-01', dev: 'Embark' },
    { rank: 10, name: 'The Cycle: Frontier 2',   genre: 'shooter',  thumb: '🌌', peak: '298,770',   sales: '5.7M',  score: 76, prev: null, badge: 'new', release: '2026-03-10', dev: 'YAGER' },
  ],
};


/* ===== 2. 상태 변수 ===== */
let currentPeriod = 'weekly';
let currentGenre  = 'all';


/* ===== 3. 헬퍼 함수 ===== */

/**
 * 점수에 따라 CSS 클래스를 반환합니다.
 * @param {number} score
 * @returns {'hi'|'mid'|'lo'}
 */
function getScoreClass(score) {
  if (score >= 90) return 'hi';
  if (score >= 75) return 'mid';
  return 'lo';
}

/**
 * 이전 순위와 현재 순위를 비교해 변동 표시 HTML을 반환합니다.
 * @param {number|null} prev  이전 순위 (null 이면 신규)
 * @param {number}      cur   현재 순위
 * @returns {string}  HTML 문자열
 */
function getChangeHTML(prev, cur) {
  if (prev === null) {
    return '<span class="change new-badge">NEW</span>';
  }
  const diff = prev - cur;
  if (diff > 0)  return `<span class="change up">▲ ${diff}</span>`;
  if (diff < 0)  return `<span class="change down">▼ ${Math.abs(diff)}</span>`;
  return '<span class="change same">—</span>';
}

/**
 * 배지 종류에 따라 HTML을 반환합니다.
 * @param {'hot'|'new'|''} badge
 * @returns {string}
 */
function getBadgeHTML(badge) {
  if (badge === 'new') return '<span class="tag badge-new">NEW</span>';
  if (badge === 'hot') return '<span class="tag badge-hot">HOT</span>';
  return '';
}

/**
 * 게임 한 행의 HTML을 생성합니다.
 * @param {object} game       게임 데이터 객체
 * @param {number} displayRank 화면에 표시할 순위 (필터 후 재정렬)
 * @returns {string}
 */
function createRowHTML(game, displayRank) {
  const scoreClass = getScoreClass(game.score);

  return `
    <div class="rank-row rank-${displayRank}">
      <div class="rank-num">${displayRank}</div>

      <div class="game-info">
        <div class="game-thumb">${game.thumb}</div>
        <div>
          <div class="game-name">${game.name}</div>
          <div class="game-tags">
            ${getBadgeHTML(game.badge)}
            <span class="tag">${game.dev}</span>
            <span class="tag">${game.release}</span>
          </div>
        </div>
      </div>

      <div class="col-val big">${game.peak}</div>
      <div class="col-val big">${game.sales}</div>

      <div class="score-bar col-hide">
        <div class="score-num">${game.score}점</div>
        <div class="score-track">
          <div class="score-fill ${scoreClass}" style="width: ${game.score}%"></div>
        </div>
      </div>

      <div>${getChangeHTML(game.prev, displayRank)}</div>
    </div>
  `;
}


/* ===== 4. 렌더링 ===== */

/**
 * 현재 기간/장르 상태에 맞게 랭킹 목록을 다시 그립니다.
 */
function render() {
  const data     = GAMES[currentPeriod];
  const filtered = currentGenre === 'all'
    ? data
    : data.filter(g => g.genre === currentGenre);

  const list = document.getElementById('rankList');

  if (!filtered.length) {
    list.innerHTML = '<div class="empty">해당 장르의 신작이 없습니다.</div>';
    return;
  }

  list.innerHTML = filtered
    .map((game, index) => createRowHTML(game, index + 1))
    .join('');
}


/* ===== 5. 이벤트 핸들러 ===== */

/**
 * 기간 탭 전환
 * @param {'weekly'|'monthly'|'all'} period
 * @param {HTMLElement} el  클릭된 버튼 요소
 */
function setPeriod(period, el) {
  currentPeriod = period;
  document.querySelectorAll('.tab-group .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  render();
}

/**
 * 장르 필터 전환
 * @param {string}      genre
 * @param {HTMLElement} el
 */
function setGenre(genre, el) {
  currentGenre = genre;
  document.querySelectorAll('.genre-tag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  render();
}

/**
 * 라이트 / 다크 모드 토글
 */
function toggleTheme() {
  const app = document.getElementById('app');
  const btn = document.getElementById('themeBtn');
  const isDark = app.getAttribute('data-theme') === 'dark';

  if (isDark) {
    app.removeAttribute('data-theme');
    btn.textContent = '☀';
  } else {
    app.setAttribute('data-theme', 'dark');
    btn.textContent = '☽';
  }
}


/* ===== 6. 초기 실행 ===== */
render();
