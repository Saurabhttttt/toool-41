
function normalize(text) {
    return text.replace(/[,]+/g, '').toLowerCase();
}

function compareScripts() {
    const script1 = document.getElementById('script1').value;
    const script2 = document.getElementById('script2').value;
    const words1 = script1.split(/\s+/);
    const words2 = script2.split(/\s+/);
    const normWords1 = words1.map(normalize);
    const normWords2 = words2.map(normalize);

    const highlighted1 = highlightDifferences(words1, normWords2);
    const highlighted2 = highlightDifferences(words2, normWords1);

    const output = `<p>Script 1: ${highlighted1}</p><p>Script 2: ${highlighted2}</p>`;
    document.getElementById('output').innerHTML = output;
}

function highlightDifferences(originalWords, otherNormalizedWords) {
    let otherWordCounts = {};
    otherNormalizedWords.forEach(word => {
        otherWordCounts[word] = (otherWordCounts[word] || 0) + 1;
    });

    return originalWords.map((word) => {
        const normalizedWord = normalize(word);
        if (otherWordCounts[normalizedWord]) {
            otherWordCounts[normalizedWord]--;
            return word;
        } else {
            return `<span class="difference">${word}</span>`;
        }
    }).join(' ');
}
