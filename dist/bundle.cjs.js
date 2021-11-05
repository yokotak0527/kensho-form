'use strict';

const ruleBook = new Map();
const rule = {
    add(name, rule) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        if (typeof rule !== 'function')
            throw new Error(`The argument "rule" must be a function.`);
        if (ruleBook.get(name))
            throw new Error(`The "${name}" rule already exist.`);
        ruleBook.set(name, rule);
    },
    remove(name) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        if (!ruleBook.get(name))
            throw new Error(`The "${name}" rule isn't existed.`);
        ruleBook.delete(name);
    },
    get(name) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        const rule = ruleBook.get(name);
        if (rule === undefined)
            throw new Error(`The "${name}" rule isn't found.`);
        return rule;
    }
};

const pluginBox = new Map();
const plugin = {
    add(name, plugin) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        if (typeof plugin !== 'function')
            throw new Error(`The argument "plugin" must be a function.`);
        if (pluginBox.get(name))
            throw new Error(`The "${name}" plugin already exist.`);
        pluginBox.set(name, plugin);
    },
    remove(name) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        if (!pluginBox.get(name))
            throw new Error(`The "${name}" plugin isn't existed.`);
        pluginBox.delete(name);
    },
    get(name) {
        if (typeof name !== 'string')
            throw new Error(`The argument "name" must be a string.`);
        if (name === '')
            throw new Error(`Empty string are not accepted.`);
        const rule = pluginBox.get(name);
        if (rule === undefined)
            throw new Error(`The "${name}" plugin isn't found.`);
        return rule;
    },
    use(name) {
    }
};

class Kensho {
    static rule = rule;
    static plugin = plugin;
    constructor() {
    }
}

const defaultConstructorOptions = {
    attrPrefix: 'k-',
    errorMessageWrapper: 'span',
    verbose: true,
    errorClassName: 'kensho-has-error',
    errorItemClassName: 'kensho-error-message',
    search: true,
    autocomplete: false,
    HTML5novalidate: true
};
class KenshoForm extends Kensho {
    isDestroyed;
    form;
    defaultAutoComplete;
    defaultHasAutoCompleteAttr;
    option;
    units;
    constructor(selector, option = {}) {
        super();
        this.isDestroyed = false;
        this.option = Object.assign({}, defaultConstructorOptions, option);
        Object.seal(this.option);
        if (typeof selector === 'string') {
            const f = document.querySelector(selector);
            if (f === null)
                throw new Error(`form "${selector}" is not found.`);
            selector = f;
        }
        this.form = selector;
        this.defaultHasAutoCompleteAttr = this.form.getAttribute('autocomplete') !== null ? true : false;
        this.defaultAutoComplete = this.form.autocomplete;
        if (!this.option.autocomplete) {
            this.form.setAttribute('autocomplete', 'off');
            this.form.autocomplete = 'off';
        }
        this.units = new Map();
        this.form.classList.add('kensho-form');
        return this;
    }
    search() {
        const prefix = this.option.attrPrefix;
        this.form.querySelectorAll(`*[${prefix}name]`);
    }
    addFromUnitElements() {
    }
}
new KenshoForm("hoge", { search: true });

module.exports = KenshoForm;
//# sourceMappingURL=bundle.cjs.js.map
