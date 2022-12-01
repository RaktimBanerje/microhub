import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBell,
  faFileLines,
  faStar,
  IconDefinition,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBug,
  faChevronUp,
  faCake,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPencil,
  faPerson,
  faRightToBracket,
  faGaugeHigh,
} from "@fortawesome/free-solid-svg-icons";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Accordion,
  AccordionContext,
  Badge,
  Button,
  Nav,
  useAccordionButton,
} from "react-bootstrap";
import classNames from "classnames";
import Link from "next/link";

type SidebarNavItemProps = {
  href: string;
  icon?: IconDefinition;
} & PropsWithChildren;

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const { icon, children, href } = props;

  return (
    <Nav.Item>
      <Link href={href} passHref>
        <Nav.Link className="px-3 py-2 d-flex align-items-center">
          {icon ? (
            <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
          ) : (
            <span className="nav-icon ms-n3" />
          )}
          {children}
        </Nav.Link>
      </Link>
    </Nav.Item>
  );
};

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">
      {children}
    </li>
  );
};

type SidebarNavGroupToggleProps = {
  eventKey: string;
  icon: IconDefinition;
  setIsShow: (isShow: boolean) => void;
} & PropsWithChildren;

const SidebarNavGroupToggle = (props: SidebarNavGroupToggleProps) => {
  // https://react-bootstrap.github.io/components/accordion/#custom-toggle-with-expansion-awareness
  const { activeEventKey } = useContext(AccordionContext);
  const { eventKey, icon, children, setIsShow } = props;

  const decoratedOnClick = useAccordionButton(eventKey);

  const isCurrentEventKey = activeEventKey === eventKey;

  useEffect(() => {
    setIsShow(activeEventKey === eventKey);
  }, [activeEventKey, eventKey, setIsShow]);

  return (
    <Button
      variant="link"
      type="button"
      className={classNames(
        "rounded-0 nav-link px-3 py-2 d-flex align-items-center flex-fill w-100 shadow-none",
        {
          collapsed: !isCurrentEventKey,
        }
      )}
      onClick={decoratedOnClick}
    >
      <FontAwesomeIcon className="nav-icon ms-n3" icon={icon} />
      {children}
      <div className="nav-chevron ms-auto text-end">
        <FontAwesomeIcon size="xs" icon={faChevronUp} />
      </div>
    </Button>
  );
};

type SidebarNavGroupProps = {
  toggleIcon: IconDefinition;
  toggleText: string;
} & PropsWithChildren;

const SidebarNavGroup = (props: SidebarNavGroupProps) => {
  const { toggleIcon, toggleText, children } = props;

  const [isShow, setIsShow] = useState(false);

  return (
    <Accordion
      as="li"
      bsPrefix="nav-group"
      className={classNames({ show: isShow })}
    >
      <SidebarNavGroupToggle
        icon={toggleIcon}
        eventKey="0"
        setIsShow={setIsShow}
      >
        {toggleText}
      </SidebarNavGroupToggle>
      <Accordion.Collapse eventKey="0">
        <ul className="nav-group-items list-unstyled">{children}</ul>
      </Accordion.Collapse>
    </Accordion>
  );
};

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavTitle>
        <SidebarNavItem icon={faGaugeHigh} href="/">
          Dashboard
        </SidebarNavItem>
      </SidebarNavTitle>

      <SidebarNavTitle>Recipe Management</SidebarNavTitle>
      <SidebarNavItem href="/createRecipes" icon={faCake}>
        Create Recipes
      </SidebarNavItem>
      
      <SidebarNavTitle>Plan Management</SidebarNavTitle>

      <SidebarNavItem icon={faGauge} href="/createPlans">
        Create Plans
      </SidebarNavItem>
      <SidebarNavItem icon={faBell} href="/plans">
        Manage Plans
      </SidebarNavItem>
      <SidebarNavItem icon={faBell} href="/mealPlanner">
        Meal Planner
      </SidebarNavItem>
      <SidebarNavItem icon={faPerson} href="/clients">
        Client Management{" "}
      </SidebarNavItem>

      <SidebarNavTitle>Extras</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faStar} toggleText="Pages">
        <SidebarNavItem icon={faRightToBracket} href="login">
          Login
        </SidebarNavItem>
        <SidebarNavItem icon={faAddressCard} href="signup">
          Register
        </SidebarNavItem>
        <SidebarNavItem icon={faBug} href="404.html">
          Error 404
        </SidebarNavItem>
        <SidebarNavItem icon={faBug} href="500.html">
          Error 500
        </SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faFileLines} href="/uploader">
        File Uploader
      </SidebarNavItem>
    </ul>
  );
}
