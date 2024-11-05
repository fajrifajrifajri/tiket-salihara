import React from "react";

interface detailAcaraProps {
    ticketName: string;
    price: number;
}

const detailAcara: React.FC<detailAcaraProps> = ({ ticketName, price }) => {
    return (
        <div>
            <h4>{ticketName}</h4>
            <p>Harga: {price}</p>
        </div>
    );
};

export default detailAcara;
