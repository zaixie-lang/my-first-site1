import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 학원 정보 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10 p-0.5">
                <Image
                  src="/sc_logo.png"
                  alt="S&C학원 로고"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">S&C학원</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              학생 개개인의 목표와 잠재력을 최우선으로 생각하는 맞춤형 전문 교육기관 S&C학원입니다.
            </p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} S&C Academy. All rights reserved.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div className="md:pl-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              바로가기
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  홈으로
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="hover:text-white transition-colors font-medium text-blue-400">
                  문의사항 남기기 (상담 신청)
                </Link>
              </li>
            </ul>
          </div>

          {/* 상담 및 운영 안내 */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              상담 안내 및 고객센터
            </h3>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <span className="text-slate-300 font-medium">상담 문의:</span>
                <span className="text-white font-semibold">02-1234-5678</span>
              </p>
              <p>운영 시간: 평일 13:00 ~ 22:00 / 토요일 10:00 ~ 18:00</p>
              <p className="text-xs text-slate-500">※ 일요일 및 공휴일은 온라인 문의사항을 남겨주시면 순차적으로 연락드립니다.</p>
              <div className="pt-2">
                <Link
                  href="/inquiry"
                  className="inline-block text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  온라인 문의 접수 바로가기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
