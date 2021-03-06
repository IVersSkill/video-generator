const readline = require("readline-sync");
const robots = {
    text: require("./robots/text.js")
}

async function start(){
    const content = {}
    content.searchTerm = askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix();
    await robots.text(content)

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