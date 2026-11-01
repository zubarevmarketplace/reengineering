"use client";
import { useState } from "react";
import { resume } from "@/data/resume";
import { Icon } from "./icon";

export function ResumeLink({ className = "button button-secondary" }: { className?: string }) {
  const [error, setError] = useState(false);
  return <span className="resume-action"><a className={className} href={resume.resumePath} download="Резюме — Руслан Эхтибаров.pdf" onClick={async e => {
    e.preventDefault();
    try {
      const response = await fetch(resume.resumePath);
      if (!response.ok || !response.headers.get("content-type")?.includes("application/pdf")) throw new Error("PDF unavailable");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a"); link.href = url; link.download = "Резюме — Руслан Эхтибаров.pdf";
      link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setError(false);
    } catch { setError(true); }
  }}>Скачать резюме <Icon name="download" /></a>{error && <span className="action-error" role="status">Не удалось загрузить PDF. <a href={`mailto:${resume.email}`}>Запросить по почте</a></span>}</span>;
}
