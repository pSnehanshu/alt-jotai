// @ts-check

import { useEffect, useState } from "react";

/**
 * @template T
 * @typedef {(value: T) => void} Subsriber
 */

/** @typedef {() => void} Unsubscriber */

/**
 * @template T
 * @typedef {Object} Atom
 * @property {T=} value
 * @property {(T) => void} set
 * @property {(subscriber: Subsriber<T>) => Unsubscriber} subscribe
 * */

/**
 * @typedef {Object} MapState
 * @property {any} value
 * @property {Map<symbol,Subsriber<any>>} subscribers
 */

/**
 * @template T
 * @param {T=} defaultValue
 * @returns {Atom<T>} Atom
 */
export function atom(defaultValue) {
  /** @type {MapState} */
  const mapState = {
    value: defaultValue,
    subscribers: new Map(),
  };

  return {
    get value() {
      return mapState.value;
    },
    set(value) {
      mapState.value = value;
      mapState.subscribers.forEach((subscriber) => subscriber(value));
    },
    subscribe(subscriber) {
      const subSym = Symbol();
      mapState.subscribers.set(subSym, subscriber);

      return () => {
        mapState.subscribers.delete(subSym);
      };
    },
  };
}

/**
 * @template T
 * @param {Atom<T>} theAtom
 * @returns {[T|undefined, (val:T) => void]}
 */
export function useAtom(theAtom) {
  const [state, setState] = useState(theAtom.value);
  useEffect(() => theAtom.subscribe(setState), []);
  return [state, theAtom.set];
}
