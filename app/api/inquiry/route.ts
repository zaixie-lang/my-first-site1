import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, role, grade, category, preferredTime, content } = body;

    // 1. 필수 입력값 검증
    if (!name || !phone || !content) {
      return NextResponse.json(
        { success: false, error: "필수 입력 항목(이름, 연락처, 문의 내용)이 누락되었습니다." },
        { status: 400 }
      );
    }

    // 2. 환경변수 확인
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;
    const rawFromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    if (!apiKey) {
      console.error("[Inquiry API] RESEND_API_KEY가 설정되어 있지 않습니다.");
      return NextResponse.json(
        { success: false, error: "서버에 RESEND_API_KEY가 설정되어 있지 않습니다." },
        { status: 500 }
      );
    }

    if (!adminEmail) {
      console.error("[Inquiry API] ADMIN_EMAIL이 설정되어 있지 않습니다.");
      return NextResponse.json(
        { success: false, error: "서버에 ADMIN_EMAIL이 설정되어 있지 않습니다." },
        { status: 500 }
      );
    }

    const fromEmail = rawFromEmail.includes("<")
      ? rawFromEmail
      : `S&C학원 <${rawFromEmail}>`;

    const resend = new Resend(apiKey);

    const now = new Date();
    const formattedDate = now.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const inquiryId = `SC-${Date.now().toString().slice(-6)}`;

    // 3. Resend API 이메일 발송
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      subject: `[S&C학원 문의] ${name}님(${role})의 새로운 상담 문의 (${inquiryId})`,
      text: `[S&C학원 홈페이지 상담 문의 접수]
- 접수번호: ${inquiryId}
- 신청자: ${name} (${role})
- 연락처: ${phone}
- 대상 학년: ${grade || "미지정"}
- 문의 유형: ${category || "일반 문의"}
- 희망 상담 시간: ${preferredTime || "언제나 가능"}
- 접수 일시: ${formattedDate}

[문의 내용]
${content}
`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #003554; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="color: #003554; margin: 0; font-size: 20px;">S&C학원 신규 상담 문의 접수</h2>
            <p style="color: #64748b; font-size: 13px; margin: 6px 0 0 0;">홈페이지에서 새로운 문의사항이 도착했습니다.</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b; width: 120px;">접수 번호</td>
              <td style="padding: 10px 0; font-weight: bold; color: #003554;">${inquiryId}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">신청자</td>
              <td style="padding: 10px 0; font-weight: 600; color: #1e293b;">${name} <span style="font-size: 12px; color: #64748b;">(${role})</span></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">연락처</td>
              <td style="padding: 10px 0; font-weight: 600; color: #0f172a;"><a href="tel:${phone}" style="color: #0284c7; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">대상 학년</td>
              <td style="padding: 10px 0; color: #1e293b;">${grade || "미지정"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">문의 유형</td>
              <td style="padding: 10px 0; color: #1e293b;">${category || "일반 문의"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;">희망 상담 시간</td>
              <td style="padding: 10px 0; color: #1e293b;">${preferredTime || "언제나 가능"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b;">접수 시각</td>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px;">${formattedDate}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
            <div style="font-weight: 600; font-size: 13px; color: #475569; margin-bottom: 8px;">문의 내용:</div>
            <div style="font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${content}</div>
          </div>

          <div style="font-size: 12px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
            본 메일은 S&C학원 웹사이트 온라인 상담 문의 시스템에서 자동 발송되었습니다.
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Inquiry API] Resend 이메일 발송 실패:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Resend 이메일 발송에 실패했습니다.",
          code: error.name,
        },
        { status: 500 }
      );
    }

    console.log(`[Inquiry API] 이메일 발송 성공 (Email ID: ${data?.id}, Inquiry ID: ${inquiryId})`);
    return NextResponse.json({
      success: true,
      inquiryId,
      date: formattedDate,
      emailId: data?.id,
    });
  } catch (err) {
    console.error("[Inquiry API] 서버 처리 중 예외 발생:", err);
    const message = err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
