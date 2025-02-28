import { PrismaClient } from '@prisma/client';
console.log('Hello, world!');
const prisma = new PrismaClient();
export const getCountries = async () => {
    const countries = await prisma.country.findMany();
    console.log(countries);
};
export const getCountriesByContinents = async (continent) => {
    const selectOptions = {
        code: true,
        name: true,
        capital: true,
    };
    const countries = await prisma.country.findMany({
        where: {
            continent: continent,
        },
        select: selectOptions,
    });
    console.log(countries);
};
export const getCitiesByCountryCode = async (countryCode) => {
};
//await getCountries();
//await getCountriesByContinents('Europe');
//getCitiesByCountryCode('ESP')
//getCitiesFromContinentWithCountryName('Europe)
