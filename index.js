// You find a strange mirror that always shows a hand that is moving. The hand appears to be alive, and after a lot of questions of "yes" and "no" answer, you know that the hand is trying to teach you a program that is written in HPL (Hand Programming Language).
// This language works with a memory of an indefinite size of bytes, with all values initialized to 0. This language haves 7 instructions:
// 👉 : moves the memory pointer to the next cell
// 👈 : moves the memory pointer to the previous cell
// 👆 : increment the memory cell at the current position
// 👇 : decreases the memory cell at the current position.
// 🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
// 🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
// 👊 : Display the current character represented by the ASCII code defined by the current position.

// As memory cells are bytes, from 0 to 255 value, if you decrease 0 you'll get 255, if you increment 255 you'll get 0.
// Loops of 🤜 and 🤛 can be nested.

const MIN_CELL=0;
const MAX_CELL=255;

const clamp = ( value ) =>{
    if( value > MAX_CELL) return MIN_CELL
    else if( value < MIN_CELL) return MAX_CELL
    return value
}

const translate = (str) => {
    const memoryCell=[0];//array emulara la memoria

    let pointer = 0; //puntero de memoria ---->puntero del array
    let idx = 0;
    let output = '';

    const getNextFistIndex =(idx,instructions ) => {
        let fists = 1;
        for( let i = idx + 1; i < instructions.length; i++ ){
            if(instructions[i] === '🤜')fists ++
            if(instructions[i] === '🤛')fists --
            if(fists === 0) return i
        }
    }

    const getPrevFistIndex =(idx,instructions ) => {
        let fists = 1;
        for( let i = idx - 1; i >= 0; i-- ){
            if(instructions[i] === '🤜')fists --
            if(instructions[i] === '🤛')fists ++
            if(fists === 0) return i
        }
    }

    const actions = {
        '👉': () => {
            pointer ++
            //va a signarle el cero en el caso que el memoriy[pointer] sea "undefined"
            //ey llave tu sabes que el memoryCell es un array de length 0 por lo que si los demas lenght llamese 1,2,3,4,5,6 no existen los creamos en cero
            memoryCell[pointer] ??= 0
        },
        '👈': () => {
            pointer --
            //va a signarle el cero en el caso que el memoriy[pointer] sea "undefined"
            memoryCell[pointer] ??= 0
        },
        '👆': () => {
            memoryCell[pointer] = clamp(memoryCell[pointer] + 1)
        },
        '👇': () => {
            memoryCell[pointer] = clamp(memoryCell[pointer] - 1)
        },
        '🤜': () => {
            if(memoryCell[pointer] === 0){
                idx = getNextFistIndex(idx, arrOfInstructions)
            }
        },
        '🤛': () => {
            if(memoryCell[pointer] !== 0){
                idx = getPrevFistIndex(idx, arrOfInstructions)
            }
        },
        '👊': () => {
            output += String.fromCharCode(memoryCell[pointer])
        },
    }

    const arrOfInstructions = Array.from(str);

    while (idx < arrOfInstructions.length){
        const action = arrOfInstructions[idx];
        //encontra la posicion de instruc y ejecuta un metodo
        actions[action]();
        idx++;
    }
    return output
}
module.exports = translate

translate ('👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊')