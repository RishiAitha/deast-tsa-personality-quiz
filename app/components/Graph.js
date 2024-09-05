import React, { useState } from 'react';
import styles from './Graph.module.css';

const Graph = ({ profile }) => {
    const maxHeight = Math.max(...profile.map(Math.abs));

    return (
        <ul className={styles.grid}>
            {profile.map((value, index) => {
                const heightPercentage = (Math.abs(value) / maxHeight) * 50;
                const isNegative = value < 0;

                const barStyle = {
                    height: `${heightPercentage}%`,
                    transform: isNegative ? `translateY(50%)` : `translateY(-50%)`
                };

                return (
                    <li key={index} className={styles.gridColumn} style={barStyle}></li>
                )
            })}
        </ul>
    );
};

export default Graph;