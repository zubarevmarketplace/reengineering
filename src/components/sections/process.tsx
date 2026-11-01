"use client";
import { useState } from "react";
import { processSteps } from "@/data/resume";
import { EngineeringDrawing } from "./engineering-drawing";

export function Process() {
  const [stage, setStage] = useState(0);
  return <section id="process" className="section process-section"><div className="container">
    <div className="section-top"><span className="section-index">04 / Инженерный процесс</span><span className="section-note">Взаимосвязь знакомых направлений работы</span></div>
    <div className="section-heading"><h2>От идеи<br />до готового изделия.</h2><p>Каждый этап уточняет следующий.<br />Опыт испытаний и эксплуатации помогает видеть конструкцию целиком.</p></div>
    <div className="process-tabs" role="tablist" aria-label="Этапы инженерного процесса">{processSteps.map((step, index) => <button key={step.title} id={`process-tab-${index}`} role="tab" aria-controls={`process-panel-${index}`} aria-selected={stage === index} tabIndex={stage === index ? 0 : -1} onClick={() => setStage(index)} onKeyDown={e => {
      let next = index;
      if (e.key === "ArrowRight") next = (index + 1) % processSteps.length;
      else if (e.key === "ArrowLeft") next = (index - 1 + processSteps.length) % processSteps.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = processSteps.length - 1;
      else return;
      e.preventDefault(); setStage(next); document.getElementById(`process-tab-${next}`)?.focus();
    }}><span>0{index + 1}</span>{step.title}<span className="process-tab-arrow" aria-hidden="true">↗</span></button>)}</div>
    {processSteps.map((step, index) => <div key={step.title} className="process-panel" id={`process-panel-${index}`} role="tabpanel" aria-labelledby={`process-tab-${index}`} hidden={stage !== index} tabIndex={0}><div className="drawing-window"><div className="drawing-toolbar"><span><i />{step.label}</span><span>0{index + 1} / 04</span></div><EngineeringDrawing stage={index} /><div className="drawing-footer"><span>{step.drawing}</span><span>Условная схема</span></div></div><div className="process-copy"><span className="process-step-count">0{index + 1}<span> / 04</span></span><h3>{step.subtitle}</h3><p>{step.description}</p><div className="process-result"><span>На выходе этапа</span><strong>{step.result}</strong></div></div></div>)}
    <p className="drawing-disclaimer">Демонстрационная визуализация инженерного процесса. Не является проектом кандидата или чертежом реального изделия.</p>
  </div></section>;
}
