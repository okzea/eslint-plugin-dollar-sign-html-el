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
        if (
          node.id.type === 'Identifier'
          && !node.id.name.startsWith('$')
          && (isHTMLElement(node.init) || isHTMLElementCollection(node.init))
        ) {
          const elementType = isHTMLElement(node.init) ? 'element' : 'collection';
          const expectedPrefix = elementType === 'element' ? '$' : '$$';

          context.report({
            node,
            message: `Variable representing HTML ${elementType} should start with ${expectedPrefix} prefix`,
          });
        }
      },
    };
  },
};
