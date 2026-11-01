export function EngineeringDrawing({ stage = 0, mini = false }: { stage?: number; mini?: boolean }) {
  return <svg className={`engineering-drawing stage-${stage} ${mini ? "mini-drawing" : ""}`} viewBox="0 0 640 440" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g className="drawing-grid" stroke="currentColor" strokeWidth=".5">{Array.from({ length: 17 }, (_, i) => <path key={`x${i}`} d={`M${i * 40} 0V440`} />)}{Array.from({ length: 12 }, (_, i) => <path key={`y${i}`} d={`M0 ${i * 40}H640`} />)}</g>
    <g className="drawing-axis" stroke="#526c83" strokeWidth="1" strokeDasharray="5 7"><path d="M70 330 570 95M80 110l470 240M320 30v380" /></g>
    <g className="iso-body" stroke="#78bde4" strokeWidth="1.5" strokeLinejoin="round">
      <g className="base-part"><path d="m142 228 199-106 166 89-199 107-166-90Z" fill="#142c3b" /><path d="M142 228v59l166 91v-60M507 211v60L308 378" fill="#122330" /><path d="m157 240 151 82 184-99M157 240v36l151 83 184-99v-37M308 322v37" /><path d="m174 264 24 13v15l-24-13v-15Zm41 22 24 13v15l-24-13v-15Z" fill="#0b1824" />
        {Array.from({ length: 7 }, (_, i) => <path key={i} d={`m${339 + i * 20} ${312 - i * 11}v20`} strokeWidth="3" />)}
        <ellipse cx="160" cy="231" rx="4" ry="2" /><ellipse cx="340" cy="135" rx="4" ry="2" /><ellipse cx="488" cy="212" rx="4" ry="2" /><ellipse cx="309" cy="306" rx="4" ry="2" />
      </g>
      <g className="board-part" stroke="#65c5be"><path d="m187 217 151-80 122 65-151 81-122-66Z" fill="#163e44" /><path d="m245 208 64-34 54 29-64 34-54-29Z" fill="#0c2632" /><path d="m245 208 54 29v-13l64-34M299 237v-13l-54-29" /><path d="m340 169 38-20 22 12-38 20-22-12ZM363 230l39-21 21 12-39 21-21-12Z" /><path d="m218 214 16-9m-6 15 16-9m-6 15 16-9M318 261l13-7m-3-13 13-7m-3-13 13-7" /></g>
      <g className="cover-part"><path d="m140 151 201-107 168 90-201 107-168-90Z" fill="#203d50" fillOpacity=".85" /><path d="M140 151v13l168 90 201-107v-13M308 241v13" fill="#172f40" />
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={`m${249 + i * 15} ${132 - i * 8} 63 34`} stroke="#80a9c1" strokeWidth="3" />)}
        <ellipse cx="160" cy="151" rx="4" ry="2" /><ellipse cx="341" cy="56" rx="4" ry="2" /><ellipse cx="490" cy="134" rx="4" ry="2" /><ellipse cx="308" cy="229" rx="4" ry="2" />
      </g>
      <g className="explosion-lines" strokeDasharray="4 6" strokeOpacity=".6"><path d="M160 151v80M341 56v79M490 134v78M308 229v77" /></g>
    </g>
    <g className="dimension-lines" stroke="#8095a8" strokeWidth="1"><path d="m127 301 167 91m-174-81 14-18m153 107 14-18m28 11 192-104m-200 96 15 17m177-121 15 17M127 151H92m35 136H92m12-145v153m-7-146h14m-14 138h14" /><path d="m218 351-18-9m216 1 17-9" /></g>
    <g className="drawing-labels" fill="#a7bdcb" fontFamily="monospace" fontSize="11"><text x="200" y="376" transform="rotate(28 200 376)">A — A</text><text x="437" y="348" transform="rotate(-28 437 348)">B — B</text><text x="87" y="224" transform="rotate(-90 87 224)">H</text><text x="540" y="405">X</text><text x="570" y="370">Y</text><text x="534" y="345">Z</text></g>
    <g stroke="#7b97ad" strokeWidth="1.5"><path d="M540 385v-35m0 35 27-15m-27 15-25-14" /></g>
    <g className="thermal-points" stroke="#68d5c1"><circle cx="300" cy="217" r="27" fill="#36d0c0" fillOpacity=".13" /><circle cx="300" cy="217" r="7" /><path d="M327 217h60l36-31h90" /><text x="430" y="175" fill="#85ded0" stroke="none" fontFamily="monospace" fontSize="11">КОНТРОЛЬ НАГРЕВА</text></g>
    <g className="orthographic" stroke="#78bde4" strokeWidth="1.5"><rect x="148" y="85" width="340" height="180" rx="6" fill="#142c3b" /><rect x="163" y="100" width="310" height="150" rx="3" />{Array.from({ length: 6 }, (_, i) => <path key={i} d={`M${265 + i * 20} 132v85`} strokeWidth="4" />)}<circle cx="178" cy="115" r="4" /><circle cx="458" cy="115" r="4" /><circle cx="178" cy="235" r="4" /><circle cx="458" cy="235" r="4" /><rect x="148" y="309" width="340" height="60" rx="3" /><path d="M148 68V40m340 28V40M140 52h356M125 85H95m30 180H95M108 77v196M148 280v107m340-107v107" stroke="#8095a8" /><path d="M148 265v44m340-44v44" strokeDasharray="4 5" /><text x="284" y="40" fill="#a7bdcb" stroke="none" fontFamily="monospace" fontSize="12">ВИД СВЕРХУ</text><text x="283" y="400" fill="#a7bdcb" stroke="none" fontFamily="monospace" fontSize="12">ВИД СПЕРЕДИ</text></g>
  </svg>;
}
