import * as core from '@actions/core'
import * as github from '@actions/github'

export function createCardV2Header(): Record<string, string> {
  const cardHeader: Record<string, string> = {}

  const headerTitle = getHeaderTitle()
  const headerSubtitle = getHeaderSubTitle()
  const headerImageUrl = getHeaderImageUrl()

  cardHeader.title = headerTitle
  if (headerSubtitle) {
    cardHeader.subtitle = headerSubtitle
  }
  if (headerImageUrl) {
    cardHeader.imageUrl = headerImageUrl
    cardHeader.imageType = getHeaderImageType()
    const headerImageAltText = getHeaderImageAltText()
    if (headerImageAltText) {
      cardHeader.imageAltText = headerImageAltText
    }
  }

  return cardHeader
}

function getHeaderTitle(): string {
  const inputTitle = core.getInput('title')
  const jobStatus = core.getInput('jobStatus')
  if (inputTitle.length !== 0) {
    return `${inputTitle} ${jobStatus}`
  }

  return `${github.context.job} ${jobStatus}`
}

function getHeaderSubTitle(): string | undefined {
  const inputSubTitle = core.getInput('subtitle')
  if (inputSubTitle.length !== 0) {
    return inputSubTitle
  }
  return undefined
}

function getHeaderImageUrl(): string | undefined {
  const inputImageUrl = core.getInput('imageUrl')
  if (inputImageUrl.length !== 0) {
    return inputImageUrl
  }
  return undefined
}

function getHeaderImageType(): string {
  const inputImageType = core.getInput('imageType')
  if (inputImageType.length !== 0) {
    return inputImageType
  }
  return 'CIRCLE'
}

function getHeaderImageAltText(): string | undefined {
  const inputImageAltText = core.getInput('imageAltText')
  if (inputImageAltText.length !== 0) {
    return inputImageAltText
  }
  return undefined
}
