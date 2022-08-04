import { nanoid } from '@reduxjs/toolkit';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';

export const AddPostForm = () => {

  const dispatch = useDispatch()

  const initialValues = {
    title: '',
    content: '',
  }

  const handleSubmit = ({ title, content }) => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
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
          <br />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </section>
  )
}
