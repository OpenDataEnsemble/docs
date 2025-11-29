---
sidebar_position: 1
title: "OpenDataEnsemble (ODE)"
---

# Welcome to OpenDataEnsemble (ODE)

:::info[Pre-release Available]

The source code for the pre-release version of ODE is now publicly available! While we're still working toward the full 1.0 release in November 2025, we welcome anyone willing to help with testing, development, or getting involved in the project.

**Try the pre-release:** [Install Formulus pre-release on Android](/docs/quick-start/formulus-prerelease-android)

**Get involved:** Reach out to us at [hello@opendataensemble.org](mailto:hello@opendataensemble.org) - we'd love to hear from you!

**Source Code:** Our mono repo on GitHub contains the source code for:
- **formulus**: React Native application for mobile data collection
- **formplayer**: React project for form interaction
- **synkronus**: Go-based server backend
- **synkronus-cli**: Go-based command-line interface

Visit our repository: [https://github.com/OpenDataEnsemble/ode](https://github.com/OpenDataEnsemble/ode)

*Reference implementation projects will be added as they become available.*

:::

**OpenDataEnsemble (ODE)** is a modern, flexible toolkit designed to simplify **robust mobile data collection and management**. Built for researchers, health professionals, implementers, and developers alike, ODE empowers users to design sophisticated forms, manage data securely, and synchronize seamlessly across devices—even in offline conditions.

ODE stands out through its:

* **Simplicity & Efficiency:** Quickly create complex, validated forms using a powerful yet intuitive JSON-based approach.
* **Advanced Offline Sync:** Reliable and conflict-resilient synchronization powered by [WatermelonDB](https://watermelondb.dev).
* **Flexible & Extensible UI:** Customize form presentation and interaction effortlessly with [JSON Forms](https://jsonforms.io), enabling rich, interactive user experiences.

Inspired by pioneering open-source projects, ODE leverages cutting-edge frameworks to deliver unparalleled ease-of-use and flexibility, especially suited for challenging environments where reliable offline performance is crucial.

Whether you're capturing health data in remote clinics, conducting longitudianl studies or field research in areas with limited connectivity, or building data-intensive mobile applications, **ODE** is your reliable, scalable, and modern platform for creating powerful data instruments.

## Current Members of the Ensemble

Here's an overview of the current members of the ensemble:

<img src="/img/component_overview.png" alt="Component overview" width="100%" />

* [formulus](/docs/documentation/formulus/): The Android and iOS app for data collection and form interaction.
* [synkronus](/docs/documentation/synkronus/): The robust server backend managing synchronization and data storage.
* [synkronus-cli](/docs/documentation/synkronus-cli/cli): Command-line interface for convenient server management and administrative tasks.

:::tip[Ready to get started?]

Check out the [Quick Start guide](/docs/quick-start)!

:::

ODE is a platform for building sophisticated data collection instruments.


<!-- 
:::danger[Take care]

This action is dangerous

:::

```jsx title="src/components/HelloDocusaurus.js"
function HelloDocusaurus() {
  return <h1>Hello, Docusaurus!</h1>;
}
```

![Docusaurus logo](/img/docusaurus.png)



## MDX block

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`)
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">Docusaurus green</Highlight> !

This is <Highlight color="#1877F2">Facebook blue</Highlight> ! -->