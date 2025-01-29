import React from 'react'
import useAuth from "../hooks/useAuth";
// import { demoConditions as termsConditions } from "../data/paramMajo";


export default function TermsAndConditions() {
    const { navigate, paramValuesFacePaint } = useAuth();
    
    const { termsConditions } = paramValuesFacePaint;
    return (
        <div className="container mx-auto p-4 max-w-3xl">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Términos y Condiciones
          </h1>
          {/* <p className="text-sm text-gray-600 mb-4 text-center">
            Última actualización: {terms.lastUpdated}
          </p> */}
          <div className="space-y-6">
            {termsConditions && termsConditions.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 border overflow-hidden"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  {section.title}
                </h2>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 break-words whitespace-normal">
                  {section.content.map((paragraph, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {paragraph}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
}
