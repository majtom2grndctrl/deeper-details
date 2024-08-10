# Deeper Details

**Component maturity: 🟡 Beta**

A round of internal testing and external feedback has resulted in significant changes. With a clearer direction, new changes are likely to be smaller, and less likely to be breaking changes. But still, use this at your own risk until it’s marked as stable.

## Overview

`deeper-details` is a web component built using the Lit library. It provides an expandable/collapsible section of content, allowing users to toggle visibility with custom buttons. It’s designed for long-form content—like UX Portfolio case studies, where some readers can only skim content, and other readers want to see more detailed information.

The element’s architectural goals are to be:
* Headless
* Declarative
* Brand-agnostic
* Framework-agnostic

## Features
* Expand and collapse content with a toggle button.
* Customizable button labels and styles, using CSS Custom Properties.
* Smooth transition animations.
* Support for accessibility, utilizing ARIA attributes

## Installation
You can install deeper-details via npm or yarn.

```sh
npm install deeper-details
```

or

```sh
yarn add deeper-details
```

## Usage
First, import the component in your JavaScript or TypeScript file:

```javascript
import 'deeper-details';
```

Then, use the component in your HTML:

Example:
```html
<deeper-details>
  <button class="your-button-class" slot="expand-button">Show more</button>
  <button class="your-button-class" slot="hide-button">Show less</button>
  <div>Content to be toggled</div>
</deeper-details>
```

For front end frameworks, you likely need to follow instructions for adding a custom element for your framework (e.g. Next, Nuxt, Astro, etc.).

### Slots
If you need more flexibility to style the buttons, you can replace them with your own, using slots!
* Default slot: The content to be expanded/collapsed
* *expand-button*: Custom element for the expand button
* *hide-button*: Custom element for the hide button

### CSS Custom Properties
If you need to re-style some elements inside the ShadowDOM, here are some properties you can override:

* *--deeperDetails-toggle-transition*: Transition for toggle elements. _Default: opacity 200ms linear_
* *--deeperDetails-opacity--hidden*: Opacity of hidden content. _Default: 0_
* *--deeperDetails-contentWrapper-animation*: Custom animation for content wrapper

### Development
To start developing with deeper-details, clone the repository and install the dependencies:

```sh
git clone https://github.com/your-username/deeper-details.git
cd deeper-details
yarn install
```

### Scripts
* `dev`: Start the development server using Vite.
* `build`: Compile TypeScript and bundle the project using Vite.
* `preview`: Preview the built project using Vite.

You can run these scripts using:

```sh
yarn dev
yarn build
yarn preview
```

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Author
Dan Hiester

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
