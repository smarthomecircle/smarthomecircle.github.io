---
title: 'Custom Sentences For Voice Assistant In Home Assistant'
author: 'Amrut Prabhu'
categories: ''
tags: [Custom, Voice Assistant, Home Assistant]
photo-credits:
applaud-link: 2021/spring-boot-stream-kafka.json
date: '2023-12-21'
draft: false
summary: 'In this article, we will explore how we can create custom sentences for your voice assistant in for Home Assistant'
imageUrl: /static/images/2023/custom-sentences-home-assistant/cover.jpg
actualUrl: 'auto-generated'
customUrl: 'auto-generated'
youtubeLink: "https://www.youtube.com/embed/VYEbRJWGyGU"

---

<TOCInline toc={props.toc} asDisclosure />  

This article will explore how we can create custom sentences for your voice assistant in Home Assistant.

We will first look at a beginner-friendly way and then get to advanced levels.

## Requirements

1.  **Home Assistant OS** setup and running.  
    You can check [this](https://smarthomecircle.com/how-to-connect-wifi-to-home-assistant-on-startup) link to see how you can install it for the first time.

## Creating Custom Sentences Using Automation (Beginner friendly)

You can create custom sentences using Home Assistant Automation.

To create one, follow these steps.

**Step 1:** Go to Home Assistant **Settings** in the left panel.

**Step 2:** Click on **Automation & Scenes** and click on **Create Automation**

**Step 3:** In the **Triggers** section, select **Sentence**

**Step 4:** Enter the sentence you wish for the automation to be triggered.

**Step 5:** In the **Actions** section select the action that needs to be taken when the sentence is called.

## Understanding Home Assistant Built-in Intents

Home Assistant already provides us with some built-in automation (called Intents) that performs some action when a sentence is matched.

Let’s take an example.

When you say “Turn on the Switch”, this triggers the Intent called “**HassTurnOn**” which turns off the switch.

You can read about all the possible built-in intents that Home Assistant provides [here](https://developers.home-assistant.io/docs/intent_builtin).

Let’s look at how we can provide our custom sentence for a Built-in Intent.

The next sections are not beginner-level and require a little bit of knowledge of accessing the Home Assistant config file location.

## Creating Custom Sentences For Built-in Intent

Let’s look at how we can provide a custom sentence for a built-in Intent called **HassLightSet**

To add a custom sentence to the built-in intent, follow these steps

**Step 1:** Create a folder named “custom_sentences” where the “configuration.yaml” file is located.

**Step 2:** Inside the “custom_sentences” folder create a folder with the name “en”.

**Step 3:** Now create a file with the name “custom-sentence.yaml” which will be `custom_sentences/en/custom-sentence.yaml` and paste the following content.
```yaml
language: "en"  
intents:  
  HassLightSet:  
    data:  
     - sentences:  
          - "set {name} to {brightness} in the {area}"  
       response: "brightness"
```
**Step 4:** In the sentences section, specify your custom sentence.

The place holders `{name}` , `{brightness}` and `{area}` are some of the attributes of the **HassLightSet** Intent. You can find these attributes and their meanings [here](https://developers.home-assistant.io/docs/intent_builtin).

As a response, we will be using the default response from the in-built Intent. Hence the property `response` is set to “brightness”

You can find the responses of all the Home Assistant Built-in Intents at [this](https://github.com/home-assistant/intents/blob/main/responses/en/HassLightSet.yaml) location.

With this, you can not set the brightness of the light using the custom sentence.

## Creating Custom Responses For Built-In Intents

We can change the response of the built-in Intents using the `responses` attribute mentioned in the above intent example.

Now let’s create a custom response for the built-in Intent **HassLightSet.**

**Step 1:** Create a `response.yaml` file at the location `custom_sentences/en/response.yaml`

**Step 2:** Paste the following content.
```yaml
language: en  
responses:  
  intents:  
    HassLightSet:  
      brightness: '{{ slots.name }} brightness set to {{ slots.brightness }}'
```
The name and brightness attributes belong to the **HassLightSet** intent and you can find all the attributes of various intents [here](https://developers.home-assistant.io/docs/intent_builtin).

For responses, we need to use `slots` as prefix with the attributes to use the value of the input sentence.

## Useful References For Building Custom Sentences and Responses

Here are some useful references for modifying in-built Intents.

1.  List of all built-in Intents: [https://developers.home-assistant.io/docs/intent_builtin](https://developers.home-assistant.io/docs/intent_builtin)
2.  All the sentences of built-in Intents: [https://github.com/home-assistant/intents/tree/main/sentences/en](https://github.com/home-assistant/intents/tree/main/sentences/en)
3.  All the responses of the built-in Intents: [https://github.com/home-assistant/intents/tree/main/responses/en](https://github.com/home-assistant/intents/tree/main/responses/en)


If you are interested in exploring more of such easy to follow step by step guides about Home Assistant, then here are a few suggestions

-   [**Create Custom Wake Word For Your Voice Assistant**](https://smarthomecircle.com/custom-wake-word-for-voice-assistant-with-home-assistant)
-   [**Using Sonoff Zigbee 3.0 USB Dongle Plus With Home Assistant**](https://smarthomecircle.com/connect-zigbee-device-using-sonoff-zigbee-3-dongle-plus-to-home-assistant)
-   [**Control LED Strip with Home Assistant Using WLED**](https://smarthomecircle.com/how-to-connect-led-strip-with-home-assistant-using-wled)