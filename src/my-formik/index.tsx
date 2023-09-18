import React, { ChangeEvent, FormEvent, FocusEvent } from "react"

export type MyFormikErrorsType<DataType> = {
  [Key in keyof DataType]?: string
}

type MyFormikTouchedType<DataType> = {
  [Key in keyof DataType]?: boolean
}

type MyFormikPropsType<DataType> = {
  initialValues: DataType
  onSubmit: (values: DataType) => void
  validate?: (values: DataType) => MyFormikErrorsType<DataType>
  enableReinitialize?: boolean
}

export const useMyFormik = <DataType,>({ initialValues, onSubmit, enableReinitialize, validate }: MyFormikPropsType<DataType>) => {
  const [values, setValues] = React.useState<DataType>(initialValues)
  const [errors, setErrors] = React.useState<MyFormikErrorsType<DataType>>({})
  const [touched, setTouched] = React.useState<MyFormikTouchedType<DataType>>({})

  React.useEffect(() => {
    if (enableReinitialize && initialValues !== values) {
      setValues(initialValues)
    }
  }, [enableReinitialize, initialValues])

  React.useEffect(() => {
    if (validate) {
      const newErrors = validate(values)
      setErrors(newErrors)
    }
  }, [values, validate])

  const handleBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    setTouched(touched => ({ ...touched, [event.target.name]: true }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newErrors = validate ? validate(values) : {}
    Object.keys(newErrors).forEach(key => setTouched(touched => ({ ...touched, [key]: true })))
    setErrors(newErrors)
    const isValid = Object.keys(newErrors).length === 0

    if (isValid) onSubmit(values)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!touched[event.target.name as keyof DataType]) {
      setTouched(touched => ({ ...touched, [event.target.name]: true }))
    }

    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const resetForm = () => setValues(initialValues)

  return {
    handleSubmit,
    handleChange,
    resetForm,
    setValues,
    handleBlur,
    touched,
    values,
    errors
  }
}