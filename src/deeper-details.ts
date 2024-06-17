import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js'

@customElement('deeper-details')
export class DeeperDetails extends LitElement {

  @property({type: String })
  hideButtonLabel? = 'Show less'

  @property({ type: String })
  showButtonLabel? = 'Show more'

  @property({ type: Boolean })
  showHideButton? = false

  @query('.content-wrapper')
  contentWrapper: HTMLDivElement | undefined

  @queryAssignedElements({ slot: 'toggle-button' })
  toggleButtonSlot!: Array<HTMLElement>

  @query('slot[name=close-button]')
  hideButtonSlot: HTMLSlotElement | undefined

  @state()
  _showContent = false

  private _toggleButtonIsSlotted = (): Boolean => this.toggleButtonSlot.length > 0

  public handleToggleClick(event: MouseEvent) {
    const { contentWrapper } = this
    const button = event.target as HTMLElement
    const buttonLabelElement = this._findButtonLabel(button)

    const nextShowContentState = !this._showContent

    if (nextShowContentState) {

      this._showContent = nextShowContentState

      contentWrapper?.classList.add('open-animation')

      contentWrapper?.addEventListener('transitionend', () => {
        contentWrapper?.classList.remove('open-animation')
      }, { once: true })

      this.toggleButtonSlot[0].setAttribute('data-content-visibility-state', `${nextShowContentState}`)

      if (this._toggleButtonIsSlotted() && !!this.hideButtonLabel) {
        buttonLabelElement.innerText = this.hideButtonLabel
      }

    } else {

      contentWrapper?.classList.add('init-close-animation')

      window.setTimeout(() => {
        contentWrapper?.classList.remove('init-close-animation')
        contentWrapper?.classList.add('close-animation')
      }, 1)

      contentWrapper?.addEventListener('transitionend', () => {
        contentWrapper?.classList.remove('close-animation')
        this._showContent = nextShowContentState
        this.toggleButtonSlot[0].setAttribute('data-content-visibility-state', `${nextShowContentState}`)
      }, { once: true })

      if (this._toggleButtonIsSlotted() && this.showButtonLabel) {
        buttonLabelElement.innerText = this.showButtonLabel

      }

    }
  }

  protected firstUpdated() {
    this.toggleButtonSlot[0].setAttribute('data-content-visibility-state', `${this._showContent}`)
    if (this._toggleButtonIsSlotted() && !!this.showButtonLabel) {
      const buttonLabel = this._findButtonLabel(this.toggleButtonSlot[0])
      buttonLabel.innerText = this.showButtonLabel
    }
  }

  private _handleToggleSlotChange(event: Event) {
    const toggleButton = event.target as HTMLSlotElement
    toggleButton?.addEventListener('click', (clickEvent) => this.handleToggleClick(clickEvent))
  }

  private _findButtonLabel(element: HTMLElement) {
    return element.childElementCount > 1
    ? element.querySelector(".deeperDetails-button-label") as HTMLElement
    : element as HTMLElement
  }

  static get styles() {
    return css`
      .button {
        background-color: var(--deeperDetails-button-bgColor, none);
        border: var(--deeperDetails-button-borderStyle, none);
        color: var(--deeperDetails-button-textColor, inherit);
        cursor: pointer;
        font-size: var(--deeperDetails-button-fontSize, 1em);
        font-weight: var(--deeperDetails-button-fontWeight, 400);
        padding: var(--deeperDetails-button-padding, 0.5em 0);
      }
      .content-wrapper {
        max-height: none;
        opacity: 1;
        overflow: hidden;
        transition: var(--deeperDetails-transition, max-height 1ms ease-in-out);
      }
      .content-wrapper.open-animation {
        max-height: 100lvh;
      }
      .content-wrapper[aria-hidden=true] {
        max-height: 0;
        opacity: var(--deeperDetails-opacity--closed, 0);
        transform: var(--deeperDetails-transform--closed);
      }
      .content-wrapper.init-close-animation {
        max-height: 100lvh;
      }
      .content-wrapper.close-animation {
        max-height: 0;
        opacity: var(--deeperDetails-opacity--closed, 0);
        transform: var(--deeperDetails-transform--closed);
      }
      .content-wrapper[aria-hidden=true] > .animation-wrapper {
        display: hidden;
      }
    `
  }

  render() {
    return html`
      <div class="deeper-details-root">
        <div class="toggle-wrapper">
          <slot name="toggle-button" @slotchange=${this._handleToggleSlotChange}>
            <button class="button" @click=${this.handleToggleClick}>
              ${this._showContent ? this.hideButtonLabel : this.showButtonLabel}
            </button>
          </slot>
        </div>
        <div class="content-wrapper" aria-hidden="${!this._showContent}" id="contentWrapper" tabindex="-1">
          <div class="animation-wrapper">
            <slot></slot>
          </div>
          <slot name="close-button">
            <div class="close-button-wrapper">
              ${ this.showHideButton
                  ? html`
                    <button @click=${this.handleToggleClick} class="button">
                      ${this.hideButtonLabel}
                    </button>
                  ` : nothing
              }
            </div>
          </slot>
        </div>
      </div>
    `
  }
}
