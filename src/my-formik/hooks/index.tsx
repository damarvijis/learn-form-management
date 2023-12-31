import React, { ChangeEvent, FormEvent, FocusEvent, Dispatch, SetStateAction } from "react"

export type MyFormikErrorsType<DataType> = {
  [Key in keyof DataType]?: string
}

export type MyFormikTouchedType<DataType> = {
  [Key in keyof DataType]?: boolean
}

export type MyFormikPropsType<DataType> = {
  initialValues: DataType
  onSubmit: (values: DataType) => void
  validate?: (values: DataType) => MyFormikErrorsType<DataType>
  enableReinitialize?: boolean
}

export type MyFormikReturnType<DataType> = {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  resetForm: () => void
  setValues: Dispatch<SetStateAction<DataType>>
  handleBlur: (event: FocusEvent<HTMLInputElement, Element>) => void
  getFieldProps: <Name extends keyof DataType, >(name: Name) => {
    name: Name
    id: Name
    onBlur: (event: FocusEvent<HTMLInputElement, Element>) => void
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    value: DataType[Name]
  }
  touched: MyFormikTouchedType<DataType>
  values: DataType
  errors: MyFormikErrorsType<DataType>
}

export const useMyFormik = <DataType,>({ initialValues, onSubmit, enableReinitialize, validate }: MyFormikPropsType<DataType>): MyFormikReturnType<DataType> => {
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

  // Props Getter. function -> props component
  const getFieldProps = <Name extends keyof DataType,>(name: Name) => ({
    name,
    id: name,
    onBlur: handleBlur,
    onChange: handleChange,
    value: values[name]
  })

  return {
    handleSubmit,
    handleChange,
    resetForm,
    setValues,
    handleBlur,
    getFieldProps,
    touched,
    values,
    errors
  }
}