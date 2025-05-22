
const counterNumber = (n:number):number[] =>{
    let result:number[] = [] ;
    for(let i = 0; i < n; i++){
        if(i<2){
            result.push(i);
        }else{
            result.push(result[i-1] + result[i - 2]);
        }
    }
    return result;
}

console.info(counterNumber(10));