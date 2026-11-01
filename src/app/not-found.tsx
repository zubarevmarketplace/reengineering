import Link from "next/link";
export default function NotFound() {
  return <main className="not-found container"><span className="section-index">404 / Страница не найдена</span><h1>Здесь пока<br />нет чертежа.</h1><p>Возможно, ссылка изменилась. Портфолио Руслана Эхтибарова доступно на главной странице.</p><Link className="button button-primary" href="/">Перейти к портфолио</Link></main>;
}
