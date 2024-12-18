"use client";

import styles from './Dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faRecycle, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { collection, query, onSnapshot } from "firebase/firestore";
import { Firestore } from "../../../config/firebase";

import React, { useEffect, useState } from 'react';

const firestoreRefCollector = collection(Firestore, 'collector');
const firestoreRefDonor = collection(Firestore, 'donor');


function CountCollectors(callback) {
    const q = query(firestoreRefCollector);

    return onSnapshot(q, (snapshot) => {
        const count = snapshot.size;
        callback(count);
    }, (error) => {
        console.error("Erro ao contar documentos:", error);
        callback(0);
    });
}

function CountDonor(callback) {
    const q = query(firestoreRefDonor);

    return onSnapshot(q, (snapshot) => {
        const count = snapshot.size;
        callback(count);
    }, (error) => {
        console.error("Erro ao contar documentos:", error);
        callback(0);
    });
}

function SumResidues(callback) {
    return onSnapshot(query(firestoreRefCollector), (snapshot) => {
        let sum_eletronicKg = 0, sum_glassKg = 0, sum_metalKg = 0, sum_oilKg = 0, sum_paperKg = 0, sum_plasticKg = 0, sum_RecyclingCollections = 0;

        snapshot.forEach((doc) => {
            const statistic = doc.data().statistic;
            sum_eletronicKg += statistic.eletronicKg;
            sum_glassKg += statistic.glassKg;
            sum_metalKg += statistic.metalKg;
            sum_oilKg += statistic.oilKg;
            sum_paperKg += statistic.paperKg;
            sum_plasticKg += statistic.plasticKg;
            sum_RecyclingCollections += statistic.collectionsCompleted;
        });

        const total_sum = sum_eletronicKg + sum_glassKg + sum_metalKg + sum_oilKg + sum_paperKg + sum_plasticKg + sum_RecyclingCollections;

        callback({
            sum_eletronicKg: sum_eletronicKg,
            sum_glassKg: sum_glassKg,
            sum_metalKg: sum_metalKg,
            sum_oilKg: sum_oilKg,
            sum_paperKg: sum_paperKg,
            sum_plasticKg: sum_plasticKg,
            sum_recyclingCollections: sum_RecyclingCollections,
            total_sum: total_sum,
        });
    });
}

const Dashboard = () => {
    const [NCollector, setNCollector] = useState(0);
    const [NDonor, setNDonor] = useState(0);
    const [QSumResidues, setQSumResidues] = useState(0);
    const [NRecyclingCollections, setNSumRecyclingCollections] = useState(0);
    const [QEl, setQEl] = useState(0);
    const [QGl, setQGl] = useState(0);
    const [QMt, setQMt] = useState(0);
    const [QOl, setQOl] = useState(0);
    const [QPp, setQPp] = useState(0);
    const [QPl, setQPl] = useState(0);

    useEffect(() => {
        const unsubscribe1 = CountCollectors((data) => {
            setNCollector(data);
        });
        const unsubscribe2 = CountDonor((data) => {
            setNDonor(data);
        });
        const unsubscribe3 = SumResidues((data) => {
            setQSumResidues(data.total_sum);
            setNSumRecyclingCollections(data.sum_recyclingCollections);
            setQEl(data.sum_eletronicKg);
            setQGl(data.sum_glassKg);
            setQMt(data.sum_metalKg);
            setQOl(data.sum_oilKg);
            setQPp(data.sum_paperKg);
            setQPl(data.sum_paperKg);
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
        };
    }, []);


    const stats = [
        { title: 'Coletores', value: NCollector, icon: faUser },
        { title: 'Doadores', value: NDonor, icon: faHouse },
        { title: 'Resíduos coletados', value: QSumResidues, icon: faRecycle },
        { title: 'Coletas feitas', value: NRecyclingCollections, icon: faHandshake },
    ];

    const wasteData = [
        { type: 'Eletrônico', amount: QEl, color: '#FFA500' },
        { type: 'Vidro', amount: QGl, color: '#6A5ACD' },
        { type: 'Metal', amount: QMt, color: '#FF6347' },
        { type: 'Óleo', amount: QOl, color: '#FFA500' },
        { type: 'Papel', amount: QPp, color: '#6A5ACD' },
        { type: 'Plástico', amount: QPl, color: '#FF6347' },
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
                            {item.title == "Resíduos coletados" ? <p>{item.value} kg</p> : <p>{item.value}</p>}
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
                            <span className={styles.wasteAmount}>{waste.amount} kg</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;