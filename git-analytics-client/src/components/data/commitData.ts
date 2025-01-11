// Merge data for same users with different emails
export const mergedData = {
    "Pratyush Chaudhary": {
        insertions: 78404 + 20293 + 732 + 1, // Updated (78404 + 20293 + 732 + 1)
        deletions: 48531 + 542 + 383 + 0, // Updated (48531 + 542 + 383 + 0)
        files: 1158 + 151 + 49 + 1, // Updated (1158 + 151 + 49 + 1)
        commits: 124 + 10 + 22 + 1, // Updated (124 + 10 + 22 + 1)
        emails: [
            "160696121+plux-coder@users.noreply.github.com",
            "160696121+pratyush-chaudhary@users.noreply.github.com",
            "pratyushkc232@gmail.com"
        ],
        firstCommit: "2024-03-30", // Same
        lastCommit: "2025-01-10", // Updated
        monthlyCommits: {
            "2024-03": 1 + 8, // Updated
            "2024-04": 15 + 4, // updated
            "2024-05": 21 + 2, // Updated
            "2024-06": 18 + 4, // updated
            "2024-07": 12, // same
            "2024-08": 16, // same
            "2024-09": 14, // same
            "2024-10": 10, // same
            "2024-11": 15, // same
            "2024-12": 17, // Updated
            "2025-01": 10
        }
    },
    "Deepak Guneja": {
        insertions: 10324 + 7813 + 2470, // updated
        deletions: 2488 + 1335 + 31, // updated
        files: 235 + 152 + 26, // updated
        commits: 34 + 11 + 6, // updated
        emails: [
            "deepakguneja@gmail.com",
            "deepak.guneja@plux.ai",
            "deepakguneja97@gmail.com"
        ],
        firstCommit: "2024-04-24", // Same
        lastCommit: "2025-01-10", // updated
        monthlyCommits: {
            "2024-04": 5 + 2, // updated
            "2024-05": 8 + 1, // updated
            "2024-06": 6 + 2, // updated
            "2024-07": 4 + 5, // updated
            "2024-08": 5 + 3, // updated
            "2024-09": 4 + 2, // updated
            "2024-10": 4 + 2, // updated
            "2024-11": 4 + 3, // updated
            "2024-12": 4 + 4, // updated
            "2025-01": 4
        }
    },
    "Himanshu Kumar": {
        insertions: 6091, // Same
        deletions: 1396, // Same
        files: 237, // Same
        commits: 44, // Same
        emails: ["himanshu.kumar@plux.ai"],
        firstCommit: "2024-06-03", // Same
        lastCommit: "2024-07-23", // Same
        monthlyCommits: {
            "2024-06": 24, // Same
            "2024-07": 20 // Same
        }
    },
    "Deepak Gupta": {
        insertions: 18202, // Same
        deletions: 5615, // Same
        files: 388, // Same
        commits: 52, // Same
        emails: ["deepakguptaplux@gmail.com"],
        firstCommit: "2024-05-29", // Same
        lastCommit: "2024-08-16", // Same
        monthlyCommits: {
            "2024-05": 10, // Same
            "2024-06": 15, // Same
            "2024-07": 15, // Same
            "2024-08": 12 // Same
        }
    },
    "Rakshit Sakhuja": {
        insertions: 2282, // Updated
        deletions: 688, // Updated
        files: 41, // Updated
        commits: 9, // Updated
        emails: ["rakshitsakhuja.plux@gmail.com"],
        firstCommit: "2024-12-26", // Same
        lastCommit: "2025-01-08", // Updated
        monthlyCommits: {
            "2024-12": 6, // Updated
            "2025-01": 3
        }
    }
};

export const commitsByWeekday = [
    { label: 'Mon', value: 48 },
    { label: 'Tue', value: 59 },
    { label: 'Wed', value: 61 },
    { label: 'Thu', value: 31 },
    { label: 'Fri', value: 49 },
    { label: 'Sat', value: 37 },
    { label: 'Sun', value: 28 },
];

export const commitsByHour = [
    { label: '00', value: 14 },
    { label: '01', value: 7 },
    { label: '02', value: 17 },
    { label: '03', value: 10 },
    { label: '04', value: 4 },
    { label: '05', value: 3 },
    { label: '06', value: 4 },
    { label: '07', value: 4 },
    { label: '08', value: 7 },
    { label: '09', value: 6 },
    { label: '10', value: 5 },
    { label: '11', value: 11 },
    { label: '12', value: 14 },
    { label: '13', value: 14 },
    { label: '14', value: 15 },
    { label: '15', value: 15 },
    { label: '16', value: 22 },
    { label: '17', value: 22 },
    { label: '18', value: 20 },
    { label: '19', value: 15 },
    { label: '20', value: 24 },
    { label: '21', value: 19 },
    { label: '22', value: 16 },
    { label: '23', value: 25 },
];

export const commitsPerDate = [
    { date: '2024-03-30', count: 1 },
    { date: '2024-03-31', count: 2 },
    { date: '2024-04-03', count: 1 },
    { date: '2024-04-09', count: 1 },
    { date: '2024-04-13', count: 1 },
    { date: '2024-04-20', count: 1 },
    { date: '2024-04-24', count: 3 },
    { date: '2024-04-25', count: 1 },
    { date: '2024-04-28', count: 1 },
    { date: '2024-04-29', count: 2 },
    { date: '2024-05-03', count: 3 },
    { date: '2024-05-04', count: 1 },
    { date: '2024-05-05', count: 3 },
    { date: '2024-05-06', count: 5 },
    { date: '2024-05-07', count: 1 },
    { date: '2024-05-08', count: 5 },
    { date: '2024-05-10', count: 1 },
    { date: '2024-05-11', count: 4 },
    { date: '2024-05-12', count: 6 },
    { date: '2024-05-17', count: 1 },
    { date: '2024-05-18', count: 3 },
    { date: '2024-05-19', count: 2 },
    { date: '2024-05-21', count: 1 },
    { date: '2024-05-22', count: 2 },
    { date: '2024-05-29', count: 2 },
    { date: '2024-05-30', count: 1 },
    { date: '2024-05-31', count: 3 },
    { date: '2024-06-03', count: 4 },
    { date: '2024-06-04', count: 12 },
    { date: '2024-06-05', count: 4 },
    { date: '2024-06-06', count: 1 },
    { date: '2024-06-07', count: 1 },
    { date: '2024-06-08', count: 2 },
    { date: '2024-06-09', count: 6 },
    { date: '2024-06-10', count: 7 },
    { date: '2024-06-13', count: 2 },
    { date: '2024-06-14', count: 4 },
    { date: '2024-06-15', count: 1 },
    { date: '2024-06-16', count: 1 },
    { date: '2024-06-17', count: 4 },
    { date: '2024-06-18', count: 3 },
    { date: '2024-06-19', count: 4 },
    { date: '2024-06-20', count: 2 },
    { date: '2024-06-21', count: 7 },
    { date: '2024-06-22', count: 2 },
    { date: '2024-06-24', count: 3 },
    { date: '2024-06-25', count: 4 },
    { date: '2024-06-26', count: 8 },
    { date: '2024-06-27', count: 8 },
    { date: '2024-06-28', count: 2 },
    { date: '2024-06-29', count: 2 },
    { date: '2024-06-30', count: 2 },
    { date: '2024-07-01', count: 3 },
    { date: '2024-07-02', count: 3 },
    { date: '2024-07-03', count: 1 },
    { date: '2024-07-04', count: 2 },
    { date: '2024-07-05', count: 1 },
    { date: '2024-07-06', count: 2 },
    { date: '2024-07-08', count: 1 },
    { date: '2024-07-10', count: 1 },
    { date: '2024-07-12', count: 1 },
    { date: '2024-07-13', count: 7 },
    { date: '2024-07-14', count: 1 },
    { date: '2024-07-16', count: 5 },
    { date: '2024-07-17', count: 2 },
    { date: '2024-07-19', count: 3 },
    { date: '2024-07-20', count: 2 },
    { date: '2024-07-23', count: 5 },
    { date: '2024-07-29', count: 2 },
    { date: '2024-07-31', count: 1 },
    { date: '2024-08-01', count: 3 },
    { date: '2024-08-04', count: 2 },
    { date: '2024-08-05', count: 3 },
    { date: '2024-08-06', count: 7 },
    { date: '2024-08-07', count: 3 },
    { date: '2024-08-08', count: 2 },
    { date: '2024-08-09', count: 1 },
    { date: '2024-08-12', count: 2 },
    { date: '2024-08-14', count: 1 },
    { date: '2024-08-15', count: 1 },
    { date: '2024-08-16', count: 3 },
    { date: '2024-08-23', count: 2 },
    { date: '2024-08-27', count: 4 },
    { date: '2024-08-28', count: 2 },
    { date: '2024-09-02', count: 1 },
    { date: '2024-09-03', count: 1 },
    { date: '2024-09-04', count: 1 },
    { date: '2024-09-05', count: 1 },
    { date: '2024-09-06', count: 1 },
    { date: '2024-09-09', count: 3 },
    { date: '2024-09-10', count: 2 },
    { date: '2024-09-11', count: 5 },
    { date: '2024-09-12', count: 2 },
    { date: '2024-09-13', count: 1 },
    { date: '2024-09-17', count: 2 },
    { date: '2024-09-18', count: 4 },
    { date: '2024-10-02', count: 1 },
    { date: '2024-10-07', count: 1 },
    { date: '2024-10-14', count: 1 },
    { date: '2024-10-19', count: 1 },
    { date: '2024-11-07', count: 1 },
    { date: '2024-11-14', count: 1 },
    { date: '2024-11-16', count: 1 },
    { date: '2024-11-18', count: 1 },
    { date: '2024-11-21', count: 1 },
    { date: '2024-11-24', count: 1 },
    { date: '2024-11-25', count: 1 },
    { date: '2024-11-27', count: 1 },
    { date: '2024-11-30', count: 1 },
    { date: '2024-12-03', count: 1 },
    { date: '2024-12-04', count: 1 },
    { date: '2024-12-07', count: 1 },
    { date: '2024-12-08', count: 1 },
    { date: '2024-12-09', count: 1 },
    { date: '2024-12-13', count: 3 },
    { date: '2024-12-18', count: 1 },
    { date: '2024-12-24', count: 1 },
    { date: '2024-12-25', count: 2 },
    { date: '2024-12-26', count: 1 },
    { date: '2024-12-27', count: 4 },
    { date: '2024-12-28', count: 2 },
    { date: '2024-12-30', count: 1 },
    { date: '2024-12-31', count: 3 },
    { date: '2025-01-01', count: 1 },
    { date: '2025-01-03', count: 3 },
    { date: '2025-01-04', count: 2 },
    { date: '2025-01-06', count: 2 },
    { date: '2025-01-07', count: 3 },
    { date: '2025-01-08', count: 4 },
    { date: '2025-01-09', count: 1 },
    { date: '2025-01-10', count: 4 }
];

export const authorFileTypeDistribution = {
    "Deepak Guneja": {
        emails: ["deepak.guneja@plux.ai", "deepakguneja@gmail.com", "deepakguneja97@gmail.com"],
        fileTypes: {
            ".css": { insertions: 604, deletions: 42 },
            ".html": { insertions: 216, deletions: 105 },
            ".json": { insertions: 4913, deletions: 189 },
            ".png": { insertions: 0, deletions: 0 },
            ".py": { insertions: 21126, deletions: 2984 },
            ".svg": { insertions: 99, deletions: 0 },
            ".ts": { insertions: 600, deletions: 192 },
            ".tsx": { insertions: 7893, deletions: 4015 },
            ".txt": { insertions: 251, deletions: 18 },
        },
    },
    "Deepak Gupta": {
        emails: ["deepakguptaplux@gmail.com"],
        fileTypes: {
            ".css": { insertions: 304, deletions: 54 },
            ".html": { insertions: 90, deletions: 42 },
            ".js": { insertions: 93, deletions: 37 },
            ".json": { insertions: 4198, deletions: 971 },
            ".md": { insertions: 108, deletions: 16 },
            ".png": { insertions: 0, deletions: 0 },
            ".py": { insertions: 3195, deletions: 1106 },
            ".svg": { insertions: 986, deletions: 27 },
            ".ts": { insertions: 250, deletions: 154 },
            ".tsx": { insertions: 8938, deletions: 3208 },
            ".txt": { insertions: 31, deletions: 0 },
            ".webp": { insertions: 0, deletions: 0 },
            ".xml": { insertions: 9, deletions: 0 },
        },
    },
    "Himanshu Kumar": {
        emails: ["himanshu.kumar@plux.ai"],
        fileTypes: {
            ".conf": { insertions: 14, deletions: 25 },
            ".dockerignore": { insertions: 6, deletions: 2 },
            ".env": { insertions: 13, deletions: 1 },
            ".gitignore": { insertions: 1, deletions: 1 },
            ".html": { insertions: 70, deletions: 15 },
            ".js": { insertions: 2, deletions: 1 },
            ".json": { insertions: 1500, deletions: 193 },
            ".jsx": { insertions: 7, deletions: 3 },
            ".md": { insertions: 124, deletions: 15 },
            ".py": { insertions: 2143, deletions: 713 },
            ".ts": { insertions: 245, deletions: 78 },
            ".tsx": { insertions: 1852, deletions: 300 },
            ".txt": { insertions: 35, deletions: 5 },
        },
    },
    "Pratyush Chaudhary": {
        emails: [
            "160696121+plux-coder@users.noreply.github.com",
            "160696121+pratyush-chaudhary@users.noreply.github.com",
            "pratyushkc232@gmail.com"
        ],
        fileTypes: {
            ".cjs": { insertions: 86, deletions: 2 },
            ".conf": { insertions: 120, deletions: 8 },
            ".css": { insertions: 3997, deletions: 584 },
            ".csv": { insertions: 18, deletions: 0 },
            ".env": { insertions: 6, deletions: 2 },
            ".gitignore": { insertions: 120, deletions: 2 },
            ".html": { insertions: 4336, deletions: 113 },
            ".jpeg": { insertions: 0, deletions: 0 },
            ".js": { insertions: 169, deletions: 12 },
            ".json": { insertions: 76122, deletions: 11502 },
            ".jsx": { insertions: 38, deletions: 2 },
            ".log": { insertions: 3, deletions: 6 },
            ".md": { insertions: 108, deletions: 20 },
            ".png": { insertions: 0, deletions: 0 },
            ".prettierrc": { insertions: 24, deletions: 0 },
            ".py": { insertions: 43831, deletions: 8891 },
            ".pylintrc": { insertions: 9, deletions: 0 },
            ".svg": { insertions: 704, deletions: 0 },
            ".toml": { insertions: 103, deletions: 9 },
            ".ts": { insertions: 14999, deletions: 2465 },
            ".tsx": { insertions: 35215, deletions: 14598 },
            ".txt": { insertions: 504, deletions: 63 },
            ".webp": { insertions: 0, deletions: 0 },
            ".service": { insertions: 24, deletions: 0 },
            ".yml": { insertions: 36, deletions: 0 },
        },
    },
    "Rakshit Sakhuja": {
        emails: ["rakshitsakhuja.plux@gmail.com"],
        fileTypes: {
            ".gitignore": { insertions: 1, deletions: 0 },
            ".py": { insertions: 880, deletions: 366 },
        },
    },
};