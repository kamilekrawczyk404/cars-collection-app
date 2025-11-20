export enum FuelType {
  Petrol = 1,
  Diesel = 2,
  Hybrid = 3,
  LPG = 4,
}

export enum BodyType {
  Hatchback = 1,
  Sedan = 2,
  Kombi = 3,
  Suv = 4,
  Roadster = 5,
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  bodyType: BodyType;
  productionDate: string;
  carFuelConsumption: number;
}

export interface CreateCarDto extends Omit<Car, "id"> {}
