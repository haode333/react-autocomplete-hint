import { MutableRefObject, RefCallback } from "react";
import { IHintOption } from ".";

type MutableRef<T> = RefCallback<T> | MutableRefObject<T> | null;

export function mergeRefs(...refs: Array<MutableRef<HTMLElement | null>>): RefCallback<HTMLElement> {
    const filteredRefs = refs.filter(Boolean);

    return (inst: HTMLElement) => {
        for (let ref of filteredRefs) {
            if (typeof ref === 'function') {
                ref(inst);
            } else if (ref && 'current' in ref) {
                ref.current = inst;
            }
        }
    };
};

// IE doesn't seem to get the composite computed value (eg: 'padding',
// 'borderStyle', etc.), so generate these from the individual values.
export function interpolateStyle(
    styles: CSSStyleDeclaration,
    attr: string,
    subattr: string = ''
): string {
    // Title-case the sub-attribute.
    if (subattr) {
        subattr = subattr.replace(subattr[0], subattr[0].toUpperCase());
    }

    return ['Top', 'Right', 'Bottom', 'Left']
        .map((dir) => (styles as any)[attr + dir + subattr])
        .join(' ');
}

export function sortAsc<T>(a: T, b: T) {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
}

export function getFirstDuplicateOption(array: Array<IHintOption>): string | null {
    const tracker = new Set<string>();

    for (let i = 0; i < array.length; i++) {
        if (tracker.has(array[i].label)) {
            return array[i].label;
        }

        tracker.add(array[i].label);
    }

    return null;
}