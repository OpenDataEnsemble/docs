---
sidebar_position: 1
---

# Synkronus CLI

The Synkronus CLI is a tool for interacting with the Synkronus server.
It is used to authenticate, upload and download the custom_app as well as data and attachments.

## Installation

```bash
//Todo
```

## Usage

```javascript
//Todo
```


The completion command in the Synkronus CLI is a feature provided by Cobra, the CLI framework being used. It generates shell completion scripts for different shells, including PowerShell. Here's how to use it:

For PowerShell Completion:
Generate the completion script: Run this command to generate the completion script for PowerShell:
```powershell
# For the current session only
.\synk.exe completion powershell > synk_completion.ps1
. .\synk_completion.ps1
```
To make it permanent, add the following to your PowerShell profile:
```powershell
# Add this to your $PROFILE
Register-ArgumentCompleter -Native -CommandName synk.exe -ScriptBlock {
    param($wordToComplete, $commandAst, $cursorPosition)
    $completions = @(synk.exe completion --shell powershell -- "$wordToComplete" "$($commandAst.ToString().Split() | Select-Object -Skip 1)")
    $completions | ForEach-Object { [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_) }
}
```

To find your PowerShell profile location, run:
```powershell
CopyInsert in Terminal
$PROFILE
```
Reload your profile:
```powershell
CopyInsert in Terminal
. $PROFILE
```