import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ activeLens = null, setActiveLens = null }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, path, targetId) => {
    e.preventDefault();
    if (path) {
      navigate(path);
      window.scrollTo(0, 0);
    } else if (targetId) {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    if (setActiveLens) setActiveLens(null);
  };

  const isPathActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar${activeLens ? ' dimmed' : ''}`}>
      {/* Logo */}
      <a href="/" className="navbar-logo" onClick={(e) => handleNavClick(e, '/')}>
        <img
          src="/New logo.svg"
          alt="Gravity Engage"
          style={{
            height: "16px",
            width: "auto",
            opacity: 0.8,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        />
      </a>

      {/* Right nav links */}
      <div className="navbar-links">
        <a 
          href="/" 
          className={`navbar-link ${isPathActive('/') ? 'active' : ''}`} 
          onClick={(e) => handleNavClick(e, '/')}
        >
          HOME
        </a>
        <a 
          href="/work" 
          className={`navbar-link ${isPathActive('/work') ? 'active' : ''}`} 
          onClick={(e) => handleNavClick(e, '/work')}
        >
          WORK
        </a>
        <a 
          href="/experiments" 
          className={`navbar-link ${isPathActive('/experiments') ? 'active' : ''}`} 
          onClick={(e) => handleNavClick(e, '/experiments')}
        >
          EXPERIMENTS
        </a>
        <a 
          href="/about" 
          className={`navbar-link ${isPathActive('/about') ? 'active' : ''}`} 
          onClick={(e) => handleNavClick(e, '/about')}
        >
          ABOUT
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
