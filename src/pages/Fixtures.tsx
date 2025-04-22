
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUpcomingFixtures, Match } from "@/services/footballData";

const Fixtures = () => {
  const [loading, setLoading] = useState(true);
  const [fixtures, setFixtures] = useState<Match[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUpcomingFixtures();
        setFixtures(data);
      } catch (error) {
        console.error("Error fetching fixtures:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <MainLayout>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Matchweek</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Matchweek 25</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Matches</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-xl">Loading fixtures...</div>
            </div>
          ) : (
            <ul className="space-y-4">
              {fixtures.map((match, index) => (
                <li 
                  key={index} 
                  className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{match.homeTeam} vs {match.awayTeam}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(match.date).toLocaleDateString()} at {match.time}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {match.venue}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Fixtures;
