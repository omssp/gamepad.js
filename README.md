# gamepad.js

> Simple customizable event binding for the HTML Gamepad API.

## Install

```bash
$ npm install @neogeek/gamepad.js
```

## Usage

```javascript
import gamepad from '@neogeek/gamepad.js';

gamepad.press('button_1')
    .subscribe(event => console.log(`press ${event.buttonName}`));

gamepad.hold('button_1', {'throttle': 1000})
    .subscribe(event => console.log(`hold ${event.buttonName}`));

gamepad.release('button_1')
    .subscribe(event => console.log(`release ${event.buttonName}`));
```
