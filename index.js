const readline = require("readline-sync");
function start(){
    const content = {}
    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();

    function askAndReturnSearchTerm(){
        return readline.question("Type a Wikipedia term: ")
    }
    
    function askAndReturnPrefix(){
        const prefixes = ["Who is", "What is", "The history of"];
        const selectedPrefixesIndex = readline.keyInSelect(prefixes, "Choose one option");
        const selectedPrefixesText = prefixes[selectedPrefixesIndex];

        return selectedPrefixesText
    }
    console.log(content)

}

start()