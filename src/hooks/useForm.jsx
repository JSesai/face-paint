import { useState } from "react"


export default function useForm(dataFormInicial) {

  const [dataForm, setDataForm] = useState(dataFormInicial)

  const onInputValue = (input) => {
    const { name, value } = input.target;

    setDataForm({
      ...dataForm,
      [name]: value
    })
  }


  const resetForm = () => {
    setDataForm(dataFormInicial)
  }

  return {
    ...dataForm,
    dataForm,
    onInputValue,
    resetForm
  }
}
