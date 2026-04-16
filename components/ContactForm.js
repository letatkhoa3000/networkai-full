"use client";

import { useState } from "react";

export default function ContactForm({ content, locale }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    requirement: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const labels = {
    name: locale === "en" ? "Full name" : "Họ và tên",
    company: locale === "en" ? "Company" : "Công ty",
    email: "Email",
    phone: locale === "en" ? "Phone number" : "Số điện thoại",
    requirement: locale === "en" ? "Select requirement" : "Chọn nhu cầu",
    message: locale === "en" ? "Tell us about your project" : "Mô tả nhu cầu của bạn",
    privacy: locale === "en"
      ? "Your information will only be used for consultation follow-up via sales@networkai.vn and will not be shared with third parties."
      : "Thông tin của bạn sẽ được sử dụng để liên hệ tư vấn qua sales@networkai.vn và không chia sẻ cho bên thứ ba.",
  };

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setSubmitMessage("");
  }

  function validate() {
    const next = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+\s().-]{8,20}$/;

    if (!form.name.trim()) next.name = locale === "en" ? "Please enter your full name." : "Vui lòng nhập họ và tên.";
    if (!form.email.trim()) next.email = locale === "en" ? "Please enter your email." : "Vui lòng nhập email.";
    else if (!emailRegex.test(form.email.trim())) next.email = locale === "en" ? "Invalid email address." : "Email không hợp lệ.";
    if (!form.phone.trim()) next.phone = locale === "en" ? "Please enter your phone number." : "Vui lòng nhập số điện thoại.";
    else if (!phoneRegex.test(form.phone.trim())) next.phone = locale === "en" ? "Invalid phone number." : "Số điện thoại không hợp lệ.";
    if (!form.requirement.trim()) next.requirement = locale === "en" ? "Please select a requirement." : "Vui lòng chọn nhu cầu.";
    if (!form.message.trim()) next.message = locale === "en" ? "Please enter your message." : "Vui lòng nhập nội dung.";
    else if (form.message.trim().length < 20) next.message = locale === "en" ? "Please provide more detail (at least 20 characters)." : "Vui lòng mô tả chi tiết hơn (ít nhất 20 ký tự).";

    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Submit failed");

      setSubmitMessage(locale === "en" ? "Form submitted successfully. We will contact you soon." : "Gửi biểu mẫu thành công. Chúng tôi sẽ liên hệ sớm.");
      setForm({ name: "", company: "", email: "", phone: "", requirement: "", message: "" });
    } catch (error) {
      setSubmitMessage(error?.message || (locale === "en" ? "An error occurred while submitting the form." : "Có lỗi xảy ra khi gửi biểu mẫu."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-form">
      <div className="pill pill-soft">NETWORKAI TECHNOLOGY CO., LTD</div>
      <h3>{content.consultationLabel}</h3>
      <p>
        {locale === "en"
          ? "Share your requirements and our team will get back to you via sales@networkai.vn to discuss the most suitable solution."
          : "Gửi thông tin nhu cầu, đội ngũ của chúng tôi sẽ liên hệ lại qua sales@networkai.vn để tư vấn giải pháp phù hợp."}
      </p>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-row">
          <div>
            <input className="input" value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder={labels.name} />
            {errors.name ? <div className="error">{errors.name}</div> : null}
          </div>
          <div>
            <input className="input" value={form.company} onChange={(e) => setField("company", e.target.value)} placeholder={labels.company} />
          </div>
        </div>

        <div className="form-row">
          <div>
            <input className="input" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder={labels.email} />
            {errors.email ? <div className="error">{errors.email}</div> : null}
          </div>
          <div>
            <input className="input" value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder={labels.phone} />
            {errors.phone ? <div className="error">{errors.phone}</div> : null}
          </div>
        </div>

        <div>
          <select className="select" value={form.requirement} onChange={(e) => setField("requirement", e.target.value)}>
            <option value="">{labels.requirement}</option>
            <option value="it-elv">{locale === "en" ? "IT / ELV consulting" : "Tư vấn hệ thống IT / ELV"}</option>
            <option value="netops-argus">{locale === "en" ? "Explore NetOps Argus" : "Tìm hiểu NetOps Argus"}</option>
            <option value="quotation">{locale === "en" ? "Deployment quotation" : "Báo giá triển khai"}</option>
            <option value="partnership">{locale === "en" ? "Partnership inquiry" : "Hợp tác đối tác"}</option>
          </select>
          {errors.requirement ? <div className="error">{errors.requirement}</div> : null}
        </div>

        <div>
          <textarea className="textarea" value={form.message} onChange={(e) => setField("message", e.target.value)} placeholder={labels.message} />
          {errors.message ? <div className="error">{errors.message}</div> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="helper">{labels.privacy}</div>
          <div>
            <button className="cta-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (locale === "en" ? "Sending..." : "Đang gửi...") : content.consultationLabel}
            </button>
          </div>
          {submitMessage ? <div className="success-box">{submitMessage}</div> : null}
        </div>
      </form>
    </div>
  );
}