import React, { useState } from 'react';
import { authorFileTypeDistribution } from '../data/commitData';

const AuthorFileTypeAnalytics = () => {
    const [expandedAuthor, setExpandedAuthor] = useState(null);
    const [showAggregated, setShowAggregated] = useState(false);

    // Aggregate data across all authors
    const aggregatedData = {};
    Object.values(authorFileTypeDistribution).forEach(authorData => {
        Object.entries(authorData.fileTypes).forEach(([fileType, stats]) => {
            if (!aggregatedData[fileType]) {
                aggregatedData[fileType] = { insertions: 0, deletions: 0 };
            }
            aggregatedData[fileType].insertions += stats.insertions;
            aggregatedData[fileType].deletions += stats.deletions;
        });
    });

    const toggleAuthorExpansion = (author) => {
        setExpandedAuthor(expandedAuthor === author ? null : author);
    };

    const toggleAggregatedView = () => {
        setShowAggregated(!showAggregated);
    };

    return (
        <div className="author-analytics" style={{ fontFamily: 'sans-serif', padding: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Author File Type Analytics</h1>

            <button onClick={toggleAggregatedView} style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {showAggregated ? 'Show Individual Contributions' : 'Show Aggregated Contributions'}
            </button>

            {showAggregated ? (
                <div className="aggregated-view">
                    <h2 style={{ marginBottom: '10px' }}>Aggregated Contributions per File Type</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>File Type</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Insertions</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Deletions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(aggregatedData).map(([fileType, stats]) => (
                                <tr key={fileType}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{fileType}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stats.insertions}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stats.deletions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="individual-view">
                    {Object.entries(authorFileTypeDistribution).map(([author, data]) => (
                        <div key={author} className="author-section" style={{ marginBottom: '20px' }}>
                            <h2 style={{ cursor: 'pointer' }} onClick={() => toggleAuthorExpansion(author)}>
                                {author} ({data.emails.join(', ')})
                                <span style={{ marginLeft: '10px', fontSize: '0.8em', color: '#777' }}>
                                    {expandedAuthor === author ? '▼' : '►'}
                                </span>
                            </h2>
                            {expandedAuthor === author && (
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>File Type</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Insertions</th>
                                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Deletions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(data.fileTypes).map(([fileType, stats]) => (
                                            <tr key={fileType}>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{fileType}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stats.insertions}</td>
                                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{stats.deletions}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AuthorFileTypeAnalytics;