type Constructor<T> = new (...arguments_: unknown[]) => T;

export function assertInstanceOf<T>(
  value: unknown,
  constructor: Constructor<T>
): asserts value is T {
  if (!(value instanceof constructor)) {
    throw new TypeError(`Value is not an instance of ${constructor.name}`);
  }
}
