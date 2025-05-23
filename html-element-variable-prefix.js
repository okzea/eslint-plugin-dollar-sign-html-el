const isHTMLElement = (node) => (
  node
    && node.type === 'CallExpression'
    && node.callee.property
    && node.callee.property.name === 'createElement'
    && node.callee.object
    && node.callee.object.name === 'document'
);

const isHTMLElementCollection = (node) => (
  node
    && node.type === 'CallExpression'
    && node.callee.property
    && node.callee.property.name === 'querySelectorAll'
);

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce $ prefix for variable names representing HTML elements and $$ prefix for HTML element collections',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    return {
      VariableDeclarator(node) {
        if (node.id.type === 'Identifier' && node.init) {
          const variableName = node.id.name;
          const isElement = isHTMLElement(node.init);
          const isCollection = isHTMLElementCollection(node.init);

          if (isElement) {
            if (!variableName.startsWith('$') || variableName.startsWith('$$')) {
              context.report({
                node,
                message: 'Variable representing HTML element should start with $ prefix',
              });
            }
          } else if (isCollection) {
            if (!variableName.startsWith('$$')) {
              context.report({
                node,
                message: 'Variable representing HTML collection should start with $$ prefix',
              });
            }
          }
        }
      },
    };
  },
};
