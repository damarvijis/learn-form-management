import { useMyFormikContext } from "@/my-formik"
import React from "react"

type FieldPropsType = {
  name: string
  type?: React.HTMLInputTypeAttribute
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number | readonly string[] | undefined
}

export const Field = (props: FieldPropsType) => {
  const { name, type } = props

  const form = useMyFormikContext()

  const defaultProps = form.getFieldProps(name)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    defaultProps.onChange(event)
    props.onChange && props.onChange(event)
  }

  const inputProps = {
    ...defaultProps,
    onChange: handleChange,
    value: props.value ? props.value : defaultProps.value
  }

  return (
    <input
      {...inputProps}
      type={type}
    />
  )
}