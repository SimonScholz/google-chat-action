import * as core from '@actions/core'
import * as github from '@actions/github'

export function createCardV2Section(): object[] {
  const repoPath = `${github.context.repo.owner}/${github.context.repo.repo}`
  const collapsibleSection = core.getBooleanInput('collapsibleSection')
  const uncollapsibleWidgetsCount = getNumberResultAndValidate(
    'uncollapsibleWidgetsCount'
  )
  return [
    {
      header: 'Contact Info',
      collapsible: collapsibleSection,
      uncollapsibleWidgetsCount,
      widgets: [
        {
          decoratedText: {
            startIcon: {
              knownIcon: 'STAR'
            },
            text: repoPath
          }
        },
        {
          buttonList: {
            buttons: [
              {
                text: 'Go to repo',
                onClick: {
                  openLink: {
                    url: `https://github.com/${repoPath}`
                  }
                }
              },
              {
                text: 'Go to action run',
                onClick: {
                  openLink: {
                    url: `https://github.com/${repoPath}/actions/runs/${github.context.runId}/job/${github.context.job}`
                  }
                }
              }
            ]
          }
        }
      ]
    }
  ]
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
