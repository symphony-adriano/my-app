import { Formik, Field, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

export const AddPostForm = () => {

  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  const initialValues = {
    title: '',
    content: '',
  }

  const usersOptions = users.map(({id, name}) => {
    <option key={id} value={id}>
      {name}
    </option>
  })

  const handleSubmit = ({ title, content }) => {
    if (title && content) {
      dispatch(
        postAdded(title, content,)
      )
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

          <label htmlFor='postAuthor'>Author</label>
          <Field as="select" name='author' >
            <option value=""></option>
            {usersOptions}

          </Field>
          <br />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </section>
  )
}
