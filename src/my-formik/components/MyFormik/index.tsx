import React from "react"
import { useMyFormik, MyFormikReturnType, MyFormikPropsType } from "@/my-formik"

const Context = React.createContext<MyFormikReturnType<any>>({} as any)

export const useMyFormikContext = () => React.useContext(Context)


// Render Props
type MyFormikRenderPropsType<DataType> = {
  children: (form: MyFormikReturnType<DataType>) => React.ReactNode
}

export const MyFormikRenderProps = <DataType,>({ children, ...rest }: MyFormikPropsType<DataType> & MyFormikRenderPropsType<DataType>) => {
  const form = useMyFormik(rest)

  return (
    <Context.Provider value={form} >
      {children(form)}
    </Context.Provider>
  )
}

// Not Render Props
type MyFormikProviderPropsType = {
  children: React.ReactNode
}

export const MyFormik = <DataType,>({ children, ...rest }: MyFormikPropsType<DataType> & MyFormikProviderPropsType) => {
  const form = useMyFormik(rest)

  return (
    <Context.Provider value={form} >
      {children}
    </Context.Provider>
  )
}