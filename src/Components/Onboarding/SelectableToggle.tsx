import React from "react"
import styled from "styled-components"

import Colors from "Assets/Colors"
import { avantgarde } from "Assets/Fonts"
import { CircleBlackCheckIcon } from "../../Assets/Icons/CircleBlackCheckIcon"
import { media } from "../Helpers"

interface SelectableToggleProps {
  href?: string
  text?: string
  onSelect: (selected: boolean) => void
  selected: boolean
}

const Link = styled.a`
  display: flex;
  color: black;
  text-decoration: none;
  ${avantgarde("s13")};
  &:hover {
    background-color: ${Colors.gray};
    cursor: pointer;
  }
  border-top: 1px solid ${Colors.grayRegular};
  height: 70px;
  padding: 0 15px 0 20px;
  ${media.sm`
    height: 50px;
    padding: 0 5px;
  `};
`

const FullWidthCol = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Col = styled.div`
  display: flex;
  align-items: center;
`

const EmptyCircle = styled.div`
  width: 26px;
  height: 26px;
  border: 1px solid ${Colors.grayRegular};
  border-radius: 50%;
  background-color: transparent;
`

class SelectableToggle extends React.Component<SelectableToggleProps, null> {
  constructor(props) {
    super(props)
    this.onSelect = this.onSelect.bind(this)
  }

  onSelect() {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.selected)
    }
  }

  render() {
    return (
      <div>
        <Link href={this.props.href} onClick={() => this.onSelect()}>
          <FullWidthCol>{this.props.text}</FullWidthCol>

          <Col>
            {this.props.selected ? (
              <CircleBlackCheckIcon width="26" height="26" />
            ) : (
              <EmptyCircle />
            )}
          </Col>
        </Link>
      </div>
    )
  }
}

export default SelectableToggle
