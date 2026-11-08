import React, { useState } from 'react';
import { 
  Shield, Users, MessageSquare, Settings, FileText, Calendar, 
  CheckCircle2, Send, Sparkles, LogOut, Heart, Star, Lock, 
  Unlock, Bell, ChevronRight, AlertCircle, RefreshCw, Layers,
  Image as ImageIcon, Bookmark, Radio, Compass, UserCheck
} from 'lucide-react';

export default function LineupHub() {
  const [authLevel, setAuthLevel] = useState(0); // 0: 비회원, 1: 일반, 2: 인증회원, 3: 매니저, 4: 총괄관리자
  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // 공지사항 및 아카이브 상태 (카테고리별 분류 포함)
  const [notices, setNotices] = useState([
    { id: 1, title: '라인업 허브(Lineup Hub) v1.0 정식 런칭 및 운영 가이드', date: '2026-11-09', author: '총괄관리자', category: '공지', content: '팬 아키이빙, 4단계 권한 체계, 11모듈 관리 제어 및 실시간 매니저 익명 소통함이 정식 활성화되었습니다. 안전한 팬덤 문화를 위해 가이드라인을 준수해 주세요.' },
    { id: 2, title: '주간 방송 스케줄 및 타임라인 아카이브 안내', date: '2026-11-08', author: '매니저', category: '일정', content: '이번 주 주요 방송 일정 및 서포트 진행 상황, 아카이브 자료 업로드 현황을 확인하실 수 있습니다.' },
    { id: 3, title: '팬덤 전용 디지털 굿즈 및 배너 리소스 공유', date: '2026-11-05', author: '총괄관리자', category: '아카이브', content: '커뮤니티 및 소셜 홍보용 공식 배너와 커스텀 스티커 디자인 리소스 파일 모음입니다.' }
  ]);

  // 팬 아트 및 미디어 갤러리 상태
  const [gallery, setGallery] = useState([
    { id: 1, title: '공식 런칭 기념 축하 배너 아트', author: '서포터즈A', likes: 128, tag: 'FanArt' },
    { id: 2, title: '스페셜 방송 모멘트 포토 카드 에디트', author: '금손팬B', likes: 256, tag: 'Edit' }
  ]);

  // 익명 소통함 상태 (답변 기능 포함)
  const [messages, setMessages] = useState([
    { id: 1, sender: '익명팬A', text: '오늘 방송 스케줄 변동이나 특이사항 혹시 있나요?', time: '14:20', replies: [{ id: 101, sender: '매니저', text: '정상 방송 진행 예정이며, 변동 시 공지탭을 통해 안내해 드리겠습니다!', time: '14:25' }] }
  ]);
  const [newMsg, setNewMsg] = useState('');
  const [replyInput, setReplyInput] = useState({});

  // 11모듈 관리 제어 상세 상태
  const [modules, setModules] = useState([
    { id: 1, name: '권한 제어 모듈', status: 'Active', target: 'Level 1~4', desc: 'PIN 번호 기반 4단계 접근 권한 실시간 세분화 제어 및 세션 보호' },
    { id: 2, name: '공지 승인 모듈', status: 'Active', target: 'Manager+', desc: '아카이브 공지 및 스케줄 등록 전용 사전 검토 및 퍼블리싱 제어' },
    { id: 3, name: '트래픽 모니터링', status: 'Active', target: 'System', desc: '무중단 Vercel 서버 접속량 추적, 대시보드 로딩 속도 및 에러 로깅' },
    { id: 4, name: '익명 피드백 필터', status: 'Active', target: 'Community', desc: '클린 팬덤 문화 유지를 위한 실시간 비속어 및 키워드 필터링 시스템' },
    { id: 5, name: '콘텐츠 백업', status: 'Active', target: 'Storage', desc: '팬 아카이빙 자료 및 소통 로그 유실 방지 자동 스냅샷 아카이빙' },
    { id: 6, name: '스케줄 동기화', status: 'Active', target: 'Calendar', desc: '주요 외부 플랫폼 일정 및 실시간 알림 타임라인 자동 동기화' },
    { id: 7, name: '보안 로그', status: 'Active', target: 'Security', desc: '관리자 접속 시도, 권한 변경 이력 및 IP 접근 감사 로그 기록' },
    { id: 8, name: '링크 관리', status: 'Active', target: 'External', desc: '공식 팬카페, 소셜 채널 및 외부 아카이브 링크 모음집 실시간 제어' },
    { id: 9, name: '알림 시스템', status: 'Active', target: 'Broadcast', desc: '중요 공지 발생 시 상단 배너 및 실시간 푸시 알림 연동 기능' },
    { id: 10, name: '커스텀 세팅', status: 'Active', target: 'Theme', desc: '다크모드 테마 컬러, UI 컴포넌트 및 대시보드 레이아웃 맞춤 설정' },
    { id: 11, name: '시스템 통계', status: 'Active', target: 'Analytics', desc: '방문자 활성도, 소통 채널 참여율 및 종합 데이터 분석 리포트' }
  ]);

  // PIN 번호 로그인 처리
  const handlePinLogin = (e) => {
    e.preventDefault();
    if (pinInput === '7777') {
      setAuthLevel(4);
      alert('👑 총괄관리자 권한으로 로그인되었습니다. (11모듈 전체 제어 및 승인 권한 활성화)');
    } else if (pinInput === '1234') {
      setAuthLevel(3);
      alert('🛡️ 매니저 권한으로 로그인되었습니다. (공지 등록 및 답변 권한 활성화)');
    } else if (pinInput === '1111') {
      setAuthLevel(2);
      alert('⭐ 인증회원 권한으로 로그인되었습니다.');
    } else {
      alert('잘못된 PIN 번호입니다.\n\n[테스트 권한 번호]\n- 인증회원: 1111\n- 매니저: 1234\n- 총괄관리자: 7777');
    }
    setPinInput('');
  };

  const toggleModuleStatus = (id) => {
    if (authLevel < 4) {
      alert('모듈 설정을 변경하려면 [총괄관리자(7777)] 권한이 필요합니다.');
      return;
    }
    setModules(modules.map(m => m.id === id ? { ...m, status: m.status === 'Active' ? 'Paused' : 'Active' } : m));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* 상단 네비게이션 헤더 */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-purple-600 to-pink-600 p-2.5 rounded-2xl shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider bg-gradient-to-r from-white via-slate-200 to-purple-400 bg-clip-text text-transparent">
              LINEUP HUB
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">프리미엄 팬 아키이빙 & 매니지먼트 생태계</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs shadow-inner">
            <span className="text-slate-400">보안 등급:</span>
            <span className="font-bold text-purple-400">
              {authLevel === 4 ? '👑 총괄관리자 (Lv.4)' : authLevel === 3 ? '🛡️ 매니저 (Lv.3)' : authLevel === 2 ? '⭐ 인증회원 (Lv.2)' : '👤 일반 방문자 (Lv.1)'}
            </span>
          </div>

          {authLevel > 0 ? (
            <button 
              onClick={() => setAuthLevel(0)}
              className="flex items-center space-x-1.5 text-xs bg-red-500/10 text-red-400 border border-red-500/20 px-3.5 py-2 rounded-xl hover:bg-red-500/20 transition-all font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>
          ) : (
            <form onSubmit={handlePinLogin} className="flex items-center space-x-2">
              <input 
                type="password" 
                placeholder="PIN 4자리 입력" 
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                maxLength={4}
                className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs w-28 text-center text-white focus:outline-none focus:border-purple-500 shadow-inner"
              />
              <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-600/30">
                인증
              </button>
            </form>
          )}
        </div>
      </header>

      {/* 메인 레이아웃 구조 */}
      <div className="flex flex-1">
        {/* 사이드바 네비게이션 */}
        <aside className="w-64 bg-slate-900/40 backdrop-blur border-r border-slate-800 p-4 hidden md:flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Navigation Menu</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
            >
              <Shield className="w-4 h-4" />
              <span>대시보드 홈</span>
            </button>
            <button 
              onClick={() => setActiveTab('notices')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'notices' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
            >
              <FileText className="w-4 h-4" />
              <span>공지사항 & 아카이브</span>
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'gallery' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>팬아트 & 리소스 갤러리</span>
            </button>
            <button 
              onClick={() => setActiveTab('community')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'community' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-900/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>매니저 익명 소통함</span>
            </button>
            {authLevel >= 3 && (
              <button 
                onClick={() => setActiveTab('admin')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === 'admin' ? 'bg-pink-600/20 text-pink-300 border border-pink-500/30 shadow-lg shadow-pink-900/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}`}
              >
                <Settings className="w-4 h-4" />
                <span>11모듈 관리자 대시보드</span>
              </button>
            )}
          </div>

          <div className="bg-slate-900/80 border border-slate-800/80 p-4 rounded-2xl space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-purple-400">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Vercel Live Hub</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              서버리스 무중단 배포 및 자동 백업 시스템 가동 중
            </p>
          </div>
        </aside>

        {/* 메인 뷰포트 본문 내용 */}
        <main className="flex-1 p-6 lg:p-10 max-w-6xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-900 border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center space-x-2 flex-wrap gap-2">
                    <span className="bg-purple-500/20 text-purple-300 text-xs px-3.5 py-1 rounded-full border border-purple-500/30 font-bold tracking-wide">
                      SYSTEM ONLINE • VERCEL DEPLOYED
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3.5 py-1 rounded-full border border-emerald-500/30 font-bold">
                      11 MODULES ACTIVE
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
                    영구적이고 안전한 라인업 팬 아카이브
                  </h2>
                  <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">
                    구독료나 트래픽 제한 걱정 없이 Vercel 서버리스 환경에서 영구 구동되는 아카이브 허브입니다. 
                    PIN 번호 기반의 강력한 4단계 권한 체계와 실시간 매니저 피드백 소통 시스템을 활용해 보세요.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-purple-500/40 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white">4단계 보안 권한</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">일반 방문자부터 총괄관리자까지 PIN 인증을 통해 철저하게 분리된 접근 제어를 제공합니다.</p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-pink-500/40 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white">익명 소통 채널</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">팬들과 매니저가 부담 없이 의견을 나누고 실시간 피드백과 답변을 주고받는 안전한 공간입니다.</p>
                </div>
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-indigo-500/40 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <Settings className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-white">11모듈 통합 관리</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">권한, 로그, 트래픽, 백업 등 11가지 전문 제어 모듈을 관리자 대시보드에서 직접 통제합니다.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">공지사항 및 아카이브</h2>
                  <p className="text-xs text-slate-400 mt-1">공식 공지, 방송 일정 및 아카이브 자료실입니다.</p>
                </div>
                {authLevel >= 3 && (
                  <button 
                    onClick={() => {
                      const title = prompt('공지 제목을 입력하세요:');
                      const category = prompt('카테고리를 입력하세요 (예: 공지, 일정, 아카이브):') || '공지';
                      const content = prompt('공지 내용을 입력하세요:');
                      if (title && content) {
                        setNotices([{ id: Date.now(), title, category, date: new Date().toISOString().slice(0,10), author: authLevel === 4 ? '총괄관리자' : '매니저', content }, ...notices]);
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center space-x-1.5"
                  >
                    <span>+ 새 공지/아카이브 등록</span>
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {notices.map((n) => (
                  <div key={n.id} className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-slate-700 transition-all">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full font-bold border border-purple-500/20">{n.category}</span>
                        <span className="text-slate-400 font-semibold">{n.author}</span>
                      </div>
                      <span className="text-slate-500">{n.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-white">{n.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">팬아트 & 리소스 갤러리</h2>
                  <p className="text-xs text-slate-400 mt-1">서포터즈 및 팬들이 제작한 팬아트와 편집 리소스 공간입니다.</p>
                </div>
                {authLevel >= 2 && (
                  <button 
                    onClick={() => {
                      const title = prompt('작품 제목을 입력하세요:');
                      const author = prompt('작가(제작자)명을 입력하세요:');
                      if (title && author) {
                        setGallery([{ id: Date.now(), title, author, likes: 1, tag: 'FanArt' }, ...gallery]);
                      }
                    }}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg"
                  >
                    + 팬아트 등록
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4 hover:border-purple-500/30 transition-all">
                    <div className="h-40 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800/80 text-slate-600">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] bg-pink-500/10 text-pink-400 px-2.5 py-0.5 rounded-md font-bold">{g.tag}</span>
                        <h3 className="font-bold text-white text-base mt-1">{g.title}</h3>
                        <p className="text-xs text-slate-400">제작자: {g.author}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setGallery(gallery.map(item => item.id === g.id ? {...item, likes: item.likes + 1} : item));
                        }}
                        className="flex items-center space-x-1.5 bg-slate-800/80 hover:bg-slate-800 px-3 py-2 rounded-xl text-xs text-pink-400 border border-slate-700 transition-all font-bold"
                      >
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                        <span>{g.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">매니저 익명 소통함</h2>
                <p className="text-xs text-slate-400 mt-1">자유롭게 의견과 문의를 남겨주세요. 매니저단이 확인 후 답변을 남깁니다.</p>
              </div>
              
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
                  {messages.map((m) => (
                    <div key={m.id} className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl space-y-3 shadow-inner">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span className="font-semibold text-purple-400">{m.sender}</span>
                        <span>{m.time}</span>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">{m.text}</p>

                      {/* 답변 목록 */}
                      {m.replies && m.replies.length > 0 && (
                        <div className="pl-4 border-l-2 border-purple-500/30 space-y-2 mt-3 pt-2">
                          {m.replies.map((r) => (
                            <div key={r.id} className="bg-purple-950/20 border border-purple-500/10 p-3 rounded-xl space-y-1">
                              <div className="flex justify-between text-[11px] text-slate-400">
                                <span className="font-bold text-pink-400">🛡️ {r.sender}</span>
                                <span>{r.time}</span>
                              </div>
                              <p className="text-xs text-slate-300">{r.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 매니저 이상일 경우 답변 작성 입력창 */}
                      {authLevel >= 3 && (
                        <div className="flex space-x-2 pt-2">
                          <input 
                            type="text" 
                            placeholder="매니저 공식 답변 작성..."
                            value={replyInput[m.id] || ''}
                            onChange={(e) => setReplyInput({...replyInput, [m.id]: e.target.value})}
                            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                          />
                          <button 
                            onClick={() => {
                              const text = replyInput[m.id];
                              if (!text || !text.trim()) return;
                              const updated = messages.map(msg => {
                                if (msg.id === m.id) {
                                  return {
                                    ...msg,
                                    replies: [...(msg.replies || []), { id: Date.now(), sender: authLevel === 4 ? '총괄관리자' : '매니저', text, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }]
                                  };
                                }
                                return msg;
                              });
                              setMessages(updated);
                              setReplyInput({...replyInput, [m.id]: ''});
                            }}
                            className="bg-pink-600 hover:bg-pink-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                          >
                            답변 등록
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 새 메시지 작성 입력창 */}
                <div className="flex space-x-2 pt-2 border-t border-slate-800">
                  <input 
                    type="text" 
                    placeholder="익명으로 문의나 의견을 남겨주세요..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newMsg.trim()) {
                        setMessages([...messages, { id: Date.now(), sender: '익명방문자', text: newMsg, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), replies: [] }]);
                        setNewMsg('');
                      }
                    }}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-purple-500 shadow-inner"
                  />
                  <button 
                    onClick={() => {
                      if (!newMsg.trim()) return;
                      setMessages([...messages, { id: Date.now(), sender: '익명방문자', text: newMsg, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), replies: [] }]);
                      setNewMsg('');
                    }}
                    className="bg-purple-600 hover:bg-purple-500 text-white px-6 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-purple-600/30 flex items-center space-x-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>등록</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admin' && authLevel >= 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">11모듈 관리자 대시보드</h2>
                  <p className="text-xs text-slate-400 mt-1">시스템 전용 11가지 핵심 제어 모듈이 가동 중입니다. (총괄관리자 권한으로 클릭 시 상태 토글 가능)</p>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-4 py-2 rounded-xl font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>ALL SYSTEMS NORMAL</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {modules.map((mod) => (
                  <div key={mod.id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-3 hover:border-purple-500/40 transition-all shadow-lg flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-pink-400 font-black tracking-wider">MODULE #{mod.id < 10 ? `0${mod.id}` : mod.id}</span>
                        <button 
                          onClick={() => toggleModuleStatus(mod.id)}
                          className={`text-[10px] px-2.5 py-1 rounded-lg font-bold border transition-all ${mod.status === 'Active' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'}`}
                          title="클릭하여 상태 변경 (총괄 권한 필요)"
                        >
                          {mod.status}
                        </button>
                      </div>
                      <h3 className="font-bold text-white text-base">{mod.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-500 font-medium">
                      <span>타겟: {mod.target}</span>
                      <span className="text-purple-400 font-bold">Stable</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
