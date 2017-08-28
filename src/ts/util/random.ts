import * as Random from "random-js";

const engine = Random.engines.mt19937().autoSeed();

/**
 * Randomly generate an integer, within the inclusive bounds.
 * @param min The smallest possible integer.
 * @param max The largest possible integer.
 */
export function integer(min: number, max: number): number {
    return Random.integer(min, max)(engine);
}

/**
 * Return a random boolean value
 */
export function bool(): boolean;
/**
 * Return a random boolean value with a percentage change of truth
 * @param percentage 0-1
 */
// tslint:disable-next-line:unified-signatures
export function bool(percentage: number): boolean;
/**
 * Return a random value that is true numerator times out of denominator
 */
export function bool(numerator?: number, denominator?: number): boolean {
    // any below because of bad TS definitions in the @types package.
    return Random.bool(numerator as any, denominator as any)(engine);
}

/**
 * Pick a random element from the given array
 * @param array the array to pick an element from
 * @param begin Zero based index to start picking from
 * @param end Zero based index to pick up to (non-inclusive)
 */
export function pick<T>(array: T[], begin?: number, end?: number): T {
    return Random.pick(engine, array, begin, end);
}
