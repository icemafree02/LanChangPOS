import React, { useState } from "react";
import styled from "styled-components";
import { Accessibility } from "./accessibilityem";
import { MenuToggle } from "./menuToggle-em";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 65px;
  left: 0;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 16px;
  display: flex;

  margin-bottom: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: inherit;
`;

const Marginer = styled.div`
  height: 2em;
`;

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
        <LinkItem>
        <Link href="#">หน้าหลัก</Link>
          </LinkItem>
          <LinkItem>
            <Link href="#">ชำระเงิน</Link>
          </LinkItem>
          <LinkItem>
            <Link href="#">ดูรายการอาหารที่สั่ง</Link>
          </LinkItem>
           
          
          <Marginer />
          <Accessibility />
        </LinksWrapper>
  )
}
    </NavLinksContainer >
  );
}
