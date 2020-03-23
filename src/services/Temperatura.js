// verificar a temperatura informado e retonar o tipo do pokemon
const temperatura = ( valor,clima) => {
    let type = '';
    // (<) que 5ºC, deve-se retornar um pokémon de gelo (ice).
    // Lugares onde a temperatura estiver entre (>=) 5ºC e (<) 10ºC, deve-se retornar um pokémon do tipo água (water).
    // Lugares onde a temperatura estiver entre (>=) 12ºC e (<) 15ºC, deve-se retornar um pokémon do tipo grama (grass).
    // Lugares onde a temperatura estiver entre (>=) 15ºC e (<) 21ºC, deve-se retornar um pokémon do tipo terra (ground).
    // Lugares onde a temperatura estiver entre (>=) 23ºC e (<) 27ºC, deve-se retornar um pokémon do tipo inseto (bug).
    // Lugares onde a temperatura estiver entre (>=) 27ºC e 33ºC inclusive, deve-se retornar um pokémon do tipo pedra (rock).
    // Lugares onde a temperatura for maior que 33ºC, deve-se retornar um pokémon do tipo fogo (fire).
    // Para qualquer outra temperatura, deve-se retornar um pokémon do tipo normal.
    // E, no caso em que esteja chovendo na região um pokémon elétrico (electric) deve ser retornado, independente da temperatura.
    
    switch (true) {
        case valor < 5:
            type =  'ice'
            break;
        case valor >= 5 && valor < 10:
            type =  'water'
            break;
        case valor >= 12 && valor < 15:
            type =  'grass'
            break;
        case valor >= 23 && valor < 27:
            type =  'bug'
            break;
        case valor >= 27 &&  valor < 33:
            type =  'rock'
            break;
        case valor > 33:
            type =  'fire'
            break
        default:
            type =  'normal'
            break;
    }
    if(clima === 'rain'){
        type = 'electric';
    }
    return type;


}

export default temperatura;