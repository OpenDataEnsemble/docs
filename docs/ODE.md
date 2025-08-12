---
sidebar_position: 1
title: "OpenDataEnsemble (ODE)"
---

# Welcome to OpenDataEnsemble (ODE)

:::danger[Take care]

ODE is not yet publicly available. Our developers are working hard to get the final touches just right!  
This also means, this documentation is only for inspiration and used internally by the developers at this stage.

The **preliminary** release date for ODE is set to August 31st 2025, so watch this space!

:::

**OpenDataEnsemble (ODE)** is a modern, flexible toolkit designed to simplify **robust mobile data collection and management**. Built for researchers, health professionals, implementers, and developers alike, ODE empowers users to design sophisticated forms, manage data securely, and synchronize seamlessly across devices—even in offline conditions.

ODE stands out through its:

* **Simplicity & Efficiency:** Quickly create complex, validated forms using a powerful yet intuitive JSON-based approach.
* **Advanced Offline Sync:** Reliable and conflict-resilient synchronization powered by [WatermelonDB](https://watermelondb.dev).
* **Flexible & Extensible UI:** Customize form presentation and interaction effortlessly with [JSON Forms](https://jsonforms.io), enabling rich, interactive user experiences.

Inspired by pioneering open-source projects, ODE leverages cutting-edge frameworks to deliver unparalleled ease-of-use and flexibility, especially suited for challenging environments where reliable offline performance is crucial.

Whether you're capturing health data in remote clinics, conducting longitudianl studies or field research in areas with limited connectivity, or building data-intensive mobile applications, **ODE** is your reliable, scalable, and modern platform for creating powerful data instruments.

## Current Members of the Ensemble

* [formulus](./documentation/formulus/formulus.md): The Android and iOS app for data collection and form interaction.
* [synkronus](./documentation/synkronus/synkronus.md): The robust server backend managing synchronization and data storage.
* [synkronus-cli](./documentation/synkronus-cli/cli.md): Command-line interface for convenient server management and administrative tasks.

:::tip[Ready to get started?]

Check out the [Quick Start guide](./quick-start/index.md)!

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