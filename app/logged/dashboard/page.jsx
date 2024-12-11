import React from 'react';
import styles from './Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faRecycle, faHandshake } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    const stats = [
        { title: 'Coletores', value: 3456, icon: faUser }, 
        { title: 'Doadores', value: 3, icon: faHouse }, 
        { title: 'Resíduos coletados', value: '3t', icon: faRecycle },
        { title: 'Coletas feitas', value: 12, icon: faHandshake },
    ];

    const wasteData = [
        { type: 'Plástico', amount: 20, color: '#FFA500' },
        { type: 'Alumínio', amount: 50, color: '#6A5ACD' },
        { type: 'Isopor', amount: 30, color: '#FF6347' },
    ];

    return (
        <div>
            <h1>ESTATÍSTICAS</h1>
            <div className={styles.dashboardContainer}>
                {stats.map((item, index) => (
                    <div key={index} className={styles.card}>
                        <div className={styles.iconContainer}>
                            <FontAwesomeIcon icon={item.icon} className={styles.icon} />
                        </div>
                        <div className={styles.info}>
                            <h3>{item.title}</h3>
                            <p>{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.wasteSection}>
                <h2>Tipos de resíduos coletados</h2>
                <div className={styles.wasteList}>
                    {wasteData.map((waste, index) => (
                        <div key={index} className={styles.wasteItem}>
                            <span className={styles.wasteType}>{waste.type}</span>
                            <div className={styles.wasteBarContainer}>
                                <div
                                    className={styles.wasteBar}
                                    style={{
                                        width: `${waste.amount}%`,
                                        backgroundColor: 'rgb(170, 220, 160)',
                                    }}
                                ></div>
                            </div>
                            <span className={styles.wasteAmount}>{waste.amount}t</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;