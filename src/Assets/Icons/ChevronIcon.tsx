import { color } from "@artsy/palette"
import React from "react"

export enum Direction {
  LEFT = "rotate(0)",
  RIGHT = "rotate(180)",
  UP = "rotate(90)",
  DOWN = "rotate(270)",
}

interface IconProps {
  /** default is RIGHT */
  direction?: Direction

  /** default is black10 */
  fill?: string
  height?: number
  width?: number
}

export const ChevronIcon = ({ direction, fill, height, width }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    width={`${width || 8}px`}
    height={`${height || 8}px`}
    transform={direction || Direction.RIGHT}
  >
    <path
      fill={fill ? fill : color("black10")}
      fillRule="evenodd"
      d="M9.091 10.758l-.788.771-5.832-5.708L8.303.113l.788.771-5.044 4.937 5.044 4.937"
    />
  </svg>
)
