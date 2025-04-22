
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentMatch, getMatchPrediction, Match, MatchPrediction } from "@/services/footballData";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [prediction, setPrediction] = useState<MatchPrediction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const match = await getCurrentMatch();
        setCurrentMatch(match);
        
        if (match) {
          const matchPrediction = await getMatchPrediction(match.homeTeam, match.awayTeam);
          setPrediction(matchPrediction);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <MainLayout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading match data...</div>
        </div>
      ) : (
        <>
          {currentMatch && (
            <div className="mb-8">
              <div className="bg-gradient-to-r from-football-primary to-football-secondary p-6 rounded-lg text-white">
                <h1 className="text-3xl font-bold mb-4">{currentMatch.homeTeam} vs {currentMatch.awayTeam}</h1>
                <p className="text-lg">
                  {currentMatch.homeTeam} will be playing against {currentMatch.awayTeam} in the English Premier League
                </p>
                <p className="mt-2">
                  {new Date(currentMatch.date).toLocaleDateString()} at {currentMatch.time} • {currentMatch.venue}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Match Teams</CardTitle>
              </CardHeader>
              <CardContent>
                {currentMatch ? (
                  <p className="text-lg">{currentMatch.homeTeam} vs {currentMatch.awayTeam}</p>
                ) : (
                  <p>No matches currently in progress</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Winning Probability</CardTitle>
              </CardHeader>
              <CardContent>
                {prediction ? (
                  <div className="space-y-2">
                    <p>{prediction.homeTeam}: {prediction.homeWinProbability}%</p>
                    <p>Draw: {prediction.drawProbability}%</p>
                    <p>{prediction.awayTeam}: {prediction.awayWinProbability}%</p>
                  </div>
                ) : (
                  <p>No prediction available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Home;
