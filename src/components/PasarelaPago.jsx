import React from 'react'
import PropTypes from 'prop-types';
import { initMercadoPago } from '@mercadopago/sdk-react';
import { CardPayment } from '@mercadopago/sdk-react';




export default function PasarelaPago({ initialization, onSubmit }) {
  initMercadoPago('TEST-74e4a846-d88c-4b06-bfff-33dfef37d470', { locale: 'es-MX' });

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };

  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
  };


  return (

    <div className="flex justify-center items-center">
      <div className="m-2 md:m-7 max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full">
        <CardPayment
          initialization={initialization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      </div>
    </div>
  )
};


PasarelaPago.proptypes = {
  initialization: PropTypes.func.isRequired
}
