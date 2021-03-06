export class BaseResource {
  /** Optional minimum value */
  static min = 0;
  /** Optional maximum value */
  static max = Infinity;
  /** Initial amount */
  static amount = 0;
  /** Initial increase (negative values for initial loss) */
  static delta = 0;
  /** Name of the resource */
  static resourceName = "MISSINGNO.";
}

export class Dirt extends BaseResource {
  static resourceName = "Dirt";
}

export class Bones extends BaseResource {
  static resourceName = "Bones";
}
