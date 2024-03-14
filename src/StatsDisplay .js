import React, { useEffect } from 'react';

const StatsDisplay = ({ stats, onTraitClick }) => {
    useEffect(() => {
        if (stats) {
            console.log(stats);
        }
    }, [stats]);

    if (!stats) {
        return <div>Loading...</div>; // or any loading indicator
    }

    return (
        <div>
            {Object.keys(stats).map((traitType) => (
                <div key={traitType}>
                    <h2>{traitType}</h2>
                    <ul>
                        {Object.keys(stats[traitType]).map((traitValue) => (
                            <li key={traitValue} onClick={() => onTraitClick(traitType, traitValue)}>
                                <span>{traitValue}</span>
                                <span> - {stats[traitType][traitValue].count}</span>
                                <span> - {stats[traitType][traitValue].percentage}%</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default StatsDisplay;
