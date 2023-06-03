(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/vendor"],{

/***/ "./node_modules/riot/riot.esm.js":
/*!***************************************!*\
  !*** ./node_modules/riot/riot.esm.js ***!
  \***************************************/
/*! exports provided: __, component, install, mount, pure, register, uninstall, unmount, unregister, version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__", function() { return __; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "component", function() { return component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mount", function() { return mount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pure", function() { return pure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uninstall", function() { return uninstall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmount", function() { return unmount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregister", function() { return unregister; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* Riot v4.14.0, @license MIT */
/**
 * Convert a string from camel case to dash-case
 * @param   {string} string - probably a component tag name
 * @returns {string} component name normalized
 */
function camelToDashCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
/**
 * Convert a string containing dashes to camel case
 * @param   {string} string - input string
 * @returns {string} my-string -> myString
 */

function dashToCamelCase(string) {
  return string.replace(/-(\w)/g, (_, c) => c.toUpperCase());
}

/**
 * Get all the element attributes as object
 * @param   {HTMLElement} element - DOM node we want to parse
 * @returns {Object} all the attributes found as a key value pairs
 */

function DOMattributesToObject(element) {
  return Array.from(element.attributes).reduce((acc, attribute) => {
    acc[dashToCamelCase(attribute.name)] = attribute.value;
    return acc;
  }, {});
}
/**
 * Move all the child nodes from a source tag to another
 * @param   {HTMLElement} source - source node
 * @param   {HTMLElement} target - target node
 * @returns {undefined} it's a void method ¯\_(ツ)_/¯
 */
// Ignore this helper because it's needed only for svg tags

function moveChildren(source, target) {
  if (source.firstChild) {
    target.appendChild(source.firstChild);
    moveChildren(source, target);
  }
}
/**
 * Remove the child nodes from any DOM node
 * @param   {HTMLElement} node - target node
 * @returns {undefined}
 */

function cleanNode(node) {
  clearChildren(node.childNodes);
}
/**
 * Clear multiple children in a node
 * @param   {HTMLElement[]} children - direct children nodes
 * @returns {undefined}
 */

function clearChildren(children) {
  Array.from(children).forEach(removeNode);
}
/**
 * Remove a node from the DOM
 * @param   {HTMLElement} node - target node
 * @returns {undefined}
 */

function removeNode(node) {
  const {
    parentNode
  } = node;
  if (node.remove) node.remove();
  /* istanbul ignore else */
  else if (parentNode) parentNode.removeChild(node);
}

const EACH = 0;
const IF = 1;
const SIMPLE = 2;
const TAG = 3;
const SLOT = 4;
var bindingTypes = {
  EACH,
  IF,
  SIMPLE,
  TAG,
  SLOT
};

const ATTRIBUTE = 0;
const EVENT = 1;
const TEXT = 2;
const VALUE = 3;
var expressionTypes = {
  ATTRIBUTE,
  EVENT,
  TEXT,
  VALUE
};

/**
 * Create the template meta object in case of <template> fragments
 * @param   {TemplateChunk} componentTemplate - template chunk object
 * @returns {Object} the meta property that will be passed to the mount function of the TemplateChunk
 */
function createTemplateMeta(componentTemplate) {
  const fragment = componentTemplate.dom.cloneNode(true);
  return {
    avoidDOMInjection: true,
    fragment,
    children: Array.from(fragment.childNodes)
  };
}

const {
  indexOf,
  slice
} = [];

const append = (get, parent, children, start, end, before) => {
  const isSelect = ('selectedIndex' in parent);
  let noSelection = isSelect;

  while (start < end) {
    const child = get(children[start], 1);
    parent.insertBefore(child, before);

    if (isSelect && noSelection && child.selected) {
      noSelection = !noSelection;
      let {
        selectedIndex
      } = parent;
      parent.selectedIndex = selectedIndex < 0 ? start : indexOf.call(parent.querySelectorAll('option'), child);
    }

    start++;
  }
};
const eqeq = (a, b) => a == b;
const identity = O => O;
const indexOf$1 = (moreNodes, moreStart, moreEnd, lessNodes, lessStart, lessEnd, compare) => {
  const length = lessEnd - lessStart;
  /* istanbul ignore if */

  if (length < 1) return -1;

  while (moreEnd - moreStart >= length) {
    let m = moreStart;
    let l = lessStart;

    while (m < moreEnd && l < lessEnd && compare(moreNodes[m], lessNodes[l])) {
      m++;
      l++;
    }

    if (l === lessEnd) return moreStart;
    moreStart = m + 1;
  }

  return -1;
};
const isReversed = (futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare) => {
  while (currentStart < currentEnd && compare(currentNodes[currentStart], futureNodes[futureEnd - 1])) {
    currentStart++;
    futureEnd--;
  }
  return futureEnd === 0;
};
const next = (get, list, i, length, before) => i < length ? get(list[i], 0) : 0 < i ? get(list[i - 1], -0).nextSibling : before;
const remove = (get, children, start, end) => {
  while (start < end) drop(get(children[start++], -1));
}; // - - - - - - - - - - - - - - - - - - -
// diff related constants and utilities
// - - - - - - - - - - - - - - - - - - -

const DELETION = -1;
const INSERTION = 1;
const SKIP = 0;
const SKIP_OND = 50;

const HS = (futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges) => {
  let k = 0;
  /* istanbul ignore next */

  let minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
  const link = Array(minLen++);
  const tresh = Array(minLen);
  tresh[0] = -1;

  for (let i = 1; i < minLen; i++) tresh[i] = currentEnd;

  const nodes = currentNodes.slice(currentStart, currentEnd);

  for (let i = futureStart; i < futureEnd; i++) {
    const index = nodes.indexOf(futureNodes[i]);

    if (-1 < index) {
      const idxInOld = index + currentStart;
      k = findK(tresh, minLen, idxInOld);
      /* istanbul ignore else */

      if (-1 < k) {
        tresh[k] = idxInOld;
        link[k] = {
          newi: i,
          oldi: idxInOld,
          prev: link[k - 1]
        };
      }
    }
  }

  k = --minLen;
  --currentEnd;

  while (tresh[k] > currentEnd) --k;

  minLen = currentChanges + futureChanges - k;
  const diff = Array(minLen);
  let ptr = link[k];
  --futureEnd;

  while (ptr) {
    const {
      newi,
      oldi
    } = ptr;

    while (futureEnd > newi) {
      diff[--minLen] = INSERTION;
      --futureEnd;
    }

    while (currentEnd > oldi) {
      diff[--minLen] = DELETION;
      --currentEnd;
    }

    diff[--minLen] = SKIP;
    --futureEnd;
    --currentEnd;
    ptr = ptr.prev;
  }

  while (futureEnd >= futureStart) {
    diff[--minLen] = INSERTION;
    --futureEnd;
  }

  while (currentEnd >= currentStart) {
    diff[--minLen] = DELETION;
    --currentEnd;
  }

  return diff;
}; // this is pretty much the same petit-dom code without the delete map part
// https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L556-L561


const OND = (futureNodes, futureStart, rows, currentNodes, currentStart, cols, compare) => {
  const length = rows + cols;
  const v = [];
  let d, k, r, c, pv, cv, pd;

  outer: for (d = 0; d <= length; d++) {
    /* istanbul ignore if */
    if (d > SKIP_OND) return null;
    pd = d - 1;
    /* istanbul ignore next */

    pv = d ? v[d - 1] : [0, 0];
    cv = v[d] = [];

    for (k = -d; k <= d; k += 2) {
      if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
        c = pv[pd + k + 1];
      } else {
        c = pv[pd + k - 1] + 1;
      }

      r = c - k;

      while (c < cols && r < rows && compare(currentNodes[currentStart + c], futureNodes[futureStart + r])) {
        c++;
        r++;
      }

      if (c === cols && r === rows) {
        break outer;
      }

      cv[d + k] = c;
    }
  }

  const diff = Array(d / 2 + length / 2);
  let diffIdx = diff.length - 1;

  for (d = v.length - 1; d >= 0; d--) {
    while (c > 0 && r > 0 && compare(currentNodes[currentStart + c - 1], futureNodes[futureStart + r - 1])) {
      // diagonal edge = equality
      diff[diffIdx--] = SKIP;
      c--;
      r--;
    }

    if (!d) break;
    pd = d - 1;
    /* istanbul ignore next */

    pv = d ? v[d - 1] : [0, 0];
    k = c - r;

    if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
      // vertical edge = insertion
      r--;
      diff[diffIdx--] = INSERTION;
    } else {
      // horizontal edge = deletion
      c--;
      diff[diffIdx--] = DELETION;
    }
  }

  return diff;
};

const applyDiff = (diff, get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before) => {
  const live = [];
  const length = diff.length;
  let currentIndex = currentStart;
  let i = 0;

  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        futureStart++;
        currentIndex++;
        break;

      case INSERTION:
        // TODO: bulk appends for sequential nodes
        live.push(futureNodes[futureStart]);
        append(get, parentNode, futureNodes, futureStart++, futureStart, currentIndex < currentLength ? get(currentNodes[currentIndex], 0) : before);
        break;

      case DELETION:
        currentIndex++;
        break;
    }
  }

  i = 0;

  while (i < length) {
    switch (diff[i++]) {
      case SKIP:
        currentStart++;
        break;

      case DELETION:
        // TODO: bulk removes for sequential nodes
        if (-1 < live.indexOf(currentNodes[currentStart])) currentStart++;else remove(get, currentNodes, currentStart++, currentStart);
        break;
    }
  }
};

const findK = (ktr, length, j) => {
  let lo = 1;
  let hi = length;

  while (lo < hi) {
    const mid = (lo + hi) / 2 >>> 0;
    if (j < ktr[mid]) hi = mid;else lo = mid + 1;
  }

  return lo;
};

const smartDiff = (get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before) => {
  applyDiff(OND(futureNodes, futureStart, futureChanges, currentNodes, currentStart, currentChanges, compare) || HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges), get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before);
};

const drop = node => (node.remove || dropChild).call(node);

function dropChild() {
  const {
    parentNode
  } = this;
  /* istanbul ignore else */

  if (parentNode) parentNode.removeChild(this);
}

/*! (c) 2018 Andrea Giammarchi (ISC) */

const domdiff = (parentNode, // where changes happen
currentNodes, // Array of current items/nodes
futureNodes, // Array of future items/nodes
options // optional object with one of the following properties
//  before: domNode
//  compare(generic, generic) => true if same generic
//  node(generic) => Node
) => {
  if (!options) options = {};
  const compare = options.compare || eqeq;
  const get = options.node || identity;
  const before = options.before == null ? null : get(options.before, 0);
  const currentLength = currentNodes.length;
  let currentEnd = currentLength;
  let currentStart = 0;
  let futureEnd = futureNodes.length;
  let futureStart = 0; // common prefix

  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentStart], futureNodes[futureStart])) {
    currentStart++;
    futureStart++;
  } // common suffix


  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])) {
    currentEnd--;
    futureEnd--;
  }

  const currentSame = currentStart === currentEnd;
  const futureSame = futureStart === futureEnd; // same list

  if (currentSame && futureSame) return futureNodes; // only stuff to add

  if (currentSame && futureStart < futureEnd) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentStart, currentLength, before));
    return futureNodes;
  } // only stuff to remove


  if (futureSame && currentStart < currentEnd) {
    remove(get, currentNodes, currentStart, currentEnd);
    return futureNodes;
  }

  const currentChanges = currentEnd - currentStart;
  const futureChanges = futureEnd - futureStart;
  let i = -1; // 2 simple indels: the shortest sequence is a subsequence of the longest

  if (currentChanges < futureChanges) {
    i = indexOf$1(futureNodes, futureStart, futureEnd, currentNodes, currentStart, currentEnd, compare); // inner diff

    if (-1 < i) {
      append(get, parentNode, futureNodes, futureStart, i, get(currentNodes[currentStart], 0));
      append(get, parentNode, futureNodes, i + currentChanges, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
      return futureNodes;
    }
  }
  /* istanbul ignore else */
  else if (futureChanges < currentChanges) {
      i = indexOf$1(currentNodes, currentStart, currentEnd, futureNodes, futureStart, futureEnd, compare); // outer diff

      if (-1 < i) {
        remove(get, currentNodes, currentStart, i);
        remove(get, currentNodes, i + futureChanges, currentEnd);
        return futureNodes;
      }
    } // common case with one replacement for many nodes
  // or many nodes replaced for a single one

  /* istanbul ignore else */


  if (currentChanges < 2 || futureChanges < 2) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, get(currentNodes[currentStart], 0));
    remove(get, currentNodes, currentStart, currentEnd);
    return futureNodes;
  } // the half match diff part has been skipped in petit-dom
  // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L391-L397
  // accordingly, I think it's safe to skip in here too
  // if one day it'll come out like the speediest thing ever to do
  // then I might add it in here too
  // Extra: before going too fancy, what about reversed lists ?
  //        This should bail out pretty quickly if that's not the case.


  if (currentChanges === futureChanges && isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare)) {
    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
    return futureNodes;
  } // last resort through a smart diff


  smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before);
  return futureNodes;
};

/**
 * Quick type checking
 * @param   {*} element - anything
 * @param   {string} type - type definition
 * @returns {boolean} true if the type corresponds
 */
function checkType(element, type) {
  return typeof element === type;
}
/**
 * Check if an element is part of an svg
 * @param   {HTMLElement}  el - element to check
 * @returns {boolean} true if we are in an svg context
 */

function isSvg(el) {
  const owner = el.ownerSVGElement;
  return !!owner || owner === null;
}
/**
 * Check if an element is a template tag
 * @param   {HTMLElement}  el - element to check
 * @returns {boolean} true if it's a <template>
 */

function isTemplate(el) {
  return !isNil(el.content);
}
/**
 * Check that will be passed if its argument is a function
 * @param   {*} value - value to check
 * @returns {boolean} - true if the value is a function
 */

function isFunction(value) {
  return checkType(value, 'function');
}
/**
 * Check if a value is a Boolean
 * @param   {*}  value - anything
 * @returns {boolean} true only for the value is a boolean
 */

function isBoolean(value) {
  return checkType(value, 'boolean');
}
/**
 * Check if a value is an Object
 * @param   {*}  value - anything
 * @returns {boolean} true only for the value is an object
 */

function isObject(value) {
  return !isNil(value) && checkType(value, 'object');
}
/**
 * Check if a value is null or undefined
 * @param   {*}  value - anything
 * @returns {boolean} true only for the 'undefined' and 'null' types
 */

function isNil(value) {
  return value === null || value === undefined;
}

const UNMOUNT_SCOPE = Symbol('unmount');
const EachBinding = Object.seal({
  // dynamic binding properties
  // childrenMap: null,
  // node: null,
  // root: null,
  // condition: null,
  // evaluate: null,
  // template: null,
  // isTemplateTag: false,
  nodes: [],

  // getKey: null,
  // indexName: null,
  // itemName: null,
  // afterPlaceholder: null,
  // placeholder: null,
  // API methods
  mount(scope, parentScope) {
    return this.update(scope, parentScope);
  },

  update(scope, parentScope) {
    const {
      placeholder,
      nodes,
      childrenMap
    } = this;
    const collection = scope === UNMOUNT_SCOPE ? null : this.evaluate(scope);
    const items = collection ? Array.from(collection) : [];
    const parent = placeholder.parentNode; // prepare the diffing

    const {
      newChildrenMap,
      batches,
      futureNodes
    } = createPatch(items, scope, parentScope, this); // patch the DOM only if there are new nodes

    domdiff(parent, nodes, futureNodes, {
      before: placeholder,
      node: patch(Array.from(childrenMap.values()), parentScope)
    }); // trigger the mounts and the updates

    batches.forEach(fn => fn()); // update the children map

    this.childrenMap = newChildrenMap;
    this.nodes = futureNodes;
    return this;
  },

  unmount(scope, parentScope) {
    this.update(UNMOUNT_SCOPE, parentScope);
    return this;
  }

});
/**
 * Patch the DOM while diffing
 * @param   {TemplateChunk[]} redundant - redundant tepmplate chunks
 * @param   {*} parentScope - scope of the parent template
 * @returns {Function} patch function used by domdiff
 */

function patch(redundant, parentScope) {
  return (item, info) => {
    if (info < 0) {
      const element = redundant.pop();

      if (element) {
        const {
          template,
          context
        } = element; // notice that we pass null as last argument because
        // the root node and its children will be removed by domdiff

        template.unmount(context, parentScope, null);
      }
    }

    return item;
  };
}
/**
 * Check whether a template must be filtered from a loop
 * @param   {Function} condition - filter function
 * @param   {Object} context - argument passed to the filter function
 * @returns {boolean} true if this item should be skipped
 */


function mustFilterItem(condition, context) {
  return condition ? Boolean(condition(context)) === false : false;
}
/**
 * Extend the scope of the looped template
 * @param   {Object} scope - current template scope
 * @param   {string} options.itemName - key to identify the looped item in the new context
 * @param   {string} options.indexName - key to identify the index of the looped item
 * @param   {number} options.index - current index
 * @param   {*} options.item - collection item looped
 * @returns {Object} enhanced scope object
 */


function extendScope(scope, _ref) {
  let {
    itemName,
    indexName,
    index,
    item
  } = _ref;
  scope[itemName] = item;
  if (indexName) scope[indexName] = index;
  return scope;
}
/**
 * Loop the current template items
 * @param   {Array} items - expression collection value
 * @param   {*} scope - template scope
 * @param   {*} parentScope - scope of the parent template
 * @param   {EeachBinding} binding - each binding object instance
 * @returns {Object} data
 * @returns {Map} data.newChildrenMap - a Map containing the new children template structure
 * @returns {Array} data.batches - array containing the template lifecycle functions to trigger
 * @returns {Array} data.futureNodes - array containing the nodes we need to diff
 */


function createPatch(items, scope, parentScope, binding) {
  const {
    condition,
    template,
    childrenMap,
    itemName,
    getKey,
    indexName,
    root,
    isTemplateTag
  } = binding;
  const newChildrenMap = new Map();
  const batches = [];
  const futureNodes = [];
  items.forEach((item, index) => {
    const context = extendScope(Object.create(scope), {
      itemName,
      indexName,
      index,
      item
    });
    const key = getKey ? getKey(context) : index;
    const oldItem = childrenMap.get(key);

    if (mustFilterItem(condition, context)) {
      return;
    }

    const componentTemplate = oldItem ? oldItem.template : template.clone();
    const el = oldItem ? componentTemplate.el : root.cloneNode();
    const mustMount = !oldItem;
    const meta = isTemplateTag && mustMount ? createTemplateMeta(componentTemplate) : {};

    if (mustMount) {
      batches.push(() => componentTemplate.mount(el, context, parentScope, meta));
    } else {
      batches.push(() => componentTemplate.update(context, parentScope));
    } // create the collection of nodes to update or to add
    // in case of template tags we need to add all its children nodes


    if (isTemplateTag) {
      const children = meta.children || componentTemplate.children;
      futureNodes.push(...children);
    } else {
      futureNodes.push(el);
    } // delete the old item from the children map


    childrenMap.delete(key); // update the children map

    newChildrenMap.set(key, {
      template: componentTemplate,
      context,
      index
    });
  });
  return {
    newChildrenMap,
    batches,
    futureNodes
  };
}

function create(node, _ref2) {
  let {
    evaluate,
    condition,
    itemName,
    indexName,
    getKey,
    template
  } = _ref2;
  const placeholder = document.createTextNode('');
  const parent = node.parentNode;
  const root = node.cloneNode();
  parent.insertBefore(placeholder, node);
  removeNode(node);
  return Object.assign({}, EachBinding, {
    childrenMap: new Map(),
    node,
    root,
    condition,
    evaluate,
    isTemplateTag: isTemplate(root),
    template: template.createDOM(node),
    getKey,
    indexName,
    itemName,
    placeholder
  });
}

/**
 * Binding responsible for the `if` directive
 */

const IfBinding = Object.seal({
  // dynamic binding properties
  // node: null,
  // evaluate: null,
  // isTemplateTag: false,
  // placeholder: null,
  // template: null,
  // API methods
  mount(scope, parentScope) {
    return this.update(scope, parentScope);
  },

  update(scope, parentScope) {
    const value = !!this.evaluate(scope);
    const mustMount = !this.value && value;
    const mustUnmount = this.value && !value;

    const mount = () => {
      const pristine = this.node.cloneNode();
      this.placeholder.parentNode.insertBefore(pristine, this.placeholder);
      this.template = this.template.clone();
      this.template.mount(pristine, scope, parentScope);
    };

    switch (true) {
      case mustMount:
        mount();
        break;

      case mustUnmount:
        this.unmount(scope);
        break;

      default:
        if (value) this.template.update(scope, parentScope);
    }

    this.value = value;
    return this;
  },

  unmount(scope, parentScope) {
    this.template.unmount(scope, parentScope, true);
    return this;
  }

});
function create$1(node, _ref) {
  let {
    evaluate,
    template
  } = _ref;
  const parent = node.parentNode;
  const placeholder = document.createTextNode('');
  parent.insertBefore(placeholder, node);
  removeNode(node);
  return Object.assign({}, IfBinding, {
    node,
    evaluate,
    placeholder,
    template: template.createDOM(node)
  });
}

/**
 * Throw an error with a descriptive message
 * @param   { string } message - error message
 * @returns { undefined } hoppla.. at this point the program should stop working
 */

function panic(message) {
  throw new Error(message);
}
/**
 * Returns the memoized (cached) function.
 * // borrowed from https://www.30secondsofcode.org/js/s/memoize
 * @param {Function} fn - function to memoize
 * @returns {Function} memoize function
 */

function memoize(fn) {
  const cache = new Map();

  const cached = val => {
    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
  };

  cached.cache = cache;
  return cached;
}
/**
 * Evaluate a list of attribute expressions
 * @param   {Array} attributes - attribute expressions generated by the riot compiler
 * @returns {Object} key value pairs with the result of the computation
 */

function evaluateAttributeExpressions(attributes) {
  return attributes.reduce((acc, attribute) => {
    const {
      value,
      type
    } = attribute;

    switch (true) {
      // spread attribute
      case !attribute.name && type === ATTRIBUTE:
        return Object.assign({}, acc, value);
      // value attribute

      case type === VALUE:
        acc.value = attribute.value;
        break;
      // normal attributes

      default:
        acc[dashToCamelCase(attribute.name)] = attribute.value;
    }

    return acc;
  }, {});
}

const REMOVE_ATTRIBUTE = 'removeAttribute';
const SET_ATTIBUTE = 'setAttribute';
const ElementProto = typeof Element === 'undefined' ? {} : Element.prototype;
const isNativeHtmlProperty = memoize(name => ElementProto.hasOwnProperty(name)); // eslint-disable-line

/**
 * Add all the attributes provided
 * @param   {HTMLElement} node - target node
 * @param   {Object} attributes - object containing the attributes names and values
 * @returns {undefined} sorry it's a void function :(
 */

function setAllAttributes(node, attributes) {
  Object.entries(attributes).forEach((_ref) => {
    let [name, value] = _ref;
    return attributeExpression(node, {
      name
    }, value);
  });
}
/**
 * Remove all the attributes provided
 * @param   {HTMLElement} node - target node
 * @param   {Object} newAttributes - object containing all the new attribute names
 * @param   {Object} oldAttributes - object containing all the old attribute names
 * @returns {undefined} sorry it's a void function :(
 */


function removeAllAttributes(node, newAttributes, oldAttributes) {
  const newKeys = newAttributes ? Object.keys(newAttributes) : [];
  Object.keys(oldAttributes).filter(name => !newKeys.includes(name)).forEach(attribute => node.removeAttribute(attribute));
}
/**
 * This methods handles the DOM attributes updates
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {string} expression.name - attribute name
 * @param   {*} value - new expression value
 * @param   {*} oldValue - the old expression cached value
 * @returns {undefined}
 */


function attributeExpression(node, _ref2, value, oldValue) {
  let {
    name
  } = _ref2;

  // is it a spread operator? {...attributes}
  if (!name) {
    if (oldValue) {
      // remove all the old attributes
      removeAllAttributes(node, value, oldValue);
    } // is the value still truthy?


    if (value) {
      setAllAttributes(node, value);
    }

    return;
  } // handle boolean attributes


  if (!isNativeHtmlProperty(name) && (isBoolean(value) || isObject(value) || isFunction(value))) {
    node[name] = value;
  }

  node[getMethod(value)](name, normalizeValue(name, value));
}
/**
 * Get the attribute modifier method
 * @param   {*} value - if truthy we return `setAttribute` othewise `removeAttribute`
 * @returns {string} the node attribute modifier method name
 */

function getMethod(value) {
  return isNil(value) || value === false || value === '' || isObject(value) || isFunction(value) ? REMOVE_ATTRIBUTE : SET_ATTIBUTE;
}
/**
 * Get the value as string
 * @param   {string} name - attribute name
 * @param   {*} value - user input value
 * @returns {string} input value as string
 */


function normalizeValue(name, value) {
  // be sure that expressions like selected={ true } will be always rendered as selected='selected'
  if (value === true) return name;
  return value;
}

const RE_EVENTS_PREFIX = /^on/;

const getCallbackAndOptions = value => Array.isArray(value) ? value : [value, false]; // see also https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38


const EventListener = {
  handleEvent(event) {
    this[event.type](event);
  }

};
const ListenersWeakMap = new WeakMap();

const createListener = node => {
  const listener = Object.create(EventListener);
  ListenersWeakMap.set(node, listener);
  return listener;
};
/**
 * Set a new event listener
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {string} expression.name - event name
 * @param   {*} value - new expression value
 * @returns {value} the callback just received
 */


function eventExpression(node, _ref, value) {
  let {
    name
  } = _ref;
  const normalizedEventName = name.replace(RE_EVENTS_PREFIX, '');
  const eventListener = ListenersWeakMap.get(node) || createListener(node);
  const [callback, options] = getCallbackAndOptions(value);
  const handler = eventListener[normalizedEventName];
  const mustRemoveEvent = handler && !callback;
  const mustAddEvent = callback && !handler;

  if (mustRemoveEvent) {
    node.removeEventListener(normalizedEventName, eventListener);
  }

  if (mustAddEvent) {
    node.addEventListener(normalizedEventName, eventListener, options);
  }

  eventListener[normalizedEventName] = callback;
}

/**
 * Normalize the user value in order to render a empty string in case of falsy values
 * @param   {*} value - user input value
 * @returns {string} hopefully a string
 */

function normalizeStringValue(value) {
  return isNil(value) ? '' : value;
}

/**
 * Get the the target text node to update or create one from of a comment node
 * @param   {HTMLElement} node - any html element containing childNodes
 * @param   {number} childNodeIndex - index of the text node in the childNodes list
 * @returns {HTMLTextNode} the text node to update
 */

const getTextNode = (node, childNodeIndex) => {
  const target = node.childNodes[childNodeIndex];

  if (target.nodeType === Node.COMMENT_NODE) {
    const textNode = document.createTextNode('');
    node.replaceChild(textNode, target);
    return textNode;
  }

  return target;
};
/**
 * This methods handles a simple text expression update
 * @param   {HTMLElement} node - target node
 * @param   {Object} data - expression object
 * @param   {*} value - new expression value
 * @returns {undefined}
 */

function textExpression(node, data, value) {
  node.data = normalizeStringValue(value);
}

/**
 * This methods handles the input fileds value updates
 * @param   {HTMLElement} node - target node
 * @param   {Object} expression - expression object
 * @param   {*} value - new expression value
 * @returns {undefined}
 */

function valueExpression(node, expression, value) {
  node.value = normalizeStringValue(value);
}

var expressions = {
  [ATTRIBUTE]: attributeExpression,
  [EVENT]: eventExpression,
  [TEXT]: textExpression,
  [VALUE]: valueExpression
};

const Expression = Object.seal({
  // Static props
  // node: null,
  // value: null,
  // API methods

  /**
   * Mount the expression evaluating its initial value
   * @param   {*} scope - argument passed to the expression to evaluate its current values
   * @returns {Expression} self
   */
  mount(scope) {
    // hopefully a pure function
    this.value = this.evaluate(scope); // IO() DOM updates

    apply(this, this.value);
    return this;
  },

  /**
   * Update the expression if its value changed
   * @param   {*} scope - argument passed to the expression to evaluate its current values
   * @returns {Expression} self
   */
  update(scope) {
    // pure function
    const value = this.evaluate(scope);

    if (this.value !== value) {
      // IO() DOM updates
      apply(this, value);
      this.value = value;
    }

    return this;
  },

  /**
   * Expression teardown method
   * @returns {Expression} self
   */
  unmount() {
    // unmount only the event handling expressions
    if (this.type === EVENT) apply(this, null);
    return this;
  }

});
/**
 * IO() function to handle the DOM updates
 * @param {Expression} expression - expression object
 * @param {*} value - current expression value
 * @returns {undefined}
 */

function apply(expression, value) {
  return expressions[expression.type](expression.node, expression, value, expression.value);
}

function create$2(node, data) {
  return Object.assign({}, Expression, data, {
    node: data.type === TEXT ? getTextNode(node, data.childNodeIndex) : node
  });
}

/**
 * Create a flat object having as keys a list of methods that if dispatched will propagate
 * on the whole collection
 * @param   {Array} collection - collection to iterate
 * @param   {Array<string>} methods - methods to execute on each item of the collection
 * @param   {*} context - context returned by the new methods created
 * @returns {Object} a new object to simplify the the nested methods dispatching
 */
function flattenCollectionMethods(collection, methods, context) {
  return methods.reduce((acc, method) => {
    return Object.assign({}, acc, {
      [method]: scope => {
        return collection.map(item => item[method](scope)) && context;
      }
    });
  }, {});
}

function create$3(node, _ref) {
  let {
    expressions
  } = _ref;
  return Object.assign({}, flattenCollectionMethods(expressions.map(expression => create$2(node, expression)), ['mount', 'update', 'unmount']));
}

// Riot.js constants that can be used accross more modules
const COMPONENTS_IMPLEMENTATION_MAP = new Map(),
      DOM_COMPONENT_INSTANCE_PROPERTY = Symbol('riot-component'),
      PLUGINS_SET = new Set(),
      IS_DIRECTIVE = 'is',
      VALUE_ATTRIBUTE = 'value',
      MOUNT_METHOD_KEY = 'mount',
      UPDATE_METHOD_KEY = 'update',
      UNMOUNT_METHOD_KEY = 'unmount',
      SHOULD_UPDATE_KEY = 'shouldUpdate',
      ON_BEFORE_MOUNT_KEY = 'onBeforeMount',
      ON_MOUNTED_KEY = 'onMounted',
      ON_BEFORE_UPDATE_KEY = 'onBeforeUpdate',
      ON_UPDATED_KEY = 'onUpdated',
      ON_BEFORE_UNMOUNT_KEY = 'onBeforeUnmount',
      ON_UNMOUNTED_KEY = 'onUnmounted',
      PROPS_KEY = 'props',
      STATE_KEY = 'state',
      SLOTS_KEY = 'slots',
      ROOT_KEY = 'root',
      IS_PURE_SYMBOL = Symbol.for('pure'),
      PARENT_KEY_SYMBOL = Symbol('parent'),
      ATTRIBUTES_KEY_SYMBOL = Symbol('attributes'),
      TEMPLATE_KEY_SYMBOL = Symbol('template');

var globals = /*#__PURE__*/Object.freeze({
  __proto__: null,
  COMPONENTS_IMPLEMENTATION_MAP: COMPONENTS_IMPLEMENTATION_MAP,
  DOM_COMPONENT_INSTANCE_PROPERTY: DOM_COMPONENT_INSTANCE_PROPERTY,
  PLUGINS_SET: PLUGINS_SET,
  IS_DIRECTIVE: IS_DIRECTIVE,
  VALUE_ATTRIBUTE: VALUE_ATTRIBUTE,
  MOUNT_METHOD_KEY: MOUNT_METHOD_KEY,
  UPDATE_METHOD_KEY: UPDATE_METHOD_KEY,
  UNMOUNT_METHOD_KEY: UNMOUNT_METHOD_KEY,
  SHOULD_UPDATE_KEY: SHOULD_UPDATE_KEY,
  ON_BEFORE_MOUNT_KEY: ON_BEFORE_MOUNT_KEY,
  ON_MOUNTED_KEY: ON_MOUNTED_KEY,
  ON_BEFORE_UPDATE_KEY: ON_BEFORE_UPDATE_KEY,
  ON_UPDATED_KEY: ON_UPDATED_KEY,
  ON_BEFORE_UNMOUNT_KEY: ON_BEFORE_UNMOUNT_KEY,
  ON_UNMOUNTED_KEY: ON_UNMOUNTED_KEY,
  PROPS_KEY: PROPS_KEY,
  STATE_KEY: STATE_KEY,
  SLOTS_KEY: SLOTS_KEY,
  ROOT_KEY: ROOT_KEY,
  IS_PURE_SYMBOL: IS_PURE_SYMBOL,
  PARENT_KEY_SYMBOL: PARENT_KEY_SYMBOL,
  ATTRIBUTES_KEY_SYMBOL: ATTRIBUTES_KEY_SYMBOL,
  TEMPLATE_KEY_SYMBOL: TEMPLATE_KEY_SYMBOL
});

function extendParentScope(attributes, scope, parentScope) {
  if (!attributes || !attributes.length) return parentScope;
  const expressions = attributes.map(attr => Object.assign({}, attr, {
    value: attr.evaluate(scope)
  }));
  return Object.assign(Object.create(parentScope || null), evaluateAttributeExpressions(expressions));
} // this function is only meant to fix an edge case
// https://github.com/riot/riot/issues/2842


const getRealParent = (scope, parentScope) => scope[PARENT_KEY_SYMBOL] || parentScope;

const SlotBinding = Object.seal({
  // dynamic binding properties
  // node: null,
  // name: null,
  attributes: [],

  // template: null,
  getTemplateScope(scope, parentScope) {
    return extendParentScope(this.attributes, scope, parentScope);
  },

  // API methods
  mount(scope, parentScope) {
    const templateData = scope.slots ? scope.slots.find((_ref) => {
      let {
        id
      } = _ref;
      return id === this.name;
    }) : false;
    const {
      parentNode
    } = this.node;
    const realParent = getRealParent(scope, parentScope);
    this.template = templateData && create$6(templateData.html, templateData.bindings).createDOM(parentNode);

    if (this.template) {
      this.template.mount(this.node, this.getTemplateScope(scope, realParent), realParent);
      this.template.children = moveSlotInnerContent(this.node);
    }

    removeNode(this.node);
    return this;
  },

  update(scope, parentScope) {
    if (this.template) {
      const realParent = getRealParent(scope, parentScope);
      this.template.update(this.getTemplateScope(scope, realParent), realParent);
    }

    return this;
  },

  unmount(scope, parentScope, mustRemoveRoot) {
    if (this.template) {
      this.template.unmount(this.getTemplateScope(scope, parentScope), null, mustRemoveRoot);
    }

    return this;
  }

});
/**
 * Move the inner content of the slots outside of them
 * @param   {HTMLNode} slot - slot node
 * @param   {HTMLElement} children - array to fill with the child nodes detected
 * @returns {HTMLElement[]} list of the node moved
 */

function moveSlotInnerContent(slot, children) {
  if (children === void 0) {
    children = [];
  }

  const child = slot.firstChild;

  if (child) {
    slot.parentNode.insertBefore(child, slot);
    return [child, ...moveSlotInnerContent(slot)];
  }

  return children;
}
/**
 * Create a single slot binding
 * @param   {HTMLElement} node - slot node
 * @param   {string} options.name - slot id
 * @returns {Object} Slot binding object
 */


function createSlot(node, _ref2) {
  let {
    name,
    attributes
  } = _ref2;
  return Object.assign({}, SlotBinding, {
    attributes,
    node,
    name
  });
}

/**
 * Create a new tag object if it was registered before, otherwise fallback to the simple
 * template chunk
 * @param   {Function} component - component factory function
 * @param   {Array<Object>} slots - array containing the slots markup
 * @param   {Array} attributes - dynamic attributes that will be received by the tag element
 * @returns {TagImplementation|TemplateChunk} a tag implementation or a template chunk as fallback
 */

function getTag(component, slots, attributes) {
  if (slots === void 0) {
    slots = [];
  }

  if (attributes === void 0) {
    attributes = [];
  }

  // if this tag was registered before we will return its implementation
  if (component) {
    return component({
      slots,
      attributes
    });
  } // otherwise we return a template chunk


  return create$6(slotsToMarkup(slots), [...slotBindings(slots), {
    // the attributes should be registered as binding
    // if we fallback to a normal template chunk
    expressions: attributes.map(attr => {
      return Object.assign({
        type: ATTRIBUTE
      }, attr);
    })
  }]);
}
/**
 * Merge all the slots bindings into a single array
 * @param   {Array<Object>} slots - slots collection
 * @returns {Array<Bindings>} flatten bindings array
 */


function slotBindings(slots) {
  return slots.reduce((acc, _ref) => {
    let {
      bindings
    } = _ref;
    return acc.concat(bindings);
  }, []);
}
/**
 * Merge all the slots together in a single markup string
 * @param   {Array<Object>} slots - slots collection
 * @returns {string} markup of all the slots in a single string
 */


function slotsToMarkup(slots) {
  return slots.reduce((acc, slot) => {
    return acc + slot.html;
  }, '');
}

const TagBinding = Object.seal({
  // dynamic binding properties
  // node: null,
  // evaluate: null,
  // name: null,
  // slots: null,
  // tag: null,
  // attributes: null,
  // getComponent: null,
  mount(scope) {
    return this.update(scope);
  },

  update(scope, parentScope) {
    const name = this.evaluate(scope); // simple update

    if (name === this.name) {
      this.tag.update(scope);
    } else {
      // unmount the old tag if it exists
      this.unmount(scope, parentScope, true); // mount the new tag

      this.name = name;
      this.tag = getTag(this.getComponent(name), this.slots, this.attributes);
      this.tag.mount(this.node, scope);
    }

    return this;
  },

  unmount(scope, parentScope, keepRootTag) {
    if (this.tag) {
      // keep the root tag
      this.tag.unmount(keepRootTag);
    }

    return this;
  }

});
function create$4(node, _ref2) {
  let {
    evaluate,
    getComponent,
    slots,
    attributes
  } = _ref2;
  return Object.assign({}, TagBinding, {
    node,
    evaluate,
    slots,
    attributes,
    getComponent
  });
}

var bindings = {
  [IF]: create$1,
  [SIMPLE]: create$3,
  [EACH]: create,
  [TAG]: create$4,
  [SLOT]: createSlot
};

/**
 * Text expressions in a template tag will get childNodeIndex value normalized
 * depending on the position of the <template> tag offset
 * @param   {Expression[]} expressions - riot expressions array
 * @param   {number} textExpressionsOffset - offset of the <template> tag
 * @returns {Expression[]} expressions containing the text expressions normalized
 */

function fixTextExpressionsOffset(expressions, textExpressionsOffset) {
  return expressions.map(e => e.type === TEXT ? Object.assign({}, e, {
    childNodeIndex: e.childNodeIndex + textExpressionsOffset
  }) : e);
}
/**
 * Bind a new expression object to a DOM node
 * @param   {HTMLElement} root - DOM node where to bind the expression
 * @param   {Object} binding - binding data
 * @param   {number|null} templateTagOffset - if it's defined we need to fix the text expressions childNodeIndex offset
 * @returns {Binding} Binding object
 */


function create$5(root, binding, templateTagOffset) {
  const {
    selector,
    type,
    redundantAttribute,
    expressions
  } = binding; // find the node to apply the bindings

  const node = selector ? root.querySelector(selector) : root; // remove eventually additional attributes created only to select this node

  if (redundantAttribute) node.removeAttribute(redundantAttribute);
  const bindingExpressions = expressions || []; // init the binding

  return (bindings[type] || bindings[SIMPLE])(node, Object.assign({}, binding, {
    expressions: templateTagOffset && !selector ? fixTextExpressionsOffset(bindingExpressions, templateTagOffset) : bindingExpressions
  }));
}

function createHTMLTree(html, root) {
  const template = isTemplate(root) ? root : document.createElement('template');
  template.innerHTML = html;
  return template.content;
} // for svg nodes we need a bit more work


function createSVGTree(html, container) {
  // create the SVGNode
  const svgNode = container.ownerDocument.importNode(new window.DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`, 'application/xml').documentElement, true);
  return svgNode;
}
/**
 * Create the DOM that will be injected
 * @param {Object} root - DOM node to find out the context where the fragment will be created
 * @param   {string} html - DOM to create as string
 * @returns {HTMLDocumentFragment|HTMLElement} a new html fragment
 */


function createDOMTree(root, html) {
  if (isSvg(root)) return createSVGTree(html, root);
  return createHTMLTree(html, root);
}

/**
 * Inject the DOM tree into a target node
 * @param   {HTMLElement} el - target element
 * @param   {HTMLFragment|SVGElement} dom - dom tree to inject
 * @returns {undefined}
 */

function injectDOM(el, dom) {
  switch (true) {
    case isSvg(el):
      moveChildren(dom, el);
      break;

    case isTemplate(el):
      el.parentNode.replaceChild(dom, el);
      break;

    default:
      el.appendChild(dom);
  }
}

/**
 * Create the Template DOM skeleton
 * @param   {HTMLElement} el - root node where the DOM will be injected
 * @param   {string} html - markup that will be injected into the root node
 * @returns {HTMLFragment} fragment that will be injected into the root node
 */

function createTemplateDOM(el, html) {
  return html && (typeof html === 'string' ? createDOMTree(el, html) : html);
}
/**
 * Template Chunk model
 * @type {Object}
 */


const TemplateChunk = Object.freeze({
  // Static props
  // bindings: null,
  // bindingsData: null,
  // html: null,
  // isTemplateTag: false,
  // fragment: null,
  // children: null,
  // dom: null,
  // el: null,

  /**
   * Create the template DOM structure that will be cloned on each mount
   * @param   {HTMLElement} el - the root node
   * @returns {TemplateChunk} self
   */
  createDOM(el) {
    // make sure that the DOM gets created before cloning the template
    this.dom = this.dom || createTemplateDOM(el, this.html);
    return this;
  },

  // API methods

  /**
   * Attach the template to a DOM node
   * @param   {HTMLElement} el - target DOM node
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @param   {Object} meta - meta properties needed to handle the <template> tags in loops
   * @returns {TemplateChunk} self
   */
  mount(el, scope, parentScope, meta) {
    if (meta === void 0) {
      meta = {};
    }

    if (!el) throw new Error('Please provide DOM node to mount properly your template');
    if (this.el) this.unmount(scope); // <template> tags require a bit more work
    // the template fragment might be already created via meta outside of this call

    const {
      fragment,
      children,
      avoidDOMInjection
    } = meta; // <template> bindings of course can not have a root element
    // so we check the parent node to set the query selector bindings

    const {
      parentNode
    } = children ? children[0] : el;
    const isTemplateTag = isTemplate(el);
    const templateTagOffset = isTemplateTag ? Math.max(Array.from(parentNode.childNodes).indexOf(el), 0) : null;
    this.isTemplateTag = isTemplateTag; // create the DOM if it wasn't created before

    this.createDOM(el);

    if (this.dom) {
      // create the new template dom fragment if it want already passed in via meta
      this.fragment = fragment || this.dom.cloneNode(true);
    } // store root node
    // notice that for template tags the root note will be the parent tag


    this.el = this.isTemplateTag ? parentNode : el; // create the children array only for the <template> fragments

    this.children = this.isTemplateTag ? children || Array.from(this.fragment.childNodes) : null; // inject the DOM into the el only if a fragment is available

    if (!avoidDOMInjection && this.fragment) injectDOM(el, this.fragment); // create the bindings

    this.bindings = this.bindingsData.map(binding => create$5(this.el, binding, templateTagOffset));
    this.bindings.forEach(b => b.mount(scope, parentScope));
    return this;
  },

  /**
   * Update the template with fresh data
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @returns {TemplateChunk} self
   */
  update(scope, parentScope) {
    this.bindings.forEach(b => b.update(scope, parentScope));
    return this;
  },

  /**
   * Remove the template from the node where it was initially mounted
   * @param   {*} scope - template data
   * @param   {*} parentScope - scope of the parent template tag
   * @param   {boolean|null} mustRemoveRoot - if true remove the root element,
   * if false or undefined clean the root tag content, if null don't touch the DOM
   * @returns {TemplateChunk} self
   */
  unmount(scope, parentScope, mustRemoveRoot) {
    if (this.el) {
      this.bindings.forEach(b => b.unmount(scope, parentScope, mustRemoveRoot));

      switch (true) {
        // <template> tags should be treated a bit differently
        // we need to clear their children only if it's explicitly required by the caller
        // via mustRemoveRoot !== null
        case this.children && mustRemoveRoot !== null:
          clearChildren(this.children);
          break;
        // remove the root node only if the mustRemoveRoot === true

        case mustRemoveRoot === true:
          removeNode(this.el);
          break;
        // otherwise we clean the node children

        case mustRemoveRoot !== null:
          cleanNode(this.el);
          break;
      }

      this.el = null;
    }

    return this;
  },

  /**
   * Clone the template chunk
   * @returns {TemplateChunk} a clone of this object resetting the this.el property
   */
  clone() {
    return Object.assign({}, this, {
      el: null
    });
  }

});
/**
 * Create a template chunk wiring also the bindings
 * @param   {string|HTMLElement} html - template string
 * @param   {Array} bindings - bindings collection
 * @returns {TemplateChunk} a new TemplateChunk copy
 */

function create$6(html, bindings) {
  if (bindings === void 0) {
    bindings = [];
  }

  return Object.assign({}, TemplateChunk, {
    html,
    bindingsData: bindings
  });
}

/**
 * Method used to bind expressions to a DOM node
 * @param   {string|HTMLElement} html - your static template html structure
 * @param   {Array} bindings - list of the expressions to bind to update the markup
 * @returns {TemplateChunk} a new TemplateChunk object having the `update`,`mount`, `unmount` and `clone` methods
 *
 * @example
 *
 * riotDOMBindings
 *  .template(
 *   `<div expr0><!----></div><div><p expr1><!----><section expr2></section></p>`,
 *   [
 *     {
 *       selector: '[expr0]',
 *       redundantAttribute: 'expr0',
 *       expressions: [
 *         {
 *           type: expressionTypes.TEXT,
 *           childNodeIndex: 0,
 *           evaluate(scope) {
 *             return scope.time;
 *           },
 *         },
 *       ],
 *     },
 *     {
 *       selector: '[expr1]',
 *       redundantAttribute: 'expr1',
 *       expressions: [
 *         {
 *           type: expressionTypes.TEXT,
 *           childNodeIndex: 0,
 *           evaluate(scope) {
 *             return scope.name;
 *           },
 *         },
 *         {
 *           type: 'attribute',
 *           name: 'style',
 *           evaluate(scope) {
 *             return scope.style;
 *           },
 *         },
 *       ],
 *     },
 *     {
 *       selector: '[expr2]',
 *       redundantAttribute: 'expr2',
 *       type: bindingTypes.IF,
 *       evaluate(scope) {
 *         return scope.isVisible;
 *       },
 *       template: riotDOMBindings.template('hello there'),
 *     },
 *   ]
 * )
 */

var DOMBindings = /*#__PURE__*/Object.freeze({
  __proto__: null,
  template: create$6,
  createBinding: create$5,
  createExpression: create$2,
  bindingTypes: bindingTypes,
  expressionTypes: expressionTypes
});

function noop() {
  return this;
}
/**
 * Autobind the methods of a source object to itself
 * @param   {Object} source - probably a riot tag instance
 * @param   {Array<string>} methods - list of the methods to autobind
 * @returns {Object} the original object received
 */

function autobindMethods(source, methods) {
  methods.forEach(method => {
    source[method] = source[method].bind(source);
  });
  return source;
}
/**
 * Call the first argument received only if it's a function otherwise return it as it is
 * @param   {*} source - anything
 * @returns {*} anything
 */

function callOrAssign(source) {
  return isFunction(source) ? source.prototype && source.prototype.constructor ? new source() : source() : source;
}

/**
 * Helper function to set an immutable property
 * @param   {Object} source - object where the new property will be set
 * @param   {string} key - object key where the new property will be stored
 * @param   {*} value - value of the new property
 * @param   {Object} options - set the propery overriding the default options
 * @returns {Object} - the original object modified
 */
function defineProperty(source, key, value, options) {
  if (options === void 0) {
    options = {};
  }

  /* eslint-disable fp/no-mutating-methods */
  Object.defineProperty(source, key, Object.assign({
    value,
    enumerable: false,
    writable: false,
    configurable: true
  }, options));
  /* eslint-enable fp/no-mutating-methods */

  return source;
}
/**
 * Define multiple properties on a target object
 * @param   {Object} source - object where the new properties will be set
 * @param   {Object} properties - object containing as key pair the key + value properties
 * @param   {Object} options - set the propery overriding the default options
 * @returns {Object} the original object modified
 */

function defineProperties(source, properties, options) {
  Object.entries(properties).forEach((_ref) => {
    let [key, value] = _ref;
    defineProperty(source, key, value, options);
  });
  return source;
}
/**
 * Define default properties if they don't exist on the source object
 * @param   {Object} source - object that will receive the default properties
 * @param   {Object} defaults - object containing additional optional keys
 * @returns {Object} the original object received enhanced
 */

function defineDefaults(source, defaults) {
  Object.entries(defaults).forEach((_ref2) => {
    let [key, value] = _ref2;
    if (!source[key]) source[key] = value;
  });
  return source;
}

/**
 * Converts any DOM node/s to a loopable array
 * @param   { HTMLElement|NodeList } els - single html element or a node list
 * @returns { Array } always a loopable object
 */
function domToArray(els) {
  // can this object be already looped?
  if (!Array.isArray(els)) {
    // is it a node list?
    if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === 'number') return Array.from(els);else // if it's a single node
      // it will be returned as "array" with one single entry
      return [els];
  } // this object could be looped out of the box


  return els;
}

/**
 * Simple helper to find DOM nodes returning them as array like loopable object
 * @param   { string|DOMNodeList } selector - either the query or the DOM nodes to arraify
 * @param   { HTMLElement }        ctx      - context defining where the query will search for the DOM nodes
 * @returns { Array } DOM nodes found as array
 */

function $(selector, ctx) {
  return domToArray(typeof selector === 'string' ? (ctx || document).querySelectorAll(selector) : selector);
}

/**
 * Normalize the return values, in case of a single value we avoid to return an array
 * @param   { Array } values - list of values we want to return
 * @returns { Array|string|boolean } either the whole list of values or the single one found
 * @private
 */

const normalize = values => values.length === 1 ? values[0] : values;
/**
 * Parse all the nodes received to get/remove/check their attributes
 * @param   { HTMLElement|NodeList|Array } els    - DOM node/s to parse
 * @param   { string|Array }               name   - name or list of attributes
 * @param   { string }                     method - method that will be used to parse the attributes
 * @returns { Array|string } result of the parsing in a list or a single value
 * @private
 */


function parseNodes(els, name, method) {
  const names = typeof name === 'string' ? [name] : name;
  return normalize(domToArray(els).map(el => {
    return normalize(names.map(n => el[method](n)));
  }));
}
/**
 * Set any attribute on a single or a list of DOM nodes
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Object }              name  - either the name of the attribute to set
 *                                                 or a list of properties as object key - value
 * @param   { string }                     value - the new value of the attribute (optional)
 * @returns { HTMLElement|NodeList|Array } the original array of elements passed to this function
 *
 * @example
 *
 * import { set } from 'bianco.attr'
 *
 * const img = document.createElement('img')
 *
 * set(img, 'width', 100)
 *
 * // or also
 * set(img, {
 *   width: 300,
 *   height: 300
 * })
 *
 */


function set(els, name, value) {
  const attrs = typeof name === 'object' ? name : {
    [name]: value
  };
  const props = Object.keys(attrs);
  domToArray(els).forEach(el => {
    props.forEach(prop => el.setAttribute(prop, attrs[prop]));
  });
  return els;
}
/**
 * Get any attribute from a single or a list of DOM nodes
 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
 * @param   { string|Array }               name  - name or list of attributes to get
 * @returns { Array|string } list of the attributes found
 *
 * @example
 *
 * import { get } from 'bianco.attr'
 *
 * const img = document.createElement('img')
 *
 * get(img, 'width') // => '200'
 *
 * // or also
 * get(img, ['width', 'height']) // => ['200', '300']
 *
 * // or also
 * get([img1, img2], ['width', 'height']) // => [['200', '300'], ['500', '200']]
 */

function get(els, name) {
  return parseNodes(els, name, 'getAttribute');
}

const CSS_BY_NAME = new Map();
const STYLE_NODE_SELECTOR = 'style[riot]'; // memoized curried function

const getStyleNode = (style => {
  return () => {
    // lazy evaluation:
    // if this function was already called before
    // we return its cached result
    if (style) return style; // create a new style element or use an existing one
    // and cache it internally

    style = $(STYLE_NODE_SELECTOR)[0] || document.createElement('style');
    set(style, 'type', 'text/css');
    /* istanbul ignore next */

    if (!style.parentNode) document.head.appendChild(style);
    return style;
  };
})();
/**
 * Object that will be used to inject and manage the css of every tag instance
 */


var cssManager = {
  CSS_BY_NAME,

  /**
   * Save a tag style to be later injected into DOM
   * @param { string } name - if it's passed we will map the css to a tagname
   * @param { string } css - css string
   * @returns {Object} self
   */
  add(name, css) {
    if (!CSS_BY_NAME.has(name)) {
      CSS_BY_NAME.set(name, css);
      this.inject();
    }

    return this;
  },

  /**
   * Inject all previously saved tag styles into DOM
   * innerHTML seems slow: http://jsperf.com/riot-insert-style
   * @returns {Object} self
   */
  inject() {
    getStyleNode().innerHTML = [...CSS_BY_NAME.values()].join('\n');
    return this;
  },

  /**
   * Remove a tag style from the DOM
   * @param {string} name a registered tagname
   * @returns {Object} self
   */
  remove(name) {
    if (CSS_BY_NAME.has(name)) {
      CSS_BY_NAME.delete(name);
      this.inject();
    }

    return this;
  }

};

/**
 * Function to curry any javascript method
 * @param   {Function}  fn - the target function we want to curry
 * @param   {...[args]} acc - initial arguments
 * @returns {Function|*} it will return a function until the target function
 *                       will receive all of its arguments
 */
function curry(fn) {
  for (var _len = arguments.length, acc = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    acc[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    args = [...acc, ...args];
    return args.length < fn.length ? curry(fn, ...args) : fn(...args);
  };
}

/**
 * Get the tag name of any DOM node
 * @param   {HTMLElement} element - DOM node we want to inspect
 * @returns {string} name to identify this dom node in riot
 */

function getName(element) {
  return get(element, IS_DIRECTIVE) || element.tagName.toLowerCase();
}

const COMPONENT_CORE_HELPERS = Object.freeze({
  // component helpers
  $(selector) {
    return $(selector, this.root)[0];
  },

  $$(selector) {
    return $(selector, this.root);
  }

});
const PURE_COMPONENT_API = Object.freeze({
  [MOUNT_METHOD_KEY]: noop,
  [UPDATE_METHOD_KEY]: noop,
  [UNMOUNT_METHOD_KEY]: noop
});
const COMPONENT_LIFECYCLE_METHODS = Object.freeze({
  [SHOULD_UPDATE_KEY]: noop,
  [ON_BEFORE_MOUNT_KEY]: noop,
  [ON_MOUNTED_KEY]: noop,
  [ON_BEFORE_UPDATE_KEY]: noop,
  [ON_UPDATED_KEY]: noop,
  [ON_BEFORE_UNMOUNT_KEY]: noop,
  [ON_UNMOUNTED_KEY]: noop
});
const MOCKED_TEMPLATE_INTERFACE = Object.assign({}, PURE_COMPONENT_API, {
  clone: noop,
  createDOM: noop
});
/**
 * Evaluate the component properties either from its real attributes or from its initial user properties
 * @param   {HTMLElement} element - component root
 * @param   {Object}  initialProps - initial props
 * @returns {Object} component props key value pairs
 */

function evaluateInitialProps(element, initialProps) {
  if (initialProps === void 0) {
    initialProps = {};
  }

  return Object.assign({}, DOMattributesToObject(element), callOrAssign(initialProps));
}
/**
 * Bind a DOM node to its component object
 * @param   {HTMLElement} node - html node mounted
 * @param   {Object} component - Riot.js component object
 * @returns {Object} the component object received as second argument
 */


const bindDOMNodeToComponentObject = (node, component) => node[DOM_COMPONENT_INSTANCE_PROPERTY] = component;
/**
 * Wrap the Riot.js core API methods using a mapping function
 * @param   {Function} mapFunction - lifting function
 * @returns {Object} an object having the { mount, update, unmount } functions
 */


function createCoreAPIMethods(mapFunction) {
  return [MOUNT_METHOD_KEY, UPDATE_METHOD_KEY, UNMOUNT_METHOD_KEY].reduce((acc, method) => {
    acc[method] = mapFunction(method);
    return acc;
  }, {});
}
/**
 * Factory function to create the component templates only once
 * @param   {Function} template - component template creation function
 * @param   {Object} components - object containing the nested components
 * @returns {TemplateChunk} template chunk object
 */


function componentTemplateFactory(template, components) {
  return template(create$6, expressionTypes, bindingTypes, name => {
    return components[name] || COMPONENTS_IMPLEMENTATION_MAP.get(name);
  });
}
/**
 * Create a pure component
 * @param   {Function} pureFactoryFunction - pure component factory function
 * @param   {Array} options.slots - component slots
 * @param   {Array} options.attributes - component attributes
 * @param   {Array} options.template - template factory function
 * @param   {Array} options.template - template factory function
 * @param   {any} options.props - initial component properties
 * @returns {Object} pure component object
 */


function createPureComponent(pureFactoryFunction, _ref) {
  let {
    slots,
    attributes,
    props,
    css,
    template
  } = _ref;
  if (template) panic('Pure components can not have html');
  if (css) panic('Pure components do not have css');
  const component = defineDefaults(pureFactoryFunction({
    slots,
    attributes,
    props
  }), PURE_COMPONENT_API);
  return createCoreAPIMethods(method => function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // intercept the mount calls to bind the DOM node to the pure object created
    // see also https://github.com/riot/riot/issues/2806
    if (method === MOUNT_METHOD_KEY) {
      const [el] = args;
      bindDOMNodeToComponentObject(el, component);
    }

    component[method](...args);
    return component;
  });
}
/**
 * Create the component interface needed for the @riotjs/dom-bindings tag bindings
 * @param   {string} options.css - component css
 * @param   {Function} options.template - functon that will return the dom-bindings template function
 * @param   {Object} options.exports - component interface
 * @param   {string} options.name - component name
 * @returns {Object} component like interface
 */


function createComponent(_ref2) {
  let {
    css,
    template,
    exports,
    name
  } = _ref2;
  const templateFn = template ? componentTemplateFactory(template, exports ? createSubcomponents(exports.components) : {}) : MOCKED_TEMPLATE_INTERFACE;
  return (_ref3) => {
    let {
      slots,
      attributes,
      props
    } = _ref3;
    // pure components rendering will be managed by the end user
    if (exports && exports[IS_PURE_SYMBOL]) return createPureComponent(exports, {
      slots,
      attributes,
      props,
      css,
      template
    });
    const componentAPI = callOrAssign(exports) || {};
    const component = defineComponent({
      css,
      template: templateFn,
      componentAPI,
      name
    })({
      slots,
      attributes,
      props
    }); // notice that for the components create via tag binding
    // we need to invert the mount (state/parentScope) arguments
    // the template bindings will only forward the parentScope updates
    // and never deal with the component state

    return {
      mount(element, parentScope, state) {
        return component.mount(element, state, parentScope);
      },

      update(parentScope, state) {
        return component.update(state, parentScope);
      },

      unmount(preserveRoot) {
        return component.unmount(preserveRoot);
      }

    };
  };
}
/**
 * Component definition function
 * @param   {Object} implementation - the componen implementation will be generated via compiler
 * @param   {Object} component - the component initial properties
 * @returns {Object} a new component implementation object
 */

function defineComponent(_ref4) {
  let {
    css,
    template,
    componentAPI,
    name
  } = _ref4;
  // add the component css into the DOM
  if (css && name) cssManager.add(name, css);
  return curry(enhanceComponentAPI)(defineProperties( // set the component defaults without overriding the original component API
  defineDefaults(componentAPI, Object.assign({}, COMPONENT_LIFECYCLE_METHODS, {
    [STATE_KEY]: {}
  })), Object.assign({
    // defined during the component creation
    [SLOTS_KEY]: null,
    [ROOT_KEY]: null
  }, COMPONENT_CORE_HELPERS, {
    name,
    css,
    template
  })));
}
/**
 * Create the bindings to update the component attributes
 * @param   {HTMLElement} node - node where we will bind the expressions
 * @param   {Array} attributes - list of attribute bindings
 * @returns {TemplateChunk} - template bindings object
 */

function createAttributeBindings(node, attributes) {
  if (attributes === void 0) {
    attributes = [];
  }

  const expressions = attributes.map(a => create$2(node, a));
  const binding = {};
  return Object.assign(binding, Object.assign({
    expressions
  }, createCoreAPIMethods(method => scope => {
    expressions.forEach(e => e[method](scope));
    return binding;
  })));
}
/**
 * Create the subcomponents that can be included inside a tag in runtime
 * @param   {Object} components - components imported in runtime
 * @returns {Object} all the components transformed into Riot.Component factory functions
 */


function createSubcomponents(components) {
  if (components === void 0) {
    components = {};
  }

  return Object.entries(callOrAssign(components)).reduce((acc, _ref5) => {
    let [key, value] = _ref5;
    acc[camelToDashCase(key)] = createComponent(value);
    return acc;
  }, {});
}
/**
 * Run the component instance through all the plugins set by the user
 * @param   {Object} component - component instance
 * @returns {Object} the component enhanced by the plugins
 */


function runPlugins(component) {
  return [...PLUGINS_SET].reduce((c, fn) => fn(c) || c, component);
}
/**
 * Compute the component current state merging it with its previous state
 * @param   {Object} oldState - previous state object
 * @param   {Object} newState - new state givent to the `update` call
 * @returns {Object} new object state
 */


function computeState(oldState, newState) {
  return Object.assign({}, oldState, callOrAssign(newState));
}
/**
 * Add eventually the "is" attribute to link this DOM node to its css
 * @param {HTMLElement} element - target root node
 * @param {string} name - name of the component mounted
 * @returns {undefined} it's a void function
 */


function addCssHook(element, name) {
  if (getName(element) !== name) {
    set(element, IS_DIRECTIVE, name);
  }
}
/**
 * Component creation factory function that will enhance the user provided API
 * @param   {Object} component - a component implementation previously defined
 * @param   {Array} options.slots - component slots generated via riot compiler
 * @param   {Array} options.attributes - attribute expressions generated via riot compiler
 * @returns {Riot.Component} a riot component instance
 */


function enhanceComponentAPI(component, _ref6) {
  let {
    slots,
    attributes,
    props
  } = _ref6;
  return autobindMethods(runPlugins(defineProperties(Object.create(component), {
    mount(element, state, parentScope) {
      if (state === void 0) {
        state = {};
      }

      this[ATTRIBUTES_KEY_SYMBOL] = createAttributeBindings(element, attributes).mount(parentScope);
      defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, evaluateInitialProps(element, props), evaluateAttributeExpressions(this[ATTRIBUTES_KEY_SYMBOL].expressions))));
      this[STATE_KEY] = computeState(this[STATE_KEY], state);
      this[TEMPLATE_KEY_SYMBOL] = this.template.createDOM(element).clone(); // link this object to the DOM node

      bindDOMNodeToComponentObject(element, this); // add eventually the 'is' attribute

      component.name && addCssHook(element, component.name); // define the root element

      defineProperty(this, ROOT_KEY, element); // define the slots array

      defineProperty(this, SLOTS_KEY, slots); // before mount lifecycle event

      this[ON_BEFORE_MOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]);
      this[PARENT_KEY_SYMBOL] = parentScope; // mount the template

      this[TEMPLATE_KEY_SYMBOL].mount(element, this, parentScope);
      this[ON_MOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      return this;
    },

    update(state, parentScope) {
      if (state === void 0) {
        state = {};
      }

      if (parentScope) {
        this[PARENT_KEY_SYMBOL] = parentScope;
        this[ATTRIBUTES_KEY_SYMBOL].update(parentScope);
      }

      const newProps = evaluateAttributeExpressions(this[ATTRIBUTES_KEY_SYMBOL].expressions);
      if (this[SHOULD_UPDATE_KEY](newProps, this[PROPS_KEY]) === false) return;
      defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, this[PROPS_KEY], newProps)));
      this[STATE_KEY] = computeState(this[STATE_KEY], state);
      this[ON_BEFORE_UPDATE_KEY](this[PROPS_KEY], this[STATE_KEY]);
      this[TEMPLATE_KEY_SYMBOL].update(this, this[PARENT_KEY_SYMBOL]);
      this[ON_UPDATED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      return this;
    },

    unmount(preserveRoot) {
      this[ON_BEFORE_UNMOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]);
      this[ATTRIBUTES_KEY_SYMBOL].unmount(); // if the preserveRoot is null the template html will be left untouched
      // in that case the DOM cleanup will happen differently from a parent node

      this[TEMPLATE_KEY_SYMBOL].unmount(this, this[PARENT_KEY_SYMBOL], preserveRoot === null ? null : !preserveRoot);
      this[ON_UNMOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
      return this;
    }

  })), Object.keys(component).filter(prop => isFunction(component[prop])));
}
/**
 * Component initialization function starting from a DOM node
 * @param   {HTMLElement} element - element to upgrade
 * @param   {Object} initialProps - initial component properties
 * @param   {string} componentName - component id
 * @returns {Object} a new component instance bound to a DOM node
 */

function mountComponent(element, initialProps, componentName) {
  const name = componentName || getName(element);
  if (!COMPONENTS_IMPLEMENTATION_MAP.has(name)) panic(`The component named "${name}" was never registered`);
  const component = COMPONENTS_IMPLEMENTATION_MAP.get(name)({
    props: initialProps
  });
  return component.mount(element);
}

/**
 * Similar to compose but performs from left-to-right function composition.<br/>
 * {@link https://30secondsofcode.org/function#composeright see also}
 * @param   {...[function]} fns) - list of unary function
 * @returns {*} result of the computation
 */
/**
 * Performs right-to-left function composition.<br/>
 * Use Array.prototype.reduce() to perform right-to-left function composition.<br/>
 * The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.<br/>
 * {@link https://30secondsofcode.org/function#compose original source code}
 * @param   {...[function]} fns) - list of unary function
 * @returns {*} result of the computation
 */

function compose() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return fns.reduce((f, g) => function () {
    return f(g(...arguments));
  });
}

const {
  DOM_COMPONENT_INSTANCE_PROPERTY: DOM_COMPONENT_INSTANCE_PROPERTY$1,
  COMPONENTS_IMPLEMENTATION_MAP: COMPONENTS_IMPLEMENTATION_MAP$1,
  PLUGINS_SET: PLUGINS_SET$1
} = globals;
/**
 * Riot public api
 */

/**
 * Register a custom tag by name
 * @param   {string} name - component name
 * @param   {Object} implementation - tag implementation
 * @returns {Map} map containing all the components implementations
 */

function register(name, _ref) {
  let {
    css,
    template,
    exports
  } = _ref;
  if (COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic(`The component "${name}" was already registered`);
  COMPONENTS_IMPLEMENTATION_MAP$1.set(name, createComponent({
    name,
    css,
    template,
    exports
  }));
  return COMPONENTS_IMPLEMENTATION_MAP$1;
}
/**
 * Unregister a riot web component
 * @param   {string} name - component name
 * @returns {Map} map containing all the components implementations
 */

function unregister(name) {
  if (!COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic(`The component "${name}" was never registered`);
  COMPONENTS_IMPLEMENTATION_MAP$1.delete(name);
  cssManager.remove(name);
  return COMPONENTS_IMPLEMENTATION_MAP$1;
}
/**
 * Mounting function that will work only for the components that were globally registered
 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
 * @param   {Object} initialProps - the initial component properties
 * @param   {string} name - optional component name
 * @returns {Array} list of nodes upgraded
 */

function mount(selector, initialProps, name) {
  return $(selector).map(element => mountComponent(element, initialProps, name));
}
/**
 * Sweet unmounting helper function for the DOM node mounted manually by the user
 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
 * @param   {boolean|null} keepRootElement - if true keep the root element
 * @returns {Array} list of nodes unmounted
 */

function unmount(selector, keepRootElement) {
  return $(selector).map(element => {
    if (element[DOM_COMPONENT_INSTANCE_PROPERTY$1]) {
      element[DOM_COMPONENT_INSTANCE_PROPERTY$1].unmount(keepRootElement);
    }

    return element;
  });
}
/**
 * Define a riot plugin
 * @param   {Function} plugin - function that will receive all the components created
 * @returns {Set} the set containing all the plugins installed
 */

function install(plugin) {
  if (!isFunction(plugin)) panic('Plugins must be of type function');
  if (PLUGINS_SET$1.has(plugin)) panic('This plugin was already installed');
  PLUGINS_SET$1.add(plugin);
  return PLUGINS_SET$1;
}
/**
 * Uninstall a riot plugin
 * @param   {Function} plugin - plugin previously installed
 * @returns {Set} the set containing all the plugins installed
 */

function uninstall(plugin) {
  if (!PLUGINS_SET$1.has(plugin)) panic('This plugin was never installed');
  PLUGINS_SET$1.delete(plugin);
  return PLUGINS_SET$1;
}
/**
 * Helper method to create component without relying on the registered ones
 * @param   {Object} implementation - component implementation
 * @returns {Function} function that will allow you to mount a riot component on a DOM node
 */

function component(implementation) {
  return function (el, props, _temp) {
    let {
      slots,
      attributes,
      parentScope
    } = _temp === void 0 ? {} : _temp;
    return compose(c => c.mount(el, parentScope), c => c({
      props,
      slots,
      attributes
    }), createComponent)(implementation);
  };
}
/**
 * Lift a riot component Interface into a pure riot object
 * @param   {Function} func - RiotPureComponent factory function
 * @returns {Function} the lifted original function received as argument
 */

function pure(func) {
  if (!isFunction(func)) panic('riot.pure accepts only arguments of type "function"');
  func[IS_PURE_SYMBOL] = true;
  return func;
}
/** @type {string} current riot version */

const version = 'v4.14.0'; // expose some internal stuff that might be used from external tools

const __ = {
  cssManager,
  DOMBindings,
  createComponent,
  defineComponent,
  globals
};




/***/ }),

/***/ "./node_modules/store/dist/store.legacy.js":
/*!*************************************************!*\
  !*** ./node_modules/store/dist/store.legacy.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var engine = __webpack_require__(/*! ../src/store-engine */ "./node_modules/store/src/store-engine.js")

var storages = __webpack_require__(/*! ../storages/all */ "./node_modules/store/storages/all.js")
var plugins = [__webpack_require__(/*! ../plugins/json2 */ "./node_modules/store/plugins/json2.js")]

module.exports = engine.createStore(storages, plugins)


/***/ }),

/***/ "./node_modules/store/plugins/json2.js":
/*!*********************************************!*\
  !*** ./node_modules/store/plugins/json2.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = json2Plugin

function json2Plugin() {
	__webpack_require__(/*! ./lib/json2 */ "./node_modules/store/plugins/lib/json2.js")
	return {}
}


/***/ }),

/***/ "./node_modules/store/plugins/lib/json2.js":
/*!*************************************************!*\
  !*** ./node_modules/store/plugins/lib/json2.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* eslint-disable */

//  json2.js
//  2016-10-28
//  Public Domain.
//  NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
//  See http://www.JSON.org/js.html
//  This code should be minified before deployment.
//  See http://javascript.crockford.com/jsmin.html

//  USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
//  NOT CONTROL.

//  This file creates a global JSON object containing two methods: stringify
//  and parse. This file provides the ES5 JSON capability to ES3 systems.
//  If a project might run on IE8 or earlier, then this file should be included.
//  This file does nothing on ES5 systems.

//      JSON.stringify(value, replacer, space)
//          value       any JavaScript value, usually an object or array.
//          replacer    an optional parameter that determines how object
//                      values are stringified for objects. It can be a
//                      function or an array of strings.
//          space       an optional parameter that specifies the indentation
//                      of nested structures. If it is omitted, the text will
//                      be packed without extra whitespace. If it is a number,
//                      it will specify the number of spaces to indent at each
//                      level. If it is a string (such as "\t" or "&nbsp;"),
//                      it contains the characters used to indent at each level.
//          This method produces a JSON text from a JavaScript value.
//          When an object value is found, if the object contains a toJSON
//          method, its toJSON method will be called and the result will be
//          stringified. A toJSON method does not serialize: it returns the
//          value represented by the name/value pair that should be serialized,
//          or undefined if nothing should be serialized. The toJSON method
//          will be passed the key associated with the value, and this will be
//          bound to the value.

//          For example, this would serialize Dates as ISO strings.

//              Date.prototype.toJSON = function (key) {
//                  function f(n) {
//                      // Format integers to have at least two digits.
//                      return (n < 10)
//                          ? "0" + n
//                          : n;
//                  }
//                  return this.getUTCFullYear()   + "-" +
//                       f(this.getUTCMonth() + 1) + "-" +
//                       f(this.getUTCDate())      + "T" +
//                       f(this.getUTCHours())     + ":" +
//                       f(this.getUTCMinutes())   + ":" +
//                       f(this.getUTCSeconds())   + "Z";
//              };

//          You can provide an optional replacer method. It will be passed the
//          key and value of each member, with this bound to the containing
//          object. The value that is returned from your method will be
//          serialized. If your method returns undefined, then the member will
//          be excluded from the serialization.

//          If the replacer parameter is an array of strings, then it will be
//          used to select the members to be serialized. It filters the results
//          such that only members with keys listed in the replacer array are
//          stringified.

//          Values that do not have JSON representations, such as undefined or
//          functions, will not be serialized. Such values in objects will be
//          dropped; in arrays they will be replaced with null. You can use
//          a replacer function to replace those with JSON values.

//          JSON.stringify(undefined) returns undefined.

//          The optional space parameter produces a stringification of the
//          value that is filled with line breaks and indentation to make it
//          easier to read.

//          If the space parameter is a non-empty string, then that string will
//          be used for indentation. If the space parameter is a number, then
//          the indentation will be that many spaces.

//          Example:

//          text = JSON.stringify(["e", {pluribus: "unum"}]);
//          // text is '["e",{"pluribus":"unum"}]'

//          text = JSON.stringify(["e", {pluribus: "unum"}], null, "\t");
//          // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

//          text = JSON.stringify([new Date()], function (key, value) {
//              return this[key] instanceof Date
//                  ? "Date(" + this[key] + ")"
//                  : value;
//          });
//          // text is '["Date(---current time---)"]'

//      JSON.parse(text, reviver)
//          This method parses a JSON text to produce an object or array.
//          It can throw a SyntaxError exception.

//          The optional reviver parameter is a function that can filter and
//          transform the results. It receives each of the keys and values,
//          and its return value is used instead of the original value.
//          If it returns what it received, then the structure is not modified.
//          If it returns undefined then the member is deleted.

//          Example:

//          // Parse the text. Values that look like ISO date strings will
//          // be converted to Date objects.

//          myData = JSON.parse(text, function (key, value) {
//              var a;
//              if (typeof value === "string") {
//                  a =
//   /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
//                  if (a) {
//                      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
//                          +a[5], +a[6]));
//                  }
//              }
//              return value;
//          });

//          myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
//              var d;
//              if (typeof value === "string" &&
//                      value.slice(0, 5) === "Date(" &&
//                      value.slice(-1) === ")") {
//                  d = new Date(value.slice(5, -1));
//                  if (d) {
//                      return d;
//                  }
//              }
//              return value;
//          });

//  This is a reference implementation. You are free to copy, modify, or
//  redistribute.

/*jslint
    eval, for, this
*/

/*property
    JSON, apply, call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== "object") {
    JSON = {};
}

(function () {
    "use strict";

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10
            ? "0" + n
            : n;
    }

    function this_value() {
        return this.valueOf();
    }

    if (typeof Date.prototype.toJSON !== "function") {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear() + "-" +
                        f(this.getUTCMonth() + 1) + "-" +
                        f(this.getUTCDate()) + "T" +
                        f(this.getUTCHours()) + ":" +
                        f(this.getUTCMinutes()) + ":" +
                        f(this.getUTCSeconds()) + "Z"
                : null;
        };

        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }

    var gap;
    var indent;
    var meta;
    var rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string)
            ? "\"" + string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + "\""
            : "\"" + string + "\"";
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i;          // The loop counter.
        var k;          // The member key.
        var v;          // The member value.
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === "object" &&
                typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case "string":
            return quote(value);

        case "number":

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value)
                ? String(value)
                : "null";

        case "boolean":
        case "null":

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce "null". The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is "object", we might be dealing with an object or an array or
// null.

        case "object":

// Due to a specification blunder in ECMAScript, typeof null is "object",
// so watch out for that case.

            if (!value) {
                return "null";
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === "[object Array]") {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? "[]"
                    : gap
                        ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
                        : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (
                                gap
                                    ? ": "
                                    : ":"
                            ) + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? "{}"
                : gap
                    ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                    : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== "function") {
        meta = {    // table of character substitutions
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = "";
            indent = "";

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === "string") {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== "function" &&
                    (typeof replacer !== "object" ||
                    typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }

// Make a fake root object containing our value under the key of "".
// Return the result of stringifying the value.

            return str("", {"": value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" +
                            ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with "()" and "new"
// because they can cause invocation, and "=" because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
// replace all simple value tokens with "]" characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or "]" or
// "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

            if (
                rx_one.test(
                    text
                        .replace(rx_two, "@")
                        .replace(rx_three, "]")
                        .replace(rx_four, "")
                )
            ) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The "{" operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval("(" + text + ")");

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return (typeof reviver === "function")
                    ? walk({"": j}, "")
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError("JSON.parse");
        };
    }
}());

/***/ }),

/***/ "./node_modules/store/src/store-engine.js":
/*!************************************************!*\
  !*** ./node_modules/store/src/store-engine.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ./util */ "./node_modules/store/src/util.js")
var slice = util.slice
var pluck = util.pluck
var each = util.each
var bind = util.bind
var create = util.create
var isList = util.isList
var isFunction = util.isFunction
var isObject = util.isObject

module.exports = {
	createStore: createStore
}

var storeAPI = {
	version: '2.0.12',
	enabled: false,
	
	// get returns the value of the given key. If that value
	// is undefined, it returns optionalDefaultValue instead.
	get: function(key, optionalDefaultValue) {
		var data = this.storage.read(this._namespacePrefix + key)
		return this._deserialize(data, optionalDefaultValue)
	},

	// set will store the given value at key and returns value.
	// Calling set with value === undefined is equivalent to calling remove.
	set: function(key, value) {
		if (value === undefined) {
			return this.remove(key)
		}
		this.storage.write(this._namespacePrefix + key, this._serialize(value))
		return value
	},

	// remove deletes the key and value stored at the given key.
	remove: function(key) {
		this.storage.remove(this._namespacePrefix + key)
	},

	// each will call the given callback once for each key-value pair
	// in this store.
	each: function(callback) {
		var self = this
		this.storage.each(function(val, namespacedKey) {
			callback.call(self, self._deserialize(val), (namespacedKey || '').replace(self._namespaceRegexp, ''))
		})
	},

	// clearAll will remove all the stored key-value pairs in this store.
	clearAll: function() {
		this.storage.clearAll()
	},

	// additional functionality that can't live in plugins
	// ---------------------------------------------------

	// hasNamespace returns true if this store instance has the given namespace.
	hasNamespace: function(namespace) {
		return (this._namespacePrefix == '__storejs_'+namespace+'_')
	},

	// createStore creates a store.js instance with the first
	// functioning storage in the list of storage candidates,
	// and applies the the given mixins to the instance.
	createStore: function() {
		return createStore.apply(this, arguments)
	},
	
	addPlugin: function(plugin) {
		this._addPlugin(plugin)
	},
	
	namespace: function(namespace) {
		return createStore(this.storage, this.plugins, namespace)
	}
}

function _warn() {
	var _console = (typeof console == 'undefined' ? null : console)
	if (!_console) { return }
	var fn = (_console.warn ? _console.warn : _console.log)
	fn.apply(_console, arguments)
}

function createStore(storages, plugins, namespace) {
	if (!namespace) {
		namespace = ''
	}
	if (storages && !isList(storages)) {
		storages = [storages]
	}
	if (plugins && !isList(plugins)) {
		plugins = [plugins]
	}

	var namespacePrefix = (namespace ? '__storejs_'+namespace+'_' : '')
	var namespaceRegexp = (namespace ? new RegExp('^'+namespacePrefix) : null)
	var legalNamespaces = /^[a-zA-Z0-9_\-]*$/ // alpha-numeric + underscore and dash
	if (!legalNamespaces.test(namespace)) {
		throw new Error('store.js namespaces can only have alphanumerics + underscores and dashes')
	}
	
	var _privateStoreProps = {
		_namespacePrefix: namespacePrefix,
		_namespaceRegexp: namespaceRegexp,

		_testStorage: function(storage) {
			try {
				var testStr = '__storejs__test__'
				storage.write(testStr, testStr)
				var ok = (storage.read(testStr) === testStr)
				storage.remove(testStr)
				return ok
			} catch(e) {
				return false
			}
		},

		_assignPluginFnProp: function(pluginFnProp, propName) {
			var oldFn = this[propName]
			this[propName] = function pluginFn() {
				var args = slice(arguments, 0)
				var self = this

				// super_fn calls the old function which was overwritten by
				// this mixin.
				function super_fn() {
					if (!oldFn) { return }
					each(arguments, function(arg, i) {
						args[i] = arg
					})
					return oldFn.apply(self, args)
				}

				// Give mixing function access to super_fn by prefixing all mixin function
				// arguments with super_fn.
				var newFnArgs = [super_fn].concat(args)

				return pluginFnProp.apply(self, newFnArgs)
			}
		},

		_serialize: function(obj) {
			return JSON.stringify(obj)
		},

		_deserialize: function(strVal, defaultVal) {
			if (!strVal) { return defaultVal }
			// It is possible that a raw string value has been previously stored
			// in a storage without using store.js, meaning it will be a raw
			// string value instead of a JSON serialized string. By defaulting
			// to the raw string value in case of a JSON parse error, we allow
			// for past stored values to be forwards-compatible with store.js
			var val = ''
			try { val = JSON.parse(strVal) }
			catch(e) { val = strVal }

			return (val !== undefined ? val : defaultVal)
		},
		
		_addStorage: function(storage) {
			if (this.enabled) { return }
			if (this._testStorage(storage)) {
				this.storage = storage
				this.enabled = true
			}
		},

		_addPlugin: function(plugin) {
			var self = this

			// If the plugin is an array, then add all plugins in the array.
			// This allows for a plugin to depend on other plugins.
			if (isList(plugin)) {
				each(plugin, function(plugin) {
					self._addPlugin(plugin)
				})
				return
			}

			// Keep track of all plugins we've seen so far, so that we
			// don't add any of them twice.
			var seenPlugin = pluck(this.plugins, function(seenPlugin) {
				return (plugin === seenPlugin)
			})
			if (seenPlugin) {
				return
			}
			this.plugins.push(plugin)

			// Check that the plugin is properly formed
			if (!isFunction(plugin)) {
				throw new Error('Plugins must be function values that return objects')
			}

			var pluginProperties = plugin.call(this)
			if (!isObject(pluginProperties)) {
				throw new Error('Plugins must return an object of function properties')
			}

			// Add the plugin function properties to this store instance.
			each(pluginProperties, function(pluginFnProp, propName) {
				if (!isFunction(pluginFnProp)) {
					throw new Error('Bad plugin property: '+propName+' from plugin '+plugin.name+'. Plugins should only return functions.')
				}
				self._assignPluginFnProp(pluginFnProp, propName)
			})
		},
		
		// Put deprecated properties in the private API, so as to not expose it to accidential
		// discovery through inspection of the store object.
		
		// Deprecated: addStorage
		addStorage: function(storage) {
			_warn('store.addStorage(storage) is deprecated. Use createStore([storages])')
			this._addStorage(storage)
		}
	}

	var store = create(_privateStoreProps, storeAPI, {
		plugins: []
	})
	store.raw = {}
	each(store, function(prop, propName) {
		if (isFunction(prop)) {
			store.raw[propName] = bind(store, prop)			
		}
	})
	each(storages, function(storage) {
		store._addStorage(storage)
	})
	each(plugins, function(plugin) {
		store._addPlugin(plugin)
	})
	return store
}


/***/ }),

/***/ "./node_modules/store/src/util.js":
/*!****************************************!*\
  !*** ./node_modules/store/src/util.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var assign = make_assign()
var create = make_create()
var trim = make_trim()
var Global = (typeof window !== 'undefined' ? window : global)

module.exports = {
	assign: assign,
	create: create,
	trim: trim,
	bind: bind,
	slice: slice,
	each: each,
	map: map,
	pluck: pluck,
	isList: isList,
	isFunction: isFunction,
	isObject: isObject,
	Global: Global
}

function make_assign() {
	if (Object.assign) {
		return Object.assign
	} else {
		return function shimAssign(obj, props1, props2, etc) {
			for (var i = 1; i < arguments.length; i++) {
				each(Object(arguments[i]), function(val, key) {
					obj[key] = val
				})
			}			
			return obj
		}
	}
}

function make_create() {
	if (Object.create) {
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			return assign.apply(this, [Object.create(obj)].concat(assignArgsList))
		}
	} else {
		function F() {} // eslint-disable-line no-inner-declarations
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			F.prototype = obj
			return assign.apply(this, [new F()].concat(assignArgsList))
		}
	}
}

function make_trim() {
	if (String.prototype.trim) {
		return function trim(str) {
			return String.prototype.trim.call(str)
		}
	} else {
		return function trim(str) {
			return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
		}
	}
}

function bind(obj, fn) {
	return function() {
		return fn.apply(obj, Array.prototype.slice.call(arguments, 0))
	}
}

function slice(arr, index) {
	return Array.prototype.slice.call(arr, index || 0)
}

function each(obj, fn) {
	pluck(obj, function(val, key) {
		fn(val, key)
		return false
	})
}

function map(obj, fn) {
	var res = (isList(obj) ? [] : {})
	pluck(obj, function(v, k) {
		res[k] = fn(v, k)
		return false
	})
	return res
}

function pluck(obj, fn) {
	if (isList(obj)) {
		for (var i=0; i<obj.length; i++) {
			if (fn(obj[i], i)) {
				return obj[i]
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn(obj[key], key)) {
					return obj[key]
				}
			}
		}
	}
}

function isList(val) {
	return (val != null && typeof val != 'function' && typeof val.length == 'number')
}

function isFunction(val) {
	return val && {}.toString.call(val) === '[object Function]'
}

function isObject(val) {
	return val && {}.toString.call(val) === '[object Object]'
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/store/storages/all.js":
/*!********************************************!*\
  !*** ./node_modules/store/storages/all.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [
	// Listed in order of usage preference
	__webpack_require__(/*! ./localStorage */ "./node_modules/store/storages/localStorage.js"),
	__webpack_require__(/*! ./oldFF-globalStorage */ "./node_modules/store/storages/oldFF-globalStorage.js"),
	__webpack_require__(/*! ./oldIE-userDataStorage */ "./node_modules/store/storages/oldIE-userDataStorage.js"),
	__webpack_require__(/*! ./cookieStorage */ "./node_modules/store/storages/cookieStorage.js"),
	__webpack_require__(/*! ./sessionStorage */ "./node_modules/store/storages/sessionStorage.js"),
	__webpack_require__(/*! ./memoryStorage */ "./node_modules/store/storages/memoryStorage.js")
]


/***/ }),

/***/ "./node_modules/store/storages/cookieStorage.js":
/*!******************************************************!*\
  !*** ./node_modules/store/storages/cookieStorage.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

var util = __webpack_require__(/*! ../src/util */ "./node_modules/store/src/util.js")
var Global = util.Global
var trim = util.trim

module.exports = {
	name: 'cookieStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var doc = Global.document

function read(key) {
	if (!key || !_has(key)) { return null }
	var regexpStr = "(?:^|.*;\\s*)" +
		escape(key).replace(/[\-\.\+\*]/g, "\\$&") +
		"\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"
	return unescape(doc.cookie.replace(new RegExp(regexpStr), "$1"))
}

function each(callback) {
	var cookies = doc.cookie.split(/; ?/g)
	for (var i = cookies.length - 1; i >= 0; i--) {
		if (!trim(cookies[i])) {
			continue
		}
		var kvp = cookies[i].split('=')
		var key = unescape(kvp[0])
		var val = unescape(kvp[1])
		callback(val, key)
	}
}

function write(key, data) {
	if(!key) { return }
	doc.cookie = escape(key) + "=" + escape(data) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/"
}

function remove(key) {
	if (!key || !_has(key)) {
		return
	}
	doc.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
}

function clearAll() {
	each(function(_, key) {
		remove(key)
	})
}

function _has(key) {
	return (new RegExp("(?:^|;\\s*)" + escape(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(doc.cookie)
}


/***/ }),

/***/ "./node_modules/store/storages/localStorage.js":
/*!*****************************************************!*\
  !*** ./node_modules/store/storages/localStorage.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../src/util */ "./node_modules/store/src/util.js")
var Global = util.Global

module.exports = {
	name: 'localStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

function localStorage() {
	return Global.localStorage
}

function read(key) {
	return localStorage().getItem(key)
}

function write(key, data) {
	return localStorage().setItem(key, data)
}

function each(fn) {
	for (var i = localStorage().length - 1; i >= 0; i--) {
		var key = localStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return localStorage().removeItem(key)
}

function clearAll() {
	return localStorage().clear()
}


/***/ }),

/***/ "./node_modules/store/storages/memoryStorage.js":
/*!******************************************************!*\
  !*** ./node_modules/store/storages/memoryStorage.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// memoryStorage is a useful last fallback to ensure that the store
// is functions (meaning store.get(), store.set(), etc will all function).
// However, stored values will not persist when the browser navigates to
// a new page or reloads the current page.

module.exports = {
	name: 'memoryStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var memoryStorage = {}

function read(key) {
	return memoryStorage[key]
}

function write(key, data) {
	memoryStorage[key] = data
}

function each(callback) {
	for (var key in memoryStorage) {
		if (memoryStorage.hasOwnProperty(key)) {
			callback(memoryStorage[key], key)
		}
	}
}

function remove(key) {
	delete memoryStorage[key]
}

function clearAll(key) {
	memoryStorage = {}
}


/***/ }),

/***/ "./node_modules/store/storages/oldFF-globalStorage.js":
/*!************************************************************!*\
  !*** ./node_modules/store/storages/oldFF-globalStorage.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// oldFF-globalStorage provides storage for Firefox
// versions 6 and 7, where no localStorage, etc
// is available.

var util = __webpack_require__(/*! ../src/util */ "./node_modules/store/src/util.js")
var Global = util.Global

module.exports = {
	name: 'oldFF-globalStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var globalStorage = Global.globalStorage

function read(key) {
	return globalStorage[key]
}

function write(key, data) {
	globalStorage[key] = data
}

function each(fn) {
	for (var i = globalStorage.length - 1; i >= 0; i--) {
		var key = globalStorage.key(i)
		fn(globalStorage[key], key)
	}
}

function remove(key) {
	return globalStorage.removeItem(key)
}

function clearAll() {
	each(function(key, _) {
		delete globalStorage[key]
	})
}


/***/ }),

/***/ "./node_modules/store/storages/oldIE-userDataStorage.js":
/*!**************************************************************!*\
  !*** ./node_modules/store/storages/oldIE-userDataStorage.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// oldIE-userDataStorage provides storage for Internet Explorer
// versions 6 and 7, where no localStorage, sessionStorage, etc
// is available.

var util = __webpack_require__(/*! ../src/util */ "./node_modules/store/src/util.js")
var Global = util.Global

module.exports = {
	name: 'oldIE-userDataStorage',
	write: write,
	read: read,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

var storageName = 'storejs'
var doc = Global.document
var _withStorageEl = _makeIEStorageElFunction()
var disable = (Global.navigator ? Global.navigator.userAgent : '').match(/ (MSIE 8|MSIE 9|MSIE 10)\./) // MSIE 9.x, MSIE 10.x

function write(unfixedKey, data) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.setAttribute(fixedKey, data)
		storageEl.save(storageName)
	})
}

function read(unfixedKey) {
	if (disable) { return }
	var fixedKey = fixKey(unfixedKey)
	var res = null
	_withStorageEl(function(storageEl) {
		res = storageEl.getAttribute(fixedKey)
	})
	return res
}

function each(callback) {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		for (var i=attributes.length-1; i>=0; i--) {
			var attr = attributes[i]
			callback(storageEl.getAttribute(attr.name), attr.name)
		}
	})
}

function remove(unfixedKey) {
	var fixedKey = fixKey(unfixedKey)
	_withStorageEl(function(storageEl) {
		storageEl.removeAttribute(fixedKey)
		storageEl.save(storageName)
	})
}

function clearAll() {
	_withStorageEl(function(storageEl) {
		var attributes = storageEl.XMLDocument.documentElement.attributes
		storageEl.load(storageName)
		for (var i=attributes.length-1; i>=0; i--) {
			storageEl.removeAttribute(attributes[i].name)
		}
		storageEl.save(storageName)
	})
}

// Helpers
//////////

// In IE7, keys cannot start with a digit or contain certain chars.
// See https://github.com/marcuswestin/store.js/issues/40
// See https://github.com/marcuswestin/store.js/issues/83
var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
function fixKey(key) {
	return key.replace(/^\d/, '___$&').replace(forbiddenCharsRegex, '___')
}

function _makeIEStorageElFunction() {
	if (!doc || !doc.documentElement || !doc.documentElement.addBehavior) {
		return null
	}
	var scriptTag = 'script',
		storageOwner,
		storageContainer,
		storageEl

	// Since #userData storage applies only to specific paths, we need to
	// somehow link our data to a specific path.  We choose /favicon.ico
	// as a pretty safe option, since all browsers already make a request to
	// this URL anyway and being a 404 will not hurt us here.  We wrap an
	// iframe pointing to the favicon in an ActiveXObject(htmlfile) object
	// (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
	// since the iframe access rules appear to allow direct access and
	// manipulation of the document element, even for a 404 page.  This
	// document can be used instead of the current document (which would
	// have been limited to the current path) to perform #userData storage.
	try {
		/* global ActiveXObject */
		storageContainer = new ActiveXObject('htmlfile')
		storageContainer.open()
		storageContainer.write('<'+scriptTag+'>document.w=window</'+scriptTag+'><iframe src="/favicon.ico"></iframe>')
		storageContainer.close()
		storageOwner = storageContainer.w.frames[0].document
		storageEl = storageOwner.createElement('div')
	} catch(e) {
		// somehow ActiveXObject instantiation failed (perhaps some special
		// security settings or otherwse), fall back to per-path storage
		storageEl = doc.createElement('div')
		storageOwner = doc.body
	}

	return function(storeFunction) {
		var args = [].slice.call(arguments, 0)
		args.unshift(storageEl)
		// See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
		// and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
		storageOwner.appendChild(storageEl)
		storageEl.addBehavior('#default#userData')
		storageEl.load(storageName)
		storeFunction.apply(this, args)
		storageOwner.removeChild(storageEl)
		return
	}
}


/***/ }),

/***/ "./node_modules/store/storages/sessionStorage.js":
/*!*******************************************************!*\
  !*** ./node_modules/store/storages/sessionStorage.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! ../src/util */ "./node_modules/store/src/util.js")
var Global = util.Global

module.exports = {
	name: 'sessionStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll
}

function sessionStorage() {
	return Global.sessionStorage
}

function read(key) {
	return sessionStorage().getItem(key)
}

function write(key, data) {
	return sessionStorage().setItem(key, data)
}

function each(fn) {
	for (var i = sessionStorage().length - 1; i >= 0; i--) {
		var key = sessionStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return sessionStorage().removeItem(key)
}

function clearAll() {
	return sessionStorage().clear()
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 1:
/*!************************!*\
  !*** multi riot store ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! riot */"./node_modules/riot/riot.esm.js");
module.exports = __webpack_require__(/*! store */"./node_modules/store/dist/store.legacy.js");


/***/ })

}]);