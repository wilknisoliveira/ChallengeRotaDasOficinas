let toggle = true
let backgroundColor = '#f5f5f5'

let roman = document.querySelector('input#roman')
let arabic = document.querySelector('input#arabic')
arabic.style.backgroundColor = backgroundColor

let generateBtn = document.querySelector('button#generateBtn')
let toggleBtn = document.querySelector('button#toggleBtn')

let resultDiv = document.querySelector('div#resultDiv')



toggleBtn.addEventListener('click', toggleConverter)
generateBtn.addEventListener('click', convertRomanArabic)

//############# Toggle #############

function toggleConverter() {
    toggle = !toggle
    
    if(toggle == true){
        generateBtn.removeEventListener('click', convertArabicRoman)
        generateBtn.addEventListener('click', convertRomanArabic)
        arabic.value = ''
        roman.style.backgroundColor = 'white'
        arabic.style.backgroundColor = backgroundColor
    } else{
        generateBtn.removeEventListener('click', convertRomanArabic)
        generateBtn.addEventListener('click', convertArabicRoman)
        roman.value = ''
        arabic.style.backgroundColor = 'white'
        roman.style.backgroundColor = backgroundColor
    }
}

//############# ROMAN -> ARABIC #############

function convertRomanArabic(){
    var entry = roman.value.toUpperCase()
    var brokeEntry = []

    var validOperation = validationRomanArabic(entry)
  
    if(validOperation == true){
        brokeEntry = breakingNumber(entry)       
        arabic.value = romanArabic(brokeEntry)
    }
}

function validationRomanArabic(entry){
    //Use regex to define the roman pattern
    var romanValidation = /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/

    if(entry.match(romanValidation)){
        resultDiv.innerHTML = '--'
        return true
    }
    else{
        resultDiv.innerHTML = 'Number syntax error'
        return false
    }
}

function breakingNumber(entry){
    var brokeEntry = []
    //Convert the number by parts
    for(var i=0;i<entry.length;i++){
        switch (entry[i]) {
            case 'I':
                brokeEntry[i] = 1
                break;

            case 'V':
                brokeEntry[i] = 5
                break;

            case 'X':
                brokeEntry[i] = 10
                break;

            case 'L':
                brokeEntry[i] = 50
                break;

            case 'C':
                brokeEntry[i] = 100
                break;

            case 'D':
                brokeEntry[i] = 500
                break;

            case 'M':
                brokeEntry[i] = 1000
                break;
        
            default:
                window.alert('Invalid input!')
                break;
        }
    }
    return brokeEntry
}

function romanArabic(brokeEntry){
    var result = 0
    var sum = [1]

    //Map the expression
    //Define when subtract using a auxiliar array
    for(var i=1;i<brokeEntry.length;i++){
        if(brokeEntry[i]<=brokeEntry[i-1]){
            sum[i] = 1
            sum[i-1] = 1
        } else{
            sum[i] = 1
            sum[i-1] = -1
        }
    }

    //Expression operation
    for(var i=0;i<brokeEntry.length;i++){
        result += brokeEntry[i]*sum[i]
    }

    return result
}


//############# ARABIC -> ROMAN #############

function convertArabicRoman(){
    var entry = arabic.value
    var validOperation = false
    
    validOperation = validationArabicRoman(entry)
    
    if(validOperation == true){
        roman.value = arabicRoman(entry)
    }
}

function validationArabicRoman(entry){
    var validOperation = false
    if(isNaN(entry))
        resultDiv.innerHTML = 'Please, insert a number under 3999'
    else if(entry>3999 || entry<1)
        resultDiv.innerHTML = 'Number out of range'
    else
        validOperation = true
    
    return validOperation
}

function arabicRoman(entry){
    var result = ''
    var k = 0
    var n1
    var n2
    var n3

    for(i=0;i<entry.length;i++){
        switch (entry.length-k) {
            case 4:
                for(var j=0;j<entry[i];j++){
                    result += 'M'
                }                
                break;
            case 3:
                var n1 = 'C'
                var n2 = 'D'
                var n3 = 'M'
                result += defineLetter(n1, n2, n3, entry[i])
                break;
            case 2:
                var n1 = 'X'
                var n2 = 'L'
                var n3 = 'C'
                result += defineLetter(n1, n2, n3, entry[i])
                break;
            case 1:
                var n1 = 'I'
                var n2 = 'V'
                var n3 = 'X'
                result += defineLetter(n1, n2, n3, entry[i])
                break;
        }
        k += 1
    }
    return result
}

function defineLetter(n1, n2, n3, entry){
    var result = ''
    if(entry==5)
        result += n2
    else if(entry==4)
        result += n1 + n2
    else if(entry<4)
        for(var j=0;j<entry;j++)
            result += n1
    else if(entry==9)
        result += n1 + n3
    else if(entry>5 && entry<9){
        result += n2
        for(var j=5;j<entry;j++)
            result += n1
    }
    return result
}

