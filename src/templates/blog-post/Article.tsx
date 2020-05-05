import React from "react"
import Bio from "../../components/bio"
import { rhythm, scale } from "../../utils/typography"

type Props = {
  post: {
    frontmatter: {
      title: string
      date: string
    }
    html: string
  }
}

export const Article: React.FC<Props> = ({ post }) => {
  return (
    <article>
      <header>
        <h1
          style={{
            marginTop: rhythm(1),
            marginBottom: 0,
          }}
        >
          {post.frontmatter.title}
        </h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
          }}
        >
          {post.frontmatter.date}
        </p>
      </header>
      <section dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />
      <footer>
        <Bio />
      </footer>
    </article>
  )
}
