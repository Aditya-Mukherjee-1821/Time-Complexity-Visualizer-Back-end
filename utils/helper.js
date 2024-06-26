const analyzeComplexity = (ast) => {
  let complexity = 'O(1)'; // Default complexity
  let isLinear = false;
  let isQuadratic = false;

  const traverse = (node) => {
    switch (node.type) {
      case 'ForStatement':
      case 'WhileStatement':
        isLinear = true;
        break;
      case 'CallExpression':
        if (node.callee.name === 'recurse') {
          isLinear = true; // Simplified check for recursion
        }
        break;
      default:
        break;
    }

    if (node.type === 'ForStatement' || node.type === 'WhileStatement') {
      // Additional logic to detect nested loops, etc.
      // Example: Check for nested loops
      node.body.body.forEach((statement) => {
        if (
          statement.type === 'ForStatement' ||
          statement.type === 'WhileStatement'
        ) {
          isQuadratic = true;
        }
      });
    }

    for (let key in node) {
      if (node[key] && typeof node[key] === 'object') {
        traverse(node[key]);
      }
    }
  };

  traverse(ast);

  if (isQuadratic) {
    complexity = 'O(n^2)';
  } else if (isLinear) {
    complexity = 'O(n)';
  }

  return complexity;
};

export { analyzeComplexity };
