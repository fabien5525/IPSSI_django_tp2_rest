import { Link } from 'react-router-dom';
import './AppLayout.css'

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({children} : AppLayoutProps) => {
  return (
    <div className="app-container">
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/projects">Projets</Link>
          </li>
          <li className="navbar-item">
            <Link to="/users">Utilisateurs</Link>
          </li>
          <li className="navbar-item">
            <Link to="/login">Connexion</Link>
          </li>
          <li className="navbar-item">
            <Link to="/signup">Inscription</Link>
          </li>
        </ul>
      </nav>
      <div className="main-container">
        <div className="sidebar">
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <Link to="/table">Tableau</Link>
            </li>
            <li className="sidebar-item">
              <Link to="/tickets">Tickets</Link>
            </li>
          </ul>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default AppLayout
