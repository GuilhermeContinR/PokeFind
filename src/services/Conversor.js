const conversor = ( valor) => {
    
    // return parseFloat((valor - 32) * 5 / 9);
    return (valor - 273.15 ).toFixed(2);
};

export default conversor;