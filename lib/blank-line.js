'use strict';

module.exports = {
  meta: {
    docs: {
      description: 'Require a blank line before code blocks',
      category: 'Stylistic Issues',
      recommended: false
    },
    fixable: 'whitespace',
    schema: []
  },

  create(context) {
    var sourceCode = context.getSourceCode();

    function check(node) {
      if (node.body.length < 2) {
        return;
      }
      node.body.reduce(function(prev, next) {
        var firstEmptyLine = null;
        var nextLine = prev.loc.end.line + 1;
        var comments = sourceCode.getCommentsAfter(prev);

        for (var i = 0; i < comments.length; i++) {
          var comment = comments[i];

          if (comment.loc.start.line > nextLine) {
            firstEmptyLine = nextLine;
            break;
          }

          nextLine = comment.loc.end.line + 1;
        }

        if (firstEmptyLine === null && next.loc.start.line > nextLine) {
          firstEmptyLine = nextLine;
        }

        if (
          firstEmptyLine === null &&
          (prev.loc.end.line - prev.loc.start.line > 0 ||
            next.loc.end.line - next.loc.start.line > 0 ||
            prev.type !== next.type)
        ) {
          context.report({
            node: node,
            loc: {line: next.loc.start.line, column: next.loc.start.column},
            message: 'there must be at least one blank line before code blocks.',
            fix: function fix(fixer) {
              const leadingComments = sourceCode.getCommentsBefore(next);
              var commentIndex = -1;
              for (var i = 0; i < leadingComments.length; i++) {
                if (leadingComments[i].loc.end.line > prev.loc.end.line) {
                  commentIndex = i;
                  break;
                }
              }
              if (leadingComments && commentIndex > 0) {
                return fixer.insertTextBefore(leadingComments[commentIndex], '\n');
              } else {
                return fixer.insertTextBefore(next, '\n');
              }
            }
          });
        }

        return next;
      });
    }

    return {
      'Program:exit': check,
      'ClassBody:exit': check
    };
  }
};
