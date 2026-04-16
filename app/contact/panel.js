export function ContactInfoCard({ title, value }) {
  return (
    <div className="contact-info-card">
      <div className="pill pill-light" style={{ marginBottom: 10 }}>{title}</div>
      <div className="value">{value}</div>
    </div>
  );
}

export function ContactInfoPanel({ content, locale }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="grid-3">
        <ContactInfoCard title={locale === "en" ? "Address" : "Địa chỉ"} value={content.address} />
        <ContactInfoCard title={locale === "en" ? "Phone" : "Điện thoại"} value={"+84.236.730.8188"} />
        <ContactInfoCard title="Email" value={"sales@networkai.vn"} />
      </div>

      <div className="glass-panel">
        <div className="pill pill-light">NETWORKAI TECHNOLOGY CO., LTD</div>
        <div className="grid-2" style={{ marginTop: 18 }}>
          <div className="mini-card">
            <h4 style={{ color: "white" }}>{locale === "en" ? "Solution Consulting" : "Tư vấn giải pháp"}</h4>
            <p>
              {locale === "en"
                ? "We help define the right scope, architecture, and deployment roadmap for each project type."
                : "Chúng tôi giúp xác định phạm vi, kiến trúc và lộ trình triển khai phù hợp cho từng loại công trình."}
            </p>
          </div>
          <div className="mini-card">
            <h4 style={{ color: "white" }}>{locale === "en" ? "Project Support" : "Hỗ trợ dự án"}</h4>
            <p>
              {locale === "en"
                ? "From design through operation, our team stays available to support owners and operators."
                : "Từ giai đoạn thiết kế đến vận hành, đội ngũ luôn sẵn sàng đồng hành cùng chủ đầu tư và đơn vị vận hành."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}