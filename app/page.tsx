import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 bg-[#E3D3E4] text-[#873D48]">
      <div className="w-full max-w-2xl rounded-2xl border border-white/40 bg-white/40 backdrop-blur-md p-5 sm:p-8 shadow-xl">
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="inline-block h-3 w-3 rounded-full bg-[#003554] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide uppercase opacity-80">
            Next.js 준비 완료
          </span>
        </div>

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 sm:mb-8 text-[#003554] leading-[1.5] sm:leading-[1.4] break-keep">
            안녕하세요, <span className="inline-block bg-[#003554] text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl sm:rounded-2xl shadow-md whitespace-nowrap">S&C학원</span>입니다
          </h1>
          
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative w-24 h-24 sm:w-[110px] sm:h-[110px] rounded-full overflow-hidden shadow-md border-4 border-white/40 flex-shrink-0">
              <Image 
                src="/sc_logo.png" 
                alt="S&C학원 로고" 
                fill
                className="object-cover scale-[1.25]" 
              />
            </div>
          </div>

          <p className="opacity-90 mb-8 leading-relaxed">
            요청하신 환경으로 프로젝트가 깔끔하게 세팅되었습니다. 이제 코드를 수정하여 멋진 웹사이트를 만들어보세요!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-white/50 bg-white/30 p-4">
            <h2 className="text-sm font-semibold text-[#003554] mb-1">TypeScript</h2>
            <p className="text-xs opacity-80">타입 안정성과 자동 완성</p>
          </div>
          <div className="rounded-xl border border-white/50 bg-white/30 p-4">
            <h2 className="text-sm font-semibold text-[#003554] mb-1">App Router</h2>
            <p className="text-xs opacity-80">최신 Next.js 구조 (app/)</p>
          </div>
          <div className="rounded-xl border border-white/50 bg-white/30 p-4">
            <h2 className="text-sm font-semibold text-[#003554] mb-1">Tailwind CSS</h2>
            <p className="text-xs opacity-80">모던 스타일링 시스템</p>
          </div>
        </div>

        <div className="rounded-xl bg-white/30 p-4 text-xs font-mono">
          <p className="opacity-70 mb-1"># 수정할 파일 위치</p>
          <p className="font-semibold text-[#003554]">app/page.tsx</p>
        </div>
      </div>
    </main>
  );
}
