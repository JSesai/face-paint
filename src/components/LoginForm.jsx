import React from 'react';
import useForm from "../hooks/useForm"
import { Link } from 'react-router-dom';

export default function LoginForm({handleSubmit}) {

    const { email, password, onInputValue } = useForm({ email: '', password: '' });

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(email, password);
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white m-2 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Iniciar Sesión</h2>


                <form onSubmit={ e => onSubmit(e)} >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={ onInputValue }
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={ onInputValue }
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/olvide-password" className="text-sm text-purple-600 hover:text-purple-800">¿Olvidaste tu contraseña?</Link>
                    <p className="mt-2 text-sm text-gray-600">¿No tienes cuenta? <Link to="/registrar" className="text-purple-600 hover:text-purple-800">Regístrate</Link></p>
                </div>
            </div>
        </div>
    );
}
