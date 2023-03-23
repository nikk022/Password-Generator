// accesing element using custom attribute
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]")

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// symbols strings
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// at starting condition
let Password="";
let passwordLength=10;
let checkcount=0;
handleSlider();
// can set color of strength 


// setting of passwordLength
function handleSlider()
{
    // initial condition
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
}

// Indicator for strength of password
function setIndicator(color)
{
    indicator.style.backgroundColor=color;
    // indicator.style.boxShadow='0px 0px 12px 1px ${color}';
}

//random integer 
function getRandomInteger(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}
//random number
function generateRandomNumber()
{
    return getRandomInteger(0,9);
}
//randomr lower case
function generateLowercase()
{
    return String.fromCharCode(getRandomInteger(97,123))

}
//random uppercase 
function generateUpperrcase()
{
    return String.fromCharCode(getRandomInteger(65,91))

}
// random symbol generate
function generateSymbol()
{
const randomNum=getRandomInteger(0,symbols.length)
return symbols.charAt(randomNum);
}

//strength function
function calcStrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if (uppercaseCheck.checked) 
    {
      hasUpper = true;
    }
    if (lowercaseCheck.checked) 
    {
      hasLower = true;
    }
    if (numbersCheck.checked)
    {
       hasNum = true;
    }
    if (symbolsCheck.checked)
    {
     hasSym = true;
    }
    // any random general rules for strength 
    //can change these rule
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0");
      } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
      ) {
        setIndicator("#ff0");
      } else {
        setIndicator("#f00");
      }
}

//copy content(copy button)
async function copyContent() {
  try {// for copying content to clipboard=navigator.clipboard.writeText
      await navigator.clipboard.writeText(passwordDisplay.value);    
      copyMsg.innerText = "copied";
  }
  catch(e) {
      copyMsg.innerText = "Failed";
  }
  //to make copy wala span visible
  copyMsg.classList.add("active");

  setTimeout( () => {
      copyMsg.classList.remove("active");
  },2000);

}

//updating password length 
inputSlider.addEventListener('input', (e) => {
  passwordLength = e.target.value;
  handleSlider();
})

// checking password length is non empty
copyBtn.addEventListener('click', () => {
  if(passwordDisplay.value)    //change kr skte hai 
      copyContent();
})

// copyBtn.addEventListener('click', () => {
//   if(passwordDisplay.value!=0)    
//       copyContent();
// })



// shuffling the function
function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}


// another way for shuffle

// function shufflePassword(array) {
//   //Fisher Yates Method
//   for (let i = 0; i > array.length; i++) {
//       const j = Math.floor(Math.random() * (i + 1));
//       const temp = array[i];
//       array[i] = array[j];
//       array[j] = temp;
//     }
//   let str = "";
//   array.forEach((el) => (str += el));
//   return str;
// }


//main function for generating the password 

generateBtn.addEventListener('click', () => {
 
  //condition for  No checkbox is selected

  if(checkcount == 0) 
      return;
//special condition
  if(passwordLength < checkcount) {
      passwordLength = checkcount;
      handleSlider();
  }

  // let's start the jouney to find new password
  //console.log("Starting the Journey");
  //remove old password
  Password = "";

  //let's put the stuff mentioned by checkboxes

  // if(uppercaseCheck.checked) {
  //     password += generateUpperCase();
  // }

  // if(lowercaseCheck.checked) {
  //     password += generateLowerCase();
  // }

  // if(numbersCheck.checked) {
  //     password += generateRandomNumber();
  // }

  // if(symbolsCheck.checked) {
  //     password += generateSymbol();
  // }

  let funcArr = [];

  if(uppercaseCheck.checked)
      funcArr.push(generateUpperrcase);

  if(lowercaseCheck.checked)
      funcArr.push(generateLowercase);

  if(numbersCheck.checked)
      funcArr.push(generateRandomNumber);

  if(symbolsCheck.checked)
      funcArr.push(generateSymbol);

  //compulsory addition
  for(let i=0; i<funcArr.length; i++) {
      Password += funcArr[i]();
  }
  //console.log("Compulsory adddition done");

  //remaining adddition
  for(let i=0; i<passwordLength-funcArr.length; i++) {
      let randIndex = getRandomInteger(0 , funcArr.length);
      console.log("randIndex" + randIndex);
      Password += funcArr[randIndex]();
  }
  //console.log("Remaining adddition done");
  //shuffle the password
  Password = shufflePassword(Array.from(Password));
 // console.log("Shuffling done");
  //show in UI
  passwordDisplay.value = Password;
 // console.log("UI adddition done");
  //calculate strength
  calcStrength();
});



// function strengthmessage()
// {

//   if(passwordLength >4)
//   // document.console.log()
//   window.print("weak password");
//   else
//   window.print("strong password");

// }
//handling the checkbox change in handle slider 
function handleCheckBoxChange() {
  checkcount = 0;
  allCheckBox.forEach( (checkbox) => {
      if(checkbox.checked)
          checkcount++;
  });

//special case
  //for getting minimum length password 
  if(passwordLength < checkcount ) {
      passwordLength = checkcount;
      handleSlider();
  }
}
//for checking checked and unchecked box
allCheckBox.forEach( (checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
})


 