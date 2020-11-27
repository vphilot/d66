// constants
const Breakpoints: ReadonlyArray<Breakpoint> = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
const BreakpointDelta = 0.05

// types
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
interface Values {
  [key: string]: number
}

// class
export class ResponsiveHelper {
  values: Values

  constructor(BREAKPOINT_VALUES: Values) {
    this.values = BREAKPOINT_VALUES
  }

  up(start: Breakpoint): string {
    return `@media (min-width: ${this.values[start]}px)`
  }

  down(end: Breakpoint): string {
    return end === 'xxl'
      ? this.up('xs')
      : `@media (max-width: ${this.upperWidth(end)}px)`
  }

  between(start: Breakpoint, end: Breakpoint): string {
    return end === 'xxl'
      ? this.up(start)
      : `${this.up(start)} and (max-width: ${this.upperWidth(end)}px)`
  }

  only(breakpoint: Breakpoint): string {
    return this.between(breakpoint, breakpoint)
  }

  width(breakpoint: Breakpoint): number {
    return this.values[breakpoint]
  }

  private upperWidth(breakpoint: Breakpoint): number {
    // throw if breakpoint is xl
    if (breakpoint === 'xl') {
      // eslint-disable-next-line no-console
      console.log('breakpoint', 'Breakpoint "xl" has no upper limit.')
    }

    const nextBreakpoint = Breakpoints[Breakpoints.indexOf(breakpoint) + 1]
    return this.values[nextBreakpoint] - BreakpointDelta
  }
}
