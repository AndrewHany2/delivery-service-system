function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse mx-5" id="navbarTogglerDemo01">
        <a className="navbar-brand" href="/">
          Delivery System
        </a>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="/send">
              Send
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/status">
              Status
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
