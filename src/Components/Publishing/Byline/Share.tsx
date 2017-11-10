import React from "react"
import styled from "styled-components"
import Events from "../../../Utils/Events"
import track from "../../../Utils/track"
import { pMedia } from "../../Helpers"
import { IconSocialEmail } from "../Icon/IconSocialEmail"
import { IconSocialFacebook } from "../Icon/IconSocialFacebook"
import { IconSocialTwitter } from "../Icon/IconSocialTwitter"

interface Props extends React.HTMLProps<HTMLDivElement> {
  url: string
  title: string
  articleId?: string
  color?: string
  tracking?: any
  trackingData?: any
}

@track((props) => {
  return props.trackingData ? props.trackingData : {}
}, {
  dispatch: data => Events.postEvent(data)
})
export class Share extends React.Component<Props, null> {
  static defaultProps = {
    color: "black",
  }

  constructor(props) {
    super(props)
    this.getHref = this.getHref.bind(this)
    this.trackShare = this.trackShare.bind(this)
  }

  trackShare(e) {
    e.preventDefault()
    window.open(e.currentTarget.attributes.href.value, "Share", "width = 600,height = 300")

    this.props.tracking.trackEvent({
      action: "Article share",
      service: (() => {
        const href = e.currentTarget.attributes.href.value
        if (href.match("facebook")) return "facebook"
        if (href.match("twitter")) return "twitter"
        if (href.match("mailto")) return "email"
      })()
    })
  }

  getHref(type) {
    const { url, title } = this.props
    const encodedUrl = encodeURIComponent(url)
    const channels = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?original_referer=${encodedUrl}&text=${title}&url=${encodedUrl}&via=artsy`,
      email: `mailto:?subject=${title}&body=Check out ${title} on Artsy: ${url}`,
    }
    return channels[type]
  }

  render() {
    const { color } = this.props
    return (
      <ShareContainer>
        <IconWrapper href={this.getHref("facebook")} target="_blank" onClick={this.trackShare}>
          <IconSocialFacebook color={color} />
        </IconWrapper>
        <IconWrapper href={this.getHref("twitter")} target="_blank" onClick={this.trackShare}>
          <IconSocialTwitter color={color} />
        </IconWrapper>
        <IconWrapper href={this.getHref("email")} onClick={this.trackShare}>
          <IconSocialEmail color={color} />
        </IconWrapper>
      </ShareContainer>
    )
  }
}

export const ShareContainer = styled.div`
  white-space: nowrap;
  line-height: 1em;
  ${pMedia.xs`
    margin-top: 15px;
  `}
`
const IconWrapper = styled.a`
  text-decoration: none;
  padding-left: 7px;
  padding-right: 7px;
  &:hover {
    opacity: 0.6;
  }
  &:first-child {
    padding-left: 0;
  }
`
