# google-chat-action

Github action to send Cards V2 to the google chat via webhook.

## Quick start

![Bare Minimum Google Chat Card](./docs/bare-minimum-card.png)

You'll get this bare minimum Google Chat card in case you only specify the required input, which is the `webhookUrl`.
In order to obtain this `webhookUrl` you need to click on the desired Google Chat, go to "Apps & Integrations" and then click on the "+ Add webhooks" button.


```yaml
name: Send Message to Google Chat

on:
  pull_request:
  push:
    branches:

  google-chat-action:
    name: Google Chat GitHub Action
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        id: checkout
        uses: actions/checkout@v4

      # ... Run your build stuff or whatever ...

      - name: Notify Google Chat
        if: ${{ always() }} # Use always to ensure that the notification is also send on failure of former steps
        uses: SimonScholz/google-chat-action@main
        with:
          webhookUrl: '${{ secrets.GOOGLE_CHAT_WEBHOOK_URL }}'
```

In case the action is triggered by a `pull_request` the last button in the button list will be "Go to pull request" instead of "Go to commit", which is shown on `push`.
If it is neither a `pull_request` nor a `push` trigger then only the "Go to repo" and "Go to action run" buttons will be shown.

## Also visualize the Status of the run

Usually notifications triggered by a github action are supposed to inform about the outcome of the action.

In order to see `success`, `failure` or `cancellation` the `${{ job.status }}` has to be passed to the action.

![Minimalistic card with job status](./docs/jobstatus-minimum-card.png)

```yaml
name: Send Message to Google Chat

on:
  pull_request:
  push:
    branches:

  google-chat-action:
    name: Google Chat GitHub Action
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        id: checkout
        uses: actions/checkout@v4

      # ... Run your build stuff or whatever ...

      - name: Notify Google Chat
        if: ${{ always() }} # Use always to ensure that the notification is also send on failure of former steps
        uses: SimonScholz/google-chat-action@main
        with:
          webhookUrl: '${{ secrets.GOOGLE_CHAT_WEBHOOK_URL }}'
          jobStatus: '${{ job.status }}'
```

## Example with all input values

```yaml
  - name: Notify Google Chat
    id: test-action
    if: failure() # only send notification in case of failure
    uses: SimonScholz/google-chat-action@main
    with:
        webhookUrl: '${{ secrets.GOOGLE_CHAT_WEBHOOK_URL }}'
        jobStatus: ${{ job.status }}
        title: Google Chat GitHub Action
        subtitle: Brought to you by Simon ;-)
        imageUrl: https://raw.githubusercontent.com/SimonScholz/simonscholz.github.io/gatsby-homepage/src/assets/img/avatar.webp
        imageType: SQUARE
        imageAltText: Alternative image text
        createDefaultSection: false
        collapsibleDefaultSection: false
        uncollapsibleWidgetsCount: 3
        additionalSections: '[{"header": "Additional Section", "collapsible": true, "widgets": [{"decoratedText": {"startIcon": {"knownIcon": "STAR"},"text": "Additional Section"}}] }]'
```

## inputs

You can also refer to the [action.yml](https://github.com/SimonScholz/google-chat-action/blob/main/action.yml).

| Property      | Description                     | Required   |
| ------------- | ------------------------------- | :--------: |
| webhookUrl    | The webhook URL of the Google Chat. Should be stored in an action secret. |    ✅      |
| jobStatus     | The optional jobStatus. Values can be success, failure, cancelled. You should pass ${{ job.status }} here. |    🚫      |
| title         | Optional title. If not set, it defaults to the action name + job status. |    🚫      |
| subtitle      | Optional subtitle. If not set, the subtitle will not be shown. |    🚫      |
| imageUrl      | Optional icon. If not set, no icon will be shown. |    🚫      |
| imageType     | Optional imageType (imageUrl must be set for this). Possible values are SQUARE and CIRCLE. If not set, this will default to CIRCLE. |    🚫      |
| imageAltText  | Optional imageAltText. Alternative in case the image cannot be shown. |    🚫      |
| createDefaultSection | Optional createDefaultSection. Specify whether the default section should be shown or not. |    🚫      |
| collapsibleDefaultSection | Optional collapsibleSection. Specify whether the section is collapsible.  |    🚫      |
| uncollapsibleWidgetsCount | Optional uncollapsibleWidgetsCount. Specify the amount of uncollapsible widgets within the sections. |    🚫      |
| additionalSections | Add the opportunity to have additional sections. Also see https://developers.google.com/chat/api/reference/rest/v1/cards#section array. |    🚫      |
