"use client";
import { useState } from "react";
import { resume } from "@/data/resume";
import { Icon } from "../ui/icon";
import { ResumeLink } from "../ui/resume-link";

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  async function copyEmail() {
    try { await navigator.clipboard.writeText(resume.email); setCopyState("copied"); }
    catch { setCopyState("failed"); }
  }
  return <section id="contact" className="contact-section"><div className="container">
    <div className="section-top"><span className="section-index">06 / Контакты</span><span className="location"><Icon name="location" />{resume.city}</span></div>
    <div className="contact-layout"><div><h2>Обсудим<br />инженерные задачи?</h2><p>Готов обсудить профессиональные возможности, задачи конструкторского отдела и перспективы сотрудничества.</p><a className="button button-primary" href={`mailto:${resume.email}`}><Icon name="mail" />Написать на почту<Icon name="arrow" /></a></div><div className="contact-details"><span className="contact-caption">Электронная почта</span><div className="email-row"><a href={`mailto:${resume.email}`} className="email-link">{resume.email}</a><button className="copy-button" aria-label="Скопировать адрес почты" onClick={copyEmail}><Icon name={copyState === "copied" ? "check" : "copy"} /></button></div><p role="status" className="copy-status">{copyState === "copied" ? "Адрес скопирован" : copyState === "failed" ? "Не удалось скопировать. Выделите адрес и скопируйте вручную." : ""}</p><span className="contact-caption">Телефон</span><a className="phone-link" href={`tel:${resume.phoneHref}`}>{resume.phone}</a><ResumeLink className="text-link" /></div></div>
  </div></section>;
}
