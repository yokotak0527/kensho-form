import Kensho from "@yokotak0527/kensho"

const defaultConstructorOptions:KenshoForm.constructorOption = {
  attrPrefix          : 'k-',
  errorMessageWrapper : 'span',
  verbose             : true,
  errorClassName      : 'kensho-has-error',
  errorItemClassName  : 'kensho-error-message',
  search              : true,
  autocomplete        : false,
  HTML5novalidate     : true
}

class KenshoForm extends Kensho {
  /**  */
  public isDestroyed: boolean
  /** HTML form element */
  public form: HTMLFormElement
  /** default form `autocomplete` attr value */
  public defaultAutoComplete: string
  /** Is the default `autocomplete` attr value enabled? */
  public defaultHasAutoCompleteAttr: boolean
  /** */
  public option: KenshoForm.constructorOption
  /** */
  private readonly units: Map<string, KenshoForm.Unit>
  /**
   * 
   */
  constructor(selector:string|HTMLFormElement, option:Partial<KenshoForm.constructorOption> = {}) {
    super()
    
    this.isDestroyed = false
    
    this.option = Object.assign({}, defaultConstructorOptions, option)
    Object.freeze(this.option)

    if (typeof selector === 'string') {
        const f = document.querySelector<HTMLFormElement>(selector)
        if (f === null) throw new Error(`form "${selector}" is not found.`)
        selector = f
    }
    this.form = selector

    // autocomplete setup
    this.defaultHasAutoCompleteAttr = this.form.getAttribute('autocomplete') !== null ? true : false
    this.defaultAutoComplete = this.form.autocomplete
  
    if (!this.option.autocomplete) {
      this.form.setAttribute('autocomplete', 'off')
      this.form.autocomplete = 'off'
    }

    this.units = new Map()
    this.form.classList.add('kensho-form')

    if (this.option.search) this.search()
    // if (option.search) { this.addFromUnitElements(this.search()) }

    return this
  }
  /**
   * Create an InputAndErrorElementSet from the elements in the form that have
   * the k-name attribute, returns a list of it.
   */
  private search():KenshoForm.NamedInputAndErrorElementSet {
    const prefix = this.option.attrPrefix
    const match  = this.form.querySelectorAll(`*[${prefix}name]`)

    const list:KenshoForm.NamedInputAndErrorElementSet = {}

    for (const item of match) {
      let name = item.getAttribute(`${prefix}name`) as string
      const type = /\.error$/.test(name) ? 'error' : 'input'

      if (type === 'error') {
        name = name.replace('.error', '')
      }

      if (list[name] === undefined) {
        list[name] = {} as KenshoForm.InputAndErrorElementSet
      }

      if (type === 'input') {
        if (list[name].input !== undefined) {
          throw new Error(`The value "${name}" in ${prefix}name attr is duplicated.`)
        }
        list[name].input = item as KenshoForm.InputElementTypes
      } else if (type === 'error') {
        if (list[name].error !== undefined) {
          throw new Error(`The value "${name}.error" in ${prefix}name attr is duplicated.`)
        }
        list[name].error = item as HTMLElement
      }
    }

    Object.entries(list).forEach(([name, set]) => {
      
    })
    // const list:Kensho.RuleUnitElements = {}
    // for (const [name, elements] of Object.entries(list)) {
    //   // console.log(name, elements, elements.input)
    //   if (elements.input !== undefined) {
    //     list[name] = elements as Kensho.RuleUnitElements['']
    //   } else {
    // //     throw new Error(`No \`k-name="${name}"\` attribute in HTML input form against \`k-name="${name}.error"\``)
    //   }
    // }
    return list
  }
  /**
   * add unit rules from the Kensho.RuleUnitElements
   */
  // addFromUnitElements (inputElmsData:Kensho.RuleUnitElements):void {
  addFromUnitElements ():void {
    // const prefix = Kensho.config.customAttrPrefix
    // for (const [unitName, data] of Object.entries(inputElmsData)) {
    //   if (this.ruleUnits.get(unitName) !== undefined) throw new Error(`The "${unitName}" rule unit is already exsisted.`)

    //   const _inputElm = data.input

    //   const name = unitName
    //   const errorElement = data.error

    //   // parse rule ------------------------------------------------------------
    //   const rawRule:AddParams['rule'] | null = _inputElm.getAttribute(`${prefix}rule`)
    //   if (rawRule === null) throw new Error(`The \`${prefix}rule\` attribute is not found in the element where \`${prefix}name="${unitName}"\` is specified.`)
    //   const rule = this.parseAttrString2Array<Exclude<AddParams['rule'], string>>(rawRule)

    //   // parse inputElement ----------------------------------------------------
    //   let inputElement:Kensho.InputElementTypes | NodeListOf<HTMLInputElement> = data.input
    //   const typeAttr = data.input.getAttribute('type')
    //   if (typeAttr === 'radio') {
    //     inputElement = this.form.querySelectorAll<HTMLInputElement>(`input[name="${data.input.getAttribute('name')}"]`)
    //   }

    //   // parse event -----------------------------------------------------------
    //   const strEvents = _inputElm.getAttribute(`${prefix}event`)
    //   let rawEvent:string | string[] | undefined = strEvents !== null ? strEvents : undefined
    //   if (typeof rawEvent === 'string') {
    //     rawEvent = this.parseAttrString2Array<Exclude<AddParams['event'], string>>(rawEvent)
    //   }
    //   const event = rawEvent
  
    //   // parse allows ----------------------------------------------------------
    //   const strAllowEmpty = _inputElm.getAttribute(`${prefix}allowempty`)

    //   // <... k-allowempty="on">, <... k-allowempty="true">, <... k-allowempty>
    //   const allowEmpty = strAllowEmpty === 'on' || strAllowEmpty === 'true' || strAllowEmpty === '' ? true : false

    //   // parse eventMessage ----------------------------------------------------
    //   const strMessage = _inputElm.getAttribute(`${prefix}message`)
    //   let rawErrorMessage:AddParams['errorMessage'] | undefined = strMessage !== null ? strMessage : undefined
    //   if (typeof rawErrorMessage === 'string') {
    //     rawErrorMessage = rawErrorMessage
    //       .trim()
    //       .replace(/\n/gm, '')
    //       .replace(/'/g, '"')
    //       .replace(/\\/, '\\\\')
    //       .replace(/\\\\"/g, '\'')
    //     if (/^{.+}$/.test(rawErrorMessage)) {
    //       rawErrorMessage = JSON.parse(rawErrorMessage) as Exclude<AddParams['errorMessage'], string>
    //     }
    //   }
    //   const errorMessage = rawErrorMessage

    //   // parse filter ----------------------------------------------------------
    //   type RawFilter = string | Array<string | [ string, any[] ]>
    //   const strFilter = _inputElm.getAttribute(`${prefix}filter`)
    //   let rawFilter:RawFilter = strFilter !== null ? strFilter : ''
    //   let valueFilter:AddParams['valueFilter']
    //   if (typeof rawFilter === 'string') {
    //     rawFilter = this.parseAttrString2Array<Exclude<RawFilter, string | undefined>>(rawFilter)
    //     valueFilter = function (value:any, Kensho: any) {
    //       for (const filter of rawFilter) {
    //         if (typeof filter === 'string') {
    //           value = Kensho.use(filter, value)
    //         } else {
    //           value = Kensho.use(filter[0], value, ...filter[1])
    //         }
    //       }
    //       return value
    //     }
    //   }

    //   this.add({
    //     inputElement,
    //     errorElement,
    //     errorMessage,
    //     rule,
    //     event,
    //     valueFilter,
    //     name,
    //     allowEmpty
    //   })
    // }
  }
}

export default KenshoForm