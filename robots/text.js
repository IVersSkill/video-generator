const algorithmia = require('algorithmia')
const algorithmiaApiKey = require("../credentials/algorithmia.json").apiKey
const sentenceBoundryDetection = require("sbd")

async function robot (content){
    await fetchContentFromWikipedia(content)
    sanitizeContent(content)
    breakContentIntoSentences(content)
    async function fetchContentFromWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey)
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo("web/WikipediaParser/0.1.2")
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm)
        const wikipediaContent = wikipediaResponse.get()
    
        
        content.sourceContentOriginal = wikipediaContent.content
    }

    function sanitizeContent(content){
        const withoutBlankLinesAndMarkDown = removeBlankLinesAndMarkDown(content.sourceContentOriginal)
        const withoutDates = removeDates(withoutBlankLinesAndMarkDown)
        content.sourceContentSanitazed = withoutDates

        function removeBlankLinesAndMarkDown(text){
            const allLines = text.split('\n')
            const withoutBlankLinesAndMarkDown = allLines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith("=")){
                    return false
                }
                return true
            })
            return withoutBlankLinesAndMarkDown.join(' ')
        }

        function removeDates (text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        }

    }

    function breakContentIntoSentences(content) {
        content.sentences = []
        const sentences = sentenceBoundryDetection.sentences(content.sourceContentSanitazed)
        console.log(sentences)
        sentences.forEach((sentences) => {
            content.sentences.push({
            text: sentences,
            keywords:[],
            images:[] 
        })
        })
        
    }
}

module.exports = robot