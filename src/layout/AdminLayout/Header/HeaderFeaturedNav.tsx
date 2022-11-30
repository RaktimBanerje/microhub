import Link from "next/link";
import { Nav } from "react-bootstrap";

export default function HeaderFeaturedNav() {
  return (
    <Nav>
      <Nav.Item>
        <Link href="/" passHref>
          <Nav.Link className="p-2">Dashboard</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/users" passHref>
          <Nav.Link className="p-2">Users</Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link href="/plans" passHref>
          <Nav.Link className="p-2">Plan Management</Nav.Link>
        </Link>
      </Nav.Item>
    </Nav>
  );
}
