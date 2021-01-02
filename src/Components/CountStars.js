import React, { useState } from 'react'
import utils from './Utils'
import './CountStars.css'

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    condidate:'deepskyblue'
}

const StarsModel = (props)=>{
   return  <>
    {utils.range(1,props.count).map(starId=>
        <div key={starId} className="star" />
     )}
   </> 
}
const NumModel = (props)=>{
    
    
    return <> 
    <button style={{'backgroundColor': colors[props.status]}} onClick={()=>props.clickStatus(props.nums,props.status)} className="number">
          {props.nums}
    </button> 
    </>
}
const StarMatch = () => {

    const[star,countStar] = useState(utils.random(1,9));
    const[availableNums,setavailableNums] = useState(utils.range(1,9));
    const[condidateNums,setcandidateNums] = useState([]);

    const candidatesAreWrong =  utils.sum(condidateNums) > star;
    const numberStatus =(number)=>{
        if(!availableNums.includes(number)){
            return 'used' ;
        }
        if(condidateNums.includes(number)){
            return candidatesAreWrong ? 'wrong' :'condidate'
        }
        return 'available';
    }



    const numOnclick =(num,currentStatus)=>{

        if(currentStatus == 'used'){
            return;
        }
        const newCondidateNums = currentStatus === 'available' ? condidateNums.concat(num) : condidateNums.filter(cn=>cn !== num);
        console.log(newCondidateNums);
        if(utils.sum(newCondidateNums) !== star){
            setcandidateNums(newCondidateNums);
            console.log('here');
        }else{
            const newAvailableNums = availableNums.filter(
                n=>!newCondidateNums.includes(n)
            )
            //redraw stars
            countStar(utils.randomSumIn(newAvailableNums,9))
            setavailableNums(newAvailableNums);
            setcandidateNums([]);
        }
        // setavailableNums(availableNums=>availableNums.filter(numItem=> numItem !== num))
    }
    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
           <StarsModel  count={star} />
          </div>
          <div className="right">
          {utils.range(1,9).map(nums=> 
            <NumModel key={nums} clickStatus={numOnclick}  nums={nums} status={numberStatus(nums)} />
           )}
          </div>
        </div>
        <div className="timer">Time Remaining: 10</div>
      </div>
    );
  };


  export default StarMatch

