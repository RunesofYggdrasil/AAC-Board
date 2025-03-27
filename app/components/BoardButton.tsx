'use client';

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
            >
                {image && <img src={image}></img>}
                {label}
            </button>
        </>
    )
}

export default BoardButton