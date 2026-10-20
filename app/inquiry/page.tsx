"use client";

import { useState } from "react";
import Link from "next/link";

interface InquiryData {
  id: string;
  name: string;
  phone: string;
  role: string;
  grade: string;
  category: string;
  preferredTime: string;
  content: string;
  date: string;
}

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "학부모",
    grade: "중학생",
    category: "입학 및 수강 상담",
    preferredTime: "언제나 가능",
    content: "",
    agree: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<InquiryData | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 전화번호 포맷팅 (010-0000-0000)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("이름을 입력해 주세요.");
      return;
    }
    if (formData.phone.length < 10) {
      alert("올바른 연락처를 입력해 주세요.");
      return;
    }
    if (!formData.content.trim()) {
      alert("문의 내용을 작성해 주세요.");
      return;
    }
    if (!formData.agree) {
      alert("개인정보 수집 및 이용에 동의해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "문의 접수 중 오류가 발생했습니다.");
      }

      // 발송 성공한 경우에만 접수 완료 화면 표시
      const newInquiry: InquiryData = {
        id: result.inquiryId || `SC-${Date.now().toString().slice(-6)}`,
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        grade: formData.grade,
        category: formData.category,
        preferredTime: formData.preferredTime,
        content: formData.content,
        date: result.date || new Date().toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setSubmittedData(newInquiry);

      // 폼 초기화
      setFormData({
        name: "",
        phone: "",
        role: "학부모",
        grade: "중학생",
        category: "입학 및 수강 상담",
        preferredTime: "언제나 가능",
        content: "",
        agree: false,
      });
    } catch (err) {
      console.error("문의 접수 실패:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "이메일 전송에 실패했습니다. 다시 시도해 주세요.";
      alert(`[문의 접수 실패]\n${errorMessage}\n\n작성하신 내용은 유지되오니 확인 후 다시 시도해 주세요.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "상담은 어떤 절차로 진행되나요?",
      a: "온라인으로 문의사항을 남겨주시면, 담당 상담 선생님이 입력해주신 희망 시간대에 전화로 1차 상담을 드립니다. 이후 필요 시 학생의 학습 진단 및 레벨테스트를 위한 대면 방문 일정을 조율해 드립니다.",
    },
    {
      q: "레벨 테스트는 무료인가요?",
      a: "네, S&C학원의 입학 전 학습 수준 진단 및 레벨 테스트는 전액 무료로 진행됩니다. 학생의 현재 취약점과 맞춤 커리큘럼을 함께 분석해 드립니다.",
    },
    {
      q: "방문 상담은 예약 없이도 가능한가요?",
      a: "예약 없이 방문하실 경우 수업 및 상담 일정으로 인해 대기 시간이 길어질 수 있습니다. 원활한 맞춤 상담을 위해 온라인 문의 또는 전화(02-1234-5678)로 사전 예약을 권장해 드립니다.",
    },
    {
      q: "수업 시간표와 수강료는 어떻게 알 수 있나요?",
      a: "학년 및 과목, 레벨에 따라 수업 일정과 수강료가 상이합니다. 본 문의 양식의 '문의 유형'에서 '수업료 및 시간표 문의'를 선택해주시면 자세한 안내자료를 함께 전달해 드립니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 상단 타이틀 */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#003554]/10 text-[#003554] text-xs font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#003554] animate-pulse"></span>
            1:1 맞춤 교육 상담
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#003554] tracking-tight mb-4">
            문의사항 남기기
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed break-keep">
            궁금하신 점이나 입학 상담 내용을 남겨주시면, 전문 상담 선생님이 확인 후 빠른 시일 내에 친절히 안내해 드리겠습니다.
          </p>
        </div>

        {/* 접수 완료 화면 */}
        {submittedData ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              문의가 성공적으로 접수되었습니다!
            </h2>
            <p className="text-slate-600 mb-8 text-sm sm:text-base break-keep">
              소중한 문의가 안전하게 등록되었습니다. 남겨주신 연락처(<strong className="text-slate-800">{submittedData.phone}</strong>)로 신속히 연락드리겠습니다.
            </p>

            {/* 접수증 요약 카드 */}
            <div className="bg-slate-50 rounded-2xl p-6 text-left max-w-lg mx-auto mb-8 border border-slate-200">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 text-xs text-slate-500">
                <span>접수 번호</span>
                <span className="font-mono font-bold text-[#003554]">{submittedData.id}</span>
              </div>
              <div className="py-3 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">신청자:</span>
                  <span className="font-medium text-slate-800">{submittedData.name} ({submittedData.role})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">대상 학년:</span>
                  <span className="font-medium text-slate-800">{submittedData.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">문의 유형:</span>
                  <span className="font-medium text-slate-800">{submittedData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">희망 상담 시간:</span>
                  <span className="font-medium text-slate-800">{submittedData.preferredTime}</span>
                </div>
                <div className="pt-2">
                  <span className="text-slate-500 block mb-1">문의 내용:</span>
                  <p className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 whitespace-pre-wrap text-xs leading-relaxed">
                    {submittedData.content}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-400 text-right">
                접수 시각: {submittedData.date}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition-colors text-sm"
              >
                다른 문의 추가하기
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-[#003554] text-white font-semibold hover:bg-[#00263e] transition-colors text-sm shadow-sm"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        ) : (
          /* 문의 폼 & 부가 정보 그리드 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 좌측 폼 (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 신청자 구분 */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    신청자 구분 <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["학부모", "학생", "기타"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, role }))}
                        className={`py-2.5 text-sm font-medium rounded-xl border transition-all ${
                          formData.role === role
                            ? "border-[#003554] bg-[#003554] text-white shadow-xs font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 성함 & 연락처 2컬럼 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      이름 (성함) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="예: 홍길동"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#003554] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      연락처 (휴대폰) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="010-0000-0000"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      maxLength={13}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#003554] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* 대상 학년 & 문의 유형 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="grade" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      대상 학년
                    </label>
                    <select
                      id="grade"
                      value={formData.grade}
                      onChange={(e) => setFormData((prev) => ({ ...prev, grade: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#003554] text-sm bg-slate-50/50"
                    >
                      <option value="초등부">초등부</option>
                      <option value="중등 1학년">중학교 1학년</option>
                      <option value="중등 2학년">중학교 2학년</option>
                      <option value="중등 3학년">중학교 3학년</option>
                      <option value="고등 1학년">고등학교 1학년</option>
                      <option value="고등 2학년">고등학교 2학년</option>
                      <option value="고등 3학년">고등학교 3학년</option>
                      <option value="N수생/기타">N수생 / 기타</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-1.5">
                      문의 유형
                    </label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#003554] text-sm bg-slate-50/50"
                    >
                      <option value="입학 및 수강 상담">입학 및 수강 상담</option>
                      <option value="레벨테스트 신청">레벨테스트 신청</option>
                      <option value="수업료 및 시간표 문의">수업료 및 시간표 문의</option>
                      <option value="학습 및 진로 상담">학습 및 진로 상담</option>
                      <option value="기타 문의사항">기타 일반 문의</option>
                    </select>
                  </div>
                </div>

                {/* 통화 가능 희망 시간 */}
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    통화 희망 시간대
                  </label>
                  <select
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData((prev) => ({ ...prev, preferredTime: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#003554] text-sm bg-slate-50/50"
                  >
                    <option value="언제나 가능">언제나 통화 가능</option>
                    <option value="오전 (10:00 ~ 12:00)">오전 (10:00 ~ 12:00)</option>
                    <option value="오후 (14:00 ~ 17:00)">오후 (14:00 ~ 17:00)</option>
                    <option value="저녁 (18:00 ~ 21:00)">저녁 (18:00 ~ 21:00)</option>
                  </select>
                </div>

                {/* 문의 내용 */}
                <div>
                  <label htmlFor="content" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    문의 내용 <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    required
                    rows={5}
                    placeholder="현재 학생의 학습 상태, 희망하는 수강 과목이나 궁금하신 사항을 자유롭게 작성해 주세요."
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#003554] focus:border-transparent text-sm placeholder:text-slate-400 bg-slate-50/50 leading-relaxed"
                  ></textarea>
                </div>

                {/* 개인정보 수집 및 이용 동의 */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={formData.agree}
                      onChange={(e) => setFormData((prev) => ({ ...prev, agree: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#003554] focus:ring-[#003554]"
                    />
                    <label htmlFor="agree" className="text-xs text-slate-600 leading-snug cursor-pointer select-none">
                      <span className="font-semibold text-slate-800">[필수] 개인정보 수집 및 이용 동의</span>
                      <br />
                      상담 신청 및 안내를 위한 최소한의 개인정보(이름, 연락처) 수집에 동의합니다. 수집된 정보는 상담 목적 외에 이용되지 않으며 상담 완료 후 파기됩니다.
                    </label>
                  </div>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#003554] hover:bg-[#00263e] disabled:bg-slate-400 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-base active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      접수 중입니다...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      문의사항 등록하기
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* 우측 사이드바 (4 cols): 안내 및 FAQ */}
            <div className="lg:col-span-4 space-y-6">
              {/* 전화 문의 카드 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80">
                <div className="flex items-center gap-3 mb-3 text-[#003554]">
                  <div className="p-2.5 rounded-xl bg-[#003554]/10">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-base text-slate-800">빠른 전화 상담</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  온라인 작성이 번거로우시거나 급한 용무는 학원으로 직접 전화 주시면 바로 안내해 드립니다.
                </p>
                <a
                  href="tel:02-1234-5678"
                  className="block text-center bg-slate-50 hover:bg-[#003554]/5 text-[#003554] border border-[#003554]/20 font-bold py-2.5 px-4 rounded-xl text-lg transition-colors"
                >
                  02-1234-5678
                </a>
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                  <p>• 평일: 13:00 ~ 22:00</p>
                  <p>• 토요일: 10:00 ~ 18:00</p>
                  <p className="text-slate-400">• 일요일/공휴일은 온라인 문의 이용</p>
                </div>
              </div>

              {/* FAQ 아코디언 */}
              <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80">
                <h3 className="font-bold text-base text-slate-800 mb-4 flex items-center gap-2">
                  <span className="text-[#003554]">FAQ</span> 자주 묻는 질문
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full text-left p-3.5 text-xs font-semibold text-slate-700 bg-slate-50/50 hover:bg-slate-100/70 flex justify-between items-center transition-colors gap-2"
                        >
                          <span>{faq.q}</span>
                          <span className="text-slate-400 font-bold text-sm shrink-0">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="p-3.5 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed break-keep">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
