import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

@customElement('deeper-details')
export class DeeperDetails extends LitElement {

  @property({type: String })
  closeButtonLabel? = 'Show less'

  @property({ type: String })
  expandButtonLabel? = 'Show more'

  @query('.content-wrapper')
  contentWrapper: HTMLDivElement | undefined

  @query('slot[name=toggler-button]')
  togglerButtonSlot: HTMLSlotElement | undefined

  @query('slot[name=close-button]')
  closeButtonSlot: HTMLSlotElement | undefined

  @state()
  _showContent = false

  private _handleToggleClick() {
    const { contentWrapper } = this
    const nextShowContentState = !this._showContent
    if (!!nextShowContentState) {
      this._showContent = nextShowContentState
      contentWrapper?.classList.add('open-animation')
      window.setTimeout(() => {
        contentWrapper?.classList.remove('open-animation')
      }, 450)
    } else {
      contentWrapper?.classList.add('init-close-animation')
      window.setTimeout(() => {
        contentWrapper?.classList.remove('init-close-animation')
        contentWrapper?.classList.add('close-animation')
      }, 1)
      window.setTimeout(() => {
        contentWrapper?.classList.remove('close-animation')
        this._showContent = nextShowContentState
      }, 450)
    }
  }

  static get styles() {
    return css`
      .deeper-details-root {
        border-top: var(--deeperDetails-borderStyle, 1px solid rgba(128,128,128,0.5));
        border-bottom: var(--deeperDetails-borderStyle, 1px solid rgba(128,128,128,0.5));
        padding: var(--deeperDetails-verticalPadding, 0.5em) var(--deeperDetails-horizontalPadding, 0);
      }
      .button {
        background-color: var(--deeperDetails-button-bgColor, none);
        border: var(--deeperDetails-button-borderStyle, none);
        color: var(--deeperDetails-button-textColor, inherit);
        cursor: pointer;
        font-size: var(--deeperDetails-button-fontSize, 1em);
        padding: var(--deeperDetails-button-padding, 0.5em 0);
      }
      .content-wrapper {
        max-height: none;
        overflow: hidden;
        transition: var(--deeperDetails-content-transition, max-height 400ms ease-in-out);
      }
      .content-wrapper.open-animation {
        max-height: 100lvh;
      }
      .content-wrapper[aria-hidden=true] {
        max-height: 0;
      }
      .content-wrapper.init-close-animation {
        max-height: 400lvh;
      }
      .content-wrapper.close-animation {
        max-height: 0;
      }
      .content-wrapper[aria-hidden=true] > .animation-wrapper {
        display: hidden;
      }
    `
  }

  firstUpdated() {
    const togglerButtonOverride = this.togglerButtonSlot?.assignedNodes()[0]
    togglerButtonOverride?.addEventListener('click', () => this._handleToggleClick())

    const closeButtonOverride = this.closeButtonSlot?.assignedNodes()[0]
    closeButtonOverride?.addEventListener('click', () => this._handleToggleClick())
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
            <button @click=${this._handleToggleClick} class="button">
              ${this.closeButtonLabel}
            </button>
          </slot>
        </div>
      </div>
    `
  }
}
