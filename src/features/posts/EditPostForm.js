import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { postUpdated } from './postsSlice'

export const EditPostForm = () => {
  const { postId } = useParams()
  const { navigate } = useNavigate()

  const post = useSelector(state =>
    state.posts.find(({ id }) => id === postId))

  const dispatch = useDispatch()

  const initialValues = {
    title: post.title,
    content: post.content,
  }

  const handleSubmit = ({ title, content }) => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      navigate(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="title">Title</label>
          <Field id="title" name="title" placeholder="Title" />

          <label htmlFor='content'>Content</label>
          <Field id='content' name='content' placeholder='Content' />
          <br />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </section>
  )
}
