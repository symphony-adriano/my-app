import { Formik, Field, Form } from 'formik';

export const AddPostForm = () =>
  <div>
    <Formik
      initialValues={{
        title: '',
        content: '',
      }}
      onSubmit={async (values) => {
        await new Promise(r => setTimeout(r, 500))
        alert(JSON.stringify(values, null, 2))
      }}
    >
      <Form>
        <label htmlFor="title">Title</label>
        <Field id="title" name="title" placeholder="Title" />

        <label htmlFor='content'>Content</label>
        <Field id='content' name='content' placeholder='Content' />

        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  </div>
