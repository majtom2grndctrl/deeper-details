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

  public handleToggleClick() {
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

  private _findButtonWithAction = (nodes: Node[], action: string): HTMLButtonElement | undefined => {
    for (const node of nodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        console.log('nodeType is Node.Element')
        if (element.tagName === 'BUTTON' && element.dataset.action === action) {
          console.log('tagName is button')
          return element as HTMLButtonElement;
        } else {
          const nestedButton = this._findButtonWithAction(Array.from(element.children), action);
          if (nestedButton) {
            return nestedButton;
          }
        }
      }
    }
    return undefined;
  };

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
    const slottedTogglerButton = this._findButtonWithAction(
      Array.from(this.togglerButtonSlot?.assignedNodes() || []),
      'toggle'
    )
    slottedTogglerButton?.addEventListener('click', () => this.handleToggleClick())

    const slottedCloseButton = this._findButtonWithAction(
      Array.from(this.closeButtonSlot?.assignedNodes() || []),
      'close'
    )
    slottedCloseButton?.addEventListener('click', () => this.handleToggleClick())
  }

  render() {
    return html`
      <div class="deeper-details-root">
        <slot name="toggler-button" id="launcherSlot">
          <div class="toggler-wrapper">
            <button class="button" @click=${this.handleToggleClick}>
              ${this.expandButtonLabel}
            </button>
          </div>
        </slot>
        <div class="content-wrapper" aria-hidden="${!this._showContent}" id="contentWrapper" tabindex="-1">
          <div class="animation-wrapper">
            <slot></slot>
          </div>
          <slot name="close-button">
            <div class="close-button-wrapper">
              <button @click=${this.handleToggleClick} class="button">
                ${this.closeButtonLabel}
              </button>
            </div>
          </slot>
        </div>
      </div>
    `
  }
}
