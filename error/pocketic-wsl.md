# PocketIC Error Fix on Windows WSL: Step-by-Step Guide

If you encounter the PocketIC error like this when running `dfx start` on Windows Subsystem for Linux (WSL):

```
Critical error mr_non_increasing_batch_time occurred.
Failed to create PocketIC instance: JoinError::Panic(...)
ERROR: Failed to initialize PocketIC
```

This guide will help you clean your environment, reinstall DFX, and set up identities properly to fix the issue.

---

## Steps to fix the PocketIC error

1. **Open your project root folder** in your WSL terminal.

2. **Clean DFX global config and cache:**

```bash
rm -rf ~/.config/dfx
rm -rf ~/.local/share/dfx
```

> Removes any corrupted or stale DFX settings and cache.

3. **Install or reinstall DFX SDK (choose version):**

```bash
DFX_VERSION=0.27.0 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

> Installs the specified DFX version. Replace `0.27.0` with the version you want.

4. **Check your current identity:**

```bash
dfx identity whoami
```

> Shows your active identity (usually `default`).

5. **Create a new identity (optional):**

```bash
dfx identity new <identity-name>
```

> Creates a new identity for better management. Replace `<identity-name>` with your preferred name.

6. **Get the principal ID of your identity:**

```bash
dfx identity get-principal
```

> Displays the unique principal ID for the active identity.

7. **Clean your project’s local DFX state:**

```bash
rm -rf .dfx
```

> Removes local project cache and state.

8. **Start the local replica in the background:**

```bash
dfx start --background
```

> Launches the local Internet Computer replica.

9. **Deploy your canisters:**

```bash
dfx deploy
```

> Deploys your project to the local replica.

---

## Additional tips

- If the problem persists, try shutting down WSL fully from Windows PowerShell (run as Administrator):

```powershell
wsl --shutdown
```

Then reopen WSL and repeat the above steps.

- You can install any DFX version by changing the `DFX_VERSION` in the install command.

---

This process has resolved the PocketIC `mr_non_increasing_batch_time` errors on WSL for many developers.