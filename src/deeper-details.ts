import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('deeper-details')
export class DeeperDetails extends LitElement {

  @property({ type: Boolean })
  _showContent = false

  @state()
  protected _animationState: 'initial' | 'expanded' | 'hidden' = 'initial'

  public async handleToggleClick() {

    const nextShowContentState = !this._showContent
    this._showContent = nextShowContentState

    await this.updateComplete
    this._animationState = this._showContent ? 'expanded' : 'hidden'
  }

  private _handleToggleButtonSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement
    const buttons = slot.assignedElements().filter(el => el.tagName === 'BUTTON')

    buttons.forEach(button => {
      button.classList.add('button')
      button.setAttribute('aria-expanded', this._showContent.toString())
      button.setAttribute('aria-controls', 'contentWrapper')
    })
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties)

    const updateButton = (slotName: 'expand-button' | 'hide-button') => {
        const slot = this.shadowRoot!.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement
        const buttons = slot.assignedElements().filter(el => el.tagName === 'BUTTON')
        
        buttons.forEach(button => {
          button.setAttribute('aria-expanded', this._showContent.toString())
        })
    }
  
    if (changedProperties.has('_showContent')) {
      updateButton('expand-button')
      updateButton('hide-button')
    }
  }

  static get styles() {
    return css`
      @keyframes content-wrapper-expand-animation {
        0% {
          max-height: 0;
          opacity: var(--deeperDetails-opacity--hidden, 0);
        }
        99% {
          max-height: 100lvh;
          opacity: 1;
        }
        100% {
          max-height: none;
        }
      }
      @keyframes content-wrapper-hide-animation {
        0% {
          max-height: 100lvh;
          opacity: 1;
        }
        100% {
          max-height: 0;
          opacity: var(--deeperDetails-opacity--hidden, 0);
        }
      }
      .content-wrapper {
        max-height: 0;
        overflow: hidden;
      }
      [data-animation-state=expanded] .content-wrapper {
        max-height: none;
        overflow: visible;
      }
      .toggle {
        display: inline-block;
        position: relative;
      }
      .toggle-element {
        display: inline-block;
        transition: var(--deeperDetails-toggle-transition, opacity 200ms linear);
        opacity: 1;
      }
      .toggle-element:not(:first-child) {
        position: absolute;
        left: 0;
        height: 100%;
        width: 100%;
      }
      .toggle-element[aria-hidden=true] {
        flex-basis: 0;
        pointer-events: none;
        opacity: 0;
      }
      @media (prefers-reduced-motion: no-preference) {
        [data-animation-state=expanded] .content-wrapper {
          animation: var(--deeperDetails-contentWrapper-animation, content-wrapper-expand-animation 400ms ease-in-out);
        }
        [data-animation-state=hidden] .content-wrapper {
          animation: var(--deeperDetails-contentWrapper-animation, content-wrapper-hide-animation 400ms ease-in-out);
        }
      }
    `
  }

  render() {
    return html`
      <div class="deeper-details-root" data-show-content=${this._showContent} data-animation-state=${this._animationState}>
        <div class="toggle">
          <div class="toggle-element toggle-expand" aria-hidden=${this._showContent}>
            <slot name="expand-button" @click=${this.handleToggleClick} @slotchange=${this._handleToggleButtonSlotChange}></slot>
          </div>
          <div class="toggle-element toggle-hide" aria-hidden=${!this._showContent}>
            <slot name="hide-button" @click=${this.handleToggleClick} @slotchange=${this._handleToggleButtonSlotChange}></slot>
          </div>
        </div>
        <div id="contentWrapper" class="content-wrapper" aria-hidden=${!this._showContent}>
          <div class="animation-wrapper">
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }
}
