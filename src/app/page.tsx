import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Career } from "@/components/sections/career";
import { Contact } from "@/components/sections/contact";
import { Process } from "@/components/sections/process";
import { EngineeringDrawing } from "@/components/sections/engineering-drawing";
import { Icon } from "@/components/ui/icon";
import { ResumeLink } from "@/components/ui/resume-link";
import { resume, tools, competencyGroups, education } from "@/data/resume";
import { siteUrl } from "@/lib/site";

export default function Home() {
  const person = { "@context": "https://schema.org", "@type": "Person", name: resume.name, jobTitle: resume.jobTitle, email: resume.email, telephone: resume.phoneHref, homeLocation: { "@type": "City", name: resume.city }, worksFor: { "@type": "Organization", name: resume.employer }, knowsAbout: resume.specialties, ...(siteUrl ? { url: siteUrl.href, image: new URL(resume.portraitPath, siteUrl).href } : {}) };
  return <><Header /><main id="main-content">
    <section id="home" className="hero"><div className="container">
      <div className="hero-topline"><span className="technical-label"><span className="crosshair" />Engineering portfolio</span><span className="location"><Icon name="location" />{resume.city}</span></div>
      <div className="hero-layout"><div className="hero-copy"><p className="hero-name">Руслан Эхтибаров</p><h1>Инженер-<br />конструктор<span className="title-period">.</span></h1><p className="hero-description">{resume.summary}</p><div className="hero-actions"><a className="button button-primary" href="#contact">Связаться<Icon name="arrow" /></a><ResumeLink /></div><div className="hero-specialties">{resume.specialties.map(item => <span key={item}>{item}</span>)}</div></div>
      <div className="portrait-composition"><div className="portrait-frame"><Image src={resume.portraitPath} alt="Руслан Эхтибаров, инженер-конструктор" width={800} height={1067} className="portrait" priority sizes="(max-width: 680px) 90vw, 40vw" /><div className="portrait-shade" /><div className="portrait-caption"><span className="status-dot" /><span>От конструкции<br />к работающему изделию</span><span className="portrait-symbol" aria-hidden="true">↗</span></div><span className="corner corner-tl" /><span className="corner corner-tr" /><span className="corner corner-bl" /><span className="corner corner-br" /></div><div className="portrait-coordinate" aria-hidden="true">DESIGN / ENGINEERING / PRODUCTION</div><div className="hero-drawing"><EngineeringDrawing mini /><span>3D / конструкция</span></div></div></div>
      <div className="hero-bottom"><span><span className="status-dot" />С 2021 года в НПП «ЭПРО»</span><a href="#approach">Познакомиться с опытом<span aria-hidden="true">↓</span></a></div>
    </div></section>

    <section id="approach" className="section approach-section"><div className="container"><div className="section-top"><span className="section-index">01 / Профессиональный подход</span><span className="section-note">Модель. Проверка. Реальное изделие.</span></div><div className="section-heading"><h2>Инженерия от разработки<br />до производства.</h2><p>Понимаю не только как спроектировать изделие, но и как оно собирается, проходит испытания и работает в эксплуатации.</p></div><div className="approach-grid">
      <article><div className="approach-icon"><Icon name="cube" /><span>01</span></div><h3>Проектирование</h3><p>3D-модели, чертежи и конструктивные решения. Подготовка и актуализация конструкторской документации.</p><span className="approach-detail">От модели к комплекту КД</span></article>
      <article><div className="approach-icon"><Icon name="test" /><span>02</span></div><h3>Испытания</h3><p>Проверка под нагрузкой, контроль нагрева и выявление технических отклонений. Обратная связь для доработки конструкции.</p><span className="approach-detail">От проверки к уточнению</span></article>
      <article><div className="approach-icon"><Icon name="assembly" /><span>03</span></div><h3>Производство</h3><p>Сопровождение сборки, устранение несоответствий и взаимодействие с производственными подразделениями.</p><span className="approach-detail">От чертежа к сборке</span></article>
    </div><div className="practice-note"><span className="practice-mark" aria-hidden="true">↳</span><p><strong>Практический взгляд на конструкцию.</strong> Опыт диагностики электрооборудования трамваев и троллейбусов помогает учитывать реальные условия эксплуатации.</p></div></div></section>

    <Career />

    <section id="skills" className="section skills-section"><div className="container"><div className="section-top"><span className="section-index">03 / Инструменты и компетенции</span><span className="section-note">Цифровая модель. Техническая точность.</span></div><div className="section-heading"><h2>Инструменты,<br />за которыми стоит опыт.</h2><p>От проработки корпуса и электрической схемы до документации для производства.</p></div><div className="tools-grid">{tools.map(tool => <article className="tool-item" key={tool.name}><span className="tool-mark">{tool.mark}</span><h3>{tool.name}</h3><p>{tool.purpose}</p><span className="tool-level"><span />{tool.level}</span></article>)}</div><div className="competency-grid">{competencyGroups.map(group => <div key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div></div></section>

    <Process />

    <section id="education" className="section education-section"><div className="container"><div className="section-top"><span className="section-index">05 / Образование</span><span className="section-note">Инженерная база и профессиональное развитие</span></div><h2>Практика, подкреплённая<br />техническим образованием.</h2><div className="education-list">{education.map((item, index) => <article key={item.period}><div className="education-date"><span className="education-node" /><span>{item.period}</span>{index === 0 && <span className="study-badge">Обучение продолжается</span>}</div><div><p className="education-status">{item.status}</p><h3>{item.institution}</h3><p className="education-specialty">{item.specialty}</p>{item.detail && <p className="education-detail">{item.detail}</p>}</div></article>)}</div></div></section>

    <Contact />
  </main><footer className="site-footer"><div className="container footer-inner"><span>{resume.name}<small>Инженер-конструктор · Санкт-Петербург</small></span><a href="#home">В начало<span aria-hidden="true">↑</span></a><span className="footer-sign">Точность в деталях.</span></div></footer><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} /></>;
}
