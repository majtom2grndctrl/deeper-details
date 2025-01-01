# Deeper Details

**Component maturity: 🟡 Beta**

A round of internal testing and external feedback has resulted in significant changes. With a clearer direction, new changes are likely to be smaller, and less likely to be breaking changes. But still, use this at your own risk until it’s marked as stable.

## Why this exists

Product Designers often receive mixed messages on how much detail to place in portfolio case studies. Interviews with UX mentors and hiring managers revealed there are reasons for the mixed feedback: There are different user personas for different kinds of people who review UX portfolios.

### User personas for UX case studies

It’s impossible to design one case study that adequately works well for the different personas reviewing portfolios, because they have different levels of time and cognitive load for reading. There are at least two different user personas.

The **rushed reviewer** is often a recruiter, or a hiring manager, who reviews the first round of candidates for an opening. They need to read through dozens, potentially hundreds of portfolios, so they need a very light overview of a project.

The **interested buyer** is usually a separate hiring manager, brought into the interviewing process after the rushed reviewer has filtered the list of candidates down to a manageable number. By this stage, candidates have often already passed a phone screen. The interested buyer has more time to process case studies, and has more thoughtful questions they want answers to while they read the case study.

Sometimes, a person who starts as a **rushed reviewer** can shift over to an **interested buyer**—for example, if they want to do a more in-depth review of case studies before or after a portfolio presentation.

### Solving for the needs of different personas

`deeper-details` helps designers solve this problem by enabling them to place more intricately detailed content inside of a wrapper that’s hidden by default, but a call to action button with a label like “More information.” This enables the **interested buyer** to opt-in to seeing details, while the **rushed reviewer** can skip past the button and finish their quick initial review.

## Technical overview

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
