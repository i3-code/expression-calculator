function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    expr = expr.trim();
    expr = expr.replace(/(\d)([-+*/])(\d)/ig, `$1 $2 $3`);

    let leftBrackets = expr.match(/\(/g) || [];
    let rightBrackets = expr.match(/\)/g) || [];
    if (leftBrackets.length != rightBrackets.length) {
        throw new Error('ExpressionError: Brackets must be paired');
        return 0;
    } else if (leftBrackets.length == 1) {
        if (expr[0] == '(' && expr[expr.length - 1] == ')') expr = expr.substring(2, expr.length - 2)
    }

    expr = expr.replace(/\s+/ig, ' ');
    let exprArray = expr.split(' ');

    while (exprArray.indexOf('(') != -1) {
      let bracketStart = exprArray.indexOf('(');
      let subBracket = ' ( ';
      let inBracket = 1;
      for (let i = bracketStart + 1; i < exprArray.length; i++) {
        if (exprArray[i] == ')') {
          subBracket += ') ';
          inBracket += 1;
          let subResult = expressionCalculator(subBracket);
          exprArray.splice(bracketStart, inBracket, subResult);
          break;
        }

        if (exprArray[i] == '(') {
          bracketStart = i;
          subBracket = ' ( ';
          inBracket = 1;
          continue;
        }

        subBracket += exprArray[i] + ' ';
        inBracket += 1;
      }
    }

    while (exprArray.indexOf('/') != -1) {
      let divPos = exprArray.indexOf('/');
      let divResult = Number(exprArray[divPos - 1]) / Number(exprArray[divPos + 1])
      exprArray.splice(divPos - 1, 3, divResult);
    }

    while (exprArray.indexOf('*') != -1) {
      let mulPos = exprArray.indexOf('*');
      let mulResult = Number(exprArray[mulPos - 1]) * Number(exprArray[mulPos + 1])
      exprArray.splice(mulPos - 1, 3, mulResult);
    }

    while (exprArray.indexOf('-') != -1) {
      let minPos = exprArray.indexOf('-');
      let minResult = Number(exprArray[minPos - 1]) - Number(exprArray[minPos + 1])
      exprArray.splice(minPos - 1, 3, minResult);
    }

    while (exprArray.indexOf('+') != -1) {
      let pluPos = exprArray.indexOf('+');
      let pluResult = Number(exprArray[pluPos - 1]) + Number(exprArray[pluPos + 1])
      exprArray.splice(pluPos - 1, 3, pluResult);
    }

    let result = Number(exprArray.join())
    if (result === Infinity) { throw new Error('TypeError: Division by zero.'); }
    return result;
}

module.exports = {
    expressionCalculator
}