
import React, { useState, useEffect } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import { 
  CloudRain, 
  Droplets, 
  Thermometer, 
  Wind, 
  Calendar, 
  Sunrise, 
  Sunset, 
  Cloud, 
  CloudDrizzle, 
  CloudFog, 
  CloudLightning, 
  CloudSnow, 
  Sun, 
  AlertCircle 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Footer from '@/components/Footer';

interface WeatherData {
  location: string;
  currentTemp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  sunrise: string;
  sunset: string;
  forecasts: {
    date: string;
    day: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    precipitation: number;
    humidity: number;
    windSpeed: number;
  }[];
  agricultureTips: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('Pune, Maharashtra');

  useEffect(() => {
    // Simulate API call to weather service
    const fetchWeatherData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        // Mock data - in a real app, this would come from a weather API
        const mockWeatherData: WeatherData = {
          location: location,
          currentTemp: 28,
          feelsLike: 30,
          humidity: 65,
          windSpeed: 12,
          condition: 'Partly Cloudy',
          sunrise: '6:15 AM',
          sunset: '6:45 PM',
           forecasts: [
                          {
                            "date": "2025-03-28",
                            "day": "Today",
                            "maxTemp": 38,
                            "minTemp": 19,
                            "condition": "Sunny",
                            "precipitation": 5,
                            "humidity": 30,
                            "windSpeed": 10
                          },
                          {
                            "date": "2025-03-29",
                            "day": "Tomorrow",
                            "maxTemp": 39,
                            "minTemp": 19,
                            "condition": "Hazy Sun",
                            "precipitation": 5,
                            "humidity": 28,
                            "windSpeed": 12
                          },
                          {
                            "date": "2025-03-30",
                            "day": "Sun",
                            "maxTemp": 40,
                            "minTemp": 21,
                            "condition": "Hot & Sunny",
                            "precipitation": 2,
                            "humidity": 25,
                            "windSpeed": 14
                          },
                          {
                            "date": "2025-03-31",
                            "day": "Mon",
                            "maxTemp": 38,
                            "minTemp": 22,
                            "condition": "Hazy Sun",
                            "precipitation": 5,
                            "humidity": 27,
                            "windSpeed": 11
                          },
                          {
                            "date": "2025-04-01",
                            "day": "Tue",
                            "maxTemp": 39,
                            "minTemp": 23,
                            "condition": "Hot & Sunny",
                            "precipitation": 3,
                            "humidity": 24,
                            "windSpeed": 13
                          },
                          {
                            "date": "2025-04-02",
                            "day": "Wed",
                            "maxTemp": 40,
                            "minTemp": 23,
                            "condition": "Partly Cloudy with Thunderstorm",
                            "precipitation": 30,
                            "humidity": 35,
                            "windSpeed": 16
                          },
                          {
                            "date": "2025-04-03",
                            "day": "Thu",
                            "maxTemp": 34,
                            "minTemp": 21,
                            "condition": "Mostly Cloudy",
                            "precipitation": 10,
                            "humidity": 40,
                            "windSpeed": 12
                          }
                        ],

          agricultureTips: [
            {
              title: 'Irrigation Advisory',
              description: 'Expected rainfall in next 3 days. Consider skipping irrigation to avoid waterlogging. Monitor soil moisture levels.',
              icon: <Droplets className="h-6 w-6 text-blue-500" />
            },
            {
              title: 'Disease Alert',
              description: 'High humidity and moderate temperatures increase risk of fungal diseases for crops. Consider preventative fungicide application.',
              icon: <AlertCircle className="h-6 w-6 text-red-500" />
            },
            {
              title: 'Harvesting Recommendation',
              description: 'Plan harvesting before Thursday to avoid rainfall that could damage mature crops. Store harvested produce in dry conditions.',
              icon: <Calendar className="h-6 w-6 text-green-500" />
            }
          ]
        };
        
        setWeatherData(mockWeatherData);
        setIsLoading(false);
      }, 1500);
    };

    fetchWeatherData();
  }, [location]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-10 w-10 text-yellow-500" />;
      case 'partly cloudy': return <Cloud className="h-10 w-10 text-gray-500" />;
      case 'cloudy': return <Cloud className="h-10 w-10 text-gray-500" />;
      case 'rain': return <CloudRain className="h-10 w-10 text-blue-500" />;
      case 'light rain': return <CloudDrizzle className="h-10 w-10 text-blue-500" />;
      case 'heavy rain': return <CloudRain className="h-10 w-10 text-blue-500" />;
      case 'thunderstorm': return <CloudLightning className="h-10 w-10 text-purple-500" />;
      case 'snow': return <CloudSnow className="h-10 w-10 text-sky-200" />;
      case 'fog': return <CloudFog className="h-10 w-10 text-gray-400" />;
      default: return <Cloud className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardNavbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Weather & Climate</h1>
            <p className="text-muted-foreground">
              Real-time weather data and agricultural forecasting for informed farming decisions
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Main weather content */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid gap-6">
                  <Card className="h-[200px] animate-pulse bg-muted"></Card>
                  <Card className="h-[300px] animate-pulse bg-muted"></Card>
                </div>
              ) : weatherData ? (
                <>
                  {/* Current Weather Card */}
                  <Card className="mb-6">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{weatherData.location}</CardTitle>
                          <CardDescription>Current Weather Conditions</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => toast.info("Location detection would be integrated here")}>
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                            <path d="M7.5 0C3.91 0 1 2.91 1 6.5C1 10.09 3.91 13 7.5 13C11.09 13 14 10.09 14 6.5C14 2.91 11.09 0 7.5 0ZM7.5 11.5C4.74 11.5 2.5 9.26 2.5 6.5C2.5 3.74 4.74 1.5 7.5 1.5C10.26 1.5 12.5 3.74 12.5 6.5C12.5 9.26 10.26 11.5 7.5 11.5Z" fill="currentColor"/>
                            <path d="M7.5 3C8.33 3 9 3.67 9 4.5H10.5C10.5 2.84 9.16 1.5 7.5 1.5V3Z" fill="currentColor"/>
                          </svg>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                          {getWeatherIcon(weatherData.condition)}
                          <div>
                            <div className="text-4xl font-bold">{weatherData.currentTemp}°C</div>
                            <div className="text-muted-foreground">{weatherData.condition}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                            <Thermometer className="h-6 w-6 mb-1 text-orange-500" />
                            <span className="text-sm text-muted-foreground">Feels Like</span>
                            <span className="font-medium">{weatherData.feelsLike}°C</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                            <Droplets className="h-6 w-6 mb-1 text-blue-500" />
                            <span className="text-sm text-muted-foreground">Humidity</span>
                            <span className="font-medium">{weatherData.humidity}%</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                            <Wind className="h-6 w-6 mb-1 text-teal-500" />
                            <span className="text-sm text-muted-foreground">Wind</span>
                            <span className="font-medium">{weatherData.windSpeed} km/h</span>
                          </div>
                          <div className="flex flex-col items-center p-2 bg-muted rounded-lg">
                            <div className="flex gap-2">
                              <Sunrise className="h-5 w-5 text-yellow-500" />
                              <Sunset className="h-5 w-5 text-orange-500" />
                            </div>
                            <span className="text-sm text-muted-foreground mt-1">Sun</span>
                            <span className="font-medium text-xs">{weatherData.sunrise} / {weatherData.sunset}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weather Forecast */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>7-Day Forecast</CardTitle>
                      <CardDescription>Weather prediction for the upcoming week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <div className="min-w-[800px]">
                          <div className="grid grid-cols-7 gap-4">
                            {weatherData.forecasts.map((forecast, index) => (
                              <div key={index} className="flex flex-col items-center p-3 border rounded-lg">
                                <div className="font-medium mb-2">{forecast.day}</div>
                                {getWeatherIcon(forecast.condition)}
                                <div className="mt-2 text-sm text-center">{forecast.condition}</div>
                                <div className="mt-2 flex items-center gap-2">
                                  <span className="font-medium">{forecast.maxTemp}°</span>
                                  <span className="text-muted-foreground">{forecast.minTemp}°</span>
                                </div>
                                <div className="mt-3 w-full">
                                  <div className="flex items-center justify-between mb-1">
                                    <Droplets className="h-3 w-3 text-blue-500" />
                                    <span className="text-xs">{forecast.precipitation}%</span>
                                  </div>
                                  <Progress value={forecast.precipitation} className="h-1" />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Agriculture Weather Impact */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Agriculture Weather Implications</CardTitle>
                      <CardDescription>
                        Weather-based recommendations for your farming activities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {weatherData.agricultureTips.map((tip, index) => (
                          <div key={index} className="bg-muted rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-3">
                              {tip.icon}
                              <h3 className="font-medium">{tip.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">{tip.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => toast.info("AI-powered personalized recommendations would be shown here")}>
                        Get Personalized Recommendations
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <AlertCircle className="h-10 w-10 text-destructive mb-4" />
                    <h3 className="text-xl font-medium mb-2">Weather Data Unavailable</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      We're unable to retrieve weather data at the moment.
                    </p>
                    <Button onClick={() => window.location.reload()}>
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Sidebar content */}
            <aside className="w-full md:w-[350px]">
              <Tabs defaultValue="alerts">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="alerts" className="flex-1">Alerts</TabsTrigger>
                  <TabsTrigger value="insights" className="flex-1">Insights</TabsTrigger>
                </TabsList>
                
                <TabsContent value="alerts">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Weather Alerts</CardTitle>
                      <CardDescription>Critical weather notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                      <div className="space-y-3">
                        {!isLoading ? (
                          <>
                            <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30 rounded-r-lg">
                              <CloudRain className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-medium">Heavy Rain Expected</p>
                                <p className="text-sm text-muted-foreground">
                                  90% chance of heavy rainfall on Thursday. Consider protective measures for crops.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30 rounded-r-lg">
                              <Wind className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-medium">Strong Winds</p>
                                <p className="text-sm text-muted-foreground">
                                  Wind speeds may reach 20-25 km/h on Thursday. Secure structures and young plants.
                                </p>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
                            <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
                          </>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full">View All Alerts</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="insights">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Seasonal Outlook</CardTitle>
                      <CardDescription>Long-term climate predictions</CardDescription>
                    </CardHeader>
                    <CardContent className="px-2">
                      {!isLoading ? (
                        <div className="space-y-4">
                          <div className="p-3 bg-muted rounded-lg">
                            <h4 className="font-medium mb-1">Temperature Trend</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Temperatures expected to remain 2-3°C above normal for the next month
                            </p>
                            <div className="h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-red-500 w-3/4"></div>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-muted rounded-lg">
                            <h4 className="font-medium mb-1">Monsoon Prediction</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Normal to above-normal rainfall expected during the upcoming monsoon season
                            </p>
                            <div className="h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-2/3"></div>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-muted rounded-lg">
                            <h4 className="font-medium mb-1">Soil Moisture</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              Current moisture levels adequate, may increase with upcoming rainfall
                            </p>
                            <div className="h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 w-1/2"></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="h-20 bg-muted animate-pulse rounded-lg mb-4"></div>
                          <div className="h-20 bg-muted animate-pulse rounded-lg"></div>
                        </>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="w-full">View Detailed Outlook</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </aside>
          </div>
        </div>
      </main>
      
      
    </div>
  );
};

export default Weather;
