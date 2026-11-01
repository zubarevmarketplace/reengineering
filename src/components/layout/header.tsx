"use client";

import { useEffect, useState } from "react";
const links = [{ id: "approach", title: "Подход" }, { id: "experience", title: "Опыт" }, { id: "skills", title: "Компетенции" }, { id: "education", title: "Образование" }];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main > section[id]")];
    const update = () => {
      const current = sections.filter(s => s.getBoundingClientRect().top <= 150).at(-1);
      setActive(current?.id ?? "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); document.getElementById("menu-button")?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return <header className="site-header">
    <div className="container header-inner">
      <a className="brand" href="#home" aria-label="Руслан Эхтибаров — в начало" onClick={() => setOpen(false)}><span className="brand-mark">РЭ<span /></span><span className="brand-name">Руслан Эхтибаров<span>Инженер-конструктор</span></span></a>
      <button id="menu-button" className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)} aria-label={open ? "Закрыть меню" : "Открыть меню"}><span className={open ? "menu-lines is-open" : "menu-lines"} /></button>
      <nav id="main-navigation" className={open ? "navigation is-open" : "navigation"} aria-label="Основная навигация">
        {links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={active === link.id ? "location" : undefined} onClick={() => setOpen(false)}>{link.title}</a>)}
        <a href="#contact" className="nav-contact" aria-current={active === "contact" ? "location" : undefined} onClick={() => setOpen(false)}>Связаться <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>;
}
