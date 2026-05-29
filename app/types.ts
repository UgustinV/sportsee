export interface HeartRate {
  min: number;
  max: number;
  average: number;
}

export interface LoginApiResponse {
  token: string;
  userId: string;
}

export interface UserProfileApi {
  firstName: string;
  lastName: string;
  createdAt: string;
  age: number;
  weight: number;
  height: number;
  profilePicture: string;
}

export interface UserInfoApiResponse {
  profile: UserProfileApi;
  statistics: {
    totalDistance: string;
    totalSessions: number;
    totalDuration: number;
  };
}

export interface ActivitySession {
  date: string;
  distance: number;
  duration: number;
  heartRate: HeartRate;
  caloriesBurned: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  weight: number;
  height: number;
  profilePicture: string;
  totalDistance: number;
  totalSessions: number;
  totalDuration: number;
}