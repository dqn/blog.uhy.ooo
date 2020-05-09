import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import { SiteMetadata } from "../../types/siteMetadata"
import { rhythm, scale } from "../../utils/typography"
import { Ad } from "./ad"
import { Header } from "./header"
import { mainAreaWidth, sideBarWidth } from "./width"

const LayoutStyle = styled.div`
  display: grid;
  grid-template-areas:
    "left header ."
    "left main   right"
    "left footer right";
  grid-template-rows: max-content max-content auto;
  grid-template-columns: 0 100% 0;
  max-width: ${rhythm(mainAreaWidth)};
  @media (min-width: ${rhythm(mainAreaWidth + sideBarWidth)}) {
    grid-template-columns: auto ${rhythm(mainAreaWidth)} ${rhythm(sideBarWidth)};
    max-width: none;
    width: 100%;
  }
  @media (min-width: ${rhythm(mainAreaWidth + sideBarWidth * 2)}) {
    grid-template-columns: ${rhythm(sideBarWidth)} ${rhythm(mainAreaWidth)} ${rhythm(
        sideBarWidth
      )};
    width: ${rhythm(mainAreaWidth + sideBarWidth * 2)};
  }

  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;

  & > div:nth-of-type(1) {
    grid-area: header;
  }

  & > main {
    grid-area: main;
    max-width: ${rhythm(mainAreaWidth)};
    padding: ${rhythm(1)};
    background-color: white;
  }

  & > div:nth-of-type(2) {
    grid-area: right;

    @media (max-width: ${rhythm(mainAreaWidth + sideBarWidth)}) {
      display: none;
    }
  }

  & > footer {
    grid-area: footer;
    padding: ${rhythm(1)} ${rhythm(1)} ${rhythm(1)};
    background-color: white;
    color: hsl(0, 0%, 0%, 0.5);
    ${scale(-0.25)};
  }

  & > footer > aside {
    @media (min-width: ${rhythm(mainAreaWidth + sideBarWidth)}) {
      display: none;
    }
  }
`

type Props = {
  rightSide?: JSX.Element
}
const Layout: React.FC<Props> = ({ rightSide, children }) => {
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: Pick<SiteMetadata, "title">
    }
  }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <LayoutStyle>
      <div>
        <Header title={site.siteMetadata.title} />
      </div>
      <main>{children}</main>
      <div>
        <Ad />
        {rightSide}
      </div>
      <footer>
        <aside>
          <Ad />
        </aside>
        <div>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a rel="external" href="https://www.gatsbyjs.org">
            Gatsby
          </a>
        </div>
      </footer>
    </LayoutStyle>
  )
}

export default Layout
