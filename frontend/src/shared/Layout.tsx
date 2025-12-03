import React from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            명지대학교 국제교류센터 게시판
          </Link>
          <nav>
            <Link
              to="/"
              className={
                location.pathname === "/" ? "nav-link active" : "nav-link"
              }
            >
              목록
            </Link>
            <Link
              to="/posts/new"
              className={
                location.pathname === "/posts/new"
                  ? "nav-link active"
                  : "nav-link"
              }
            >
              새 글 작성
            </Link>
          </nav>
        </div>
      </header>
      <main className="container main-content">{children}</main>
      <footer className="app-footer">
        <div className="container">
          <small>© {new Date().getFullYear()} 명지대학교 국제교류센터</small>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
