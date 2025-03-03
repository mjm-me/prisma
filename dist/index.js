import { PrismaClient } from '@prisma/client';
console.log('Hello, world!');
const prisma = new PrismaClient().$extends({
    result: {
        country: {
            density: {
                needs: {
                    population: true,
                    surfaceArea: true,
                },
                compute(item) {
                    return item.population / item.surfaceArea.toNumber();
                },
            },
        },
    },
});
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
export const getCountriesWithDensityByContinent = async (continent) => {
    const countries = await prisma.country.findMany({
        where: {
            continent,
        },
        select: {
            name: true,
            population: true,
            surfaceArea: true,
            density: true,
        },
    });
    console.log(countries);
    // console.log(
    //     countries.map((country) => {
    //         const density = country.population / country.surfaceArea.toNumber();
    //         return {
    //             ...country,
    //             density,
    //         };
    //     }),
    // );
};
export const getCitiesPoliticsWithPopulationGreaterThan = async (limit, continent) => {
    const cities = await prisma.city.findMany({
        select: {
            name: true,
            country: {
                select: {
                    name: true,
                    governmentForm: true,
                },
            },
        },
        where: {
            population: {
                gt: limit,
            },
            country: {
                continent,
            },
        },
    });
    console.log(cities);
};
export const getCitiesPoliticsLanguageWithPopulationGreaterThan = async (limit, continent) => {
    const cities = await prisma.city.findMany({
        select: {
            name: true,
            country: {
                select: {
                    name: true,
                    governmentForm: true,
                    countryLanguage: {
                        select: {
                            language: true,
                            isOfficial: true,
                        },
                        where: {
                            isOfficial: 'T',
                        },
                    },
                },
            },
        },
        where: {
            population: {
                gt: limit,
            },
            country: {
                continent,
            },
        },
    });
    console.log(cities);
    console.log(JSON.stringify(cities));
};
export const getWorldSurfacePopulation = async () => {
    // const world = await prisma.country.findMany({
    //     select: {
    //         surfaceArea: true,
    //         population: true,
    //     },
    // });
    // console.log(
    //     world.reduce((acc, country) => {
    //         return {
    //             surfaceArea: Prisma.Decimal.add(
    //                 acc.surfaceArea,
    //                 country.surfaceArea,
    //             ),
    //             population: acc.population + country.population,
    //         };
    //     }),
    // );
    const aggregations = await prisma.country.aggregate({
        _sum: {
            population: true,
            surfaceArea: true,
        },
        _avg: {
            population: true,
            surfaceArea: true,
        },
    });
    console.log(aggregations);
};
export const getContinentsSurfaceAndPopulation = async () => {
    // const world = await prisma.country.findMany({
    //     select: {
    //         surfaceArea: true,
    //         population: true,
    //     },
    // });
    // console.log(
    //     Object.groupBy(world, (country) => country.continent).map(
    //         (continent) => {
    //             return {
    //                 continent: continent.key,
    //                 surfaceArea: continent.values.reduce(
    //                     (acc, country) => acc + country.surfaceArea.toNumber(),
    //                     0,
    //                 ),
    //                 population: continent.values.reduce(
    //                     (acc, country) => acc + country.population,
    //                     0,
    //                 ),
    //             };
    // );
    const groupUsers = await prisma.country.groupBy({
        by: ['continent'],
        _sum: {
            population: true,
            surfaceArea: true,
        },
        _avg: {
            population: true,
            surfaceArea: true,
        },
    });
    console.log(groupUsers);
};
// getCountries();
// getCountriesByContinents('Europe');
// getCitiesByCountryCode('ESP');
// getCitiesFromContinentWithCountryName('Europe');
// getCitiesWithPopulationGreaterThan(9_000_000);
// Listado de países de un continente con su nombre, población extensión y densidad
// getCountriesWithDensityByContinent('Europe');
// Nombre de la ciudad, país y su forma de gobierno
// de las ciudades de más de x habitantes de z continente
// getCitiesPoliticsWithPopulationGreaterThan(3_000_000, 'Europe');
// Añadimos al anterior las lenguas oficiales del país
// getCitiesPoliticsLanguageWithPopulationGreaterThan(3_000_000, 'Europe');
// Cual es la superficie y población total del mundo
// getWorldSurfacePopulation();
// Cual es la superficie y la población de cada continente
getContinentsSurfaceAndPopulation();
