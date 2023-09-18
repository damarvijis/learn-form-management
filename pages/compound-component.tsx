import Link from "next/link"
import React from "react"
import {
  MyFormikErrorsType,
  MyFormik,
  Form,
  Field,
  ErrorMessage
} from "@/my-formik"

type ValuesType = {
  email: string
  password: string
}

const emptyValue: ValuesType = {
  email: '',
  password: '',
}

const filledValue: ValuesType = {
  email: 'damar@mail.com',
  password: 'damar',
}

const validate = (values: ValuesType) => {
  const errors: MyFormikErrorsType<ValuesType> = {}

  if (!values.email) {
    errors.email = 'Email Required';
  }

  if (!values.password) {
    errors.password = 'Password Required';
  }

  return errors
}

const CompoundComponent = () => {
  const [isDefault, setIsDefault] = React.useState<boolean>(true)

  return (
    <>
      <h1>Compund Component My Formik</h1>
      <Link href="/">Kembali ke Formik</Link><br /><br />
      <button onClick={() => setIsDefault(!isDefault)}>Click Me to change default value</button><br /><br />
      <MyFormik
        initialValues={isDefault ? emptyValue : filledValue}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
        enableReinitialize={true}
        validate={validate}
      >
        <Form>
          <label htmlFor="email">Email : </label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
          <br /><br />
          <label htmlFor="password">Password : </label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" />
          <br /><br />
          <button type="submit">Submit</button>
        </Form>
      </MyFormik>
    </>
  )
}

export default CompoundComponent