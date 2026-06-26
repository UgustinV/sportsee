import type {
    LoginApiResponse,
    UserInfoApiResponse,
    ActivitySession,
    User,
} from "~/types";

const rawRunningData: ActivitySession[] = [
    { date: "2025-01-04", distance: 5.8,  duration: 38, heartRate: { min: 140, max: 178, average: 163 }, caloriesBurned: 422 },
    { date: "2025-01-05", distance: 3.2,  duration: 20, heartRate: { min: 148, max: 184, average: 171 }, caloriesBurned: 248 },
    { date: "2025-01-09", distance: 6.4,  duration: 42, heartRate: { min: 140, max: 176, average: 163 }, caloriesBurned: 468 },
    { date: "2025-01-12", distance: 7.5,  duration: 50, heartRate: { min: 138, max: 178, average: 162 }, caloriesBurned: 532 },
    { date: "2025-01-19", distance: 5.1,  duration: 34, heartRate: { min: 141, max: 177, average: 165 }, caloriesBurned: 378 },
    { date: "2025-01-25", distance: 4.8,  duration: 32, heartRate: { min: 143, max: 179, average: 166 }, caloriesBurned: 352 },
    { date: "2025-01-26", distance: 3.5,  duration: 22, heartRate: { min: 146, max: 183, average: 170 }, caloriesBurned: 265 },
    { date: "2025-02-02", distance: 6.2,  duration: 40, heartRate: { min: 142, max: 177, average: 164 }, caloriesBurned: 455 },
    { date: "2025-02-05", distance: 8.0,  duration: 52, heartRate: { min: 140, max: 178, average: 162 }, caloriesBurned: 565 },
    { date: "2025-02-08", distance: 4.5,  duration: 30, heartRate: { min: 144, max: 180, average: 167 }, caloriesBurned: 335 },
    { date: "2025-02-15", distance: 9.2,  duration: 62, heartRate: { min: 138, max: 179, average: 161 }, caloriesBurned: 645 },
    { date: "2025-02-22", distance: 5.5,  duration: 36, heartRate: { min: 142, max: 178, average: 165 }, caloriesBurned: 398 },
    { date: "2025-02-23", distance: 3.8,  duration: 25, heartRate: { min: 145, max: 182, average: 168 }, caloriesBurned: 285 },
    { date: "2025-03-01", distance: 7.8,  duration: 50, heartRate: { min: 140, max: 178, average: 162 }, caloriesBurned: 545 },
    { date: "2025-03-02", distance: 4.0,  duration: 26, heartRate: { min: 144, max: 180, average: 167 }, caloriesBurned: 298 },
    { date: "2025-03-05", distance: 3.6,  duration: 24, heartRate: { min: 145, max: 182, average: 169 }, caloriesBurned: 275 },
    { date: "2025-03-09", distance: 10.5, duration: 68, heartRate: { min: 136, max: 179, average: 159 }, caloriesBurned: 720 },
    { date: "2025-03-15", distance: 6.8,  duration: 44, heartRate: { min: 141, max: 178, average: 163 }, caloriesBurned: 485 },
    { date: "2025-03-16", distance: 4.2,  duration: 28, heartRate: { min: 143, max: 179, average: 166 }, caloriesBurned: 320 },
    { date: "2025-03-22", distance: 5.3,  duration: 34, heartRate: { min: 142, max: 178, average: 165 }, caloriesBurned: 382 },
    { date: "2025-03-27", distance: 11.0, duration: 72, heartRate: { min: 135, max: 179, average: 158 }, caloriesBurned: 755 },
    { date: "2025-03-29", distance: 4.7,  duration: 30, heartRate: { min: 144, max: 180, average: 167 }, caloriesBurned: 338 },
    { date: "2025-03-30", distance: 6.0,  duration: 38, heartRate: { min: 142, max: 179, average: 164 }, caloriesBurned: 425 },
    { date: "2025-04-06", distance: 7.2,  duration: 46, heartRate: { min: 139, max: 179, average: 163 }, caloriesBurned: 495 },
    { date: "2025-04-10", distance: 5.5,  duration: 36, heartRate: { min: 141, max: 179, average: 165 }, caloriesBurned: 390 },
    { date: "2025-04-13", distance: 9.8,  duration: 65, heartRate: { min: 138, max: 180, average: 161 }, caloriesBurned: 680 },
    { date: "2025-04-20", distance: 4.5,  duration: 30, heartRate: { min: 143, max: 180, average: 167 }, caloriesBurned: 328 },
    { date: "2025-04-27", distance: 6.7,  duration: 43, heartRate: { min: 141, max: 178, average: 163 }, caloriesBurned: 472 },
    { date: "2025-05-01", distance: 5.0,  duration: 32, heartRate: { min: 143, max: 179, average: 166 }, caloriesBurned: 358 },
    { date: "2025-05-04", distance: 8.3,  duration: 54, heartRate: { min: 139, max: 179, average: 162 }, caloriesBurned: 578 },
    { date: "2025-05-11", distance: 10.2, duration: 68, heartRate: { min: 137, max: 180, average: 160 }, caloriesBurned: 705 },
    { date: "2025-05-18", distance: 7.0,  duration: 45, heartRate: { min: 140, max: 178, average: 163 }, caloriesBurned: 490 },
    { date: "2025-05-24", distance: 5.2,  duration: 34, heartRate: { min: 142, max: 178, average: 165 }, caloriesBurned: 370 },
    { date: "2025-05-29", distance: 6.5,  duration: 42, heartRate: { min: 141, max: 178, average: 164 }, caloriesBurned: 460 },
];

export const mockLoginResponse: LoginApiResponse = {
    token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyMTIzIiwiaWF0IjoxNzc5OTg3MjQ5LCJleHAiOjE3ODAwNzM2NDl9.ThWFW4xCuhGhBR5DnRZ6NJyf00ITgR1WwId4Ym-VRWs",
    userId: "user123",
};

export const mockUserInfoResponse: UserInfoApiResponse = {
    profile: {
        firstName: "Sophie",
        lastName: "Martin",
        createdAt: "2025-01-01",
        age: 32,
        gender: "female",
        weight: 60,
        height: 165,
        profilePicture: "http://localhost:8000/images/sophie.jpg",
    },
    statistics: {
        totalDistance: rawRunningData
        .reduce((sum, s) => sum + s.distance, 0)
        .toFixed(1),
        totalSessions: rawRunningData.length,
        totalDuration: rawRunningData.reduce((sum, s) => sum + s.duration, 0),
    },
};

export const mockActivityResponse: ActivitySession[] = rawRunningData.filter(
    (session) => {
        const d = new Date(session.date);
        return d >= new Date("2025-05-18") && d <= new Date("2025-05-29");
    }
);

export function normalizeUser(userId: string, raw: UserInfoApiResponse): User {
    return {
        id: userId,
        firstName: raw.profile.firstName,
        lastName: raw.profile.lastName,
        age: raw.profile.age,
        gender: raw.profile.gender,
        weight: raw.profile.weight,
        height: raw.profile.height,
        profilePicture: raw.profile.profilePicture,
        createdAt: raw.profile.createdAt,
        totalDistance: parseFloat(raw.statistics.totalDistance),
        totalSessions: raw.statistics.totalSessions,
        totalDuration: raw.statistics.totalDuration,
    };
}

export const mockUser: User = normalizeUser("user123", mockUserInfoResponse);
export const mockActivity: ActivitySession[] = mockActivityResponse;