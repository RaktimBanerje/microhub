import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import HeaderProfileNav from "@layout/AdminLayout/Header/HeaderProfileNav";
import { Button, Container } from "react-bootstrap";

type HeaderProps = {
  toggleSidebar: () => void;
  toggleSidebarMd: () => void;
};

export default function Header(props: HeaderProps) {
  const { toggleSidebar, toggleSidebarMd } = props;

  return (
    <header className="header sticky-top mb-4 p-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center">
        <Button
          variant="link"
          className="header-toggler d-md-none px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Button
          variant="link"
          className="header-toggler d-none d-md-inline-block px-md-0 me-md-3 rounded-0 shadow-none"
          type="button"
          onClick={toggleSidebarMd}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
        <Link href="/src/pages">
          <a className="header-brand d-md-none">
            <svg width="118" height="46">
              <title>MicroHUB</title>
              <use xlinkHref="/assets/brand/logo-figma.svg#full" />
            </svg>
          </a>
        </Link>
        <div className="header-nav  ms-auto">
          <HeaderProfileNav />
        </div>
      </Container>
      <div className="header-divider border-top my-2 ms-n2 me-n2" />
    </header>
  );
}
