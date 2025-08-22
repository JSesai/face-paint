import React, { useLayoutEffect } from 'react'
import MenuConfiguracion from '../components/MenuConfiguracion'

export default function ConfigResources() {

    useLayoutEffect(() => {
        console.log('limpieza de estado');

    }, []);
    return (
        <div>
            <MenuConfiguracion />
        </div>
    )
}
