// Mock data for football standings
export interface TeamStanding {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
}

// Mock data for matches
export interface Match {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
}

// Mock data for predictions
export interface MatchPrediction {
  homeTeam: string;
  awayTeam: string;
  homeWinProbability: number;
  drawProbability: number;
  awayWinProbability: number;
}

// Mock function to fetch league standings
export const getLeagueStandings = (): Promise<TeamStanding[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { position: 1, team: "Manchester United", played: 38, won: 28, drawn: 5, lost: 5, points: 89 },
        { position: 2, team: "Arsenal", played: 38, won: 26, drawn: 6, lost: 6, points: 84 },
        { position: 3, team: "Liverpool", played: 38, won: 25, drawn: 7, lost: 6, points: 82 },
        { position: 4, team: "Manchester City", played: 38, won: 24, drawn: 8, lost: 6, points: 80 },
        { position: 5, team: "Chelsea", played: 38, won: 21, drawn: 10, lost: 7, points: 73 },
        { position: 6, team: "Tottenham", played: 38, won: 20, drawn: 9, lost: 9, points: 69 },
        { position: 7, team: "Newcastle", played: 38, won: 19, drawn: 7, lost: 12, points: 64 },
        { position: 8, team: "Aston Villa", played: 38, won: 18, drawn: 7, lost: 13, points: 61 },
        { position: 9, team: "West Ham", played: 38, won: 15, drawn: 8, lost: 15, points: 53 },
        { position: 10, team: "Leicester City", played: 38, won: 14, drawn: 10, lost: 14, points: 52 },
      ]);
    }, 500);
  });
};

// Mock function to fetch upcoming fixtures
export const getUpcomingFixtures = (): Promise<Match[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { homeTeam: "Manchester United", awayTeam: "Chelsea", date: "2025-04-28", time: "20:00", venue: "Old Trafford" },
        { homeTeam: "Arsenal", awayTeam: "Manchester United", date: "2025-05-04", time: "16:30", venue: "Emirates Stadium" },
        { homeTeam: "Manchester United", awayTeam: "Tottenham", date: "2025-05-11", time: "14:00", venue: "Old Trafford" },
        { homeTeam: "Liverpool", awayTeam: "Newcastle", date: "2025-04-30", time: "19:45", venue: "Anfield" },
        { homeTeam: "Chelsea", awayTeam: "Manchester City", date: "2025-05-03", time: "12:30", venue: "Stamford Bridge" },
      ]);
    }, 500);
  });
};

// Mock function to get current match
export const getCurrentMatch = (): Promise<Match> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        homeTeam: "Manchester United",
        awayTeam: "Liverpool",
        date: "2025-04-22", // Today's date
        time: "20:00",
        venue: "Old Trafford"
      });
    }, 300);
  });
};

/**
 * Fetch prediction from your custom model API.
 * 
 * @param homeTeam The name of the home team
 * @param awayTeam The name of the away team
 * @returns MatchPrediction from your model
 * 
 * Uses http://127.0.0.1:5000/predict as the API endpoint.
 */
export const getMatchPrediction = async (
  homeTeam: string,
  awayTeam: string
): Promise<MatchPrediction> => {
  const YOUR_API_ENDPOINT = "http://127.0.0.1:5000/predict";

  // Format input for your Flask API: expects an array in 'input'
  const postData = {
    input: [homeTeam, awayTeam],
  };

  const response = await fetch(YOUR_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error(`Prediction API error: ${response.status}`);
  }

  // Response shape: {prediction: [score or probabilities]}
  const data = await response.json();

  // Interpret data: change this as needed to fit your model's output
  // Here, we assume: prediction = [homeWin, draw, awayWin] as probabilities (%) for demo
  const [homeWinProbability, drawProbability, awayWinProbability] = Array.isArray(data.prediction)
    ? data.prediction
    : [0, 0, 0];

  return {
    homeTeam,
    awayTeam,
    homeWinProbability: homeWinProbability ?? 0,
    drawProbability: drawProbability ?? 0,
    awayWinProbability: awayWinProbability ?? 0,
  };
};
