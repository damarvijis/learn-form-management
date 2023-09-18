import { useMyFormikContext } from "@/my-formik"
import React from "react"

type FieldPropsType = {
  name: string
  type?: React.HTMLInputTypeAttribute
}

export const Field = ({ name, type }: FieldPropsType) => {
  const form = useMyFormikContext()

  return (
    <input
      name={name}
      id={name}
      type={type}
      onBlur={form.handleBlur}
      onChange={form.handleChange}
      value={form.values?.[name]}
    />
  )
}