import { useState } from "react"


export default function useForm(dataFormInicial) {

    const [dataForm, setDataForm] = useState(dataFormInicial)

    const onInputValue = ({name, value}) => {
        console.log('cambiando...');
        
        setDataForm({
            ...dataForm,
            [name]: value
        })
    }

  return {
    ...dataForm,
    dataForm,
    onInputValue
  }
}
