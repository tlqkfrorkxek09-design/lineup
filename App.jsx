import React, { useState } from 'react';
import { 
  Shield, MessageSquare, Settings, FileText, 
  Sparkles, LogOut, Heart, Image as ImageIcon, Send 
} from 'lucide-react';

export default function LineupHub() {
  const [authLevel, setAuthLevel] = useState(0);
  const [pinInput, setPinInput] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const [notices, setNotices] = useState([
    { id: 1, title: '라인업 허브 v1.0 정식 런칭', date: '2026-11-09', author: '총괄관리자', category: '공지', content: '팬 아키이빙 및 4단계 권한 체계, 11모듈 제어 시스템이 활성화되었습니다.' }
  ]);

  const [gallery, setGallery] = useState([
    { id: 1, title: '공식 런칭 기념 축하 배너 아트', author: '서포터즈A', likes: 128, tag: 'FanArt' }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, sender: '익명팬A', text: '오늘 방송 스케줄 변동 있나요?', time: '14:20', replies: [] }
  ]);
  const [newMsg, setNewMsg] = useState('');

  const [modules, setModules] = useState([
    { id: 1, name: '권한 제어 모듈', status: 'Active', desc: 'PIN 번호 기반 4단계 접근 제어' },
    { id: 2, name: '공지 승인 모듈', status: 'Active', desc: '아카이브 공지 사전 검토' },
    { id: 3, name: '트래픽 모니터링', status: 'Active', desc: '서버 접속량 추적' },
    { id: 4, name: '익명 피드백 필터', status: 'Active', desc: '비속어 및 키워드 필터링' },
    { id: 5, name: '콘텐츠 백업', status: 'Active', desc: '데이터 유실 방지 자동 스냅샷' },
    { id: 6, name: '스케줄 동기화', status: 'Active', desc: '일정 및 알림 타임라인 연동' },
    { id: 7, name: '보안 로그', status: 'Active', desc: '관리자 접속 및 변경 이력 기록' },
    { id: 8, name: '링크 관리', status: 'Active', desc: '외부 아카이브 및 팬카페 링크 모음' },
    { id: 9, name: '알림 시스템', status: 'Active', desc: '상단 배너 및 푸시 알림 연동' },
    { id: 10, name: '커스텀 세팅', status: 'Active', desc: '테마 및 대시보드 레이아웃 설정' },
    { id: 11, name: '시스템 통계', status: 'Active', desc: '방문자 활성도 종합 데이터 분석' }
  ]);

  const handlePinLogin = (e) => {
    e.preventDefault();
    if (pinInput === '7777') {
      setAuthLevel(4);
      alert('👑 총괄관리자 권한으로 로그인되었습니다.');
    } else if (pinInput === '1234') {
      setAuthLevel(3);
      alert('🛡️ 매니저 권한으로 로그인되었습니다.');
    } else if (pinInput === '1111') {
      setAuthLevel(2);
      alert('⭐ 인증회원 권한으로 로그인되었습니다.');
    } else {
      alert('잘못된 PIN 번호입니다. (테스트: 1111, 1234, 7777)');
    }
    setPinInput('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-purple-600 to-pink-600 p-2 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-lg font-black tracking-wider text-white">LINEUP HUB</h1>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-xs text-purple-400 font-bold">
            {authLevel === 4 ? '👑 총괄관리자' : authLevel === 3 ? '🛡️ 매니저' : authLevel === 2 ? '⭐ 인증회원' : '👤 일반'}
          </span>
          {authLevel > 0 ? (
            <button onClick={() => setAuthLevel(0)} className="text-xs bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg">로그아웃</button>
          ) : (
            <form onSubmit={handlePinLogin} className="flex space-x-2">
              <input 
                type="password" placeholder="PIN" value={pinInput} onChange={(e) => setPinInput(e.target.value)} maxLength={4}
                className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs w-20 text-center text-white"
              />
              <button type="submit" className="bg-purple-600 text-white px-3 py-1 rounded text-xs font-bold">인증</button>
            </form>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-60 bg-slate-900/40 border-r border-slate-800 p-4 hidden md:flex flex-col space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'dashboard' ? 'bg-purple-600/20 text-purple-300' : 'text-slate-400'}`}>대시보드 홈</button>
          <button onClick={() => setActiveTab('notices')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'notices' ? 'bg-purple-600/20 text-purple-300' : 'text-slate-400'}`}>공지사항</button>
          <button onClick={() => setActiveTab('gallery')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'gallery' ? 'bg-purple-600/20 text-purple-300' : 'text-slate-400'}`}>팬아트 갤러리</button>
          <button onClick={() => setActiveTab('community')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'community' ? 'bg-purple-600/20 text-purple-300' : 'text-slate-400'}`}>익명 소통함</button>
          {authLevel >= 3 && (
            <button onClick={() => setActiveTab('admin')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${activeTab === 'admin' ? 'bg-pink-600/20 text-pink-300' : 'text-slate-400'}`}>11모듈 관리</button>
          )}
        </aside>

        <main className="flex-1 p-6 lg:p-8 max-w-5xl mx-auto w-full">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-900/40 via-slate-900 to-slate-900 border border-purple-500/20 rounded-3xl p-8">
                <h2 className="text-3xl font-black text-white">라인업 허브 생태계</h2>
                <p className="text-slate-400 text-sm mt-2">무중단 호스팅 환경에서 구동되는 영구적 팬 아카이브 시스템입니다.</p>
              </div>
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">공지사항 및 아카이브</h2>
              {notices.map(n => (
                <div key={n.id} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-2">
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2.5 py-0.5 rounded-full font-bold">{n.category}</span>
                  <h3 className="font-bold text-lg text-white">{n.title}</h3>
                  <p className="text-sm text-slate-300">{n.content}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">팬아트 갤러리</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gallery.map(g => (
                  <div key={g.id} className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3">
                    <div className="h-32 bg-slate-950 rounded-xl flex items-center justify-center text-slate-600"><ImageIcon className="w-8 h-8"/></div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-white">{g.title}</h3>
                      <button onClick={() => setGallery(gallery.map(i => i.id === g.id ? {...i, likes: i.likes + 1} : i))} className="text-xs text-pink-400 flex items-center space-x-1">
                        <Heart className="w-4 h-4 fill-pink-500 text-pink-500"/><span>{g.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'community' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">익명 소통함</h2>
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {messages.map(m => (
                    <div key={m.id} className="bg-slate-950 p-4 rounded-xl space-y-1">
                      <span className="text-xs font-bold text-purple-400">{m.sender}</span>
                      <p className="text-sm text-slate-200">{m.text}</p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="text" placeholder="익명으로 메시지 남기기..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white"
                  />
                  <button onClick={() => { if(!newMsg.trim()) return; setMessages([...messages, {id: Date.now(), sender:'익명방문자', text:newMsg, time:'방금'}]); setNewMsg(''); }} className="bg-purple-600 px-4 rounded-xl font-bold text-sm text-white">전송</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admin' && authLevel >= 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">11모듈 관리자 대시보드</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {modules.map(mod => (
                  <div key={mod.id} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] text-pink-400 font-bold">MODULE #{mod.id}</span>
                    <h3 className="font-bold text-white text-sm">{mod.name}</h3>
                    <p className="text-[11px] text-slate-400">{mod.desc}</p>
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
