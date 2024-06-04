import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

@customElement('deeper-details')
export class DeeperDetails extends LitElement {

  @property({type: String })
  closeButtonLabel? = 'Show less'

  @property({ type: String })
  expandButtonLabel? = 'Show more'

  @query('slot[name=toggler-button]')
  togglerButtonSlot: HTMLSlotElement | undefined

  @query('slot[name=close-button]')
  closeButtonSlot: HTMLSlotElement | undefined

  @state()
  _showContent = false

  static get styles() {
    return css`
      .button {
        background-color: var(--button-bgColor, none);
        border: var(--button-borderStyle, none);
        color: var(--button-textColor, inherit);
        cursor: pointer;
        font-size: var(--button-fontSize, 1em);
        padding: var(--button-padding, 0);
      }
      .content-wrapper {
        max-height: 100vh;
        overflow-y: auto;
        transition: max-height 0.4s ease-in-out;
      }
      .content-wrapper[aria-hidden=true] {
        max-height: 0;
      }
      .content-wrapper[aria-hidden=true] > .animation-wrapper {
        display: hidden;
      }
    `
  }

  firstUpdated() {
    const togglerButtonOverride = this.togglerButtonSlot?.assignedNodes()[0]
    console.log(togglerButtonOverride);
    togglerButtonOverride?.addEventListener('click', () => this._handleToggleClick())

    const closeButtonOverride = this.closeButtonSlot?.assignedNodes()[0]
    console.log(closeButtonOverride);
    closeButtonOverride?.addEventListener('click', () => this._handleToggleClick())
  }

  private _handleToggleClick() {
    this._showContent = !this._showContent
  }

  render() {
    return html`
      <div class="deeper-details-root">
        <slot name="toggler-button" id="launcherSlot">
          <button class="button" @click=${this._handleToggleClick}>
            ${this.expandButtonLabel}
          </button>
        </slot>
        <div class="content-wrapper" aria-hidden="${!this._showContent}" id="contentWrapper" tabindex="-1">
          <div class="animation-wrapper">
            <slot></slot>
          </div>
          <slot name="close-button">
            <button @click=${this._handleToggleClick} class="button ">
              ${this.closeButtonLabel}
            </button>
          </slot>
        </div>
      </div>
    `
  }
}
