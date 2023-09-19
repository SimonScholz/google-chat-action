import * as core from '@actions/core'
import * as github from '@actions/github'

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
  return [
    {
      header: repoPath,
      collapsible: collapsibleSection,
      uncollapsibleWidgetsCount,
      widgets: [
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
                    url: `https://github.com/${repoPath}/actions/runs/${github.context.runId}`
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
