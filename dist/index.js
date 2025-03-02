import { PrismaClient } from '@prisma/client';
console.log('Hello, world!');
const prisma = new PrismaClient();
export const getCountries = async () => {
    const countries = await prisma.country.findMany();
    console.log(countries);
};
const selectOptions = {
    code: true,
    name: true,
    capital: true,
};
export const getCountriesByContinents = async (continent) => {
    const countries = await prisma.country.findMany({
        where: {
            continent: continent,
        },
        select: selectOptions,
    });
    console.log(countries);
};
const omitOptions = {
    id: true,
    countryCode: true,
};
export const getCitiesByCountryCode = async (countryCode) => {
    const cities = await prisma.city.findMany({
        where: { countryCode },
        omit: omitOptions,
    });
    console.log(cities);
};
export const getCitiesFromContinentWithCountryName = async (continent) => {
    const cities = await prisma.city.findMany({
        omit: omitOptions,
        include: {
            country: {
                select: {
                    name: true,
                },
            },
        },
        where: {
            country: {
                continent,
            },
        },
    });
    console.log(cities);
};
export const getCitiesWithPopulationGreaterThan = async (limit) => {
    const cities = await prisma.city.findMany({
        omit: omitOptions,
        where: {
            population: {
                gt: limit,
            },
        },
    });
    console.log(cities);
};
// await getCountries();
// await getCountriesByContinents('Europe');
// await getCitiesByCountryCode('ESP');
//await getCitiesFromContinentWithCountryName('Europe');
//getCitiesWithPopulationGreaterThan(9_000_000);
// EXERCISE 1 -- Listar todos los países con su población y su extensión, incluyendo los correspondientes alias adecuados en español
export const getCountriesWithPopulationAndExtension = async () => {
    try {
        // Consultar países con población y extensión
        const countries = await prisma.country.findMany({
            select: {
                name: true, // Nombre del país
                population: true, // Población
                surfaceArea: true, // Superficie
            },
        });
        // Transformar los resultados con alias en español
        const result = countries.map((country) => ({
            Nombre: country.name,
            Población: country.population,
            Superficie: country.surfaceArea,
        }));
        console.log(result);
        return result; // Devolver los resultados si se necesitan en otro lugar
    }
    catch (error) {
        console.error('Error al obtener los países:', error);
        throw error; // Propagar el error si es necesario manejarlo más adelante
    }
    finally {
        await prisma.$disconnect();
    }
};
//await getCountriesWithPopulationAndExtension();
//EXERCISE 2 -- Añadir un elemento calculado: la densidad
export const getCountriesWithDensity = async () => {
    try {
        // Consulta países con población y superficie
        const countries = await prisma.country.findMany({
            select: {
                name: true, // Nombre del país
                population: true, // Población
                surfaceArea: true, // Superficie
            },
        });
        // Calcular la densidad para cada país
        const result = countries.map((country) => ({
            Country: country.name,
            Population: country.population,
            Surface: country.surfaceArea,
            Density: country.population / country.surfaceArea || 0, // Evitar división por 0
        }));
        console.log(result);
        return result; // Devuelve los resultados con densidad incluida
    }
    catch (error) {
        console.error('Error al calcular la densidad:', error);
        throw error; // Propagar el error si es necesario
    }
    finally {
        await prisma.$disconnect();
    }
};
//await getCountriesWithDensity();
//EXERCISE 3 -- Listar los 10 primeros países
export const getTop10Countries = async () => {
    try {
        // Consultar los 10 primeros países
        const countries = await prisma.country.findMany({
            take: 10, // Limitar a los primeros 10 países
            orderBy: {
                name: 'asc', // Orden alfabético ascendente
            },
            select: {
                name: true, // Nombre del país
                population: true, // Población
                surfaceArea: true, // Superficie
            },
        });
        console.log(countries); // Mostrar los resultados en consola
        return countries; // Devolver los datos si los necesitas en otra parte
    }
    catch (error) {
        console.error('Error al obtener los países:', error);
        throw error; // Manejar errores si es necesario
    }
    finally {
        await prisma.$disconnect();
    }
};
//await getTop10Countries();
//EXERCISE 4 -- Listar los países entre el 10 y el 20
export const getCountriesFrom10To20 = async () => {
    try {
        // Consultar los países del 10 al 20
        const countries = await prisma.country.findMany({
            skip: 10, // Saltar los primeros 10 países
            take: 10, // Obtener los siguientes 10 países
            orderBy: {
                name: 'asc', // Ordenar alfabéticamente (puedes cambiar esto si es necesario)
            },
            select: {
                name: true, // Nombre del país
                population: true, // Población
                surfaceArea: true, // Superficie
            },
        });
        console.log(countries); // Mostrar los resultados en consola
        return countries; // Devolver los resultados si son necesarios en otro lugar
    }
    catch (error) {
        console.error('Error al obtener los países:', error);
        throw error; // Manejar errores si es necesario
    }
    finally {
        await prisma.$disconnect();
    }
};
//await getCountriesFrom10To20();
