
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BarChart3, 
  Map as MapIcon, 
  LineChart, 
  ImageIcon, 
  Video, 
  Droplet, 
  Thermometer, 
  Wind, 
  ArrowUpRight 
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const FarmMonitoring = () => {
  const [farmName, setFarmName] = useState('Green Valley Farm');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">{farmName}</h1>
            <p className="text-muted-foreground">Farm Monitoring Dashboard</p>
          </div>
          
          <div className="flex gap-4">
            <Input
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="max-w-[240px]"
              placeholder="Farm name"
            />
            <Button variant="outline">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button>Update Sensors</Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Farm Map</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="imagery">Satellite Imagery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Summary Cards */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Farm Health</CardTitle>
                  <CardDescription>Overall farm health index</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Good</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    
                    <div className="pt-4 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Crop Health</div>
                        <div className="text-lg font-semibold">92%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Soil Quality</div>
                        <div className="text-lg font-semibold">78%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Water Usage</div>
                        <div className="text-lg font-semibold">68%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Pest Control</div>
                        <div className="text-lg font-semibold">95%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Current Conditions</CardTitle>
                  <CardDescription>Real-time environmental data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Thermometer className="h-10 w-10 text-orange-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Temperature</div>
                        <div className="text-xl font-semibold">28°C</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Droplet className="h-10 w-10 text-blue-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Humidity</div>
                        <div className="text-xl font-semibold">65%</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Wind className="h-10 w-10 text-slate-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Wind Speed</div>
                        <div className="text-xl font-semibold">8 km/h</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" size="sm">
                    View Detailed Weather
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Alerts</CardTitle>
                  <CardDescription>Recent notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-amber-100 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-md p-3">
                      <div className="font-medium text-amber-800 dark:text-amber-200">Irrigation Alert</div>
                      <div className="text-sm text-amber-700 dark:text-amber-300">Northern sector moisture levels below threshold.</div>
                      <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">2 hours ago</div>
                    </div>
                    
                    <div className="bg-green-100 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md p-3">
                      <div className="font-medium text-green-800 dark:text-green-200">Crop Status</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Wheat crop growth exceeding expectations.</div>
                      <div className="text-xs text-green-600 dark:text-green-400 mt-1">Yesterday</div>
                    </div>
                    
                    <div className="bg-blue-100 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-md p-3">
                      <div className="font-medium text-blue-800 dark:text-blue-200">Weather Alert</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Heavy rainfall expected in next 48 hours.</div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">Yesterday</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" size="sm">
                    View All Alerts
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Charts & Monitoring Sections */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Growth Trends</CardTitle>
                      <CardDescription>Crop development over time</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <LineChart className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px] flex items-center justify-center bg-muted rounded-md p-6">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground text-sm">Growth trend visualization would appear here</p>
                      <p className="text-xs text-muted-foreground mt-1">Showing crop development data from sensors</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Resource Usage</CardTitle>
                      <CardDescription>Water and fertilizer consumption</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px] flex items-center justify-center bg-muted rounded-md p-6">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground text-sm">Resource usage chart would appear here</p>
                      <p className="text-xs text-muted-foreground mt-1">Tracking water and fertilizer consumption</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Farm Map</CardTitle>
                <CardDescription>Interactive map of your farm with field boundaries and crop zones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] flex flex-col items-center justify-center bg-muted rounded-md p-6">
                  <MapIcon className="h-20 w-20 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center max-w-md">
                    An interactive map would appear here showing your farm's layout, field boundaries, crop zones, 
                    and sensor locations with real-time data overlays.
                  </p>
                  <Button className="mt-6">
                    Enable Map View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sensors">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((sensor) => (
                <Card key={sensor}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Sensor {sensor}</CardTitle>
                        <CardDescription>Field {Math.ceil(sensor/2)}, Section {(sensor % 2) + 1}</CardDescription>
                      </div>
                      <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full">
                        Active
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 pt-2">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Battery</span>
                          <span className="font-medium">{85 - (sensor * 5)}%</span>
                        </div>
                        <Progress value={85 - (sensor * 5)} className="h-1" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Signal Strength</span>
                          <span className="font-medium">{90 - (sensor * 3)}%</span>
                        </div>
                        <Progress value={90 - (sensor * 3)} className="h-1" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="bg-muted p-2 rounded-md">
                          <div className="text-xs text-muted-foreground">Temperature</div>
                          <div className="font-medium">{25 + sensor}°C</div>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <div className="text-xs text-muted-foreground">Humidity</div>
                          <div className="font-medium">{60 + (sensor * 2)}%</div>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <div className="text-xs text-muted-foreground">Soil Moisture</div>
                          <div className="font-medium">{40 + sensor}%</div>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <div className="text-xs text-muted-foreground">Light Level</div>
                          <div className="font-medium">{800 + (sensor * 100)} lux</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      View Sensor Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="imagery">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Satellite Imagery</CardTitle>
                  <CardDescription>Recent satellite images of your farm</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="h-[240px] bg-muted rounded-md flex flex-col items-center justify-center p-6">
                      <ImageIcon className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">
                        Satellite imagery would appear here showing an overhead view of your farm
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous Images</Button>
                  <Button>Update Imagery</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Drone Footage</CardTitle>
                  <CardDescription>Recent drone captures of your fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="h-[240px] bg-muted rounded-md flex flex-col items-center justify-center p-6">
                      <Video className="h-16 w-16 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground text-center">
                        Drone footage would appear here showing detailed views of your crops
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous Footage</Button>
                  <Button>Schedule Drone Flight</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FarmMonitoring;
