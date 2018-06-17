import {fromEvent, merge} from 'rxjs';
import {
    filter,
    throttleTime,
    map,
    groupBy,
    distinctUntilKeyChanged,
    mergeAll
} from 'rxjs/operators';

import keyMapping from './keyMapping';

const rawKeyDownEvent = fromEvent(document, 'keydown');
const rawKeyUpEvent = fromEvent(document, 'keyup');
const rawKeyPressEvent = merge(rawKeyDownEvent, rawKeyUpEvent).pipe(
    groupBy(event => event.keyCode),
    map(group => group.pipe(distinctUntilKeyChanged('type'))),
    mergeAll(),
    filter(event => event.type === 'keydown')
);

const filterButtonKeyEvents = (keyCode, keyMap, buttonName) =>
    Object.keys(keyMap)
        .filter(key => keyMap[key].indexOf(keyCode) !== -1)
        .indexOf(buttonName) !== -1;

const release = buttonName =>
    rawKeyUpEvent.pipe(
        filter(event => filterButtonKeyEvents(event.keyCode, keyMapping.keyboard, buttonName)),
        map(event => ({
            event,
            buttonName
        }))
    );

const hold = (buttonName, options = {'throttle': 0}) =>
    rawKeyDownEvent.pipe(
        filter(event => filterButtonKeyEvents(event.keyCode, keyMapping.keyboard, buttonName)),
        throttleTime(options.throttle),
        map(event => ({
            event,
            buttonName
        }))
    );

const press = buttonName =>
    rawKeyPressEvent.pipe(
        filter(event => filterButtonKeyEvents(event.keyCode, keyMapping.keyboard, buttonName)),
        map(event => ({
            event,
            buttonName
        }))
    );

export default {
    press,
    release,
    hold,
    rawKeyDownEvent,
    rawKeyUpEvent
};
