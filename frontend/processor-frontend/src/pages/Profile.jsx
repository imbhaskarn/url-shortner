import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
} from "../components/ui/CardComponents2";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/label";
import { Avatar } from "../components/ui/AvatarComponents";
import { Badge } from "../components/ui/Badge";
import { Skeleton } from "../components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LogOut, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { fetchUser } from "../services/api";

export const SkeletonDemo = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>

      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[250px]" />
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const ProfilePage = ({ userRole }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchUser();
        setUserData(response);
        setError(null);
      } catch (err) {
        setError("Failed to load profile data");
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Error Loading Profile</h3>
        <p className="text-sm  mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw className="mr-2 h-4 w-4" /> Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
              <div className="flex space-x-2">
                <Skeleton className="h-10 w-[100px]" />
                <Skeleton className="h-10 w-[100px]" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <img
                    src={
                      userData?.userData?.profileImage ||
                      `https://ui-avatars.com/api/?name=${userData?.userData?.firstName}+${userData?.userData?.lastName}`
                    }
                    alt="Profile"
                    className="h-16 w-16 rounded-full"
                  />
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">
                    {userData?.userData?.firstName}{" "}
                    {userData?.userData?.lastName}
                  </h2>
                  <p className="">{userData?.userData?.jobTitle}</p>
                  <Badge className="bg-purple-500 text-white">{userRole}</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button>Edit Profile</Button>
                <Button variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={userData?.userData?.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Names</Label>
                    <Input value={userData?.userData?.fullName} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <Input value={userData?.userData?.organization} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Date Joined</Label>
                    <Input
                      value={
                        userData?.userData?.dateJoined
                          ? new Date(
                              userData?.userData?.dateJoined
                            ).toLocaleDateString()
                          : "N/A"
                      }
                      disabled
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {userData?.loginActivities?.map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm ">
                          {new Date(activity.date).toLocaleString()}
                        </p>
                      </div>
                      <Badge variant="outline">{activity.ip}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="performance">
              {isLoading ? (
                <Skeleton className="h-[300px] w-full" />
              ) : (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData?.performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#8884d8" />
                      <Bar dataKey="leads" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
