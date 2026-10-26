import SkyScene from './SkyScene.jsx'

// The short sky banner at the top of every inner page.
export default function PageHeader({ kicker, title, subtitle, sprite }) {
  return (
    <header className="page-header">
      <SkyScene compact />
      <div className="container page-header-inner">
        <div>
          {kicker && <p className="kicker">{kicker}</p>}
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
        {sprite && <img className="page-header-sprite bob" src={sprite} alt="" aria-hidden="true" />}
      </div>
    </header>
  )
}
