import Link from "next/link"
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().required("Email harus diisi").email("Format email woi"),
  password: yup.string().required("Password harus diisi").min(5, "Minimal 5 karakter!"),
})

const Formik = () => {
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })

  return (
    <>
      <h1>Formik</h1>
      <Link href="/my-formik">Kembali ke My Formik</Link><br /><br />
      <Link href="/render-props">Kembali ke My Formik Render Props</Link><br /><br />
      <form onSubmit={form.handleSubmit}>
        <label>Email : </label>
        <input
          name="email"
          placeholder=""
          type="email"
          onChange={form.handleChange}
          value={form.values.email}
        />
        <br /><br />
        <label>Password : </label>
        <input
          name="password"
          type="password"
          onChange={form.handleChange}
          value={form.values.password}
        />
        <br /><br />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Formik