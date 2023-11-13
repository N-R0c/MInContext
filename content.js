function convertMeters(meters) {
  let schoolBuses = Math.round((meters / 12.2) * 100) / 100;
  let footballFields = Math.round((meters / 91.44) * 100) / 100;

  return `${schoolBuses} School Buses (${footballFields} Football Fields)`;
}


function scanAndReplaceTextInNode(node) {
  let text = node.textContent;
  let regex = /(\d+(?:\.\d+)?)\s*(m\b|meter|meters|metre|metres)/gi;
  let match = regex.exec(text);

  if (match) {
    let meters = parseFloat(match[1]);
    let converted = convertMeters(meters);
    let newText = text.replace(regex, `<span style="color: lightblue; font-weight: bold;">${converted}</span>`);
    let newNode = document.createElement("span");
    newNode.innerHTML = newText;
    node.parentNode.replaceChild(newNode, node);
  }
}

function scanAndReplaceTextInDocument() {
  let textNodes = document.evaluate("//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  for (let i = 0; i < textNodes.snapshotLength; i++) {
    let node = textNodes.snapshotItem(i);
    scanAndReplaceTextInNode(node);
  }
}

let observer = new MutationObserver(scanAndReplaceTextInDocument);
observer.observe(document, { childList: true, subtree: true });
scanAndReplaceTextInDocument();
