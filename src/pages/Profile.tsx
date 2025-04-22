
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogOut, User, Settings } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    
    // Simulate logout process
    setTimeout(() => {
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    }, 500);
  };

  return (
    <MainLayout>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4 mb-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-football-secondary text-white text-xl">
                  <User size={32} />
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" defaultValue="john.doe@example.com" />
              </div>
              <Button className="w-full bg-football-primary hover:bg-football-secondary">
                <Settings className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Favorite Team</h3>
              <div className="flex space-x-2">
                <Input id="favorite-team" defaultValue="Manchester United" />
                <Button variant="outline">Save</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Notification Preferences</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notify-matches" defaultChecked />
                  <label htmlFor="notify-matches">Match updates</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notify-transfers" defaultChecked />
                  <label htmlFor="notify-transfers">Transfer news</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notify-predictions" defaultChecked />
                  <label htmlFor="notify-predictions">Prediction alerts</label>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleLogout}
                disabled={loading}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
