import { useState } from "react"


export const useForm = ( estadoInicial = {} ) => {

    const [ valores, setValores ] = useState(estadoInicial);

    
    const handleInputChange = ({ target }) => {

        setValores({
            ...valores,
            [target.name]: target.value
        });
    }


    return [valores, handleInputChange ];
}