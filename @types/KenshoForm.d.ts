declare module KenshoForm {
  /**
   * 
   */
  interface constructorOption {
    /**
     * default : `'k-'`
     */
    attrPrefix: string
    /**
     * default : `'span'`
     */
    errorMessageWrapper : string
    /**
     * default : `true`
     */
    verbose: boolean
    /**
     * default : `'kensho-has-error'`
     */
    errorClassName: string
    /**
     * default : `'kensho-error-message'`
     */
    errorItemClassName: string
    /**
     * default : `true`
     */
    search: boolean
    /**
     * default : `false`
     */
    autocomplete: boolean
    /**
     * default : `true`
     */
    HTML5novalidate : boolean
  }
  /**
   * 
   */
  type InputElementTypes = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  /**
   * 
   */
  // interface UnitElements {
  //   input : InputElementTypes
  //   error? : HTMLElement
  // //   [name:string] : { input : InputElementTypes, error? : HTMLElement }
  // }
  /**
   * Input and error output elements.  
   * Specify only one input element, even if you have multiple elements such as checkbox or radio-button.
   */
  interface InputAndErrorElementSet {
    input : InputElementTypes
    error? : HTMLElement
  }
  interface NamedInputAndErrorElementSet {
    [name:string] : InputAndErrorElementSet
  }
  /**
   * A unit of elements to be validated, their attributes, events, and error status.
   */
  interface Unit {
    // inputElement  : InputElementTypes[]
    // rule          : Array<[ string, { [ x : string ] : any } ]>
    // errorMessage? : {[ruleName:string]:string}
    // errorElement? : HTMLElement
    // error         : string[]
    // displayError  : boolean
    // event         : string[]
    // eventHandlers : {[key:string]:(...args:any)=>any}[]
    // name          : string
    // tagName       : string
    // type          : string
    // allowEmpty?   : boolean
    // valueFilter?  : Kensho.AnyFunction
  }
}