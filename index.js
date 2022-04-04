const fs = require('fs')
const resultFunction = (error, result)=>{
    if(error){ return console.log(error);}
    console.log(result);
}

const extractAllNumbers = (file, callback) => {
    try {
        const text = fs.readFileSync(file).toString()
        const pattern = /[0-9]*\.?[0-9]+/g
        callback(undefined, {title: 'All the number in the file- '+file+'.', result: text.match(pattern)})
    } catch (error) {
        callback(error.message, undefined)        
    }

}
// extractAllNumbers('titanic_ticket.txt', resultFunction)

const extractNonAlphanumeric = (file, callback) => {
    try {
        const text = fs.readFileSync(file).toString()
        const pattern = /[^a-zA-z0-9 \r\n]+/g
        callback(undefined, {title: 'All the non Alphanumeric characters in the file- '+file+'.' , result: text.match(pattern)})
    } catch (error) {
        callback(error.message, undefined)        
    }

}
// extractNonAlphanumeric('text_doc.txt', resultFunction)  

const findWord = (file, word, callback) => {
    try {
        const text = fs.readFileSync(file).toString()
        const pattern = new RegExp(`${word}`, "gi")
        if(pattern.test(text)){
            callback(undefined, {
                title: 'Finding "'+word+ '" in the file- '+file+'.', 
                match: 'Found', 
                number_of_occurences: text.match(pattern).length
            })
        }else{
            callback(undefined, {
                title: 'Finding "'+word+ '" in the file- '+file+'.', 
                match: 'Not found', 
            })
        }
    } catch (error) {
        callback(error.message, undefined)        
    }

}
// findWord('text_doc.txt', 'lunch', resultFunction)  
// findWord('text_doc.txt', 'lnch', resultFunction)  

const replaceWord = (file, word , replaceWord, callback) => {
    try {
        const text = fs.readFileSync(file).toString()
        const pattern = new RegExp(`${word}`, "gi")
        if(pattern.test(text)){
            var indexes = []
            var val = text.match(pattern).length;
            while(val>0){
                indexes.push(pattern.exec(text).index);
                val-=1
            }
            callback(undefined, {
                title: 'Finding "'+ word + '" in the file- '+file+'.',
                match: 'Found',
                changes_on_index: indexes,
                new_string: text.replace(pattern, replaceWord), 
                number_of_changes: text.match(pattern).length
            })
        } else{
            callback(undefined, {
                title: 'Finding "'+ word + '" in the file- '+file+'.',
                match: 'Not found'
            })   
        }
    } catch (error) {
        callback(error.message, undefined)
    }
}
// replaceWord('text_doc.txt', 'lunch', 'Lunch', resultFunction)  
// replaceWord('text_doc.txt', 'lunh', 'Dinner', resultFunction)  

function titanic_ticket_playground(){
    console.log('----TITANIC NOTEBOOK TICKET COLUMN REGEX IMPLEMENTATION----');
    
    const titanic_ticket = (pattern, title, callback) => {
        try {
            const ticket = fs.readFileSync('titanic_ticket.txt').toString()
            const re = new RegExp(`${pattern}`, "g")
            callback(undefined, {
                title,
                result: ticket.match(re)
            })
        } catch (error) {
            callback(error.message, undefined)
        }
    }
    titanic_ticket('Ticket: (First|Second)', 'Finding "Ticket: " followed by either "First" or "Second"', resultFunction)
    titanic_ticket(' [0-9][0-9]','Finding "space" followed by "two digit number"', resultFunction)
    titanic_ticket('Ticket: [A-Z]','Finding "Ticket: " followed by a single character',resultFunction)
    titanic_ticket('T........','Extracting "T" followed by 8 characters',resultFunction)
    titanic_ticket('Price: [^0-9A-Za-z] ..','Finding "Price: " followed by a non-aphanumeric character followed by a space and then any 2 characters',resultFunction)
    titanic_ticket('Port: (Cherbourg|Southampton)','Finding "Port: " followed by either "Cherbourg" or "Southampton"',resultFunction)
    titanic_ticket('[0-9][0-9]?.[0-9]*','Finding a single or two digit number followed by decimal and digits after it',resultFunction)
    titanic_ticket('Ticket: [a-zA-Z]+','Finding "Ticket: " followed by the next word',resultFunction)
    titanic_ticket('[a-zA-Z]+: [a-zA-Z]+','Finding the words followed by ": " followed by another word',resultFunction)
    titanic_ticket('[a-zA-Z]+tow?n','Finding the words ending with "town" where "w" is optional',resultFunction)
    titanic_ticket('\\$ [0-9]+\.[0-9]+','Finding Price in USD format i.e. "$"',resultFunction)
    titanic_ticket('([a-zA-Z]+: [a-zA-Z]+;$)','Finding word followed by ":" which follwed by another word and that word it last word of particular statement',resultFunction)
    titanic_ticket('^[a-zA-Z]+: [a-zA-Z]+;','Finding word which is first word of particular statement which is then followed by ":" which follwed by another word',resultFunction)
    titanic_ticket('[a-zA-Z]+[ :]', 'Finding all the words which ends with either space or colon', resultFunction)
    titanic_ticket('\\$ [0-9][0-9][0-9]+\.[0-9]+', 'Finding all the high price ticket i.e. tripple digit number', resultFunction)
}

// titanic_ticket_playground()