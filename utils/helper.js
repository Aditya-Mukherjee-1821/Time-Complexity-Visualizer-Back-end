const analyzeComplexity = (ast) => {
  let isRecursive = false;
  let loopCount = 0;
  let maxLoopDepth = 0;

  const traverse = (node, currentDepth) => {
    switch (node.type) {
      case 'ForStatement':
      case 'WhileStatement':
        loopCount++;
        maxLoopDepth = Math.max(maxLoopDepth, currentDepth);
        break;
      case 'CallExpression':
        if (node.callee.name === 'recurse') {
          isRecursive = true;
        }
        break;
      default:
        break;
    }

    // Recursively traverse child nodes
    for (let key in node) {
      if (node[key] && typeof node[key] === 'object') {
        traverse(node[key], currentDepth + 1);
      }
    }
  };

  traverse(ast, 0);

  // Determine the overall complexity
  if (isRecursive) {
    return 'Recursive function detected';
  } else if (loopCount === 0) {
    return 'O(1)';
  } else if (loopCount === 1) {
    return 'O(n)';
  } else if (loopCount === 2) {
    if (maxLoopDepth === 1) {
      return 'O(n^2)';
    } else if (maxLoopDepth === 2) {
      return 'O(n^3)';
    } else {
      return 'O(n^2)'; // Default to quadratic if not sure about depth
    }
  } else {
    return 'Complex analysis required';
  }
};

export { analyzeComplexity };
