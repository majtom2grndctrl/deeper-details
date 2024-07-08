import { LitElement, css, html } from 'lit'
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js'

@customElement('deeper-details')
export class DeeperDetails extends LitElement {

  @property({type: String })
  hideButtonLabel = 'Show less'

  @property({ type: String })
  showButtonLabel = 'Show more'

  @property({ type: Boolean })
  showHideButton? = false

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
      .button {
        background-color: var(--deeperDetails-button-bgColor, none);
        border: var(--deeperDetails-button-borderStyle, none);
        color: var(--deeperDetails-button-textColor, inherit);
        cursor: pointer;
        font-size: var(--deeperDetails-button-fontSize, 1em);
        font-weight: var(--deeperDetails-button-fontWeight, 400);
        padding: var(--deeperDetails-button-padding, 0.5em 0);
        white-space: nowrap;
      }
      .content-wrapper {
        max-height: 0;
        overflow: hidden;
      }
      [data-animation-state=expanded] .content-wrapper {
        animation: var(--deeperDetails-contentWrapper-animation, content-wrapper-expand-animation 400ms ease-in-out);
        max-height: none;
      }
      [data-animation-state=hidden] .content-wrapper {
        animation: var(--deeperDetails-contentWrapper-animation, content-wrapper-hide-animation 400ms ease-in-out);
      }
      .toggle {
        display: inline-block;
        position: relative;
      }
      .toggle-element {
        display: inline-block;
        transition: var(--deeperDetails-toggle-transition, transform 400ms ease-in-out opacity 400ms linear);
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
    `
  }

  render() {
    return html`
      <div class="deeper-details-root" data-show-content=${this._showContent} data-animation-state=${this._animationState}>
        <div class="toggle">
          <div class="toggle-element toggle-expand" aria-hidden=${this._showContent}>
            <slot name="expand-button" @click=${this.handleToggleClick}>
              <button class="button" aria-expanded=${this._showContent} aria-controls="contentWrapper">
                ${this.showButtonLabel}
              </button>
            </slot>
          </div>
          <div class="toggle-element toggle-hide" aria-hidden=${!this._showContent}>
            <slot name="hide-button" @click=${this.handleToggleClick}>
              <button class="button" aria-expanded=${this._showContent} aria-controls="contentWrapper">
                ${this.hideButtonLabel}
              </button>
            </slot>
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
