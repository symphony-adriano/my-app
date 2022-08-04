
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const SinglePostPage = () => {
  const { postId } = useParams()
  
  const post = useSelector(state =>
    state.posts.find(({ id }) => id === postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
      </article>
    </section>
  )
}