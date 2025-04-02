// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map((movie) => movie.director);
}

const cleanDirectorsList = (moviesArray) => {
  return getAllDirectors(moviesArray).filter((el, i, arr) => arr.indexOf(el) === i);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray
    .filter((movie) => movie.director === 'Steven Spielberg')
    .filter((el) => el.genre.includes('Drama')).length | 0;
}

const round = (n) => Math.round(n * 100) / 100;

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (!moviesArray.length) return 0;
  return round(moviesArray
    .reduce((acc, el) => el.score ? acc += el.score : acc, 0) / moviesArray.length);
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const filtredMovies = moviesArray.filter(el => el.genre.includes('Drama'));
  if (!filtredMovies.length) return 0;
  return round(filtredMovies.reduce((acc, el,) => el.score ? acc += el.score : acc, 0) / filtredMovies.length);
}


// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const currentArr = [...moviesArray];

  return currentArr
    .sort((a, b) => a.title > b.title ? 1 : -1)
    .sort((a, b) => a.year - b.year);
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const currentArr = [...moviesArray];

  return currentArr
    .sort((a, b) => a.title > b.title ? 1 : -1)
    .map(el => el.title)
    .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const currentArr = [...moviesArray];

  return currentArr.map(movie => {
    const hours = parseInt(movie.duration.slice(0, movie.duration.indexOf('h'))) * 60 || 0;
    const minutes = parseInt(movie.duration.slice(movie.duration.indexOf('h') + 2, movie.duration.indexOf('m'))) || 0;
    return { ...movie, duration: hours + minutes };
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (!moviesArray.length) return null;

  // const yearScore = {};

  // moviesArray.forEach(movie => {
  //   if (!yearScore[movie.year]) yearScore[movie.year] = [];
  //   yearScore[movie.year].push(movie.score || 0);
  // });
  // console.log(yearScore)

  // let bestYear = null;
  // let bestAverage = 0;

  // for (let year in yearScore) {
  //   const average = yearScore[year].reduce((sum, score) => sum + score, 0) / yearScore[year].length
  //   if (average > bestAverage) {
  //     bestAverage = average;
  //     bestYear = year;
  //   } else if (average === bestAverage) {
  //     bestYear = Math.min(bestYear, year);
  //   }
  // }
  // console.log(bestYear, bestAverage)
  // return `The best year was ${bestYear} with an average score of ${bestAverage}`

  const years = moviesArray.reduce((acc, el) => {
    const year = el.year;
    const score = el.score;
    if (!acc[year]) acc[year] = [];
    acc[year].push(score);
    return { ...acc };
  }, {});

  const bests = Object
    .entries(years)
    .map(([year, avereges]) => {
      const average = avereges.reduce((acc, el) => acc += el, 0) / avereges.length;
      return [year, average];
    })
    .sort((a, b) => b[1] - a[1])
    .filter(([y, a], i, arr) => a === arr[0][1])
    .sort((a, b) => a[0] - b[0]);

  return `The best year was ${bests[0][0]} with an average score of ${bests[0][1]}`
}
