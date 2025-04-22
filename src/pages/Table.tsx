
import { useEffect, useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeagueStandings, TeamStanding } from "@/services/footballData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TablePage = () => {
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState<TeamStanding[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getLeagueStandings();
        setStandings(data);
      } catch (error) {
        console.error("Error fetching standings:", error);
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
          <CardTitle className="text-3xl">Premier League Table</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl">Loading table data...</div>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-football-primary text-white">
                <TableRow>
                  <TableHead className="text-white">Position</TableHead>
                  <TableHead className="text-white">Team</TableHead>
                  <TableHead className="text-white">Played</TableHead>
                  <TableHead className="text-white">Won</TableHead>
                  <TableHead className="text-white">Drawn</TableHead>
                  <TableHead className="text-white">Lost</TableHead>
                  <TableHead className="text-white">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {standings.map((team) => (
                  <TableRow key={team.position}>
                    <TableCell>{team.position}</TableCell>
                    <TableCell className="font-medium">{team.team}</TableCell>
                    <TableCell>{team.played}</TableCell>
                    <TableCell>{team.won}</TableCell>
                    <TableCell>{team.drawn}</TableCell>
                    <TableCell>{team.lost}</TableCell>
                    <TableCell className="font-bold">{team.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default TablePage;
