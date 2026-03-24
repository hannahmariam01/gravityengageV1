import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeLens, setActiveLens }) => {
  const navigate = useNavigate();

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

  return (
    <nav className={`navbar${activeLens ? ' dimmed' : ''}`}>
      {/* Logo */}
      <a href="/" className="navbar-logo" onClick={(e) => handleNavClick(e, '/')}>
        <img
          src="https://raw.githubusercontent.com/hannahmariam01/images/main/colored-logo.png"
          alt="Gravity Engage"
          style={{
            height: "40px",
            width: "auto",
            transition: "transform 0.3s ease",
          }}
        />
      </a>

      {/* Right nav links */}
      <div className="navbar-links">
        <a href="/" className="navbar-link" onClick={(e) => handleNavClick(e, '/')}>HOME</a>
        <a href="/work" className="navbar-link" onClick={(e) => handleNavClick(e, '/work')}>WORK</a>
        <a href="/playground" className="navbar-link" onClick={(e) => handleNavClick(e, '/playground')}>PLAYGROUND</a>
        <a href="/about" className="navbar-link" onClick={(e) => handleNavClick(e, '/about')}>ABOUT</a>
      </div>
    </nav>
  );
};

export default Navbar;
