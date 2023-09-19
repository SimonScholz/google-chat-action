import * as core from '@actions/core'
import * as github from '@actions/github'
import {
  statusColor,
  StatusColorKey,
  statusImage,
  StatusImageKey,
  statusMessage,
  StatusMessageKey
} from './statusIndication'

export function createCardV2Section(): object[] {
  const additionalSections = core.getInput('additionalSections')
  const additionalSectionsJson = JSON.parse(additionalSections)
  const defaultCardV2Section = createDefaultCardV2Section()

  return defaultCardV2Section.concat(additionalSectionsJson)
}

export function createDefaultCardV2Section(): object[] {
  const repoPath = `${github.context.repo.owner}/${github.context.repo.repo}`
  const collapsibleSection = core.getBooleanInput('collapsibleSection')
  const uncollapsibleWidgetsCount = getNumberResultAndValidate(
    'uncollapsibleWidgetsCount'
  )

  const defaultCardV2Section = [
    {
      collapsible: collapsibleSection,
      uncollapsibleWidgetsCount,
      widgets: [{}]
    }
  ]

  const jobStatus = core.getInput('jobStatus')

  if (jobStatus) {
    defaultCardV2Section[0].widgets.push({
      decoratedText: {
        startIcon: {
          iconUrl: statusImage[jobStatus as StatusImageKey]
        },
        text: `<font color="${statusColor[jobStatus as StatusColorKey]}">${
          statusMessage[jobStatus as StatusMessageKey]
        }</font>`
      }
    })
  }

  defaultCardV2Section[0].widgets.push(
    {
      decoratedText: {
        startIcon: {
          iconUrl:
            'https://cdn1.iconfinder.com/data/icons/picons-social/57/github-128.png'
        },
        text: repoPath
      }
    },
    {
      decoratedText: {
        startIcon: {
          iconUrl:
            'https://cdn0.iconfinder.com/data/icons/octicons/1024/git-branch-128.png'
        },
        text: github.context.ref
      }
    },
    {
      buttonList: {
        buttons: [
          {
            text: 'Go to repo',
            icon: {
              iconUrl:
                'https://cdn1.iconfinder.com/data/icons/picons-social/57/github-128.png'
            },
            onClick: {
              openLink: {
                url: `https://github.com/${repoPath}`
              }
            }
          },
          {
            text: 'Go to action run',
            icon: {
              knownIcon: 'STAR'
            },
            onClick: {
              openLink: {
                url: `https://github.com/${repoPath}/actions/runs/${github.context.runId}`
              }
            }
          }
        ]
      }
    }
  )

  return defaultCardV2Section
}

function getNumberResultAndValidate(propertyName?: string): number | undefined {
  if (!propertyName) {
    return undefined
  }

  const value = core.getInput(propertyName)
  const number = Number(value)
  if (isNaN(number)) {
    throw new Error(`${propertyName} needs to be a number`)
  }

  return getNumberOrUndefined(value)
}

function getNumberOrUndefined(value: string): number | undefined {
  if (!value || value === '') return undefined

  const result = Number(value)
  if (isNaN(result)) return undefined
  return result
}
