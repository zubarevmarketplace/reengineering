"use client";
import { useState } from "react";
import { roles, resume, type CareerRole } from "@/data/resume";

function RoleContent({ role }: { role: CareerRole }) {
  return <><div className="role-focus"><span className="status-dot" />{role.focus}</div><h3>{role.title}</h3><p className="role-description">{role.description}</p><ul className="task-list">{role.tasks.map(task => <li key={task}>{task}</li>)}</ul><div className="tags">{role.skills.map(skill => <span key={skill}>{skill}</span>)}</div></>;
}

export function Career() {
  const [selected, setSelected] = useState(0);
  return <section id="experience" className="section experience-section">
    <div className="container">
      <div className="section-top"><span className="section-index">02 / Профессиональный опыт</span><span className="section-note">Силовая электроника для электротранспорта</span></div>
      <div className="experience-heading"><h2>От работы на объекте<br />к разработке изделий.</h2><div className="employer"><strong>{resume.employer}</strong><span>{resume.employmentPeriod}</span><span className="muted">Санкт-Петербург</span></div></div>
      <div className="career-desktop">
        <div className="career-tabs" role="tablist" aria-label="Должности в ЭПРО" aria-orientation="vertical">
          {roles.map((role, index) => <button key={role.id} id={`tab-${role.id}`} role="tab" aria-selected={selected === index} aria-controls={`panel-${role.id}`} tabIndex={selected === index ? 0 : -1} className={selected === index ? "career-tab selected" : "career-tab"} onClick={() => setSelected(index)} onKeyDown={event => {
            let next = index;
            if (event.key === "ArrowDown") next = (index + 1) % roles.length;
            else if (event.key === "ArrowUp") next = (index - 1 + roles.length) % roles.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = roles.length - 1;
            else return;
            event.preventDefault(); setSelected(next); document.getElementById(`tab-${roles[next].id}`)?.focus();
          }}><span className="timeline-node" /><span><span className="career-tab-label">{role.shortTitle}</span><span className="career-tab-caption">{role.current ? "Текущая роль" : role.focus}</span></span><span className="tab-arrow" aria-hidden="true">↗</span></button>)}
          <p className="career-footnote">Пять технических ролей в одной компании.<br />Даты переходов между должностями не указаны.</p>
        </div>
        {roles.map((role, index) => <div key={role.id} className={selected === index ? "role-panel is-active" : "role-panel"} id={`panel-${role.id}`} role="tabpanel" aria-labelledby={`tab-${role.id}`} tabIndex={0}><RoleContent role={role} /></div>)}
      </div>
      <div className="career-mobile">{roles.map((role, index) => <details key={role.id} name="career" open={index === 0}><summary><span>{role.shortTitle}<small>{role.current ? "Текущая роль" : role.focus}</small></span><span className="details-plus" aria-hidden="true">+</span></summary><div className="mobile-role-content"><RoleContent role={role} /></div></details>)}</div>
    </div>
  </section>;
}
