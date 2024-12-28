import React, { useState, useMemo } from 'react';
import { authorFileTypeDistribution } from '../data/commitData'; // Assuming you have this data
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import styles from './AuthorFileTypeAnalytics.module.css'; // Assuming you have your CSS module
import { ChevronDown, ChevronRight } from 'lucide-react';

const CHART_TYPES = {
    INSERTIONS: 'insertions',
    DELETIONS: 'deletions',
};

const FILE_TYPE_COLORS = [
    "#2196f3", // Blue for .py
    "#9c27b0", // Purple for .tsx
    "#00bcd4", // Cyan for .ts
    "#4caf50", // Green
    "#ff9800", // Orange
    "#f44336", // Red
    "#795548", // Brown
    "#607d8b", // Grey
    "#e91e63", // Pink
    "#3f51b5", // Indigo
    "#009688", // Teal
    "#cddc39", // Lime
    "#ffc107", // Amber
    "#ff5722", // Deep Orange
    "#9e9e9e", // Dark Grey
    "#8bc34a", // Light Green
    "#03a9f4",  // Light Blue
    "#673ab7", // Deep Purple
    "#9e9d24", // Olive
    "#2979ff" // Light Indigo
];

const AuthorFileTypeAnalytics = () => {
    // State for expanded authors (to track multiple expanded authors)
    const [expandedAuthors, setExpandedAuthors] = useState({});
    const [showAggregated, setShowAggregated] = useState(false);
    const [chartType, setChartType] = useState(CHART_TYPES.INSERTIONS);
    const [selectedFileTypes, setSelectedFileTypes] = useState(() => {
        const defaultSelected = ['.py', '.tsx', '.ts'];
        const allFileTypes = Object.keys(
            Object.values(authorFileTypeDistribution).reduce((acc, data) => {
                Object.keys(data.fileTypes).forEach(fileType => acc[fileType] = true);
                return acc;
            }, {})
        );
        return allFileTypes.filter(ft => defaultSelected.includes(ft));
    });

    // Toggle the expanded state of an author
    const toggleAuthorExpansion = (author) => {
        setExpandedAuthors(prev => ({
            ...prev,
            [author]: !prev[author]
        }));
    };

    const toggleAggregatedView = () => {
        setShowAggregated(!showAggregated);
    };

    const handleChartTypeChange = (type) => {
        setChartType(type);
    };

    const handleFileTypeToggle = (fileType) => {
        setSelectedFileTypes(prev => {
            if (prev.includes(fileType)) {
                return prev.filter(ft => ft !== fileType);
            } else {
                return [...prev, fileType];
            }
        });
    };

    // Calculate aggregated data (for the aggregated view)
    const aggregatedData = useMemo(() => {
        const aggregated = {};
        Object.values(authorFileTypeDistribution).forEach(authorData => {
            Object.entries(authorData.fileTypes).forEach(([fileType, stats]) => {
                if (selectedFileTypes.includes(fileType)) {
                    if (!aggregated[fileType]) {
                        aggregated[fileType] = { insertions: 0, deletions: 0 };
                    }
                    aggregated[fileType].insertions += stats.insertions;
                    aggregated[fileType].deletions += stats.deletions;
                }
            });
        });
        return Object.entries(aggregated).map(([fileType, stats]) => ({ fileType, ...stats }));
    }, [selectedFileTypes]);

    // Prepare chart data based on selected view (aggregated or individual)
    const chartData = useMemo(() => {
        if (showAggregated) {
            return aggregatedData.map(item => ({
                fileType: item.fileType,
                [chartType]: item[chartType],
            }));
        }
        return Object.entries(authorFileTypeDistribution).map(([author, data]) => ({
            author,
            ...Object.entries(data.fileTypes).reduce((acc, [fileType, stats]) => {
                if (selectedFileTypes.includes(fileType)) {
                    acc[fileType] = stats[chartType];
                }
                return acc;
            }, {}),
        }));
    }, [showAggregated, chartType, aggregatedData, selectedFileTypes]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Author File Type Analytics</h1>

            {/* Controls for switching views and chart type */}
            <div className={styles.controls}>
                <button
                    onClick={toggleAggregatedView}
                    className={`${styles.controlButton} ${showAggregated ? styles.active : ''}`}
                >
                    {showAggregated ? 'Individual View' : 'Aggregated View'}
                </button>
                <button
                    onClick={() => handleChartTypeChange(CHART_TYPES.INSERTIONS)}
                    className={`${styles.controlButton} ${chartType === CHART_TYPES.INSERTIONS ? styles.active : ''}`}
                >
                    Insertions
                </button>
                <button
                    onClick={() => handleChartTypeChange(CHART_TYPES.DELETIONS)}
                    className={`${styles.controlButton} ${chartType === CHART_TYPES.DELETIONS ? styles.active : ''}`}
                >
                    Deletions
                </button>
            </div>

            {/* File type selection buttons */}
            <div className={styles.fileTypeSelection}>
                <span className={styles.fileTypeSelectionLabel}>Filter File Types:</span>
                <div className={styles.fileTypeButtons}>
                    {Object.keys(
                        Object.values(authorFileTypeDistribution).reduce((acc, data) => {
                            Object.keys(data.fileTypes).forEach(fileType => acc[fileType] = true);
                            return acc;
                        }, {})
                    ).sort().map(fileType => (
                        <button
                            key={fileType}
                            className={`${styles.fileTypeButton} ${selectedFileTypes.includes(fileType) ? styles.active : ''}`}
                            onClick={() => handleFileTypeToggle(fileType)}
                        >
                            {fileType}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bar Chart */}
            <div className={styles.chartSection}>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={showAggregated ? "fileType" : "author"} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {showAggregated ? (
                            <Bar dataKey={chartType} fill="#8884d8" />
                        ) : (
                            selectedFileTypes.map((fileType, index) => (
                                <Bar
                                    key={fileType}
                                    dataKey={fileType}
                                    stackId="a"
                                    fill={FILE_TYPE_COLORS[index % FILE_TYPE_COLORS.length]}
                                />
                            ))
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Individual Author Breakdown (only shown in individual view) */}
            {!showAggregated && (
                <div className={styles.individualViewSection}>
                    <h2 className={styles.individualViewTitle}>Individual Author Breakdown</h2>
                    <div className={styles.authorList}>
                        {Object.entries(authorFileTypeDistribution).map(([author, data]) => (
                            <div key={author} className={styles.authorCard}>
                                {/* Author card header with expand/collapse toggle */}
                                <div className={styles.authorCardHeader} onClick={() => toggleAuthorExpansion(author)}>
                                    <h3 className={styles.authorName}>{author}</h3>
                                    <span className={styles.expandIcon}>
                                        {expandedAuthors[author] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                    </span>
                                </div>
                                {/* Author details (shown when expanded) */}
                                {expandedAuthors[author] && (
                                    <div className={styles.authorDetails}>
                                        <table className={styles.authorTable}>
                                            <thead>
                                                <tr>
                                                    <th className={styles.tableHeader}>File Type</th>
                                                    <th className={styles.tableHeader}>Insertions</th>
                                                    <th className={styles.tableHeader}>Deletions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Filter file types based on selection */}
                                                {Object.entries(data.fileTypes)
                                                    .filter(([fileType]) => selectedFileTypes.includes(fileType))
                                                    .map(([fileType, stats]) => (
                                                        <tr key={fileType}>
                                                            <td className={styles.tableCell}>{fileType}</td>
                                                            <td className={styles.tableCell}>{stats.insertions}</td>
                                                            <td className={styles.tableCell}>{stats.deletions}</td>
                                                        </tr>
                                                    ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthorFileTypeAnalytics;