'use client';

import styles from './BoardButton.module.css';

interface Props {
    image?: string;
    label?: string;
    text: string;
}

function BoardButton({ image = '', label = '', text }: Props) {
    return (
        <>
            <button
                onClick={() => console.log(text)}
                className={styles.button}
            >
                <div className={styles.buttonImage}>
                    {image && <img src={image}></img>}
                </div>
                <div className={styles.buttonLabel}>
                    {label}
                </div>
            </button>
        </>
    )
}

export default BoardButton