import { useState } from "react"




const useOpenMenu = ({ estadoInicial = {} }) => {

    const [ estados, setEstados ] = useState( estadoInicial );


    const handleClick = ({ target }) => {
        let valor = target.className === 'rotar' ? true : false;
        
        setEstados({
            ...estados,
            [target.name]: !valor
        });
    }


    return [ estados, handleClick ];

}

export default useOpenMenu