import { $Enums, PrismaClient, Prisma } from '@prisma/client';

console.log('Hello, world!');
const prisma = new PrismaClient();

export const getCountries = async () => {
  const countries = await prisma.country.findMany();
  console.log(countries);
};

export const getCountriesByContinents = async (
  continent: $Enums.CountryContinent,
) => {
  const selectOptions: Prisma.CountrySelect = {
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

export const getCitiesByCountryCode = async (countryCode: string) => {
  
};

//await getCountries();
//await getCountriesByContinents('Europe');
//getCitiesByCountryCode('ESP')
//getCitiesFromContinentWithCountryName('Europe)