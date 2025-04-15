export const locationData = {
  Argentina: ['Buenos Aires', 'Córdoba', 'Mendoza', 'San Juan', 'Rosario', 'La Plata', 'Tucumán', 'Mar del Plata', 'Salta', 'Santa Fe'],
  Chile: ['Santiago', 'Valparaíso', 'Concepción', 'La Serena', 'Antofagasta', 'Temuco', 'Rancagua', 'Iquique', 'Puerto Montt'],
  México: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'León', 'Juárez', 'Cancún', 'Mérida'],
  España: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Bilbao'],
};

export type CountryType = keyof typeof locationData; 