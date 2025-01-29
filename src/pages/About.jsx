import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const About = () => {

  const { getPackagesFacePaint, packagesFacePaint, navigate, development } = useAuth();
  const [pkFacePaint, setpkFacePaint] = useState([])
  useEffect(() => {

    const getData = async () => {

      const getPkgFacePaint = await getPackagesFacePaint()
      development && console.log('paquetes promocionales', getPkgFacePaint);
      
      setpkFacePaint(getPkgFacePaint)
    }
   
    getData()

  }, [])

  

  return (
    <section className="bg-gray-100">
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-lg">¡Llenamos de color y alegría tus eventos!</p>
      </div>

      {/* Nuestra Historia */}
      <div className="py-10 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Nuestra Historia
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Somos un equipo apasionado por el arte y la diversión. Desde hace más
          de 5 años, hemos llevado sonrisas a cientos de fiestas y eventos. Nos
          especializamos en crear diseños únicos y temáticos que convierten
          cualquier ocasión en un momento inolvidable.
        </p>
      </div>

      {/* Lo que Ofrecemos */}
      <div className="py-10 bg-white">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Lo que Ofrecemos
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

          {pkFacePaint &&
            pkFacePaint.map(pkg => (
              <div
                key={pkg.id}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-purple-600 mb-4">
                  {pkg.title}
                </h3>
                <p className="text-gray-700">
                  {pkg.descriptionFirts}
                </p>
                <button
                  onClick={() => navigate('package')}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700"
                >
                  Más información
                </button>
              </div>
            ))
          }
        </div>
      </div>

      {/* Testimonios */}
      <div className="py-10 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Testimonios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <blockquote className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">
              "¡El mejor servicio de pintacaritas! Mis hijos quedaron encantados
              con los diseños."
            </p>
            <footer className="mt-4 text-gray-600 font-bold">- Ana López</footer>
          </blockquote>
          <blockquote className="bg-gray-100 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">
              "Profesionales y muy amables. Definitivamente los volveré a
              contratar."
            </p>
            <footer className="mt-4 text-gray-600 font-bold">
              - Juan Hernández
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Contacto */}
      <div className="bg-purple-500 text-white py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para tu evento?</h2>
        <p className="text-lg mb-6">
          ¡Contáctanos y haremos de tu fiesta algo inolvidable!
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 py-2 px-6 rounded-lg text-lg font-semibold" onClick={()=> navigate('package')}>
          Reservar
        </button>
      </div>
    </section >
  );
};

export default About;
