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
      contentWrapper?.addEventListener('transitionend', () => {
        contentWrapper?.classList.remove('open-animation')
      }, { once: true })
    } else {
      contentWrapper?.classList.add('init-close-animation')
      window.setTimeout(() => {
        contentWrapper?.classList.remove('init-close-animation')
        contentWrapper?.classList.add('close-animation')
      }, 1)
      contentWrapper?.addEventListener('transitionend', () => {
        contentWrapper?.classList.remove('close-animation')
        this._showContent = nextShowContentState
      }, { once: true })
    }
  }

  private _findButtonWithAction = (nodes: Node[], action: string): HTMLButtonElement | undefined => {
    for (const node of nodes) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName === 'BUTTON' && element.dataset.action === action) {
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
        transition: 
          max-height var(--deeperDetails-maxHeight-transition, 400ms ease-in-out),
          opacity var(--deeperDetails-opacity-transition, 400ms ease-in-out),
          transform var(--deeperDetails-transform-transition, 400ms ease-in-out);
      }
      .content-wrapper.open-animation {
        max-height: 100lvh;
      }
      .content-wrapper[aria-hidden=true] {
        max-height: 0;
        opacity: var(--deeperDetails-opacity--closed, 0);
        transform: var(--deeperDetails-transform--closed, translate(2rem, 0));
      }
      .content-wrapper.init-close-animation {
        max-height: 100lvh;
      }
      .content-wrapper.close-animation {
        max-height: 0;
        opacity: var(--deeperDetails-opacity--closed, 0);
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
