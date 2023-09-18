import Link from "next/link"
import React from "react"
import { MyFormikErrorsType, MyFormikRenderProps } from "@/my-formik"

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

const RenderPropsMyFormik = () => {
  const [isDefault, setIsDefault] = React.useState<boolean>(true)

  return (
    <>
      <h1>My Formik</h1>
      <Link href="/">Kembali ke Formik</Link><br /><br />
      <button onClick={() => setIsDefault(!isDefault)}>Click Me to change default value</button><br /><br />
      <MyFormikRenderProps
        initialValues={isDefault ? emptyValue : filledValue}
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
        }}
        enableReinitialize={true}
        validate={validate}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>
            <label>Email : </label>
            <input
              name="email"
              placeholder=""
              type="email"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.email}
            />
            {form.touched.email && form.errors.email ? (
              <p>{form.errors.email}</p>
            ) : null}
            <br /><br />
            <label>Password : </label>
            <input
              name="password"
              type="password"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.password}
            />
            {form.touched.password && form.errors.password ? (
              <p>{form.errors.password}</p>
            ) : null}
            <br /><br />
            <button type="submit">Submit</button>
          </form>
        )}
      </MyFormikRenderProps>
    </>
  )
}

export default RenderPropsMyFormik