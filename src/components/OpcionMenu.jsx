// import flecha from '../assets/icons/flechaDer.svg';

// // Definición de un componente funcional llamado OpcionMenu utilizando destructuring para recibir las propiedades estado, handleClick, titulo y nombre
// export const OpcionMenu = ({ estado, handleClick, titulo, nombre }) => {
//     return (
//         // Estructura del componente
//         <div className="d-flex align-items-center mb-3">
//             {/* Botón con una imagen de flecha */}
//             <button className="btn-flecha">
//                 <img 
//                     // La imagen utiliza la ruta especificada en la variable flecha
//                     src={flecha}
//                     // Si el estado es verdadero, agrega la clase 'rotar' para girar la flecha
//                     className={estado ? 'rotar' : ''}
//                     // Asigna el nombre especificado en la propiedad nombre a la imagen
//                     name={nombre}
//                     // Asigna la función especificada en la propiedad handleClick al evento onClick de la imagen
//                     onClick={handleClick} 
//                 />
//             </button>
//             {/* Un párrafo con el título especificado en la propiedad titulo */}
//             <p className="sideBarCategoria">{titulo}</p>
//         </div>
//     )
// }

