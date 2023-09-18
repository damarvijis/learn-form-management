import { useMyFormikContext } from "@/my-formik"
import React from "react"

type FormPropsType = {
  children: React.ReactNode
}

export const Form = ({ children }: FormPropsType) => {
  const form = useMyFormikContext()

  return (
    <form onSubmit={form.handleSubmit}>
      {children}
    </form>
  )
}