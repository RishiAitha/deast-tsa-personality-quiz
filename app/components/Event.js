import React from 'react';
import styles from './Event.module.css';
import { josefin_sans, ubuntu_mono } from '@/app/ui/fonts';

const Event = ({ event }) => {
    return (
        <div className={styles.eventContainer}>
            <h3 className={`${styles.eventName} ${ubuntu_mono.className} antialiased`}>{event.name}</h3>
            <p className={`${styles.eventDescription} ${josefin_sans.className} antialiased`}>{event.description}</p>
        </div>
    );
};

export default Event;
