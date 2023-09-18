import { useMyFormikContext } from "@/my-formik"
import React from "react"

type ErrorMessagePropsType = {
  name: string
}

export const ErrorMessage = ({ name }: ErrorMessagePropsType) => {
  const form = useMyFormikContext()

  if (form.touched?.[name] && form.errors?.[name]) {
    return <p>{form.errors?.[name]}</p>
  } else return null
}