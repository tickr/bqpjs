import rules from './rules'
import getTokenize from './tokenize'
import createRpn from './create-rpn'
import createTree from './create-tree'

const defaultOperation = 'AND'

let selectedRules = null;
let tokenize = null;
setRules(['and', 'plus', 'or', 'tilde', 'not', 'minus', 'openParen', 'closeParen', 'quote', 'space']);

export function setRules(ruleNames) {
  selectedRules = ruleNames.filter((name)=>name in rules).map((name)=>rules[name])
  tokenize = getTokenize(selectedRules, defaultOperation);
}

export function parse(searchStr) {
  let tokens = tokenize(searchStr)

  let rpn = createRpn(tokens)
  let tree = createTree(rpn)

  return {
    // tokens aren't really a part of the interface, but I'm exposing them
    // to make it easier to see what is happening
    _tokens: tokens,
    rpn: rpn,
    tree: tree
  }
}
