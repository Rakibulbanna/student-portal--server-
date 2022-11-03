const sscPoint=5;
const hscPoint=5.0;

const info={
    name:'SWE',
    Credit: 175,
    CostPerCredit:5000
}
const Totalamount = info.Credit*info.CostPerCredit;
const oneSemesterAmount = Totalamount/12;
const payable = (sscPoint == 5 && hscPoint == 5)? oneSemesterAmount-((oneSemesterAmount*75)/100) : oneSemesterAmount;
        console.log(payable)