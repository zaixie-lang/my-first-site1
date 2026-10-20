import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-b from-[#003554]/5 via-white to-slate-50 py-16 sm:py-24 border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white shadow-xs border border-slate-200 text-xs font-semibold text-[#003554] mb-8">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#003554] animate-pulse" />
            <span>2026학년도 신규 수강생 모집 중</span>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-lg border-4 border-white flex-shrink-0 bg-white">
              <Image
                src="/sc_logo.png"
                alt="S&C학원 로고"
                fill
                className="object-cover scale-110"
                priority
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#003554] mb-6 leading-tight break-keep">
            최고의 열정과 실력으로 이끄는{" "}
            <span className="text-[#003554] underline decoration-blue-300 underline-offset-8">
              S&C학원
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed break-keep">
            학생 개개인의 수준과 학습 스타일에 맞춘 1:1 밀착 코칭과 빈틈없는 커리큘럼으로
            스스로 공부하는 자신감과 탁월한 성적 향상을 약속합니다.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/inquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#003554] hover:bg-[#00263e] text-white text-base font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-98"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>문의사항 남기기 (상담 신청)</span>
            </Link>

            <a
              href="tel:02-1234-5678"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-base font-semibold px-6 py-4 rounded-2xl shadow-xs transition-all duration-200"
            >
              <svg
                className="w-5 h-5 text-[#003554]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>전화 문의 (02-1234-5678)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
            S&C학원만의 차별화된 교육 시스템
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            학생 한 명 한 명의 성장을 위해 체계적으로 설계된 학습 관리 시스템
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#003554] flex items-center justify-center font-bold text-xl mb-5">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">1:1 맞춤형 커리큘럼</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              정확한 진단 테스트를 통해 학생의 취약점을 분석하고, 현재 수준에 최적화된 맞춤 진도와 교재를 구성합니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-[#003554] flex items-center justify-center font-bold text-xl mb-5">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">완벽 이해 클리닉</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              수업 후 당일 배운 내용은 당일 이해하고 귀가하는 원칙으로 철저한 오답 노트와 질문 클리닉을 제공합니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#003554] flex items-center justify-center font-bold text-xl mb-5">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">학부모 실시간 안심 피드백</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              출결 현황과 일일 테스트 결과, 월간 학습 리포트를 정기적으로 발송하여 자녀의 성장을 투명하게 공유합니다.
            </p>
          </div>
        </div>

        {/* CTA Banner Section */}
        <div className="mt-16 bg-[#003554] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              빠른 답변 약속
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
              입학 및 학습 상담이 필요하신가요?
            </h3>
            <p className="text-white/80 text-sm sm:text-base max-w-xl">
              간단한 정보를 남겨주시면 원장 및 전문 상담팀이 성심성의껏 답변해 드립니다.
            </p>
          </div>
          <Link
            href="/inquiry"
            className="shrink-0 bg-white hover:bg-slate-100 text-[#003554] font-bold text-base px-7 py-3.5 rounded-xl shadow-md transition-colors"
          >
            지금 문의사항 남기기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
