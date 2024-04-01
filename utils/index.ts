export async function fetchCars() {
  const headers = {
    "X-RapidAPI-Key": "445c624435msh4060bd4e28ac201p1fdfafjsnef848760ce4f",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  const response = await fetch(
    "https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla",
    { headers: headers }
  );

  const result = await response.json();

  return result;
}
